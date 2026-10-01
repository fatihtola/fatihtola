import { WeekSession } from '../types';

export interface UnitInfo {
  id: string;
  unitNumber: number;
  title: string;
  subtitle: string;
  weekIds: string[];
}

export const CURRICULUM_UNITS: UnitInfo[] = [
  {
    id: "unit-1",
    unitNumber: 1,
    title: "1. ÜNİTE — MATERYAL ÜRETİMİ: PLATFORMLAR VE KAYNAKLI ÜRETİM",
    subtitle: "Öğretmene özel platformlar, kaynaktan materyale giden zincir, ders planı, çalışma kâğıdı, idari işler ve veri.",
    weekIds: ["hafta-1", "hafta-2", "hafta-3"]
  },
  {
    id: "unit-2",
    unitNumber: 2,
    title: "2. ÜNİTE — GÖRSEL ÜRETİM",
    subtitle: "Görsel kodlar: Bir fotoğraftan diyagram ve kesit çıkarma, 200+ görsel kod ile pedagojik şemalar.",
    weekIds: ["hafta-4"]
  },
  {
    id: "unit-3",
    unitNumber: 3,
    title: "3. ÜNİTE — YAPAY ZEKÂ DESTEKLİ WEB UYGULAMASI",
    subtitle: "Google AI Studio ile uygulama geliştirme ve GitHub/Vercel ile canlı yayına alma.",
    weekIds: ["hafta-5", "hafta-6"]
  },
  {
    id: "unit-4",
    unitNumber: 4,
    title: "4. ÜNİTE — TASARIM, SES VE GÖRÜNTÜ",
    subtitle: "3B tasarım ve baskı, seslendirme, metinden video, üretken video ile kısa film ve VR sanal gezi.",
    weekIds: ["hafta-7", "hafta-8", "hafta-9", "hafta-10", "hafta-11"]
  },
  {
    id: "unit-5",
    unitNumber: 5,
    title: "5. ÜNİTE — KODLAMA, ROBOTİK VE ELEKTRONİK",
    subtitle: "Etkileşimli içerik, mini oyun ve simülasyon, LEGO SPIKE Essential ile robotik ve Arduino ile devre tasarımı.",
    weekIds: ["hafta-12", "hafta-13", "hafta-14"]
  },
  {
    id: "unit-6",
    unitNumber: 6,
    title: "6. ÜNİTE — SUNUM VE GÖRSELLEŞTİRME",
    subtitle: "Gamma, Napkin ve Jeda ile sunum, süreç görselleştirme, dönem sonu portfolyo ve kapanış.",
    weekIds: ["hafta-15"]
  }
];

export const HAZIRLIK_OTURUMU = {
  weekNumber: 0,
  title: "Yapay zekâya giriş, güçlü istem ve günlük hayat",
  topic: "Hazırlık · Giriş ve güçlü istem",
  appChain: "→ ChatGPT → Gemini → Claude → Win+H",
  duration: "40 Dakika (İsteğe Bağlı)",
  summary: "Üretken yapay zekânın eğitimdeki temelleri, olasılık motorları, RGBF (Rol-Görev-Bağlam-Format) formülü, sesle hızlı yazdırma (Win+H) ve büyük dil modellerinin (ChatGPT, Gemini, Claude) pedagojik karşılaştırması.",
  keyApps: ["ChatGPT", "Gemini", "Claude", "Win+H (Sesle Yazdırma)"],
  highlights: [
    "RGBF Formülü: Rol (Karakter), Görev (Ne istiyorsun), Bağlam (Öğrenci seviyesi vb.), Format (Çıktı biçimi).",
    "Win+H ile Hızlı İstem: Mikrofonla Türkçe konuşarak anında metne dökme ve zaman tasarrufu sağlama.",
    "Büyük Dil Modelleri Karşılaştırması: ChatGPT, Gemini ve Claude'un sınıf içi hazırlıklarda güçlü yönleri."
  ]
};

