// dev url
const url = "http://localhost:8000"
// prod url

export const getUserData = async (endpoint: string) => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {

        }
        const resp = await fetch(url + endpoint, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
        })
        const respObj = await resp.json();
        return respObj;
    }
    catch (err) {
        console.log("Some error occurred", err);
        return { msg: "Internal server error", user: null };
    }
}