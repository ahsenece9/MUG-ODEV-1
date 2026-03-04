import { Tabs } from 'expo-router';
import { Home, BookOpen, MessageCircle, GraduationCap, Bell } from 'lucide-react-native';
import { Colors } from '@/constants/colors';
import { StyleSheet, View } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabLabel,
        tabBarIconStyle: styles.tabIcon,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Ana Sayfa',
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.activeTab : undefined}>
              <Home size={22} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="blog"
        options={{
          title: 'Blog',
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.activeTab : undefined}>
              <BookOpen size={22} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="forum"
        options={{
          title: 'Forum',
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.activeTab : undefined}>
              <MessageCircle size={22} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="courses"
        options={{
          title: 'Kurslar',
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.activeTab : undefined}>
              <GraduationCap size={22} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: 'Bildirim',
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.activeTab : undefined}>
              <Bell size={22} color={color} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.surface,
    borderTopColor: Colors.border,
    borderTopWidth: 1,
    height: 62,
    paddingBottom: 8,
    paddingTop: 6,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '600',
  },
  tabIcon: {
    marginBottom: 0,
  },
  activeTab: {
    backgroundColor: Colors.primaryUltraLight,
    borderRadius: 10,
    padding: 4,
  },
});
