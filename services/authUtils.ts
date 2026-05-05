/**
 * Authentication Utilities for Logto
 * Handles OAuth callback processing and error management
 */

import * as Linking from 'expo-linking';

const prefix = Linking.createURL('/');

export const linking = {
  prefixes: [prefix, 'flavorforge://', 'flavorforge://callback'],
  config: {
    screens: {
      callback: 'callback',
      Landing: 'landing',
      index: '',
    },
  },
};

/**
 * Handles OAuth redirect callback from Logto
 * This is called when user returns from the browser OAuth flow
 */
export const handleAuthCallback = async (
  url: string,
  handleSignInCallback: (url: string) => Promise<void>
): Promise<{ success: boolean; error?: string }> => {
  try {
    console.log('[Auth] Processing callback URL:', url);

    // Process the OAuth callback
    await handleSignInCallback(url);

    console.log('[Auth] Callback processed successfully');
    return { success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('[Auth] Error processing callback:', errorMessage);
    return {
      success: false,
      error: errorMessage,
    };
  }
};

/**
 * Handles sign-in request with proper error handling
 */
export const performSignIn = async (
  signIn: (redirectUri: string) => Promise<void>,
  redirectUri: string = 'flavorforge://callback'
): Promise<{ success: boolean; error?: string }> => {
  try {
    console.log('[Auth] Starting sign-in flow');
    await signIn(redirectUri);
    console.log('[Auth] Sign-in flow initiated successfully');
    return { success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('[Auth] Sign-in failed:', errorMessage);

    // Distinguish between user cancellation and actual errors
    if (
      errorMessage.includes('canceled') ||
      errorMessage.includes('cancelled') ||
      errorMessage.includes('dismissed') ||
      error instanceof Error && error.name === 'UserCancelledError'
    ) {
      console.log('[Auth] User cancelled the sign-in flow');
      return {
        success: false,
        error: 'AUTH_CANCELLED',
      };
    }

    return {
      success: false,
      error: errorMessage,
    };
  }
};

/**
 * Validates if authentication state is properly initialized
 */
export const isAuthStateValid = (
  isAuthenticated: boolean | null,
  isLoading: boolean | null
): boolean => {
  return isAuthenticated !== null && isLoading !== null;
};
