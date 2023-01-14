import { View, Text } from 'react-native'
import React from 'react'
import style from './style'

interface EmptyCardProps{
    message : string
}


export default function EmptyCard({message} : EmptyCardProps) {
  return (
    <View style={style.card_background}>
      <Text style={style.message_style}>{message}</Text>
    </View>
  )
}