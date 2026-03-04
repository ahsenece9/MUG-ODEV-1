import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, CheckCircle2, Circle, ChevronDown, ChevronUp, Trophy } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '@/constants/colors';

interface MilestoneData {
  id: string;
  title: string;
  week: string;
  tasks: string[];
}

const MILESTONES_DATA: MilestoneData[] = [
  { id: 'm1', title: '1. Trimester', week: '1–12. Hafta', tasks: ['İlk gebelik testi', 'Doktor randevusu', 'Folik asit başlangıcı', 'NT ultrason', 'İkili tarama testi'] },
  { id: 'm2', title: '2. Trimester', week: '13–26. Hafta', tasks: ['Detaylı ultrason', 'Üçlü/dörtlü tarama', 'Cinsiyeti öğrenme', 'Şeker tarama testi', 'Demir takviyesi'] },
  { id: 'm3', title: '3. Trimester (Şu An)', week: '27–40. Hafta', tasks: ['Doğum hazırlık kursu', 'Hastane çantası hazırlama', 'Ebe ile tanışma', 'Bebek odası düzenleme', 'Doğum planı hazırlama'] },
  { id: 'm4', title: 'Doğum', week: '40. Hafta', tasks: ['Hastaneye gidiş zamanı', 'Doğum süreci', 'İlk emzirme', 'Bebek bakımı bilgileri'] },
  { id: 'm5', title: 'Doğum Sonrası', week: '40+ Hafta', tasks: ['Lohusalık dönemi', 'Bebek aşıları', 'Emzirme danışmanlığı', 'Kontrol muayenesi'] },
];

const STORAGE_KEY = 'roadmap_state';

type TaskStateMap = Record<string, Record<number, boolean>>;

