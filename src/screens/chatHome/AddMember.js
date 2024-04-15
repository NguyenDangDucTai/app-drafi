import {Image, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import {styles} from "../../css/chatHome/AddMember";
import {Entypo, FontAwesome} from "@expo/vector-icons";
import {useSelector} from "react-redux";
import useListParticipants from "../../api/useListParticipants";
import {useEffect, useState} from "react";
import useListAllFriends from "../../api/useListAllFriends";
import {firestore} from "../../../config/FirebaseConfig";



function AddMember({route, navigation}){
    const user = useSelector((state) => state.userData);
    const userId = user.id;
    const { chatId } = route.params;

    console.log('userId', userId);
    const [friendList, setFriendList] = useState([]);
    const [participants, setParticipants] = useState([]);

    const [viewButton, setViewButton] = useState(false);
    const [disableButtonCreate, setDisableButtonCreate] = useState(true)
    const [listAddInGroupId, setListAddInGroupId] = useState([]);

    useEffect(() => {
        firestore.collection("Users")
            .doc(userId)
            .get()
            .then((snapshot) => {
                setFriendList(snapshot.data().friends);
            });
    }, [userId]);

    useEffect(() => {
        firestore.collection("Chats")
            .doc(chatId)
            .get()
            .then((snapshot) => {
                setParticipants(snapshot.data().participants);
            })
    }, [chatId]);

    // const listFriend = {};
    useEffect(()=>{
        if(listAddInGroupId.length > 0 && !viewButton){
            setViewButton(!viewButton)
        } else {
            setViewButton(!viewButton)
        }
        if(listAddInGroupId.length >= 1) {
            setDisableButtonCreate(false)
        } else {
            setDisableButtonCreate(true);
        }

        console.log('LIST ADD IN GROUP ID', listAddInGroupId);
    }, [listAddInGroupId]);

    const handleAddMemberToGroup = () =>{
        firestore.collection("Chats")
            .doc(chatId)
            .update("participants", [...participants, ...listAddInGroupId.map(item => item.id)])
            .then((snapshot) => {
                console.log('THÊM THÀNH VIÊN VÀO NHÓM THÀNH CÔNG')
                navigation.goBack()
            })
            .catch((error) => {
                console.error('LỖI THÊM THÀNH VIÊN VÀO NHÓM', error);
            });
    }

    return(
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
                        Add member
                    </Text>
                </View>
            </View>
            <View style={styles.findView}>
                <FontAwesome
                    style={{marginHorizontal:10}}
                    name="search" size={28} color="#AAAAAA"
                />
                <View style={{flex:1}}>
                    <TextInput
                        placeholder={"Enter display name or phone number"}
                        placeholderTextColor={"#AAAAAA"}
                        style={{fontSize:15, marginRight:10, outlineStyle:"none"}}
                    />
                </View>
            </View>

            <View style={styles.listFriendView}>
                {friendList ?(
                    friendList.map((item)=>{
                        const friendId = item.id;
                        const friendName = item.displayName;
                        const friendAvatar = item.profilePicture;

                        const friendItem = {
                            id: friendId,
                            image: friendAvatar,
                            displayName: friendName,
                            userName: friendName,
                        }
                        return(
                            !participants.includes(friendId) && <ListFriendView key={friendItem.id} item={friendItem} setListAddInGroupId={setListAddInGroupId}/>
                        )
                    })
                ):(
                    <NoFriendView/>
                )}
            </View>

            {listAddInGroupId.length > 0 &&(
                <View style={styles.buttonCreateView}>
                    <ScrollView
                        style={{flex:1, marginRight:15}}
                        horizontal={true}
                    >
                        {listAddInGroupId.map((item, i)=>{
                            return(
                                <Image
                                    key={i}
                                    source={item.image}
                                    style={{width:50, height:50, marginRight: 5, borderRadius:100}}
                                />
                            )
                        })}
                    </ScrollView>
                    <TouchableOpacity
                        onPress={handleAddMemberToGroup}
                        disabled={disableButtonCreate}
                    >
                        <FontAwesome name="arrow-circle-right" size={50} color="#33CCFF" />
                    </TouchableOpacity>
                </View>

            )}

        </View>
    )
}


function ListFriendView({item, setListAddInGroupId}){
    const [changeCheckbox, setChangeCheckbox] = useState(false);

    const handleSelectCheckbox = () =>{
        setChangeCheckbox(!changeCheckbox)
        if(!changeCheckbox){
            setListAddInGroupId(pre => {
                const list = [...pre];
                list.push(item);
                return list;
            })
        } else {
            setListAddInGroupId(pre => {
                const list = [...pre];
                const findItemRemove = list.find(item=>item.id === item.id);
                if(findItemRemove !== -1){
                    list.splice(findItemRemove, 1);
                }
                return list;
            })
        }
    }

    return(
        <View style={styles.boxFriend}>
            <Image
                source={item.image}
                style={{width:50, height:50, borderRadius:100}}
            />
            <View style={{flex:1, marginLeft:10, justifyContent:'center'}}>
                <Text style={{fontSize:20, fontWeight:'bold'}}>
                    {item.displayName}
                </Text>
            </View>
            <View style={{justifyContent:'center', marginRight:10}}>
                <TouchableOpacity
                    style={[styles.checkbox, changeCheckbox && styles.selectCheckbox]}
                    onPress={handleSelectCheckbox}
                >
                    {changeCheckbox &&(
                        <Entypo name="check" size={15} color="white" />
                    )}
                </TouchableOpacity>
            </View>
        </View>
    )
}

function NoFriendView(){
    return(
        <View style={{alignItems:'center', paddingTop:20}}>
            <Image
                source={require("../../image/chatHome/listFriend.png")}
                style={{width:200, height:200}}
            />
            <Text>You have no friends</Text>
        </View>
    )
}






export default AddMember;


