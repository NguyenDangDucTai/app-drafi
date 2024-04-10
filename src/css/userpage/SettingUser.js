import {StyleSheet} from "react-native";


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title:{
        width:"100%",
        height:60,
        backgroundColor:"#33CCFF",
        flexDirection:'row',
        paddingHorizontal: 10,
        paddingVertical:5,

    },
    findView:{
        backgroundColor:'white',
        width:'100%',
        paddingHorizontal:5,
        paddingVertical:10,
        flexDirection:'row',
        marginHorizontal:5,

    },
    bodyView:{
        width:'100%',

    },
    button:{
        height:70,
        backgroundColor:'white',
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:20
    },
    buttonLogOut:{
        backgroundColor:'#DDDDDD',
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        paddingVertical:10,
        borderRadius:100
    }

})

export {styles};