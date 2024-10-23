import { useState } from 'react';
import {
    Box,
    CssBaseline,
    Toolbar,
    IconButton,
    Typography,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { AppBar, Drawer, DrawerHeader } from './DrawerComponents';
import { menuItems } from '../../constants/menuItems';
import UserMenu from './menuProfile';

export default function MenuLateral() {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const tabClickEvent = (url: any) => {
        navigate(url.path);
    };

    return (
        <Box>
            <CssBaseline />
            <AppBar
                position="fixed"
                open={open}
                style={{ background: 'rgb(3 41 147 / 98%)' }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        BlueSky Banking
                    </Typography>
                    <Box sx={{ ml: 'auto' }}>
                        <UserMenu />
                    </Box>
                </Toolbar>
            </AppBar>

            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column-reverse',
                            color: 'white',
                        }}
                    >
                        <Typography
                            variant="body1"
                            sx={{
                                fontWeight: 'bold',
                                fontSize: '1rem',
                                marginBottom: theme.spacing(1),
                                color: 'white',
                            }}
                        >
                            Conta: 5435683-4
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                fontWeight: 'bold',
                                fontSize: '1rem',
                            }}
                        >
                            Agência: 3456
                        </Typography>
                    </Box>

                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? (
                            <ChevronRightIcon
                                sx={{
                                    color: '#fff',
                                    '&:hover': {
                                        backgroundColor: '#0000002a',
                                    },
                                }}
                            />
                        ) : (
                            <>
                                <ChevronLeftIcon
                                    sx={{
                                        color: '#fff',
                                        '&:hover': {
                                            backgroundColor: '#0000002a',
                                        },
                                    }}
                                />
                            </>
                        )}
                    </IconButton>
                </DrawerHeader>

                <Divider />
                <List>
                    {menuItems.map((item, index) => (
                        <ListItem
                            key={index}
                            disablePadding
                            sx={{
                                display: 'block',
                                '&:hover': {
                                    backgroundColor: '#0000009d',
                                },
                            }}
                        >
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                    color: '#fff',
                                }}
                                onClick={() => tabClickEvent(item)}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                        color: '#fff',
                                    }}
                                >
                                    <item.icon />
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.text}
                                    sx={{
                                        opacity: open ? 1 : 0,
                                        color: '#fff',
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                }}
            >
                <DrawerHeader />
            </Box>
        </Box>
    );
}
