export interface Comment {
  id: string;
  author: string;
  avatar: string;
  text: string;
  date: string;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  readTime: number;
  likes: number;
  liked: boolean;
  author: string;
  authorTitle: string;
  date: string;
  comments: Comment[];
}

export const ARTICLES: Article[] = [
  {
    id: '1',
    title: 'Neden Yaşam Tarzımızı İyileştirmeliyiz?',
    excerpt: 'Hamilelik öncesi ve süresince sağlıklı bir yaşam tarzı benimsemek, hem anne hem de bebek için hayati önem taşır.',
    content: 'Hamilelik, bir kadının hayatındaki en özel dönemlerden biridir. Bu dönemde yapılan yaşam tarzı değişiklikleri, hem annenin hem de bebeğin sağlığı üzerinde derin etkiler bırakır. Düzenli egzersiz, dengeli beslenme ve stres yönetimi bu değişikliklerin temelini oluşturur.\n\nAraştırmalar, hamilelik öncesi ve sırasında sağlıklı bir yaşam tarzı benimseyen annelerin daha az komplikasyon yaşadığını göstermektedir. Günde en az 30 dakika yürüyüş yapmak, bol su içmek ve işlenmiş gıdalardan uzak durmak basit ama etkili adımlardır.\n\nStres yönetimi de hamilelikte kritik bir rol oynar. Meditasyon, prenatal yoga ve nefes egzersizleri gibi teknikler, hem annenin ruh sağlığını korur hem de bebeğin gelişimini olumlu yönde etkiler. Ayrıca yeterli uyku almak, sosyal destek ağınızı güçlendirmek ve düzenli doktor kontrollerinize gitmek de bu sürecin vazgeçilmez parçalarıdır.',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80',
    category: 'Yaşam Tarzı',
    readTime: 5,
    likes: 124,
    liked: false,
    author: 'Dr. Ayşe Kaya',
    authorTitle: 'Kadın Hastalıkları Uzmanı',
    date: '2 gün önce',
    comments: [
      { id: 'c1', author: 'Zeynep A.', avatar: 'Z', text: 'Çok faydalı bir yazı, teşekkürler!', date: '1 gün önce' },
      { id: 'c2', author: 'Fatma B.', avatar: 'F', text: 'Ben de bu değişiklikleri uyguladım, harika hissediyorum.', date: '12 saat önce' },
    ],
  },
  {
    id: '2',
    title: 'Doğurganlığı Artıran En İyi 5 Atıştırmalık',
    excerpt: 'Doğru besinleri tüketmek, doğurganlığınızı desteklemenin en doğal yollarından biridir.',
    content: 'Doğurganlığı artırmak için bazı besinler özellikle etkilidir. Ceviz, avokado, tatlı patates, yumurta ve koyu yeşil yapraklı sebzeler bu besinlerin başında gelir. Her biri farklı vitamin ve minerallerle üreme sağlığını destekler.\n\n1. Ceviz: Omega-3 yağ asitleri açısından zengindir. Sperm kalitesini artırır ve yumurta sağlığını destekler. Günde bir avuç ceviz tüketmek yeterlidir.\n\n2. Avokado: Folik asit, E vitamini ve sağlıklı yağlar içerir. Hormonal dengeyi korumaya yardımcı olur ve rahim duvarının güçlenmesine katkı sağlar.\n\n3. Tatlı Patates: Beta-karoten deposudur. Vücutta A vitaminine dönüşerek üreme sistemi sağlığını destekler.\n\n4. Yumurta: Yüksek kaliteli protein ve kolin içerir. Yumurtalama düzenliliğini destekler ve embriyo gelişimi için önemlidir.\n\n5. Koyu Yeşil Yapraklı Sebzeler: Ispanak, pazı ve kara lahana gibi sebzeler demir, folik asit ve kalsiyum açısından zengindir. Bu mineraller doğurganlık için temel yapı taşlarıdır.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80',
    category: 'Beslenme',
    readTime: 4,
    likes: 89,
    liked: false,
    author: 'Dyt. Merve Şahin',
    authorTitle: 'Klinik Diyetisyen',
    date: '4 gün önce',
    comments: [
      { id: 'c3', author: 'Elif K.', avatar: 'E', text: 'Avokado gerçekten çok faydalı, her gün yiyorum!', date: '3 gün önce' },
    ],
  },
  {
    id: '3',
    title: 'Hamilelikte Yoga: Zihin ve Beden Dengesi',
    excerpt: 'Prenatal yoga hem bedensel esnekliği artırır hem de doğum sürecini kolaylaştırır.',
    content: 'Hamilelikte yoga yapmak, kas gruplarını güçlendirmenin yanı sıra zihinsel huzur sağlar. Özellikle nefes egzersizleri, doğum sancılarıyla başa çıkmada büyük yardımcı olur.\n\nPrenatal yoga, hamilelik sürecinde hem fiziksel hem de zihinsel sağlığı destekleyen en etkili egzersiz türlerinden biridir. Düzenli yoga pratiği, bel ağrılarını hafifletir, uyku kalitesini artırır ve doğuma hazırlık sürecini kolaylaştırır.\n\nYoga sırasında öğrenilen derin nefes teknikleri, doğum anında sancıları yönetmek için çok değerlidir. Pelvik taban egzersizleri ise doğum kanalını güçlendirir ve doğum sonrası iyileşme sürecini hızlandırır.\n\nÖnemli not: Hamilelikte yoga yaparken mutlaka prenatal sertifikalı bir eğitmenle çalışmak ve doktorunuzun onayını almak gerekir. Sırtüstü pozisyonlardan ve karın bölgesine baskı yapan hareketlerden kaçınılmalıdır.',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80',
    category: 'Egzersiz',
    readTime: 6,
    likes: 201,
    liked: false,
    author: 'Emine Yıldız',
    authorTitle: 'Prenatal Yoga Eğitmeni',
    date: '1 hafta önce',
    comments: [
      { id: 'c4', author: 'Selin T.', avatar: 'S', text: '32. haftadayım, yoga sayesinde çok rahatladım.', date: '5 gün önce' },
      { id: 'c5', author: 'Ayla M.', avatar: 'A', text: 'Nefes egzersizleri inanılmaz yardımcı oldu doğumda!', date: '4 gün önce' },
    ],
  },
  {
    id: '4',
    title: 'Uyku Düzeni ve Hamilelik',
    excerpt: 'Kaliteli uyku, hamilelik boyunca annenin ve bebeğin sağlığı için vazgeçilmezdir.',
    content: 'Hamilelik sırasında uyku pozisyonu ve düzeni büyük önem taşır. Sol tarafa yatmak kan dolaşımını iyileştirir ve bebeğe besin akışını artırır.\n\nHamilelikte kaliteli uyku almak hem annenin hem de bebeğin sağlığı için kritiktir. Özellikle üçüncü trimesterde artan karın büyüklüğü nedeniyle rahat bir uyku pozisyonu bulmak zorlaşabilir.\n\nUzmanlar, hamilelikte sol tarafa yatmayı önermektedir. Bu pozisyon, alt vena kava damarı üzerindeki baskıyı azaltır ve plasentaya giden kan akışını artırır. Bacakların arasına bir yastık koymak da kalça ve bel rahatsızlığını azaltabilir.\n\nUyku hijyeni için şu önerileri uygulayabilirsiniz: Yatmadan 2 saat önce ağır yemeklerden kaçının, yatak odanızı serin ve karanlık tutun, kafein tüketimini öğleden sonra kesin ve rahatlatma teknikleri uygulayın.',
    image: 'https://images.unsplash.com/photo-1520206183501-b80df61043c2?w=800&q=80',
    category: 'Sağlık',
    readTime: 3,
    likes: 67,
    liked: false,
    author: 'Dr. Ayşe Kaya',
    authorTitle: 'Kadın Hastalıkları Uzmanı',
    date: '2 hafta önce',
    comments: [],
  },
  {
    id: '5',
    title: 'Folik Asit: Neden Bu Kadar Önemli?',
    excerpt: 'Folik asit takviyesi, bebeğin sinir sistemi gelişimi için kritik bir öneme sahiptir.',
    content: 'Folik asit, B vitamini grubuna ait suda çözünen bir vitamindir. Hamilelik öncesi ve ilk trimesterde alınması, nöral tüp defektleri riskini önemli ölçüde azaltır.\n\nFolik asit, bebeğin beyin ve omurilik gelişimi için hayati öneme sahiptir. Hamilelik planlanıyorsa, gebe kalmadan en az 3 ay önce folik asit takviyesi başlamalıdır. Günlük önerilen doz 400-800 mikrogramdır.\n\nDoğal folik asit kaynakları arasında koyu yeşil yapraklı sebzeler, baklagiller, narenciye meyveleri, tam tahıllar ve yumurta bulunur. Ancak sadece beslenmeyle yeterli miktarı almak zor olabileceğinden, doktorunuzun önerdiği takviyeyi düzenli olarak kullanmak önemlidir.\n\nFolik asit eksikliği, spina bifida ve anensefali gibi ciddi doğumsal defektlere yol açabilir. Ayrıca düşük doğum ağırlığı ve erken doğum riskini de artırabilir. Bu nedenle folik asit takviyesi, sağlıklı bir hamilelik için atılacak en önemli adımlardan biridir.',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80',
    category: 'Beslenme',
    readTime: 4,
    likes: 156,
    liked: false,
    author: 'Dyt. Merve Şahin',
    authorTitle: 'Klinik Diyetisyen',
    date: '3 hafta önce',
    comments: [
      { id: 'c6', author: 'Hande Y.', avatar: 'H', text: 'Doktorum da aynı şeyi söyledi, teşekkürler.', date: '2 hafta önce' },
    ],
  },
];
