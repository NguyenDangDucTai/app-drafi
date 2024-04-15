import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {styles} from "../../css/chatHome/InformationGroupRoom";
import {AntDesign, Entypo, Feather, FontAwesome, Foundation, Octicons} from "@expo/vector-icons";
import {firestore} from "../../../config/FirebaseConfig";
import {useSelector} from "react-redux";
import QueryKey from "../../constants/QueryKey";
import {useQueryClient} from "@tanstack/react-query";
import {useEffect, useState} from "react";


function InformationGroupRoom({route, navigation}) {
    const { chatId } = route.params;
    const user = useSelector((state) => state.userData);
    const userId = user.id;
    const queryClient = useQueryClient();

    const [participants, setParticipants] = useState([]);
    const [mangerId, setMangerId] = useState();
    useEffect(() => {
        firestore.collection("Chats")
            .doc(chatId)
            .get()
            .then((snapshot) => {
                setParticipants(snapshot.data().participants);
                setMangerId(snapshot.data().managerId)
            })
    }, [chatId]);

    const handleExitGroup = () =>{

        if(mangerId === userId){
            firestore.collection("Chats")
                .doc(chatId)
                .delete()
                .then((snapshot) => {
                    queryClient.invalidateQueries({ queryKey: [QueryKey.LIST_ALL_CHATS] });
                    navigation.navigate("HomeChat")
                })
                .catch((error) => {
                    console.error('LỖI THÊM THÀNH VIÊN VÀO NHÓM', error);
                });
        } else {
            firestore.collection("Chats")
                .doc(chatId)
                .update("participants", [...participants.filter(user => user !== userId)])
                .then((snapshot) => {
                    queryClient.invalidateQueries({ queryKey: [QueryKey.LIST_ALL_CHATS] });
                    navigation.navigate("HomeChat")
                })
                .catch((error) => {
                    console.error('LỖI THÊM THÀNH VIÊN VÀO NHÓM', error);
                });
        }
    }
    const handleSettingGroup =()=>{
        navigation.navigate("SettingGroup",{chatId})
    }

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
                            onPress={()=>{navigation.navigate("AddMember", {
                                chatId: chatId
                            })}}
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
                        onPress={()=>{navigation.navigate("SeeMembers", {
                            chatId: chatId
                        })}}
                    >
                        <FontAwesome name="group" size={25} color="black" />
                        <View style={styles.viewTitleTouchable}>
                            <Text style={{fontSize:18}}>
                                See members
                            </Text>
                        </View>
                    </TouchableOpacity>
                    {mangerId === userId &&(
                        <TouchableOpacity

                            style={styles.viewTouchable}
                            onPress={handleSettingGroup}
                        >
                            <AntDesign name="setting" size={25} color="black" />
                            <View style={styles.viewTitleTouchable}>
                                <Text style={{fontSize:18}}>
                                    Setting group
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity style={styles.viewTouchable}>
                        <Feather name="trash" size={24} color="red" />
                        <View style={styles.viewTitleTouchable}>
                            <Text style={{fontSize:18, color:'red'}}>
                                Delete chats history
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.viewTouchable}
                        onPress={handleExitGroup}
                    >
                        <Entypo name="log-out" size={24} color="red" />
                        <View style={styles.viewTitleTouchable}>
                            <Text style={{fontSize:18, color:"red"}}>
                                Exit group
                            </Text>
                        </View>
                    </TouchableOpacity>


                </View>


            </ScrollView>

        </View>
    )

}

export default InformationGroupRoom;