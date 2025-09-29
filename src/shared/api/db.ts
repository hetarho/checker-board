import { getFirestore } from "firebase/firestore";
import { app } from "./config/firebase";

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
