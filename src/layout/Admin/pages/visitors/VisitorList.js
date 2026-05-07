import React, {useEffect, useState} from "react";
import {
    TextInput,
    List,
    Datagrid,
    TextField,
    EmailField,
    useGetList,
    DateField,
    FunctionField,
    Filter,
    useRedirect,
    useNotify,
    SelectInput,
    WithListContext
} from 'react-admin';
import {Box, Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, Typography, useMediaQuery} from "@mui/material";
import {useNavigate} from 'react-router-dom';
import PrintIcon from '@mui/icons-material/Print';
import { QrReader } from "@cmdnio/react-qr-reader";
import { CURRENT_EVENT } from "../../../../constants/events";

// Define a filter component
const VisitorFilter = ({ setFilters, searched, eventChoices, ...props }) => {
    const handleInputChange = (e) => {
        const hasLength = e.currentTarget.value.length > 0;
        if (setFilters && ((hasLength && !searched) || (!hasLength && searched))) {
            setFilters(hasLength);
        }
    };
    const isBasic = localStorage.getItem('userRole') === 'basic';
    return (
        <Filter {...props}>
            <TextInput label="Short Code" source="shortCode" alwaysOn onChange={handleInputChange}/>
            <TextInput label="Email" source="email" alwaysOn onChange={handleInputChange}/>
            <TextInput label="Phone Number" source="phoneNumber" alwaysOn onChange={handleInputChange}/>
            <TextInput label="First Name" source="firstName" alwaysOn onChange={handleInputChange}/>
            <TextInput label="Last Name" source="lastName" alwaysOn onChange={handleInputChange}/>
            <SelectInput
                label="Type"
                source="type"
                choices={[
                    {id: 'B2B', name: 'B2B'},
                    {id: 'GUEST', name: 'GUEST'},
                    {id: 'VIP', name: 'VIP'},
                    {id: 'VISITOR', name: 'VISITOR'},
                ]}
                alwaysOn
                disabled={isBasic}
                emptyText="ALL"
            />
            <SelectInput
                label="Event"
                source="event"
                choices={eventChoices}
                alwaysOn
                emptyText="ALL"
            />
        </Filter>
    );
};


