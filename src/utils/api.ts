import axios from "axios";

const backend = import.meta.env.VITE_SERVER ;

export const makeRequest = async (endpoint: string, method = 'GET', data = null) => {

    const token = localStorage.getItem("token");
    if (!token) {
        (window as any).location = "/auth";
    }
    try {
        const config = {
            method: method,
            url: backend + endpoint,
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
            data: data,
        };

        const result = await axios(config);

        return result;
    } catch (error) {
        if (error.response.data.token === false) {
            (window as any).location = "/auth";
        }
        if (error.response.data.valid === false) {
            localStorage.removeItem("token");
            (window as any).location = "/auth";
        }
        return error;
    }
};