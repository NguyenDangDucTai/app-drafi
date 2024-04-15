import {CheckBox, Image, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import {styles} from "../../css/chatHome/CreateNewGroup";
import {Entypo, FontAwesome, FontAwesome5} from "@expo/vector-icons";
import {useEffect, useState} from "react";
import {dataFriends} from "../../dataDemo/DataDemo";
import useListParticipants from "../../api/useListParticipants";
import {useSelector} from "react-redux";
import useCreateGroupChat from "../../api/useCreateGroupChat";

function CreateNewGroup({navigation}){
    const user = useSelector((state) => state.userData);
    const userId = user.id;
    const { participants } = useListParticipants(userId);

    const createGroupChat = useCreateGroupChat();

    const [groupName, setGroupName] = useState("");
    const [viewButton, setViewButton] = useState(false);
    const [disableButtonCreate, setDisableButtonCreate] = useState(true)
    const [listAddInGroupId, setListAddInGroupId] = useState([]);


    console.log('PPPPP', participants);

    // const listFriend = {};
    useEffect(()=>{
        if(listAddInGroupId.length > 0 && !viewButton){
            setViewButton(!viewButton)
        } else {
            setViewButton(!viewButton)
        }
        if(listAddInGroupId.length >= 2){
            setDisableButtonCreate(false)
        } else {
            setDisableButtonCreate(true);
        }

    }, [listAddInGroupId]);

    const handleCreateGroup = () =>{
        const listMemberIds = {};
        for(const item of listAddInGroupId) {
            item.participants.forEach(participantId => {
                listMemberIds[participantId] = true;
            })
        }

        console.log(listMemberIds);
        console.log(Object.keys(listMemberIds));

        createGroupChat({
            groupName: groupName,
            participantIdList: Object.keys(listMemberIds),
            type: "public",
            picture: "https://firebasestorage.googleapis.com/v0/b/chatservice-d1f1c.appspot.com/o/avatars%2FavatarGroup.jpg?alt=media&token=cc85e7a4-6bbc-40d2-941c-313db77a2745",
            managerId: userId,
        });

        navigation.navigate("HomeChat")
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
                        Create new group
                    </Text>
                </View>
            </View>
            <View style={styles.dubbing}>
                <TouchableOpacity>
                    <Image
                        source={require('../../image/chatHome/group.jpg')}
                        style={{width:50, height:50, borderRadius:100}}
                    />

                </TouchableOpacity>
                <View style={{marginLeft:10, justifyContent:'center'}}>
                    <TextInput
                        placeholder={"Name the group"}
                        placeholderTextColor={"#CCCCCC"}
                        value={groupName}
                        onChangeText={setGroupName}
                        style={{outlineStyle:'none', fontSize:18, borderBottomWidth:1}}
                    />

                </View>
                <View style={{marginLeft:20, justifyContent:'center'}}>
                    {groupName !== "" &&(
                        <Entypo name="check" size={35} color="blue" />
                    )}
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
                {participants?(
                    participants.map((item)=>{
                        const chatId = item.chatId;
                        const participantIndex = item.participants.indexOf(userId);
                        const friendId = item.participants[participantIndex];
                        const friendName = item.name.split('/')[participantIndex];
                        const picture = item.picture;
                        const type = item.type;

                        const friendItem = {
                            id: chatId,
                            image: picture,
                            displayName: friendName,
                            userName: friendName,
                            participants: item.participants,
                        }
                        return(
                            type !== 'public' && <ListFriendView key={friendItem.id} item={friendItem} setListAddInGroupId={setListAddInGroupId}/>
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
                        onPress={handleCreateGroup}
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

    // const image = item.image.split("|")[0]


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

export default CreateNewGroup;