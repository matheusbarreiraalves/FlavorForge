import React, { useState } from 'react';
import { Image, StyleSheet, Text, View, } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Button from './Button';

export default function CreateRecipe() {
  const [userInput, setUserInput] = useState<string>('');
  return (
    <View style={styles.container}>
      <Image source={require('./../assets/images/pan.gif')} 
        style={styles.panImage}
      />
      <Text style={styles.heading}>Warm up your stove, and let's begin.</Text>
      <Text style={styles.subHeading}>Make something you LOVE!</Text>

      <TextInput 
      style={styles.TextInput}
      multiline={true}
      numberOfLines={3}
      placeholder='What would you like to create? Add your ingredients!'
      onChangeText={(value)=>setUserInput(value)}
      />

      <Button label={'Create Recipe'} icon={"sparkles"} />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        padding: 15,
        backgroundColor: '#DEEDE2',
        borderRadius: 25,
        display: 'flex',
        alignItems: 'center',
    },
    panImage: {
        width: 80,
        height: 80,
    },
    heading: {
        fontFamily: 'outfit',
        fontSize: 23,
        textAlign: 'center',
    },
    subHeading: {
        fontFamily: 'outfit',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 6,
    },
    TextInput: {
        backgroundColor: '#fff',
        width: '100%',
        height: 120,
        borderRadius: 15,
        padding: 15,
        fontSize: 16,
        marginTop: 15,
        textAlignVertical: 'top',
    },
})