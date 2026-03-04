import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Pressable,
  Platform,
  Modal,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  Bell,
  BookOpen,
  Map,
  GraduationCap,
  MessageCircle,
  BarChart2,
  Phone,
  Info,
  FileText,
  Lightbulb,
  ClipboardList,
  UserCheck,
  X,
  Home,
  Pencil,
} from 'lucide-react-native';
import { Colors } from '@/constants/colors';
import { useDrawer } from '@/context/DrawerContext';
import { useNotifications } from '@/context/NotificationContext';
import { useUser } from '@/context/UserContext';

const { width } = Dimensions.get('window');
const DRAWER_WIDTH = Math.min(width * 0.82, 320);

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  route: string;
  useBadge?: boolean;
}

export default function DrawerMenu() {
  const { isOpen, closeDrawer } = useDrawer();
  const { unreadCount } = useNotifications();
  const { displayFullName, avatar, username, fullName, setUsername, setFullName, hasProfile, isLoaded } = useUser();
  const [showNameModal, setShowNameModal] = useState<boolean>(false);
  const [fullNameInput, setFullNameInput] = useState<string>('');
  const [usernameInput, setUsernameInput] = useState<string>('');
  const [hasShownInitial, setHasShownInitial] = useState<boolean>(false);

  const openNameEdit = () => {
    setFullNameInput(fullName || '');
    setUsernameInput(username || '');
    setShowNameModal(true);
  };

  const saveProfile = () => {
    if (fullNameInput.trim() && usernameInput.trim()) {
      setFullName(fullNameInput.trim());
      setUsername(usernameInput.trim());
      setShowNameModal(false);
    }
  };
  const router = useRouter();
  const translateX = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isLoaded && !hasProfile && !hasShownInitial) {
      setHasShownInitial(true);
      setShowNameModal(true);
    }
  }, [isLoaded, hasProfile, hasShownInitial]);

  useEffect(() => {
    if (isOpen) {
      Animated.parallel([
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
          tension: 65,
          friction: 11,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.spring(translateX, {
          toValue: -DRAWER_WIDTH,
          useNativeDriver: true,
          tension: 65,
          friction: 11,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isOpen, translateX, overlayOpacity]);

  const navigate = (route: string) => {
    closeDrawer();
    setTimeout(() => {
      router.push(route as never);
    }, 150);
  };

  const menuItems: MenuItem[] = [
    { icon: <Home size={20} color={Colors.primary} />, label: 'Ana Sayfa', route: '/' },
    { icon: <Bell size={20} color={Colors.primary} />, label: 'Bildirimler', route: '/(tabs)/notifications', useBadge: true },
    { icon: <ClipboardList size={20} color={Colors.primary} />, label: 'Ev Ödevi', route: '/homework' },
    { icon: <UserCheck size={20} color={Colors.primary} />, label: 'Danışmanlık', route: '/consultation' },
    { icon: <Map size={20} color={Colors.primary} />, label: 'Yol Haritam', route: '/roadmap' },
    { icon: <GraduationCap size={20} color={Colors.primary} />, label: 'Kurslar', route: '/(tabs)/courses' },
    { icon: <BookOpen size={20} color={Colors.primary} />, label: 'Blog', route: '/(tabs)/blog' },
    { icon: <BarChart2 size={20} color={Colors.primary} />, label: 'Anket', route: '/survey' },
    { icon: <MessageCircle size={20} color={Colors.primary} />, label: 'Forum', route: '/(tabs)/forum' },
    { icon: <Phone size={20} color={Colors.primary} />, label: 'İletişim', route: '/contact' },
    { icon: <Info size={20} color={Colors.primary} />, label: 'Hakkımızda', route: '/about' },
    { icon: <FileText size={20} color={Colors.primary} />, label: 'Onam', route: '/consent' },
    { icon: <Lightbulb size={20} color={Colors.primary} />, label: 'Kısa Bilgiler', route: '/quicktips' },
  ];

  if (!isOpen && Platform.OS !== 'web') {
    return null;
  }

  return (
    <View style={[StyleSheet.absoluteFill, styles.container]} pointerEvents={isOpen ? 'auto' : 'none'}>
      <Animated.View style={[styles.overlay, { opacity: overlayOpacity }]}>
        <Pressable style={StyleSheet.absoluteFill} onPress={closeDrawer} />
      </Animated.View>

      <Animated.View style={[styles.drawer, { transform: [{ translateX }] }]}>
        <View style={styles.drawerHeader}>
          <View style={styles.logoArea}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoText}>🌸</Text>
            </View>
            <View>
              <Text style={styles.appName}>Hamilelik Rehberim</Text>
              <Text style={styles.appTagline}>Hamilelik Yoldaşın</Text>
            </View>
          </View>
          <TouchableOpacity onPress={closeDrawer} style={styles.closeBtn} testID="drawer-close">
            <X size={20} color={Colors.textSecondary} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.userCard} onPress={openNameEdit} activeOpacity={0.7} testID="drawer-user-card">
          <View style={styles.userAvatar}>
            <Text style={styles.userAvatarText}>{avatar}</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{displayFullName}</Text>
            <Text style={styles.userWeek}>28. Hafta • 2. Trimester</Text>
          </View>
          <View style={styles.editIcon}>
            <Pencil size={14} color={Colors.textMuted} />
          </View>
        </TouchableOpacity>

        <ScrollView
          style={styles.menuList}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.menuListContent}
        >
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => navigate(item.route)}
              activeOpacity={0.7}
              testID={`drawer-item-${index}`}
            >
              <View style={styles.menuIconWrap}>{item.icon}</View>
              <Text style={styles.menuLabel}>{item.label}</Text>
              {item.useBadge && unreadCount > 0 ? (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{unreadCount}</Text>
                </View>
              ) : null}
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.drawerFooter}>
          <Text style={styles.footerText}>© 2026 Hamilelik Rehberim</Text>
        </View>
      </Animated.View>

      <Modal visible={showNameModal} transparent animationType="fade">
        <KeyboardAvoidingView
          style={styles.nameModalOverlay}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={styles.nameModalCard}>
            <Text style={styles.nameModalTitle}>{hasProfile ? 'Profili Düzenle' : 'Hoş Geldiniz!'}</Text>
            <Text style={styles.nameModalSub}>
              {hasProfile ? 'Bilgilerinizi güncelleyin.' : 'Başlamak için bilgilerinizi girin.'}
            </Text>
            <Text style={styles.inputLabel}>Ad Soyad</Text>
            <TextInput
              style={styles.nameModalInput}
              placeholder="Ad Soyadınızı yazın..."
              placeholderTextColor={Colors.textMuted}
              value={fullNameInput}
              onChangeText={setFullNameInput}
              maxLength={40}
              autoFocus
              testID="fullname-input"
            />
            <Text style={styles.inputLabel}>Kullanıcı Adı</Text>
            <TextInput
              style={styles.nameModalInput}
              placeholder="Kullanıcı adınızı yazın..."
              placeholderTextColor={Colors.textMuted}
              value={usernameInput}
              onChangeText={setUsernameInput}
              maxLength={30}
              testID="username-input"
            />
            <View style={styles.nameModalBtns}>
              {hasProfile && (
                <TouchableOpacity
                  style={styles.nameModalCancel}
                  onPress={() => { setShowNameModal(false); }}
                >
                  <Text style={styles.nameModalCancelText}>İptal</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={[styles.nameModalSave, (!fullNameInput.trim() || !usernameInput.trim()) && styles.nameModalSaveDisabled]}
                onPress={saveProfile}
                disabled={!fullNameInput.trim() || !usernameInput.trim()}
                testID="profile-save-btn"
              >
                <Text style={styles.nameModalSaveText}>Kaydet</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 999,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.overlay,
  },
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: DRAWER_WIDTH,
    backgroundColor: Colors.surface,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 20,
  },
  drawerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 16,
    backgroundColor: Colors.primaryUltraLight,
  },
  logoArea: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 20,
  },
  appName: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: Colors.text,
    letterSpacing: -0.3,
  },
  appTagline: {
    fontSize: 11,
    color: Colors.textMuted,
  },
  closeBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginHorizontal: 16,
    marginVertical: 14,
    padding: 14,
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  userAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userAvatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700' as const,
  },
  userInfo: {
    flex: 1,
  },
  editIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: {
    fontSize: 15,
    fontWeight: '600' as const,
    color: Colors.text,
  },
  userWeek: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 2,
  },
  menuList: {
    flex: 1,
  },
  menuListContent: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 13,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 2,
  },
  menuIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: Colors.primaryUltraLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuLabel: {
    flex: 1,
    fontSize: 15,
    color: Colors.text,
    fontWeight: '500' as const,
  },
  badge: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  badgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700' as const,
  },
  drawerFooter: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  footerText: {
    fontSize: 12,
    color: Colors.textMuted,
    textAlign: 'center',
  },
  nameModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  nameModalCard: {
    backgroundColor: Colors.surface,
    borderRadius: 24,
    padding: 28,
    width: '100%',
    maxWidth: 360,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 10,
  },
  nameModalTitle: {
    fontSize: 22,
    fontWeight: '800' as const,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 6,
  },
  nameModalSub: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600' as const,
    color: Colors.textSecondary,
    marginBottom: 6,
    marginLeft: 2,
  },
  nameModalInput: {
    backgroundColor: Colors.background,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: Colors.text,
    borderWidth: 1.5,
    borderColor: Colors.border,
    marginBottom: 16,
  },
  nameModalBtns: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },
  nameModalCancel: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  nameModalCancelText: {
    fontSize: 15,
    fontWeight: '600' as const,
    color: Colors.textSecondary,
  },
  nameModalSave: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    alignItems: 'center',
  },
  nameModalSaveDisabled: {
    backgroundColor: Colors.border,
  },
  nameModalSaveText: {
    fontSize: 15,
    fontWeight: '700' as const,
    color: '#fff',
  },
});
