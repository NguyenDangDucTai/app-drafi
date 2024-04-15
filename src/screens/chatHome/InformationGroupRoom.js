import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {styles} from "../../css/chatHome/InformationGroupRoom";
import {AntDesign, Entypo, Feather, FontAwesome, Foundation, Octicons} from "@expo/vector-icons";


function InformationGroupRoom({navigation}) {


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
                            onPress={()=>{navigation.navigate("AddMember")}}
                        >
                            <View style={styles.button}>
                                <Feather name="user-plus" size={20} color="black" />
                            </View>
                            <View style={{alignItems:'center', marginTop:5}}>
                                <Text>Add</Text>
                                <Text>member</Text>
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

                <View style={{flex:1, marginTop:15, backgroundColor:'white'}}>
                    <TouchableOpacity
                        style={styles.viewTouchable}
                        onPress={()=>{navigation.navigate("SeeMembers")}}
                    >
                        <FontAwesome name="group" size={25} color="black" />
                        <View style={styles.viewTitleTouchable}>
                            <Text style={{fontSize:18}}>
                                See members
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity

                        style={styles.viewTouchable}
                        onPress={()=>{navigation.navigate("SettingGroup")}}
                    >
                        <AntDesign name="setting" size={25} color="black" />
                        <View style={styles.viewTitleTouchable}>
                            <Text style={{fontSize:18}}>
                                Setting group
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.viewTouchable}>
                        <Feather name="trash" size={24} color="red" />
                        <View style={styles.viewTitleTouchable}>
                            <Text style={{fontSize:18, color:'red'}}>
                                Delete chats history
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.viewTouchable}>
                        <Entypo name="log-out" size={24} color="red" />
                        <View style={styles.viewTitleTouchable}>
                            <Text style={{fontSize:18, color:"red"}}>
                                Exitt group
                            </Text>
                        </View>
                    </TouchableOpacity>


                </View>


            </ScrollView>

        </View>
    )

}

export default InformationGroupRoom;