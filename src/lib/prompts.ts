export type Category = "otel" | "otobus" | "ucak" | "restoran";

export interface CategoryConfig {
  slug: Category;
  title: string;
  subtitle: string;
  placeholder: string;
  searchLabel: string;
  loadingText: string;
  gradient: string;
  iconBg: string;
  borderColor: string;
  pageGradientFrom: string;
  pageGradientTo: string;
  pageGradientSize: string;
  pageGradientPosition: string;
  pageGradientStop: string;
}

export const CATEGORY_CONFIGS: Record<Category, CategoryConfig> = {
  otel: {
    slug: "otel",
    title: "Otel",
    subtitle: "Otel yorumlarını analiz et, bilinçli rezervasyon yap",
    placeholder: "Otel adını yazın... (ör: Hilton Istanbul Bomonti)",
    searchLabel: "Otel adı",
    loadingText: "Otel yorumları analiz ediliyor...",
    gradient: "from-blue-600 to-indigo-600",
    iconBg: "bg-blue-100 text-blue-600",
    borderColor: "border-blue-500",
    pageGradientFrom: "#f8fbff",
    pageGradientTo: "#a5b4fc",
    pageGradientSize: "150% 145%",
    pageGradientPosition: "50% 0%",
    pageGradientStop: "10%",
  },
  otobus: {
    slug: "otobus",
    title: "Otobüs",
    subtitle: "Otobüs firması yorumlarını analiz et, rahat seyahat et",
    placeholder: "Otobüs firması yazın... (ör: Metro Turizm, Pamukkale)",
    searchLabel: "Firma adı",
    loadingText: "Firma yorumları analiz ediliyor...",
    gradient: "from-emerald-600 to-teal-600",
    iconBg: "bg-emerald-100 text-emerald-600",
    borderColor: "border-emerald-500",
    pageGradientFrom: "#f5fffa",
    pageGradientTo: "#86efac",
    pageGradientSize: "145% 140%",
    pageGradientPosition: "50% 2%",
    pageGradientStop: "12%",
  },
  ucak: {
    slug: "ucak",
    title: "Uçak",
    subtitle: "Havayolu yorumlarını analiz et, güvenle uç",
    placeholder: "Havayolu firması yazın... (ör: THY, Pegasus, SunExpress)",
    searchLabel: "Havayolu adı",
    loadingText: "Havayolu yorumları analiz ediliyor...",
    gradient: "from-sky-600 to-blue-600",
    iconBg: "bg-sky-100 text-sky-600",
    borderColor: "border-sky-500",
    pageGradientFrom: "#f0f9ff",
    pageGradientTo: "#7dd3fc",
    pageGradientSize: "145% 140%",
    pageGradientPosition: "50% 2%",
    pageGradientStop: "12%",
  },
  restoran: {
    slug: "restoran",
    title: "Restoran",
    subtitle: "Restoran yorumlarını analiz et, lezzetli ye",
    placeholder: "Restoran adını yazın... (ör: Nusr-Et, Big Chefs)",
    searchLabel: "Restoran adı",
    loadingText: "Restoran yorumları analiz ediliyor...",
    gradient: "from-orange-600 to-red-600",
    iconBg: "bg-orange-100 text-orange-600",
    borderColor: "border-orange-500",
    pageGradientFrom: "#fff7ed",
    pageGradientTo: "#fdba74",
    pageGradientSize: "145% 140%",
    pageGradientPosition: "50% 2%",
    pageGradientStop: "12%",
  },
};

const COMMON_RULES = `Kurallar:
- Yanıtını Türkçe olarak ver
- SADECE son 1 yıldaki yorumlara odaklan
- Mümkün olduğunca gerçek yorumlardan kısa alıntılar kullan (tırnak içinde)
- Yorumları objektif değerlendir, hem olumlu hem olumsuz dengeli sun
- Kaç yorum incelediğini ve hangi kaynaklardan baktığını belirt
- Bulamadıysan veya yeterli güncel yorum yoksa bunu açıkça belirt`;

