import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, CheckCircle2, Circle, ShoppingCart } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/colors';
import { useShoppingList } from '@/context/ShoppingListContext';

export default function ShoppingListScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { items, toggleItem, checkedCount, totalCount, isLoaded } = useShoppingList();

  const categories = [...new Set(items.map((i) => i.category))];

  if (!isLoaded) return null;

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} testID="back-btn">
          <ArrowLeft size={20} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Alışveriş Listesi</Text>
        <View style={styles.countBadge}>
          <Text style={styles.countBadgeText}>{checkedCount}/{totalCount}</Text>
        </View>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.heroCard}>
          <ShoppingCart size={24} color="#fff" />
          <View style={styles.heroTextWrap}>
            <Text style={styles.heroTitle}>Doğurganlığı Artırıcı Beslenme</Text>
            <Text style={styles.heroSub}>Alışveriş listenizi tamamlayın</Text>
          </View>
        </View>

        <View style={styles.progressWrap}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${totalCount > 0 ? (checkedCount / totalCount) * 100 : 0}%` as any }]} />
          </View>
          <Text style={styles.progressText}>{checkedCount} / {totalCount} ürün alındı</Text>
        </View>

        {categories.map((cat) => (
          <View key={cat} style={styles.categorySection}>
            <Text style={styles.categoryTitle}>{cat}</Text>
            {items.filter((i) => i.category === cat).map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[styles.itemCard, item.checked && styles.itemCardChecked]}
                onPress={() => toggleItem(item.id)}
                activeOpacity={0.75}
                testID={`shop-item-${item.id}`}
              >
                {item.checked
                  ? <CheckCircle2 size={22} color={Colors.success} />
                  : <Circle size={22} color={Colors.border} />
                }
                <View style={styles.itemInfo}>
                  <Text style={[styles.itemName, item.checked && styles.itemNameChecked]}>{item.name}</Text>
                  <Text style={styles.itemBenefit}>{item.benefit}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ))}

        <View style={{ height: 24 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12,
    paddingTop: 8,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: 17, fontWeight: '700' as const, color: Colors.text },
  countBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
    backgroundColor: Colors.primary,
  },
  countBadgeText: { color: '#fff', fontSize: 11, fontWeight: '700' as const },
  scroll: { flex: 1 },
  content: { padding: 16, paddingBottom: 32 },
  heroCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: Colors.primary,
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
  },
  heroTextWrap: { flex: 1 },
  heroTitle: { fontSize: 16, fontWeight: '700' as const, color: '#fff', marginBottom: 3 },
  heroSub: { fontSize: 12, color: 'rgba(255,255,255,0.8)' },
  progressWrap: { marginBottom: 20 },
  progressBar: {
    height: 8,
    backgroundColor: Colors.borderLight,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 6,
  },
  progressFill: { height: '100%', backgroundColor: Colors.success, borderRadius: 4 },
  progressText: { fontSize: 12, color: Colors.textMuted, fontWeight: '600' as const },
  categorySection: { marginBottom: 16 },
  categoryTitle: {
    fontSize: 15,
    fontWeight: '700' as const,
    color: Colors.primary,
    marginBottom: 8,
    paddingLeft: 4,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  itemCardChecked: { opacity: 0.65 },
  itemInfo: { flex: 1 },
  itemName: { fontSize: 14, fontWeight: '600' as const, color: Colors.text },
  itemNameChecked: { textDecorationLine: 'line-through', color: Colors.textMuted },
  itemBenefit: { fontSize: 11, color: Colors.textMuted, marginTop: 2 },
});
