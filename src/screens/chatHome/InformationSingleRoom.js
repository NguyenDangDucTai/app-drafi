import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {styles} from "../../css/chatHome/InformationSingleRoom";
import {FontAwesome, Foundation, Octicons} from "@expo/vector-icons";
import { Feather } from '@expo/vector-icons';

function InformationSingleRoom({navigation}){
    return(
        <View style={styles.container}>

            {/*Title*/}
            <View style={styles.title}>
                <TouchableOpacity
                    style={{marginRight:15, justifyContent:'center'}}
                    onPress={()=>{navigation.goBack()}}
                >
                    <FontAwesome name="arrow-left"  size={30} color="white" />
                </TouchableOpacity>
                <View style={{justifyContent:'center'}}>
                    <Text style={{fontWeight:'bold', fontSize:20, color:'white'}}>
                        Setting
                    </Text>
                </View>
            </View>

            {/*Body*/}
            <ScrollView style={{flex:1}}>
                {/*Box 1*/}
                <View style={styles.box}>
                    <View style={{alignItems:'center'}}>
                        <Image
                            source={require('../../image/chatHome/doraemon.png')}
                            style={{width:100, height:100, borderRadius:100, marginBottom:10}}
                        />
                        <Text style={{fontWeight:'bold'}}>DORAEMON</Text>
                    </View>
                    <View style={{width:"100%", paddingTop:15, paddingHorizontal:10, flexDirection:'row', justifyContent:"space-between"}}>
                        {/*Search*/}
                        <TouchableOpacity
                            style={{alignItems:'center'}}
                            // onPress={}
                        >
                            <View style={styles.button}>
                                <Feather name="search" size={20} color="black" />
                            </View>
                            <View style={{alignItems:'center', marginTop:5}}>
                                <Text>Search</Text>
                                <Text>message</Text>
                            </View>
                        </TouchableOpacity>
                        {/*Personal page */}
                        <TouchableOpacity
                            style={{alignItems:'center'}}
                            // onPress={}
                        >
                            <View style={styles.button}>
                                <Feather name="user" size={20} color="black" />
                            </View>
                            <View style={{alignItems:'center', marginTop:5}}>
                                <Text>Personal</Text>
                                <Text>page</Text>
                            </View>
                        </TouchableOpacity>
                        {/*Change background*/}
                        <TouchableOpacity
                            style={{alignItems:'center'}}
                            // onPress={}
                        >
                            <View style={styles.button}>
                                <Foundation name="background-color" size={20} color="black" />
                            </View>
                            <View style={{alignItems:'center', marginTop:5}}>
                                <Text>Change</Text>
                                <Text>background</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{alignItems:'center'}}
                            // onPress={}
                        >
                            <View style={styles.button}>
                                <Octicons name="bell" size={20} color="black" />
                            </View>
                            <View style={{alignItems:'center', marginTop:5}}>
                                <Text>Turn off</Text>
                                <Text>notification</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>


            </ScrollView>

        </View>
    )
}

export default InformationSingleRoom;