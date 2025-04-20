import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Screens
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import AddLinkScreen from '../screens/AddLinkScreen';
import LinkDetailsScreen from '../screens/LinkDetailsScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Add') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#3498db',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'الرئيسية' }} />
      <Tab.Screen name="Add" component={AddLinkScreen} options={{ title: 'إضافة' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'الملف الشخصي' }} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Main" 
        component={MainTabs} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="LinkDetails" 
        component={LinkDetailsScreen} 
        options={{ title: 'تفاصيل الرابط' }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;