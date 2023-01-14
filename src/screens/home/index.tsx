import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {
  Dimensions,
  FlatList,
  ListRenderItemInfo,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import AppBar from "../../components/AppBar";
import Button from "../../components/Button";
import BigMatchCard from "../../components/MatchCards/BigCards";
import EmptyCard from "../../components/MatchCards/EmptyCard";
import PlayedMatchCard from "../../components/MatchCards/PlayedMatchCard";
import SmallMatchCard from "../../components/MatchCards/SmallCards";
import { useGetMatches } from "../../hooks/queries";
import { MatchDetails, MatchPlayStatus } from "../../utils/types";
import style from "./style";
import HomeScreenWrapper from "../../components/Layout/HomeScreenWrapper";
const { width } = Dimensions.get("window");
const Tab = createBottomTabNavigator();
const Home = () => {
  const LEAGUES = [
    { title: "Premier League", leagueId: 39, leagueLogo : 'https://media-4.api-sports.io/football/leagues/39.png' },
    { title: "La Liga", leagueId: 140, leagueLogo : 'https://media-4.api-sports.io/football/leagues/140.png' },
    { title: "Seria A", leagueId: 135, leagueLogo : 'https://media-4.api-sports.io/football/leagues/135.png' },
    { title: "Ligue 1", leagueId: 61,  leagueLogo : 'https://media-4.api-sports.io/football/leagues/61.png' },
  ];
  const [activeLeague, setActiveLeague] = useState(0);
  const [playedFixtureModalVisible, setPlayedFixtureModalVisible] = useState(false)
  {
    /* Queries */
  }

  const {
    data: matches,
    isLoading,
    refetch: refetchMatches,
  } = useGetMatches(LEAGUES[activeLeague].leagueId);

  const filterMatchByStatus = (
    status: MatchPlayStatus,
    getTodaysMatch?: boolean
  ) => {
    if (status === MatchPlayStatus.LIVE) {
      return matches!.response.filter(
        (match) =>
          match.fixture.status.short === MatchPlayStatus.H1 ||
          match.fixture.status.short === MatchPlayStatus.H2 ||
          match.fixture.status.short === MatchPlayStatus.HT ||
          match.fixture.status.short === MatchPlayStatus.ET
      );
    }

    if(status === MatchPlayStatus.FT) return matches!.response.filter((match) => match.fixture.status.short === MatchPlayStatus.FT).sort((a,b) => moment(b.fixture.date).diff(moment(a.fixture.date)))


    return matches!.response
      .filter((match) => match.fixture.status.short === status)
      .sort((a,b) => moment(a.fixture.date).diff(moment(b.fixture.date)))
  };

  if(isLoading)
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
      <Modal transparent={true} visible={playedFixtureModalVisible} animationType="slide">
 
        <View style={style.modal_container}>
          <View style={{height : '85%', width:'100%', backgroundColor : '#3F3B6C', borderRadius:16, alignItems:'center', padding: 16}}>
            <View style={{flexDirection : 'row', alignItems : 'baseline'}}>
            <Text style={style.h1}>Played Matches</Text>
            <Pressable style={{flex : 1}} onPress={()=> setPlayedFixtureModalVisible(false)}>
            <Text style={[style.subtitle, {textAlign : 'right'}]}>Close</Text>
            </Pressable>
            </View>
            <ScrollView centerContent={true} contentContainerStyle={{maxWidth : '100%'}}>
                {filterMatchByStatus(MatchPlayStatus.FT, false)
                  .map((match, index) => {
                    return (
                      <PlayedMatchCard
                      venue={match.fixture.venue.name}
                        teams={match.teams}
                        key={index}
                        id = {String(match.fixture.id)}
                        dateTime={match.fixture.date}
                        goals = {match.goals}
                        callbackFn = {() => setPlayedFixtureModalVisible(false)}
                      />
                    );
                  })}
              </ScrollView>
          </View>
        </View>
      </Modal>
        <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
          <View>
            <ScrollView horizontal={true}>
              {LEAGUES.map((league, index) => {
                return (
                  <Button
                    key={index}
                    lable={league.title}
                    isActive={index === activeLeague}
                    onClick={() => {
                      setActiveLeague(index);
                    }}
                  />
                );
              })}
            </ScrollView>
          </View>
          <View style={style.row}>
            <Text style={[style.h1, { marginLeft: 16, marginTop: 16 }]}>
              Ongoing Matches
            </Text>
          </View>
          <View>
            {!isLoading &&
            filterMatchByStatus(MatchPlayStatus.LIVE).length > 0 ? (
              <FlatList
                horizontal={true}
                centerContent
                data={filterMatchByStatus(MatchPlayStatus.LIVE)}
                renderItem={({
                  item: match,
                  index,
                }: ListRenderItemInfo<MatchDetails>) => (
                  <BigMatchCard
                    teams={match.teams}
                    key={index}
                    venue={match.fixture.venue.name}
                    dateTime={match.fixture.date}
                  />
                )}
              />
            ) : (
              <EmptyCard message="Sorry there are no ongoing matches right now" />
            )}
          </View>
          <View style={[style.row, { marginTop: 24 }]}>
            <Text style={[style.h1, { marginLeft: 16, marginTop: 16 }]}>
              Upcoming Matches
            </Text>
            <Text style={[style.subtitle, { marginRight: 24 }]}> See All</Text>
          </View>
          <View>
            {!isLoading &&
            filterMatchByStatus(MatchPlayStatus.NS, true).length > 0 ? (
              <FlatList
                centerContent
                horizontal={true}
                data={filterMatchByStatus(MatchPlayStatus.NS, true).slice(0,10)}
                renderItem={({
                  item: match,
                  index,
                }: ListRenderItemInfo<MatchDetails>) => (
                  <BigMatchCard
                    teams={match.teams}
                    key={index}
                    venue={match.fixture.venue.name}
                    dateTime={match.fixture.date}
                  />
                )}
              />
            ) : (
              <EmptyCard message="There are no more matches today" />
            )}
          </View>


          <View style={[style.row, { marginTop: 24 }]}>
            <Text style={[style.h1, { marginLeft: 16, marginTop: 16 }]}>
              Played Fixtures
            </Text>
            <Pressable onPress={()=> setPlayedFixtureModalVisible(true)}>
            <Text style={[style.subtitle, { marginRight: 24 }]}> See All</Text>
            </Pressable>
          </View>
          <View style={{alignItems : 'center'}} >
            {!isLoading &&
            filterMatchByStatus(MatchPlayStatus.FT, false).length > 0 ? (
              <ScrollView centerContent={true} >
                {filterMatchByStatus(MatchPlayStatus.FT, false)
                  .slice(0, 7)
                  .map((match, index) => {
                    return (
                      <PlayedMatchCard
                      venue={match.fixture.venue.name}
                        teams={match.teams}
                        key={index}
                        id = {String(match.fixture.id)}
                        dateTime={match.fixture.date}
                        goals = {match.goals}
                      />
                    );
                  })}
              </ScrollView>
            ) : (
              <EmptyCard message="There are no more matches today" />
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Home;
