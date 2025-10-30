'use client';
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Header: React.FC = () => {
    const { t, toggleLang } = useApp();

    return (
        <AppBar
            position="static"
            sx={{
                backgroundColor: '#021936',
                boxShadow: '0px 2px 4px rgba(0,0,0,0.15)',
                py: 1,
            }}
        >
            <Toolbar
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    px: { xs: 2, sm: 4 },
                }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                >
                    <Box>
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 700,
                                color: 'white',
                                textTransform: 'uppercase',
                                lineHeight: 0.9,
                            }}
                        >
                            SocialEase
                        </Typography>
                        <Typography
                            variant="subtitle2"
                            sx={{
                                color: 'rgba(255,255,255,0.7)',
                                fontWeight: 400,
                                fontSize: '0.85rem',
                                letterSpacing: '0.04em',
                            }}
                        >
                            Social Support Application
                        </Typography>
                    </Box>
                </motion.div>
                <Button
                    onClick={toggleLang}
                    variant="contained"
                    startIcon={<Globe size={18} />}
                    sx={{
                        backgroundColor: 'rgba(255,255,255,0.15)',
                        color: 'white',
                        textTransform: 'none',
                        borderRadius: 2,
                        fontSize: '0.9rem',
                        px: 2.5,
                        py: 1,
                        '&:hover': {
                            backgroundColor: 'rgba(255,255,255,0.25)',
                        },
                    }}
                >
                    {t.lang}
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
