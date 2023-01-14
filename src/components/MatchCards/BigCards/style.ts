import { StyleSheet } from "react-native";

export default StyleSheet.create({
    card_background :{

        backgroundColor : 'rgba(255,255,255,0.09)',
        borderRadius : 24,
        paddingHorizontal : 16,
        paddingVertical : 20,
        alignItems : 'center'
    },
    stadium_name : {
        color : '#EBB434',
        fontFamily : 'Poppins_700Bold',
        fontWeight : '700',
        fontSize : 16,
        textAlign : 'center'
    },
    team_name :{fontFamily : 'Poppins_400Regular', fontWeight : '600', color : 'white', fontSize : 16, marginTop: 12, textAlign: "center"},
    match_type : {fontFamily : 'Poppins_400Regular', color : '#12A34C', fontSize : 16,},
    match_time : {fontFamily : 'Poppins_700Bold', color : 'white', fontSize : 16, fontWeight:'700'},
    vs_text : {fontFamily : 'Poppins_700Bold', color : '#EBB434', fontSize : 18, fontWeight:'700'},
    date_style : {
        color : 'grey',
        fontFamily : 'Poppins_500Medium',
        fontWeight : '500',
        fontSize : 16,
        textAlign : 'center',
    },
})