import { performSignIn } from '@/services/authUtils'
import colors from '@/services/colors'
import { Marquee } from '@animatereactnative/marquee'
import { useLogto } from '@logto/rn'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'


export default function Landing() {
  const [isClient, setIsClient] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const logtoContext = useLogto();
  const { signIn, signOut, isAuthenticated } = logtoContext;

  // Ensure hydration only happens on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Defensive check for null context
  if (!isClient || !logtoContext) {
    return null;
  }

  // If already authenticated, show loading indicator briefly
  // (Navigation will happen via auth state in _layout)
  if (isAuthenticated) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.WHITE }}>
        <ActivityIndicator size="large" color={colors.PRIMARY} />
      </View>
    );
  }

  const imageList = [
    require('./../assets/images/1.jpg'),
    require('./../assets/images/2.jpg'),
    require('./../assets/images/3.jpg'),
    require('./../assets/images/4.jpeg'),
    require('./../assets/images/5.jpeg'),
    require('./../assets/images/c1.jpg'),
    require('./../assets/images/c2.jpg'),
    require('./../assets/images/c3.jpg'),
  ];

  /**
   * Handles the sign-in button press
   * Wraps signIn in try/catch and manages loading state
   */
  const handleSignInPress = async () => {
    // Prevent multiple sign-in attempts
    if (isSigningIn) {
      console.log('[Landing] Sign-in already in progress, ignoring duplicate request');
      return;
    }

    try {
      // Check if signIn function exists (defensive check)
      if (!signIn || typeof signIn !== 'function') {
        console.error('[Landing] signIn function is not available');
        Alert.alert(
          'Authentication Error',
          'Authentication service is not ready. Please try again.',
        );
        return;
      }

      setIsSigningIn(true);
      console.log('[Landing] Starting sign-in flow...');

      // Use the auth utility for proper error handling
      const result = await performSignIn(
        signIn,
        'exp://192.168.1.8:8081'
      );

      if (result.success) {
        console.log('[Landing] Sign-in initiated successfully, waiting for callback...');
        // User will be redirected to callback screen, which processes the OAuth redirect
        // Navigation happens automatically based on isAuthenticated state
      } else {
        // Handle different error types
        if (result.error === 'AUTH_CANCELLED') {
          console.log('[Landing] User cancelled sign-in, no action required');
          // User cancelled - just reset loading state and return to landing
          setIsSigningIn(false);
          // No alert needed for user cancellation
        } else {
          console.error('[Landing] Sign-in failed:', result.error);
          setIsSigningIn(false);
          Alert.alert(
            'Sign-In Failed',
            result.error || 'Failed to sign in. Please try again.',
            [
              {
                text: 'OK',
                onPress: () => console.log('[Landing] Error dismissed by user'),
              },
            ]
          );
        }
      }
    } catch (error) {
      console.error('[Landing] Unexpected error during sign-in:', error);
      setIsSigningIn(false);
      Alert.alert(
        'Unexpected Error',
        'An unexpected error occurred. Please try again.',
        [
          {
            text: 'OK',
            onPress: () => console.log('[Landing] Unexpected error dismissed'),
          },
        ]
      );
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View>
        <Marquee
          spacing={10}
          speed={0.7}
          style={{
            transform: [{ rotate: '-4deg' }],
          }}
        >
          <View style={styles.ImageContainer}>
            {imageList.map((image, index) => (
              <Image key={index} source={image} style={styles.Image} />
            ))}
          </View>
        </Marquee>
        <Marquee
          spacing={10}
          speed={0.4}
          style={{
            transform: [{ rotate: '-4deg' }],
            marginTop: 10,
          }}
        >
          <View style={styles.ImageContainer}>
            {imageList.map((image, index) => (
              <Image key={index} source={image} style={styles.Image} />
            ))}
          </View>
        </Marquee>
        <Marquee
          spacing={10}
          speed={0.5}
          style={{
            transform: [{ rotate: '-4deg' }],
            marginTop: 10,
          }}
        >
          <View style={styles.ImageContainer}>
            {imageList.map((image, index) => (
              <Image key={index} source={image} style={styles.Image} />
            ))}
          </View>
        </Marquee>
      </View>

      <View
        style={{
          backgroundColor: colors.WHITE,
          height: '100%',
          padding: 20,
        }}
      >
        <Text
          style={{
            fontFamily: 'outfit-bold',
            fontSize: 25,
            textAlign: 'center',
          }}
        >
          FlavorForge AI 🍛🔎 | Find, Create & Enjoy delicious recipes of your own!
        </Text>
        <Text
          style={{
            textAlign: 'center',
            fontFamily: 'outfit',
            fontSize: 17,
            color: colors.GRAY,
            marginTop: 7,
          }}
        >
          Generate Delicious recipes in seconds with the power of AI! 🍕
        </Text>

        <TouchableOpacity
          onPress={handleSignInPress}
          disabled={isSigningIn}
          style={[
            styles.button,
            isSigningIn && styles.buttonDisabled,
          ]}
        >
          {isSigningIn ? (
            <ActivityIndicator size="small" color={colors.WHITE} />
          ) : (
            <Text
              style={{
                textAlign: 'center',
                color: colors.WHITE,
                fontSize: 17,
                fontFamily: 'outfit',
              }}
            >
              Get Started
            </Text>
          )}
        </TouchableOpacity>
        {/* <Button title="Sign Out" onPress={async () => signOut()} /> */}
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  Image: {
    width: 160,
    height: 160,
    borderRadius: 25,
  },
  ImageContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    backgroundColor: colors.PRIMARY,
    padding: 15,
    borderRadius: 15,
    marginTop: 20,
    minHeight: 50,
    justifyContent: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
});
