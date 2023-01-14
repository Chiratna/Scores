import { View, Text, StyleProp, ViewStyle, TextStyle, TouchableOpacity } from 'react-native'
import React from 'react'
import style from "./style"

interface ButtonProps{
    isActive : boolean
    lable : string
    style? : StyleProp<ViewStyle | TextStyle>
    onClick : () => void
}

export default function Button({isActive, lable, style : customStyle, onClick} : ButtonProps) {
  return (
    <TouchableOpacity style={[style.league_btn_container, isActive && style.active_league_btn, customStyle]} onPress={onClick}>
        <View >
            <Text style={[style.league_btn_text, isActive && style.active_league_btn_text]}>{lable}</Text>
        </View>
    </TouchableOpacity>
  )
}