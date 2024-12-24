// CustomAppBar.js
import React from 'react';
import { AppBar, UserMenu, Layout } from 'react-admin';
import { Typography, Toolbar } from '@mui/material';
import {ReactComponent as Logo} from "../../../../images/logo.svg";
import styles from './CustomAppBar.module.scss'


const CustomAppBar = (props) => {
    return (
        <AppBar  style={{ backgroundColor: '#0D1B2C'}} {...props}>
            <Toolbar >
                <div className={styles.logoWrapper}>
                    <div className={styles.logo}>
                        <Logo/>
                    </div>
                </div>
                <Typography className={styles.title}>
                    Registration Portal
                </Typography>

                <span />
            </Toolbar>
        </AppBar>
    );
};

const CustomLayout = (props) => <Layout {...props} appBar={CustomAppBar} />;


export default CustomLayout;
