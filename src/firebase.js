// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCDSrDJC5ErIQKnu8H-zzj-7rF08OToj-4",
    authDomain: "toxiplantes-dee5a.firebaseapp.com",
    projectId: "toxiplantes-dee5a",
    storageBucket: "toxiplantes-dee5a.appspot.com",
    messagingSenderId: "84620396324",
    appId: "1:84620396324:web:423c15e6e879c3ecbcd5b1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Get url from ref
async function getUrl(path) {
    const storage = getStorage();
    const storageRef = ref(storage, path);

    try {
        const url = await getDownloadURL(storageRef);
        return url;
        // You can use it to display the image on your website.
    } catch (error) {
        // Handle errors here
        console.error(error);
    }
}



export { auth, getUrl };