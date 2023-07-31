import { setDoc, doc, updateDoc, collection, serverTimestamp, getDoc } from "firebase/firestore"
import { db } from "./fb-config"

const userRef =  collection(db, "users");

export const createUser = async (user) => {
    try {
        // checking the user exist or not
        // when 
        const docSnap = await getDoc(doc(userRef, user?.uid));
        
        if(docSnap.exists()) {
            return {status: 200, msg: 'User already exists.'}
        }

       await setDoc(doc(userRef, user.uid), {
            displayName: user.email,
            isAdmin: true,
            email: user.email,
            createdAt: serverTimestamp()
        });

        
        return {status: 200, user: {
            displayName: user.email,
            isAdmin: true,
            email: user.email,
            uid: user.uid, token: user.accessToken}}
    } catch (error) {
        return {status: 400, msg: error.message}
    }
}

export const updateUser = async (user) => {
    try {
        const updatedUser = await updateDoc(doc(userRef), {
            ...user
        });

        return {status: 200, msg: 'User updated successfully.'}
    } catch (error) {
        return {status: 400, msg: error.message}
    }
}