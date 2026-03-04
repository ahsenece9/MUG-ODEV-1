export interface AppNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'reminder' | 'news' | 'message' | 'alert';
}

export const NOTIFICATIONS: AppNotification[] = [
  {
    id: 'n1',
    title: 'Haftalık Kontrol Hatırlatması',
    message: 'Bu hafta doktor kontrolünüzü yaptırmayı unutmayın.',
    time: '30 dakika önce',
    read: false,
    type: 'reminder',
  },
  {
    id: 'n2',
    title: 'Yeni Ders Eklendi',
    message: '"Doğuma Hazırlık Temelleri" kursuna yeni bir ders eklendi.',
    time: '2 saat önce',
    read: false,
    type: 'news',
  },
  {
    id: 'n3',
    title: 'Forumdaki Sorunuza Yanıt',
    message: 'Dr. Ayşe Kaya sorunuzu yanıtladı.',
    time: '5 saat önce',
    read: false,
    type: 'message',
  },
  {
    id: 'n4',
    title: 'Demir Takviyesi Saati',
    message: 'Günlük demir takviyanizi almayı unutmayın.',
    time: '1 gün önce',
    read: true,
    type: 'alert',
  },
  {
    id: 'n5',
    title: 'Yeni Blog Yazısı',
    message: '"Hamilelikte Yoga" hakkında yeni bir yazı yayınlandı.',
    time: '1 gün önce',
    read: true,
    type: 'news',
  },
  {
    id: 'n6',
    title: 'Anket Bekleniyor',
    message: 'Bu ayki memnuniyet anketini doldurmayı unutmayın.',
    time: '2 gün önce',
    read: true,
    type: 'reminder',
  },
];
