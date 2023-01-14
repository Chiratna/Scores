import { View, Text, ImageBackground, Image, Dimensions } from "react-native";
import React from "react";
import { Lineup, PlayerDetails } from "../../utils/types";
import style from "./style";

interface LineUpProps {
  homeTeamLineup: Lineup;
  awayTeamLineup: Lineup;
}
interface LineupTileProps{
    player : PlayerDetails
    tileColor : string
    numberColor : string
}
const {width} = Dimensions.get('window')
const LineupTile = ({player, tileColor, numberColor} : LineupTileProps) =>{
    return <View  key={player.id}  style={{marginRight: "auto",
    marginLeft: "auto", alignItems : 'center', width: 70}}>
      <Text numberOfLines={1} style={{color : 'white', fontFamily: 'Poppins_500Medium', fontSize:14 }}>{player.name}</Text>
      <View
     
      style={[style.playerTile,{backgroundColor: `#${tileColor}`,}]}
    >
      <Text
        style={[
            style.playerNumber,
            {
                color: `#${numberColor}`,
            }
        ]}
      >
        {player.number}
      </Text>
    </View>  
    </View>
}
export default function LineUp({
  homeTeamLineup,
  awayTeamLineup,
}: LineUpProps) {
  return (
    <View style={{width:'100%'}}>
        <ImageBackground
      source={{
        uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Football_pitch.svg/1482px-Football_pitch.svg.png",
      }}
      resizeMode={"cover"}
      style={{
        width: "100%",
        height: 800,
        borderRadius: 16,
        overflow: "hidden",
        
      }}
    >
      <View style={{ width: "100%", height: "100%", position: 'relative', paddingBottom: 42, paddingTop: 48}}>
      <View style={{ flexDirection: 'row', position : 'absolute', top:0, right:0, height:40, width:'100%' , backgroundColor : 'rgba(10,10,10,0.7)', alignItems:'center', paddingHorizontal: 24, justifyContent : 'space-between'}}>
        <Text style={{color : 'white', fontFamily:'Poppins_600SemiBold', fontSize: 18}} >{homeTeamLineup.team.name}</Text>
        <Text style={{color : 'white', fontFamily:'Poppins_600SemiBold', fontSize: 18}} >{homeTeamLineup.formation}</Text>
      </View>
      <View style={{ flexDirection: 'row', position : 'absolute', bottom:0, right:0, height:40, width:'100%' , backgroundColor : 'rgba(10,10,10,0.7)', alignItems:'center', paddingHorizontal: 24, justifyContent : 'space-between'}}>
        <Text style={{color : 'white', fontFamily:'Poppins_600SemiBold', fontSize: 18}} >{awayTeamLineup.team.name}</Text>
        <Text style={{color : 'white', fontFamily:'Poppins_600SemiBold', fontSize: 18}} >{awayTeamLineup.formation}</Text>
      </View>
        <View
          style={{
            width: "100%",
            height: "50%",
            paddingBottom : 8,
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            {homeTeamLineup.startXI
              .filter(
                (player) => Number(player.player.grid?.split(":")[0]) === 1
              )
              .map((player) => {
                return (
                  <LineupTile key={player.player.id}  player={player.player} tileColor={homeTeamLineup.team.colors.goalkeeper.primary} numberColor={homeTeamLineup.team.colors.goalkeeper.number}/>
                );
              })}
          </View>
          {homeTeamLineup.formation.split("-").map((_, index) => {
            return (
              <View
                key={index}
                style={{ flexDirection: "row", justifyContent: "center" }}
              >
                {homeTeamLineup.startXI
                  .filter(
                    (player) =>
                      Number(player.player.grid?.split(":")[0]) === index + 2
                  )
                  .map((player) => {
                    return (
                        <LineupTile key={player.player.id} player={player.player} tileColor={homeTeamLineup.team.colors.player.primary} numberColor={homeTeamLineup.team.colors.player.number}/>
                    );
                  })}
              </View>
            );
          })}
        </View>
        <View
          style={{
            width: "100%",
            height: "50%",
            flexDirection: "column-reverse",
            justifyContent: "space-between",
            paddingTop : 8
          }}
        >
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            {awayTeamLineup.startXI
              .filter(
                (player) => Number(player.player.grid?.split(":")[0]) === 1
              )
              .map((player) => {
                return (
                    <LineupTile key={player.player.id} player={player.player} tileColor={awayTeamLineup.team.colors.goalkeeper.primary} numberColor={awayTeamLineup.team.colors.goalkeeper.number}/>
                );
              })}
          </View>
          {awayTeamLineup.formation.split("-").map((_, index) => {

            return (
                <View
                key={index}
                style={{ flexDirection: "row", justifyContent: "center" }}
              >
                {awayTeamLineup.startXI
                  .filter(
                    (player) =>
                      Number(player.player.grid?.split(":")[0]) === index + 2
                  )
                  .map((player) => {
                    return (
                        <LineupTile key={player.player.id} player={player.player} tileColor={awayTeamLineup.team.colors.player.primary} numberColor={awayTeamLineup.team.colors.player.number}/>
                    );
                  })}
              </View>
            );
          })}
        </View>
      </View>
    </ImageBackground>
    <View style={{marginTop: 32, width : '100%', paddingHorizontal:16}}>
        <Text style={{fontFamily : 'Poppins_700Bold', fontSize:22, color : 'white'}}>Substitutes</Text>
        <View style={{flexDirection : 'row'}}>
          <View style={{width : '50%'}}>
            <View style={{flexDirection : 'row', alignItems : 'center', width : width*0.4, alignSelf: 'flex-start', justifyContent: 'flex-start'}}>
            <View style={{height:35, width:35, borderRadius: 100, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', marginVertical : 8 }} ><Image source={{uri : homeTeamLineup.team.logo }} style={{height:30, width:30}} /></View>
            <Text style={{color:'white', fontFamily : 'Poppins_600SemiBold', marginLeft:8, fontSize: 16}}>
                    {homeTeamLineup.team.name}
                    </Text>
            </View>
            {homeTeamLineup.substitutes.map((player)=>{
                return <View key={player.player.id} style={{flexDirection : 'row',marginVertical:8}}>
                    <Text style={{color:'white', fontFamily : 'Poppins_600SemiBold', width:32}}>
                    {player.player.number}
                </Text>
                    <Text style={{color:'white', fontFamily : 'Poppins_600SemiBold'}}>
                    {player.player.name}
                    </Text>
                
                </View>
            })}
          </View>
          <View style={{width : '50%', }}>
          <View style={{flexDirection : 'row', alignItems : 'center', width : width*0.4, alignSelf: 'flex-end', justifyContent: 'flex-end'}}>
            
            <Text style={{color:'white', fontFamily : 'Poppins_600SemiBold', marginRight:8, fontSize: 16}}>
                    {awayTeamLineup.team.name}
                    </Text>
                    <View style={{height:35, width:35, borderRadius: 100, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', marginVertical : 8 }} ><Image source={{uri : awayTeamLineup.team.logo }} style={{height:30, width:30}} /></View>
            </View>
            {awayTeamLineup.substitutes.map((player)=>{
                return <View key={player.player.id} style={{flexDirection : 'row',marginVertical:8, marginLeft : 'auto'}}>
                   
                    <Text style={{color:'white', fontFamily : 'Poppins_600SemiBold'}}>
                    {player.player.name}
                    </Text>
                    <Text style={{color:'white', fontFamily : 'Poppins_600SemiBold', marginLeft: 16}}>
                    {player.player.number}
                </Text>
                </View>
            })}
          </View>
          
        </View>
        <Text style={{fontFamily : 'Poppins_700Bold', fontSize:20, color : 'white', alignSelf: 'center'}}>Coach</Text>
        <View style={{flexDirection : 'row', justifyContent : 'space-between', marginVertical: 8}}>
                    <View style={{alignItems : 'center'}}>
                    <Image source={{uri: homeTeamLineup.coach.photo}} style={{width : 50, height: 50}} />
                    <Text style={{color:'white', fontFamily : 'Poppins_600SemiBold'}}>
                    {homeTeamLineup.coach.name}
                    </Text>
                    </View>
                    <View style={{alignItems : 'center'}}>
                    <Image source={{uri: awayTeamLineup.coach.photo}} style={{width : 50, height: 50}} />
                    <Text style={{color:'white', fontFamily : 'Poppins_600SemiBold'}}>
                    {awayTeamLineup.coach.name}
                    </Text>
                    </View>
        </View>
    </View>
    </View>
  );
}
