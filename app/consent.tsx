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
import { ArrowLeft, CheckSquare, Square, ChevronDown, ChevronUp, FileText } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/colors';

interface ConsentItem {
  id: string;
  title: string;
  content: string;
  required: boolean;
  agreed: boolean;
  expanded: boolean;
}

const CONSENT_ITEMS: ConsentItem[] = [
  {
    id: 'c1',
    title: 'Kullanım Koşulları',
    content: 'Hamilelik Rehberim uygulamasını kullanarak aşağıdaki koşulları kabul etmiş olursunuz. Bu uygulama tıbbi tavsiye yerine geçmez. Sunulan içerikler yalnızca bilgilendirme amaçlıdır. Her türlü sağlık kararı için lütfen bir sağlık uzmanına danışın. Uygulama içeriğinin izinsiz kopyalanması yasaktır.',
    required: true,
    agreed: false,
    expanded: false,
  },
  {
    id: 'c2',
    title: 'Gizlilik Politikası',
    content: 'Kişisel verileriniz KVKK kapsamında korunmaktadır. Adınız, e-posta adresiniz ve hamilelik bilgileriniz yalnızca hizmet sunumu amacıyla kullanılır, üçüncü taraflarla paylaşılmaz. Verilerinizi dilediğiniz zaman silme hakkına sahipsiniz.',
    required: true,
    agreed: false,
    expanded: false,
  },
  {
    id: 'c3',
    title: 'Sağlık Verisi İşleme Onayı',
    content: 'Hamilelik haftası, beslenme alışkanlıkları gibi sağlık verilerinizin uygulama içinde kişiselleştirilmiş hizmet sunmak amacıyla işlenmesine onay veriyorsunuz. Bu onay isteğe bağlıdır ancak bazı özellikler çalışmayabilir.',
    required: false,
    agreed: false,
    expanded: false,
  },
  {
    id: 'c4',
    title: 'Pazarlama İletişimi',
    content: 'Size özel kampanya, etkinlik ve yeni içerik bildirimleri almak için onay verebilirsiniz. Bu onay tamamen isteğe bağlıdır ve istediğiniz zaman geri çekebilirsiniz.',
    required: false,
    agreed: false,
    expanded: false,
  },
];

export default function ConsentScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [items, setItems] = useState<ConsentItem[]>(CONSENT_ITEMS);

  const toggleAgreed = (id: string) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, agreed: !i.agreed } : i)));
  };

  const toggleExpanded = (id: string) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, expanded: !i.expanded } : i)));
  };

  const requiredAll = items.filter((i) => i.required).every((i) => i.agreed);

  const saveConsent = () => {
    if (!requiredAll) {
      Alert.alert('Zorunlu Onaylar', 'Lütfen zorunlu onayları kabul edin.');
      return;
    }
    Alert.alert('Onay Kaydedildi', 'Seçimleriniz başarıyla kaydedildi.');
    router.back();
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} testID="back-btn">
          <ArrowLeft size={20} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Onam</Text>
        <View style={{ width: 38 }} />
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.heroBanner}>
          <FileText size={32} color={Colors.primary} />
          <Text style={styles.heroTitle}>Onay Belgeleriniz</Text>
          <Text style={styles.heroSub}>
            Aşağıdaki belgeler uygulamayı kullanabilmeniz için gereklidir. Lütfen her birini okuyun ve onaylayın.
          </Text>
        </View>

        {items.map((item) => (
          <View
            key={item.id}
            style={[styles.consentCard, item.agreed && styles.consentCardAgreed]}
            testID={`consent-item-${item.id}`}
          >
            <TouchableOpacity
              style={styles.consentHeader}
              onPress={() => toggleExpanded(item.id)}
              activeOpacity={0.8}
            >
              <View style={styles.consentTitleRow}>
                <Text style={styles.consentTitle}>{item.title}</Text>
                {item.required && (
                  <View style={styles.requiredBadge}>
                    <Text style={styles.requiredText}>Zorunlu</Text>
                  </View>
                )}
              </View>
              {item.expanded
                ? <ChevronUp size={18} color={Colors.textMuted} />
                : <ChevronDown size={18} color={Colors.textMuted} />
              }
            </TouchableOpacity>

            {item.expanded && (
              <Text style={styles.consentContent}>{item.content}</Text>
            )}

            <TouchableOpacity
              style={styles.agreeRow}
              onPress={() => toggleAgreed(item.id)}
              activeOpacity={0.75}
              testID={`agree-${item.id}`}
            >
              {item.agreed
                ? <CheckSquare size={22} color={Colors.success} />
                : <Square size={22} color={Colors.border} />
              }
              <Text style={[styles.agreeText, item.agreed && styles.agreeTextActive]}>
                {item.agreed ? 'Onaylandı' : 'Okudum ve kabul ediyorum'}
              </Text>
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity
          style={[styles.saveBtn, !requiredAll && styles.saveBtnDisabled]}
          onPress={saveConsent}
          activeOpacity={0.85}
          testID="save-consent-btn"
        >
          <Text style={styles.saveBtnText}>Kaydet</Text>
        </TouchableOpacity>

        <Text style={styles.footnote}>
          Onaylarınızı istediğiniz zaman bu ekrandan değiştirebilirsiniz.
        </Text>
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
  content: { padding: 16, paddingBottom: 40 },
  heroBanner: {
    alignItems: 'center', backgroundColor: Colors.primaryUltraLight,
    borderRadius: 22, padding: 24, marginBottom: 20,
    borderWidth: 1, borderColor: Colors.primaryLight, gap: 8,
  },
  heroTitle: { fontSize: 20, fontWeight: '800', color: Colors.text, letterSpacing: -0.4 },
  heroSub: { fontSize: 13, color: Colors.textSecondary, textAlign: 'center', lineHeight: 18 },
  consentCard: {
    backgroundColor: Colors.surface, borderRadius: 18, marginBottom: 12,
    borderWidth: 1.5, borderColor: Colors.border, overflow: 'hidden',
  },
  consentCardAgreed: { borderColor: Colors.success + '60' },
  consentHeader: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    padding: 16,
  },
  consentTitleRow: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8, marginRight: 8 },
  consentTitle: { fontSize: 14, fontWeight: '700', color: Colors.text, flex: 1 },
  requiredBadge: {
    backgroundColor: Colors.error + '15', borderRadius: 6, paddingHorizontal: 7, paddingVertical: 2,
  },
  requiredText: { fontSize: 10, fontWeight: '700', color: Colors.error },
  consentContent: {
    fontSize: 13, color: Colors.textSecondary, lineHeight: 20,
    paddingHorizontal: 16, paddingBottom: 14,
  },
  agreeRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingHorizontal: 16, paddingVertical: 13,
    borderTopWidth: 1, borderTopColor: Colors.borderLight,
    backgroundColor: Colors.background,
  },
  agreeText: { fontSize: 13, color: Colors.textMuted, fontWeight: '500' },
  agreeTextActive: { color: Colors.success, fontWeight: '700' },
  saveBtn: {
    backgroundColor: Colors.primary, borderRadius: 18, paddingVertical: 17,
    alignItems: 'center', marginTop: 8, marginBottom: 12,
  },
  saveBtnDisabled: { backgroundColor: Colors.border },
  saveBtnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  footnote: { fontSize: 12, color: Colors.textMuted, textAlign: 'center', lineHeight: 17 },
});
