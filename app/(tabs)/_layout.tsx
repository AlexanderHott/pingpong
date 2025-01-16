import { LinearGradient } from "expo-linear-gradient";
import { Tabs } from "expo-router";
import { Feather } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "black",
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "white",
          borderColor: "transparent",
          // borderTopWidth: 1,
          // borderWidth: 0,
        },
        tabBarBackground: () => (
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            colors={[
              "#00000000",
              "#00000000",
              "#000000",
              "#00000000",
              "#00000000",
            ]}
            style={{ width: "100%", height: 1 }}
          />
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Feather size={24} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="log"
        options={{
          title: "Req Log",
          tabBarIcon: ({ color }) => (
            <Feather size={24} name="list" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
