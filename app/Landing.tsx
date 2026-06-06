import { performSignIn } from '@/services/authUtils';
import colors from '@/services/colors';
import { Marquee } from '@animatereactnative/marquee';
import { useLogto } from '@logto/rn';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Landing() {
  const [isSigningIn, setIsSigningIn] = useState(false);
  const { signIn } = useLogto();

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

  const handleSignInPress = async () => {
    if (isSigningIn) {
      console.log('[Landing] Sign-in already in progress');
      return;
    }

    if (!signIn || typeof signIn !== 'function') {
      Alert.alert(
        'Authentication Error',
        'Authentication service is unavailable.'
      );
      return;
    }

    try {
      setIsSigningIn(true);

      console.log('[Landing] Starting sign-in flow');

      const result = await performSignIn(signIn);

      if (!result.success) {
        setIsSigningIn(false);

        if (result.error !== 'AUTH_CANCELLED') {
          Alert.alert(
            'Login Failed',
            result.error || 'Unable to sign in.'
          );
        }
      }
    } catch (error) {
      console.error('[Landing] Unexpected sign-in error:', error);
      setIsSigningIn(false);
      Alert.alert(
        'Unexpected Error',
        'Something went wrong during sign in.'
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
          <View style={styles.imageContainer}>
            {imageList.map((image, index) => (
              <Image key={index} source={image} style={styles.image} />
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
          <View style={styles.imageContainer}>
            {imageList.map((image, index) => (
              <Image key={index} source={image} style={styles.image} />
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
          <View style={styles.imageContainer}>
            {imageList.map((image, index) => (
              <Image key={index} source={image} style={styles.image} />
            ))}
          </View>
        </Marquee>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>
          FlavorForge AI 🍛🔎 | Find, Create & Enjoy delicious recipes of your own!
        </Text>

        <Text style={styles.subtitle}>
          Generate delicious recipes in seconds with the power of AI! 🍕
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
            <Text style={styles.buttonText}>
              Get Started
            </Text>
          )}
        </TouchableOpacity>
        
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.WHITE,
  },

  image: {
    width: 160,
    height: 160,
    borderRadius: 25,
  },

  imageContainer: {
    flexDirection: 'row',
    gap: 10,
  },

  contentContainer: {
    backgroundColor: colors.WHITE,
    height: '100%',
    padding: 20,
  },

  title: {
    fontFamily: 'outfit-bold',
    fontSize: 25,
    textAlign: 'center',
  },

  subtitle: {
    textAlign: 'center',
    fontFamily: 'outfit',
    fontSize: 17,
    color: colors.GRAY,
    marginTop: 7,
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

  buttonText: {
    textAlign: 'center',
    color: colors.WHITE,
    fontSize: 17,
    fontFamily: 'outfit',
  },
});