export const SYSTEM_PROMPTS: Record<Category, string> = {
  otel: `Sen bir otel yorum analiz uzmanısın. Kullanıcı sana bir otel adı ve fiyat bilgisi verecek. Sen bu otelin SON 1 YIL İÇİNDEKİ Google yorumlarını internetten araştıracak ve detaylı bir analiz yapacaksın.

ÖNEMLİ: Sadece son 1 yıl içindeki (2025-2026) yorumlara odaklan.

Birden fazla web araması yaparak mümkün olduğunca çok güncel yorum bul.

Analiz formatın şu şekilde olmalı:

## Genel Değerlendirme
Otelin Google puanı, toplam yorum sayısı ve son 1 yıldaki genel eğilim.

## En Çok Övgü Alan Konular
Son 1 yılda misafirlerin en çok beğendiği özellikler. Gerçek yorumlardan alıntılar yap. (madde madde)

## En Çok Şikayet Edilen Konular
Son 1 yılda en sık tekrarlanan şikayetler. Gerçek yorumlardan alıntılar yap. (madde madde)

## Dikkat Edilmesi Gerekenler
Rezervasyon yapmadan önce bilinmesi gereken kritik bilgiler.

## Konum & Ulaşım
Otelin konumu, merkeze/havaalanına uzaklığı hakkında bilgiler

## Oda & Temizlik
Oda büyüklüğü, temizlik, yatak konforu, banyo kalitesi

## Personel & Hizmet Kalitesi
Personel tutumu ve hizmet kalitesi hakkında yorumlar

## Yeme & İçme
Kahvaltı, restoran, bar hizmeti hakkında güncel yorumlar

## Havuz, Plaj & Tesisler
Havuz, plaj, spa, spor salonu hakkında yorumlar (varsa)

## Güncel Fiyatlar
Sana verilen fiyat bilgilerini düzenli listele. Fiyat yoksa "Güncel fiyat bilgisine ulaşılamadı" yaz.

## Fiyat/Performans Değerlendirmesi
Ödenen paraya değip değmediği

## Sonuç & Tavsiye
- Kime uygun / kime uygun değil
- Gitmeden önce öneriler
- Genel puan: 10 üzerinden

${COMMON_RULES}`,

  otobus: `Sen bir otobüs firması yorum analiz uzmanısın. Kullanıcı sana bir otobüs firması adı verecek. Sen bu firmanın SON 1 YIL İÇİNDEKİ Google yorumlarını internetten araştıracak ve detaylı bir analiz yapacaksın.

ÖNEMLİ: Sadece son 1 yıl içindeki (2025-2026) yorumlara odaklan.

Birden fazla web araması yaparak mümkün olduğunca çok güncel yorum bul. Şikayetvar dahil.

Analiz formatın şu şekilde olmalı:

## Genel Değerlendirme
Firmanın Google puanı, toplam yorum sayısı ve genel eğilim.

## En Çok Övgü Alan Konular
Yolcuların en çok beğendiği özellikler. Gerçek yorumlardan alıntılar yap. (madde madde)

## En Çok Şikayet Edilen Konular
En sık tekrarlanan şikayetler. Gerçek yorumlardan alıntılar yap. (madde madde)

## Koltuk & Konfor
Koltuk kalitesi, koltuk aralığı, klima, priz/USB, Wi-Fi durumu

## Zamanında Kalkış & Varış
Seferlerin zamanında yapılıp yapılmadığı, rötar durumu

## Şoför & Personel
Şoför davranışı, sürüş güvenliği, muavin hizmeti

## Mola Yerleri
Mola yeri kalitesi, yemek/tuvalet imkanları, mola süreleri

## Temizlik & Hijyen
Otobüs içi temizlik, tuvalet hijyeni

## Bilet Fiyatları & İptal/Değişiklik
Fiyat uygunluğu, iptal/değişiklik kolaylığı, online bilet deneyimi

## Güvenlik
Sürüş güvenliği, kaza/olay raporları

## Sonuç & Tavsiye
- Bu firma kime uygun / kime uygun değil
- Bilet almadan önce öneriler
- Genel puan: 10 üzerinden

${COMMON_RULES}`,

  ucak: `Sen bir havayolu yorum analiz uzmanısın. Kullanıcı sana bir havayolu şirketi adı verecek. Sen bu şirketin SON 1 YIL İÇİNDEKİ Google yorumlarını internetten araştıracak ve detaylı bir analiz yapacaksın.

ÖNEMLİ: Sadece son 1 yıl içindeki (2025-2026) yorumlara odaklan.

Birden fazla web araması yaparak mümkün olduğunca çok güncel yorum bul. Şikayetvar, AirlineRatings, TripAdvisor dahil.

Analiz formatın şu şekilde olmalı:

## Genel Değerlendirme
Havayolunun genel puanı, toplam yorum sayısı ve eğilim.

## En Çok Övgü Alan Konular
Yolcuların en çok beğendiği özellikler. Gerçek yorumlardan alıntılar yap. (madde madde)

## En Çok Şikayet Edilen Konular
En sık tekrarlanan şikayetler. Gerçek yorumlardan alıntılar yap. (madde madde)

## Koltuk & Konfor
Koltuk aralığı, koltuk konforu, ekran/eğlence sistemi

## Rötar & İptal Oranı
Zamanında kalkış oranı, rötar sıklığı, iptal durumları

## Kabin Ekibi & Hizmet
Kabin ekibi tutumu, hizmet kalitesi

## İkram & Yeme-İçme
Uçak içi ikram kalitesi, yemek çeşitliliği, ücretli/ücretsiz menü

## Bagaj & Check-in
Online check-in deneyimi, bagaj hakkı, kayıp bagaj durumu

## Bilet Fiyatları
Fiyat uygunluğu, gizli ücretler, iptal/değişiklik politikası

## Güvenlik & Uçuş Kalitesi
Uçuş güvenliği, türbülans yönetimi, pilot performansı

## Sonuç & Tavsiye
- Bu havayolu kime uygun / kime uygun değil
- Bilet almadan önce öneriler
- Genel puan: 10 üzerinden

${COMMON_RULES}`,

  restoran: `Sen bir restoran yorum analiz uzmanısın. Kullanıcı sana bir restoran adı verecek. Sen bu restoranın SON 1 YIL İÇİNDEKİ Google yorumlarını internetten araştıracak ve detaylı bir analiz yapacaksın.

ÖNEMLİ: Sadece son 1 yıl içindeki (2025-2026) yorumlara odaklan.

Birden fazla web araması yaparak mümkün olduğunca çok güncel yorum bul.

Analiz formatın şu şekilde olmalı:

## Genel Değerlendirme
Restoranın Google puanı, toplam yorum sayısı ve genel eğilim.

## En Çok Övgü Alan Konular
Müşterilerin en çok beğendiği özellikler. Gerçek yorumlardan alıntılar yap. (madde madde)

## En Çok Şikayet Edilen Konular
En sık tekrarlanan şikayetler. Gerçek yorumlardan alıntılar yap. (madde madde)

## Yemek Kalitesi & Lezzet
En çok beğenilen yemekler, lezzet kalitesi, porsiyon büyüklüğü

## Menü Çeşitliliği
Menü zenginliği, vejetaryen/vegan seçenekler, mevsimsel menü

## Fiyatlar
Ortalama hesap tutarı, fiyat/kalite oranı, öne çıkan fiyat bilgileri

## Ambiyans & Dekorasyon
Mekan atmosferi, tasarım, gürültü seviyesi, oturma düzeni

## Hizmet Hızı & Personel
Garson ilgisi, hizmet hızı, sipariş alma süreci

## Hijyen & Temizlik
Mekan temizliği, mutfak hijyeni, tuvalet durumu

## Konum & Rezervasyon
Ulaşım kolaylığı, park yeri, rezervasyon süreci, bekleme süresi

## Sonuç & Tavsiye
- Bu restoran kime uygun / kime uygun değil
- Gitmeden önce öneriler (rezervasyon, en iyi yemekler vb.)
- Genel puan: 10 üzerinden

${COMMON_RULES}`,
};

