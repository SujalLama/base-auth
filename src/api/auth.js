import {app} from "./fb-config";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";

const auth = getAuth(app);

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