export const VisitorList = (props) => {
    const { data: eventUsersData } = useGetList("eventUsers", {
        pagination: { page: 1, perPage: 1000 },
        sort: { field: "event", order: "ASC" },
    });
    const eventChoices =
        Array.from(new Set((eventUsersData || []).map((x) => x.event)))
            .filter(Boolean)
            .map((event) => ({ id: event, name: event }));

    // Fetch a large page to effectively get "all" interests (typically small lookup table).
    // Also scope interests to the current event.
    const { data: visitorInterestsData } = useGetList("visitorInterests", {
        pagination: { page: 1, perPage: 10000 },
        sort: { field: "id", order: "ASC" },
    });
    const [interestsTranslations, setInterestsTranslations] = useState({});
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [searched, setSearched] = useState(false); // State to track if search has been performed
    const redirect = useRedirect();
    const notify = useNotify();
    const navigate = useNavigate();
    const isSmall = useMediaQuery((theme) => theme.breakpoints.down("md"));


    useEffect(() => {
        if (visitorInterestsData) {
            const translations = {};
            visitorInterestsData.forEach((interest) => {
                // Normalize keys to string to avoid number/string mismatches
                translations[String(interest.id)] = interest.translations;
            });
            setInterestsTranslations(translations);

            console.log(translations);
            console.log(visitorInterestsData);
        }
    }, [visitorInterestsData]);

    const renderInterests = (record) => {
        const ids = Array.isArray(record?.interestsIds) ? record.interestsIds : [];
        if (!ids.length) return null; // don't show "0"

        return ids
            .map((interestId) => {
                const key = String(interestId);
                const translations = interestsTranslations?.[key];
                const name = translations?.en || translations?.am;
                return name || key;
            })
            .filter(Boolean)
            .join(", ");
    };

    const handleError = (err) => {
        notify(`Error: ${err.message}`, {type: 'error'});
    };

    const handleRowClick = (id) => {
        navigate(`/visitors/${id}`);
    };

    const handlePrint = async (userId) => {
        const apiUrl = `https://api.armauto.show/api/ticket/${userId}`;
        try {
            // Open the URL in a new window
            const newWindow = window.open(apiUrl, '_blank', 'noopener,noreferrer');

            if (newWindow) {
                // Wait for the new window to load
                newWindow.onload = () => {
                    // Create a print button for manual printing
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

                    // Automatically trigger the print dialog
                    newWindow.print();
                };
            } else {
                console.error('Failed to open new window for printing.');
            }
        } catch (error) {
            notify(`Error: ${error.message}`, {type: 'error'});
        }
    };


    const isBasic = localStorage.getItem('userRole') === 'basic';
    const isManager = localStorage.getItem('userRole') === 'manager';

    const handleFilter = (isFiltered) => {
        // Check if registrant role and filterValues are present
        if (isBasic && isFiltered) {
            setSearched(true);
        } else {
            setSearched(false);
        }
    };

// Utility function to check if the device is mobile
    const isMobileDevice = () => {
        return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
    };
    const constraints = isMobileDevice() ? { facingMode: "environment" } : { facingMode: "user" };

    const handleScanResult = (result) => {
        const text = result?.text;
        if (!text) return;
        redirect(`/visitors/${text}`);
        setIsDialogOpen(false);
    };

    return (
        <div>
            <Button
                onClick={() => setIsDialogOpen(true)}
                color='secondary'
                style={{marginTop: '20px', marginRight: "20px", marginBottom: "10px"}}
                variant="contained"
            >
                Scan the QR
            </Button>
            <Button
                onClick={() => redirect("/visitors/create")}
                color='secondary'
                style={{marginTop: '20px', marginBottom: "10px"}}
                variant="contained"
            >
                Add New
            </Button>
            <Dialog fullWidth={true} open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
                <DialogTitle>Scan QR Code</DialogTitle>
                <DialogContent>
                    <QrReader
                        constraints={constraints}
                        onResult={handleScanResult}
                        style={{ width: "100%" }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
                </DialogActions>
            </Dialog>

            <List {...props}
                  exporter={false}
                  hasCreate={false}
                  filters={<VisitorFilter setFilters={isBasic && handleFilter} searched={searched} eventChoices={eventChoices} />}
                  filter={isBasic ? { type: 'VISITOR' } : null}
                  filterDefaultValues={isBasic ? { type: 'VISITOR', event: CURRENT_EVENT } : { event: CURRENT_EVENT }}
                  sort={{field: 'createdAt', order: 'DESC'}}
                  pagination={isBasic && !searched ? null : props.pagination}
            >
                {isSmall ? (
                    <WithListContext
                        render={({ data }) => (
                            <Box sx={{ display: "grid", gap: 2 }}>
                                {(data || []).map((record) => {
                                    const fullName =
                                        `${record.firstName || ""} ${record.lastName || ""}`.trim() || "—";
                                    const interests = renderInterests(record);

                                    return (
                                        <Card
                                            key={record.id}
                                            onClick={() => handleRowClick(record.id)}
                                            sx={{
                                                cursor: "pointer",
                                                backgroundColor: "#f8f8f9",
                                                borderRadius: 2,
                                                boxShadow: "none",
                                            }}
                                        >
                                            <CardContent sx={{ display: "grid", gap: 0.75 }}>
                                                <Typography sx={{ fontWeight: 800, color: "#0b1726" }}>
                                                    {fullName}
                                                </Typography>

                                                <Typography sx={{ color: "#5b6776" }}>
                                                    <b>Email:</b> {record.email || "—"}
                                                </Typography>
                                                <Typography sx={{ color: "#5b6776" }}>
                                                    <b>Phone:</b> {record.phoneNumber || "—"}
                                                </Typography>
                                                <Typography sx={{ color: "#5b6776" }}>
                                                    <b>Company:</b> {record.companyName || "—"}
                                                </Typography>
                                                <Typography sx={{ color: "#5b6776" }}>
                                                    <b>Short code:</b> {record.shortCode || "—"}
                                                </Typography>
                                                <Typography sx={{ color: "#5b6776" }}>
                                                    <b>Type:</b> {record.type || "—"}
                                                </Typography>
                                                <Typography sx={{ color: "#5b6776" }}>
                                                    <b>Event:</b> {record.event || "—"}
                                                </Typography>
                                                <Typography sx={{ color: "#5b6776" }}>
                                                    <b>Interests:</b> {interests || "—"}
                                                </Typography>
                                                {record.notes ? (
                                                    <Typography sx={{ color: "#5b6776" }}>
                                                        <b>Notes:</b> {record.notes}
                                                    </Typography>
                                                ) : null}

                                                <Box sx={{ pt: 1 }}>
                                                    <Button
                                                        size="small"
                                                        variant="outlined"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handlePrint(record.id);
                                                        }}
                                                        sx={{
                                                            borderColor: "#E8EAEE",
                                                            color: "#032E42",
                                                            textTransform: "none",
                                                            fontWeight: 700,
                                                        }}
                                                    >
                                                        Print badge
                                                    </Button>
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    );
                                })}
                            </Box>
                        )}
                    />
                ) : (
                    <Datagrid
                        rowClick={(id) => handleRowClick(id)}
                        bulkActionButtons={false}
                        data={isBasic && !searched ? null : props.data}
                    >
                        <TextField source="firstName" label="First Name"/>
                        <TextField source="lastName" label="Last Name"/>
                        <EmailField source="email" label="Email"/>
                        <TextField source="shortCode" label="Short Code"/>
                        
                        <TextField source="phoneNumber" label="Phone Number"/>
                        <FunctionField
                            label="Interests"
                            render={renderInterests}
                        />
                        <TextField source="companyName" label="Company Name"/>
                        <TextField source="notes" label="Notes"/>
                        <TextField source="type" label="Type"/>
                        <TextField source="event" label="Event"/>
                        <DateField source="createdAt" label="Created At" showTime/>
                        <FunctionField
                            label=""
                            render={(record) => (
                                <Button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handlePrint(record.id);
                                    }}
                                    style={{backgroundColor: 'transparent', color: '#032e42'}}
                                >
                                    <PrintIcon color={'#032e42'}/>
                                </Button>
                            )}
                        />
                    </Datagrid>
                )}
            </List>

        </div>
    );
};

