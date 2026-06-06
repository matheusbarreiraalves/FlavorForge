import colors from '@/services/colors';
import GlobalApi from '@/services/GlobalApi';
import React, { useRef, useState } from 'react';
import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import { TextInput } from 'react-native-gesture-handler';
import GENERATE_RECIPE_OPTION_PROMPT from './../services/Prompt';
import Button from './Button';

export default function CreateRecipe() {
  const [userInput, setUserInput] = useState<string>('');
  const [recipeOptions, setRecipeOptions] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const actionSheetRef = useRef<ActionSheetRef>(null);

  const OnGenerate =async()=>{
    if(!userInput)
      {
        Alert.alert('Please enter your recipe or ingredients');
        return;
      }
    setLoading(true);
    const result=await GlobalApi.AiModel(userInput+GENERATE_RECIPE_OPTION_PROMPT);

    
    const content = result?.choices[0].message?.content;
    content && setRecipeOptions(JSON.parse(content));
    setLoading(false);
   actionSheetRef.current?.show()
  }
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

      <Button label={'Create Recipe'} icon={"sparkles"} 
      loading={loading}
      />

      <ActionSheet ref={actionSheetRef}>
        <View style={styles.actionSheetContainer}>
          <Text style={styles.heading}>Select Recipe!</Text>
          <View>
            {recipeOptions?.map((item: any, index: any) => (
              <View key={index} style={styles.recipeOptionContainer}>
                <Text style={{
                  fontFamily: 'outfit-bold',
                  fontSize: 16,
                }}>{item?.recipeName}</Text>
                <Text style={{
                  fontFamily: 'outfit',
                  color:colors.GRAY,
                }}>{item?.description}</Text>
              </View>
            ))}
          </View>
        </View>
      </ActionSheet>
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
    actionSheetContainer:{
        padding: 25,
    },
    recipeOptionContainer:{
      padding: 15,
      borderWidth: 0.2,
      borderRadius: 15,
      marginTop: 15,
    }
})