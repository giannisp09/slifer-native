import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Home from '../pages/Main/Home'
import AddPost from '../pages/Post/AddPost'
import Search from '../pages/Main/Search'
import Profile from '../pages/Main/Profile'
import Chat from '../pages/Main/Chat'
import CustomDrawer from './drawer'
// import Icon from 'react-native-vector-icons/FontAwesome5';
import { StyleSheet,Modal, AppRegistry, Text, View, Button,TextInput , ScrollView,FlatList,Platform} from 'react-native';
import { Ionicons } from 'react-native-vector-icons/Ionicons'; 
import {Icon} from 'react-native-elements';
import {NavigationContainer} from '@react-navigation/native';
 
import {COLORS} from '../constants';
import Payment from '../pages/Wallet/Payment'




const Tab = createBottomTabNavigator();




const Tabs = () => {
    return (
         <NavigationContainer independent={true}>  
        <Tab.Navigator

    
        screenOptions={
            ({route}) => ({
              
            
            tabBarIcon: ({focused, color, size}) => {
              let iconName;
    
              switch (route.name) {
                case 'Home':
                  iconName = focused 
                    ? 'home' 
                    : 'home-outline';
                  break;
                case 'AddPost':
                  iconName = focused 
                  ? 'add-circle' 
                  : 'add-circle-outline';
                  break;
                case 'Search':
                    iconName = focused 
                    ? 'search' 
                    : 'search-outline';
                    break;
                case 'Profile':
                    iconName = focused 
                    ? 'person' 
                    : 'person-outline';
                    break;
                // case 'Drawer':
                //     iconName = focused 
                //     ? 'business' 
                //     : 'business-outline';
                //     break;
                case 'Chat':
                    iconName = focused 
                    ? 'mail' 
                    : 'mail-outline';
                    break;
              }
    
              // You can return any component that you like here!
              return (
                <Icon name={iconName} type="ionicon" size={size} color={ COLORS.primary} />
              );
            },
            "tabBarShowLabel": false,
            headerShown: false
          })
          
            // {"tabBarShowLabel": false}
             
          
          

        }
        >
            
            <Tab.Screen  name= "Home" component={Home} />
            <Tab.Screen name="AddPost" component={AddPost} />
            <Tab.Screen name="Search" component={Search} />
            <Tab.Screen name="Profile" component={Profile} />
            {/* <Tab.Screen name="Drawer" component={CustomDrawer} /> */}
            <Tab.Screen name="Chat" component={Chat} />

        </Tab.Navigator>
        </NavigationContainer>
       
    )
}

export default Tabs;