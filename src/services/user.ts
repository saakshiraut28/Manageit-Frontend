// dev url
const url = "http://localhost:8000"
// prod url

export const getUserData = async (token) => {
    try {
        const resp = await fetch(`${url}/${token}`,{
            method:"GET",
            headers:{
                'Content-Type': 'application/json',
            },
        })
        const respObj = await resp.json() ;
        return respObj;
    }
    catch(err) {
        console.log("Some error occurred", err) ;
        return {msg: "Internal server error", user: null};
    }
}