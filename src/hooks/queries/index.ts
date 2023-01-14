import {
  LeagueStandingObject,
  MatchEventResponse,
  MatchLineupResponse,
  MatchResponse,
  MatchStatResponse,
  StatisticRootObject,
} from "../../utils/types";
import { UseQueryOptions, useQuery } from "react-query";
import { AxiosError } from "axios";
import client from "../../utils/client";
import moment from "moment";

{
  /* FETCHER FUNCTIONS */
}

const fetchTodaysMatch = (leagueId: number) => {
  const queryParms = {
    league: leagueId,
    season: 2022,
    timezone: "Asia/Kolkata",
  };
  return client
    .get<MatchResponse>("/fixtures", { params: queryParms })
    .then((res) => res.data);
};

const fetchMatchStatistics = (fixtureId: number) => {
  return client
    .get<MatchStatResponse>("fixtures/statistics", {
      params: { fixture: fixtureId },
    })
    .then((res) => res.data);
};

const fetchMatchLineups = (fixtureId: number) => {
  return client
    .get<MatchLineupResponse>("fixtures/lineups", {
      params: { fixture: fixtureId },
    })
    .then((res) => res.data);
};

const fetchMatchEvents = (fixtureId: number) => {
  return client
    .get<MatchEventResponse>("fixtures/events", {
      params: { fixture: fixtureId },
    })
    .then((res) => res.data);
};

const fetchLeagueStanding = (leagueId: number) => {
  console.log("fetch caleed", leagueId);

  return client
    .get<LeagueStandingObject>("/standings", {
      params: { league: leagueId, season: 2022 },
    })
    .then((res) => res.data);
};

const fetchTopScorer = (leagueId: number) => {
  console.log("fetch top caleed", leagueId);

  return client
    .get<StatisticRootObject>("players/topscorers", {
      params: { league: leagueId, season: 2022 },
    })
    .then((res) => res.data);
};

{
  /* QUERIES */
}

export const useGetMatches = (
  leagueId: number,
  options?:
    | Omit<
        UseQueryOptions<MatchResponse, AxiosError, MatchResponse, string>,
        "queryKey" | "queryFn"
      >
    | undefined
) =>
  useQuery<MatchResponse, Error, MatchResponse>(
    ` today-match-league=${leagueId.toString()}`,
    () => fetchTodaysMatch(leagueId),
    {
      refetchOnMount: false,
      staleTime: Infinity,
    }
  );

export const useGetMatchStatistics = (
  fixtureId: number,
  options?:
    | Omit<
        UseQueryOptions<
          MatchStatResponse,
          AxiosError,
          MatchStatResponse,
          string
        >,
        "queryKey" | "queryFn"
      >
    | undefined
) =>
  useQuery<MatchStatResponse, Error, MatchStatResponse>(
    `stat : ${fixtureId}`,
    () => fetchMatchStatistics(fixtureId),
    {
      refetchOnMount: false,
      staleTime: Infinity,
    }
  );

export const useGetMatchLineups = (
  fixtureId: number,
  options?:
    | Omit<
        UseQueryOptions<
          MatchLineupResponse,
          AxiosError,
          MatchLineupResponse,
          string
        >,
        "queryKey" | "queryFn"
      >
    | undefined
) =>
  useQuery<MatchLineupResponse, Error, MatchLineupResponse>(
    `lineups : ${fixtureId}`,
    () => fetchMatchLineups(fixtureId),
    {
      refetchOnMount: false,
      staleTime: Infinity,
    }
  );

export const useGetMatchEvents = (
  fixtureId: number,
  options?:
    | Omit<
        UseQueryOptions<
          MatchEventResponse,
          AxiosError,
          MatchEventResponse,
          string
        >,
        "queryKey" | "queryFn"
      >
    | undefined
) =>
  useQuery<MatchEventResponse, Error, MatchEventResponse>(
    `events : ${fixtureId}`,
    () => fetchMatchEvents(fixtureId),
    {
      refetchOnMount: false,
      staleTime: Infinity,
    }
  );

export const useGetLeagueStanding = (
  leagueId: number,
  options?:
    | Omit<
        UseQueryOptions<
          LeagueStandingObject,
          AxiosError,
          LeagueStandingObject,
          string
        >,
        "queryKey" | "queryFn"
      >
    | undefined
) =>
  useQuery<LeagueStandingObject, Error, LeagueStandingObject>(
    `standing : ${leagueId}`,
    () => fetchLeagueStanding(leagueId),
    {
      refetchOnMount: false,
      staleTime: Infinity,
    }
  );
export const useGetTopScorer = (
  leagueId: number,
  options?:
    | Omit<
        UseQueryOptions<
          StatisticRootObject,
          AxiosError,
          StatisticRootObject,
          string
        >,
        "queryKey" | "queryFn"
      >
    | undefined
) =>
  useQuery<StatisticRootObject, Error, StatisticRootObject>(
    `topscorer : ${leagueId}`,
    () => fetchTopScorer(leagueId),
    {
      refetchOnMount: false,
      staleTime: Infinity,
    }
  );
