import { View, Text, Image, Dimensions, Pressable } from 'react-native'
import React from 'react'
import style from './style'
import { AwayClass, Goals } from '../../../utils/types'
import { SvgXml } from 'react-native-svg';
import moment from 'moment'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParams } from '../../../../App';
interface PlayedMatchCardProps{
  teams : Goals,
  dateTime : Date,
  goals : Goals,
  id : string,
  venue : string,
  callbackFn? : () => void
}
const {width} = Dimensions.get('window')




export default function PlayedMatchCard({teams, dateTime, goals, id, venue, callbackFn}:PlayedMatchCardProps) {
  const homeTeam = teams.home as AwayClass
  const awayTeam = teams.away as AwayClass
  const homeTeamGoal = goals.home as number
  const awayTeamGoal = goals.away as number
  const date = moment(dateTime).format("DD MMM")
  const time = moment(dateTime).format("hh:mm a")
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParams>>()


  const handleOnClick = () =>{
    if(callbackFn) callbackFn()
    navigation.navigate('MATCH_DETAILS',{matchId : id, teams : teams, goals : goals, venue : venue, date : date})
    
  }

  return (
        <Pressable onPress={handleOnClick} style={[style.card_background, {width : width*0.92, marginVertical : 8}]}>
      <View style={{flexDirection : 'row', justifyContent : 'space-between', alignItems:'center', width : '100%'}}>
        <View style={{alignItems : 'flex-start', width : width * 0.5}}>
              <View style={{flexDirection : 'row', alignItems : 'center', marginVertical : 8}}>
              <View style={[homeTeam.winner && style.winner_team, {padding : 2}]}>
              <Image source={{uri : homeTeam.logo}} style={{height : 30, width : 30}} />
              </View>
              <Text style={style.team_name}>{homeTeam.name}</Text>
              </View>
              <View style={{flexDirection : 'row', alignItems : 'center', marginVertical : 8}}>
              <View style={[awayTeam.winner && style.winner_team, {padding : 2}]}>
              <Image source={{uri : awayTeam.logo}} style={{height : 30, width : 30}} />
              </View>
              <Text style={style.team_name}>{awayTeam.name}</Text>
              </View>
        </View>
       <View style={{width : 2, height : '50%', backgroundColor : 'grey'}}>

       </View>
        <View style={{flexDirection : 'row',alignItems : 'center'}}>
            <Text style={style.date_style}>{date}</Text>
            <Text style={style.scoreline}>{homeTeamGoal} - {awayTeamGoal}</Text>
        </View>
      </View>
    </Pressable>
  )
}