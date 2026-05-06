import React, {useState, useEffect} from 'react';
import buildHasuraProvider from 'ra-data-hasura';
import {Admin, Resource} from 'react-admin';

import {VisitorCreate, VisitorEdit, VisitorList} from './pages/visitors';
import LoginPage from "./pages/login";
import {ExhibitorCreate, ExhibitorList} from "./pages/exhibitors";
import authProvider from "./utils/authProvider";
import ScanUserEntry from "./ScanUserEntery";
import QrCodeIcon from '@mui/icons-material/QrCode';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import CustomLayout from "./components/CustomAppBar/CustomAppBar";

const AdminPage = () => {
    const [dataProvider, setDataProvider] = useState(null);

    useEffect(() => {
        const buildDataProvider = async () => {
            const token = localStorage.getItem('accessToken');
            const headers = token ?  { Authorization: `Bearer ${token}` } : {};

            const dataProvider = await buildHasuraProvider({
                clientOptions: {uri: 'https://api.armauto.show/v1/graphql', headers},
            }, {
                aggregateFieldName(resourceName) {
                    // Some roles don't have access to *_aggregate fields in Hasura.
                    // ra-data-hasura supports skipping count queries via NO_COUNT.
                    return 'NO_COUNT';
                }
            });

            setDataProvider(() => dataProvider);
        };
        buildDataProvider();
    }, []);


    if (!dataProvider) return <p>Loading...</p>;

    const userRole = localStorage.getItem('userRole')
    return (
        <Admin
            dataProvider={dataProvider}
            title="Hasura Dashboard"
            // dashboard={Dashboard}
            loginPage={LoginPage}
            authProvider={authProvider}
            layout={CustomLayout}
        >
            {userRole === 'manager' && (
                <>
                    <Resource
                        name="visitors"
                        list={VisitorList}
                        create={VisitorCreate}
                        edit={VisitorEdit}
                        icon={PersonIcon}
                        options={{ label: 'Visitors' }}
                    />
                    <Resource
                        name="ticket_qr_scan"
                        list={ScanUserEntry}
                        icon={QrCodeIcon}
                        options={{ label: 'Ticket QR Scanner' }}
                    />
                </>
            )}
            {userRole === 'basic' && (
                <Resource
                    name="visitors"
                    list={VisitorList}
                    create={VisitorCreate}
                    edit={VisitorEdit}
                    icon={PersonIcon}
                    options={{ label: 'Attendees' }}
                />
            )}
            {userRole === 'ticket_qr_check' && (
                <Resource
                    name="ticket_qr_scan"
                    list={ScanUserEntry}
                    icon={QrCodeIcon}
                    options={{ label: 'Ticket QR Scanner' }}
                />
            )}
        </Admin>
    );
};

export default AdminPage;