export default function RoadmapScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [expanded, setExpanded] = useState<string | null>('m3');
  const [taskStates, setTaskStates] = useState<TaskStateMap>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          setTaskStates(JSON.parse(stored));
        }
      } catch (e) {
        console.log('Failed to load roadmap state', e);
      } finally {
        setLoaded(true);
      }
    };
    load();
  }, []);

  const persist = useCallback(async (states: TaskStateMap) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(states));
    } catch (e) {
      console.log('Failed to save roadmap state', e);
    }
  }, []);

  const toggleTask = useCallback((milestoneId: string, taskIndex: number) => {
    setTaskStates((prev) => {
      const milestoneState = prev[milestoneId] || {};
      const updated = {
        ...prev,
        [milestoneId]: {
          ...milestoneState,
          [taskIndex]: !milestoneState[taskIndex],
        },
      };
      persist(updated);
      return updated;
    });
  }, [persist]);

  const isMilestoneDone = useCallback((milestone: MilestoneData) => {
    const state = taskStates[milestone.id];
    if (!state) return false;
    return milestone.tasks.every((_, idx) => state[idx] === true);
  }, [taskStates]);

  const isTaskDone = useCallback((milestoneId: string, taskIndex: number) => {
    return taskStates[milestoneId]?.[taskIndex] === true;
  }, [taskStates]);

  const completedMilestones = useMemo(() => {
    return MILESTONES_DATA.filter((m) => isMilestoneDone(m)).length;
  }, [isMilestoneDone]);

  const totalTasks = useMemo(() => {
    return MILESTONES_DATA.reduce((sum, m) => sum + m.tasks.length, 0);
  }, []);

  const completedTasks = useMemo(() => {
    let count = 0;
    MILESTONES_DATA.forEach((m) => {
      m.tasks.forEach((_, idx) => {
        if (taskStates[m.id]?.[idx]) count++;
      });
    });
    return count;
  }, [taskStates]);

  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const getMilestoneProgress = useCallback((milestone: MilestoneData) => {
    const state = taskStates[milestone.id];
    if (!state) return 0;
    const done = milestone.tasks.filter((_, idx) => state[idx] === true).length;
    return done;
  }, [taskStates]);

  if (!loaded) return null;

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} testID="back-btn">
          <ArrowLeft size={20} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Yol Haritam</Text>
        <View style={{ width: 38 }} />
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <LinearGradient colors={['#FDE8E6', '#FFF5F3']} style={styles.heroCard} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
          <View style={styles.heroTop}>
            <View style={styles.heroTextWrap}>
              <Text style={styles.heroTitle}>Hamilelik Yolculuğun</Text>
              <Text style={styles.heroSub}>{completedTasks} / {totalTasks} görev tamamlandı</Text>
            </View>
            {completedMilestones > 0 && (
              <View style={styles.trophyBadge}>
                <Trophy size={16} color={Colors.gold} />
                <Text style={styles.trophyText}>{completedMilestones}</Text>
              </View>
            )}
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` as any }]} />
          </View>
          <Text style={styles.progressLabel}>%{Math.round(progress)} tamamlandı</Text>
        </LinearGradient>

        <View style={styles.timeline}>
          {MILESTONES_DATA.map((m, index) => {
            const done = isMilestoneDone(m);
            const doneCount = getMilestoneProgress(m);
            const isExpanded = expanded === m.id;

            return (
              <View key={m.id} style={styles.milestoneWrap}>
                <View style={styles.timelineLeft}>
                  <View style={[
                    styles.dot,
                    done && styles.dotDone,
                  ]}>
                    {done && <CheckCircle2 size={20} color="#fff" />}
                    {!done && doneCount > 0 && (
                      <Text style={styles.dotProgressText}>{doneCount}</Text>
                    )}
                  </View>
                  {index < MILESTONES_DATA.length - 1 && (
                    <View style={[styles.line, done && styles.lineDone]} />
                  )}
                </View>

                <View style={styles.milestoneBody}>
                  <TouchableOpacity
                    style={[styles.milestoneCard, done && styles.milestoneCardDone]}
                    onPress={() => setExpanded(isExpanded ? null : m.id)}
                    activeOpacity={0.8}
                    testID={`milestone-${m.id}`}
                  >
                    <View style={styles.milestoneTop}>
                      <View style={styles.milestoneTitleWrap}>
                        <Text style={[styles.milestoneTitle, done && styles.milestoneTitleDone]}>{m.title}</Text>
                        <Text style={styles.milestoneWeek}>{m.week}</Text>
                      </View>
                      <View style={styles.milestoneRight}>
                        {done && (
                          <View style={styles.completedBadge}>
                            <Text style={styles.completedBadgeText}>Tamamlandı</Text>
                          </View>
                        )}
                        {!done && doneCount > 0 && (
                          <Text style={styles.milestoneProgressText}>{doneCount}/{m.tasks.length}</Text>
                        )}
                        {isExpanded ? <ChevronUp size={18} color={Colors.textMuted} /> : <ChevronDown size={18} color={Colors.textMuted} />}
                      </View>
                    </View>

                    {!done && doneCount > 0 && (
                      <View style={styles.miniProgressWrap}>
                        <View style={styles.miniProgressBar}>
                          <View style={[styles.miniProgressFill, { width: `${(doneCount / m.tasks.length) * 100}%` as any }]} />
                        </View>
                      </View>
                    )}

                    {isExpanded && (
                      <View style={styles.taskList}>
                        {m.tasks.map((task, ti) => {
                          const taskDone = isTaskDone(m.id, ti);
                          return (
                            <TouchableOpacity
                              key={ti}
                              style={styles.taskItem}
                              onPress={() => toggleTask(m.id, ti)}
                              activeOpacity={0.7}
                              testID={`task-${m.id}-${ti}`}
                            >
                              {taskDone
                                ? <CheckCircle2 size={18} color={Colors.success} />
                                : <Circle size={18} color={Colors.border} />
                              }
                              <Text style={[styles.taskText, taskDone && styles.taskTextDone]}>{task}</Text>
                            </TouchableOpacity>
                          );
                        })}
                      </View>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
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
  headerTitle: { flex: 1, textAlign: 'center', fontSize: 17, fontWeight: '700' as const, color: Colors.text },
  scroll: { flex: 1 },
  content: { padding: 16, paddingBottom: 40 },
  heroCard: { borderRadius: 22, padding: 20, marginBottom: 24 },
  heroTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 },
  heroTextWrap: { flex: 1 },
  heroTitle: { fontSize: 18, fontWeight: '800' as const, color: Colors.text, letterSpacing: -0.4 },
  heroSub: { fontSize: 13, color: Colors.textSecondary, marginTop: 3 },
  trophyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.goldLight,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  trophyText: { fontSize: 13, fontWeight: '700' as const, color: Colors.gold },
  progressBar: { height: 8, backgroundColor: Colors.primaryLight, borderRadius: 4, overflow: 'hidden', marginBottom: 6 },
  progressFill: { height: '100%', backgroundColor: Colors.primary, borderRadius: 4 },
  progressLabel: { fontSize: 12, color: Colors.primary, fontWeight: '700' as const },
  timeline: { paddingLeft: 4 },
  milestoneWrap: { flexDirection: 'row', gap: 14, marginBottom: 4 },
  timelineLeft: { alignItems: 'center', width: 28 },
  dot: {
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: Colors.border, alignItems: 'center', justifyContent: 'center', zIndex: 1,
  },
  dotDone: { backgroundColor: Colors.success },
  dotProgressText: { fontSize: 11, fontWeight: '700' as const, color: '#fff' },
  line: { flex: 1, width: 2, backgroundColor: Colors.border, marginVertical: 2 },
  lineDone: { backgroundColor: Colors.success },
  milestoneBody: { flex: 1, paddingBottom: 12 },
  milestoneCard: {
    backgroundColor: Colors.surface, borderRadius: 18, padding: 14,
    borderWidth: 1, borderColor: Colors.borderLight,
  },
  milestoneCardDone: { borderColor: Colors.success, borderWidth: 1.5 },
  milestoneTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  milestoneTitleWrap: { flex: 1 },
  milestoneTitle: { fontSize: 15, fontWeight: '700' as const, color: Colors.text },
  milestoneTitleDone: { color: Colors.success },
  milestoneWeek: { fontSize: 11, color: Colors.textMuted, marginTop: 2 },
  milestoneRight: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  milestoneProgressText: { fontSize: 11, fontWeight: '600' as const, color: Colors.primary },
  completedBadge: { backgroundColor: Colors.success + '20', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3 },
  completedBadgeText: { fontSize: 10, fontWeight: '700' as const, color: Colors.success },
  miniProgressWrap: { marginTop: 10, marginBottom: 2 },
  miniProgressBar: { height: 4, backgroundColor: Colors.borderLight, borderRadius: 2, overflow: 'hidden' },
  miniProgressFill: { height: '100%', backgroundColor: Colors.primary, borderRadius: 2 },
  taskList: { marginTop: 12, gap: 6 },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 10,
  },
  taskText: { fontSize: 13, color: Colors.textSecondary, flex: 1 },
  taskTextDone: { textDecorationLine: 'line-through', color: Colors.textMuted },
});
