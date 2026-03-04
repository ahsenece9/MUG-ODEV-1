import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Lightbulb, ChevronRight, Sparkles } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/colors';

interface Tip {
  id: string;
  title: string;
  content: string;
  category: string;
  emoji: string;
  color: string;
}

const TIPS: Tip[] = [
  { id: 't1', emoji: '💧', title: 'Bol Su İçin', content: 'Günde en az 8-10 bardak su içmeye özen gösterin. Susuzluk yorgunluğa ve baş dönmesine yol açabilir.', category: 'Beslenme', color: '#4A90D9' },
  { id: 't2', emoji: '🥦', title: 'Demir Emilimini Artırın', content: 'Demir içeren yiyecekleri C vitamini ile tüketin. Örneğin ıspanakla birlikte portakal suyu için.', category: 'Beslenme', color: Colors.secondary },
  { id: 't3', emoji: '🧘', title: 'Günde 10 Dakika Nefes', content: 'Her gün 10 dakika derin nefes egzersizi yapın. Bu hem stresi azaltır hem de doğuma hazırlar.', category: 'Egzersiz', color: Colors.primary },
  { id: 't4', emoji: '😴', title: 'Sol Tarafınıza Yatın', content: 'Uyurken sol tarafa yatmak kan dolaşımını iyileştirir ve bebeğe daha fazla oksijen ulaşmasını sağlar.', category: 'Uyku', color: '#7A6FC4' },
  { id: 't5', emoji: '🦶', title: 'Şişmeye Karşı Egzersiz', content: 'Ayak bileklerinizi düzenli olarak döndürün ve mümkün olduğunca ayaklarınızı yükseltin.', category: 'Sağlık', color: Colors.warning },
  { id: 't6', emoji: '🥗', title: 'Küçük Öğünler Tercih Edin', content: 'Günde 3 büyük öğün yerine 5-6 küçük öğün yemek bulantıyı azaltır ve enerji seviyenizi dengeler.', category: 'Beslenme', color: Colors.secondary },
  { id: 't7', emoji: '📖', title: 'Bebeğinize Okuyun', content: 'Gebeliğin 24. haftasından itibaren bebeğiniz sizi duyabilir. Kitap okumak ve şarkı söylemek bağı güçlendirir.', category: 'Gelişim', color: Colors.gold },
  { id: 't8', emoji: '🌞', title: 'D Vitamini İçin Güneş', content: 'Sabah 10-11 arasında 15 dakika güneş ışığı almanız D vitamini sentezini destekler.', category: 'Sağlık', color: Colors.warning },
  { id: 't9', emoji: '🍌', title: 'Bacak Krampları İçin Muz', content: 'Bacak krampları magnezyum eksikliğine işaret edebilir. Muz, avokado ve koyu yapraklı sebzeler tüketin.', category: 'Beslenme', color: '#E8943A' },
  { id: 't10', emoji: '🤸', title: 'Kegel Egzersizleri', content: 'Günde birkaç kez Kegel egzersizleri yapın. Bu hem doğumu kolaylaştırır hem de toparlanmayı hızlandırır.', category: 'Egzersiz', color: Colors.primary },
];

const CATEGORIES = ['Tümü', 'Beslenme', 'Egzersiz', 'Sağlık', 'Uyku', 'Gelişim'];

export default function QuickTipsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [activeCategory, setActiveCategory] = useState<string>('Tümü');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = TIPS.filter(
    (t) => activeCategory === 'Tümü' || t.category === activeCategory
  );

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} testID="back-btn">
          <ArrowLeft size={20} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Kısa Bilgiler</Text>
        <View style={{ width: 38 }} />
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={['#FDE8E6', '#FFF5F3']}
          style={styles.heroBanner}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.heroIconRow}>
            <Lightbulb size={28} color={Colors.gold} />
            <Sparkles size={20} color={Colors.primary} />
          </View>
          <Text style={styles.heroTitle}>Günlük İpuçları</Text>
          <Text style={styles.heroSub}>
            Hamilelik sürecinizi daha sağlıklı ve konforlu geçirmeniz için uzmanlardan kısa bilgiler.
          </Text>
        </LinearGradient>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.catRow}
        >
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.catPill, activeCategory === cat && styles.catPillActive]}
              onPress={() => setActiveCategory(cat)}
              activeOpacity={0.75}
            >
              <Text style={[styles.catText, activeCategory === cat && styles.catTextActive]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.tipsGrid}>
          {filtered.map((tip) => {
            const isExpanded = expandedId === tip.id;
            return (
              <TouchableOpacity
                key={tip.id}
                style={styles.tipCard}
                onPress={() => setExpandedId(isExpanded ? null : tip.id)}
                activeOpacity={0.85}
                testID={`tip-${tip.id}`}
              >
                <View style={styles.tipLeft}>
                  <View style={[styles.tipEmojiWrap, { backgroundColor: tip.color + '20' }]}>
                    <Text style={styles.tipEmoji}>{tip.emoji}</Text>
                  </View>
                </View>
                <View style={styles.tipBody}>
                  <View style={styles.tipTopRow}>
                    <View>
                      <Text style={styles.tipTitle}>{tip.title}</Text>
                      <View style={[styles.catTag, { backgroundColor: tip.color + '15' }]}>
                        <Text style={[styles.catTagText, { color: tip.color }]}>{tip.category}</Text>
                      </View>
                    </View>
                    <ChevronRight
                      size={16}
                      color={Colors.textMuted}
                      style={{ transform: [{ rotate: isExpanded ? '90deg' : '0deg' }] }}
                    />
                  </View>
                  {isExpanded && (
                    <Text style={styles.tipContent}>{tip.content}</Text>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
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
    margin: 16,
    borderRadius: 22, padding: 22, gap: 8,
  },
  heroIconRow: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  heroTitle: { fontSize: 22, fontWeight: '800', color: Colors.text, letterSpacing: -0.4 },
  heroSub: { fontSize: 13, color: Colors.textSecondary, lineHeight: 18 },
  catRow: { paddingHorizontal: 16, gap: 8, paddingBottom: 14 },
  catPill: {
    paddingHorizontal: 16, paddingVertical: 7, borderRadius: 20,
    backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.border,
  },
  catPillActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  catText: { fontSize: 13, color: Colors.textSecondary, fontWeight: '500' },
  catTextActive: { color: '#fff', fontWeight: '700' },
  tipsGrid: { paddingHorizontal: 16, gap: 10 },
  tipCard: {
    flexDirection: 'row', gap: 12,
    backgroundColor: Colors.surface, borderRadius: 18, padding: 14,
    borderWidth: 1, borderColor: Colors.borderLight,
    shadowColor: Colors.primary, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 1,
  },
  tipLeft: { alignItems: 'center', paddingTop: 2 },
  tipEmojiWrap: {
    width: 46, height: 46, borderRadius: 14, alignItems: 'center', justifyContent: 'center',
  },
  tipEmoji: { fontSize: 22 },
  tipBody: { flex: 1 },
  tipTopRow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' },
  tipTitle: { fontSize: 14, fontWeight: '700', color: Colors.text, marginBottom: 5, letterSpacing: -0.1 },
  catTag: { borderRadius: 6, paddingHorizontal: 7, paddingVertical: 2, alignSelf: 'flex-start' },
  catTagText: { fontSize: 10, fontWeight: '700' },
  tipContent: { fontSize: 13, color: Colors.textSecondary, lineHeight: 19, marginTop: 10 },
});
