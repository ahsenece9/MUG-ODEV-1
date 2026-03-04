import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import {
  ChevronRight,
  ShoppingCart,
  CheckCircle2,
  Circle,
  Sparkles,
  BookOpen,
  GraduationCap,
  MessageCircle,
  Heart,
} from 'lucide-react-native';
import { Colors } from '@/constants/colors';
import AppHeader from '@/components/AppHeader';
import { useUser } from '@/context/UserContext';
import { useShoppingList } from '@/context/ShoppingListContext';
import { useBlog } from '@/context/BlogContext';

export default function HomeScreen() {
  const router = useRouter();
  const { displayName } = useUser();
  const { items: allShoppingItems, toggleItem } = useShoppingList();
  const { articles } = useBlog();
  const weekProgress = 28;
  const totalWeeks = 40;
  const progress = weekProgress / totalWeeks;

  const shoppingItems = allShoppingItems.slice(0, 6);

  const quickActions = [
    { icon: <BookOpen size={22} color={Colors.primary} />, label: 'Blog', route: '/(tabs)/blog' },
    { icon: <GraduationCap size={22} color={Colors.primary} />, label: 'Kurslar', route: '/(tabs)/courses' },
    { icon: <MessageCircle size={22} color={Colors.primary} />, label: 'Forum', route: '/(tabs)/forum' },
    { icon: <Sparkles size={22} color={Colors.secondary} />, label: 'İpuçları', route: '/quicktips' },
  ];

  const featuredArticle = articles[0];

  return (
    <View style={styles.root}>
      <AppHeader title="Hamilelik Rehberim" />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={['#FDE8E6', '#FFF5F3']}
          style={styles.heroCard}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.heroTop}>
            <View>
              <Text style={styles.heroGreeting}>Merhaba, {displayName} 👋</Text>
              <Text style={styles.heroSub}>Hamileliğinizin {weekProgress}. haftasındasınız</Text>
            </View>
            <View style={styles.weekBadge}>
              <Text style={styles.weekNum}>{weekProgress}</Text>
              <Text style={styles.weekLabel}>Hafta</Text>
            </View>
          </View>

          <View style={styles.progressWrap}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progress * 100}%` as any }]} />
            </View>
            <View style={styles.progressLabels}>
              <Text style={styles.progressLabel}>1. Hafta</Text>
              <Text style={styles.progressLabelRight}>{totalWeeks - weekProgress} hafta kaldı</Text>
            </View>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>2.</Text>
              <Text style={styles.statKey}>Trimester</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statKey}>Kalan Hafta</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>7</Text>
              <Text style={styles.statKey}>Ders Tamamlandı</Text>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hızlı Erişim</Text>
          <View style={styles.quickGrid}>
            {quickActions.map((action, i) => (
              <TouchableOpacity
                key={i}
                style={styles.quickCard}
                onPress={() => router.push(action.route as never)}
                activeOpacity={0.75}
                testID={`quick-action-${i}`}
              >
                <View style={styles.quickIconWrap}>{action.icon}</View>
                <Text style={styles.quickLabel}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Öne Çıkan Yazı</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/blog' as never)}>
              <Text style={styles.seeAll}>Tümü</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.featuredCard}
            activeOpacity={0.85}
            onPress={() => router.push('/(tabs)/blog' as never)}
            testID="featured-article"
          >
            <Image
              source={{ uri: featuredArticle.image }}
              style={styles.featuredImage}
              contentFit="cover"
            />
            <LinearGradient
              colors={['transparent', 'rgba(44,24,16,0.85)']}
              style={styles.featuredGradient}
            />
            <View style={styles.featuredContent}>
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryText}>{featuredArticle.category}</Text>
              </View>
              <Text style={styles.featuredTitle}>{featuredArticle.title}</Text>
              <View style={styles.featuredMeta}>
                <Heart size={13} color="#fff" />
                <Text style={styles.featuredMetaText}>{featuredArticle.likes} beğeni</Text>
                <Text style={styles.featuredMetaText}>·</Text>
                <Text style={styles.featuredMetaText}>{featuredArticle.readTime} dk okuma</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <ShoppingCart size={18} color={Colors.primary} />
              <Text style={styles.sectionTitle}>Alışveriş Listeniz</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.seeAll}>Düzenle</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.sectionSubtitle}>Doğurganlığı artırıcı beslenme alışveriş listesi</Text>

          <View style={styles.shoppingCard}>
            {shoppingItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.shoppingItem}
                onPress={() => toggleItem(item.id)}
                activeOpacity={0.7}
                testID={`shopping-item-${item.id}`}
              >
                {item.checked ? (
                  <CheckCircle2 size={22} color={Colors.success} />
                ) : (
                  <Circle size={22} color={Colors.border} />
                )}
                <View style={styles.shoppingItemInfo}>
                  <Text style={[styles.shoppingItemName, item.checked && styles.shoppingItemChecked]}>
                    {item.name}
                  </Text>
                  <Text style={styles.shoppingItemBenefit}>{item.benefit}</Text>
                </View>
                <View style={styles.categoryPill}>
                  <Text style={styles.categoryPillText}>{item.category}</Text>
                </View>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.showMoreBtn} activeOpacity={0.7} onPress={() => router.push('/shoppinglist' as never)} testID="show-full-list">
              <Text style={styles.showMoreText}>Tüm Listeyi Gör</Text>
              <ChevronRight size={16} color={Colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Son Kurs</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/courses' as never)}>
              <Text style={styles.seeAll}>Tümü</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.courseCard}
            activeOpacity={0.85}
            onPress={() => router.push('/(tabs)/courses' as never)}
            testID="course-card"
          >
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1559599101-f09722fb4948?w=800&q=80' }}
              style={styles.courseImage}
              contentFit="cover"
            />
            <View style={styles.courseInfo}>
              <Text style={styles.courseTitle}>Doğuma Hazırlık Temelleri</Text>
              <Text style={styles.courseSubtitle}>Ders 3 / 8 • Nefes Teknikleri</Text>
              <View style={styles.courseProgress}>
                <View style={styles.courseProgressBar}>
                  <View style={styles.courseProgressFill} />
                </View>
                <Text style={styles.courseProgressText}>37%</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomPad} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  heroCard: {
    margin: 16,
    borderRadius: 24,
    padding: 20,
  },
  heroTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  heroGreeting: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
    letterSpacing: -0.4,
  },
  heroSub: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 3,
  },
  weekBadge: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  weekNum: {
    fontSize: 20,
    fontWeight: '800',
    color: '#fff',
  },
  weekLabel: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '600',
  },
  progressWrap: {
    marginBottom: 16,
  },
  progressBar: {
    height: 8,
    backgroundColor: Colors.primaryLight,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  progressLabel: {
    fontSize: 11,
    color: Colors.textMuted,
  },
  progressLabelRight: {
    fontSize: 11,
    color: Colors.primary,
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.primary,
  },
  statKey: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: Colors.border,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: Colors.textMuted,
    marginBottom: 12,
  },
  seeAll: {
    fontSize: 13,
    color: Colors.primary,
    fontWeight: '600',
  },
  quickGrid: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
    marginBottom: 12,
  },
  quickCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    alignItems: 'center',
    paddingVertical: 16,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  quickIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: Colors.primaryUltraLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  quickLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.text,
  },
  featuredCard: {
    borderRadius: 20,
    overflow: 'hidden',
    height: 200,
    marginBottom: 12,
  },
  featuredImage: {
    ...StyleSheet.absoluteFillObject,
  },
  featuredGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  featuredContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  categoryBadge: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  categoryText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
  },
  featuredTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
    letterSpacing: -0.3,
  },
  featuredMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  featuredMetaText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
  },
  shoppingCard: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  shoppingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 13,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  shoppingItemInfo: {
    flex: 1,
  },
  shoppingItemName: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  shoppingItemChecked: {
    textDecorationLine: 'line-through',
    color: Colors.textMuted,
  },
  shoppingItemBenefit: {
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 2,
  },
  categoryPill: {
    backgroundColor: Colors.primaryUltraLight,
    borderRadius: 8,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  categoryPillText: {
    fontSize: 10,
    color: Colors.primary,
    fontWeight: '600',
  },
  showMoreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 14,
  },
  showMoreText: {
    fontSize: 13,
    color: Colors.primary,
    fontWeight: '600',
  },
  courseCard: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    overflow: 'hidden',
    flexDirection: 'row',
    height: 100,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    marginBottom: 12,
  },
  courseImage: {
    width: 100,
    height: '100%',
  },
  courseInfo: {
    flex: 1,
    padding: 14,
    justifyContent: 'center',
  },
  courseTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
    letterSpacing: -0.2,
  },
  courseSubtitle: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 3,
    marginBottom: 10,
  },
  courseProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  courseProgressBar: {
    flex: 1,
    height: 6,
    backgroundColor: Colors.borderLight,
    borderRadius: 3,
    overflow: 'hidden',
  },
  courseProgressFill: {
    width: '37%',
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 3,
  },
  courseProgressText: {
    fontSize: 11,
    color: Colors.primary,
    fontWeight: '700',
  },
  bottomPad: {
    height: 16,
  },
});
