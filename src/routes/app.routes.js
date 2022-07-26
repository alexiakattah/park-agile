import { Entypo, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'native-base';
import { Maps } from '../components/Maps';
import { Home } from '../screens/Home';
const HomeStack = createNativeStackNavigator();
const LoginStack = createNativeStackNavigator();
const HomeTabs = createBottomTabNavigator();
const ProfileStack = createNativeStackNavigator();
const AppStack = createNativeStackNavigator();
export function AppRoutes() {
  const theme = useTheme();
  const HomeStackNavigator = () => (
    <HomeStack.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
      })}
    >
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="Maps" component={Maps} />
    </HomeStack.Navigator>
  );

  const ProfileStackNavigator = () => (
    <ProfileStack.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
      })}
    >
      <ProfileStack.Screen name="Profile" component={Home} />
    </ProfileStack.Navigator>
  );
  const HomeTabNavigator = () => (
    <HomeTabs.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: '#262626',
          borderTopColor: 'transparent',
          borderRadius: 10,
          marginBottom: 15,
          marginHorizontal: 15,
          position: 'absolute',

          height: 60,

          paddingBottom: 10,
          paddingTopP: 15,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          textTransform: 'none',
        },
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary[700],

        scrollEnabled: true,
        tabBarIcon: ({ focused, color, size }) => {
          console.log('focused', focused, color, size, route);
          let iconName;

          if (route.name === 'Início') {
            iconName = focused ? 'home-sharp' : 'home-sharp';
          } else if (route.name === 'Perfil') {
            iconName = focused ? 'person' : 'person';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <HomeTabs.Screen name="Início" component={HomeStackNavigator} />
      <HomeTabs.Screen
        name="Cupons"
        options={({ route }) => ({
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons
              name="ticket-confirmation-outline"
              size={size}
              color={color}
            />
          ),
        })}
        component={ProfileStackNavigator}
      />
      <HomeTabs.Screen
        name="Carteira"
        options={({ route }) => ({
          tabBarIcon: ({ size, color }) => (
            <Entypo name="wallet" size={size} color={color} />
          ),
        })}
        component={ProfileStackNavigator}
      />
      <HomeTabs.Screen name="Perfil" component={ProfileStackNavigator} />
    </HomeTabs.Navigator>
  );
  return (
    <>
      <AppStack.Navigator
        initialRouteName={'HomeScreen'}
        screenOptions={({ route }) => ({
          headerShown: false,
        })}
        headerMode="none"
      >
        <AppStack.Screen name="HomeScreen" component={HomeTabNavigator} />
      </AppStack.Navigator>
    </>
  );
}
