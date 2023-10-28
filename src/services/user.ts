import { redirect } from "react-router-dom";

// dev url
const url = import.meta.env.VITE_SERVER ;
// prod url

export const getUserData = async (endpoint: string) => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            (window as any).location = "/auth";
        }
        const resp = await fetch(url + endpoint, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
        });
        const respObj = await resp.json();
        return respObj;
    }
    catch (err) {
        console.log("Some error occurred", err);
        localStorage.removeItem("token");
        return { msg: "Internal server error", user: null };
    }
}