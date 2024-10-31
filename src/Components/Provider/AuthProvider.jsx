import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    updatePassword,
    reauthenticateWithCredential,
    EmailAuthProvider,
    sendEmailVerification,
    updateEmail,
    updateProfile,
    signOut,
    deleteUser,
    sendPasswordResetEmail
} from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import auth from '../../Firebase/Firebase.config';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const register = (email, password) => createUserWithEmailAndPassword(auth, email, password);
    
    const logIn = (email, password) => signInWithEmailAndPassword(auth, email, password);
    
    const logOut = () => signOut(auth);

    const reauthenticateUser = async (currentPassword) => {
        if (auth.currentUser) {
            const email = auth.currentUser.email;
            const credential = EmailAuthProvider.credential(email, currentPassword);
            return reauthenticateWithCredential(auth.currentUser, credential);
        } else {
            throw new Error("User is not logged in.");
        }
    };
    const sendPasswordReset = async (email) => {
        try {
            await sendPasswordResetEmail(auth, email);
            return "Password reset email sent successfully.";
        } catch (error) {
            throw new Error("Failed to send password reset email: " + error.message);
        }
    };
    const updatePasswordForUser = async (newPassword, currentPassword) => {
        await reauthenticateUser(currentPassword);
        await updatePassword(auth.currentUser, newPassword);
        return "Password updated successfully!";
    };

    const updateProfilePicture = async (photoURL) => {
        if (auth.currentUser) {
            await updateProfile(auth.currentUser, { photoURL });
            setUser({ ...auth.currentUser });
            return "Profile picture updated successfully!";
        } else {
            throw new Error("No user is currently logged in.");
        }
    };
    
    const updateEmailForUser = async (newEmail) => {
        await updateEmail(auth.currentUser, newEmail);
        return "Email updated successfully!";
    };

    const deleteUserAccount = async () => {
        if (auth.currentUser) {
            await deleteUser(auth.currentUser);
            toast.success("User account deleted successfully.");
        } else {
            toast.error("No user is currently logged in.");
        }
    };
    
    const sendVerificationEmail = async () => {
        if (auth.currentUser) {
            await sendEmailVerification(auth.currentUser);
            return "Verification email sent successfully.";
        } else {
            throw new Error("No user is currently logged in.");
        }
    };

    const updateUsername = async (newName) => {
        if (auth.currentUser) {
            await updateProfile(auth.currentUser, { displayName: newName });
            setUser({ ...auth.currentUser });
            return "Username updated successfully!";
        } else {
            throw new Error("No user is currently logged in.");
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => setUser(currentUser));
        return () => unsubscribe();
    }, []);

    const authInformation = {
        register,
        logIn,
        logOut,
        user,
        updatePasswordForUser,
        updateEmailForUser,
        sendVerificationEmail,
        updateUsername,
        reauthenticateUser,
        updateProfilePicture,
        deleteUserAccount,
        sendPasswordReset
    };

    return <AuthContext.Provider value={authInformation}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
