import React, {createContext, useContext} from 'react';
import app from 'firebase/app';
import firestore from "firebase/firestore";
import storage from "firebase/storage";

export const FirebaseContext = createContext(undefined);

export const FirebaseProvider = ({children}) => { 
  if (!app.apps.length) {
    app.initializeApp({
      apiKey: "REPLACE_HERE",
      authDomain: "REPLACE_HERE",
      projectId: "REPLACE_HERE",
      storageBucket: "REPLACE_HERE",
      messagingSenderId: "REPLACE_HERE",
      appId: "REPLACE_HERE"
    });
  }

  return (
    <FirebaseContext.Provider value = {app} > 
      {children}
    </FirebaseContext.Provider>
  )
}

export const useFirebaseContext = () => { 
    const context = useContext(FirebaseContext);
    if (context === undefined) { 
        throw new Error ('useFirebaseContext must be called within a FirebaseProvider')
    }
    return context;
}
