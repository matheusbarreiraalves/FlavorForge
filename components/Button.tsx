import colors from '@/services/colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';


export default function Button({label, onPress, icon =''}:any) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
          backgroundColor: colors.PRIMARY,
          padding: 15,
          borderRadius: 15,
          marginTop: 20,
          justifyContent: 'center',
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          gap: 10,
          alignItems: 'center',
        }}>
            <Ionicons name={icon} size={20} color="white" />
      <Text
      style={{
        textAlign: 'center',
        fontSize: 16,
        color: '#fff',
        fontFamily: 'outfit',
      }}>{label}</Text>
    </TouchableOpacity>
  )
}