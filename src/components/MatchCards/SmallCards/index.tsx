import { View, Text, Image, Dimensions } from 'react-native'
import React from 'react'
import style from './style'
import { AwayClass, Goals } from '../../../utils/types'
import moment from 'moment'
interface SmallMatchCardProps{
  teams : Goals,
  venue : string,
  dateTime : Date,
}
const {width} = Dimensions.get('window')

export default function SmallMatchCard({teams, venue, dateTime}:SmallMatchCardProps) {
  const homeTeam = teams.home as AwayClass
  const awayTeam = teams.away as AwayClass
  const date = moment(dateTime).format("DD MMM")
  const time = moment(dateTime).format("hh:mm a")
  return (
    <View style={[style.card_background, {width : width, marginVertical : 8}]}>
      <View style={{flexDirection : 'row', justifyContent : 'space-between', alignItems:'center', width : '100%', marginTop : 16}}>
        <View style={{alignItems : 'center'}}>
              <Image source={{uri : homeTeam.logo}} style={{height : 60, width : 60}} />
            <Text style={style.match_type} >Home</Text>
        </View>
        <View style={{alignItems:'center', width : width*0.6}}>
            <Text style={style.vs_text}>{time}</Text>
            <Text style={style.match_time}>{date}</Text>
            <Text numberOfLines={1} style={style.stadium_name}>{venue}</Text>
        </View>
        <View style={{alignItems : 'center'}}>
            <Image source={{uri : awayTeam.logo}} style={{height : 60, width : 60}} />
            <Text style={style.match_type} >Away</Text>
        </View>
      </View>
    </View>
  )
}