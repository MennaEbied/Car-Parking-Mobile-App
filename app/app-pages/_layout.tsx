import { Tabs } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
export default function Layout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "#2072AF" ,headerShown:false}}>
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo name="home" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen name="profile" 
      options={{
        tabBarIcon: ({ color }) => (
            <Feather name="user" size={22} color={color}/>
        )
      }}
      />
    </Tabs>
  );
}
