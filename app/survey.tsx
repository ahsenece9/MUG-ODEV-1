import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, CheckCircle2, ChevronRight } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/colors';

interface Question {
  id: string;
  text: string;
  options: string[];
  selected: number | null;
}

const QUESTIONS: Question[] = [
  { id: 'q1', text: 'Bu haftaki genel sağlık durumunuzu nasıl değerlendirirsiniz?', options: ['Çok iyi', 'İyi', 'Orta', 'Kötü'], selected: null },
  { id: 'q2', text: 'Uyku kaliteniz nasıl?', options: ['Çok iyi', 'İyi', 'Uyku sorunu var', 'Çok kötü'], selected: null },
  { id: 'q3', text: 'Bu hafta ne sıklıkla egzersiz yaptınız?', options: ['Her gün', '3–4 gün', '1–2 gün', 'Hiç'], selected: null },
  { id: 'q4', text: 'Beslenme düzeninizi nasıl değerlendirirsiniz?', options: ['Çok dengeli', 'Dengeli', 'Biraz düzensiz', 'Çok düzensiz'], selected: null },
  { id: 'q5', text: 'Doğum kaygı düzeyiniz nedir?', options: ['Hiç kaygı yok', 'Az kaygı', 'Orta düzey', 'Çok kaygılıyım'], selected: null },
];

export default function SurveyScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [questions, setQuestions] = useState<Question[]>(QUESTIONS);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const select = (qId: string, index: number) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === qId ? { ...q, selected: index } : q))
    );
  };

  const answeredCount = questions.filter((q) => q.selected !== null).length;
  const allAnswered = answeredCount === questions.length;

  const submit = () => {
    if (!allAnswered) {
      Alert.alert('Eksik Cevap', 'Lütfen tüm soruları cevaplayın.');
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <View style={[styles.root, { paddingTop: insets.top }]}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <ArrowLeft size={20} color={Colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Anket</Text>
          <View style={{ width: 38 }} />
        </View>
        <View style={styles.successView}>
          <CheckCircle2 size={64} color={Colors.success} />
          <Text style={styles.successTitle}>Teşekkürler!</Text>
          <Text style={styles.successText}>
            Yanıtlarınız başarıyla kaydedildi. Geri bildiriminiz bizim için çok değerli.
          </Text>
          <TouchableOpacity style={styles.backHomeBtn} onPress={() => router.back()}>
            <Text style={styles.backHomeBtnText}>Ana Sayfaya Dön</Text>
            <ChevronRight size={16} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} testID="back-btn">
          <ArrowLeft size={20} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Anket</Text>
        <View style={styles.progressPill}>
          <Text style={styles.progressPillText}>{answeredCount}/{questions.length}</Text>
        </View>
      </View>

      <View style={styles.overallProgress}>
        <View style={styles.overallBar}>
          <View style={[styles.overallFill, { width: `${(answeredCount / questions.length) * 100}%` as any }]} />
        </View>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.surveTitle}>Haftalık Memnuniyet Anketi</Text>
        <Text style={styles.surveySub}>Bu anket yaklaşık 2 dakika sürer ve hizmetlerimizi geliştirmemize yardımcı olur.</Text>

        {questions.map((q, qi) => (
          <View key={q.id} style={styles.questionCard} testID={`question-${q.id}`}>
            <View style={styles.qNumRow}>
              <View style={[styles.qNum, q.selected !== null && styles.qNumAnswered]}>
                <Text style={[styles.qNumText, q.selected !== null && styles.qNumTextAnswered]}>{qi + 1}</Text>
              </View>
              {q.selected !== null && <CheckCircle2 size={16} color={Colors.success} />}
            </View>
            <Text style={styles.qText}>{q.text}</Text>
            <View style={styles.options}>
              {q.options.map((opt, oi) => (
                <TouchableOpacity
                  key={oi}
                  style={[styles.option, q.selected === oi && styles.optionSelected]}
                  onPress={() => select(q.id, oi)}
                  activeOpacity={0.75}
                  testID={`option-${q.id}-${oi}`}
                >
                  <View style={[styles.optionRadio, q.selected === oi && styles.optionRadioSelected]}>
                    {q.selected === oi && <View style={styles.optionRadioInner} />}
                  </View>
                  <Text style={[styles.optionText, q.selected === oi && styles.optionTextSelected]}>{opt}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        <TouchableOpacity
          style={[styles.submitBtn, !allAnswered && styles.submitBtnDisabled]}
          onPress={submit}
          activeOpacity={0.85}
          testID="submit-survey-btn"
        >
          <Text style={styles.submitBtnText}>Anketi Gönder</Text>
          <ChevronRight size={18} color="#fff" />
        </TouchableOpacity>
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
  progressPill: { backgroundColor: Colors.primary, borderRadius: 12, paddingHorizontal: 10, paddingVertical: 4 },
  progressPillText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  overallProgress: { paddingHorizontal: 16, paddingVertical: 8, backgroundColor: Colors.surface },
  overallBar: { height: 4, backgroundColor: Colors.borderLight, borderRadius: 2, overflow: 'hidden' },
  overallFill: { height: '100%', backgroundColor: Colors.primary, borderRadius: 2 },
  scroll: { flex: 1 },
  content: { padding: 16, paddingBottom: 40 },
  surveTitle: { fontSize: 20, fontWeight: '800', color: Colors.text, letterSpacing: -0.4, marginBottom: 6 },
  surveySub: { fontSize: 13, color: Colors.textSecondary, lineHeight: 18, marginBottom: 20 },
  questionCard: { backgroundColor: Colors.surface, borderRadius: 20, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: Colors.borderLight },
  qNumRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 },
  qNum: { width: 28, height: 28, borderRadius: 14, backgroundColor: Colors.borderLight, alignItems: 'center', justifyContent: 'center' },
  qNumAnswered: { backgroundColor: Colors.primaryUltraLight },
  qNumText: { fontSize: 13, fontWeight: '700', color: Colors.textMuted },
  qNumTextAnswered: { color: Colors.primary },
  qText: { fontSize: 14, fontWeight: '600', color: Colors.text, lineHeight: 20, marginBottom: 14 },
  options: { gap: 8 },
  option: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    borderRadius: 12, padding: 12, borderWidth: 1.5, borderColor: Colors.border, backgroundColor: Colors.background,
  },
  optionSelected: { borderColor: Colors.primary, backgroundColor: Colors.primaryUltraLight },
  optionRadio: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: Colors.border, alignItems: 'center', justifyContent: 'center' },
  optionRadioSelected: { borderColor: Colors.primary },
  optionRadioInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: Colors.primary },
  optionText: { fontSize: 13, color: Colors.textSecondary, fontWeight: '500' },
  optionTextSelected: { color: Colors.primary, fontWeight: '700' },
  submitBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    backgroundColor: Colors.primary, borderRadius: 18, paddingVertical: 17, marginTop: 8,
  },
  submitBtnDisabled: { backgroundColor: Colors.border },
  submitBtnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  successView: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 40, gap: 16 },
  successTitle: { fontSize: 26, fontWeight: '800', color: Colors.text },
  successText: { fontSize: 14, color: Colors.textSecondary, textAlign: 'center', lineHeight: 22 },
  backHomeBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: Colors.primary, borderRadius: 16, paddingHorizontal: 24, paddingVertical: 14, marginTop: 8,
  },
  backHomeBtnText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});