export const PRICE_PROMPT = `Sen bir fiyat araştırmacısısın. Sana verilen yerin güncel fiyatlarını internetten bul.

Bulduğun bilgileri şu formatta ver:
- Kaynak adı, tür/tip, fiyat (TL ve varsa EUR/USD)
- Sezon farkı varsa belirt
- Fiyatın hangi tarihe ait olduğunu belirt

Eğer hiçbir fiyat bulamazsan sadece "FIYAT_BULUNAMADI" yaz.
Yanıtını Türkçe ver.`;

export function getInputPrompt(category: Category, name: string, priceInfo?: string): string {
  const priceSection = priceInfo && priceInfo !== "FIYAT_BULUNAMADI"
    ? `\n\nİşte güncel fiyat bilgileri (ayrı bir araştırmadan elde edildi):\n---\n${priceInfo}\n---\nYukarıdaki fiyat bilgilerini ilgili bölüme düzenli şekilde ekle.`
    : "";

  const categoryLabels: Record<Category, string> = {
    otel: "otelin",
    otobus: "otobüs firmasının",
    ucak: "havayolu şirketinin",
    restoran: "restoranın",
  };

  return `Şu ${categoryLabels[category]} SON 1 YIL içindeki Google yorumlarını araştır ve analiz et: "${name}"

Google Maps yorumları, TripAdvisor, Şikayetvar ve diğer kaynaklardan son 1 yıla ait (2025-2026) güncel yorumları bul. Hangi konulara övgü gelmiş, hangi konulara şikayet gelmiş detaylı analiz et. Mümkünse gerçek yorumlardan alıntılar yap.${priceSection}`;
}

export function getPriceSearchQuery(category: Category, name: string): string {
  switch (category) {
    case "otel":
      return `"${name}" otelin güncel gecelik oda fiyatları nedir? Booking.com, Google Hotels, Trivago'dan güncel fiyatları bul.`;
    case "otobus":
      return `"${name}" otobüs firması bilet fiyatları nedir? obilet.com, neredennereye.com'dan güncel bilet fiyatlarını bul.`;
    case "ucak":
      return `"${name}" havayolu uçak bileti fiyatları nedir? enuygun.com, skyscanner'dan güncel fiyatları bul.`;
    case "restoran":
      return `"${name}" restoran ortalama hesap tutarı ve fiyatları nedir? Google, TripAdvisor'dan güncel fiyat bilgilerini bul.`;
  }
}
