/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

import { Cookies } from "react-cookie";
import { AxiosRequestConfig, Method } from "axios";
// import useErrors from "./useErrors";
import instanceAxios from "../axios";
import toast from "react-hot-toast";

const portalUserToken = () => {
    const cookie = new Cookies();
    const portalUserToken = cookie.get("UserToken");
    if (!portalUserToken) return null;
    return portalUserToken;
};

export const headers = (options?: { [key: string]: string }) => {
    if (!options) options = {};
    // options["x-auth-token"] = portalUserToken();
    options["Authorization"] = portalUserToken();
    return options;
};

type result = {
    statusCode?: number;
    data: any;
    error: any;
    loading: boolean;
    fetchData: (payload: payload) => void;
    body: any;
};

export type payload = {
    data?: unknown;
    url: string;
    method: Method;
    headers?: { [key: string]: string };
    params?: { [key: string]: any };
    serverMode?: boolean;
    timeout?: number;
};

function useFetch(): result {
    // const { alertError } = useErrors();
    const [data, setDataResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(null);
    const [statusCode, setStatusCode] = useState<number | undefined>(undefined);
    const [body, setbody] = useState<any>();

    // const setErrorValue = async (data: any) => {
    //     new Promise<void>(() => {
    //         setError(data);
    //     });
    // };

    const setDataValue = async (data: any) => {
        new Promise<void>(() => {
            setDataResult(data);
        });
    };

    const fetchData = async (request: payload) => {       
        setLoading(true);
        setError(null);
        setDataResult(null);

        const { url, method, data: dataRequest, params } = request;
        const payload: AxiosRequestConfig = { url, method, params };

        if (dataRequest) {
            payload.data = dataRequest;
            setbody(dataRequest);
        }
        try {
            if (!payload.headers) payload.headers = headers();
            const response = await instanceAxios(payload);

            setStatusCode(response.status);
            await setDataValue(response.data);
        } catch (err: any) {
            setStatusCode(err.response.status);
            toast.error(err.response?.data?.message)
            // setError(err.response?.data?.message)
            //await setErrorValue(err.response?.data);
            console.log(err.response);
        } finally {
            setLoading(false);
        }
    };

    return { data, error, loading, fetchData, statusCode, body };
}

export default useFetch;
