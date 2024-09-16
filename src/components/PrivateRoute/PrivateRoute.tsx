import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(
        null,
    );

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log(token, 'token');
        setIsAuthenticated(!!token);
    }, []);

    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;
