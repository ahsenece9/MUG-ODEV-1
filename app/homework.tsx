import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, CheckCircle2, Circle, Clock, Star } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '@/constants/colors';

interface Homework {
  id: string;
  title: string;
  description: string;
  week: number;
  dueDate: string;
  done: boolean;
  difficulty: 'Kolay' | 'Orta' | 'Zor';
}

const HOMEWORK_LIST: Homework[] = [
  { id: 'h1', title: 'Nefes Egzersizi', description: '10 dakika diyafram nefes pratiği yapın.', week: 28, dueDate: 'Bu hafta', done: false, difficulty: 'Kolay' },
  { id: 'h2', title: 'Beslenme Günlüğü', description: 'Bugün yediklerinizi not alın ve protein alımınızı kontrol edin.', week: 28, dueDate: 'Bu hafta', done: false, difficulty: 'Kolay' },
  { id: 'h3', title: 'Doğum Planı Taslağı', description: 'Doğum tercihlerinizi yazılı olarak belirleyin.', week: 28, dueDate: 'Gelecek hafta', done: false, difficulty: 'Orta' },
  { id: 'h4', title: 'Prenatal Yoga', description: '20 dakika prenatal yoga videosu izleyerek pratik yapın.', week: 27, dueDate: 'Tamamlandı', done: false, difficulty: 'Orta' },
  { id: 'h5', title: 'Hastane Çantası', description: 'Hastane çantanızı hazırlayın ve listeyi tamamlayın.', week: 29, dueDate: 'Gelecek hafta', done: false, difficulty: 'Zor' },
];

const STORAGE_KEY = 'homework_state';

export default function HomeworkScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [list, setList] = useState<Homework[]>(HOMEWORK_LIST);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loadState = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          const savedMap: Record<string, boolean> = JSON.parse(stored);
          setList(HOMEWORK_LIST.map((h) => ({
            ...h,
            done: savedMap[h.id] ?? h.done,
          })));
        }
      } catch (e) {
        console.log('Failed to load homework state', e);
      } finally {
        setLoaded(true);
      }
    };
    loadState();
  }, []);

  const persist = useCallback(async (items: Homework[]) => {
    try {
      const map: Record<string, boolean> = {};
      items.forEach((h) => { map[h.id] = h.done; });
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(map));
    } catch (e) {
      console.log('Failed to save homework state', e);
    }
  }, []);

  const toggle = useCallback((id: string) => {
    setList((prev) => {
      const updated = prev.map((h) => (h.id === id ? { ...h, done: !h.done } : h));
      persist(updated);
      return updated;
    });
  }, [persist]);

  const done = list.filter((h) => h.done).length;
  const total = list.length;

  const diffColor = (d: Homework['difficulty']) => {
    if (d === 'Kolay') return Colors.success;
    if (d === 'Orta') return Colors.warning;
    return Colors.error;
  };

  if (!loaded) return null;

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} testID="back-btn">
          <ArrowLeft size={20} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ev Ödevi</Text>
        <View style={styles.progressCircle}>
          <Text style={styles.progressCircleText}>{done}/{total}</Text>
        </View>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.progressCard}>
          <Text style={styles.progressCardTitle}>Bu Haftanın İlerlemesi</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${(done / total) * 100}%` as any }]} />
          </View>
          <Text style={styles.progressText}>{done} / {total} tamamlandı</Text>
        </View>

        <Text style={styles.sectionTitle}>Ödevleriniz</Text>

        {list.map((hw) => (
          <TouchableOpacity
            key={hw.id}
            style={[styles.hwCard, hw.done && styles.hwCardDone]}
            onPress={() => toggle(hw.id)}
            activeOpacity={0.8}
            testID={`hw-item-${hw.id}`}
          >
            <View style={styles.hwLeft}>
              {hw.done
                ? <CheckCircle2 size={24} color={Colors.success} />
                : <Circle size={24} color={Colors.border} />
              }
            </View>
            <View style={styles.hwBody}>
              <View style={styles.hwTop}>
                <Text style={[styles.hwTitle, hw.done && styles.hwTitleDone]}>{hw.title}</Text>
                <View style={[styles.diffBadge, { backgroundColor: diffColor(hw.difficulty) + '20' }]}>
                  <Star size={10} color={diffColor(hw.difficulty)} />
                  <Text style={[styles.diffText, { color: diffColor(hw.difficulty) }]}>{hw.difficulty}</Text>
                </View>
              </View>
              <Text style={styles.hwDesc}>{hw.description}</Text>
              <View style={styles.hwMeta}>
                <Clock size={12} color={Colors.textMuted} />
                <Text style={styles.hwDue}>{hw.dueDate}</Text>
                <Text style={styles.hwWeek}>• {hw.week}. Hafta</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
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
  progressCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressCircleText: { color: '#fff', fontSize: 11, fontWeight: '700' as const },
  scroll: { flex: 1 },
  content: { padding: 16, paddingBottom: 32 },
  progressCard: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    padding: 18,
    marginBottom: 20,
  },
  progressCardTitle: { fontSize: 14, fontWeight: '600' as const, color: 'rgba(255,255,255,0.85)', marginBottom: 10 },
  progressBar: { height: 8, backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 4, overflow: 'hidden', marginBottom: 8 },
  progressFill: { height: '100%', backgroundColor: '#fff', borderRadius: 4 },
  progressText: { fontSize: 13, color: '#fff', fontWeight: '700' as const },
  sectionTitle: { fontSize: 17, fontWeight: '700' as const, color: Colors.text, marginBottom: 12 },
  hwCard: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: Colors.surface,
    borderRadius: 18,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  hwCardDone: { opacity: 0.65 },
  hwLeft: { paddingTop: 2 },
  hwBody: { flex: 1 },
  hwTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 },
  hwTitle: { fontSize: 14, fontWeight: '700' as const, color: Colors.text, flex: 1 },
  hwTitleDone: { textDecorationLine: 'line-through', color: Colors.textMuted },
  diffBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    borderRadius: 8,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  diffText: { fontSize: 10, fontWeight: '700' as const },
  hwDesc: { fontSize: 12, color: Colors.textSecondary, lineHeight: 17, marginBottom: 8 },
  hwMeta: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  hwDue: { fontSize: 11, color: Colors.textMuted },
  hwWeek: { fontSize: 11, color: Colors.textMuted },
});
