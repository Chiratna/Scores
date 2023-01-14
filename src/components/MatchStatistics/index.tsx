import { View, Text } from 'react-native'
import React from 'react'
import { AwayClass, MatchStatResponse } from '../../utils/types'
import style from './style'
interface MatchStatisticsProps{
    matchStats : MatchStatResponse | undefined
    homeTeam : AwayClass
}
export default function MatchStatistics({matchStats, homeTeam}: MatchStatisticsProps) {
    const getMatchStatForAParticularTeam = (index: number) => {
        if (matchStats?.response[0].team.id === homeTeam.id) {
          return {
            home: matchStats!.response[0].statistics[index].value,
            away: matchStats!.response[1].statistics[index].value,
          };
        }
    
        return {
          home: matchStats!.response[1].statistics[index].value,
          away: matchStats!.response[0].statistics[index].value,
        };
      };
    
      const getStatPercent = (homeTeamValue : number, awayTeamValue : number) =>{
        const max = Math.max(homeTeamValue, awayTeamValue)
        const nearestTenMultiple = ((max/10)+1)*10
    
        return {home : Math.round((homeTeamValue/nearestTenMultiple)*100), away : Math.round((awayTeamValue/nearestTenMultiple)*100)}
      }
  return (
    <View>
        {matchStats?.response[0].statistics.map((stat, index) => {
        const { home: homeTeamValue, away: awayTeamValue } =
          getMatchStatForAParticularTeam(index);
        let {home : homeTeamValueIndicator, away : awayTeamValueIndicator} = getStatPercent(homeTeamValue as number, awayTeamValue as number)
        if(typeof homeTeamValue === 'string'){
          homeTeamValueIndicator = Number(homeTeamValue.slice(0,-1))
        }
        if(typeof awayTeamValue === 'string'){
          awayTeamValueIndicator = Number(awayTeamValue.slice(0,-1))
        }
        return (
          <View key={index} style={{ width: "100%", marginVertical : 8 }}>
            <View style={{ flexDirection: "row", width: "100%", marginBottom : 8 }}>
              <Text
                style={style.home_team_stat_style}
              >
                {homeTeamValue ?? 0}
              </Text>
              <View style={{ flex: 1 }}>
                <Text
                  style={style.stat_type}
                >
                  {stat.type}
                </Text>
              </View>
              <Text
                style={style.away_team_style}
              >
                {awayTeamValue ?? 0}
              </Text>
            </View>
            <View style={{flexDirection:'row'}}>
              <View style={{flexDirection:'row-reverse', backgroundColor : 'white', marginHorizontal : 8, flex:1, height:6,borderRadius : 16}}>
              <View style={{width : `${homeTeamValueIndicator}%`, height : '100%',  backgroundColor : '#51557E', borderRadius : 16}}/>

              </View>
              <View style={{backgroundColor : 'white', marginHorizontal : 8, flex:1, height:6,borderRadius : 16}}>
                  <View style={{width : `${awayTeamValueIndicator}%`, height : '100%',  backgroundColor : '#816797', borderRadius : 16}}/>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  )
}