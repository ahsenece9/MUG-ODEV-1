import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Star, Video, Phone, MessageCircle, Calendar, Clock, X, ChevronLeft, ChevronRight, Trash2 } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '@/constants/colors';
import { Image } from 'expo-image';

interface Expert {
  id: string;
  name: string;
  title: string;
  rating: number;
  reviews: number;
  available: boolean;
  image: string;
  specialty: string;
}

interface Appointment {
  id: string;
  expertId: string;
  expertName: string;
  expertTitle: string;
  type: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed';
}

const EXPERTS: Expert[] = [
  { id: 'e1', name: 'Dr. Ayşe Kaya', title: 'Kadın Hastalıkları Uzmanı', rating: 4.9, reviews: 234, available: true, image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&q=80', specialty: 'Doğum & Hamilelik' },
  { id: 'e2', name: 'Dyt. Merve Şahin', title: 'Klinik Diyetisyen', rating: 4.8, reviews: 189, available: true, image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&q=80', specialty: 'Prenatal Beslenme' },
  { id: 'e3', name: 'Ebe Saadet Yılmaz', title: 'Uzman Ebe', rating: 4.9, reviews: 312, available: false, image: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=200&q=80', specialty: 'Doğal Doğum' },
  { id: 'e4', name: 'Psk. Ceren Arslan', title: 'Perinatal Psikolog', rating: 4.7, reviews: 156, available: true, image: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=200&q=80', specialty: 'Doğum Kaygısı' },
];

const TIME_SLOTS = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'];
const APPOINTMENTS_KEY = 'consultation_appointments';

const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

const MONTH_NAMES = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
const DAY_NAMES = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];

export default function ConsultationScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [showAppointments, setShowAppointments] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(new Date().getMonth());
  const [calendarYear, setCalendarYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const load = async () => {
      try {
        const stored = await AsyncStorage.getItem(APPOINTMENTS_KEY);
        if (stored) setAppointments(JSON.parse(stored));
      } catch (e) {
        console.log('Failed to load appointments', e);
      }
    };
    load();
  }, []);

  const saveAppointments = useCallback(async (items: Appointment[]) => {
    try {
      await AsyncStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(items));
    } catch (e) {
      console.log('Failed to save appointments', e);
    }
  }, []);

  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  const bookConsultation = () => {
    if (!selectedExpert || !selectedType || !selectedDate || !selectedTime) return;

    const newAppointment: Appointment = {
      id: Date.now().toString(),
      expertId: selectedExpert.id,
      expertName: selectedExpert.name,
      expertTitle: selectedExpert.title,
      type: selectedType,
      date: selectedDate,
      time: selectedTime,
      status: 'upcoming',
    };

    const updated = [...appointments, newAppointment];
    setAppointments(updated);
    saveAppointments(updated);

    const dp = selectedDate.split('-');
    const fDate = `${dp[2]} ${MONTH_NAMES[parseInt(dp[1], 10) - 1]} ${dp[0]}`;

    Alert.alert(
      'Randevu Oluşturuldu',
      `${selectedExpert.name} ile ${selectedType} randevunuz ${fDate} tarihinde saat ${selectedTime}'de oluşturuldu.`,
    );

    setSelectedExpert(null);
    setSelectedType(null);
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const deleteAppointment = (id: string) => {
    Alert.alert('Randevu İptal', 'Bu randevuyu iptal etmek istediğinize emin misiniz?', [
      { text: 'Hayır', style: 'cancel' },
      {
        text: 'Evet',
        style: 'destructive',
        onPress: () => {
          const updated = appointments.filter((a) => a.id !== id);
          setAppointments(updated);
          saveAppointments(updated);
        },
      },
    ]);
  };

  const prevMonth = () => {
    if (calendarMonth === 0) {
      setCalendarMonth(11);
      setCalendarYear((y) => y - 1);
    } else {
      setCalendarMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (calendarMonth === 11) {
      setCalendarMonth(0);
      setCalendarYear((y) => y + 1);
    } else {
      setCalendarMonth((m) => m + 1);
    }
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(calendarYear, calendarMonth);
    let firstDay = getFirstDayOfMonth(calendarYear, calendarMonth);
    firstDay = firstDay === 0 ? 6 : firstDay - 1;

    const cells: React.ReactNode[] = [];

    for (let i = 0; i < firstDay; i++) {
      cells.push(<View key={`empty-${i}`} style={styles.calendarCell} />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${calendarYear}-${String(calendarMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const isPast = dateStr < todayStr;
      const isSelected = selectedDate === dateStr;
      const isToday = dateStr === todayStr;
      const isWeekend = ((firstDay + day - 1) % 7) >= 5;

      cells.push(
        <TouchableOpacity
          key={day}
          style={[
            styles.calendarCell,
            isSelected && styles.calendarCellSelected,
            isToday && !isSelected && styles.calendarCellToday,
          ]}
          onPress={() => !isPast && setSelectedDate(dateStr)}
          disabled={isPast}
          activeOpacity={0.7}
        >
          <Text style={[
            styles.calendarDayText,
            isPast && styles.calendarDayPast,
            isSelected && styles.calendarDaySelected,
            isWeekend && !isSelected && !isPast && styles.calendarDayWeekend,
          ]}>
            {day}
          </Text>
        </TouchableOpacity>
      );
    }

    return cells;
  };

  const getTypeIcon = (type: string) => {
    if (type === 'video') return <Video size={14} color={Colors.primary} />;
    if (type === 'telefon') return <Phone size={14} color={Colors.primary} />;
    return <MessageCircle size={14} color={Colors.primary} />;
  };

  if (showAppointments) {
    return (
      <View style={[styles.root, { paddingTop: insets.top }]}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => setShowAppointments(false)} testID="appt-back">
            <ArrowLeft size={20} color={Colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Randevularım</Text>
          <View style={{ width: 38 }} />
        </View>

        <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          {appointments.length === 0 ? (
            <View style={styles.emptyState}>
              <Calendar size={48} color={Colors.border} />
              <Text style={styles.emptyTitle}>Henüz randevunuz yok</Text>
              <Text style={styles.emptySub}>Uzmanlardan birini seçerek randevu oluşturabilirsiniz.</Text>
            </View>
          ) : (
            <>
              <Text style={styles.sectionTitle}>Yaklaşan Randevular</Text>
              {appointments.map((appt) => {
                const dateParts = appt.date.split('-');
                const formattedDate = `${dateParts[2]} ${MONTH_NAMES[parseInt(dateParts[1], 10) - 1]} ${dateParts[0]}`;
                return (
                  <View key={appt.id} style={styles.apptCard}>
                    <View style={styles.apptDateBadge}>
                      <Text style={styles.apptDateDay}>{dateParts[2]}</Text>
                      <Text style={styles.apptDateMonth}>{MONTH_NAMES[parseInt(dateParts[1], 10) - 1].slice(0, 3)}</Text>
                    </View>
                    <View style={styles.apptInfo}>
                      <Text style={styles.apptName}>{appt.expertName}</Text>
                      <Text style={styles.apptTitle}>{appt.expertTitle}</Text>
                      <View style={styles.apptMeta}>
                        {getTypeIcon(appt.type)}
                        <Text style={styles.apptType}>{appt.type.charAt(0).toUpperCase() + appt.type.slice(1)}</Text>
                        <Clock size={12} color={Colors.textMuted} />
                        <Text style={styles.apptTime}>{appt.time}</Text>
                      </View>
                    </View>
                    <TouchableOpacity style={styles.deleteBtn} onPress={() => deleteAppointment(appt.id)}>
                      <Trash2 size={16} color={Colors.error} />
                    </TouchableOpacity>
                  </View>
                );
              })}
            </>
          )}
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} testID="back-btn">
          <ArrowLeft size={20} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Danışmanlık</Text>
        <TouchableOpacity style={styles.apptBtn} onPress={() => setShowAppointments(true)} testID="show-appointments">
          <Calendar size={18} color={Colors.primary} />
          {appointments.length > 0 && (
            <View style={styles.apptBadge}>
              <Text style={styles.apptBadgeText}>{appointments.length}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.heroBanner}>
          <Text style={styles.heroTitle}>Uzmanlarla{'\n'}Bağlantı Kur</Text>
          <Text style={styles.heroSub}>Alanında uzman kadro ile birebir görüşün</Text>
          <View style={styles.heroBadges}>
            <View style={styles.heroBadge}><Video size={13} color={Colors.primary} /><Text style={styles.heroBadgeText}>Video</Text></View>
            <View style={styles.heroBadge}><Phone size={13} color={Colors.primary} /><Text style={styles.heroBadgeText}>Telefon</Text></View>
            <View style={styles.heroBadge}><MessageCircle size={13} color={Colors.primary} /><Text style={styles.heroBadgeText}>Mesaj</Text></View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Uzmanlarımız</Text>

        {EXPERTS.map((expert) => (
          <TouchableOpacity
            key={expert.id}
            style={styles.expertCard}
            onPress={() => {
              setSelectedExpert(expert);
              setSelectedType(null);
              setSelectedDate(null);
              setSelectedTime(null);
            }}
            activeOpacity={0.85}
            testID={`expert-${expert.id}`}
          >
            <Image source={{ uri: expert.image }} style={styles.expertImg} contentFit="cover" />
            <View style={styles.expertInfo}>
              <View style={styles.expertTop}>
                <Text style={styles.expertName}>{expert.name}</Text>
                <View style={[styles.availBadge, !expert.available && styles.unavailBadge]}>
                  <Text style={[styles.availText, !expert.available && styles.unavailText]}>
                    {expert.available ? 'Müsait' : 'Meşgul'}
                  </Text>
                </View>
              </View>
              <Text style={styles.expertTitle}>{expert.title}</Text>
              <Text style={styles.expertSpecialty}>{expert.specialty}</Text>
              <View style={styles.expertMeta}>
                <Star size={13} color={Colors.gold} fill={Colors.gold} />
                <Text style={styles.expertRating}>{expert.rating}</Text>
                <Text style={styles.expertReviews}>({expert.reviews} değerlendirme)</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {selectedExpert && (
        <View style={styles.bookingOverlay}>
          <View style={[styles.bookingPanel, { paddingBottom: insets.bottom + 16 }]}>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.bookingScroll}>
              <View style={styles.bookingHeader}>
                <Text style={styles.bookingTitle}>{selectedExpert.name}</Text>
                <TouchableOpacity onPress={() => { setSelectedExpert(null); setSelectedType(null); setSelectedDate(null); setSelectedTime(null); }}>
                  <X size={20} color={Colors.textMuted} />
                </TouchableOpacity>
              </View>

              <Text style={styles.stepLabel}>1. Görüşme türü seçin</Text>
              <View style={styles.bookingBtns}>
                <TouchableOpacity
                  style={[styles.typeBtn, selectedType === 'video' && styles.typeBtnActive]}
                  onPress={() => setSelectedType('video')}
                >
                  <Video size={18} color={selectedType === 'video' ? '#fff' : Colors.primary} />
                  <Text style={[styles.typeBtnText, selectedType === 'video' && styles.typeBtnTextActive]}>Video</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.typeBtn, selectedType === 'telefon' && styles.typeBtnActive]}
                  onPress={() => setSelectedType('telefon')}
                >
                  <Phone size={18} color={selectedType === 'telefon' ? '#fff' : Colors.primary} />
                  <Text style={[styles.typeBtnText, selectedType === 'telefon' && styles.typeBtnTextActive]}>Telefon</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.typeBtn, selectedType === 'mesaj' && styles.typeBtnActive]}
                  onPress={() => setSelectedType('mesaj')}
                >
                  <MessageCircle size={18} color={selectedType === 'mesaj' ? '#fff' : Colors.primary} />
                  <Text style={[styles.typeBtnText, selectedType === 'mesaj' && styles.typeBtnTextActive]}>Mesaj</Text>
                </TouchableOpacity>
              </View>

              {selectedType && (
                <>
                  <Text style={styles.stepLabel}>2. Tarih seçin</Text>
                  <View style={styles.calendarCard}>
                    <View style={styles.calendarHeader}>
                      <TouchableOpacity onPress={prevMonth}>
                        <ChevronLeft size={20} color={Colors.text} />
                      </TouchableOpacity>
                      <Text style={styles.calendarTitle}>{MONTH_NAMES[calendarMonth]} {calendarYear}</Text>
                      <TouchableOpacity onPress={nextMonth}>
                        <ChevronRight size={20} color={Colors.text} />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.calendarDayNames}>
                      {DAY_NAMES.map((d) => (
                        <View key={d} style={styles.calendarCell}>
                          <Text style={styles.calendarDayName}>{d}</Text>
                        </View>
                      ))}
                    </View>
                    <View style={styles.calendarGrid}>
                      {renderCalendar()}
                    </View>
                  </View>
                </>
              )}

              {selectedDate && (
                <>
                  <Text style={styles.stepLabel}>3. Saat seçin</Text>
                  <View style={styles.timeGrid}>
                    {TIME_SLOTS.map((time) => (
                      <TouchableOpacity
                        key={time}
                        style={[styles.timeSlot, selectedTime === time && styles.timeSlotActive]}
                        onPress={() => setSelectedTime(time)}
                        activeOpacity={0.7}
                      >
                        <Text style={[styles.timeSlotText, selectedTime === time && styles.timeSlotTextActive]}>{time}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </>
              )}

              {selectedTime && (
                <TouchableOpacity style={styles.confirmBtn} onPress={bookConsultation} activeOpacity={0.8} testID="confirm-booking">
                  <Calendar size={18} color="#fff" />
                  <Text style={styles.confirmBtnText}>Randevuyu Onayla</Text>
                </TouchableOpacity>
              )}

              <View style={{ height: 20 }} />
            </ScrollView>
          </View>
        </View>
      )}
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
  backBtn: { width: 38, height: 38, borderRadius: 19, backgroundColor: Colors.background, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: 17, fontWeight: '700' as const, color: Colors.text },
  apptBtn: { width: 38, height: 38, borderRadius: 19, backgroundColor: Colors.primaryUltraLight, alignItems: 'center', justifyContent: 'center' },
  apptBadge: { position: 'absolute', top: -2, right: -2, backgroundColor: Colors.primary, borderRadius: 8, width: 16, height: 16, alignItems: 'center', justifyContent: 'center' },
  apptBadgeText: { color: '#fff', fontSize: 9, fontWeight: '700' as const },
  scroll: { flex: 1 },
  content: { padding: 16, paddingBottom: 32 },
  heroBanner: {
    backgroundColor: Colors.primaryUltraLight,
    borderRadius: 22,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.primaryLight,
  },
  heroTitle: { fontSize: 22, fontWeight: '800' as const, color: Colors.text, letterSpacing: -0.5, marginBottom: 6 },
  heroSub: { fontSize: 13, color: Colors.textSecondary, marginBottom: 14 },
  heroBadges: { flexDirection: 'row', gap: 8 },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: Colors.surface,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  heroBadgeText: { fontSize: 12, color: Colors.primary, fontWeight: '600' as const },
  sectionTitle: { fontSize: 17, fontWeight: '700' as const, color: Colors.text, marginBottom: 12 },
  expertCard: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: Colors.surface,
    borderRadius: 18,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  expertImg: { width: 64, height: 64, borderRadius: 20 },
  expertInfo: { flex: 1 },
  expertTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 },
  expertName: { fontSize: 14, fontWeight: '700' as const, color: Colors.text },
  availBadge: { backgroundColor: Colors.success + '20', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3 },
  unavailBadge: { backgroundColor: Colors.border },
  availText: { fontSize: 10, fontWeight: '700' as const, color: Colors.success },
  unavailText: { color: Colors.textMuted },
  expertTitle: { fontSize: 12, color: Colors.textSecondary, marginBottom: 2 },
  expertSpecialty: { fontSize: 11, color: Colors.primary, fontWeight: '600' as const, marginBottom: 5 },
  expertMeta: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  expertRating: { fontSize: 12, fontWeight: '700' as const, color: Colors.text },
  expertReviews: { fontSize: 11, color: Colors.textMuted },
  bookingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  bookingPanel: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '85%',
  },
  bookingScroll: {
    padding: 20,
  },
  bookingHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  bookingTitle: { fontSize: 18, fontWeight: '700' as const, color: Colors.text },
  stepLabel: { fontSize: 14, fontWeight: '700' as const, color: Colors.text, marginBottom: 10, marginTop: 4 },
  bookingBtns: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  typeBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: Colors.primaryUltraLight,
    borderRadius: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: Colors.primaryLight,
  },
  typeBtnActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  typeBtnText: { color: Colors.primary, fontWeight: '700' as const, fontSize: 13 },
  typeBtnTextActive: { color: '#fff' },
  calendarCard: {
    backgroundColor: Colors.background,
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
  },
  calendarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  calendarTitle: { fontSize: 15, fontWeight: '700' as const, color: Colors.text },
  calendarDayNames: { flexDirection: 'row', marginBottom: 4 },
  calendarGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  calendarCell: { width: '14.28%', alignItems: 'center', justifyContent: 'center', height: 36 },
  calendarCellSelected: { backgroundColor: Colors.primary, borderRadius: 18 },
  calendarCellToday: { backgroundColor: Colors.primaryUltraLight, borderRadius: 18 },
  calendarDayName: { fontSize: 11, fontWeight: '600' as const, color: Colors.textMuted },
  calendarDayText: { fontSize: 13, fontWeight: '600' as const, color: Colors.text },
  calendarDayPast: { color: Colors.border },
  calendarDaySelected: { color: '#fff' },
  calendarDayWeekend: { color: Colors.textMuted },
  timeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  timeSlot: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  timeSlotActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  timeSlotText: { fontSize: 13, fontWeight: '600' as const, color: Colors.text },
  timeSlotTextActive: { color: '#fff' },
  confirmBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.primary,
    borderRadius: 16,
    paddingVertical: 16,
  },
  confirmBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' as const },
  emptyState: { alignItems: 'center', justifyContent: 'center', paddingTop: 60, gap: 10 },
  emptyTitle: { fontSize: 17, fontWeight: '700' as const, color: Colors.text },
  emptySub: { fontSize: 13, color: Colors.textMuted, textAlign: 'center' },
  apptCard: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: Colors.surface,
    borderRadius: 18,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    alignItems: 'center',
  },
  apptDateBadge: {
    width: 50,
    height: 54,
    borderRadius: 14,
    backgroundColor: Colors.primaryUltraLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  apptDateDay: { fontSize: 18, fontWeight: '800' as const, color: Colors.primary },
  apptDateMonth: { fontSize: 10, fontWeight: '600' as const, color: Colors.primary },
  apptInfo: { flex: 1 },
  apptName: { fontSize: 14, fontWeight: '700' as const, color: Colors.text, marginBottom: 2 },
  apptTitle: { fontSize: 11, color: Colors.textMuted, marginBottom: 5 },
  apptMeta: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  apptType: { fontSize: 12, color: Colors.primary, fontWeight: '600' as const, marginRight: 4 },
  apptTime: { fontSize: 12, color: Colors.textMuted },
  deleteBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: Colors.error + '15',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
