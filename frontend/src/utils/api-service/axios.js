// axiosInstance.js
import axios from "axios";

import { loginRequest, graphConfig } from "../../authConfig";
import { msalInstance } from "../../../pages/_app";

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
    async (config) => {
        // Do something before the request is sent, like adding an authorization token

        const account = msalInstance.getActiveAccount();
        if (!account) {
            throw Error("No active account! Verify a user has been signed in and setActiveAccount has been called.");
        }

        const response = await msalInstance.acquireTokenSilent({
            ...loginRequest,
            account: account
        });

        console.log(response)

        const token = response.accessToken;

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        // Do something with request error
        return Promise.reject(error);
    }
);

export default axiosInstance
