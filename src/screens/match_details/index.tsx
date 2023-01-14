import { View, Text, ScrollView, SafeAreaView, ImageBackground } from "react-native";
import React, { useState } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { AppStackParams } from "../../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import style from "./style";
import { AwayClass, Pos } from "../../utils/types";
import PlayedMatchBigCard from "../../components/MatchCards/PlayedMatchBigCard";
import Button from "../../components/Button";
import { useGetMatchEvents, useGetMatchLineups, useGetMatchStatistics } from "../../hooks/queries";
import MatchStatistics from "../../components/MatchStatistics";
import LineUp from "../../components/Lineup";
import MatchEvent from "../../components/Events";

enum TAB_OPTIONS {
  STAT = "STATS",
  LINE_UP = "LINE_UP",
  SUMMARY = "SUMMARY",
}

type TAB_CONTAINER_TYPE = {
  lable: string;
  value: keyof typeof TAB_OPTIONS;
};

const TAB_DATA: TAB_CONTAINER_TYPE[] = [
  {
    lable: "Stats",
    value: "STAT",
  },
  {
    lable: "Lineup",
    value: "LINE_UP",
  },
  {
    lable: "Summary",
    value: "SUMMARY",
  },
];

export default function MatchDetails() {
  const route = useRoute<RouteProp<AppStackParams>>();
  const teams = route.params?.teams;
  const goals = route.params?.goals;
  const venue = route.params?.venue;
  const date = route.params?.date;
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParams>>();
  const [activeTab, setActiveTab] = useState<keyof typeof TAB_OPTIONS>("STAT");


  {/** QUERIES */}
  const { data: matchStats, isLoading : isLoadingMatchStats} = useGetMatchStatistics(
    Number(route.params?.matchId!)
  );
  const { data: matchLineups, isLoading : isLoadingMatchLineup } = useGetMatchLineups(
    Number(route.params?.matchId!)
  );

  const { data: events, isLoading: isLoadingMatchEvents } = useGetMatchEvents(Number(route.params?.matchId!));

  const homeTeam = teams?.home as AwayClass;
  const awayTeam = teams?.away as AwayClass;

  const segregatedTeamLineup = () =>{
    if(matchLineups?.response[0].team.id === homeTeam.id){
        return {homeTeamLineup : matchLineups.response[0], awayTeamLineup : matchLineups.response[1]}
    }
        
    return {homeTeamLineup : matchLineups!.response[1], awayTeamLineup : matchLineups!.response[0]}
  }

  if(isLoadingMatchLineup || isLoadingMatchStats || isLoadingMatchEvents) 
  return (
    <SafeAreaView>
      <View style={[style.screen_wrapper, {alignItems : 'center', justifyContent : 'center'}]}>
          <Text style={{
                  fontFamily: "Poppins_600SemiBold",
                  color: "#D5CEA3",
                  fontSize: 22,
                  marginTop : 12
                }}>Loading...</Text>
      </View>
    </SafeAreaView>
  )

  return (
    <SafeAreaView>
      <View style={style.screen_wrapper}>
        <ScrollView contentContainerStyle={{ alignItems: "center" }}>
          <View>
            <PlayedMatchBigCard
              teams={teams!}
              goals={goals!}
              venue={venue!}
              date={date!}
            />
          </View>
          <View style={style.match_details_placeholder_style}>
            <View style={{ flexDirection: "row" }}>
              {TAB_DATA.map((tab) => {
                return (
                  <Button
                    key={tab.value}
                    onClick={() => setActiveTab(tab.value)}
                    isActive={activeTab === tab.value}
                    lable={tab.lable}
                    style={{
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 6,
                    }}
                  />
                );
              })}
            </View>
            {
                activeTab === 'STAT' && <MatchStatistics matchStats={matchStats} homeTeam={homeTeam}  />
            }
            {
                activeTab === 'LINE_UP' && 
                <LineUp homeTeamLineup={segregatedTeamLineup().homeTeamLineup} awayTeamLineup={segregatedTeamLineup().awayTeamLineup} />
            }
            {
                activeTab === 'SUMMARY' && 
                <MatchEvent fixtureId={route.params?.matchId!} events={events} />
            }
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
