import { UserContext } from '@/context/UserContext';
import { LogtoProvider, UserScope, type LogtoConfig } from '@logto/rn';
import { Stack } from "expo-router";
import React, { useEffect, useState } from 'react';

const logtoConfig: LogtoConfig = {
  endpoint: 'https://4wty43.logto.app/',
  appId: 'ud06nn1ly9tua71pwfqz5',
  scopes: [UserScope.Email],
};

function RootLayoutContent() {
  // 🔥 REMOVIDO: callback handling movido para callback.tsx
  // 🔥 REMOVIDO: isLoading check (era unreliable/undefined)

  return (
    <Stack
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="Landing" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="callback" />
    </Stack>
  );
}

export default function RootLayout() {
  const [isClient, setIsClient] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <LogtoProvider config={logtoConfig}>
      <UserContext.Provider value={{ user, setUser }}>
        <RootLayoutContent />
      </UserContext.Provider>
    </LogtoProvider>
  );
}