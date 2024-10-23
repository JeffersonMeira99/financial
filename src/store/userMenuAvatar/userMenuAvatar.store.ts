import { create } from 'zustand';

interface UserMenuStore {
    anchorElUser: null | HTMLElement;
    openUserMenu: (event: React.MouseEvent<HTMLElement>) => void;
    closeUserMenu: () => void;
}

const useUserMenuStore = create<UserMenuStore>(set => ({
    anchorElUser: null,
    openUserMenu: event => set({ anchorElUser: event.currentTarget }),
    closeUserMenu: () => set({ anchorElUser: null }),
}));

export default useUserMenuStore;
