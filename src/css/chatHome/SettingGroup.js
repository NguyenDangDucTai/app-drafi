import {StyleSheet} from "react-native";


const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    title:{
        width:"100%",
        height:60,
        backgroundColor:"#33CCFF",
        flexDirection:'row',
        paddingHorizontal: 10,
        paddingVertical:5,

    },
    body:{
        flex:1,
    },
    viewTouchable:{
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:15,
        height:60,
        borderBottomWidth:1,
        borderColor:'#DDDDDD'
    },
    disband:{

        height:60,
        backgroundColor:'white',
        marginTop:10 ,
        justifyContent:'center',
        paddingHorizontal:15
    },
    btnYes:{
        width:50,
        backgroundColor:'#33CCFF',
        alignItems:'center',
        paddingVertical:5,
        borderRadius:5,
    },
    btnNo:{
        width:50,
        backgroundColor:'red',
        alignItems:'center',
        paddingVertical:5,
        borderRadius:5,
    }



})

export {styles};