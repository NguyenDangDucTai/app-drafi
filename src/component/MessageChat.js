import {Button, Image, Modal, Text, TouchableOpacity, View} from "react-native";
import {styles} from "../css/component/MessageChat";
import {useState} from "react";
import {deleteMessage} from "../api/chatApi";
import {AntDesign, Feather, FontAwesome, MaterialCommunityIcons} from '@expo/vector-icons';
import moment from "moment-timezone";

function MessageChatReceiver({msg, chatId}) {

    const content = msg.content;
    const listcontent = content.split("|")
    listcontent.pop();


    return(
        <View style={styles.messageBoxReceiver}>
            <View>
                <Image
                    source={require("../image/chatHome/doraemon.png")}
                    style={{borderRadius:100, width:40, height:40}}
                />
            </View>
            <View style={{maxWidth:"70%"}}>
                {msg.type === "text" && (
                    <View style={styles.messageReceiver}>
                        <TextBox content={msg.content}/>
                    </View>
                )}
            </View>
            <View >
                {msg.type === "image" && (listcontent.map((item, index) => {
                    return(
                        <View style={styles.messageFile}>
                            <ImageChat content={item} msg={msg}/>
                        </View>
                    )
                }))}
            </View>
            <View style={{maxWidth:"70%"}}>
                {msg.type === "files" && (listcontent.map((item, index) => {
                        return(
                            <View style={styles.messageFile}>
                                <FileChat content={item} msg={msg}/>
                            </View>
                        )
                    })
                )}
            </View>

        </View>
    )
}

function MessageChatSender({msg, chatId}) {

    const [editMessage, setEditMessage] = useState(false);
    const messageId = msg.messageId;
    const [hiddenWhenDelete, setHiddenWhenDelete] = useState(true);

    const content = msg.content;
    const listcontent = content.split("|")
    listcontent.pop();
    const handleDeleteMessage = () =>{


        deleteMessage({chatId, messageId})
            .then(()=>{
                setHiddenWhenDelete(false)
                console.log("complete deleteMessage");
            })
            .catch((error) =>{
                console.error(error)
            })
    }
    const handleShareMessage =() =>{

    }
    const handleReplyMessage = () =>{
        x
    }



    return (
        <View>
            {hiddenWhenDelete && (
                <View style={{margin:10}}>
                    <TouchableOpacity
                        style={styles.messageBoxSender}
                        onPress={()=>{setEditMessage(!editMessage)}}
                    >
                        {msg.type === "text" && (
                            <View style={styles.messageSenderText}>
                                <TextBox content={msg.content}/>
                            </View>
                        )}
                        <View>
                            {msg.type === "image" && (listcontent.map((item, index) => {
                                return(
                                    <View style={styles.messageFile}>
                                        <ImageChat content={item} msg={msg}/>
                                    </View>
                                )
                            }))}
                        </View>
                        <View style={{maxWidth:"70%"}}>
                            {msg.type === "files" && (listcontent.map((item, index) => {
                                    return(
                                        <View style={styles.messageFile}>
                                            <FileChat content={item} msg={msg}/>
                                        </View>
                                    )
                                })
                            )}
                        </View>
                    </TouchableOpacity>
                    {editMessage && (
                        <View style={styles.editMessage}>
                            <TouchableOpacity
                                style={{marginHorizontal:5, marginLeft:5, borderRadius:5}}
                                onPress={handleDeleteMessage}
                            >
                                <Feather name="trash-2" size={15} color="red" />
                            </TouchableOpacity>
                            <TouchableOpacity style={{marginHorizontal:5, marginLeft:5, borderRadius:5}}>
                                <FontAwesome name="share" size={15} color="#33CCFF" />
                            </TouchableOpacity>
                            <TouchableOpacity style={{marginHorizontal:5, marginLeft:5, borderRadius:5}}>
                                <MaterialCommunityIcons name="comma" size={15} color="#33CCFF" />
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            )}
        </View>
    )
}


function TextBox({content}){
    return(
        <View>
            <Text>
                {content}
            </Text>

        </View>
    )
}

function ImageChat({content, msg}){

    return(
        <View>
            {content.length !== 0 &&(
                <Image
                    source={image}
                    style={{width:100, height:100}}
                />
            )}
        </View>
    )
}


function FileChat({content, msg}){
    return(
        <View style={{padding:10}}>
            {content.length !== 0 &&(
                <TouchableOpacity style={{}}>
                    <AntDesign name="filetext1" size={70} color="black" />
                    {/*<Text>{moment(msg.content.timestamp).format("HH:mm")}</Text>*/}
                </TouchableOpacity>
            )}
        </View>
    )
}

export {MessageChatSender, MessageChatReceiver};
