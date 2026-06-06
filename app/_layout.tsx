import { UserContext } from '@/context/UserContext';
import {
  LogtoProvider,
  UserScope,
  type LogtoConfig,
} from '@logto/rn';

import { Stack } from 'expo-router';

import React, { useEffect, useState } from 'react';

const logtoConfig: LogtoConfig = {
  endpoint: 'https://4wty43.logto.app/',
  appId: 'ud06nn1ly9tua71pwfqz5',
  scopes: [UserScope.Email],
};

function RootLayoutContent() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="landing" />
      <Stack.Screen name="callback" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}

export default function RootLayout() {
  const [mounted, setMounted] = useState(false);

  const [user, setUser] = useState(null);

  useEffect(() => {
    // ONLY run on browser/client
    setMounted(true);
  }, []);

  // Prevent SSR rendering completely
  if (!mounted) {
    return null;
  }

  return (
    <LogtoProvider config={logtoConfig}>
      <UserContext.Provider value={{ user, setUser }}>
        <RootLayoutContent />
      </UserContext.Provider>
    </LogtoProvider>
  );
}