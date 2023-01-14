import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableHighlight,
  Image,
  FlatList,
  ListRenderItemInfo,
} from "react-native";
import React, { useState } from "react";
import style from "./style";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";
import { useGetLeagueStanding, useGetTopScorer } from "../../hooks/queries";
import { Standing } from "../../utils/types";

const triggerStyles = {
  triggerText: {
    color: "white",
  },
  triggerWrapper: {
    padding: 5,
    backgroundColor: "blue",
  },
  triggerTouchable: {
    underlayColor: "darkblue",
    activeOpacity: 70,
  },
  TriggerTouchableComponent: TouchableHighlight,
};
const menuOptionsStyle = {
  optionsContainer: {
    backgroundColor: "white",
    borderRadius: 8,
  },
};
const LEAGUES = [
  {
    title: "Premier League",
    leagueId: 39,
    leagueLogo: "https://media-4.api-sports.io/football/leagues/39.png",
  },
  {
    title: "La Liga",
    leagueId: 140,
    leagueLogo: "https://media-4.api-sports.io/football/leagues/140.png",
  },
  {
    title: "Seria A",
    leagueId: 135,
    leagueLogo: "https://media-4.api-sports.io/football/leagues/135.png",
  },
  {
    title: "Ligue 1",
    leagueId: 61,
    leagueLogo: "https://media-4.api-sports.io/football/leagues/61.png",
  },
];
const LeagueTable = () => {
  const [selectedLeague, setSelectedLeague] = useState(0);
  const { data: standings, isLoading : isLoadingLeagueStanding } = useGetLeagueStanding(
    LEAGUES[selectedLeague].leagueId
  );
  const { data: topScorer, isLoading: isLoadingTopScorer } = useGetTopScorer(
    LEAGUES[selectedLeague].leagueId
  );
  console.log("data", topScorer?.response[0]);
  

  if(isLoadingLeagueStanding || isLoadingTopScorer)
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
        <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
          <View
            style={{
              margin: 16,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={style.subtitle}>League</Text>
            <Menu
              onSelect={(value) => {
                setSelectedLeague(value);
              }}
            >
              <MenuTrigger>
                <View
                  style={{
                    height: 40,
                    width: 40,
                    borderRadius: 60,
                    backgroundColor: "white",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    source={{ uri: LEAGUES[selectedLeague].leagueLogo }}
                    style={{ height: 30, width: 30 }}
                  />
                </View>
              </MenuTrigger>
              <MenuOptions customStyles={menuOptionsStyle}>
                {LEAGUES.map((leg, index) => {
                  return (
                    <MenuOption key={leg.leagueId} value={index}>
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <Image
                          source={{ uri: leg.leagueLogo }}
                          style={{
                            height: 30,
                            width: 30,
                            marginRight: 16,
                            marginLeft: 8,
                            marginVertical: 8,
                          }}
                        />
                        <Text
                          style={{
                            fontFamily: "Poppins_600SemiBold",
                            fontSize: 16,
                            color: "black",
                          }}
                        >
                          {leg.title}
                        </Text>
                      </View>
                    </MenuOption>
                  );
                })}
              </MenuOptions>
            </Menu>
          </View>
          <Text style={[style.subtitle,{marginLeft: 8}]}>Points Table</Text>
          <View style={[style.card_background, { height: 450 }]}>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  color: "white",
                  fontFamily: "Poppins_700Bold",
                  fontSize: 12,
                  flex: 0.7,
                  textAlign: "center",
                }}
              >
                Sl. No
              </Text>
              <Text
                style={{
                  color: "white",
                  fontFamily: "Poppins_700Bold",
                  fontSize: 12,
                  flex: 3,
                  textAlign: "center",
                }}
              >
                Team
              </Text>
              <Text
                style={{
                  color: "white",
                  fontFamily: "Poppins_700Bold",
                  fontSize: 12,
                  flex: 1,
                  textAlign: "center",
                }}
              >
                P
              </Text>
              <Text
                style={{
                  color: "green",
                  fontFamily: "Poppins_700Bold",
                  fontSize: 12,
                  flex: 1,
                  textAlign: "center",
                }}
              >
                W
              </Text>
              <Text
                style={{
                  color: "red",
                  fontFamily: "Poppins_700Bold",
                  fontSize: 12,
                  flex: 1,
                  textAlign: "center",
                }}
              >
                L
              </Text>
              <Text
                style={{
                  color: "white",
                  fontFamily: "Poppins_700Bold",
                  fontSize: 12,
                  flex: 1,
                  textAlign: "center",
                }}
              >
                GF
              </Text>
              <Text
                style={{
                  color: "white",
                  fontFamily: "Poppins_700Bold",
                  fontSize: 12,
                  flex: 1,
                  textAlign: "center",
                }}
              >
                GA
              </Text>
              <Text
                style={{
                  color: "white",
                  fontFamily: "Poppins_700Bold",
                  fontSize: 12,
                  flex: 1,
                  textAlign: "center",
                }}
              >
                GD
              </Text>
              <Text
                style={{
                  color: "#EBB434",
                  fontFamily: "Poppins_700Bold",
                  fontSize: 12,
                  flex: 1,
                  textAlign: "center",
                }}
              >
                Pts
              </Text>
            </View>
            <View style={{ flex: 1, width: "100%" }}>
              <ScrollView>
                {standings?.response[0].league.standings[0].map(
                  (team, index) => {
                    return (
                      <View
                        key={index}
                        style={{ flexDirection: "row", marginVertical: 8 }}
                      >
                        <Text
                          style={{
                            color: "white",
                            fontFamily: "Poppins_500Medium",
                            fontSize: 12,
                            flex: 0.7,
                            textAlign: "center",
                          }}
                        >
                          {team.rank}
                        </Text>
                        <Text
                          style={{
                            color: "white",
                            fontFamily: "Poppins_500Medium",
                            fontSize: 12,
                            flex: 3,
                            textAlign: "center",
                          }}
                        >
                          {team.team.name}
                        </Text>
                        <Text
                          style={{
                            color: "white",
                            fontFamily: "Poppins_500Medium",
                            fontSize: 12,
                            flex: 1,
                            textAlign: "center",
                          }}
                        >
                          {team.all.played}
                        </Text>
                        <Text
                          style={{
                            color: "green",
                            fontFamily: "Poppins_500Medium",
                            fontSize: 12,
                            flex: 1,
                            textAlign: "center",
                          }}
                        >
                          {team.all.win}
                        </Text>
                        <Text
                          style={{
                            color: "red",
                            fontFamily: "Poppins_500Medium",
                            fontSize: 12,
                            flex: 1,
                            textAlign: "center",
                          }}
                        >
                          {team.all.lose}
                        </Text>
                        <Text
                          style={{
                            color: "white",
                            fontFamily: "Poppins_500Medium",
                            fontSize: 12,
                            flex: 1,
                            textAlign: "center",
                          }}
                        >
                          {team.all.goals.for}
                        </Text>
                        <Text
                          style={{
                            color: "white",
                            fontFamily: "Poppins_500Medium",
                            fontSize: 12,
                            flex: 1,
                            textAlign: "center",
                          }}
                        >
                          {team.all.goals.against}
                        </Text>
                        <Text
                          style={{
                            color: "white",
                            fontFamily: "Poppins_500Medium",
                            fontSize: 12,
                            flex: 1,
                            textAlign: "center",
                          }}
                        >
                          {team.goalsDiff}
                        </Text>
                        <Text
                          style={{
                            color: "#EBB434",
                            fontFamily: "Poppins_500Medium",
                            fontSize: 12,
                            flex: 1,
                            textAlign: "center",
                          }}
                        >
                          {team.points}
                        </Text>
                      </View>
                    );
                  }
                )}
              </ScrollView>
            </View>
          </View>
          <Text style={[style.subtitle, { marginTop: 16, marginLeft: 8 }]}>
            Top Scorer
          </Text>
          {!isLoadingTopScorer && (
            <View
              style={[
                style.card_background,
                { flexDirection: "row", alignItems: "center" },
              ]}
            >
             
              <View>
              <Image source={{uri : topScorer?.response[0].statistics[0].team.logo}} style={{height : 40, width : 40}}/>
                <Text
                  style={{
                    fontFamily: "Poppins_600SemiBold",
                    color: "#D5CEA3",
                    fontSize: 22,
                    marginTop : 12
                  }}
                >
                  {topScorer?.response[0].player.name}
                </Text>
                <Text
                  style={{
                    fontFamily: "Poppins_600SemiBold",
                    color: "#6B728E",
                    fontSize: 18,
                    marginTop: 10,
                  }}
                >
                  {topScorer?.response[0].statistics[0].games.position}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "baseline",
                    marginTop: 10,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Poppins_600SemiBold",
                      color: "#9F73AB",
                      fontSize: 32,
                    }}
                  >
                    {topScorer?.response[0].statistics[0].goals.total}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Poppins_600SemiBold",
                      color: "#9F73AB",
                      fontSize: 18,
                      marginLeft: 8,
                    }}
                  >
                    Goals
                  </Text>
                </View>
              </View>
              <View style={{ marginLeft: "auto" }}>
                <Image
                  source={{ uri: topScorer?.response[0].player.photo }}
                  style={{ height: 180, width: 150, borderRadius: 8 }}
                />
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default LeagueTable;
