import { StyleSheet } from "react-native";

export default StyleSheet.create({
    screen_wrapper : {
        backgroundColor : 'black',
        height : "100%"
    },
    h1:{
        fontFamily : 'Poppins_700Bold',
        fontSize : 24,
        fontWeight : "700",
        color : 'white',
        marginBottom : 16
    },

    subtitle : {
        fontFamily : 'Poppins_500Medium',
        color : 'grey',
        fontWeight : '500',
        fontSize : 20
    },

    row :{
        flexDirection : 'row',
        alignItems : 'baseline',
        justifyContent : 'space-between'
    },

    modal_container :{
        flex: 1, 
        backgroundColor : 'rgba(0, 0, 0, 0.7)', 
        alignItems : 'center', 
        justifyContent : 'center' ,
    }
   
})