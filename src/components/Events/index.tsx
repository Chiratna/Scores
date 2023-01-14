import { View, Text, Image } from "react-native";
import React from "react";
import { useGetMatchEvents } from "../../hooks/queries";
import { MatchEventDetails, MatchEventResponse, Type } from "../../utils/types";
import { AntDesign } from "@expo/vector-icons";
interface MatchEventProps {
  fixtureId: string;
  events : MatchEventResponse | undefined
}

interface CardProp {
  event: MatchEventDetails;
}

const SubstitutionCard = ({ event }: CardProp) => {
  return (
    <View
      style={{
        backgroundColor: "black",
        width: "100%",
        borderRadius: 16,
        padding: 6,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#D8D9CF",
            padding: 6,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 100,
          }}
        >
          <AntDesign name="arrowup" size={18} color="red" />
          <AntDesign name="arrowdown" size={18} color="green" />
        </View>
        <Text
          style={{
            padding: 6,
            fontFamily: "Poppins_600SemiBold",
            fontSize: 16,
            color: "white",
            flexGrow: 1,
          }}
        >
          {event.detail.toUpperCase()}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginLeft: 8,
        }}
      >
        <View>
          <Text
            style={{
              color: "green",
              fontFamily: "Poppins_600SemiBold",
              fontSize: 18,
              marginVertical: 6,
            }}
          >
            IN
          </Text>
          <Text
            style={{
              color: "white",
              fontFamily: "Poppins_400Regular",
              fontSize: 16,
              marginVertical: 4,
            }}
          >
            {event.assist.name}
          </Text>
          <Text
            style={{
              color: "red",
              fontFamily: "Poppins_600SemiBold",
              fontSize: 18,
              marginVertical: 6,
            }}
          >
            OUT
          </Text>
          <Text
            style={{
              color: "white",
              fontFamily: "Poppins_400Regular",
              fontSize: 16,
              marginVertical: 4,
            }}
          >
            {event.player.name}
          </Text>
        </View>
        <Image
          source={{ uri: event.team.logo }}
          style={{ height: 60, width: 60, marginRight: 16 }}
        />
      </View>
    </View>
  );
};

const FoulCard = ({ event }: CardProp) => {
  const textColor: string =
    event.detail === "Yellow Card" ? "#F7A76C" : "#DD5353";
  return (
    <View
      style={{
        backgroundColor: "black",
        width: "100%",
        borderRadius: 16,
        padding: 8,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          padding: 8,
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: event.detail === "Yellow Card" ? "yellow" : "red",
            width: 20,
            height: 32,
            borderRadius: 6,
          }}
        ></View>
        <Text
          style={{
            fontFamily: "Poppins_600SemiBold",
            fontSize: 16,
            marginLeft: 16,
            color: textColor,
          }}
        >
          {event.detail}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text
            style={{
              fontFamily: "Poppins_400Regular",
              fontSize: 16,
              color: "white",
              marginVertical: 4,
            }}
          >
            {event.team.name}
          </Text>
          <Text
            style={{
              fontFamily: "Poppins_600SemiBold",
              fontSize: 16,
              color: textColor,
              marginVertical: 4,
            }}
          >
            {event.player.name}
          </Text>
        </View>
        <Image
          source={{ uri: event.team.logo }}
          style={{ height: 50, width: 50 }}
        />
      </View>
    </View>
  );
};

const GoalCard = ({ event }: CardProp) => {
  return (
    <View
      style={{
        backgroundColor: "#D8E9A8",
        width: "100%",
        borderRadius: 16,
        padding: 8,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          padding: 8,
          alignItems: "center",
        }}
      >
        <View style={{ backgroundColor: "white", borderRadius: 100 }}>
          <Image
            source={{
              uri: "https://mkjsports.com/wp-content/uploads/2022/09/football.png",
            }}
            style={{ height: 20, width: 20 }}
          />
        </View>
        <Text
          style={{
            fontFamily: "Poppins_600SemiBold",
            fontSize: 16,
            marginLeft: 16,
            color: "black",
          }}
        >
          {event.detail}
        </Text>
      </View>
      <View style={{marginLeft : 8, flexDirection: 'row', alignItems : 'center', justifyContent:'space-between'}}>
        <View>
        <Text style={{color : '#1E5128', fontFamily : 'Poppins_500Medium', fontSize : 16, marginVertical:2}}>Scored By</Text>
        <Text style={{color : 'black', fontFamily : 'Poppins_500Medium', fontSize : 16, marginVertical:2}}>{event.player.name}</Text>
        {
            event.assist.name && (
                <View>
                     <Text style={{color : '#1E5128', fontFamily : 'Poppins_500Medium', fontSize : 16, marginVertical:2}}>Assited by</Text>
                     <Text style={{color : 'black', fontFamily : 'Poppins_500Medium', fontSize : 16, marginVertical:2}}>{event.assist.name}</Text>
                 </View>
            )
        }
        </View>
        <Image
          source={{ uri: event.team.logo }}
          style={{ height: 50, width: 50 }}
        />
      </View>
    </View>
  );
};


const VarCard = ({event} : CardProp) =>{
    return <View
    style={{
      backgroundColor: "black",
      width: "100%",
      borderRadius: 16,
      padding: 8,
    }}
  >
    <View
      style={{
        flexDirection: "row",
        width: "100%",
        padding: 8,
        alignItems: "center",
      }}
    >
      <View style={{ backgroundColor: "white", padding:4}}>
        <Text style={{fontFamily : 'Poppins_700Bold', fontSize:14}}>VAR</Text>
      </View>
      <Text
        style={{
          fontFamily: "Poppins_600SemiBold",
          fontSize: 16,
          marginLeft: 16,
          color: "white",
        }}
      >
        {event.detail}
      </Text>
    </View>
    <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text
            style={{
              fontFamily: "Poppins_400Regular",
              fontSize: 16,
              color: "white",
              marginVertical: 4,
            }}
          >
            {event.team.name}
          </Text>
          <Text
            style={{
              fontFamily: "Poppins_600SemiBold",
              fontSize: 16,
              color: '#C74B50',
              marginVertical: 4,
            }}
          >
            {event.player.name}
          </Text>
        </View>
        <Image
          source={{ uri: event.team.logo }}
          style={{ height: 50, width: 50 }}
        />
      </View>
  </View>
}

export default function MatchEvent({ fixtureId, events }: MatchEventProps) {
  // const { data: events, isLoading } = useGetMatchEvents(Number(fixtureId));




  return (
    <View
      style={{
        width: "100%",
        paddingLeft: 24,
        flexDirection: "column-reverse",
      }}
    >
      {events?.response.map((event, index) => {
        return (
          <View
            key={index}
            style={{
              flexDirection: "row",
              width: "100%",
              position: "relative",
            }}
          >
            <View style={{ width: 2, backgroundColor: "grey" }}></View>
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 100,
                backgroundColor: "white",
                position: "absolute",
                top: "35%",
                left: -20,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontFamily: "Poppins_600SemiBold", fontSize: 16 }}>
                {event.time.elapsed}'
              </Text>
            </View>
            <View style={{ marginLeft: 24, marginVertical: 16, flexGrow: 1 }}>
              {event.type === Type.Card && <FoulCard event={event} />}
              {event.type === Type.Subst && <SubstitutionCard event={event} />}
              {event.type === Type.Goal && <GoalCard event={event} />}
              {event.type === Type.Var && <VarCard event={event} />}
            </View>
          </View>
        );
      })}
    </View>
  );
}
