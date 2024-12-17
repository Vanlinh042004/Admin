// src/App.jsx
import React from 'react';
import { Route, Routes, Navigate } from "react-router-dom";
//import * as jwt_decode from 'jwt-decode';

import Sidebar from "./components/common/Sidebar";
import OverviewPage from "./pages/OverviewPage";
import ClassPage from "./pages/ClassPage";
import UsersPage from "./pages/UsersPage";
import TutorPage from "./pages/TutorPage";
import SettingsPage from "./pages/SettingsPage";
import EditProfilePage from "./pages/EditProfilePage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import LoginPage from "./pages/LoginPage";
import EditClass from "./components/class/EditClass";

function parseJwt(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        return JSON.parse(atob(base64));
    } catch (error) {
        console.error("Invalid token:", error.message);
        return null;
    }

}
function PrivateRoute({ children }) {
    const token = sessionStorage.getItem('token');
    let isAuthenticated = false;
    let decodedToken = null;
    if (token) {
        try {
            const decodedToken = parseJwt(token);
            const currentTime = Date.now() / 1000; // Thời gian hiện tại tính bằng giây
            
            if (decodedToken.exp > currentTime) {
                isAuthenticated = true; // Token còn hiệu lực
            } else {
                // Token đã hết hạn
                sessionStorage.removeItem('token'); // Corrected to sessionStorage
            }
        } catch (error) {
            // Token không hợp lệ
            sessionStorage.removeItem('token'); // Corrected to sessionStorage
        }
    }
    console.log('Token:', token);
    console.log('Decoded Token:', decodedToken);
    console.log('Current time:', Date.now() / 1000);
    console.log('exp:', decodedToken?.exp);
    console.log('Is authenticated:', isAuthenticated);
    return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
    return (
        <div className='flex h-screen bg-gray-900 text-gray-100 overflow-hidden'>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route
                    path="/*"
                    element={
                        <PrivateRoute>
                            {/* Nền */}
                            <div className='fixed inset-0 z-0'>
                                <div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80' />
                                <div className='absolute inset-0 backdrop-blur-sm' />
                            </div>
                            
                            {/* Sidebar và các route được bảo vệ */}
                            <Sidebar />
                            <Routes>
                                <Route path='/' element={<OverviewPage />} />
                                <Route path='/class' element={<ClassPage />} />
                                <Route path='/classes/edit/:id' element={<EditClass />} />
                                <Route path='/tutor' element={<TutorPage />} />
                                <Route path='/users' element={<UsersPage />} />
                                <Route path='/settings' element={<SettingsPage />} />
                                <Route path="/settings/edit_profile" element={<EditProfilePage />} />
                                <Route path="/settings/change_password" element={<ChangePasswordPage />} />
                            </Routes>
                        </PrivateRoute>
                    }
                />
            </Routes>
        </div>
    );
}

export default App;