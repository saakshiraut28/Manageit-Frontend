importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

// Fetch the configuration from a separate file or URL
fetch("./env-config.json")
  .then((response) => response.json())
  .then((data) => {
    const firebaseConfig = {
      apiKey: data.apiKey,
      authDomain: data.authDomain,
      projectId: data.projectId,
      storageBucket: data.storageBucket,
      messagingSenderId: data.messagingSenderId,
      appId: data.appId,
      measurementId: data.measurementId,
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

      self.registration.showNotification(
        notificationTitle,
        notificationOptions
      );
    });
  })
  .catch((error) => {
    console.error("Error fetching configuration:", error);
  });
