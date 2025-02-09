import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false, animation: "fade" }}
      />
      <Stack.Screen
        name="onboarding/FirstOnboarding"
        options={{ headerShown: false, animation: "fade" }}
      />
      <Stack.Screen
        name="onboarding/SecondOnboarding"
        options={{ headerShown: false, animation: "fade" }}
      />
      <Stack.Screen
        name="authentication/SignIn"
        options={{ headerShown: false, animation: "fade" }}
      />
      <Stack.Screen
        name="authentication/SignUp"
        options={{ headerShown: false, animation: "fade" }}
      />
      <Stack.Screen
        name="onboarding/notification"
        options={{ headerShown: false, animation: "fade" }}
      />
       <Stack.Screen
        name="app-pages"
        options={{ headerShown: false, animation: "fade" }}
      />
      <Stack.Screen
        name="pages/slots"
        options={{ headerShown: false, animation: "fade" }}
      />
      <Stack.Screen name="bookings" />
    </Stack>
  );
}
