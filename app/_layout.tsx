import { UserContext } from '@/context/UserContext';
import { linking } from '@/services/authUtils';
import { LogtoProvider, useLogto, UserScope, type LogtoConfig } from '@logto/rn';
import { Stack, usePathname } from "expo-router";
import React, { useEffect, useState } from 'react';

const logtoConfig: LogtoConfig = {
  endpoint: 'https://4wty43.logto.app/',
  appId: 'ud06nn1ly9tua71pwfqz5',
  scopes:[
    UserScope.Email,
  ]
};

const [user, setUser] = useState();
/**
 * Main layout with authentication state management
 * Handles navigation based on auth state
 */
function RootLayoutContent() {
  const { isAuthenticated, isLoading } = useLogto();
  const pathname = usePathname();

  // Log auth state changes for debugging
  useEffect(() => {
    console.log('[Layout] Auth state - isAuthenticated:', isAuthenticated, 'isLoading:', isLoading);
  }, [isAuthenticated, isLoading]);

  // Show loading indicator while checking auth state (important for preventing flash of unauth UI)
  if (isLoading) {
    return <Stack />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
      linking={linking}
    >
      <Stack.Screen 
        name="index" 
        options={{ 
          headerShown: false,
          animationEnabled: false,
        }} 
      />
      <Stack.Screen 
        name="Landing" 
        options={{ 
          headerShown: false,
          animationEnabled: false,
        }} 
      />
      
        <Stack.Screen 
        name="(tabs)" 
        options={{ 
          headerShown: false,
        }} 
      />

      <Stack.Screen 
        name="callback" 
        options={{ 
          headerShown: false,
          animationEnabled: false,
        }} 
      />
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
    return null;
  }

  return (

      <LogtoProvider config={logtoConfig}>
            <UserContext.Provider value={{user, setUser}}>
        <RootLayoutContent />
          </UserContext.Provider>
      </LogtoProvider>
  );
}
