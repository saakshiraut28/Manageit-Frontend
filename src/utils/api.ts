import axios from "axios";
import { useNavigate } from "react-router-dom";

export const makeRequest = async (endpoint: string, method = 'GET', data = null) => {
    // const navigate = useNavigate();
    const token = localStorage.getItem("token");
    if (!token) {
        // navigate("/auth");
    }
    try {
        const config = {
            method: method,
            url: "http://localhost:8000" + endpoint,
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
            data: data,
        };

        const result = await axios(config);

        return result;
    } catch (error) {
        return error;
    }
};