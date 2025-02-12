import { Tabs } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from '@expo/vector-icons/Feather';
export default function Layout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "#1B1B1B" ,headerShown:false}}>
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
