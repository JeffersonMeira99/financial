import HomeIcon from '@mui/icons-material/Home';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import LoanIcon from '@mui/icons-material/MonetizationOn';
import SecurityIcon from '@mui/icons-material/Security';
import SavingsIcon from '@mui/icons-material/Savings';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import BusinessIcon from '@mui/icons-material/Business';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { SxProps } from '@mui/material';

interface MenuItem {
    to: string;
    text: string;
    icon: React.FC;
    sx?: SxProps;
}

export const menuItems: MenuItem[] = [
    {
        to: '/home',
        text: 'Home',
        icon: HomeIcon,
        sx: { color: '#fff' },
    },
    {
        to: '/transactionForm',
        text: 'Transferência',
        icon: TransferWithinAStationIcon,
        sx: { color: '#fff' },
    },
    {
        to: '/investments',
        text: 'Investimentos',
        icon: AccountBalanceIcon,
        sx: { color: '#fff' },
    },
    {
        to: '/loans',
        text: 'Empréstimos',
        icon: LoanIcon,
        sx: { color: '#fff' },
    },
    {
        to: '/insurance',
        text: 'Seguros',
        icon: SecurityIcon,
        sx: { color: '#fff' },
    },
    {
        to: '/savings',
        text: 'Poupança',
        icon: SavingsIcon,
        sx: { color: '#fff' },
    },
    {
        to: '/benefits',
        text: 'Benefícios',
        icon: CardGiftcardIcon,
        sx: { color: '#fff' },
    },
    {
        to: '/business',
        text: 'Seus Negócios',
        icon: BusinessIcon,
        sx: { color: '#fff' },
    },
    {
        to: '/cryptocurrencies',
        text: 'Criptomoedas',
        icon: AttachMoneyIcon,
        sx: { color: '#fff' },
    },
    {
        to: '/cards',
        text: 'Cartões',
        icon: CreditCardIcon,
        sx: { color: '#fff' },
    },
    {
        to: '/notifications',
        text: 'Notificações',
        icon: NotificationsIcon,
        sx: { color: '#fff' },
    },
];

export const menuAvatar: MenuItem[] = [
    {
        to: '/logout',
        text: 'Sair',
        icon: ExitToAppIcon,
        sx: { color: 'rgba(0, 0, 0, 0.54)' },
    },
    {
        to: '/settings',
        text: 'Perfil',
        icon: SettingsIcon,
        sx: { color: 'rgba(0, 0, 0, 0.54)' },
    },
];
