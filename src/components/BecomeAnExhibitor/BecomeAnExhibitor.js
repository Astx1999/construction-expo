import React, {useState, useEffect} from 'react';
import CustomInput from "../CustomInput/CustomInput";
import styles from './BecomeAnExhibitor.module.scss';
import {useModal} from "../ModalContext/ModalContext";
import MultiselectDropdown from "../MultiselectDropdown/MultiselectDropdown";
import {ReactComponent as Cross} from "../../images/cross.svg";
import {useTranslation} from "react-i18next";
import {useMutation, useQuery} from "@apollo/client";
import {
    ADD_EXHIBITOR,
    GET_AVAILABLE_ZONE_ITEMS,
    GET_ZONE_ITEMS,
    GET_ZONES,
    UPDATE_ZONE_ITEMS
} from "../../graphql/queries";
import CustomSelect from "../CustomSelect/CustomSelect";
import {useLocation, useNavigate} from "react-router-dom";
import {authClient} from "../../apolloClient";

function BecomeAnExhibitor() {
    const [formData, setFormData] = useState({
        companyName: '',
        industry: '',
        brands: '',
        zone: '',
        zoneItemId: [],
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
    const [selectedZoneId, setSelectedZoneId] = useState(""); // Default zone name

    const [createExhibitor, { loading: isCreatingExhibitor, error: createExhibitorError }] = useMutation(ADD_EXHIBITOR);

    const { loading: isFetchingZones, error: fetchZonesError, data: zones } = useQuery(GET_ZONES);

    const { data: availableZoneItems } = useQuery(GET_AVAILABLE_ZONE_ITEMS, {
        variables: { zoneId: selectedZoneId }
    });

    const { data: allZoneItems, refetch: refetchZoneItems } = useQuery(GET_ZONE_ITEMS);

    const [updateZoneItems] = useMutation(UPDATE_ZONE_ITEMS, {
        client: authClient,
        onCompleted: () => {
            refetchZoneItems();
        },
    });

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
            case 'zoneItemId':
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
        setFormData({...formData, zoneItemId: selectedOptions});
        const error = validateField('zoneItemId', selectedOptions);
        setErrors(prevErrors => ({
            ...prevErrors,
            zoneItemId: error
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
            // Step 1: Add Exhibitor
            const exhibitorResult = await createExhibitor({
                variables: {
                    companyName: formData.companyName,
                    industry: formData.industry,
                    brands: formData.brands,
                    email: formData.email,
                    zoneItemId: formData.zoneItemId,
                    zoneNumbers: formData.zoneItemId,
                    phoneNumber: formData.phoneNumber,
                    notes: formData.notes,
                    message: formData.notes,
                    website: formData.companyName,
                }
            });

            if (!exhibitorResult?.data?.insertExhibitors?.affected_rows) {
                throw new Error("Failed to add exhibitor");
            }

            const zoneIds = formData.zoneItemId;
            let zoneUpdateSuccess = true;

            if (zoneIds?.length > 0) {
                // Step 2: Update Zone Items (Only if there are zones)
                const zoneUpdateResult = await updateZoneItems({
                    variables: {
                        where: {id: {_in: zoneIds}},
                        _set: {status: "REQUESTED"}
                    }
                });

                if (!zoneUpdateResult?.data?.update_zoneItems?.affected_rows) {
                    zoneUpdateSuccess = false;
                }
            }

            // Step 3: Ensure both requests succeeded before triggering success
            if (zoneUpdateSuccess) {
                setTimeout(() => {
                    if (urlParts.length >= 3) {
                        navigate(`/${urlParts[1]}/exhibitor-registration-success`);
                    }
                    setLoading(false);
                    setSuccess(true);
                }, 1000);
            } else {
                throw new Error("Failed to update zone items");
            }
        } catch (err) {
            console.error("Error submitting form:", err);
            setLoading(false);
        }
    };


    const [availableNumbers, setAvailableNumbers] = useState([]);

    useEffect(() => {
        if (formData.zone) {
            setSelectedZoneId(formData.zone);
            const zone = zones?.zones?.find((z) => z.id === formData.zone);
            if (zone && availableZoneItems?.zones?.length > 0) {

                setAvailableNumbers(
                    availableZoneItems.zones[0].items.map(zoneItem => {
                        const match = zoneItem.name.match(/Item(\d+)$/);
                        const zoneName = match ? match[1] : null;
                        return (
                            {
                                id: zoneItem.id,
                                name:
                                zoneName
                            }
                        )

                    })
                );
            } else {
                setAvailableNumbers([]);
            }
        }
    }, [formData.zone, zones, availableZoneItems]);

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

    console.log(formData.zoneItemId)
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
                            setFormData({...formData, zone: e, zoneItemId: []});
                        }}
                        options={zones ? [...zones?.zones?.map((zone) => ({
                            id: zone.id,
                            name: zone.name
                        }))] : []}
                        error={errors.zone}
                    />
                    <MultiselectDropdown
                        label={`${t("desired_number")}*`}
                        name="zoneItemId"
                        value={formData.zoneItemId}
                        onChange={(e) => setFormData({...formData, zoneItemId: e})}
                        options={availableNumbers}
                        error={errors.zoneItemId}
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
                    disabled={isLoading || isCreatingExhibitor || Object.values(errors).some(error => error)}
                    type={isLoading || isCreatingExhibitor ? "" : "submit"}
                >
                    {isLoading || isCreatingExhibitor ? t("sending") : t("exhibitor_submit")}
                </button>
                {createExhibitorError && <p className={styles.error}>{createExhibitorError.message}</p>}
            </form>
        </div>
    );
}

export default BecomeAnExhibitor;
