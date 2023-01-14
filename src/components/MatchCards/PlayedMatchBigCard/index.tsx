import { View, Text, Dimensions,Image } from 'react-native'
import React from 'react'
import style from './style'
import { AwayClass, Goals } from '../../../utils/types'
const {width} = Dimensions.get('window')
interface PlayedMatchBigCardProps{
    venue : string,
    teams : Goals,
    goals : Goals,
    date : string,
}
export default function PlayedMatchBigCard({venue, teams, goals, date} : PlayedMatchBigCardProps) {
    const homeTeam = teams.home as AwayClass
    const awayTeam = teams.away as AwayClass
    const homeTeamGoal = goals.home as number
    const awayTeamGoal = goals.away as number
  return (
    <View style={[style.card_background, {width : width * 0.9, marginHorizontal : 8}]}>
      <View style={{width : width*0.7}}>
      <Text numberOfLines={1} style={style.stadium_name}>{venue}</Text>
      </View>
      <View style={{flexDirection : 'row', justifyContent : 'space-between', alignItems:'center', width : '100%', marginTop : 16}}>
        <View style={{alignItems : 'center'}}>
              <Image source={{uri : homeTeam.logo}} style={{height : 60, width : 60}} />
            <View style={{width : 100}}><Text numberOfLines={1} style={style.team_name}>{homeTeam.name}</Text></View>
            <Text style={style.match_type} >Home</Text>
        </View>
        <View style={{alignItems : 'center'}}>
            <Text style={style.goals}>{homeTeamGoal} : {awayTeamGoal}</Text>
            <Text numberOfLines={1} style={style.date_style}>{date}</Text>
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