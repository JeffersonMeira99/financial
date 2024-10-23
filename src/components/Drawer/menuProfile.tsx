// UserMenu.tsx
import React from 'react';
import {
    Box,
    Tooltip,
    IconButton,
    Avatar,
    Menu,
    MenuItem,
    Typography,
} from '@mui/material';
import { menuAvatar } from '../../constants/menuItems';
import useUserMenuStore from '../../store/userMenuAvatar/userMenuAvatar.store';

const UserMenu: React.FC = () => {
    const { anchorElUser, openUserMenu, closeUserMenu } = useUserMenuStore();

    const settings = menuAvatar;

    return (
        <Box sx={{ ml: 'auto' }}>
            <Tooltip title="Open settings">
                <IconButton onClick={openUserMenu} sx={{ p: 0 }}>
                    <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/2.jpg"
                    />
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={closeUserMenu}
            >
                {settings.map((setting, index) => (
                    <MenuItem
                        key={index}
                        onClick={closeUserMenu}
                        sx={setting.sx}
                    >
                        <Typography
                            sx={{
                                textAlign: 'center',
                            }}
                        >
                            <setting.icon />
                        </Typography>
                        <Typography
                            sx={{
                                textAlign: 'center',
                                color: '#000',
                                ml: 2,
                                fontSize: '15px',
                             }}
                        >
                            {setting.text}
                        </Typography>
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    );
};

export default UserMenu;
