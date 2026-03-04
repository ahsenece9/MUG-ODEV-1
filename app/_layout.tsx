import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { DrawerProvider } from "@/context/DrawerContext";
import { NotificationProvider } from "@/context/NotificationContext";
import { UserProvider } from "@/context/UserContext";
import { ShoppingListProvider } from "@/context/ShoppingListContext";
import { BlogProvider } from "@/context/BlogContext";
import DrawerMenu from "@/components/DrawerMenu";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

function RootLayoutNav() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="homework" options={{ headerShown: false }} />
        <Stack.Screen name="consultation" options={{ headerShown: false }} />
        <Stack.Screen name="roadmap" options={{ headerShown: false }} />
        <Stack.Screen name="survey" options={{ headerShown: false }} />
        <Stack.Screen name="contact" options={{ headerShown: false }} />
        <Stack.Screen name="about" options={{ headerShown: false }} />
        <Stack.Screen name="consent" options={{ headerShown: false }} />
        <Stack.Screen name="quicktips" options={{ headerShown: false }} />
        <Stack.Screen name="shoppinglist" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <DrawerMenu />
    </>
  );
}

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <DrawerProvider>
          <NotificationProvider>
            <UserProvider>
              <ShoppingListProvider>
                <BlogProvider>
                  <RootLayoutNav />
                </BlogProvider>
              </ShoppingListProvider>
            </UserProvider>
          </NotificationProvider>
        </DrawerProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
