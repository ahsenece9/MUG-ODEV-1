import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Phone, Mail, MapPin, Send, MessageCircle } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/colors';

export default function ContactScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const send = () => {
    if (!name.trim() || !email.trim() || !message.trim()) {
      Alert.alert('Eksik Bilgi', 'Lütfen tüm alanları doldurun.');
      return;
    }
    Alert.alert('Mesaj Gönderildi', 'Mesajınız alındı, en kısa sürede size geri döneceğiz.');
    setName('');
    setEmail('');
    setMessage('');
  };

  const contacts = [
    { icon: <Phone size={20} color={Colors.primary} />, label: 'Telefon', value: '+90 212 555 0123' },
    { icon: <Mail size={20} color={Colors.primary} />, label: 'E-posta', value: 'info@nesliann.com' },
    { icon: <MapPin size={20} color={Colors.primary} />, label: 'Adres', value: 'İstanbul, Türkiye' },
  ];

  return (
    <KeyboardAvoidingView
      style={[styles.root, { paddingTop: insets.top }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} testID="back-btn">
          <ArrowLeft size={20} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>İletişim</Text>
        <View style={{ width: 38 }} />
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <View style={styles.heroBanner}>
          <MessageCircle size={32} color={Colors.primary} />
          <Text style={styles.heroTitle}>Bize Ulaşın</Text>
          <Text style={styles.heroSub}>Sorularınız, önerileriniz veya geri bildirimleriniz için buradayız.</Text>
        </View>

        <View style={styles.contactCards}>
          {contacts.map((c, i) => (
            <View key={i} style={styles.contactCard}>
              <View style={styles.contactIconWrap}>{c.icon}</View>
              <View>
                <Text style={styles.contactLabel}>{c.label}</Text>
                <Text style={styles.contactValue}>{c.value}</Text>
              </View>
            </View>
          ))}
        </View>

        <Text style={styles.formTitle}>Mesaj Gönder</Text>

        <View style={styles.formCard}>
          <Text style={styles.fieldLabel}>Adınız</Text>
          <TextInput
            style={styles.input}
            placeholder="Adınızı girin"
            placeholderTextColor={Colors.textMuted}
            value={name}
            onChangeText={setName}
            testID="contact-name"
          />

          <Text style={styles.fieldLabel}>E-posta</Text>
          <TextInput
            style={styles.input}
            placeholder="E-posta adresiniz"
            placeholderTextColor={Colors.textMuted}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            testID="contact-email"
          />

          <Text style={styles.fieldLabel}>Mesajınız</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Mesajınızı yazın..."
            placeholderTextColor={Colors.textMuted}
            value={message}
            onChangeText={setMessage}
            multiline
            numberOfLines={5}
            textAlignVertical="top"
            testID="contact-message"
          />

          <TouchableOpacity style={styles.sendBtn} onPress={send} activeOpacity={0.85} testID="contact-send">
            <Send size={18} color="#fff" />
            <Text style={styles.sendBtnText}>Gönder</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingBottom: 12, paddingTop: 8,
    backgroundColor: Colors.surface, borderBottomWidth: 1, borderBottomColor: Colors.borderLight,
  },
  backBtn: { width: 38, height: 38, borderRadius: 19, backgroundColor: Colors.background, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: 17, fontWeight: '700', color: Colors.text },
  scroll: { flex: 1 },
  content: { padding: 16, paddingBottom: 40 },
  heroBanner: {
    alignItems: 'center',
    backgroundColor: Colors.primaryUltraLight,
    borderRadius: 22,
    padding: 24,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.primaryLight,
    gap: 8,
  },
  heroTitle: { fontSize: 22, fontWeight: '800', color: Colors.text, letterSpacing: -0.4 },
  heroSub: { fontSize: 13, color: Colors.textSecondary, textAlign: 'center', lineHeight: 18 },
  contactCards: { gap: 10, marginBottom: 24 },
  contactCard: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    backgroundColor: Colors.surface, borderRadius: 16, padding: 14,
    borderWidth: 1, borderColor: Colors.borderLight,
  },
  contactIconWrap: {
    width: 44, height: 44, borderRadius: 14,
    backgroundColor: Colors.primaryUltraLight, alignItems: 'center', justifyContent: 'center',
  },
  contactLabel: { fontSize: 11, color: Colors.textMuted, marginBottom: 2 },
  contactValue: { fontSize: 14, fontWeight: '600', color: Colors.text },
  formTitle: { fontSize: 17, fontWeight: '700', color: Colors.text, marginBottom: 12 },
  formCard: {
    backgroundColor: Colors.surface, borderRadius: 22, padding: 18,
    borderWidth: 1, borderColor: Colors.borderLight,
  },
  fieldLabel: { fontSize: 13, fontWeight: '700', color: Colors.text, marginBottom: 7, marginTop: 4 },
  input: {
    backgroundColor: Colors.background, borderRadius: 14, paddingHorizontal: 14, paddingVertical: 12,
    fontSize: 14, color: Colors.text, borderWidth: 1, borderColor: Colors.border, marginBottom: 12,
  },
  textArea: {
    backgroundColor: Colors.background, borderRadius: 14, paddingHorizontal: 14, paddingTop: 12,
    fontSize: 14, color: Colors.text, borderWidth: 1, borderColor: Colors.border,
    minHeight: 110, marginBottom: 16,
  },
  sendBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    backgroundColor: Colors.primary, borderRadius: 16, paddingVertical: 15,
  },
  sendBtnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
