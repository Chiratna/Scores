import { StyleSheet } from "react-native";

export default StyleSheet.create({
    league_btn_container : {
        borderWidth : 1,
        borderColor : 'grey',
        padding : 10,
        minWidth : 100,
        alignItems : 'center',
        borderRadius : 999,
        marginHorizontal : 8,
        marginVertical : 16,
        fontFamily : 'Poppins_400Regular'
    },
    league_btn_text : {
        fontSize : 16,
        fontFamily : 'Poppins_400Regular',
        color : 'white',
    },
    active_league_btn_text : {
        fontWeight : '700',
        fontFamily : 'Poppins_700Bold'
    },
    active_league_btn :{
        backgroundColor : '#436AFA',
        borderColor : 'transparent',
        fontWeight : "700" 
    },
})