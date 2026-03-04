import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Heart, Shield, Users, Award } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/colors';

export default function AboutScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const values = [
    { icon: <Heart size={20} color={Colors.primary} />, title: 'Empati', desc: 'Her annenin deneyimi benzersizdir. Sizi duyuyor ve anlıyoruz.' },
    { icon: <Shield size={20} color={Colors.secondary} />, title: 'Güven', desc: 'Tüm içerikler uzman ekibimiz tarafından onaylanmaktadır.' },
    { icon: <Users size={20} color={Colors.warning} />, title: 'Topluluk', desc: 'Binlerce anneden oluşan destekleyici topluluğumuza katılın.' },
    { icon: <Award size={20} color={Colors.gold} />, title: 'Kalite', desc: 'Kanıta dayalı, güncel ve doğru bilgi sunmayı taahhüt ediyoruz.' },
  ];

  const team = [
    { name: 'Dr. Ayşe Kaya', role: 'Kurucu & Kadın Hastalıkları Uzmanı', avatar: 'A' },
    { name: 'Ebe Saadet Yılmaz', role: 'Eğitim Direktörü', avatar: 'S' },
    { name: 'Dyt. Merve Şahin', role: 'Beslenme Danışmanı', avatar: 'M' },
  ];

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} testID="back-btn">
          <ArrowLeft size={20} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Hakkımızda</Text>
        <View style={{ width: 38 }} />
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <LinearGradient colors={[Colors.primary, Colors.primaryDark]} style={styles.heroBanner} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
          <Text style={styles.heroEmoji}>🌸</Text>
          <Text style={styles.heroAppName}>Hamilelik Rehberim</Text>
          <Text style={styles.heroTagline}>Hamilelik Yoldaşın</Text>
          <Text style={styles.heroDesc}>
            Hamilelik Rehberim, hamilelik sürecindeki her kadına kanıta dayalı bilgi, uzman desteği ve sıcak bir topluluk sunmak için kurulmuştur.
          </Text>
        </LinearGradient>

        <View style={styles.missionCard}>
          <Text style={styles.sectionTitle}>Misyonumuz</Text>
          <Text style={styles.missionText}>
            Türkiye&apos;deki her hamile kadının güvenilir bilgiye erişimini sağlamak, doğum sürecini güçlendirilmiş ve bilinçli bir şekilde yaşamasına yardımcı olmak.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Değerlerimiz</Text>
        <View style={styles.valuesGrid}>
          {values.map((v, i) => (
            <View key={i} style={styles.valueCard}>
              <View style={styles.valueIconWrap}>{v.icon}</View>
              <Text style={styles.valueTitle}>{v.title}</Text>
              <Text style={styles.valueDesc}>{v.desc}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Ekibimiz</Text>
        {team.map((member, i) => (
          <View key={i} style={styles.teamCard}>
            <View style={styles.teamAvatar}>
              <Text style={styles.teamAvatarText}>{member.avatar}</Text>
            </View>
            <View>
              <Text style={styles.teamName}>{member.name}</Text>
              <Text style={styles.teamRole}>{member.role}</Text>
            </View>
          </View>
        ))}

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNum}>2.4K+</Text>
            <Text style={styles.statLbl}>Aktif Kullanıcı</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNum}>18+</Text>
            <Text style={styles.statLbl}>Uzman Ders</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNum}>98%</Text>
            <Text style={styles.statLbl}>Memnuniyet</Text>
          </View>
        </View>

        <View style={styles.versionCard}>
          <Text style={styles.versionText}>Hamilelik Rehberim v1.0.0</Text>
          <Text style={styles.versionSub}>© 2024 Hamilelik Rehberim. Tüm hakları saklıdır.</Text>
        </View>
      </ScrollView>
    </View>
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
  content: { paddingBottom: 40 },
  heroBanner: {
    alignItems: 'center', padding: 32, gap: 6,
  },
  heroEmoji: { fontSize: 48 },
  heroAppName: { fontSize: 30, fontWeight: '900', color: '#fff', letterSpacing: -0.5 },
  heroTagline: { fontSize: 14, color: 'rgba(255,255,255,0.8)', marginBottom: 8 },
  heroDesc: { fontSize: 14, color: 'rgba(255,255,255,0.85)', textAlign: 'center', lineHeight: 20, maxWidth: 280 },
  missionCard: {
    backgroundColor: Colors.primaryUltraLight, borderRadius: 22, padding: 20,
    margin: 16, borderWidth: 1, borderColor: Colors.primaryLight,
  },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: Colors.text, marginBottom: 12, paddingHorizontal: 16 },
  missionText: { fontSize: 14, color: Colors.textSecondary, lineHeight: 22 },
  valuesGrid: {
    flexDirection: 'row', flexWrap: 'wrap', gap: 10,
    paddingHorizontal: 16, marginBottom: 24,
  },
  valueCard: {
    width: '47%', backgroundColor: Colors.surface, borderRadius: 18,
    padding: 16, borderWidth: 1, borderColor: Colors.borderLight, gap: 8,
  },
  valueIconWrap: {
    width: 40, height: 40, borderRadius: 12,
    backgroundColor: Colors.background, alignItems: 'center', justifyContent: 'center',
  },
  valueTitle: { fontSize: 14, fontWeight: '700', color: Colors.text },
  valueDesc: { fontSize: 12, color: Colors.textSecondary, lineHeight: 17 },
  teamCard: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: Colors.surface, borderRadius: 16, padding: 14, marginHorizontal: 16, marginBottom: 10,
    borderWidth: 1, borderColor: Colors.borderLight,
  },
  teamAvatar: {
    width: 46, height: 46, borderRadius: 23,
    backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center',
  },
  teamAvatarText: { color: '#fff', fontSize: 18, fontWeight: '800' },
  teamName: { fontSize: 14, fontWeight: '700', color: Colors.text },
  teamRole: { fontSize: 12, color: Colors.textMuted },
  statsRow: {
    flexDirection: 'row', gap: 10, paddingHorizontal: 16, marginTop: 20, marginBottom: 20,
  },
  statCard: {
    flex: 1, backgroundColor: Colors.surface, borderRadius: 16,
    alignItems: 'center', paddingVertical: 16, borderWidth: 1, borderColor: Colors.borderLight,
  },
  statNum: { fontSize: 20, fontWeight: '800', color: Colors.primary },
  statLbl: { fontSize: 10, color: Colors.textMuted, marginTop: 3, textAlign: 'center' },
  versionCard: {
    alignItems: 'center', paddingVertical: 20, borderTopWidth: 1, borderTopColor: Colors.border,
  },
  versionText: { fontSize: 13, color: Colors.textMuted },
  versionSub: { fontSize: 11, color: Colors.border, marginTop: 3 },
});
