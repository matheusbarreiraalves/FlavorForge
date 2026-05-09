import * as Linking from 'expo-linking';
import { Platform } from 'react-native';

/**
 * Get the platform-specific redirect URI for OAuth callback
 * - Mobile (iOS/Android): flavorforge://callback
 * - Web: http://localhost:8081/callback (or appropriate port)
 */
export const getRedirectUri = (): string => {
  if (Platform.OS === 'web') {
    // For web, use localhost URL
    const webUri = Linking.createURL('/callback');
    console.log('[Auth] Web platform detected, using redirect URI:', webUri);
    return webUri;
  } else {
    // For mobile (iOS/Android), use custom scheme
    const mobileUri = 'flavorforge://callback';
    console.log('[Auth] Mobile platform detected, using redirect URI:', mobileUri);
    return mobileUri;
  }
};

export const performSignIn = async (
  signIn: (options: { redirectUri: string }) => Promise<void>,
  redirectUri?: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    // Use provided redirectUri or compute it based on platform
    const finalRedirectUri = redirectUri || getRedirectUri();

    console.log('[Auth] Starting sign-in flow with redirect URI:', finalRedirectUri);

    await signIn({
      redirectUri: finalRedirectUri,
    });

    return { success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);

    console.error('[Auth] Sign-in failed:', errorMessage);

    return {
      success: false,
      error: errorMessage,
    };
  }
};