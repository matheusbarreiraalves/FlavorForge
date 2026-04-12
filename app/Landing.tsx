import colors from '@/services/colors'
import { Marquee } from '@animatereactnative/marquee'
import { useLogto } from '@logto/rn'
import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export default function Landing() {
  const [isClient, setIsClient] = useState(false);
  const logtoContext = useLogto();
  const { signIn } = logtoContext;

  useEffect(() => {
    setIsClient(true);
  }, []);

  const imageList = [
        require('./../assets/images/1.jpg'),
        require('./../assets/images/2.jpg'),
        require('./../assets/images/3.jpg'),
        require('./../assets/images/4.jpeg'),
        require('./../assets/images/5.jpeg'),
        require('./../assets/images/c1.jpg'),
        require('./../assets/images/c2.jpg'),
        require('./../assets/images/c3.jpg'),
    ]
  return (
    <GestureHandlerRootView>
    <View>
        <Marquee spacing={10} speed={0.7}
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
        <Marquee spacing={10} speed={0.4}
        style={{
            transform: [{ rotate: '-4deg' }],
            marginTop: 10
        }}
        >
            <View style={styles.ImageContainer}>
                {imageList.map((image, index) => (
                    <Image key={index} source={image} style={styles.Image} />
                ))}
            </View>
        </Marquee>
        <Marquee spacing={10} speed={0.5}
        style={{
            transform: [{ rotate: '-4deg' }],
            marginTop: 10
        }}
        >
            <View style={styles.ImageContainer}>
                {imageList.map((image, index) => (
                    <Image key={index} source={image} style={styles.Image} />
                ))}
            </View>
        </Marquee>
    </View>

    <View style={{
        backgroundColor:colors.WHITE,
        height: '100%',
        padding: 20,
    }}>
        <Text 
        style={{
            fontFamily: 'outfit-bold',
            fontSize: 25,
            textAlign: 'center',
        }}
        >FlavorForge AI 🍛🔎 | Find, Create & Enjoy delecious recepies of your own!</Text>
        <Text style={{
            textAlign: 'center',
            fontFamily: 'outfit',
            fontSize: 17,
            color: colors.GRAY,
            marginTop: 7,
            
        }}>Generate Delicious recipes in seconds with the power of AI! 🍕</Text>

        <TouchableOpacity
        onPress={async () => {
          if (isClient && signIn) {
            signIn('flavorforge://callback');
          }
        }}
        style={styles.button}>
            <Text style={{
                textAlign: 'center',
                color: colors.WHITE,
                 fontSize: 17,
                fontFamily: 'outfit',
            }}>Get Started</Text>
        </TouchableOpacity>
    </View>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
    Image: {
        width: 160,
        height: 160,
        borderRadius:25
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
    },
})