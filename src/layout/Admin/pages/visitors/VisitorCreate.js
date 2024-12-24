import React from "react";
import {
    Create,
    SimpleForm,
    TextInput,
    SaveButton,
    Toolbar,
    AutocompleteArrayInput,
    SelectInput,
    useRedirect,
    useNotify,
    required,
} from 'react-admin';
import { Grid, CircularProgress, Button } from "@mui/material";
import {ADD_VISITOR_WITH_TYPE, GET_TYPES, GET_VISITOR_INTERESTS} from "../../../../graphql/queries";
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from "@apollo/client";
import { authClient } from "../../../../apolloClient";

const CustomToolbar = (props) => (
    <Toolbar {...props}>
        <SaveButton color="secondary"/>
    </Toolbar>
);

export const VisitorCreate = (props) => {
    const { loading, error, data } = useQuery(GET_VISITOR_INTERESTS);
    const { data: typesData } = useQuery(GET_TYPES);
    // const { data: eventData } = useQuery(GET_EVENT_USERS);
    const [addVisitor, { loading: mutationLoading }] = useMutation(ADD_VISITOR_WITH_TYPE, { client: authClient });
    const notify = useNotify();
    const redirect = useRedirect();
    const navigate = useNavigate();

    const VisitorType = typesData?.types
        .filter(type => type.name !== 'EXHIBITOR')
        .map(type => ({
            id: type.name,
            name: type.name,
        })) || [];
    // const EventType = eventData?.eventUsers
    //     .map(user => ({
    //         id: user.event,
    //         name: user.event,
    //     })) || [];

    const isBasic = localStorage.getItem('userRole') === 'basic'

    if (loading || mutationLoading) return <CircularProgress />;
    if (error) return <p>Error: {error.message}</p>;

    // Map the data to the format required by AutocompleteArrayInput
    const interestChoices = data.visitorInterests.map(interest => ({
        id: interest.id,
        name: interest.translations['en'] || interest.id // Default to id if translation not available
    }));

    const handleSubmit = async (values) => {
        try {
            const { data } = await addVisitor({
                variables: {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    email: values.email,
                    notes: values.notes || "",
                    companyName: values.companyName || "",
                    phoneNumber: values.phoneNumber || "",
                    interestsIds: values.interestsIds,
                    type: isBasic ? 'VISITOR' : values.type, // Set type to VISITOR if user role is basic
                }
            });
            if (data.insertVisitors.affected_rows > 0) {
                notify('Visitor added successfully');
                redirect('/visitors');
            }
        } catch (error) {
            notify(`Error: ${error.message}`, { type: 'error' });
        }
    };

    return (
        <Create {...props}>
            <Button // Button for "Go Back"
                label="Go Back"
                onClick={() => navigate(-1)}
                variant="contained"
                color="secondary"
                style={{ marginLeft: 10 }}
            >
                Go Back
            </Button>
            <SimpleForm onSubmit={handleSubmit} toolbar={<CustomToolbar />}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <TextInput fullWidth source="firstName" label="First Name" validate={required()} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextInput fullWidth source="lastName" label="Last Name"  validate={required()}/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextInput fullWidth source="email" label="Email"  validate={required()} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextInput fullWidth source="shortCode" label="Short Code" disabled />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextInput fullWidth source="companyName" label="Company Name" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextInput fullWidth source="phoneNumber" label="Phone Number" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        {isBasic ? (
                            <TextInput fullWidth source="type" label="Type" defaultValue="VISITOR" disabled />
                        ) : (
                            <SelectInput fullWidth source="type" label="Type" choices={VisitorType} defaultValue="VISITOR" />
                        )}
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <AutocompleteArrayInput fullWidth source="interestsIds" label="Interests" choices={interestChoices} />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <TextInput fullWidth source="notes" label="Notes" />
                    </Grid>
                </Grid>
            </SimpleForm>
        </Create>
    );
};
