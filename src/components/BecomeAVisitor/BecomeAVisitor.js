import React, {useState} from 'react';
import classNames from 'classnames';
import CustomInput from "../CustomInput/CustomInput";
import styles from './BecomeAVisitor.module.scss';
import {ReactComponent as PrevArrow} from "../../images/prevP.svg";
import {useTranslation} from "react-i18next";
import {useQuery, useMutation} from '@apollo/client';
import {ADD_VISITOR, GET_VISITOR_INTERESTS} from '../../graphql/queries';
import MultiselectDropdown from "../MultiselectDropdown/MultiselectDropdown";
import {useModal} from "../ModalContext/ModalContext";
import {useLocation, useNavigate} from "react-router-dom";
import {ReactComponent as Logo} from "../../images/logo.svg";

const EXPO_PAGE_URL = 'https://promexpo.am/expo/18th-construction-and-interior-expo-2026/';
const UI_LANGS = [
    {code: 'en', label: 'EN'},
    {code: 'ru', label: 'RU'},
    {code: 'am', label: 'AM'},
];

function pickInterestTranslation(translations, langCode) {
    if (!translations || typeof translations !== 'object') return '';
    const base = (langCode || 'en').split('-')[0];
    return translations[base] || translations.ru || translations.en || translations.am || '';
}

function BecomeAVisitor() {

    const initialFormData = {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        companyName: '',
        email: '',
        interestsIds: [],
        notes: '',
    };
    const [formData, setFormData] = useState(initialFormData);

    const navigate = useNavigate();
    const location = useLocation();

    const [errors, setErrors] = useState({});
    const [isSuccess, setSuccess] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const {setIsOpen} = useModal();
    const {t, i18n} = useTranslation();

    const [addVisitor, {loading: mutationLoading, error: mutationError}] = useMutation(ADD_VISITOR);
    const {loading: queryLoading, error: queryError, data: visitorsInterestsData} = useQuery(GET_VISITOR_INTERESTS);

    const validateField = (name, value) => {
        let error;
        switch (name) {
            case 'firstName':
                error = value ? '' : t("required");
                break;
            case 'lastName':
                error = value ? '' : t("required");
                break;
            case 'phoneNumber':
                error = value ? '' : t("required");
                break;
            case 'email':
                error = value ? '' : t("required");
                if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                    error = t("invalid_email_format");
                }
                break;
            // case 'interestsIds':
            //     error = value.length ? '' : t("required");
            //     break;
            default:
                break;
        }
        return error;
    };

    const handleChange = (e) => {

        const {name, value, type, checked} = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setFormData({
            ...formData,
            [name]: newValue
        });

        const error = validateField(name, newValue);
        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: error
        }));
    };

    const handleInterestsChange = (selectedOptions) => {
        setFormData({...formData, interestsIds: selectedOptions});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = Object.keys(formData).reduce((acc, key) => {
            const error = validateField(key, formData[key]);
            if (error) acc[key] = error;
            return acc;
        }, {});

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setErrors({});
        setLoading(true);
        const {pathname} = location;
        const urlParts = pathname.split('/');

        try {
            const result = await addVisitor({ variables: { ...formData } });
            if (result && result.data && result.data.insertVisitors && result.data.insertVisitors.affected_rows) {
                setTimeout(() => {
                    if (urlParts.length >= 3) {
                        navigate(`/${urlParts[1]}/visitor-registration-success`);
                    }
                    setLoading(false);
                    setSuccess(true);
                    setFormData(initialFormData);
                    setErrors({});
                }, 1000);
            }
        } catch (err) {
            setLoading(false);
            if (err && err.graphQLErrors && err.graphQLErrors.length > 0) {
                const errorMessages = err.graphQLErrors.map(error => error.message);
                if (errorMessages.includes("Uniqueness violation. duplicate key value violates unique constraint \"visitors_email_event_key\"")) {
                    setErrors(prevErrors => ({...prevErrors, email: t('email_is_used')}));
                }
            } else {
                console.error('Unexpected Error:', err);
            }
        }
    };

    const langCode = (i18n.language || 'en').split('-')[0];

    const options = visitorsInterestsData?.visitorInterests?.filter((item) => item.event === "CONSTRUCTION_2026").map(item => {
        const {id, translations} = item;
        const name = pickInterestTranslation(translations, langCode);
        return {id, name};
    }) || [];

    const closeModal = () => {
        setIsOpen(false);
        const {pathname} = location;
        const urlParts = pathname.split('/');
        if (urlParts.length >= 3) {
            navigate(`/${urlParts[1]}`);
        }
    };

    const requiredLabel = (text) => (
        <>
            <span className={styles.requiredMark}>*</span>
            {text}
        </>
    );

    const langSwitch = (
        <div className={styles.langSwitch} role="group" aria-label={t('language')}>
            {UI_LANGS.map(({code, label}) => (
                <button
                    key={code}
                    type="button"
                    className={classNames(styles.langBtn, langCode === code && styles.langBtnActive)}
                    onClick={() => i18n.changeLanguage(code)}
                >
                    {label}
                </button>
            ))}
        </div>
    );

    const topBar = (
        <div className={styles.topBar}>
            <a
                className={styles.backLink}
                href={EXPO_PAGE_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('back_to_expo')}
            >
                <PrevArrow className={styles.backArrow} aria-hidden/>
            </a>
            {langSwitch}
        </div>
    );

    if (isSuccess) {
        return (
            <div className={styles.successModal}>
                {topBar}
                {/* <div className={styles.close} onClick={closeModal}><Cross/></div> */}
                <p className={styles.success}>{t("success_visitor")}</p>

                <button className={styles.submit} onClick={()=>setSuccess(false)}>{t("become_a_visitor")}</button>
            </div>
        );
    }

    return (
        <div className={styles.modal}>
            {topBar}

            {/* <div className={styles.close} onClick={closeModal}><Cross/></div> */}
            <div className={styles.logo}>
                <Logo/>
            </div>

            <h2 className={styles.title}>
                {t("become_a_visitor")}
            </h2>
            <p className={styles.subtitle}>{t("participate_in_the_giveaway")}</p>
            {/*<p className={styles.soon}>{t("registration_soon")}</p>*/}

           <form onSubmit={handleSubmit}>
                <div className={styles.row}>
                    <CustomInput
                        label={requiredLabel(t("name"))}
                        name="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={handleChange}
                        error={errors.firstName}
                    />
                    <CustomInput
                        label={requiredLabel(t("surname"))}
                        name="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={handleChange}
                        error={errors.lastName}
                    />
                </div>
                <div className={styles.row}>
                    <CustomInput
                        label={requiredLabel(t("phone_number"))}
                        name="phoneNumber"
                        type="text"
                        value={formData.phoneNumber}
                        onChange={(e) => {
                            const value = e.currentTarget?.value ?? "";
                            if (!/^\+?[0-9]*$/.test(value)) return;

                            setFormData((prev) => ({ ...prev, phoneNumber: value }));
                            const error = validateField("phoneNumber", value);
                            setErrors((prev) => ({ ...prev, phoneNumber: error }));
                        }}
                        error={errors.phoneNumber}
                    />
                    <CustomInput
                        label={`${t('organization')}`}
                        name="companyName"
                        type="text"
                        value={formData.companyName}
                        onChange={handleChange}
                    />
                </div>
                <CustomInput
                    label={requiredLabel(t("email"))}
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                />
                <div className={styles.interestsWrapper}>
                    <MultiselectDropdown
                        label={`${t("interests")}`}
                        name="interestsIds"
                        value={formData.interestsIds}
                        options={options}
                        onChange={handleInterestsChange}
                        error={errors.interestsIds}
                    />
                </div>
                <div className={styles.message}>
                    <label className={styles.label}>{t("notes")}</label>
                    <textarea name="notes" value={formData.notes} onChange={handleChange} rows={5}/>
                </div>

                <p className={styles.submissionTerms}>
                    {t("submission_terms")}
                </p>
                <button
                    className={styles.submit}
                    disabled={isLoading || mutationLoading || Object.values(errors).some(error => error)}
                    type={isLoading || mutationLoading ? "" : "submit"}
                >
                    {isLoading || mutationLoading ? t("sending") : t("submit")}
                </button>
            </form>
        </div>
    );
}

export default BecomeAVisitor;
