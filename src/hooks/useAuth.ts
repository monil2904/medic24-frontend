import { useAuthContext } from '@/context/AuthContext';

export const useAuth = () => {
    const { user, token, loading, login, logout, refreshUser } = useAuthContext();

    return {
        user,
        token,
        loading,
        isLoggedIn: !!user,
        login,
        logout,
        refreshUser
    };
};
