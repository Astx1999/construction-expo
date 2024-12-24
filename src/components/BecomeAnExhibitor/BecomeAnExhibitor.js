import React, {useState} from 'react';
import CustomInput from "../CustomInput/CustomInput";
import styles from './BecomeAnExhibitor.module.scss';
import {useModal} from "../ModalContext/ModalContext";
import MultiselectDropdown from "../MultiselectDropdown/MultiselectDropdown";
import {ReactComponent as Cross} from "../../images/cross.svg";
import {useTranslation} from "react-i18next";
import {useMutation, useQuery} from "@apollo/client";
import {ADD_EXHIBITOR, GET_ZONES} from "../../graphql/queries";
import CustomSelect from "../CustomSelect/CustomSelect";
import {useLocation, useNavigate} from "react-router-dom";

function BecomeAnExhibitor() {
    const [formData, setFormData] = useState({
        companyName: '',
        industry: '',
        brands: '',
        zone: '',
        zoneNumber: [],
        phoneNumber: '',
        email: '',
        notes: '',
    });

    const navigate = useNavigate();
    const location = useLocation();

    const [errors, setErrors] = useState({});
    const [isSuccess, setSuccess] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const {setIsOpen} = useModal();
    const {t, i18n} = useTranslation();

    const [addExhibitor, {loading: mutationLoading, error: mutationError}] = useMutation(ADD_EXHIBITOR);
    const {loading: queryLoading, error: queryError, data: zonesData} = useQuery(GET_ZONES);

    const validateField = (name, value) => {
        let error;
        switch (name) {
            case 'companyName':
                error = value ? '' : t("required");
                break;
            case 'industry':
                error = value ? '' : t("required");
                break;
            case 'brands':
                error = value ? '' : t("required");
                break;
            case 'zone':
                error = value ? '' : t("required");
                break;
            case 'zoneNumber':
                error = value.length ? '' : t("required");
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
        setFormData({...formData, zoneNumber: selectedOptions});
        const error = validateField('zoneNumber', selectedOptions);
        setErrors(prevErrors => ({
            ...prevErrors,
            zoneNumber: error
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
            const result = await addExhibitor({
                variables: {
                    companyName: formData.companyName,
                    industry: formData.industry,
                    brands: formData.brands,
                    email: formData.email,
                    zoneId: formData.zone,
                    zoneNumbers: formData.zoneNumber,
                    phoneNumber: formData.phoneNumber,
                    notes: formData.notes,
                    message: formData.notes,
                    website: formData.companyName,
                }
            });

            if (result && result.data && result.data.insertExhibitors && result.data.insertExhibitors.affected_rows) {
                setTimeout(() => {
                    if (urlParts.length >= 3) {
                        navigate(`/${urlParts[1]}/exhibitor-registration-success`);
                    }
                    setLoading(false);
                    setSuccess(true);
                }, 1000);
            }
        } catch (err) {
            setLoading(false);
        }
    };

    const getAvailableNumbers = (selectedZoneID) => {
        const zone = zonesData && zonesData?.zones?.find((z) => z.id === selectedZoneID || "");
        if (!zone && !selectedZoneID) {
            return [];
        }
        return [...zone.availableNumbers.map(number => ({
            id: number,
            name: number
        }))];
    };

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
                <p className={styles.success}>{t("success_exhibitor")}</p>
            </div>
        );
    }

    return (
        <div className={styles.modal}>
            <div className={styles.close} onClick={closeModal}><Cross/></div>
            <h2 className={styles.title}>{t("become_an_exhibitor")}</h2>

            <form onSubmit={handleSubmit}>
                <div className={styles.companyNameWrapper}>
                    <CustomInput
                        label={`${t("company_name")}*`}
                        name="companyName"
                        type="text"
                        value={formData.companyName}
                        onChange={handleChange}
                        error={errors.companyName}
                    />
                </div>

                <div className={styles.row}>
                    <CustomInput
                        label={`${t("field_of_activity")}*`}
                        name="industry"
                        value={formData.industry}
                        onChange={handleChange}
                        error={errors.industry}
                    />
                    <CustomInput
                        label={`${t("brands_represented")}*`}
                        name="brands"
                        value={formData.brands}
                        onChange={handleChange}
                        error={errors.brands}
                    />
                </div>
                <div className={styles.row}>
                    <CustomSelect
                        label={`${t("preferred_zone")}*`}
                        name="zone"
                        value={formData.zone}
                        onChange={(e) => {
                            setFormData({...formData, zone: e, zoneNumber: []});
                        }}
                        options={zonesData ? [...zonesData?.zones?.map((zone) => ({
                            id: zone.id,
                            name: zone.name
                        }))] : []}
                        error={errors.zone}
                    />
                    <MultiselectDropdown
                        label={`${t("desired_number")}*`}
                        name="zoneNumber"
                        value={formData.zoneNumber}
                        onChange={(e) => setFormData({...formData, zoneNumber: e})}
                        options={getAvailableNumbers(formData.zone)}
                        error={errors.zoneNumber}
                        emptyDropdownText={t('choose_zone')}
                    />
                </div>
                <div className={styles.row}>
                    <CustomInput
                        label={`${t("phone_number")}*`}
                        name="phoneNumber"
                        type="number"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        error={errors.phoneNumber}
                    />
                    <CustomInput
                        label={`${t("email")}*`}
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                    />
                </div>

                <label className={styles.message}>
                    {`${t("notes")}`}
                    <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        rows={5}
                        className={errors.notes ? styles.errorInput : ''}
                    />
                    {errors.notes && <span className={styles.errorMessage}>{errors.notes}</span>}
                </label>

                <button
                    className={styles.submit}
                    disabled={isLoading || mutationLoading || Object.values(errors).some(error => error)}
                    type={isLoading || mutationLoading ? "" : "submit"}
                >
                    {isLoading || mutationLoading ? t("sending") : t("exhibitor_submit")}
                </button>
                {mutationError && <p className={styles.error}>{mutationError.message}</p>}
            </form>
        </div>
    );
}

export default BecomeAnExhibitor;
