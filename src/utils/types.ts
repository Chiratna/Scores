export interface MatchResponse {
    errors:     any[];
    get:        string;
    paging:     Paging;
    parameters: Parameters;
    response:   MatchDetails[];
    results:    number;
   }
   
   export interface Paging {
    current: number;
    total:   number;
   }
   
   export interface Parameters {
    from:     Date;
    league:   string;
    season:   string;
    timezone: string;
    to:       Date;
   }
   
   
   export interface MatchDetails {
    fixture: Fixture;
    goals:   Goals;
    league:  League;
    score:   Score;
    teams:   Goals;
   }
   
   export interface Fixture {
    date:      Date;
    id:        number;
    periods:   Periods;
    referee:   string;
    status:    Status;
    timestamp: number;
    timezone:  string;
    venue:     Venue;
   }
   
   export interface Periods {
    first:  number | null;
    second: number | null;
   }
   
   export interface Status {
    elapsed: number | null;
    long:    Long;
    short:   MatchPlayStatus;
   }
   
   export enum Long {
    MatchFinished = "Match Finished",
    NotStarted = "Not Started",

   }
   
   export enum MatchPlayStatus {
    FT = "FT",
    NS = "NS",
    LIVE = "LIVE",
    HT = "HT",
    H1 = "1H",
    H2 = "2H",
    ET = "ET"
   }
   
   export interface Venue {
    city: string;
    id:   number;
    name: string;
   }
   
   export interface Goals {
    away: AwayClass | number | null;
    home: AwayClass | number | null;
   }
   
   export interface AwayClass {
    id:     number;
    logo:   string;
    name:   string;
    winner: boolean | null;
   }
   
   export interface League {
    country: string;
    flag:    string;
    id:      number;
    logo:    string;
    name:    string;
    round:   string;
    season:  number;
   }
   
   export interface Score {
    extratime: Goals;
    fulltime:  Goals;
    halftime:  Goals;
    penalty:   Goals;
   }

   export interface MatchStatResponse {
    errors:     any[];
    get:        string;
    paging:     Paging;
    parameters: string;
    response:   MatchStat[];
    results:    number;
   }
   
   export interface MatchStat {
    statistics: Statistic[];
    team:       Team;
   }
   
   export interface Statistic {
    type:  string;
    value: number | null | string;
   }
   
   export interface Team {
    id:   number;
    logo: string;
    name: string;
   }

   export interface MatchLineupResponse {
    errors:     any[];
    get:        string;
    response:   Lineup[];
    results:    number;
   }
   
   
   
   export interface Lineup {
    coach:       Coach;
    formation:   string;
    startXI:     Player[];
    substitutes: Player[];
    team:        Team;
   }
   
   export interface Coach {
    id:    number;
    name:  string;
    photo: string;
   }
   
   export interface Player {
    player: PlayerDetails;
   }
   
   export interface PlayerDetails {
    grid:   null | string;
    id:     number;
    name:   string;
    number: number;
    pos:    Pos;
   }
   
   export enum Pos {
    D = "D",
    F = "F",
    G = "G",
    M = "M",
   }
   
   export interface Team {
    colors: Colors;
    id:     number;
    logo:   string;
    name:   string;
   }
   
   export interface Colors {
    goalkeeper: ColorDetails;
    player:     ColorDetails;
   }
   
   export interface ColorDetails {
    border:  string;
    number:  string;
    primary: string;
   }
   
   export interface MatchEventResponse {
    errors:     any[];
    get:        string;
    paging:     Paging;
    parameters: Parameters;
    response:   MatchEventDetails[];
    results:    number;
   }
   
   
   export interface Parameters {
    fixture: string;
   }
   
   export interface MatchEventDetails {
    assist:   Assist;
    comments: null | string;
    detail:   string;
    player:   Assist;
    team:     EventTeam;
    time:     Time;
    type:     Type;
   }
   
   export interface Assist {
    id:   number | null;
    name: null | string;
   }
   
   export interface EventTeam {
    id:   number;
    logo: string;
    name: string;
   }
   export interface Time {
    elapsed: number;
    extra:   null;
   }
   
   export enum Type {
    Card = "Card",
    Goal = "Goal",
    Subst = "subst",
    Var ="Var"
   }


  export  interface LeagueStandingObject {
    get: string;
    parameters: Parameters;
    errors: any[];
    results: number;
    paging: Paging;
    response: LeagueStanding[];
  }
  
  export interface LeagueStanding {
    league: LeagueDetails;
  }
  
  export interface LeagueDetails {
    id: number;
    name: string;
    country: string;
    logo: string;
    flag: string;
    season: number;
    standings: Standing[][];
  }
  
export interface Standing {
    rank: number;
    team: Team;
    points: number;
    goalsDiff: number;
    all: All;
  }
  
export  interface All {
    played: number;
    win: number;
    draw: number;
    lose: number;
    goals: Goals;
  }
  
export  interface Goals {
    for: number;
    against: number;
  }
  
export  interface Team {
    id: number;
    name: string;
    logo: string;
  }

  export interface StatisticRootObject {
    get: string;
    parameters: Parameters;
    errors: any[];
    results: number;
    paging: Paging;
    response: StatisticResponse[];
  }
  
  export interface StatisticResponse {
    player: PlayerStatDetails;
    statistics: Statistic[];
  }
  
  export interface Statistic {
    team: TeamStat;
    league: League;
    games: Games;
    substitutes: Substitutes;
    shots: Shots;
    goals: Goals;
    passes: Passes;
    tackles: Tackles;
    duels: Duels;
    dribbles: Dribbles;
    fouls: Fouls;
    cards: Cards;
    penalty: Penalty;
  }
  
  export interface Penalty {
    won?: any;
    commited?: any;
    scored: number;
    missed: number;
    saved?: any;
  }
  
  export interface Cards {
    yellow: number;
    yellowred: number;
    red: number;
  }
  
  export interface Fouls {
    drawn: number;
    committed: number;
  }
  
  export interface Dribbles {
    attempts: number;
    success: number;
    past?: any;
  }
  
  export interface Duels {
    total: number;
    won: number;
  }
  
  export interface Tackles {
    total: number;
    blocks?: number;
    interceptions: number;
  }
  
  export interface Passes {
    total: number;
    key: number;
    accuracy: number;
  }
  
  export interface Goals {
    total: number;
    conceded: number;
    assists?: number;
    saves?: any;
  }
  
  export interface Shots {
    total: number;
    on: number;
  }
  
  export interface Substitutes {
    in: number;
    out: number;
    bench: number;
  }
  
  export interface Games {
    appearences: number;
    lineups: number;
    minutes: number;
    number?: any;
    position: string;
    rating: string;
    captain: boolean;
  }
  
  export interface League {
    id: number;
    name: string;
    country: string;
    logo: string;
    flag: string;
    season: number;
  }
  
  export interface TeamStat {
    id: number;
    name: string;
    logo: string;
  }
  
  export interface PlayerStatDetails {
    id: number;
    name: string;
    firstname: string;
    lastname: string;
    age: number;
    birth: Birth;
    nationality: string;
    height: string;
    weight: string;
    injured: boolean;
    photo: string;
  }
  
  export interface Birth {
    date: string;
    place: string;
    country: string;
  }
   