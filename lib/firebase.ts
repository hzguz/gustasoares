import { initializeApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";
import { getAnalytics, isSupported, Analytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyD-NS6p-7nr0Co8zL91p3YcxDzz9duyKlw",
    authDomain: "gustasoaresestudio.firebaseapp.com",
    projectId: "gustasoaresestudio",
    storageBucket: "gustasoaresestudio.firebasestorage.app",
    messagingSenderId: "994324073394",
    appId: "1:994324073394:web:26eba6fb9afd4d8afb72ab",
    measurementId: "G-JTSGFMWWSZ"
};

// Validate Firebase config
const isConfigValid = firebaseConfig.apiKey &&
    firebaseConfig.authDomain &&
    firebaseConfig.projectId;

if (!isConfigValid) {
    console.error("Firebase config is missing required fields. Check your .env.local file.");
    console.error("Current config:", {
        hasApiKey: !!firebaseConfig.apiKey,
        hasAuthDomain: !!firebaseConfig.authDomain,
        hasProjectId: !!firebaseConfig.projectId,
    });
}

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let storage: FirebaseStorage | null = null;
let analytics: Analytics | null = null;

try {
    if (isConfigValid) {
        app = initializeApp(firebaseConfig);
        auth = getAuth(app);
        db = getFirestore(app);
        storage = getStorage(app);

        // Analytics is optional - it may fail on localhost or if blocked by browser
        isSupported().then(supported => {
            if (supported && app) {
                analytics = getAnalytics(app);
            }
        }).catch(() => {
            console.warn("Firebase Analytics not supported in this environment.");
        });
    }
} catch (error) {
    console.error("Firebase initialization error:", error);
}

export { auth, db, storage, analytics };
