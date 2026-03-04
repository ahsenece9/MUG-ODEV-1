import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Menu, Bell } from 'lucide-react-native';
import { useRouter, usePathname } from 'expo-router';
import { Colors } from '@/constants/colors';
import { useDrawer } from '@/context/DrawerContext';
import { useNotifications } from '@/context/NotificationContext';

interface AppHeaderProps {
  title: string;
  showBack?: boolean;
  notificationCount?: number;
}

export default function AppHeader({ title }: AppHeaderProps) {
  const { openDrawer } = useDrawer();
  const { unreadCount } = useNotifications();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <TouchableOpacity style={styles.iconBtn} onPress={openDrawer} testID="header-menu-btn">
        <Menu size={22} color={Colors.text} />
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>

      <TouchableOpacity
        style={styles.iconBtn}
        onPress={() => {
          const currentPath = pathname;
          if (currentPath === '/notifications' || currentPath === '/(tabs)/notifications') {
            router.back();
          } else {
            router.push('/(tabs)/notifications' as never);
          }
        }}
        testID="header-bell-btn"
      >
        <Bell size={22} color={Colors.text} />
        {unreadCount > 0 && (
          <View style={styles.notifBadge}>
            <Text style={styles.notifBadgeText}>{unreadCount}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  title: {
    fontSize: 17,
    fontWeight: '700' as const,
    color: Colors.text,
    letterSpacing: -0.3,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  notifBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifBadgeText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: '700' as const,
  },
});
