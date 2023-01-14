import { View, Text, Image, Dimensions } from 'react-native'
import React from 'react'
import style from './style'
import { AwayClass, Goals } from '../../../utils/types'
import moment from 'moment'
interface BigMatchCardProps{
  teams : Goals,
  venue : string,
  dateTime : Date,
}
const {width} = Dimensions.get('window')

export default function BigMatchCard({teams, venue, dateTime}:BigMatchCardProps) {
  const homeTeam = teams.home as AwayClass
  const awayTeam = teams.away as AwayClass
  const date = moment(dateTime).format("DD MMM")
  const isToday = moment(dateTime).format("DD MMM") === moment(Date.now()).format("DD MMM")
  const time = moment(dateTime).format("hh:mm a")
  
  return (
    <View style={[style.card_background, {width : width * 0.9, marginHorizontal : 8}]}>
      <View style={{width : 150}}>
      <Text numberOfLines={1} style={style.stadium_name}>{venue}</Text>
      </View>
      <View style={{flexDirection : 'row', justifyContent : 'space-between', alignItems:'center', width : '100%', marginTop : 16}}>
        <View style={{alignItems : 'center'}}>
              <Image source={{uri : homeTeam.logo}} style={{height : 60, width : 60}} />
            <View style={{width : 100}}><Text numberOfLines={1} style={style.team_name}>{homeTeam.name}</Text></View>
            <Text style={style.match_type} >Home</Text>
        </View>
        <View style={{alignItems:'center'}}>
            <Text style={style.vs_text}>Vs</Text>
            <Text style={style.match_time}>{time}</Text>
            {!isToday && <Text style={style.date_style}>{date}</Text>}
        </View>
        <View style={{alignItems : 'center'}}>
            <Image source={{uri : awayTeam.logo}} style={{height : 60, width : 60}} />
            <View style={{width : 100}}><Text numberOfLines={1} style={style.team_name}>{awayTeam.name}</Text></View>
            <Text style={style.match_type} >Away</Text>
        </View>
      </View>
    </View>
  )
}