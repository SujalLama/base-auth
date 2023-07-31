import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider,} from "firebase/auth";
import { auth } from "./fb-config";

const GoogleProvider = new GoogleAuthProvider();
export const signUp = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return {status: 200, user: userCredential.user}

    } catch (error) {
        return {status: 400, msg: error.message};
    }
}

export const signIn = async (email, password) => {
    try {
        const userCredential =  await signInWithEmailAndPassword(auth, email, password);
        return {status: 200, user: userCredential.user};
    } catch (error) {
        return {status: 400, msg: error.message};
    }
}

export const googleAuth = async () => {
    try {
       const result = await signInWithPopup(auth, GoogleProvider)

    // // This gives you a Google Access Token. You can use it to access the Google API.
    // const credential = GoogleAuthProvider.credentialFromResult(result);
    // const token = credential.accessToken;
    // // The signed-in user info.
    const user = result.user;
    
    return {status: 200, user: user};
   
    } catch (error) {
        const credential = GoogleAuthProvider.credentialFromError(error);
        return {status: 400, msg: error.message};
    }
}