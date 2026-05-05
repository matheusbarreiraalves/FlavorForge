/**
 * OAuth Callback Handler Screen
 * Processes the OAuth redirect from Logto after user authenticates
 */

import { handleAuthCallback } from '@/services/authUtils';
import colors from '@/services/colors';
import { useLogto } from '@logto/rn';
import * as Linking from 'expo-linking';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function CallbackScreen() {
  const { handleSignInCallback, isAuthenticated } = useLogto();

  useEffect(() => {
    const processCallback = async () => {
      try {
        // Get the current URL (the redirect from OAuth browser)
        const url = await Linking.getInitialURL();

        if (url) {
          console.log('[Callback] Processing OAuth redirect:', url);
          const result = await handleAuthCallback(url, handleSignInCallback);

          if (result.success) {
            console.log('[Callback] OAuth redirect processed, waiting for auth state update');
            // The navigation will happen automatically based on isAuthenticated state
          } else {
            console.error('[Callback] Failed to process callback:', result.error);
            // App will handle navigation based on authentication state
          }
        } else {
          console.log('[Callback] No initial URL detected');
        }
      } catch (error) {
        console.error('[Callback] Error in callback handler:', error);
      }
    };

    // Only process if we're not already authenticated
    if (!isAuthenticated) {
      processCallback();
    }
  }, [handleSignInCallback, isAuthenticated]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.WHITE,
      }}
    >
      <ActivityIndicator size="large" color={colors.PRIMARY} />
    </View>
  );
}
