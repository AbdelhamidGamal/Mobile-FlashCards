import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './src/screens/HomeScreen';
import NewDeckScreen from './src/screens/NewDeckScreen';
import DeckScreen from './src/screens/DeckScreen';
import QuizScreen from './src/screens/QuizScreen';
import NewCardScreen from './src/screens/NewCardScreen';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './src/reducers';

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name='Decks' component={HomeScreen} />
      <HomeStack.Screen
        options={({ route }) => ({ title: route.params.name })}
        name='DeckScreen'
        component={DeckScreen}
      />
      <HomeStack.Screen name='QuizScreen' component={QuizScreen} />
      <HomeStack.Screen name='NewCardScreen' component={NewCardScreen} />
    </HomeStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={createStore(reducer)}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            style={{ padding: 5 }}
            name='Decks'
            component={HomeStackScreen}
            options={{
              tabBarIcon: () => (
                <AntDesign name='home' size={30} color='black' />
              ),
            }}
          />
          <Tab.Screen
            name='New Deck'
            component={NewDeckScreen}
            options={{
              tabBarIcon: () => (
                <MaterialIcons
                  name='create-new-folder'
                  size={30}
                  color='black'
                />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
