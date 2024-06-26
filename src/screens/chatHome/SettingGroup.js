import {Text, TouchableOpacity, View, Modal, Button, CheckBox} from "react-native";
import {styles} from "../../css/chatHome/SettingGroup";
import {Entypo, FontAwesome} from "@expo/vector-icons";
import {useEffect, useState} from "react";
import {firestore} from "../../../config/FirebaseConfig";
import QueryKey from "../../constants/QueryKey";
import {useQueryClient} from "@tanstack/react-query";
import {useSelector} from "react-redux";

function SettingGroup({navigation, route}){

    const [showModal, setShowModal] = useState(false);
    const { chatId } = route.params;
    const queryClient = useQueryClient();
    const user = useSelector((state) => state.userData);
    const userId = user.id;
    const [mangerId, setMangerId] = useState();
    const [settingGroup, setSettingGroup] = useState({
        allowSendMessage: true,
    });


    useEffect(() => {
        firestore.collection("Chats")
            .doc(chatId)
            .get()
            .then((snapshot) => {
                setMangerId(snapshot.data().managerId)
                setSettingGroup(snapshot.data()?.setting? snapshot.data().setting: {
                    allowSendMessage: true,
                })
            })
    }, [chatId]);

    const handleManageMember= () =>{

    }
    const handleTransferLeader = () =>{

    }
    const handlePerMissionToEdit = () =>{
        setShowModal(!showModal);
    }
    const handlePermissionToAdd = () =>{

    }

    const handlePermissionToSend = () =>{
        console.log("check click")
        setSettingGroup(pre => {
            const curr = pre.allowSendMessage;
            console.log(curr)
            return {
                ...settingGroup,
                allowSendMessage: !curr,

            }
        })
    }
    useEffect(() => {
        firestore.collection("Chats")
            .doc(chatId)
            .update("setting", settingGroup)
            .then((snapshot) => {
                console.log("Set permisson Send message thanh cong")
            })
            .catch((error) => {
                console.error('LỖI THÊM THÀNH VIÊN VÀO NHÓM', error);
            });
    }, [settingGroup]);


    const [showModalDisband, setShowModalDisband] = useState(false);
    const handleDisbandGroup = () =>{
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
    }



    return(
        <View>
            <View style={styles.container}>
                <View style={styles.title}>
                    <TouchableOpacity
                        style={{marginRight:15, justifyContent:'center'}}
                        onPress={()=>{navigation.goBack()}}
                    >
                        <FontAwesome name="arrow-left"  size={30} color="white" />
                    </TouchableOpacity>
                    <View style={{justifyContent:'center'}}>
                        <Text style={{fontWeight:'bold', fontSize:20, color:'white'}}>
                            Setting group
                        </Text>
                    </View>
                </View>
                <View style={{backgroundColor:'white', paddingTop:10}}>
                    <View>
                        <Text style={{fontWeight:"bold", color:'blue', fontSize:15, marginLeft:10}}>
                            Member
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={styles.viewTouchable}
                        onPress={handleManageMember}
                    >
                        <Text style={{fontSize:18, fontWeight:'bold'}}>
                            Manage member
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.viewTouchable}
                        onPress={handleTransferLeader}
                    >
                        <Text style={{fontSize:18, fontWeight:'bold'}}>
                            Transfer group leader authority
                        </Text>
                    </TouchableOpacity>

                </View>



                <View style={{backgroundColor:'white', paddingTop:10, marginTop:10}}>
                    <View>
                        <Text style={{fontWeight:"bold", color:'blue', fontSize:15, marginLeft:10}}>
                            Permision
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={styles.viewTouchable}
                        onPress={handlePerMissionToEdit}
                    >
                        <Text style={{fontSize:18, fontWeight:'bold'}}>
                            Permission to edit group information
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.viewTouchable}
                        onPress={handlePermissionToAdd}
                    >
                        <Text style={{fontSize:18, fontWeight:'bold'}}>
                            Permission to add members
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.viewTouchable}
                        onPress={handlePermissionToSend}
                    >
                        <Text style={{fontSize:18, fontWeight:'bold', flex:1}}>
                            Permission to send messages
                        </Text>
                        {settingGroup.allowSendMessage && (
                            <Entypo name="check" size={24} color="black" />
                        )}
                    </TouchableOpacity>

                </View>

                <TouchableOpacity

                    style={styles.disband}
                    onPress={handleDisbandGroup}
                >
                    <Text style={{fontSize:18, fontWeight:'bold', color:'red'}}>
                        Disband the group
                    </Text>
                </TouchableOpacity>
            </View>
            {/*<View style={{flex:1 }}></View>*/}
            <PermisonModal showModal={showModal} setShowModal={setShowModal}/>
            <DisbandTheGroup showModalDisband={showModalDisband} setShowModalDisband={setShowModalDisband}/>
        </View>
    )
}

function PermisonModal({showModal, setShowModal}) {
    return(
        <Modal visible={showModal} transparent={true} animationType="fade">
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <View style={{ backgroundColor: 'white', padding: 20 }}>
                    <Text>This is a popup</Text>
                    <Button title="Close" onPress={()=>{setShowModal(!showModal)}} />
                </View>
            </View>
        </Modal>
    )
}

function DisbandTheGroup({showModalDisband, setShowModalDisband}){
    const handleYes = () =>{



        setShowModalDisband(!showModalDisband)
    }
    const handleNo = () =>{



        setShowModalDisband(!showModalDisband)
    }


    return(
        <Modal  visible={showModalDisband} transparent={true} animationType="fade">
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <View style={{ backgroundColor: 'white', padding: 20 }}>
                    <Text style={{textAlign:'center', marginBottom:10}}>
                        Do you want to disband the group?
                    </Text>
                    <View style={{flexDirection:'row', justifyContent:'space-around'}}>
                        <TouchableOpacity
                            style={styles.btnYes}
                            onPress={handleYes}
                        >
                            <Text style={{fontWeight:'bold', color:"white"}}>YES</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.btnNo}
                            onPress={handleNo}
                        >
                            <Text style={{fontWeight:'bold', color:"white"}}>NO</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}



export default SettingGroup;