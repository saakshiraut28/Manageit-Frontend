import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyAOVegDbbtIl4fJNpfBxoS0pe12HFjg65s",
    authDomain: "pushnote-53bfc.firebaseapp.com",
    projectId: "pushnote-53bfc",
    storageBucket: "pushnote-53bfc.appspot.com",
    messagingSenderId: "304989467810",
    appId: "1:304989467810:web:94ac18764d23e5463dd3fb",
    measurementId: "G-SNQ8B4SP2R"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging };