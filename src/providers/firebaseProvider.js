import React, {createContext, useContext} from 'react';
import app from 'firebase/app';
import firestore from "firebase/firestore";
import storage from "firebase/storage";

export const FirebaseContext = createContext(undefined);

export const FirebaseProvider = ({children}) => { 
  if (!app.apps.length) {
    app.initializeApp({
      apiKey: "AIzaSyCzC_9kADBHung9z4lMgUFbh3ccLKi-jUU",
      authDomain: "mineart-f2351.firebaseapp.com",
      projectId: "mineart-f2351",
      storageBucket: "mineart-f2351.appspot.com",
      messagingSenderId: "1030840294581",
      appId: "1:1030840294581:web:0667fc57c4b1e512e3f2fc"
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
        throw new Error ('useFirebaseContext musrt be called within a FirebaseProvider')
    }
    return context;
}
