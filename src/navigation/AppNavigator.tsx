import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fontSize } from '../theme';

import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import TeamSpace from '../screens/TeamSpace';
import ProfileScreen from '../screens/ProfileScreen';
import MapTab from '../screens/MapTab';
import { useUserStore } from '../store/userStore';
import { useTeamStore } from '../store/teamStore';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// 主 Tab 导航（未组队）
const MainTabNavigator = ({ navigation }: { navigation: any }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text.tertiary,
        tabBarStyle: {
          backgroundColor: colors.background.primary,
          borderTopColor: colors.border.light,
          paddingTop: 8,
          paddingBottom: 20,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        options={{
          tabBarLabel: '首页',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>{color === colors.primary ? '🏠' : '🏠'}</Text>,
        }}
      >
        {(props) => (
          <HomeScreen
            {...props}
            onCreateTeam={() => navigation.navigate('TeamSpace')}
            onJoinTeam={() => navigation.navigate('TeamSpace')}
            onNavigateToMap={() => navigation.navigate('MapTab')}
            onNavigateToProfile={() => navigation.navigate('ProfileTab')}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="MapTab"
        component={MapTab}
        options={{
          tabBarLabel: '地图',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>🗺️</Text>,
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        options={{
          tabBarLabel: '我的',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>👤</Text>,
        }}
      >
        {(props) => (
          <ProfileScreen
            {...props}
            onNavigateToLogin={() => navigation.navigate('Login')}
            onNavigateToHome={() => navigation.navigate('HomeTab')}
            onNavigateToMap={() => navigation.navigate('MapTab')}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

// 队伍空间 Tab 导航
const TeamSpaceNavigator = ({ navigation }: { navigation: any }) => {
  const leaveTeam = useTeamStore(state => state.leaveTeam);
  
  return (
    <TeamSpace
      onNavigateToMap={() => {}}
      onNavigateToProfile={() => navigation.navigate('ProfileTab')}
      onLeaveTeam={() => {
        leaveTeam();
        navigation.goBack();
      }}
    />
  );
};

// 全局 Tab 导航（已组队）
const TeamTabNavigator = ({ navigation }: { navigation: any }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text.tertiary,
        tabBarStyle: {
          backgroundColor: colors.background.primary,
          borderTopColor: colors.border.light,
          paddingTop: 8,
          paddingBottom: 20,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="TeamSpaceTab"
        options={{
          tabBarLabel: '队伍',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>🏠</Text>,
        }}
      >
        {(props) => <TeamSpaceNavigator {...props} navigation={navigation} />}
      </Tab.Screen>
      <Tab.Screen
        name="GlobalMapTab"
        component={MapTab}
        options={{
          tabBarLabel: '地图',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>🗺️</Text>,
        }}
      />
      <Tab.Screen
        name="GlobalProfileTab"
        options={{
          tabBarLabel: '我的',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>👤</Text>,
        }}
      >
        {(props) => (
          <ProfileScreen
            {...props}
            onNavigateToLogin={() => navigation.navigate('Login')}
            onNavigateToHome={() => navigation.navigate('HomeTab')}
            onNavigateToMap={() => navigation.navigate('GlobalMapTab')}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  const [showSplash, setShowSplash] = useState(true);
  const isAuthenticated = useUserStore(state => state.isAuthenticated);
  const isJoined = useTeamStore(state => state.isJoined);

  if (showSplash) {
    return <SplashScreen onReady={() => setShowSplash(false)} />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {!isAuthenticated ? (
          <>
            <Stack.Screen name="Login">
              {(props) => (
                <LoginScreen
                  {...props}
                  onLoginSuccess={() => {}}
                  onNavigateToRegister={() => {}}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="Register">
              {(props) => (
                <RegisterScreen
                  {...props}
                  onRegisterSuccess={() => {}}
                  onNavigateToLogin={() => {}}
                />
              )}
            </Stack.Screen>
          </>
        ) : (
          <>
            {!isJoined ? (
              <Stack.Screen name="MainTabs" component={MainTabNavigator} />
            ) : (
              <Stack.Screen name="TeamTabs" component={TeamTabNavigator} />
            )}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
