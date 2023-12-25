// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage" 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "notelibai-32bbf.firebaseapp.com",
  projectId: "notelibai-32bbf",
  storageBucket: "notelibai-32bbf.appspot.com",
  messagingSenderId: "773594316808",
  appId: "1:773594316808:web:762d5e49251ac48b8611bd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export async function uploadFileToFirebase(image_url: string, name: string) {
    try {
      const response = await fetch(image_url);
      const buffer = await response.arrayBuffer()
      const file_name = name.replace(" ", "") + Date.now + ".jpeg";
      const storageRef = ref(storage, file_name)
      await uploadBytes(storageRef, buffer, {
        contentType: "image/jpeg"
      })
      const firebaseUrl = await getDownloadURL(storageRef);
      return firebaseUrl
    } catch (error) {
      console.error(error);   
    }
}