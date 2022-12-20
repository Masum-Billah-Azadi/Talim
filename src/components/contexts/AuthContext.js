import {
  createUserWithEmailAndPassword,
  getAuth, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged,
  signInWithEmailAndPassword, signInWithPopup, signOut,
  updateProfile
} from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import "../../firebase";
import { auth } from "../../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // signup function
  async function signup(email, password, username) {
    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, email, password);

    // update profile
    await updateProfile(auth.currentUser, {
      displayName: username,
    });

    const user = auth.currentUser;
    setCurrentUser({
      ...user,
    });
  }
//Google And GitHub Api to Singup
  const signInWithGoogle = () => {
    setLoading(true);

    signInWithPopup(auth, new GoogleAuthProvider())
      .then((res) => console.log(res))
      .finally(() => setLoading(false));
  };
  const signInWithGithub = () => {
    setLoading(true);
    signInWithPopup(auth, new GithubAuthProvider())
      .then((res) => console.log(res))
      .finally(() => setLoading(false));
  };

  // login function
  function login(email, password) {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password);
  }

  // logout function
  function logout() {
    const auth = getAuth();
    return signOut(auth);
  }

  const value = {
    currentUser,
    signup,
    login,
    logout,
    signInWithGoogle,
    signInWithGithub
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
