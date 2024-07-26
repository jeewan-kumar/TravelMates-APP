
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [splashLoading, setSplashLoading] = useState(true);
    const BASE_URL = "http://192.168.33.157:5164/";

    const signUp = async ({ fullName, email, phoneNumber, dateOfBirth, password }) => {
        setIsLoading(true);
        const params = {
            eventID: "1001",
            addInfo: {
                full_name: fullName,
                email: email,
                phone_number: phoneNumber,
                date_of_birth: dateOfBirth,
                password: password
            }
        };
        try {
            const response = await axios.post(`${BASE_URL}TravelMates_Users`, params);
            console.log('SignUp Response:', response.data);
            const userInfo = response.data;
            if (userInfo.rData && userInfo.rData.rMessage === "Duplicate Credentials") {
                setIsLoading(false);
                return { success: false, message: 'Duplicate Credentials' };
            }
            const { user_id, emailotp_id, phoneotp_id } = userInfo.rData || {};
            setUserInfo(userInfo);
            await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
            setIsLoading(false);
            return { success: true, user_id, emailotp_id, phoneotp_id };
        } catch (error) {
            console.error(`Sign up failed: ${error}`);
            setIsLoading(false);
            return { success: false, message: 'Sign-up failed. Please try again.' };
        }
    };

    const signIn = async (identifier, password, isEmailLogin = true) => {
        setIsLoading(true);
        const params = {
            eventID: "1001",
            addInfo: {
                [isEmailLogin ? "email" : "phone_number"]: identifier,
                password
            }
        };
        try {
            console.log('signIn OTP with params:', params);
            const response = await axios.post(`${BASE_URL}TravelMates_SignIn`, params);
            console.log('signIn Response:', response.data);
            const userInfo = response.data;
            if (userInfo.rData && userInfo.rData.rCode === 1) {
                setIsLoading(false);
                return { success: false, message: userInfo.rData.rMessage };
            }
            setUserInfo(userInfo);
            await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
            setIsLoading(false);
            console.log("userinfo singin",userInfo);
            return { success: true };
        } catch (error) {
            console.error(`Sign in failed: ${error}`);
            setIsLoading(false);
            return { success: false, message: error.message };
        }
    };

    const sendOtp = async (identifier, isEmailLogin = true) => {
        setIsLoading(true);
        const params = {
            eventID: "1002",
            addInfo: {
                [isEmailLogin ? 'email' : 'phone_number']: identifier
            }
        };

        try {
            console.log('Sending OTP with params:', params);
            const response = await axios.post(`${BASE_URL}TravelMates_SignIn`, params);
            console.log('sendOtp Response:', response.data);
            const userInfo = response.data;

            if (userInfo.rData && userInfo.rData.rCode === 1) {
                setIsLoading(false);
                return { success: false, message: userInfo.rData.rMessage };
            }

            setUserInfo(userInfo);
            await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
            setIsLoading(false);
            return { success: true };
        } catch (error) {
            console.error(`Error sending OTP: ${error}`);
            setIsLoading(false);
            return { success: false, message: error.message };
        }
    };


    const verifyOtp = async (identifier, otp, isEmailLogin = true) => {
        setIsLoading(true);
        const params = {
            eventID: "1003",
            addInfo: {
                [isEmailLogin ? 'email' : 'phone_number']: identifier,
                otp
            }
        };
        try {
            console.log('verifyOtp OTP with params:', params);
            const response = await axios.post(`${BASE_URL}TravelMates_SignIn`, params);
            console.log('verifyOtp Response:', response.data);
            const userInfo = response.data;
            if (userInfo.rData && userInfo.rData.rCode === 1) {
                setIsLoading(false);
                return { success: false, message: userInfo.rData.rMessage };
            }
            setUserInfo(userInfo);
            await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
            setIsLoading(false);
            return { success: true };
        } catch (error) {
            console.error(`Sign in failed: ${error}`);
            setIsLoading(false);
            return { success: false, message: error.message };
        }
    };

    const forgotPassword = async (identifier, isEmailLogin = true) => {
        setIsLoading(true);
        const params = {
            eventID: "1004",
            addInfo: {
                [isEmailLogin ? 'email' : 'phone_number']: identifier
            }
        };

        try {
            console.log('Sending OTP with params:', params);
            const response = await axios.post(`${BASE_URL}TravelMates_SignIn`, params);
            console.log('sendOtp Response:', response.data);

            const userInfo = response.data;

            if (userInfo.rData && userInfo.rData.rCode === 1) {
                setIsLoading(false);

                return { success: false, message: userInfo.rData.rMessage };
            }

            setUserInfo(userInfo);
            await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
            setIsLoading(false);
            return { success: true, user_Id: userInfo.rData.user_Id };
        } catch (error) {
            console.error(`Error sending OTP: ${error}`);
            setIsLoading(false);
            return { success: false, message: error.message };
        }
    };

    const verifyOtpForForgotPassword = async (identifier, otp, user_id, isEmailLogin = true) => {
        setIsLoading(true);
        const params = {
            eventID: "1005",
            addInfo: {
                user_id, // Include user_id
                [isEmailLogin ? 'email' : 'phone_number']: identifier,
                otp
            }
        };
        try {
            console.log('verifyOtp OTP with params:', params);
            const response = await axios.post(`${BASE_URL}TravelMates_SignIn`, params);
            console.log('verifyOtp Response:', response.data);
            const userInfo = response.data;
            if (userInfo.rData && userInfo.rData.rCode === 1) {
                setIsLoading(false);
                return { success: false, message: userInfo.rData.rMessage };
            }
            setUserInfo(userInfo);
            await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
            setIsLoading(false);
            return { success: true };
        } catch (error) {
            console.error(`Sign in failed: ${error}`);
            setIsLoading(false);
            return { success: false, message: error.message };
        }
    };




    const logout = async () => {
        setIsLoading(true);
        try {
            await AsyncStorage.removeItem('userInfo');
            setUserInfo(null);
            setIsLoading(false);
        } catch (error) {
            console.error(`Logout failed: ${error}`);
            setIsLoading(false);
        }
    };

    const isLoggedIn = async () => {
        try {
            setSplashLoading(true);
            const userInfo = await AsyncStorage.getItem('userInfo');
            if (userInfo) {
                setUserInfo(JSON.parse(userInfo));
            }
            setSplashLoading(false);
        } catch (error) {
            setSplashLoading(false);
            console.error(`Is logged in check failed: ${error}`);
        }
    };

    useEffect(() => {
        isLoggedIn();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                isLoading,
                userInfo,
                splashLoading,
                signUp,
                signIn,
                logout,
                sendOtp,
                verifyOtp,
                forgotPassword,
                verifyOtpForForgotPassword
            }}>
            {children}
        </AuthContext.Provider>
    );
};
