import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  Bell,
  BookOpen,
  MessageCircle,
  AlertCircle,
  CheckCheck,
  Trash2,
} from 'lucide-react-native';
import { Colors } from '@/constants/colors';
import AppHeader from '@/components/AppHeader';
import { useNotifications } from '@/context/NotificationContext';
import { AppNotification } from '@/mocks/notificationsData';

export default function NotificationsScreen() {
  const { notifications, unreadCount, markAllRead, markRead, deleteNotification } = useNotifications();

  const iconForType = (type: AppNotification['type']) => {
    switch (type) {
      case 'reminder': return <Bell size={18} color={Colors.warning} />;
      case 'news': return <BookOpen size={18} color={Colors.secondary} />;
      case 'message': return <MessageCircle size={18} color={Colors.primary} />;
      case 'alert': return <AlertCircle size={18} color={Colors.error} />;
    }
  };

  const bgForType = (type: AppNotification['type']) => {
    switch (type) {
      case 'reminder': return Colors.goldLight;
      case 'news': return Colors.secondaryLight + '50';
      case 'message': return Colors.primaryUltraLight;
      case 'alert': return '#FDECEA';
    }
  };

  return (
    <View style={styles.root}>
      <AppHeader title="Bildirimler" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerRow}>
          <View style={styles.unreadBadgeWrap}>
            <Text style={styles.unreadLabel}>
              {unreadCount > 0 ? `${unreadCount} okunmamış` : 'Tümü okundu'}
            </Text>
          </View>
          {unreadCount > 0 && (
            <TouchableOpacity
              style={styles.markAllBtn}
              onPress={markAllRead}
              testID="mark-all-read-btn"
            >
              <CheckCheck size={15} color={Colors.primary} />
              <Text style={styles.markAllText}>Tümünü Okundu İşaretle</Text>
            </TouchableOpacity>
          )}
        </View>

        {notifications.length === 0 && (
          <View style={styles.emptyState}>
            <Bell size={48} color={Colors.border} />
            <Text style={styles.emptyTitle}>Bildirim Yok</Text>
            <Text style={styles.emptyText}>Yeni bildirimler burada görünecek</Text>
          </View>
        )}

        {notifications.map((notif) => (
          <TouchableOpacity
            key={notif.id}
            style={[styles.notifCard, !notif.read && styles.notifCardUnread]}
            onPress={() => markRead(notif.id)}
            activeOpacity={0.8}
            testID={`notif-${notif.id}`}
          >
            <View style={[styles.iconWrap, { backgroundColor: bgForType(notif.type) }]}>
              {iconForType(notif.type)}
            </View>
            <View style={styles.notifBody}>
              <View style={styles.notifTop}>
                <Text style={[styles.notifTitle, !notif.read && styles.notifTitleUnread]} numberOfLines={1}>
                  {notif.title}
                </Text>
                {!notif.read && <View style={styles.unreadDot} />}
              </View>
              <Text style={styles.notifMessage} numberOfLines={2}>{notif.message}</Text>
              <Text style={styles.notifTime}>{notif.time}</Text>
            </View>
            <TouchableOpacity
              style={styles.deleteBtn}
              onPress={() => deleteNotification(notif.id)}
              testID={`delete-notif-${notif.id}`}
            >
              <Trash2 size={15} color={Colors.border} />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  scroll: { flex: 1 },
  content: { padding: 16, paddingBottom: 32 },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  unreadBadgeWrap: {},
  unreadLabel: { fontSize: 13, color: Colors.textMuted, fontWeight: '500' as const },
  markAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: Colors.primaryUltraLight,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  markAllText: { fontSize: 12, color: Colors.primary, fontWeight: '600' as const },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 80,
    gap: 12,
  },
  emptyTitle: { fontSize: 16, fontWeight: '700' as const, color: Colors.textSecondary },
  emptyText: { fontSize: 13, color: Colors.textMuted },
  notifCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: Colors.surface,
    borderRadius: 18,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  notifCardUnread: {
    borderColor: Colors.primaryLight,
    backgroundColor: Colors.primaryUltraLight,
  },
  iconWrap: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifBody: { flex: 1 },
  notifTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  notifTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.textSecondary,
    letterSpacing: -0.1,
  },
  notifTitleUnread: { color: Colors.text, fontWeight: '700' as const },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
  },
  notifMessage: {
    fontSize: 13,
    color: Colors.textMuted,
    lineHeight: 18,
    marginBottom: 5,
  },
  notifTime: { fontSize: 11, color: Colors.textMuted },
  deleteBtn: {
    padding: 4,
    marginTop: 2,
  },
});
