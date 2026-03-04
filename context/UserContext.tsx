import createContextHook from '@nkzw/create-context-hook';
import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_NAME_KEY = '@nesliann_username';
const USER_FULLNAME_KEY = '@nesliann_fullname';

export const [UserProvider, useUser] = createContextHook(() => {
  const [username, setUsernameState] = useState<string>('');
  const [fullName, setFullNameState] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    Promise.all([
      AsyncStorage.getItem(USER_NAME_KEY),
      AsyncStorage.getItem(USER_FULLNAME_KEY),
    ]).then(([storedUsername, storedFullName]) => {
      if (storedUsername) setUsernameState(storedUsername);
      if (storedFullName) setFullNameState(storedFullName);
      setIsLoaded(true);
    }).catch(() => {
      setIsLoaded(true);
    });
  }, []);

  const setUsername = useCallback((name: string) => {
    setUsernameState(name);
    AsyncStorage.setItem(USER_NAME_KEY, name).catch(() => {
      console.log('Failed to save username');
    });
  }, []);

  const setFullName = useCallback((name: string) => {
    setFullNameState(name);
    AsyncStorage.setItem(USER_FULLNAME_KEY, name).catch(() => {
      console.log('Failed to save full name');
    });
  }, []);

  const displayName = username || 'Kullanıcı';
  const displayFullName = fullName || 'Ad Soyad';
  const avatar = fullName ? fullName[0].toUpperCase() : (username ? username[0].toUpperCase() : 'K');

  return {
    username,
    fullName,
    displayName,
    displayFullName,
    avatar,
    isLoaded,
    setUsername,
    setFullName,
    hasUsername: username.length > 0,
    hasFullName: fullName.length > 0,
    hasProfile: username.length > 0 && fullName.length > 0,
  };
});
