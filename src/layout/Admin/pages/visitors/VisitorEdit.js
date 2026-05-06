import React, {useEffect, useState} from "react";
import {
    Edit,
    SimpleForm,
    TextInput,
    SelectInput,
    AutocompleteArrayInput,
    useNotify,
    Toolbar,
    SaveButton,
    required,
} from "react-admin";
import {Grid, Button} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";
import {Print} from "@mui/icons-material"; // Import the Print icon
import {useQuery, useMutation} from "@apollo/client";
import {GET_TYPES, GET_VISITOR_INTERESTS, UPDATE_VISITOR} from "../../../../graphql/queries";
import {getUserIdFromUrl} from "../../../../utils/getUserIdFromUrl";
import {authClient} from "../../../../apolloClient";
import styles from "../../Admin.module.scss";
import {useRecordContext} from 'react-admin';

const CustomToolbarEdit = (props) => {
    const notify = useNotify();
    const location = useLocation();
    const userId = getUserIdFromUrl(location.pathname);

    const handlePrint = async () => {
        const apiUrl = `https://api.armauto.show/api/ticket/${userId}`;
        try {
            // Open the URL in a new window
            const newWindow = window.open(apiUrl, '_blank', 'noopener,noreferrer');

            if (newWindow) {
                // Wait for the new window to load
                newWindow.onload = () => {
                    // Create a print button
                    const printButton = newWindow.document.createElement('button');
                    printButton.textContent = 'Print';
                    printButton.style.position = 'absolute';
                    printButton.style.top = '10px';
                    printButton.style.right = '10px';
                    printButton.onclick = () => {
                        newWindow.print();
                    };

                    // Append the print button to the new window's body
                    newWindow.document.body.appendChild(printButton);
                };
            } else {
                console.error('Failed to open new window for printing.');
            }
        } catch (error) {
            notify(`Error: ${error.message}`, {type: 'error'});
        }
    };

    return (
        <Toolbar {...props}>
            <SaveButton color={"secondary"}/>
            <Button
                label="Print"
                onClick={handlePrint}
                variant="contained"
                color="secondary"
                style={{marginLeft: 10}}
                startIcon={<Print/>} // Place the Print icon inside the button
            >
                Print
            </Button>
        </Toolbar>
    );
};


const VisitorEventBanner = ({type}) => {
    const record = useRecordContext();
    if (!record) return null;

    const EVENT_LABELS = {
        CONSTRUCTION_2026: "CONSTRUCTION 2026 VISITOR",
    };

    if (record.event !== "CONSTRUCTION_2026") {
        return null
    }

    if (type === 'label') {
        return (
            <div  style={{textAlign: 'center'}}>
                <p className={styles.forum}>
                    <b>{EVENT_LABELS[record.event] || record.event}</b>
                </p>
            </div>
        )
    } else {
        return (
            <p>Please print a badge for <b  className={styles.forum}>{EVENT_LABELS[record.event]}</b></p>
        )
    }
};


export const VisitorEdit = (props) => {
    const navigate = useNavigate();
    const notify = useNotify();
    const {data: visitorInterestsData} = useQuery(GET_VISITOR_INTERESTS);
    const [, setInterestsTranslations] = useState({});
    const [updateVisitorMutation] = useMutation(UPDATE_VISITOR, {client: authClient});
    const {data: typesData} = useQuery(GET_TYPES);
    const VisitorType = typesData?.types
        .filter(type => type.name !== 'EXHIBITOR')
        .map(type => ({
            id: type.name,
            name: type.name,
        })) || [];

    useEffect(() => {
        if (visitorInterestsData) {
            const translations = {};
            visitorInterestsData.visitorInterests.forEach((interest) => {
                translations[interest.id] = interest.translations;
            });
            setInterestsTranslations(translations);
        }
    }, [visitorInterestsData]);

    const interestChoices =
        visitorInterestsData?.visitorInterests?.map((interest) => ({
            id: interest.id,
            name: interest.translations["en"] || interest.id,
        })) || [];


    const handleUpdateVisitor = (id, newData) => {
        updateVisitorMutation({
            variables: {
                id: id,
                _set: newData,
            },
        })
            .then(() => {
                notify('Visitor updated successfully', 'info');
                navigate(-1); // Go back after update
            })
            .catch(error => {
                notify(`Error: ${error.message}`, 'error');
            });
    };

    const handleSubmit = (formData) => {
        const {id, ...newData} = formData; // Extract id and other updated fields
        handleUpdateVisitor(id, newData); // Call handleUpdateVisitor with id and updated data
    };
    const isManager = localStorage.getItem('userRole') === 'manager';

    return (
        <Edit {...props}>
            <Button // Button for "Go Back"
                label="Go Back"
                onClick={() => navigate(-1)}
                variant="contained"
                color="secondary"
                style={{marginLeft: 10}}
            >
                Go Back
            </Button>
            <VisitorEventBanner type={'label'}/>
            <SimpleForm toolbar={<CustomToolbarEdit/>} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <TextInput fullWidth source="firstName" label="First Name" disabled={!isManager}
                                   validate={required()}/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextInput fullWidth source="lastName" label="Last Name" disabled={!isManager}
                                   validate={required()}/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextInput fullWidth source="email" label="Email" disabled={!isManager} validate={required()}/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextInput fullWidth source="shortCode" label="Short Code" disabled/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextInput fullWidth source="companyName" label="Company Name" disabled={!isManager}/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextInput fullWidth source="phoneNumber" label="Phone Number" disabled={!isManager}/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <SelectInput
                            fullWidth
                            source="type"
                            label="Type"
                            choices={VisitorType}
                            disabled
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <AutocompleteArrayInput
                            fullWidth
                            source="interestsIds"
                            label="Interests"
                            choices={interestChoices}
                            disabled={!isManager}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <TextInput fullWidth source="notes" label="Notes" disabled={!isManager}/>
                    </Grid>
                </Grid>
                <VisitorEventBanner/>
            </SimpleForm>

        </Edit>
    );
};

