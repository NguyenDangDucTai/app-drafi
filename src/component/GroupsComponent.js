import {Image, Text, TouchableOpacity, View} from "react-native";
import {styles} from "../css/component/GroupsComponent";
import {FontAwesome5, Ionicons} from "@expo/vector-icons";
import MessageBox from "./MessageBox";
import useListAllChats from "../api/useListAllChats";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";


function GroupsComponent({navigation}) {
    const user = useSelector((state) => state.userData);
    const userId = user.id;
    const { data: listChats } = useListAllChats();

    const [listGroups, setListGroups] = useState([]);


    console.log('LIST ALL GROUPS', listChats);

    useEffect(() => {
        if(listChats) {
            setListGroups(listChats.filter((item)=> Array.isArray(item.participants) && item.participants.includes(userId) && item.type === 'public'));
        }
    }, [listChats]);

    return(
        <View>
            <TouchableOpacity
                style={styles.createGroup}
                onPress={()=>{navigation.navigate("CreateNewGroup")}}
            >
                <FontAwesome5 name="user-friends" size={24} color="black" />
                <Text style={{ fontSize:18, marginLeft:10}}>
                    Create new group
                </Text>
            </TouchableOpacity>

            <View style={styles.listGroups}>
                <Text style={{fontWeight:'bold',fontSize:18, marginLeft:10, marginTop:10}}>
                    My groups
                </Text>

                {listGroups && listGroups.map((item) => {
                    let chatName = item.name;
                    let latestMessage = item?.messages && item?.messages?.length > 0 ? item.messages[item.messages.length - 1] : null;

                    console.log( item)
                    return(
                        <MessageBox
                            key={item.chatId}
                            item={{
                                id: item.chatId,
                                displayName: chatName,
                                image: item.picture,
                                content: latestMessage,
                                type: item.type,
                            }}
                            navigation={navigation}
                        />
                    )
                })}

            </View>
        </View>
    )
}

export default GroupsComponent;

