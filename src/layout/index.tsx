import React, { FC } from 'react';
import { Box, Container } from '@mui/material';
import Header from './header';
import Footer from './footer';

interface IProps {
    children?: React.ReactNode;
}

const Layout: FC<IProps> = ({ children }) => {
    return (
        <Box display="flex" flexDirection="column" minHeight="100vh">
            <Header />
            <Box component="main" flexGrow={1}>
                {children}
            </Box>
            <Footer />
        </Box>
    );
};

export default Layout;
