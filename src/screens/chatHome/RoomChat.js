import {Dimensions, FlatList, Image, Linking, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import styles from "../../css/chatHome/RoomChat";
import {AntDesign, FontAwesome, MaterialCommunityIcons} from '@expo/vector-icons';
import {useEffect, useRef, useState} from "react";
import { Ionicons, Entypo } from '@expo/vector-icons';
import {MessageChatSender, MessageChatReceiver} from "../../component/MessageChat";
import useListAllMessages from "../../api/useListAllMessages";
import { useSendMessage } from "../../api/useSendMessage";
import MessageType from "../../constants/MessageType";
import { v4 as uuidv4 } from 'uuid';
import {EmojiKeyboard} from "rn-emoji-keyboard";
import {useDispatch, useSelector} from "react-redux";
import {firestore} from "../../../config/FirebaseConfig";



//Xử lý button gọi điện thoại
const handleCallPhone= () =>{

}

//xử lý button gọi video call
const handleCallVideo= () =>{

}


const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;


// const listImageSelect = [];
//xử lý button mở setting room

function RoomChat({ route, navigation}) {
    // const chatId = "5c092444-8fc8-4d46-9698-8bfbc5ffae5a"
    // const roomName = "hagha";
    // const userId = "1890e10d-33c3-40d8-bac6-fcd81ed4ce42"
    // const displayName = "Pham Hoc Gioi";
    // const type = "public"


    const { chatId, roomName, type} = route.params;
    console.log('PARAMS', route.params);
    console.log(type)


    //lấy my user từ redux
    const user = useSelector((state) => state.userData);
    const userId = user.id;
    const displayName = user.display_name;

    console.log('UUUUU', user);

    const { messages, isLoadingAllMessage } = useListAllMessages(chatId);
    const [message, setMessage] = useState('');

    const sendMessage = useSendMessage(chatId);

    console.log('ALL MESSAGES', messages);

    const handleSendMessage = () =>{
        console.log('Send message: ', message);
        sendMessage({
            chatId: chatId,
            messageId: uuidv4(),
            senderId: userId,
            senderName: displayName,
            senderPicture: 'https://vn.portal-pokemon.com/play/resources/pokedex/img/pm/5794f0251b1180998d72d1f8568239620ff5279c.png',
            type: MessageType.TEXT,
            content: message,
            timestamp: Date.now()
        });
        setMessage("");
    }

    //Xu ly image
    function importAllImage(r) {
        const images = {};
        r.keys().forEach((key) => (images[key] = r(key)));
        return images;
    }
    const imagesList = importAllImage(
        require.context("../../image/fileChat/image", false, /\.(png|jpe?g|svg)$/)
    );

    console.log(imagesList);

    const [openImage, setOpenImage] = useState(false);
    const handleOpenImage = async () =>{
        setOpenImage(!openImage)
        setopenEmoji(false)
        setOpenFile(false)
        setListImageSelect([]);
    }

    const [listImageSelect, setListImageSelect] = useState([]);
    const [viewSendImage, setViewSendImage] = useState(false);
    useEffect(() => {
        if(listImageSelect.length > 0){
            setViewSendImage(true)
        } else{
            setViewSendImage(false)
        }
    }, [listImageSelect]);



    // xu ly emoji
    const [openEmoji, setopenEmoji] = useState(false);
    const handleOpenEmoji = async () =>{
        setopenEmoji(!openEmoji)
        setOpenImage(false)
        setOpenFile(false)
    }
    const selectEmoji = item =>{

        setMessage((prevMessage) => prevMessage + item.emoji);
    }


    //xu ly file
    function importAllFile(r) {
        return r.keys().map((fileName) => ({
            name: fileName,
            file: r(fileName),
        }));
    }


    const fileList = importAllFile(
        require.context("../../image/fileChat/file", false, /.*$/)
    );
    console.log(fileList)



    const [listSelectFile, setListSelectFile] = useState([]);
    const [openFile, setOpenFile] = useState(false);
    const [viewSendFile, setViewSendFile] = useState(false);
    const handleOpenFile = () =>{
        setOpenFile(!openFile)
        setOpenImage(false)
        setopenEmoji(false)
        setViewSendImage(false)
        setListSelectFile([])
    }
    useEffect(() => {
        if(listSelectFile.length > 0){
            setViewSendFile(true)
        } else{
            setViewSendFile(false)
        }
    }, [listSelectFile]);

    const handleSendFile = () =>{

    }

    const handleChangeInfomation=()=>{
        if(type==="private"){
            navigation.navigate("InformationSingleRoom", {
                chatId
            })
        } if(type ==="public"){
            navigation.navigate("InformationGroupRoom", {chatId})
        }
        //
    }


    return(
        <View style={styles.container}>
            {/*Tilte Box*/}
            <View style={styles.title}>
                <TouchableOpacity
                    style={{marginRight:15, justifyContent:'center'}}
                    onPress={()=>{navigation.goBack()}}
                >
                    <FontAwesome name="arrow-left"  size={30} color="white" />
                </TouchableOpacity>
                <View style={styles.bodyTitle}>
                    <Text style={{fontSize:18, fontWeight:"bold", color:'white'}}>
                        {roomName}
                    </Text>
                    <Text style={{fontSize:12, color:'#DDDDDD'}}>
                        Đang hoạt động
                    </Text>
                </View>
                <View style={{flex:1, flexDirection:"row-reverse", alignItems:'center', justifyContent:'space-between'}}>
                    <TouchableOpacity
                        style={{flex:1}}
                        onPress={handleChangeInfomation}
                    >
                        <Entypo name="menu" size={35} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{flex:1}}
                        onPress={handleCallVideo}
                    >
                        <Ionicons name="videocam-outline" size={35} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{flex:1}}
                        onPress={handleCallPhone}
                    >
                        <Ionicons name="call-outline" size={30} color="white" />
                    </TouchableOpacity>

                </View>
            </View>

            {/*Chat Box*/}
            <ScrollView style={styles.bodyChat}>
                {messages && messages?.length > 0 && messages.map((item)=>(
                    <View key={item.messageId}>
                        {item.senderId === userId ?(
                            <MessageChatSender msg={item} chatId={chatId}/>
                        ) : (
                            <MessageChatReceiver msg={item} chatId={chatId}/>
                        )}
                    </View>
                ))}

            </ScrollView>



            {/*Sender input*/}
            <View style={styles.textInputChat}>
                <TouchableOpacity
                    style={{marginRight:10}}
                    onPress={handleOpenEmoji}
                >
                    <Entypo name="emoji-happy" size={24} color="black" />
                </TouchableOpacity>
                <View style={{flex:1, marginRight:10, marginVertical:10}}>
                    <TextInput
                        style={{fontSize:18}}
                        value={message}
                        numberOfLines={2}
                        multiline={true}
                        onChangeText={setMessage}
                        onFocus={()=>{
                            setopenEmoji(false);
                            setOpenImage(false);
                        }}
                    />
                </View>
                <TouchableOpacity
                    onPress={handleOpenFile}
                    style={[styles.sendImage]}
                >
                    <MaterialCommunityIcons name="paperclip" size={25} color="black" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.sendImage}
                    onPress={handleOpenImage}
                >
                    <Ionicons name="image-outline" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleSendMessage}
                    style={[styles.sendMessage]}
                >
                    <Ionicons name="send" size={24} color="black" />
                </TouchableOpacity>

            </View>

            {openEmoji && (
                <View style={{height:200}}>
                    <ScrollView>
                        <EmojiKeyboard onEmojiSelected={selectEmoji}/>
                    </ScrollView>
                </View>
            )}

            {openImage &&(
                <View style={{height:HEIGHT/3}}>
                    <ScrollView style={{flex:1}}>
                        <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                            {Object.entries(imagesList).map(([key, item]) => {
                                return(
                                    <ImageView item={item} key={key} setListImageSelect={setListImageSelect}/>
                                )
                            })}
                        </View>
                    </ScrollView>
                    {viewSendImage && (
                        <View style={{position:'absolute', bottom:10, alignItems:'center', width:"100%"}}>
                            <TouchableOpacity style={styles.btnSendImage}>
                                <Text style={{fontSize:20, fontWeight:'bold', color:'white'}}>
                                    Send image {listImageSelect.length}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            )}

            {openFile && (
                <View style={{height:HEIGHT/3}}>
                    <ScrollView style={{flex:1}}>
                        <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                            {Object.entries(fileList).map(([key, item]) => {
                                return(
                                    <FileView item={item} key={key} setListSelectFile={setListSelectFile}/>
                                )
                            })}
                        </View>
                    </ScrollView>
                    {viewSendFile && (
                        <View style={{position:'absolute', bottom:10, alignItems:'center', width:"100%"}}>
                            <TouchableOpacity
                                onPress={handleSendFile}
                                style={styles.btnSendImage}
                            >
                                <Text style={{fontSize:20, fontWeight:'bold', color:'white'}}>
                                    Send image {listSelectFile.length}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            )}





        </View>
    )
}


function ImageView({key, item, setListImageSelect}){
    const [selectImage, setSelectImage] = useState(false);
    const handleSelectImage = () =>{
        setSelectImage(!selectImage)

        if(!selectImage){
            setListImageSelect(pre => {
                const list = [...pre];
                list.push(item);
                return list;
            });
        } else{
            setListImageSelect(pre => {
                const list = [...pre];
                const findItemRemove = list.find(item=>item === item);
                if(findItemRemove !== -1){
                    list.splice(findItemRemove, 1);
                }
                return list;
            })
        }
    }

    return(
        <TouchableOpacity
            onPress={handleSelectImage}
        >
            <Image key={key} source={{ uri: item }} style={{width:WIDTH/3, height:WIDTH/3}}/>
            <View style={styles.checkImage}>
                {selectImage && (
                    <View style={{backgroundColor:"rgba(51, 204, 255, 0.5)", flex:1, borderRadius:100}}>
                        <Entypo name="check" size={20} color="white" />
                    </View>
                )}
            </View>
        </TouchableOpacity>
    )
}

function FileView({key, item, setListSelectFile }){

    const [checkFileSelect, setCheckFileSelect] = useState(false)
    const handleCheckFile = () =>{
        setCheckFileSelect(!checkFileSelect)

        if(!checkFileSelect){
            setListSelectFile(pre => {
                const list = [...pre];
                list.push(item);
                return list;
            });
        } else{
            setListSelectFile(pre => {
                const list = [...pre];
                const findItemRemove = list.find(item=>item === item);
                if(findItemRemove !== -1){
                    list.splice(findItemRemove, 1);
                }
                return list;
            })
        }
    }

    return(
        <TouchableOpacity
            style={styles.fileView}
            onPress={handleCheckFile}
        >
            <AntDesign name="filetext1" size={24} color="black" />
            <Text style={{flex:1}}>{item.name.split("/")[1]}</Text>
            <View style={styles.checkFile}>
                {checkFileSelect &&(
                    <View style={{backgroundColor:"#33CCFF", borderRadius:100, flex:1, alignItems:'center',justifyContent:"center"}}>
                        <Entypo name="check" size={15} color="white" />
                    </View>
                )}
            </View>
        </TouchableOpacity>
    )
}





export default RoomChat;
