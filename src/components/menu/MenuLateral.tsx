import {
    Avatar,
    Divider,
    Drawer,
    List,
    ListItemButton,
    ListItemText,
    useTheme,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

interface MenuLateralProps {
    children: ReactNode;
}

export const MenuLateral: React.FC<MenuLateralProps> = ({ children }) => {
    const theme = useTheme();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <>
            <Drawer variant="permanent">
                <Box
                    width={theme.spacing(28)}
                    height="100%"
                    display="flex"
                    flexDirection="column"
                >
                    <Box
                        width="100%"
                        height={theme.spacing(20)}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Avatar
                            sx={{
                                height: theme.spacing(12),
                                width: theme.spacing(12),
                            }}
                        />
                    </Box>

                    <Divider />

                    <Box flex={1}>
                        <List component="nav">
                            <ListItemButton component={Link} to="/home">
                                <ListItemText primary="Home" />
                            </ListItemButton>
                            <ListItemButton
                                component={Link}
                                to="/transactionForm"
                            >
                                <ListItemText primary="Realizar Tranferência" />
                            </ListItemButton>

                            <ListItemButton
                                component={Link}
                                onClick={handleLogout}
                                to="/"
                            >
                                <ListItemText primary="Sair" />
                            </ListItemButton>
                        </List>
                    </Box>
                </Box>
            </Drawer>

            <Box height="100vh" marginLeft={theme.spacing(28)}>
                {children}
            </Box>
        </>
    );
};
