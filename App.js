import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeLogin from './src/screens/login/HomeLogin';
import Login from "./src/screens/login/Login";
import Register from "./src/screens/login/Register";
import ForgotPassword from "./src/screens/login/ForgotPassword";
import SuccessRegister from './src/screens/login/SuccessRegister';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import PhoneBook from "./src/screens/chatHome/PhoneBook";
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import HomeChat from "./src/screens/chatHome/HomeChat";
import RoomChat from "./src/screens/chatHome/RoomChat";
import MyUser from "./src/screens/chatHome/MyUser";
import FriendRequest from "./src/screens/chatHome/FriendRequest";
import PersonalPage from "./src/screens/userpage/PersonalPage";
import FindUser from "./src/screens/userpage/FindUser";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import SettingUser from "./src/screens/userpage/SettingUser";
import ChangePassword from "./src/screens/userpage/ChangePassword";
import {Provider, useSelector} from "react-redux";
import store from "./src/redux/store";
import CreateNewGroup from "./src/screens/chatHome/CreateNewGroup";
import MainApp from "./MainApp";
import InformationSingleRoom from "./src/screens/chatHome/InformationSingleRoom";
import InformationGroupRoom from "./src/screens/chatHome/InformationGroupRoom";
import SeeMembers from "./src/screens/chatHome/SeeMembers";
import AddMember from "./src/screens/chatHome/AddMember";
import SettingGroup from "./src/screens/chatHome/SettingGroup";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const queryClient = new QueryClient();

export default function App() {
    return (
      <QueryClientProvider client={queryClient}>
          <Provider store={store}>
              <NavigationContainer>
                  <Stack.Navigator initialRouteName={"RoomChat"}>
                      <Stack.Screen name='HomeLogin' component={HomeLogin} options={{ headerShown: false, }} />
                      <Stack.Screen name='Login' component={Login} />
                      <Stack.Screen name='Register' component={Register} />
                      <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
                      <Stack.Screen name="SuccessRegister" component={SuccessRegister} options={{ headerShown: false, }} />
                      <Stack.Screen name="HomeChat" component={MyTabs} options={{ headerShown: false, }}/>
                      <Stack.Screen name="RoomChat" component={RoomChat} options={{ headerShown: false, }}/>
                      <Stack.Screen name="InformationSingleRoom" component={InformationSingleRoom} options={{ headerShown: false, }}/>
                      <Stack.Screen name="InformationGroupRoom" component={InformationGroupRoom} options={{ headerShown: false, }}/>
                      <Stack.Screen name="AddMember" component={AddMember} options={{ headerShown: false, }}/>
                      <Stack.Screen name="SeeMembers" component={SeeMembers} options={{ headerShown: false, }}/>
                      <Stack.Screen name="FriendRequest" component={FriendRequest} options={{ headerShown: false, }}/>
                      <Stack.Screen name="PersonalPage" component={PersonalPage} options={{ headerShown: false, }}/>
                      <Stack.Screen name="FindUser" component={FindUser} options={{ headerShown: false, }}/>
                      <Stack.Screen name="SettingUser" component={SettingUser} options={{ headerShown: false, }}/>
                      <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ headerShown: false, }}/>
                      <Stack.Screen name="CreateNewGroup" component={CreateNewGroup} options={{ headerShown: false, }}/>
                      <Stack.Screen name="SettingGroup" component={SettingGroup} options={{ headerShown: false, }}/>

                  </Stack.Navigator>

                  <MainApp/>
              </NavigationContainer>
          </Provider>
      </QueryClientProvider>
  );
}

function MyTabs(){
  return(
      <Tab.Navigator initialRouteName={"PhoneBook"} >
        <Tab.Screen name={"Chat"} component={HomeChat}
                    options={{
                        headerShown:false,
                        tabBarLabel:"Chat",
                        tabBarActiveTintColor:"#63B8FF",
                        tabBarIcon:({color, size})=>(
                            <AntDesign name="message1" size={size} color={color} />
                        )
                    }}
        />
         <Tab.Screen name={"PhoneBook"} component={PhoneBook}
                    options={{
                        headerShown:false,
                        tabBarLabel:"PhoneBook",
                        tabBarActiveTintColor:"#63B8FF",
                        tabBarIcon:({color, size})=>(
                            <FontAwesome name="address-book-o" size={size} color={color} />
                        )


                    }}
        />
         <Tab.Screen name={"MyUser"} component={MyUser}
                    options={{
                        headerShown:false,
                        tabBarLabel:"My",
                        tabBarActiveTintColor:"#63B8FF",
                        tabBarIcon:({color, size})=>(
                            <FontAwesome name="user-circle-o" size={size} color={color} />
                        )

                    }}
        />

      </Tab.Navigator>
  )
}

