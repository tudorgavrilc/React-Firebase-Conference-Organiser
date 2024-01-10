import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const app = initializeApp({
  apiKey: "AIzaSyBuMDx_S5wolZydJGiUoK9Iu9ghjFPv-UU",
  authDomain: "conference-organizer-92778.firebaseapp.com",
  projectId: "conference-organizer-92778",
  storageBucket: "conference-organizer-92778.appspot.com",
  messagingSenderId: "979802847538",
  appId: "1:979802847538:web:809587405e30738e493f2b"
})

export const auth = getAuth(app)
export default app