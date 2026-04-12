import { LogtoProvider, type LogtoConfig } from '@logto/rn';
import { Stack } from "expo-router";
import React, { useEffect, useState } from 'react';

const logtoConfig: LogtoConfig = {
  endpoint: 'https://4wty43.logto.app/',
  appId: 'ud06nn1ly9tua71pwfqz5',
};

function RootLayoutContent() {
  return (
    <Stack>
      <Stack.Screen name="Landing" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Only render LogtoProvider on the client side to avoid localStorage SSR errors
  if (!isClient) {
    return <RootLayoutContent />;
  }

  return (
    <LogtoProvider config={logtoConfig}>
      <RootLayoutContent />
    </LogtoProvider>
  );
}
