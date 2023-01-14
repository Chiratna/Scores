import { StyleSheet } from "react-native";

export default StyleSheet.create({
    card_background :{

        backgroundColor : 'rgba(255,255,255,0.09)',
        borderRadius : 24,
        paddingHorizontal : 16,
        paddingVertical : 8,
        alignItems : 'center'
    },
    date_style : {
        color : 'grey',
        fontFamily : 'Poppins_500Medium',
        fontWeight : '500',
        fontSize : 16,
        textAlign : 'center',
    },
    team_name :{fontFamily : 'Poppins_500Medium', fontWeight : '500', color : 'white', fontSize : 14, textAlign: "center", marginLeft : 8},
    scoreline : {fontFamily : 'Poppins_700Bold', color : 'white', fontSize : 24, fontWeight:'700', textAlign : 'center', marginLeft : 16},
    winner_team : {borderColor : '#2081C3' , borderWidth : 3, borderRadius : 99}
})