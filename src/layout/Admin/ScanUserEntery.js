import React, {useState} from 'react';
import {useMutation, useLazyQuery, gql} from '@apollo/client';
import {QrReader} from 'react-qr-reader';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
    CircularProgress,
    TextField,
    Grid,
} from '@mui/material';
import { useNotify} from 'react-admin';
import {VISITOR_ENTERED_MUTATION} from '../../graphql/queries';
import {authClient} from "../../apolloClient";
import styles from "./Admin.module.scss"
import SearchIcon from '@mui/icons-material/Search';
import Slide from '@mui/material/Slide';

// GraphQL Query to get visitor by ID
const GET_VISITOR_BY_ID = gql`
    query GetVisitorById($id: uuid!) {
        visitor(id: $id) {
            id
            firstName
            lastName
            email
            companyName
            phoneNumber
            shortCode
            status
            type
            event
        }
    }
`;

// GraphQL Query to get visitors by short code
const GET_VISITOR_BY_SHORT_CODE = gql`
    query GetVisitorByShortCode($shortCode: String!) {
        visitors(where: { shortCode: { _eq: $shortCode } }) {
            id
            firstName
            lastName
            email
            companyName
            phoneNumber
            shortCode
            status
            type
            event
        }
    }
`;


const Transition = React.forwardRef(function Transition(
    props,
    ref,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ScanUserEntry = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [shortCode, setShortCode] = useState('');
    const [mutate, {loading: mutationLoading, error: mutationError}] = useMutation(VISITOR_ENTERED_MUTATION, {client: authClient});
    const [getVisitorById, {data: visitorByIdData, loading: visitorByIdLoading, error: visitorByIdError}] = useLazyQuery(GET_VISITOR_BY_ID, {
        fetchPolicy: 'network-only', // Fetch from network instead of cache
        client: authClient
    });
    const [getVisitorByShortCode, {data: visitorByShortCodeData, loading: visitorByShortCodeLoading, error: visitorByShortCodeError}] = useLazyQuery(GET_VISITOR_BY_SHORT_CODE, {
        fetchPolicy: 'network-only', // Fetch from network instead of cache
        client: authClient
    });
    const notify = useNotify();
    const [selectedVisitor, setSelectedVisitor] = useState(null);
    const [isQRReaderOpen, setIsQRReaderOpen] = useState(false);

    const handleScan = async (data) => {
        if (data) {
            try {
                const result = await getVisitorById({variables: {id: data.text}});
                handleVisitorData(result);
                handleCloseQRReader()
            } catch (err) {
                notify('Error fetching visitor.');
            }
        }
    };

    const handleShortCodeSubmit = async () => {
        try {
            const result = await getVisitorByShortCode({variables: {shortCode}});
            handleVisitorData(result);
        } catch (err) {
            notify('Error fetching visitor.');
        }
    };

    const handleVisitorData = (result) => {
        const visitor = result?.data?.visitor || result?.data?.visitors[0];
        if (visitor) {
            setSelectedVisitor(visitor);
            setIsDialogOpen(true);
        } else {
            notify('No visitor found with the entered short code.');
        }
    };

    const handleEntranceSubmit = async () => {
        try {
            await mutate({variables: {id: selectedVisitor.id}});
            notify('Visitor status updated and entry recorded successfully.');
        } catch (err) {
            notify('Error updating visitor status.');
        }
        setIsDialogOpen(false);
    };

    const handleError = (err) => {
        notify(`Error: ${err.message}`, {type: 'error'});
    };

    const handleOpenQRReader = () => {
        setIsQRReaderOpen(true);
    };

    const handleCloseQRReader = () => {
        setIsQRReaderOpen(false);
    };

    // Utility function to check if the device is mobile
    const isMobileDevice = () => {
        return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
    };
    const constraints = isMobileDevice() ? {facingMode: {exact: "environment"}} : {facingMode: "user"};

    return (
        <div>
            <h2 style={{textAlign: "center", marginTop: "30px"}}>Ticket Scanner</h2>
            <Grid container spacing={2} justifyContent="center" style={{smarginTop: "20px"}}>
                <Grid item xs={12} md={12} className={styles.centered}>
                    <Button
                        onClick={handleOpenQRReader}
                        variant="contained"
                        color="primary"
                        style={{marginTop: '20px'}}>
                        Scan QR Code
                    </Button>
                </Grid>
                <Grid item xs={12} sm={12} md={12} className={styles.centered}
                      style={{paddingTop: "30px", color: "#737373"}}>
                    - OR -
                </Grid>
                <Grid item xs={7} sm={6} md={4} lg={3}>
                    <TextField
                        fullWidth
                        label="Enter Short Code Manually"
                        value={shortCode}
                        onChange={(e) => setShortCode(e.target.value)}
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={4} sm={2} md={2}>
                    <Button
                        onClick={handleShortCodeSubmit}
                        variant="contained"
                        color="primary"
                        style={{marginTop: '10px'}}
                        disabled={visitorByShortCodeLoading}
                        startIcon={<SearchIcon/>}
                    >
                        {visitorByShortCodeLoading ? <CircularProgress size={24}/> : 'Search'}
                    </Button>
                </Grid>
            </Grid>

            {visitorByShortCodeError && <p style={{color: 'red'}}>Error: {visitorByShortCodeError.message}</p>}

            <Dialog fullScreen={isMobileDevice()} fullWidth={true} open={isQRReaderOpen} onClose={() => setIsQRReaderOpen(false)}>
                <DialogTitle>Scan QR Code</DialogTitle>
                <DialogContent>
                    <QrReader
                        delay={300}
                        onError={handleError}
                        onResult={handleScan}
                        style={{width: '100%'}}
                        constraints={constraints}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsQRReaderOpen(false)}>Close</Button>
                </DialogActions>
            </Dialog>
            <Dialog
                TransitionComponent={Transition}
                fullWidth={true}
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
            >
                <DialogTitle>Visitor Details</DialogTitle>
                <DialogContent>
                    {selectedVisitor && (
                        <div className={styles.modalInfo}>
                            <p><b>Name:</b> {selectedVisitor.firstName} {selectedVisitor.lastName}</p>
                            <p><b>Email:</b> {selectedVisitor.email}</p>
                            <p><b>Company:</b> {selectedVisitor.companyName}</p>
                            <p><b>Phone Number:</b> {selectedVisitor.phoneNumber}</p>
                            <p><b>Type:</b> {selectedVisitor.type}</p>
                            <p><b>Short Code:</b> {selectedVisitor.shortCode}</p>
                            {selectedVisitor.event === "ITF_FORUM" &&  <p className={styles.forum}><b>FORUM PARTICIPANT</b></p>}

                        </div>
                    )}
                    <DialogActions style={{justifyContent: "center", marginTop: "20px"}}>
                        <Button
                            onClick={handleEntranceSubmit}
                            color="primary"
                            variant="contained"
                            disabled={mutationLoading}
                        >
                            Submit Entrance
                        </Button>
                        <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
                        {mutationError && <p style={{color: 'red'}}>Error: {mutationError.message}</p>}
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ScanUserEntry;
