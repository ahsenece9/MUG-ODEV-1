export interface Lesson {
  id: string;
  title: string;
  duration: string;
  thumbnail: string;
  description: string;
  videoId: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  instructorTitle: string;
  cover: string;
  totalLessons: number;
  totalDuration: string;
  lessons: Lesson[];
}

export const COURSES: Course[] = [
  {
    id: '1',
    title: 'Doğuma Hazırlık Temelleri',
    description: 'Doğum sürecini anlamak ve hazırlıklı olmak için kapsamlı bir rehber.',
    instructor: 'Ebe Saadet Yılmaz',
    instructorTitle: 'Uzman Ebe',
    cover: 'https://images.unsplash.com/photo-1559599101-f09722fb4948?w=800&q=80',
    totalLessons: 5,
    totalDuration: '56dk',
    lessons: [
      { id: 'l1', title: 'Ders - 1: Doğuma Giriş', duration: '04:17', thumbnail: 'https://images.unsplash.com/photo-1559599101-f09722fb4948?w=400&q=80', description: 'Doğum sürecine genel bir bakış ve temel kavramlar.', videoId: '1QXTAl2oN9E' },
      { id: 'l2', title: 'Ders - 2: Erken Doğum Belirtileri', duration: '04:24', thumbnail: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80', description: 'Erken doğum belirtilerini nasıl tanıyacaksınız?', videoId: 'N-dZ04nbbtI' },
      { id: 'l3', title: 'Ders - 3: Nefes Teknikleri', duration: '07:29', thumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&q=80', description: 'Doğum sırasında kullanılan nefes egzersizleri.', videoId: 'ECDObrvjVlI' },
      { id: 'l4', title: 'Ders - 4: Doğuma Hazırlık Süreci', duration: '07:33', thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&q=80', description: 'Gebelik ve doğuma hazırlık sürecinde bilmeniz gerekenler.', videoId: '0_z0oqZyHq8' },
      { id: 'l5', title: 'Ders - 5: Doğuma Hazırlık Rehberi', duration: '28:01', thumbnail: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=400&q=80', description: 'Doğuma hazırlık sürecinde kapsamlı rehber.', videoId: 'gP7A3vQo-Ow' },
    ],
  },
  {
    id: '2',
    title: 'Prenatal Beslenme',
    description: 'Hamilelikte doğru beslenme rehberi.',
    instructor: 'Dyt. Merve Şahin',
    instructorTitle: 'Klinik Diyetisyen',
    cover: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80',
    totalLessons: 3,
    totalDuration: '32dk',
    lessons: [
      { id: 'l6', title: 'Ders - 1: Hamilelikte Besin Grupları', duration: '08:36', thumbnail: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80', description: 'Hangi besin gruplarından ne kadar tüketmelisiniz?', videoId: 'RA1XFhuVAXQ' },
      { id: 'l7', title: 'Ders - 2: Kaçınılması Gereken Yiyecekler', duration: '05:53', thumbnail: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&q=80', description: 'Hamilelikte uzak durulması gereken besinler.', videoId: 'AjMqo5RveEo' },
      { id: 'l8', title: 'Ders - 3: Fonksiyonel Beslenme', duration: '44:44', thumbnail: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80', description: 'Gebelikte fonksiyonel beslenme rehberi.', videoId: 'vf2LWZvXmRs' },
    ],
  },
  {
    id: '3',
    title: 'Bebek Bakımı Temelleri',
    description: 'Yeni doğan bakımında bilmeniz gereken her şey.',
    instructor: 'Hm. Canan Demir',
    instructorTitle: 'Çocuk Hemşiresi',
    cover: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&q=80',
    totalLessons: 2,
    totalDuration: '28dk',
    lessons: [
      { id: 'l9', title: 'Ders - 1: Yenidoğan Bakımı', duration: '02:28', thumbnail: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=400&q=80', description: 'Yenidoğan bebek bakımı nasıl yapılır?', videoId: 'gzAzSKdZU_E' },
      { id: 'l10', title: 'Ders - 2: Emzirme Teknikleri', duration: '04:00', thumbnail: 'https://images.unsplash.com/photo-1559599101-f09722fb4948?w=400&q=80', description: 'Yenidoğan bebek nasıl emzirilir?', videoId: 'gMvvjJm5MCg' },
    ],
  },
];
