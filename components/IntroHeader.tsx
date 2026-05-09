import { UserContext } from '@/context/UserContext';
import React, { useContext } from 'react';
import { Image, Text, View } from 'react-native';
import { Switch } from 'react-native-gesture-handler';

export default function IntroHeader() {
    const {user}=useContext(UserContext);
    const [isEnabled, setIsEnabled] = React.useState(false);
  return (
    <View style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    }}>
       <View style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
       }}>
      <Image source={{ uri: user?.picture }} 
        style={{ width: 45, height: 45, borderRadius: 99 }}
      />
      <Text style={{
        fontSize: 20, 
        fontFamily: 'outfit-bold',
        }}>Hello, Eryn{user?.name}</Text>
        </View>
        <View style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 4,
        }}>
          <Text style={{
            fontSize: 16,
            fontFamily: 'outfit',
          }}
          >{isEnabled ? 'Veg' : 'Non-Veg'}</Text>
        <Switch 
        value={isEnabled}
        onValueChange={() => setIsEnabled(!isEnabled)}
        />
        </View>
    </View>
  )
}