export const INITIAL_WEEKS: WeekSession[] = [
  {
    id: "hafta-1",
    weekNumber: 1,
    unitName: "1. ÜNİTE — MATERYAL ÜRETİMİ: PLATFORMLAR VE KAYNAKLI ÜRETİM",
    title: "Hafta 1 · Brisk, Curipod, MagicSchool, Eduaide ve Diffit",
    topic: "Öğretmene özel platformlar",
    appChain: "→ Brisk → Curipod → MagicSchool → Eduaide → Diffit → Wayground → Twee",
    duration: "40 Dakika (1 Ders Saati)",
    category: "icerik",
    targetOutput: "Öğretmen asistanlarıyla türetilmiş 1 ünite ders paketi + akıllı tahta Curipod sunumu",
    summary: "Doğrudan öğretmenler için geliştirilmiş uzman yapay zekâ platformları ekosistemi. Chrome eklentisi Brisk ile internetteki herhangi bir makale veya YouTube videosundan tek tıkla seviyelendirilmiş materyal ve test çıkarma; Curipod ile akıllı tahtada canlı etkileşimli sunum; MagicSchool, Eduaide ve Diffit ile 60+ branş asistanı; Wayground ve Twee ile ders aktiviteleri kurgulama.",
    learningOutcomes: [
      "Brisk eklentisi ile web sayfalarını ve YouTube videolarını anında seviyelendirilmiş çalışma fasikülüne dönüştürür.",
      "Curipod ile öğrencilerin cep telefonu veya tahtadan katıldığı canlı çizim, anket ve açık uçlu etkinlikler hazırlar.",
      "MagicSchool, Eduaide ve Diffit platformlarının hazır pedagojik şablonlarını kullanarak farklılaştırılmış ders paketleri kurgular."
    ],
    sessionFlow: [
      { minuteRange: "00-08 dk", activity: "Öğretmene Özel Platformların Gücü", description: "Genel yapay zekâ yerine eğitim dikeyindeki platformların sağladığı hazır pedagojik şablonlar." },
      { minuteRange: "08-18 dk", activity: "Brisk Teaching ile 1 Tıkla Materyal", description: "Bir MEB haberinden veya videodan farklı okuma seviyelerinde quiz ve özet çıkarma." },
      { minuteRange: "18-28 dk", activity: "Curipod ile Akıllı Tahta İnteraktif Dersi", description: "Öğrencilerin tahtaya çizim gönderdiği, fikir yazdığı canlı interaktif ders destesi üretme." },
      { minuteRange: "28-40 dk", activity: "MagicSchool, Eduaide, Diffit & Twee", description: "Rubrik, BEP planı, seviyeli okuma kâğıdı ve video aktivitesi maratonu." }
    ],
    keyTools: [
      { name: "Brisk Teaching", url: "https://www.briskteaching.com", purpose: "Tarayıcı eklentisi ile anında farklılaştırılmış materyal çıkarma" },
      { name: "Curipod", url: "https://curipod.com", purpose: "Canlı öğrenci etkileşimli akıllı tahta sunumları ve anketler" },
      { name: "MagicSchool.ai", url: "https://magicschool.ai", purpose: "60+ hazır pedagojik öğretmen asistanı" },
      { name: "Eduaide.Ai", url: "https://www.eduaide.ai", purpose: "Ders planı, ünite tasarımı ve pedagojik oyunlaştırma" },
      { name: "Diffit", url: "https://web.diffit.me", purpose: "Her konuyu her sınıf seviyesine uygun çalışma kâğıdına dönüştürme" },
      { name: "Wayground / Twee", url: "https://twee.com", purpose: "YouTube videosundan soru ve ders aktivitesi türetme" }
    ],
    practicalExercise: "Brisk veya Diffit kullanarak dersinizin bir konusu için 3 kademeli bir okuma fasikülü üretin; ardından Curipod'da 5 slaytlık interaktif bir akıllı tahta etkinliği oluşturun.",
    samplePrompt: "Eduaide / MagicSchool İstemi: 'Branş: [Branşınız]. Sınıf Düzeyi: [Sınıf]. Konu: [Konu Başlığı]. Bu konu için öğrencilerin ilgisini çekecek 1 adet gerçek hayat vaka senaryosu, 3 adet basamaklı tartışma sorusu ve 1 adet eğlenceli çıkış bileti (exit ticket) etkinliği hazırla.'",
    materials: [
      { title: "Öğretmene Özel Yapay Zekâ Platformları Karşılaştırma Tablosu", type: "belge" },
      { title: "Brisk Teaching Kurulum ve Kullanım Rehberi", type: "link" },
      { title: "Diffit ile Farklılaştırılmış Materyal Hazırlama", type: "belge" }
    ],
    notes: "Öğretmen platformlarının çoğu ücretsiz öğretmen hesabı (MEB e-posta uzantısıyla) sunmaktadır."
  },
  {
    id: "hafta-2",
    weekNumber: 2,
    unitName: "1. ÜNİTE — MATERYAL ÜRETİMİ: PLATFORMLAR VE KAYNAKLI ÜRETİM",
    title: "Hafta 2 · Consensus + ChatGPT + NotebookLM: Kaynaktan materyale",
    topic: "Kaynaktan materyale giden zincir",
    appChain: "→ Consensus → ChatGPT/Gemini → NotebookLM → Perplexity",
    duration: "40 Dakika (1 Ders Saati)",
    category: "temel",
    targetOutput: "Kaynaklı bilgi notu + çalışma rehberi + iki sunuculu sesli özet (podcast)",
    summary: "Geleneksel internet aramasından kaynaklı ve doğrulanmış yapay zekâ üretimine geçiş zinciri. Consensus ile 200M+ akademik makaleden doğrudan bilimsel konsensüs çekme, ChatGPT veya Gemini ile sınıf seviyesine uyarlama, NotebookLM ile sıfır halüsinasyonlu ders notu ve iki sunuculu sesli podcast (Audio Overview) üretimi; Perplexity ile kaynaklı doğrulama.",
    learningOutcomes: [
      "Akademik arama motoru Consensus ile MEB kazanımlarına dair bilimsel araştırmalara ve konsensüs verisine ulaşır.",
      "Büyük dil modellerinin ürettiği bilgiyi akademik kaynaklarla çapraz doğrulama (fact-checking) becerisi kazanır.",
      "NotebookLM'e PDF ve kaynak metinleri yükleyerek yalnızca bu kaynaklara dayanan soru-cevap rehberi ve iki sunuculu sesli podcast (Audio Overview) türetir."
    ],
    sessionFlow: [
      { minuteRange: "00-08 dk", activity: "Kaynaklı Üretim Mantığı & Halüsinasyon Riski", description: "Büyük dil modellerinde kaynak göstermeme sorunu ve Consensus / Perplexity felsefesi." },
      { minuteRange: "08-20 dk", activity: "Consensus ile Bilimsel Araştırma", description: "Ders konusuyla ilgili bir araştırma sorusu sorma (örn: 'Uykunun öğrenmeye etkisi nedir?') ve akademik konsensüs alma." },
      { minuteRange: "20-30 dk", activity: "ChatGPT / Gemini ile Pedagojik Uyarlama", description: "Akademik konsensüs metnini öğrenci sınıf düzeyine uygun 3 maddelik bilgi kartına dönüştürme." },
      { minuteRange: "30-40 dk", activity: "NotebookLM ile Çalışma Rehberi & Podcast", description: "Elde edilen metinleri NotebookLM'e yükleyip sıfır halüsinasyonlu çalışma rehberi ve sesli özet üretme." }
    ],
    keyTools: [
      { name: "Consensus", url: "https://consensus.app", purpose: "200M+ akademik makalede arama ve bilimsel konsensüs metre" },
      { name: "ChatGPT", url: "https://chatgpt.com", purpose: "Pedagojik dil sadeleştirme ve öğrenci bilgi kartı kurgulama" },
      { name: "Gemini", url: "https://gemini.google.com", purpose: "Google Ekosistemi ve geniş bağlamlı araştırma" },
      { name: "NotebookLM", url: "https://notebooklm.google.com", purpose: "Kaynak bazlı sıfır halüsinasyonlu ders notu ve sesli podcast üretimi" },
      { name: "Perplexity", url: "https://perplexity.ai", purpose: "Gerçek zamanlı kaynaklı arama motoru ve çapraz doğrulama" }
    ],
    practicalExercise: "Kendi branşınızda merak edilen veya tartışmalı bir konuyu Consensus'ta aratın; elde ettiğiniz akademik sonucu ChatGPT ile 100 kelimelik öğrenci bilgi notuna çevirip NotebookLM'de sesli özete dönüştürün.",
    samplePrompt: "Rol: Pedagojik İçerik Uzmanı.\nMetin: [Consensus'tan alınan akademik özet]\nGörev: Bu akademik bilgiyi [Sınıf Seviyesi] öğrencilerinin seviyesine uyarla. 3 maddelik açık bir özet, 1 somut günlük hayat benzetmesi ve öğrencilere yöneltilecek 1 düşündürücü soru hazırla.\nFormat: Markdown kart formatında, anlaşılır başlıklarla sun.",
    materials: [
      { title: "Consensus Akademik Arama ve Filtreleme Kılavuzu", type: "belge" },
      { title: "NotebookLM Kaynak Ekleme ve Podcast Oluşturma Rehberi", type: "link" }
    ],
    notes: "NotebookLM'e yüklenen kaynakların telif ve doğruluk denetimi öğretmen gözetiminde yapılmalıdır."
  },
  {
    id: "hafta-3",
    weekNumber: 3,
    unitName: "1. ÜNİTE — MATERYAL ÜRETİMİ: PLATFORMLAR VE KAYNAKLI ÜRETİM",
    title: "Hafta 3 · Claude: Ders planı, çalışma kâğıdı, idari işler ve veri",
    topic: "Ders planı, çalışma kâğıdı, idari işler",
    appChain: "→ Claude → ChatGPT/Gemini → Diffit → Excel",
    duration: "40 Dakika (1 Ders Saati)",
    category: "temel",
    targetOutput: "40 dk 5E ders planı + kademeli çalışma kâğıdı + sentetik veri not tablosu (Excel formatında)",
    summary: "Claude'un 200.000 tokenlik devasa bağlam hafızası ve üstün Türkçe pedagojik üslubu ile MEB müfredatına tam uyumlu 5E ders planları kurgulama, Diffit ve Claude ile farklılaştırılmış seviyeli çalışma kâğıtları üretme, idari zümre tutanaklarını düzenleme, sınıfta kullanılmak üzere sentetik öğrenci/deney verisi üretip Excel'e aktarma.",
    learningOutcomes: [
      "Claude'un büyük bağlam penceresini kullanarak onlarca sayfalık müfredat dokümanını tek seferde analiz eder ve 5E planı türetir.",
      "Aynı konuyu farklı seviyelerdeki öğrenciler için kademeli çalışma kâğıdına dönüştürür.",
      "Excel ve Google E-Tablolar için öğrencilerin analiz edebileceği tutarlı sentetik veri tabloları oluşturur."
    ],
    sessionFlow: [
      { minuteRange: "00-08 dk", activity: "Claude'un Mimarisi & Türkçe Pedagojik Üslup", description: "Büyük bağlam hafızası, pedagojik empati ve prompt yapılandırma." },
      { minuteRange: "08-20 dk", activity: "5E Ders Planı ve Kademeli Çalışma Kâğıdı", description: "MEB kazanım kodunu girerek 40 dakikalık 5E ders planı ve seviyeli etkinlik üretme." },
      { minuteRange: "20-30 dk", activity: "İdari İşler & Zümre Kararları Düzenleme", description: "Zümre tutanağını veya yıllık planı yükleyip eylem tablosuna ve özet raporlara çevirme." },
      { minuteRange: "30-40 dk", activity: "Sentetik Veri Üretimi & Excel Entegrasyonu", description: "Öğrenci sınav veya deney verilerini CSV/Excel formatında üretip analiz etme." }
    ],
    keyTools: [
      { name: "Claude AI", url: "https://claude.ai", purpose: "200k token bağlam, Artifacts arayüzü ve üstün Türkçe pedagojik üslup" },
      { name: "ChatGPT", url: "https://chatgpt.com", purpose: "Ders planı ve idari tablo biçimlendirme alternatifleri" },
      { name: "Diffit", url: "https://web.diffit.me", purpose: "Farklılaştırılmış kademeli çalışma kâğıdı şablonları" },
      { name: "Excel / E-Tablolar", url: "https://sheets.google.com", purpose: "Sentetik not listesi ve başarı analizi tablosu" }
    ],
    practicalExercise: "Önümüzdeki hafta işleyeceğiniz kazanım için Claude ile 40 dakikalık bir 5E ders planı, Diffit ile 1 adet kademeli çalışma kâğıdı ve sınıfta analiz ettireceğiniz 15 satırlık sentetik bir veri tablosu oluşturun.",
    samplePrompt: "Rol: Kıdemli Öğretim Tasarımcısı ve MEB Müfredat Uzmanı.\nKazanım: [Ders] dersi, [Sınıf] seviyesinde '[Kazanım Kodu/Adı]'.\nGörev:\n1. 40 dakikalık 5E modeli ders planı hazırla (Giriş 5dk, Keşfetme 15dk, Açıklama 10dk, Derinleştirme 7dk, Değerlendirme 3dk).\n2. Bu derste dağıtılacak 1 sayfalık çalışma kâğıdı hazırla.\n3. Öğrencilerin derste grafik çizebilmesi için 15 satırlık gerçekçi bir sentetik veri tablosu oluştur (CSV formatında).",
    materials: [
      { title: "5E Modeli Ders Planı Şablonu (Word)", type: "sablon" },
      { title: "Sentetik Veri ve Excel Analiz Rehberi", type: "belge" }
    ],
    notes: "İdari dokümanlar işlenirken öğrenci ve öğretmen adlarının gizliliğine dikkat edilmelidir."
  },
  {
    id: "hafta-4",
    weekNumber: 4,
    unitName: "2. ÜNİTE — GÖRSEL ÜRETİM",
    title: "Hafta 4 · Görsel kodlar: Bir fotoğraftan diyagram ve kesit",
    topic: "Görsel kodlar",
    appChain: "→ ChatGPT/Gemini Görsel → 200+ Görsel Kod",
    duration: "40 Dakika (1 Ders Saati)",
    category: "multimodal",
    targetOutput: "Etiketli kesit/şema + infografik sınıf afişi + kişisel görsel kod listesi",
    summary: "Fotoğraf ve çizimlerden pedagojik diyagram, kesit ve infografik üretme sanatı. ChatGPT ve Gemini Görsel (Vision) yeteneklerini kullanarak gerçek bir nesne veya çizimden parçaları numaralandırılmış şemalar çıkarma; 200+ görsel kod kütüphanesi ile stil, açı, ışık ve doku parametrelerini yönetme.",
    learningOutcomes: [
      "Multimodal yapay zekâya fotoğraf yükleyerek içindeki organ, parça veya yapıları etiketli diyagramlara dönüştürür.",
      "200+ görsel kod parametresini (kesit, izometrik, vektörel, infografik, makro) ders materyallerine uygular.",
      "Soyut kavramları görselleştirerek öğrencilerin bilişsel yükünü hafifleten eğitim panoları tasarlar."
    ],
    sessionFlow: [
      { minuteRange: "00-08 dk", activity: "Görsel Kod Mantığı & Multimodal Zekâ", description: "Bir fotoğrafı sınıf içi şemaya dönüştürmenin pedagojik faydaları ve görsel kod parametreleri." },
      { minuteRange: "08-20 dk", activity: "Fotoğraftan Diyagram ve Kesit Türetme", description: "Biyoloji hücresi, motor parçası, tarihi yapı veya coğrafi yer şeklini AI'ya yükleyip açıklamalı kesit çıkarma." },
      { minuteRange: "20-30 dk", activity: "200+ Görsel Kod ile İstem Zenginleştirme", description: "Stil, açı, aydınlatma, vektörel çizim ve etiketleme kodlarının promptlara entegrasyonu." },
      { minuteRange: "30-40 dk", activity: "Sınıf Panosu & Çıktı Formatları", description: "Yüksek çözünürlüklü çıktı alma, oklar ve etiketlerle çalışma kâğıdına yerleştirme." }
    ],
    keyTools: [
      { name: "ChatGPT Görsel (Vision)", url: "https://chatgpt.com", purpose: "Görsel analiz, parça etiketleme ve diyagram üretimi" },
      { name: "Gemini Görsel", url: "https://gemini.google.com", purpose: "Yüksek çözünürlüklü görsel çözümleme ve ders şemaları" },
      { name: "200+ Görsel Kod Arşivi", url: "#visual-codes", purpose: "Pedagojik görsel prompt anahtar kelimeleri ve stilleri" }
    ],
    practicalExercise: "Dersinizde geçen karmaşık bir yapı veya aletin fotoğrafını yükleyin; 1 adet numaralandırılmış etiketli kesit şeması ve 200+ görsel koddan yararlanarak 1 adet infografik pano görseli türetin.",
    samplePrompt: "Görsel İstemi: 'A clear pedagogical textbook cross-section diagram of [Konu - örn: Bitki Hücresi / Kalp Kesiti / Yanardağ], labeled with pointer callouts and numbers 1 to 6, clean flat vector educational poster style, high contrast, white background, no clutter, 4k --ar 16:9'",
    materials: [
      { title: "200+ Eğitim Görsel Kod Sözlüğü (TR-EN)", type: "sablon" },
      { title: "Diyagram ve Kesit Tasarımı İpuçları", type: "belge" }
    ],
    notes: "Diyagramlarda numara ve işaretçilerin net çıkması için açık renkli ve sade arka plan tercih edilmelidir."
  },
  {
    id: "hafta-5",
    weekNumber: 5,
    unitName: "3. ÜNİTE — YAPAY ZEKÂ DESTEKLİ WEB UYGULAMASI",
    title: "Hafta 5 · Google AI Studio ile uygulama geliştirme",
    topic: "Uygulama geliştirme",
    appChain: "→ Google AI Studio → Google Stitch → v0.dev",
    duration: "40 Dakika (1 Ders Saati)",
    category: "asistan",
    targetOutput: "Çalışan Sokratik branş asistanı prototipi + modern web arayüz bileşenleri",
    summary: "Son kullanıcıdan uygulama geliştirici kimliğine geçiş. Google AI Studio arayüzünde Gemini modellerini yapılandırma: Sistem Talimatı (System Instructions) yazarak modele branş kuralları ve Sokratik davranış kazandırma, Few-Shot örnek diyaloglar ekleme; Google Stitch ve v0.dev ile modern arayüz tasarımı kodlama.",
    learningOutcomes: [
      "Sistem Talimatı (System Prompt) ile Kullanıcı İstem arasındaki temel farkı anlar ve Sokratik asistan tasarlar.",
      "Model parametrelerini (Temperature, Top-P, Güvenlik filtreleri) sınıf ortamına göre ayarlar.",
      "Google Stitch ve v0.dev ile metin komutlarından çalışan modern React ve web arayüzleri türetir."
    ],
    sessionFlow: [
      { minuteRange: "00-08 dk", activity: "AI Studio Mimarisi & Geliştirici Ortamı", description: "Chatbot vs Yapay Zekâ API'si, System Instructions ve rol modelleme." },
      { minuteRange: "08-20 dk", activity: "Google AI Studio'da Sokratik Bot Yapılandırma", description: "Modele 'Sokratik Öğretmen Asistanı' rolü verme, kuralları ve yasakları tanımlama." },
      { minuteRange: "20-30 dk", activity: "Few-Shot Örnek Diyaloglar Ekleme", description: "Öğrenci sorusu ve öğretmenin pedagojik rehber yanıtı örneklerini sisteme besleme." },
      { minuteRange: "30-40 dk", activity: "Google Stitch & v0.dev ile Web Arayüzü", description: "Asistanın web sitesinde çalışacağı buton, girdi alanı ve mesajlaşma panelini kodlatma." }
    ],
    keyTools: [
      { name: "Google AI Studio", url: "https://aistudio.google.com", purpose: "Gemini modelleriyle profesyonel prototipleme ve System Prompt tanımlama" },
      { name: "Google Stitch", url: "https://stitch.withgoogle.com", purpose: "Tasarım ve arayüz prototipleme araçları" },
      { name: "v0.dev", url: "https://v0.dev", purpose: "Metin komutlarından dakikalar içinde modern React ve Tailwind arayüzü üretme" }
    ],
    practicalExercise: "Kendi branşınız için öğrenciye cevabı direkt söylemeyen, ipuçlarıyla doğru cevabı bulduran bir 'Sokratik Asistan' sistem talimatı yazıp Google AI Studio'da test edin.",
    samplePrompt: "System Instruction (Google AI Studio): 'Sen [Branşınız] dersi için tasarlanmış şefkatli ve bilge bir Sokratik Öğretmen Asistanısın.\nKurallar:\n1. Öğrenci ne sorarsa sorsun ASLA cevabı doğrudan söyleme.\n2. Öğrencinin sorusunu parçala ve ona doğru cevabı bulduracak ilk ipucu sorusunu yönelt.\n3. Yanıtların 2 cümleyi geçmesin, samimi ve teşvik edici bir Türkçe kullan.\n4. Öğrenci doğru yanıta ulaştığında tebrik et ve pekiştirici 1 soru sor.'",
    materials: [
      { title: "Google AI Studio Sistem Talimatı (System Prompt) Tasarım Kılavuzu", type: "belge" },
      { title: "Eğitimde Sokratik Yapay Zekâ Diyalog Örnekleri", type: "sablon" }
    ],
    notes: "AI Studio'da geliştirilen modeller API anahtarı ile okul web sitelerine veya mobil uygulamalara kolaylıkla entegre edilebilir."
  },
  {
    id: "hafta-6",
    weekNumber: 6,
    unitName: "3. ÜNİTE — YAPAY ZEKÂ DESTEKLİ WEB UYGULAMASI",
    title: "Hafta 6 · GitHub ve Vercel ile yayınlama",
    topic: "Yayınlama",
    appChain: "→ GitHub → Vercel",
    duration: "40 Dakika (1 Ders Saati)",
    category: "proje",
    targetOutput: "İnternette herkesin erişebileceği canlı web uygulaması linki (...vercel.app) + sınıf QR kodu",
    summary: "Geliştirilen eğitim teknolojisi web uygulamasını tüm dünyaya açma süreci. Kod dosyalarını GitHub üzerinde bir proje deposunda (Repository) toplama; Vercel platformuna bağlayarak tek tıkla ücretsiz, güvenli (HTTPS) ve hızlı bir web sitesi olarak canlıya alma; oluşturulan linki QR kodla sınıf ve zümre ile paylaşma.",
    learningOutcomes: [
      "Açık kaynak ve sürüm kontrol platformu GitHub'ın temel mantığını (Repository, Commit) kavrar.",
      "Vercel ile GitHub deposunu birbirine bağlayarak sunucu yönetmeden anında canlı web yayını (Deploy) yapar.",
      "Kendi geliştirdiği yapay zekâ aracının internet adresini (URL) öğrencilerine ve meslektaşlarına güvenle ulaştırır."
    ],
    sessionFlow: [
      { minuteRange: "00-08 dk", activity: "Bulut Dağıtımı & Alan Adı Mantığı", description: "Web siteleri internette nasıl yaşar? GitHub ve Vercel iş birliğinin temelleri." },
      { minuteRange: "08-20 dk", activity: "GitHub Deposu (Repository) Oluşturma", description: "Yeni repo açma, web uygulama dosyalarını yükleme ve README hazırlama." },
      { minuteRange: "20-30 dk", activity: "Vercel ile Tek Tıkla Canlıya Alma (Deploy)", description: "GitHub hesabını Vercel'e bağlama, build ayarlarını onaylama ve '...vercel.app' linkini alma." },
      { minuteRange: "30-40 dk", activity: "Canlı Yayın & QR Kod ile Sınıf Testi", description: "Linkin akıllı telefonlarda açılması, zümre öğretmenleriyle test edilmesi." }
    ],
    keyTools: [
      { name: "GitHub", url: "https://github.com", purpose: "Kod depolama, sürüm kontrol ve açık kaynak paylaşımı" },
      { name: "Vercel", url: "https://vercel.com", purpose: "GitHub projelerini anında canlı web sitesine dönüştüren sunucusuz bulut platformu" }
    ],
    practicalExercise: "5. haftada oluşturduğunuz asistan veya web materyalini GitHub deposuna yükleyip Vercel ile canlıya alın; oluşturduğunuz linki QR koda dönüştürün.",
    samplePrompt: "README Markdown İstemi: '[Uygulama Adı] için profesyonel bir GitHub README.md dosyası hazırla. Başlık, amaç, öğretmen ve öğrenci kullanım adımları, ekran görüntüsü yeri ve lisans bilgilerini içersin.'",
    materials: [
      { title: "GitHub & Vercel Tek Tıkla Dağıtım Kılavuzu", type: "belge" },
      { title: "Web Uygulaması Paylaşım ve QR Kod Şablonu", type: "sablon" }
    ],
    notes: "Vercel dağıtımları tamamen ücretsiz olup her kod güncellemesinde otomatik olarak güncellenir."
  },
  {
    id: "hafta-7",
    weekNumber: 7,
    unitName: "4. ÜNİTE — TASARIM, SES VE GÖRÜNTÜ",
    title: "Hafta 7 · Tinkercad ile 3B tasarım ve baskı",
    topic: "3B tasarım ve baskı",
    appChain: "→ Tinkercad → Bambu Studio/Cura → 3B yazıcı → Meshy/Tripo",
    duration: "40 Dakika (1 Ders Saati)",
    category: "multimodal",
    isWorkshop: true,
    targetOutput: "Dokunulabilir 3B ders nesnesi tasarımı + dilimlenmiş baskıya hazır STL/GCODE dosyası",
    summary: "Uygulamalı Atölye: Soyut ders kavramlarını somut nesnelere dönüştürme. Autodesk Tinkercad ile temel geometrilerden ders materyali modelleme, Meshy ve Tripo AI ile metinden veya 2B fotoğraftan 3B mesh modeli üretip Tinkercad'e aktarma; Bambu Studio veya UltiMaker Cura ile dilimleme yapıp okul 3B yazıcısına gönderme.",
    learningOutcomes: [
      "3 boyutlu uzayda (X, Y, Z eksenleri) katı ve delik geometrileri birleştirerek ders materyali modeller.",
      "Meshy ve Tripo yapay zekâsını kullanarak 2 boyutlu bir çizim veya metinden 3B STL/OBJ modeli üretir.",
      "Dilimleme (Slicer) yazılımında katman yüksekliği, doluluk oranı ve destek ayarlarını yaparak modeli baskıya hazırlar."
    ],
    sessionFlow: [
      { minuteRange: "00-08 dk", activity: "3B Tasarımın Eğitimdeki Yeri & Tinkercad", description: "Somutlaştırıcı öğrenme, çalışma düzlemi, X-Y-Z koordinatları ve gruplandırma." },
      { minuteRange: "08-20 dk", activity: "Tinkercad ile Canlı Ders Materyali Modelleme", description: "Kesir blokları, molekül bağları, piramit veya dişli mekanizması inşası." },
      { minuteRange: "20-30 dk", activity: "Meshy / Tripo AI ile 2D'den 3D'ye Geçiş", description: "Metin yazarak veya resim yükleyerek 3B model üretme ve Tinkercad içine alma." },
      { minuteRange: "30-40 dk", activity: "Bambu Studio / Cura Dilimleme & Baskı Hazırlığı", description: "Baskı süresi hesaplama, doluluk ayarı ve STL/GCODE çıktısı." }
    ],
    keyTools: [
      { name: "Autodesk Tinkercad", url: "https://tinkercad.com", purpose: "Tarayıcı tabanlı kodsuz 3B modelleme ve tasarım" },
      { name: "Bambu Studio / Cura", url: "https://ultimaker.com/software/ultimaker-cura", purpose: "3B yazıcı dilimleme ve baskı hazırlığı yazılımları" },
      { name: "3B Yazıcı", url: "#3d-printer", purpose: "Somut eğitim materyali üretimi donanımı" },
      { name: "Meshy / Tripo", url: "https://meshy.ai", purpose: "Metin ve fotoğraftan saniyeler içinde 3B model ve mesh üretme" }
    ],
    practicalExercise: "Branşınızda öğrencilerin en çok zorlandığı bir kavram için dokunarak inceleyebilecekleri bir 3B model tasarlayın ve STL dosyasını kaydedin.",
    samplePrompt: "Tinkercad Tasarım İstemi (ChatGPT'ye sorulacak): 'Öğrencilerime [Konu - örn: DNA Çift Sarmalı / Eğimli Düzlem / Geometrik Cisimler] konusunu anlatmak için Tinkercad'de tasarlayabileceğim bir materyal öner. Kullanılacak temel şekilleri, milimetre cinsinden boyutları ve delik/katı gruplama adımlarını sırala.'",
    materials: [
      { title: "Tinkercad Başlangıç ve Kısayollar Rehberi", type: "belge" },
      { title: "3B Yazıcı Baskı ve Dilimleme Kontrol Listesi", type: "sablon" }
    ],
    notes: "Laboratuvarda 3B yazıcı bulunmayan okullarda Tinkercad içindeki AR (Artırılmış Gerçeklik) görüntüleme modu kullanılabilir."
  },
  {
    id: "hafta-8",
    weekNumber: 8,
    unitName: "4. ÜNİTE — TASARIM, SES VE GÖRÜNTÜ",
    title: "Hafta 8 · Seslendirme: Yazıyı sese çevirmek",
    topic: "Seslendirme",
    appChain: "→ ElevenLabs → Suno → Moises",
    duration: "40 Dakika (1 Ders Saati)",
    category: "multimodal",
    targetOutput: "Doğal Türkçe seslendirilmiş tarihi/edebi metin + pedagojik konu şarkısı + QR kodlu ders kâğıdı",
    summary: "Yazılı materyalleri duygu ve tonlama içeren doğal Türkçe sese dönüştürme. ElevenLabs ile tarihi şahsiyetleri veya edebi metinleri stüdyo kalitesinde seslendirme; Suno AI ile ders kazanımlarını öğrencilerin diline dolanacak neşeli şarkılara çevirme; Moises ile ses ve enstrüman ayrıştırma ve QR kodla ders kağıtlarına basma.",
    learningOutcomes: [
      "ElevenLabs ile farklı yaş, cinsiyet ve duygu tonlamalarına sahip stüdyo kalitesinde Türkçe sesler üretir.",
      "Suno AI kullanarak ezberlenmesi zor fen, matematik veya dilbilgisi kurallarını akılda kalıcı şarkı sözlerine ve bestelere dönüştürür.",
      "Moises ile ses parçalarını ayrıştırır; işitsel öğrenen öğrenciler ve yabancı dil telaffuz çalışmaları için QR kodlu interaktif dinleme kâğıtları tasarlar."
    ],
    sessionFlow: [
      { minuteRange: "00-08 dk", activity: "İşitsel Öğrenme & Ses Teknolojileri", description: "Radyo tiyatrosu, şiir canlandırma, telaffuz eğitimi ve disleksik öğrenci desteği." },
      { minuteRange: "08-20 dk", activity: "ElevenLabs ile Tarihi Metin / Şiir Seslendirme", description: "Doğal Türkçe ses seçimi, tonlama ayarı, duraksama yönetimi ve MP3 çıktısı alma." },
      { minuteRange: "20-30 dk", activity: "Suno AI ile Eğitici Ders Şarkısı Besteleme", description: "Kazanım kelimelerinden nakarat ve kıtalar yazıp tür seçimiyle (pop/akustik) şarkı üretme." },
      { minuteRange: "30-40 dk", activity: "Moises Entegrasyonu & QR Kod Oluşturma", description: "Vokal/enstrüman ayrıştırma ve üretilen sesin linkini QR koda bağlayıp kâğıda basma." }
    ],
    keyTools: [
      { name: "ElevenLabs", url: "https://elevenlabs.io", purpose: "Stüdyo kalitesinde doğal Türkçe yapay zekâ ses motoru" },
      { name: "Suno AI", url: "https://suno.com", purpose: "Ders kazanımlarından eğitici, akılda kalıcı şarkı besteleme" },
      { name: "Moises", url: "https://moises.ai", purpose: "Müzik ve ses parçalarında vokal, enstrüman ayrıştırma ve tempo ayarlama" }
    ],
    practicalExercise: "Dersinizde geçen önemli bir tarihi metni veya kuralı ElevenLabs ile seslendirin ve Suno AI ile 1 dakikalık eğlenceli bir konu şarkısı besteleyin.",
    samplePrompt: "Suno Şarkı İstemi: 'Sen bir ilkokul/ortaokul öğretmenisin. [Ders ve Konu - örn: Gezegenlerin Sıralaması / Sıfat Tamlamaları] konusunu anlatan, 8-12 yaş grubunun hemen ezberleyeceği neşeli, kafiyeli 2 kıta ve 1 nakarat şarkı sözü yaz. Tarz: Enerjik akustik pop çocuk şarkısı.'",
    materials: [
      { title: "Ders Kağıtlarına Ses Entegre Etme (QR Kod Rehberi)", type: "belge" },
      { title: "Suno AI Şarkı Sözü ve Müzik Tarzı İpuçları", type: "sablon" }
    ],
    notes: "Üretilen sesler akıllı tahtada ders başlangıç zili veya ders sonu toparlanma müziği olarak da kullanılabilir."
  },
  {
    id: "hafta-9",
    weekNumber: 9,
    unitName: "4. ÜNİTE — TASARIM, SES VE GÖRÜNTÜ",
    title: "Hafta 9 · Lumen5 ile metinden video",
    topic: "Metinden video",
    appChain: "→ Lumen5 → ChatGPT/Claude → Padlet AI",
    duration: "40 Dakika (1 Ders Saati)",
    category: "multimodal",
    targetOutput: "60-90 saniyelik mikro öğrenme ders videosu + Padlet sınıf etkileşim panosu",
    summary: "Yazdığınız bir ders özetini veya veli bültenini saniyeler içinde dinamik bir eğitim videosuna dönüştürme. Lumen5 yapay zekâsı ile metni analiz etme, anahtar kavramlara uygun lisanslı video klipleri otomatik eşleştirme, müzik ve alt yazı ekleyerek mikro öğrenme videoları hazırlama; Padlet AI panosunda sınıf içi etkileşime açma.",
    learningOutcomes: [
      "Ders notlarını 60-90 saniyelik odaklanmış mikro öğrenme video senaryolarına (Storyboard) indirger.",
      "Lumen5 ile metinleri otomatik olarak sahnelere, stok videolara ve dinamik altyazılara dönüştürür.",
      "Padlet AI ile üretilen videoları sınıf panolarına entegre ederek öğrenci yorumlarını toplar."
    ],
    sessionFlow: [
      { minuteRange: "00-08 dk", activity: "Mikro Öğrenme & Video Pedagojisi", description: "Kısa dikkat süreleri, 60-90 saniye kuralı ve metin-video dönüşüm mimarisi." },
      { minuteRange: "08-20 dk", activity: "Ders Notunu Lumen5'e Aktarma ve Sahneleme", description: "Metni yapıştırma, yapay zekânın uygun video parçalarını seçmesi ve zamanlama." },
      { minuteRange: "20-30 dk", activity: "Sahne Düzenleme, Renkler ve Müzik Seçimi", description: "Vurgu renkleri belirleme, font büyüklüğü ve pedagojik tempoda fon müziği ekleme." },
      { minuteRange: "30-40 dk", activity: "Video Render & Padlet AI Sınıf Panosu", description: "Videonun kaydedilmesi ve Padlet sınıf duvarında öğrenci etkileşimine açılması." }
    ],
    keyTools: [
      { name: "Lumen5", url: "https://lumen5.com", purpose: "Metinden otomatik sahnelemeli eğitim videosu üreticisi" },
      { name: "ChatGPT / Claude", url: "https://chatgpt.com", purpose: "60 saniyelik storyboard ve sahne metinleri hazırlama" },
      { name: "Padlet AI", url: "https://padlet.com", purpose: "Yapay zekâ destekli interaktif sınıf panosu ve öğrenci duvarı" }
    ],
    practicalExercise: "Dersinizin 1 ünitesi için öğrencilere veya velilere yönelik 60 saniyelik bir özet video oluşturun ve MP4 formatında indirin.",
    samplePrompt: "Lumen5 Senaryo İstemi: '60 saniyelik bir eğitim videosu için storyboard hazırla. Konu: [Konu Başlığı]. Hedef Kitle: [Sınıf Seviyesi]. Format: 5 sahne halinde; her sahnede ekranda belirecek en fazla 8 kelimelik vurucu metin, önerilen arka plan video tipi ve sahne süresini belirt.'",
    materials: [
      { title: "Lumen5 Hızlı Video Üretim Kılavuzu", type: "link" },
      { title: "Mikro Öğrenme Video Senaryo Şablonu", type: "sablon" }
    ],
    notes: "Videolardaki yazıların akıllı tahtadan ve telefon ekranından rahatça okunabilmesi için sahne başına metin miktarı az tutulmalıdır."
  },
  {
    id: "hafta-10",
    weekNumber: 10,
    unitName: "4. ÜNİTE — TASARIM, SES VE GÖRÜNTÜ",
    title: "Hafta 10 · Üretken video ile kısa eğitim videosu",
    topic: "Üretken video ile kısa film",
    appChain: "→ Google Flow/Veo → Kling → Gemini → Canva → Book Creator",
    duration: "40 Dakika (1 Ders Saati)",
    category: "multimodal",
    targetOutput: "Özgün yapay zekâ kısa eğitim filmi + Book Creator interaktif dijital ders kitabı",
    summary: "Stok video kullanmak yerine doğrudan metin komutuyla (Text-to-Video) sıfırdan eğitsel video sahneleri ve kısa filmler türetme. Google Flow/Veo ve Kling ile tarihi bir anı, bilimsel bir olayı veya soyut bir kurguyu canlandırma; Gemini ile senaryo yazımı; Canva ile montaj ve Book Creator ile çoklu ortamlı interaktif dijital ders kitabına dönüştürme.",
    learningOutcomes: [
      "Üretken video modellerinde kamera hareketleri (pan, tilt, zoom) ve görsel stil parametrelerini yönetir.",
      "Ders konularını anlatan kısa senaryolar yazarak sahne sahne yapay zekâ video klipleri türetir.",
      "Üretilen videoları Book Creator içine gömerek sesli, videolu interaktif ders kitapları yayınlar."
    ],
    sessionFlow: [
      { minuteRange: "00-08 dk", activity: "Üretken Video Çağı & Eğitimde Kullanımı", description: "Text-to-Video modellerinin mantığı, hareket tutarlılığı ve senaryo yazımı." },
      { minuteRange: "08-20 dk", activity: "Google Flow/Veo ve Kling ile Sahne Üretimi", description: "Bir tarihi olay veya fen deneyi için 3 ayrı 5 saniyelik klip türetme." },
      { minuteRange: "20-30 dk", activity: "Canva ile Video Montaj ve Altyazı", description: "Klipleri birleştirme, geçiş efektleri ve seslendirmeyi eşleme." },
      { minuteRange: "30-40 dk", activity: "Book Creator İnteraktif Dijital Kitap", description: "Videonun interaktif bir e-kitap sayfasına gömülmesi ve paylaşımı." }
    ],
    keyTools: [
      { name: "Google Flow / Veo", url: "https://deepmind.google/technologies/veo", purpose: "Google'ın yüksek gerçeklikli üretken video modeli" },
      { name: "Kling AI", url: "https://klingai.com", purpose: "Metinden ve resimden sinematik video üretimi" },
      { name: "Gemini", url: "https://gemini.google.com", purpose: "Video storyboard ve sahne promptları üretimi" },
      { name: "Canva", url: "https://canva.com", purpose: "Eğitim video montajı, efekt ve altyazı şablonları" },
      { name: "Book Creator", url: "https://bookcreator.com", purpose: "Çoklu ortamlı, sesli ve videolu dijital ders kitabı platformu" }
    ],
    practicalExercise: "Dersinizde geçen bir olay veya süreç için 2 adet 5 saniyelik üretken video klibi oluşturun ve Book Creator üzerinde bir ders sayfasına yerleştirin.",
    samplePrompt: "Üretken Video İstemi: 'Cinematic historical documentary footage showing [Tarihi Olay / Bilimsel Süreç - örn: İpek Yolu Kervanı / Fotosentez Süreci], slow camera pan from left to right, high realism, 4k resolution, warm volumetric afternoon light, educational film style --motion 5'",
    materials: [
      { title: "Üretken Video Prompt Kılavuzu ve Kamera Terimleri", type: "belge" },
      { title: "Book Creator ile İnteraktif Kitap Hazırlama Rehberi", type: "link" }
    ],
    notes: "Üretken video araçlarında kısa ve net hareket tanımları (slow zoom, pan) daha tutarlı sonuçlar verir."
  },
  {
    id: "hafta-11",
    weekNumber: 11,
    unitName: "4. ÜNİTE — TASARIM, SES VE GÖRÜNTÜ",
    title: "Hafta 11 · VR gözlük kullanımı ve sınıf uygulamaları",
    topic: "VR gözlük ve sanal gezi",
    appChain: "→ VR gözlük → Google Arts & Culture → Google Earth → YouTube 360° → Skybox AI",
    duration: "40 Dakika (1 Ders Saati)",
    category: "multimodal",
    isWorkshop: true,
    targetOutput: "360° sanal gezi durağı + VR sınıf gözlem ve keşif görev kâğıdı",
    summary: "Uygulamalı Atölye: Daldırıcı Öğrenme (Immersive Learning). VR gözlükler ve akıllı telefonlarla sınıf ortamında sanal saha gezileri düzenleme. Skybox AI ile tek komutla 360° tarihi veya bilimsel mekânlar üretme; Google Arts & Culture, Google Earth ve YouTube 360° ile dünya müzelerini ve coğrafyalarını sınıfa getirme; VR gözlem görev kâğıtları tasarlama.",
    learningOutcomes: [
      "Sanal Gerçeklik (VR) teknolojisinin uzamsal kavrama ve empati geliştirmedeki pedagojik rolünü kavrar.",
      "Skybox AI ile ders konusuyla ilgili 360 derecelik panoramik sanal mekânlar üretir.",
      "Öğrencilerin sanal gezi sırasında pasif izleyici kalmaması için hedefe yönelik gözlem görev kâğıtları tasarlar."
    ],
    sessionFlow: [
      { minuteRange: "00-08 dk", activity: "VR Pedagojisi & Daldırıcı Öğrenme İlkeleri", description: "Sanal saha gezileri, güvenlik, sınıf yönetimi ve süre sınırları." },
      { minuteRange: "08-20 dk", activity: "Skybox AI ile 360° Sanal Mekân Tasarımı", description: "Antik Roma, yağmur ormanları veya Ay yüzeyini anlatan 360° küresel sahne üretimi." },
      { minuteRange: "20-30 dk", activity: "Google Arts & Culture ve Earth Keşfi", description: "Dünya müzeleri ve tarihi alanlarda 360° sanal tur uygulamaları." },
      { minuteRange: "30-40 dk", activity: "VR Gözlem ve Keşif Kâğıdı Hazırlama", description: "Öğrencilerin mekânda arayacağı 5 gizli ipucu ve çıkarım sorusunun yazımı." }
    ],
    keyTools: [
      { name: "VR Gözlük / Cardboard", url: "#vr", purpose: "Daldırıcı sanal gerçeklik görüntüleme donanımı" },
      { name: "Google Arts & Culture", url: "https://artsandculture.google.com", purpose: "Dünya müzeleri ve tarihi alanlarda 360° sanal geziler" },
      { name: "Google Earth VR", url: "https://earth.google.com", purpose: "Coğrafi keşifler ve 3B dünya turu" },
      { name: "YouTube 360°", url: "https://youtube.com", purpose: "360 derece eğitim videoları ve belgeseller" },
      { name: "Blockade Labs Skybox AI", url: "https://skybox.blockadelabs.com", purpose: "360° sanal evren ve panorama üretimi" }
    ],
    practicalExercise: "Dersinizin bir konusu için Skybox AI'da 360° sanal bir mekân oluşturun ve bu mekânda öğrencilere yaptıracağınız 3 maddelik bir keşif yönergesi yazın.",
    samplePrompt: "Skybox 360 İstemi: '360 degree panoramic view of an ancient Roman forum during a bustling market day / deep underwater coral reef with diverse marine life, equirectangular projection, highly detailed, realistic sunlight filtering through, 8k resolution, educational immersion style'",
    materials: [
      { title: "Sınıfta VR Gözlük Kullanımı Güvenlik ve Süre Yönergesi", type: "belge" },
      { title: "VR Sanal Gezi Gözlem ve Keşif Kâğıdı Şablonu", type: "sablon" }
    ],
    notes: "VR gözlüğü bulunmayan sınıflarda 360 derece panoramalar akıllı tahtada fareyle döndürülerek tüm sınıfla interaktif şekilde gezilebilir."
  },
  {
    id: "hafta-12",
    weekNumber: 12,
    unitName: "5. ÜNİTE — KODLAMA, ROBOTİK VE ELEKTRONİK",
    title: "Hafta 12 · Etkileşimli içerik, mini oyun ve simülasyon",
    topic: "Etkileşimli oyun ve simülasyon",
    appChain: "→ Claude → ChatGPT/Gemini → Genially → Wayground → Teachable Machine",
    duration: "40 Dakika (1 Ders Saati)",
    category: "degerlendirme",
    targetOutput: "Akıllı tahtada çalışan web tabanlı interaktif ders oyunu veya fen simülasyonu",
    summary: "Kod yazmadan yapay zekâya akıllı tahtada çalışan interaktif eğitsel mini oyunlar, simülasyonlar ve bulmacalar kodlatma. Claude Artifacts ile tek komutla tarayıcıda çalışan web oyunları üretme; Genially ve Wayground ile görsel etkileşimler; Google Teachable Machine ile öğrencilerin hareketlerini veya seslerini tanıyan jest kontrollü eğitsel uygulamalar geliştirme.",
    learningOutcomes: [
      "Yapay zekâya açık uçlu yönergeler vererek çalışan HTML/JavaScript mini eğitsel oyunlar kodlatır.",
      "Genially ve Wayground ile görsel etkileşimli öğrenme senaryoları ve bulmacalar hazırlar.",
      "Teachable Machine ile kamera ve mikrofon kullanarak yapay zekâ sınıflandırma modeli eğitir ve ders oyununa bağlar."
    ],
    sessionFlow: [
      { minuteRange: "00-08 dk", activity: "Eğitimde Oyunlaştırma & Kodsuz Geliştirme", description: "Simülasyon temelli öğrenme ve anlık görsel geri bildirimin gücü." },
      { minuteRange: "08-20 dk", activity: "Claude Artifacts ile Mini Oyun Kodlama", description: "Periyodik tablo, tarih kronolojisi veya kelime eşleştirme oyununu canlıda çalıştırma." },
      { minuteRange: "20-30 dk", activity: "Genially & Wayground ile Görsel Etkileşim", description: "Tıklanabilir infografik, harita ve kaçış oyunu (escape room) tasarlama." },
      { minuteRange: "30-40 dk", activity: "Teachable Machine ile Jest Tanıma", description: "Web kamerasını kullanarak öğrencilerin el hareketleriyle ekrandaki nesneleri kontrol etmesi." }
    ],
    keyTools: [
      { name: "Claude AI (Artifacts)", url: "https://claude.ai", purpose: "Tarayıcıda anında çalışan HTML/JS simülasyon ve oyun kodlayıcı" },
      { name: "ChatGPT / Gemini", url: "https://chatgpt.com", purpose: "Oyun kurgusu, soru bankası ve puanlama mantığı hazırlama" },
      { name: "Genially", url: "https://genial.ly", purpose: "İnteraktif sunumlar, oyunlar ve görsel kaçış senaryoları" },
      { name: "Wayground", url: "https://wayground.com", purpose: "Eğitsel mini oyun ve interaktif ders aktiviteleri" },
      { name: "Teachable Machine", url: "https://teachablemachine.withgoogle.com", purpose: "Kamera ve mikrofonla kodsuz yapay zekâ modeli eğitme" }
    ],
    practicalExercise: "Dersinizde işlenen bir konu için Claude Artifacts ile dokunarak oynanabilecek 1 adet mini oyun kodlatıp çalıştırın.",
    samplePrompt: "Rol: Kıdemli Eğitsel Yazılım Geliştiricisi.\nKonu: [Ders] dersi [Konu Başlığı].\nGörev: Tek bir HTML dosyasında çalışan, Tailwind CSS ile modern ve renkli tasarlanmış, akıllı tahtada dokunarak oynanabilecek bir 'Eşleştirme ve Puan Toplama' oyunu kodla. Doğru ve yanlış cevaplarda anında ses efekti veya görsel animasyon göster, sonunda skor tablosu ver. Artifacts penceresinde çalıştır.",
    materials: [
      { title: "Claude Artifacts ile Kodsuz Oyun Geliştirme Rehberi", type: "belge" },
      { title: "Teachable Machine Sınıf İçi Uygulama Fikirleri", type: "sablon" }
    ],
    notes: "Artifacts'ta üretilen oyunlar tek tıkla HTML olarak indirilip internet olmadan da akıllı tahtalarda açılabilir."
  },
  {
    id: "hafta-13",
    weekNumber: 13,
    unitName: "5. ÜNİTE — KODLAMA, ROBOTİK VE ELEKTRONİK",
    title: "Hafta 13 · LEGO SPIKE Essential ile kodlama ve tasarım",
    topic: "LEGO SPIKE ile kodlama",
    appChain: "→ SPIKE Essential → SPIKE uygulaması → Scratch → ML for Kids",
    duration: "40 Dakika (1 Ders Saati)",
    category: "asistan",
    isWorkshop: true,
    targetOutput: "Çalışan mekanik robot modeli + algoritma akış şeması + STEAM ders planı",
    summary: "Uygulamalı Atölye: STEAM eğitimi ve fiziksel programlama. LEGO Education SPIKE Essential setleri ile mekanik modeller tasarlama; akıllı hub, motor ve renk sensörlerini blok tabanlı kodlama (Scratch mantığı) ile yönetme; Machine Learning for Kids ile eğitilen modelleri Scratch bloklarıyla robotik görevlere bağlama.",
    learningOutcomes: [
      "Dişli mekanizmaları, makaralar ve motor aktarma organlarını somut robot tasarımında kullanır.",
      "LEGO SPIKE uygulamasında ikon ve kelime bloklarıyla döngü, şart (eğer-ise) ve sensör algoritmaları kurar.",
      "Machine Learning for Kids ile makine öğrenmesini robotik hareketlerle birleştiren STEAM ders planları hazırlar."
    ],
    sessionFlow: [
      { minuteRange: "00-08 dk", activity: "STEAM & Fiziksel Programlama Prensipleri", description: "Somut mekanik montaj, sensör girdisi ve motor çıktısı kavramları." },
      { minuteRange: "08-20 dk", activity: "Mekanik Tasarım ve Montaj", description: "Belirlenen tema doğrultusunda (örn: temizlik robotu, hayvan yürüyüşü) model inşası." },
      { minuteRange: "20-30 dk", activity: "Blok Tabanlı Kodlama (Scratch Mantığı)", description: "Renk sensörünü okuma, ışık matrisinde ifade gösterme ve motor hız kontrolü." },
      { minuteRange: "30-40 dk", activity: "ML for Kids Entegrasyonu & Görev Parkuru", description: "Yapay zekâ modeliyle nesne tanıyıp robota karar verdiren görev senaryosu." }
    ],
    keyTools: [
      { name: "LEGO SPIKE Essential", url: "https://education.lego.com", purpose: "STEAM odaklı robotik donanım seti" },
      { name: "SPIKE Uygulaması", url: "https://education.lego.com/en-us/downloads/spike-app/software", purpose: "İkon ve blok tabanlı kodlama arayüzü" },
      { name: "Scratch", url: "https://scratch.mit.edu", purpose: "Görsel blok programlama ortamı" },
      { name: "Machine Learning for Kids", url: "https://machinelearningforkids.co.uk", purpose: "Scratch ile makine öğrenmesi modellerini konuşturan sistem" }
    ],
    practicalExercise: "SPIKE Essential setiyle dersinizin 1 kazanımını (örn: basit makineler, sürtünme veya enerji dönüşümü) açıklayan 1 robotik model tasarlayın ve kod bloklarını oluşturun.",
    samplePrompt: "Robotik Etkinlik İstemi: 'LEGO SPIKE Essential seti kullanarak ilkokul/ortaokul [Ders] dersindeki [Kazanım] konusunu işleyecek 40 dakikalık bir ders kurgusu hazırla. Öğrenci görev senaryosu, gerekli motor/sensör parçaları ve Scratch blok kodunun algoritma adımlarını maddeler halinde yaz.'",
    materials: [
      { title: "LEGO SPIKE Essential Blok Kodlama ve Sensör Kılavuzu", type: "belge" },
      { title: "STEAM Robotik Ders Planı Şablonu", type: "sablon" }
    ],
    notes: "Fiziksel set sayısı kısıtlı sınıflarda öğrenciler 3'er kişilik mühendislik ekipleri halinde çalıştırılmalıdır."
  },
  {
    id: "hafta-14",
    weekNumber: 14,
    unitName: "5. ÜNİTE — KODLAMA, ROBOTİK VE ELEKTRONİK",
    title: "Hafta 14 · Arduino ile devre tasarımı çalışmaları",
    topic: "Arduino ile devre tasarımı",
    appChain: "→ Tinkercad Circuits → Arduino IDE → Arduino Uno → PictoBlox",
    duration: "40 Dakika (1 Ders Saati)",
    category: "asistan",
    isWorkshop: true,
    targetOutput: "Çalışan devre (sanal Tinkercad simülasyonu veya fiziksel breadboard) + Arduino C++ kodu",
    summary: "Uygulamalı Atölye: Elektronik devreler ve mikrodenetleyiciler dünyasına adım. Autodesk Tinkercad Circuits üzerinde sanal olarak Arduino Uno, LED, buton, buzzer ve ultrasonik mesafe sensörü bağlama; yapay zekâya (ChatGPT/Claude) C++ kodları yazdırıp hata ayıklama; PictoBlox ile blok tabanlı yapay zekâ devreleri geliştirme.",
    learningOutcomes: [
      "Breadboard mantığını, anot-katot kutuplarını ve direnç hesaplamalarını kavrar.",
      "Tinkercad Circuits simülatöründe lehim veya yanma riski olmadan güvenle Arduino devreleri kurar.",
      "Yapay zekâyı devre şeması çizdirme, Arduino C++ kodu üretme ve derleme hatalarını çözmede asistan olarak kullanır; PictoBlox ile yapay zekâlı blok kodlama yapar."
    ],
    sessionFlow: [
      { minuteRange: "00-08 dk", activity: "Elektronik Temelleri & Tinkercad Circuits", description: "Gerilim, direnç, dijital/analog pinler ve sanal laboratuvar güvenliği." },
      { minuteRange: "08-20 dk", activity: "Sanal Devre Tasarımı (Tinkercad)", description: "Arduino Uno'ya LED, buzzer ve ultrasonik mesafe sensörü kablolama." },
      { minuteRange: "20-30 dk", activity: "Yapay Zekâ ile Kod Üretimi & Hata Ayıklama", description: "ChatGPT'ye devreyi tarif edip çalışan Arduino C++ kodunu alma ve simülasyona yapıştırma." },
      { minuteRange: "30-40 dk", activity: "PictoBlox & Arduino Uno Canlı Test", description: "PictoBlox ile yüz tanıma veya nesne algılama yaparak Arduino pinlerini tetikleme." }
    ],
    keyTools: [
      { name: "Tinkercad Circuits", url: "https://tinkercad.com/circuits", purpose: "Tarayıcı tabanlı sanal Arduino devre simülatörü" },
      { name: "Arduino IDE", url: "https://arduino.cc", purpose: "Fiziksel karta C++ kodu yükleme arayüzü" },
      { name: "Arduino Uno", url: "#arduino-uno", purpose: "Mikrodenetleyici geliştirme kartı" },
      { name: "PictoBlox", url: "https://pictoblox.ai", purpose: "Arduino devrelerini yapay zekâ ve bilgisayarla görme ile buluşturan blok kodlama aracı" }
    ],
    practicalExercise: "Tinkercad Circuits üzerinde ultrasonik mesafe sensörüyle çalışan bir 'Akıllı Sosyal Mesafe / Park Sensörü' devresi tasarlayın ve kodunu simülasyonda test edin.",
    samplePrompt: "Arduino Kod İstemi: 'Tinkercad Circuits üzerinde Arduino Uno, HC-SR04 ultrasonik mesafe sensörü, 1 adet kırmızı LED ve 1 adet buzzer içeren bir devre kurdum. Sensör 20 cm'den yakında bir cisim algıladığında LED yansın ve buzzer kesik kesik ötsün; 20 cm üstünde sönsün. (1) Breadboard bağlantı pinlerini listele, (2) Açıklayıcı Türkçe yorum satırları içeren eksiksiz Arduino C++ kodunu yaz.'",
    materials: [
      { title: "Arduino Temel Devre Bileşenleri ve Pin Bağlantı Şeması", type: "belge" },
      { title: "Tinkercad Circuits Başlangıç Kılavuzu", type: "sablon" }
    ],
    notes: "Fiziksel donanım olmasa dahi Tinkercad Circuits ile tüm öğrenciler simülasyon üzerinden kodlarını hatasız test edebilir."
  },
  {
    id: "hafta-15",
    weekNumber: 15,
    unitName: "6. ÜNİTE — SUNUM VE GÖRSELLEŞTİRME",
    title: "Hafta 15 · Gamma, Napkin ve Jeda ile sunum · Kapanış",
    topic: "Sunum, görselleştirme ve kapanış",
    appChain: "→ Gamma → Napkin.ai → Jeda.ai → Mapify",
    duration: "40 Dakika (1 Ders Saati)",
    category: "proje",
    targetOutput: "Etkileşimli sunum destesi + infografik kavram şeması + zihin haritası + katılım belgesi",
    summary: "Dönem boyu geliştirilen eğitim teknolojisi çıktılarının görselleştirilmesi ve sunumu. Gamma App ile metinden saniyeler içinde zengin slayt destesi üretme; Napkin.ai ile ders metinlerini infografik şemalara çevirme; Jeda.ai ile yapay zekâlı görsel ortak akıl panosu; Mapify ile tek tıkla zihin haritası çıkarma; iyi örnekler pazarı, sertifikasyon ve kapanış.",
    learningOutcomes: [
      "Gamma App ile kazanım metninden profesyonel, modern ve görsel olarak tutarlı slaytlar türetir.",
      "Napkin.ai ile metinlerdeki adımları ve ilişkileri tek tıkla infografik şemalara ve vektörlere dönüştürür.",
      "Jeda.ai ve Mapify ile zihin haritaları çıkartır; 15 haftalık eğitim sürecindeki iyi örneklerini meslektaşlarıyla paylaşır."
    ],
    sessionFlow: [
      { minuteRange: "00-08 dk", activity: "Açılış & Görselleştirmenin Gücü", description: "Bilişsel yükü azaltan infografik özetleme ve yapay zekâ sunum araçları." },
      { minuteRange: "08-20 dk", activity: "Gamma ile Tek Tıkla Sunum İnşası", description: "Kazanım metninden 8-10 kartlık etkileşimli ders destesi üretme ve düzenleme." },
      { minuteRange: "20-30 dk", activity: "Napkin.ai, Jeda.ai & Mapify Atölyesi", description: "Metni yapıştırıp infografik şemaya, ortak akıl panosuna ve zihin haritasına dönüştürme." },
      { minuteRange: "30-40 dk", activity: "İyi Örnekler Pazarı & Kapanış Töreni", description: "Öğretmen portfolyolarının ortak havuzda paylaşımı ve katılım belgelerinin takdimi." }
    ],
    keyTools: [
      { name: "Gamma", url: "https://gamma.app", purpose: "Otomatik sunum, doküman ve web sayfası oluşturucu" },
      { name: "Napkin.ai", url: "https://www.napkin.ai", purpose: "Metinleri tek tıkla profesyonel infografik ve şemalara dönüştürme" },
      { name: "Jeda.ai", url: "https://www.jeda.ai", purpose: "Görsel yapay zekâ çalışma alanı ve ortak akıl tahtası" },
      { name: "Mapify", url: "https://mapify.so", purpose: "Her türlü içerikten tek tıkla yapay zekâlı zihin haritası üretimi" }
    ],
    practicalExercise: "15 haftalık eğitim sürecinde geliştirdiğiniz en başarılı çalışmayı Gamma ve Napkin ile 5 slaytlık bir portfolyo sunumuna dönüştürün ve okul arşivine ekleyin.",
    samplePrompt: "Gamma Sunum İstemi: 'Konu: [Branşınız] Yapay Zekâ ve Eğitim Teknolojileri Dönem Portfolyosu.\nHedef Kitle: Okul öğretmenleri ve zümre arkadaşları.\nİçerik:\n1. Başlık ve Giriş\n2. Materyal Üretimi: Platformlar ve Kaynaklı Üretim (Hafta 1-3)\n3. Görsel Üretim & AI Web Uygulaması (Hafta 4-6)\n4. Tasarım, Ses, Görüntü ve VR (Hafta 7-11)\n5. Kodlama, Robotik ve Elektronik (Hafta 12-14)\n6. Süreç Değerlendirmesi ve Kapanış\nFormat: 6 slaytlık modern ve canlı bir Gamma sunumu taslağı hazırla.'",
    materials: [
      { title: "Okulumuz Öğretmen Akademisi Katılım Belgesi", type: "belge" },
      { title: "Napkin.ai Hızlı İnfografik Rehberi", type: "link" }
    ],
    notes: "Her katılımcı öğretmene özel katılım belgesi ve teşekkür takdim edilecektir."
  }
];
