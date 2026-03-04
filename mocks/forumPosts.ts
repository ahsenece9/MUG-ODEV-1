export interface ForumReply {
  id: string;
  author: string;
  avatar: string;
  message: string;
  date: string;
  likes: number;
}

export interface ForumPost {
  id: string;
  title: string;
  message: string;
  author: string;
  avatar: string;
  date: string;
  image?: string;
  replies: number;
  views: number;
  tag: string;
  replyList?: ForumReply[];
}

export const FORUM_POSTS: ForumPost[] = [
  {
    id: 'p1',
    title: '28. Haftada Bel Ağrısı Normal Mi?',
    message: 'Merhaba, 28. haftadayım ve son birkaç gündür çok yoğun bel ağrısı yaşıyorum. Sizler de bu ağrıyı yaşadınız mı? Nasıl geçirdiniz? Özellikle geceleri uyumakta çok zorlanıyorum. Doktorum egzersiz önerdi ama hangi egzersizlerin güvenli olduğunu bilmiyorum. Yardımcı olabilir misiniz?',
    author: 'Zeynep K.',
    avatar: 'Z',
    date: '2 saat önce',
    replies: 12,
    views: 89,
    tag: 'Soru',
    replyList: [
      { id: 'r1', author: 'Dr. Ayşe Kaya', avatar: 'D', message: '28. haftada bel ağrısı oldukça yaygındır. Bebeğin büyümesiyle birlikte ağırlık merkezi değişir. Hafif yürüyüş ve hamile yogası faydalı olabilir. Şiddetli ağrılarda mutlaka doktorunuza danışın.', date: '1 saat önce', likes: 15 },
      { id: 'r2', author: 'Elif M.', avatar: 'E', message: 'Ben de aynı dönemde çok yaşadım. Hamile yastığı almak çok işe yaradı, bir de sıcak su torbası. Geçmiş olsun!', date: '1 saat önce', likes: 8 },
      { id: 'r3', author: 'Selin T.', avatar: 'S', message: 'Prenatal yoga gerçekten çok iyi geliyor. YouTube da güzel videolar var, ben her gün 20 dakika yapıyorum.', date: '45 dakika önce', likes: 5 },
    ],
  },
  {
    id: 'p2',
    title: 'Doğal Doğum Deneyimimi Paylaşıyorum',
    message: '3 gün önce doğal yoldan doğum yaptım. Süreç çok yoğundu ama inanılmaz güzeldi. Detayları merak edenlere anlatmak istedim.\n\nSabah 6 da sancılar başladı, hastaneye gittiğimde 4 cm açılmıştım. Nefes egzersizleri gerçekten çok işe yaradı. Eşim yanımdaydı ve sürekli destek oldu.\n\nÖğlen 12 civarında doğum gerçekleşti. Bebeğimi kucağıma aldığım an tüm acıları unuttum. Herkese cesaret vermek istedim, doğal doğum mümkün!',
    author: 'Elif M.',
    avatar: 'E',
    date: '5 saat önce',
    image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=400&q=80',
    replies: 34,
    views: 256,
    tag: 'Deneyim',
    replyList: [
      { id: 'r4', author: 'Hande Y.', avatar: 'H', message: 'Tebrikler! Çok cesur bir kadınsın. Nefes egzersizlerini nereden öğrendin?', date: '4 saat önce', likes: 12 },
      { id: 'r5', author: 'Ayla D.', avatar: 'A', message: 'Anne ve bebek sağlıklıysa ne mutlu! Doğum hikayeni okumak bana çok cesaret verdi.', date: '3 saat önce', likes: 20 },
    ],
  },
  {
    id: 'p3',
    title: 'Folik Asit Hangi Marka Daha İyi?',
    message: 'Doktorum folik asit yazdı ama marka konusunda tercih bıraktı. Hangi markayı kullanıyorsunuz? Fiyat performans olarak en iyisi hangisi? Ayrıca ne zaman almak gerekiyor, sabah mı akşam mı?',
    author: 'Selin T.',
    avatar: 'S',
    date: '1 gün önce',
    replies: 8,
    views: 145,
    tag: 'Soru',
    replyList: [
      { id: 'r6', author: 'Zeynep K.', avatar: 'Z', message: 'Ben Solgar kullanıyorum, doktorum da onayladı. Sabah aç karnına alıyorum.', date: '20 saat önce', likes: 6 },
      { id: 'r7', author: 'Dr. Ayşe Kaya', avatar: 'D', message: 'Folik asit markası çok kritik değil, önemli olan düzenli almak. 400mcg yeterli. Sabah kahvaltıdan önce almak emilimi artırır.', date: '18 saat önce', likes: 14 },
    ],
  },
  {
    id: 'p4',
    title: 'Prenatal Yoga Grubu Kuruyorum',
    message: 'Şehrimizdeki hamile kadınlarla haftalık yoga yapma grubunu oluşturmak istiyorum. İlgilenenler var mı? Her Cumartesi sabahı 10:00 da parkta buluşabiliriz. Deneyimli bir yoga eğitmeni de aramızda olacak.',
    author: 'Hande Y.',
    avatar: 'H',
    date: '2 gün önce',
    replies: 21,
    views: 312,
    tag: 'Etkinlik',
    replyList: [
      { id: 'r8', author: 'Elif M.', avatar: 'E', message: 'Harika bir fikir! Ben kesinlikle katılmak isterim. Hangi şehirdesiniz?', date: '1 gün önce', likes: 9 },
      { id: 'r9', author: 'Ayla D.', avatar: 'A', message: 'İstanbul Anadolu yakasındaysan ben de varım!', date: '1 gün önce', likes: 7 },
    ],
  },
  {
    id: 'p5',
    title: 'İkinci Trimester Listem',
    message: 'İkinci trimesterde yapılması gereken kontroller ve alışverişleri listeledim, umarım işinize yarar!\n\n✅ 16-20 hafta arası detaylı ultrason\n✅ Üçlü tarama testi\n✅ Diş kontrolü\n✅ Hamile kıyafetleri\n✅ Hamile yastığı\n✅ Bebek odası planlaması\n✅ Doğum hazırlık kursu kaydı',
    author: 'Ayla D.',
    avatar: 'A',
    date: '3 gün önce',
    replies: 17,
    views: 198,
    tag: 'Bilgi',
    replyList: [
      { id: 'r10', author: 'Selin T.', avatar: 'S', message: 'Çok faydalı bir liste, teşekkürler! Diş kontrolünü unutuyordum.', date: '2 gün önce', likes: 11 },
    ],
  },
];
