import React, {useState} from "react";
import {
    Create,
    SimpleForm,
    TextInput,
    List,
    Datagrid,
    TextField,
    EmailField,
    EditButton,
    DeleteButton,
    SelectInput,
    useRedirect,
    useNotify,
    DateField
} from 'react-admin';
import {Button, CircularProgress, Grid} from "@mui/material";
import {useNavigate} from 'react-router-dom';
import {useMutation, useQuery} from "@apollo/client";
import {ADD_EXHIBITOR, GET_ZONES} from "../../../graphql/queries";
import {authClient} from "../../../apolloClient";

export const ExhibitorCreate = (props) => {
    const navigate = useNavigate();
    const {loading, error, data: zonesData} = useQuery(GET_ZONES);
    const [addExhibitor, {loading: mutationLoading}] = useMutation(ADD_EXHIBITOR, {client: authClient});
    const notify = useNotify();
    const redirect = useRedirect();
    const [selectedZone, setSelectedZone] = useState('');

    const handleZoneChange = (event) => {
        setSelectedZone(event.target.value);
    };

    if (mutationLoading) return <CircularProgress/>;

    const handleSubmit = async (values) => {
        try {
            const {data} = await addExhibitor({
                variables: {
                    companyName: values.companyName,
                    industry: values.industry || "",
                    brands: values.brands || "",
                    email: values.email || "",
                    zoneId: values.zone || "",
                    zoneNumbers: values.zoneNumber || "",
                    phoneNumber: values.phoneNumber || "",
                    notes: values.notes || "",
                    message: values.notes || "",
                    website: values.companyName,
                }
            });
            if (data.insertExhibitors.affected_rows > 0) {
                notify('Exhibitor added successfully');
                redirect('/exhibitors');
            }
        } catch (error) {
            notify(`Error: ${error.message}`, {type: 'error'});
        }
    };

    // Map the data to the format required by AutocompleteArrayInput
    const zoneChoice = zonesData?.zones?.map(zone => ({
        id: zone.id,
        name: zone.name
    })) || [];

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

    return (
        <Create {...props}>
            <Button // Button for "Go Back"
                label="Go Back"
                onClick={() => navigate(-1)}
                variant="contained"
                color="secondary"
                style={{marginLeft: 10}}
            >
                Go Back
            </Button>
            <SimpleForm onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <TextInput fullWidth source="companyName" label="Company Name"/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextInput fullWidth source="email" label="Email"/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextInput fullWidth source="phoneNumber" label="Phone Number"/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextInput fullWidth source="brands" label="Brands"/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextInput fullWidth source="industry" label="Industry"/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <SelectInput fullWidth source="zone" label="Zone" choices={zoneChoice}
                                     onChange={handleZoneChange}/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <SelectInput fullWidth source="zoneNumber" label="Zone Number"
                                     choices={getAvailableNumbers(selectedZone)}/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextInput fullWidth source="notes" label="Notes"/>
                    </Grid>
                </Grid>
            </SimpleForm>
        </Create>
    )
};

export const ExhibitorList = (props) => {
    const redirect = useRedirect();

    return (
        <div>
            <Button
                onClick={() => redirect("/exhibitors/create")}
                color='secondary'
                style={{marginTop: '20px', marginBottom: "10px"}}
                variant="contained"
            >
                Add New
            </Button>
            <List {...props}
                  hasCreate={false}
                  exporter={false}
                  bulkActionButtons={false}
                  actions={false}
                  sort={{field: 'createdAt', order: 'DESC'}}
            >
                <Datagrid bulkActionButtons={false}>
                    <TextField source="companyName" label="Company Name"/>
                    <EmailField source="email" label="Email"/>
                    <TextField source="phoneNumber" label="Phone Number"/>
                    <TextField source="brands" label="Brands"/>
                    <TextField source="industry" label="Industry"/>
                    {/*<TextField source="website" label="Website"/>*/}
                    {/*<TextField source="message" label="Message"/>*/}
                    <TextField source="notes" label="Notes"/>
                    <TextField
                        label="Zone Numbers"
                        source="zoneNumbers"
                    />
                    <DateField source="createdAt" label="Created At" showTime/>

                    {/*  <EditButton basePath="/exhibitors"/>
                <DeleteButton basePath="/exhibitors"/> */}
                </Datagrid>
            </List>
        </div>
    );
};
