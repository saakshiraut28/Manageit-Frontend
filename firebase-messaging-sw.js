importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyAOVegDbbtIl4fJNpfBxoS0pe12HFjg65s",
  authDomain: "pushnote-53bfc.firebaseapp.com",
  projectId: "pushnote-53bfc",
  storageBucket: "pushnote-53bfc.appspot.com",
  messagingSenderId: "304989467810",
  appId: "1:304989467810:web:94ac18764d23e5463dd3fb",
  measurementId: "G-SNQ8B4SP2R",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Received background message ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
