import React, {useEffect, useState} from 'react';
import CustomInput from "../CustomInput/CustomInput";
import styles from './BecomeAVisitor.module.scss';
import {ReactComponent as Cross} from "../../images/cross.svg";
import {useTranslation} from "react-i18next";
import {useQuery, useMutation} from '@apollo/client';
import {ADD_VISITOR, GET_VISITOR_INTERESTS} from '../../graphql/queries';
import MultiselectDropdown from "../MultiselectDropdown/MultiselectDropdown";
import {useModal} from "../ModalContext/ModalContext";
import {useLocation, useNavigate} from "react-router-dom";

function BecomeAVisitor() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        companyName: '',
        email: '',
        interestsIds: [],
        notes: '',
    });

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
        const error = validateField('interestsIds', selectedOptions);
        setErrors(prevErrors => ({
            ...prevErrors,
            interestsIds: error
        }));
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
            const result = await addVisitor({variables: {...formData}});
            if (result && result.data && result.data.insertVisitors && result.data.insertVisitors.affected_rows) {
                setTimeout(() => {
                    if (urlParts.length >= 3) {
                        navigate(`/${urlParts[1]}/visitor-registration-success`);
                    }
                    setLoading(false);
                    setSuccess(true);
                }, 1000);
            }
        } catch (err) {
            setLoading(false);
            if (err && err.graphQLErrors && err.graphQLErrors.length > 0) {
                const errorMessages = err.graphQLErrors.map(error => error.message);
                if (errorMessages.includes("Uniqueness violation. duplicate key value violates unique constraint \"visitors_email_key\"")) {
                    setErrors(prevErrors => ({...prevErrors, email: t('email_is_used')}));
                }
            } else {
                console.error('Unexpected Error:', err);
            }
        }
    };

    const options = visitorsInterestsData?.visitorInterests?.map(item => {
        const {id, translations} = item;
        const name = i18n.language === "am" ? translations.am : translations.en;
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

    if (isSuccess) {
        return (
            <div className={styles.successModal}>
                <div className={styles.close} onClick={closeModal}><Cross/></div>
                <p className={styles.success}>{t("success_visitor")}</p>
            </div>
        );
    }

    return (
        <div className={styles.modal}>

            <div className={styles.close} onClick={closeModal}><Cross/></div>
            {/*<h2 className={styles.title}>*/}
            {/*    {t("become_a_visitor")}*/}
            {/*</h2>*/}
            {/*<p className={styles.subtitle}>{t("participate_in_the_giveaway")}</p>*/}
            <p className={styles.soon}>{t("registration_soon")}</p>
            {/*
            <form onSubmit={handleSubmit}>
                <div className={styles.row}>
                    <CustomInput
                        label={`${t("name")}*`}
                        name="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={handleChange}
                        error={errors.firstName}
                    />
                    <CustomInput
                        label={`${t("surname")}*`}
                        name="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={handleChange}
                        error={errors.lastName}
                    />
                </div>
                <div className={styles.row}>
                    <CustomInput
                        label={`${t("phone_number")}*`}
                        name="phoneNumber"
                        type="text"
                        value={formData.phoneNumber}
                        onChange={(e) => {
                            if (/^\+?[0-9]*$/.test(e.currentTarget?.value)) {
                                setFormData({
                                    ...formData,
                                    phoneNumber: e.currentTarget?.value,
                                });
                            }
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
                    label={`${t("email")}*`}
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
                <label className={styles.message}>
                    {t("notes")}
                    <textarea name="notes" value={formData.notes} onChange={handleChange} rows={5}/>
                </label>

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
            </form>*/}
        </div>
    );
}

export default BecomeAVisitor;
