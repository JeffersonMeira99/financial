import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { MenuLateral } from '../components/menu/MenuLateral';
import PrivateRoute from '../components/PrivateRoute/PrivateRoute';
import Home from '../pages/home/Home';
import TransactionForm from '../components/transactionForm/TransactionForm';
import Login from '../pages/login/Login';

const AppRoutes = () => {
    const location = useLocation();

    return location.pathname !== '/' ? (
        <MenuLateral>
            <Routes>
                <Route
                    path="/home"
                    element={
                        <PrivateRoute>
                            <Home />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/transactionForm"
                    element={
                        <PrivateRoute>
                            <TransactionForm />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </MenuLateral>
    ) : (
        <Routes>
            <Route path="/" element={<Login />} />
        </Routes>
    );
};

export default AppRoutes;
