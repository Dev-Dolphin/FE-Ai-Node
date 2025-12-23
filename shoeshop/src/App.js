import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import { store } from './redux/store';
import Login from './pages/Login';
import Signin from './pages/Signin';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import './App.css';
import UserList from './pages/user/UserList';
const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useSelector((state) => state.auth);
    console.log("isAuthenticated", isAuthenticated)

    return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <Provider store={store}>
            <Router>
                <div className="App">
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/signin" element={<Signin />} />
                        <Route
                            path="/products"
                            element={
                                <PrivateRoute>
                                    <ProductList />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/products/:id"
                            element={
                                <PrivateRoute>
                                    <ProductDetail />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/users"
                            element={
                                <PrivateRoute>
                                    <UserList />
                                </PrivateRoute>
                            }
                        />
                        <Route path="*" element={<Navigate to="/login" />} />
                    </Routes>
                </div>
            </Router>
        </Provider>
    );
}

export default App;
