import { ScrollView, TextInput, TouchableOpacity, View} from "react-native";
import styles from "../../css/chatHome/HomeChat";
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import {listMessage} from "../../dataDemo/DataDemo";
import {useEffect, useState} from "react";
import MessageBox from "../../component/MessageBox";
import useGetUserInfo from "../../api/useGetUserInfo";
import {useSelector} from "react-redux";
import useListAllChats from "../../api/useListAllChats";

function HomeChat({navigation}) {
    const user = useSelector((state) => state.userData);
    console.log(user)

    const userId = user.id;

    const { userInfo, isLoading: isLoadingUserInfo } = useGetUserInfo(userId);
    const { data: chats } = useListAllChats();

    const [participants, setParticipants] = useState([]);

    console.log('USER INFO', userInfo);
    console.log(listMessage)
    console.log('LIST ALL PARTICIPANTS', chats);

    useEffect(() => {
        if(chats) {
            setParticipants(chats.filter((item)=> Array.isArray(item.participants) && item.participants.includes(userId)));
        }
    }, [chats]);

    return(
        <View style={styles.container}>
            <View style={styles.findChat}>
                <FontAwesome name="search" size={24} color="white" />
                <TextInput style={styles.findChatInput} placeholder={"Search"} placeholderTextColor={"#EEEEEE"}/>
                <TouchableOpacity style={styles.plusButton}>
                    <AntDesign name="pluscircleo" size={25} color="white" />
                </TouchableOpacity>
            </View>
            <View style={styles.body}>
                <ScrollView>
                    {participants && participants.map((item) => {
                        let chatName;
                        const type = item.type;
                        if(type === 'public') {
                            chatName = item.name;
                        } else {
                            const indexParticipant = item.participants.indexOf(userId);
                            chatName = item.name.split('/')[indexParticipant];
                        }
                        let latestMessage = item?.messages && item?.messages?.length > 0 ? item.messages[item.messages.length - 1] : null;

                        console.log('LATEST MESSAGE', latestMessage);

                        return (
                            <MessageBox
                                item={{
                                    id: item.chatId,
                                    displayName: chatName,
                                    image: item.picture,
                                    content: latestMessage,
                                    type: item.type,

                                }}
                                navigation={navigation}
                                key={item.chatId}
                            />
                        )
                    })}
                </ScrollView>
            </View>
        </View>
    )
}



export default HomeChat;