# Hamilelik Rehberim

Hamilelik sürecinde annelere rehberlik eden, kapsamlı bir mobil uygulama.

## Uygulama Hakkında

**Hamilelik Rehberim**, hamilelik ve doğuma hazırlık sürecinde annelerin ihtiyaç duyduğu bilgilere kolayca ulaşmasını sağlayan bir mobil uygulamadır. Eğitim videoları, blog yazıları, forum, alışveriş listesi, yol haritası ve danışmanlık gibi birçok özellik sunar.

**Platform**: iOS, Android ve Web
**Framework**: Expo Router + React Native

## Özellikler

- **Ana Sayfa** — Kişiselleştirilmiş karşılama, hızlı ipuçları ve alışveriş listesi özeti
- **Kurslar** — Hamilelik ve doğuma hazırlık konulu gerçek YouTube eğitim videoları
- **Blog** — Hamilelik ile ilgili bilgilendirici yazılar, beğeni ve yorum desteği
- **Forum** — Diğer kullanıcıların gönderilerini okuma, yorum yapma ve tartışma
- **Bildirimler** — Uygulama içi bildirim sistemi (okundu/okunmadı takibi)
- **Alışveriş Listesi** — Bebek ve hamilelik ihtiyaçları için kontrol listesi
- **Yol Haritası** — Hamilelik yolculuğunu adım adım takip etme
- **Ev Ödevi** — İnteraktif görev listesi (kalıcı kayıt)
- **Danışmanlık** — Uzmanlarla randevu oluşturma (tarih seçimli)
- **Anket ve İletişim** — Geri bildirim ve iletişim formları
- **Kullanıcı Profili** — Ad soyad ve kullanıcı adı düzenleme

## Yerelde Çalıştırma

### Gereksinimler

- [Node.js](https://github.com/nvm-sh/nvm) (v18 veya üzeri)
- [Bun](https://bun.sh/docs/installation) paket yöneticisi
- Telefonda test için: [Expo Go](https://expo.dev/go) uygulaması (iOS veya Android)

### Kurulum

```bash
# 1. Projeyi klonlayın
git clone <REPO_URL>

# 2. Proje dizinine girin
cd <PROJE_KLASORU>

# 3. Bağımlılıkları yükleyin
bun install

# 4. Tarayıcıda çalıştırmak için (web önizleme)
bun run start-web

# 5. Telefonda çalıştırmak için
bun run start
# Terminalde QR kodu çıkacaktır.
# Expo Go uygulamasını açıp QR kodu taratın.
```

### Telefonda Test Etme

1. **iOS**: App Store'dan [Expo Go](https://apps.apple.com/app/expo-go/id982107779) indirin
2. **Android**: Google Play'den [Expo Go](https://play.google.com/store/apps/details?id=host.exp.exponent) indirin
3. `bun run start` komutunu çalıştırın ve terminaldeki QR kodu telefonunuzla taratın
4. Telefonunuz ve bilgisayarınız aynı WiFi ağında olmalıdır

> **Not**: Farklı ağlardaysanız tunnel modunu kullanabilirsiniz — `bun run start` komutu otomatik olarak tunnel kullanır.

### Simülatörde Test Etme

Xcode (iOS) veya Android Studio kuruluysa:

```bash
# iOS Simülatör
bun run start -- --ios

# Android Emülatör
bun run start -- --android
```

## Kullanılan Teknolojiler

- **React Native** — Meta tarafından geliştirilen çapraz platform mobil framework
- **Expo (SDK 54)** — React Native üzerine kurulu geliştirme platformu
- **Expo Router** — Dosya tabanlı yönlendirme sistemi
- **TypeScript** — Tip güvenli JavaScript
- **React Query** — Sunucu durum yönetimi
- **AsyncStorage** — Yerel veri saklama
- **Lucide React Native** — İkon kütüphanesi
- **React Native WebView** — Video oynatma (YouTube)

## Proje Yapısı

```
├── app/                        # Uygulama ekranları (Expo Router)
│   ├── (tabs)/                 # Sekme navigasyonu
│   │   ├── _layout.tsx         # Sekme düzeni
│   │   ├── index.tsx           # Ana Sayfa
│   │   ├── courses.tsx         # Kurslar
│   │   ├── blog.tsx            # Blog
│   │   ├── forum.tsx           # Forum
│   │   └── notifications.tsx   # Bildirimler
│   ├── _layout.tsx             # Kök düzen
│   ├── about.tsx               # Hakkında
│   ├── consultation.tsx        # Danışmanlık
│   ├── contact.tsx             # İletişim
│   ├── homework.tsx            # Ev Ödevi
│   ├── quicktips.tsx           # Hızlı İpuçları
│   ├── roadmap.tsx             # Yol Haritası
│   ├── shoppinglist.tsx        # Alışveriş Listesi
│   ├── survey.tsx              # Anket
│   └── consent.tsx             # Onay Formu
├── components/                 # Paylaşılan bileşenler
├── constants/                  # Sabitler (renkler vb.)
├── context/                    # Durum yönetimi (Context)
├── mocks/                      # Örnek veriler
├── assets/                     # Görseller ve ikonlar
├── app.json                    # Expo yapılandırması
├── package.json                # Bağımlılıklar
└── tsconfig.json               # TypeScript yapılandırması
```

## Sorun Giderme

| Sorun | Çözüm |
|-------|-------|
| Uygulama telefonda açılmıyor | Telefon ve bilgisayarın aynı WiFi ağında olduğundan emin olun |
| Bağımlılık hatası | `rm -rf node_modules && bun install` |
| Önbellek sorunu | `bunx expo start --clear` |
| Metro bundler hatası | Terminali kapatıp `bun run start` ile yeniden başlatın |

## Mağazaya Yayınlama

### iOS (App Store)

```bash
bun i -g @expo/eas-cli
eas build:configure
eas build --platform ios
eas submit --platform ios
```

### Android (Google Play)

```bash
eas build --platform android
eas submit --platform android
```

Detaylı bilgi: [Expo Deployment Docs](https://docs.expo.dev/submit/introduction/)

## Lisans

Bu proje özel kullanım içindir.
