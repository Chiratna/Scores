import { Text, View } from "react-native"
import styles from "./style"
import Ionicons from '@expo/vector-icons/Ionicons';
interface AppBarProps{
    title : string,
}

const AppBar = ({title}:AppBarProps) =>{
    return <View style={styles.appbar}>
        <Ionicons name="chevron-back" size={24} color="white" />
        <View style={{flexDirection : 'row', justifyContent : 'center', width : '100%', marginRight : 24}}>
        <Text style={styles.appbar_text}>{title}</Text>
        </View>
    </View>
}

export default AppBar