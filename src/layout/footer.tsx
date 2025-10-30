import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: '#021936ff',
                color: 'white',
                py: 2,
                mt: 'auto',
                textAlign: 'center',
                boxShadow: '0px -2px 4px rgba(0,0,0,0.1)',
            }}
        >
            <Typography
                variant="body2"
                sx={{
                    opacity: 0.9,
                    letterSpacing: 0.3,
                }}
            >
                © {new Date().getFullYear()} SocialEase. All rights reserved.
            </Typography>
        </Box>
    );
};

export default Footer;
