import React,{useState,useEffect} from 'react';
import { onAuthStateChanged} from 'firebase/auth';
import {auth} from '../../firebase'

export function useAuthentication() {
  const [user, setUser] =useState();

  useEffect(() => {
    const unsubscribeFromAuthStatuChanged = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(undefined);
      }
    });

    return unsubscribeFromAuthStatuChanged;
  }, []);

  return {
    user
  };
}