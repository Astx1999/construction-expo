// CustomAppBar.js
import React from 'react';
import { AppBar, Layout, RefreshButton, UserMenu } from 'react-admin';
import { Box, Typography, Toolbar } from '@mui/material';
import {ReactComponent as Logo} from "../../../../images/logo.svg";
import styles from './CustomAppBar.module.scss'


const CustomAppBar = (props) => {
    return (
        <AppBar className={styles.appBar} {...props}>
            <Toolbar className={styles.logoWrapper} variant="dense">
                <Box className={styles.brand}>
                    <div className={styles.logo}>
                        <Logo />
                    </div>
                    {/* <Typography className={styles.title}>Registration Portal</Typography> */}
                </Box>

                <Box sx={{ flex: 1 }} />

            
            </Toolbar>
        </AppBar>
    );
};

const CustomLayout = (props) => <Layout {...props} appBar={CustomAppBar} />;


export default CustomLayout;
