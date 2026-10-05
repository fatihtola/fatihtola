import {
  TeacherGroup,
  WeekSession,
  CompetencyItem,
  AIToolItem,
  LanguageModelItem,
  ResourceItem,
  PromptTemplate
} from '../types';

export const TRAINER_INFO = {
  name: "Fatih TOLA",
  title: "Bilişim Teknolojileri ve Eğitim Teknolojileri Eğitmeni",
  role: "Yapay Zekâ ve Dijital Eğitim Koordinatörü",
  school: "Okulumuz Öğretmen Akademisi",
  email: "fatihtola@gmail.com",
  bio: "Eğitim teknolojileri, yapay zekâ okuryazarlığı ve öğretmenlerin sınıf içi üretkenliğini artırmaya yönelik uygulamalı atölyeler yürütmektedir. 10 farklı öğretmen grubuna haftalık 40'ar dakikalık periyotlarla pedagojik yapay zekâ entegrasyonu rehberliği sağlamaktadır.",
  quote: "Yapay zekâ öğretmenin yerini almayacak; ancak yapay zekâyı etkili kullanan öğretmenler, kullanmayanların önüne geçecek.",
  topics: [
    "Büyük Dil Modelleri (LLM) ve İstem Mühendisliği",
    "MEB Müfredatına Uyumlu Ders & Materyal Üretimi",
    "Otomatik Ölçme-Değerlendirme & Rubrik Oluşturma",
    "Görsel, İşitsel ve Multimodal Eğitim Tasarımı",
    "Eğitimde Etik, Telif ve Veri Güvenliği"
  ]
};

export const INITIAL_GROUPS: TeacherGroup[] = [
  {
    id: "grup-1",
    groupNumber: 1,
    name: "1. Grup",
    day: "Pazartesi",
    timeSlot: "15:30 - 16:10",
    location: "Maker Atölyesi",
    currentWeek: 1,
    totalWeeks: 16,
    participants: [],
    notes: "Uygulamalı yapay zekâ atölyesi ve ders materyali tasarımı."
  },
  {
    id: "grup-2",
    groupNumber: 2,
    name: "2. Grup",
    day: "Salı",
    timeSlot: "15:30 - 16:10",
    location: "Maker Atölyesi",
    currentWeek: 1,
    totalWeeks: 16,
    participants: [],
    notes: "Uygulamalı yapay zekâ atölyesi ve ders materyali tasarımı."
  },
  {
    id: "grup-3",
    groupNumber: 3,
    name: "3. Grup",
    day: "Çarşamba",
    timeSlot: "15:30 - 16:10",
    location: "Maker Atölyesi",
    currentWeek: 1,
    totalWeeks: 16,
    participants: [],
    notes: "Uygulamalı yapay zekâ atölyesi ve ders materyali tasarımı."
  },
  {
    id: "grup-4",
    groupNumber: 4,
    name: "4. Grup",
    day: "Perşembe",
    timeSlot: "15:30 - 16:10",
    location: "Maker Atölyesi",
    currentWeek: 1,
    totalWeeks: 16,
    participants: [],
    notes: "Uygulamalı yapay zekâ atölyesi ve ders materyali tasarımı."
  },
  {
    id: "grup-5",
    groupNumber: 5,
    name: "5. Grup",
    day: "Cuma",
    timeSlot: "14:30 - 15:10",
    location: "Maker Atölyesi",
    currentWeek: 1,
    totalWeeks: 16,
    participants: [],
    notes: "Uygulamalı yapay zekâ atölyesi ve ders materyali tasarımı."
  },
  {
    id: "grup-6",
    groupNumber: 6,
    name: "6. Grup",
    day: "Pazartesi",
    timeSlot: "16:20 - 17:00",
    location: "Maker Atölyesi",
    currentWeek: 1,
    totalWeeks: 16,
    participants: [],
    notes: "Uygulamalı yapay zekâ atölyesi ve ders materyali tasarımı."
  },
  {
    id: "grup-7",
    groupNumber: 7,
    name: "7. Grup",
    day: "Salı",
    timeSlot: "16:20 - 17:00",
    location: "Maker Atölyesi",
    currentWeek: 1,
    totalWeeks: 16,
    participants: [],
    notes: "Uygulamalı yapay zekâ atölyesi ve ders materyali tasarımı."
  },
  {
    id: "grup-8",
    groupNumber: 8,
    name: "8. Grup",
    day: "Çarşamba",
    timeSlot: "16:20 - 17:00",
    location: "Maker Atölyesi",
    currentWeek: 1,
    totalWeeks: 16,
    participants: [],
    notes: "Uygulamalı yapay zekâ atölyesi ve ders materyali tasarımı."
  },
  {
    id: "grup-9",
    groupNumber: 9,
    name: "9. Grup",
    day: "Perşembe",
    timeSlot: "16:20 - 17:00",
    location: "Maker Atölyesi",
    currentWeek: 1,
    totalWeeks: 16,
    participants: [],
    notes: "Uygulamalı yapay zekâ atölyesi ve ders materyali tasarımı."
  },
  {
    id: "grup-10",
    groupNumber: 10,
    name: "10. Grup",
    day: "Cuma",
    timeSlot: "15:20 - 16:00",
    location: "Maker Atölyesi",
    currentWeek: 1,
    totalWeeks: 16,
    participants: [],
    notes: "Uygulamalı yapay zekâ atölyesi ve ders materyali tasarımı."
  }
];

export const COMPETENCIES: CompetencyItem[] = [
  {
    id: "comp-1",
    icon: "GraduationCap",
    title: "AI Destekli Pedagojik İçerik Üretimi",
    category: "Müfredat & Planlama",
    description: "MEB öğretim programı ve Bloom taksonomisine tam uyumlu ders planları, kazanım temelli etkinlik sayfaları, rubrikler ve zenginleştirilmiş ders materyallerini dakikalar içinde hazırlama.",
    pedagogicalImpact: "Haftalık ortalama 4-6 saatlik hazırlık süresini 45 dakikaya indirir.",
    badge: "Temel Yetkinlik"
  },
  {
    id: "comp-2",
    icon: "BarChart3",
    title: "Öğrenci Veri Analizi ve Gelişim Raporlama",
    category: "Veri & Ölçme",
    description: "Sınav sonuçları, karne notları ve öğrenci katılım verilerini yapay zekâ ile analiz ederek eksik kazanımları tespit etme, grafiksel dağılımlar üretme ve veli bilgilendirme metinleri oluşturma.",
    pedagogicalImpact: "Kişiselleştirilmiş öğrenme eksiklerini sınıf bazında anında saptar.",
    badge: "Ölçme Değerlendirme"
  },
  {
    id: "comp-3",
    icon: "Bot",
    title: "Kendi Branş Asistanını & Sokratik Botunu Geliştirme",
    category: "Özelleştirilmiş Asistanlar",
    description: "Öğrencilere doğrudan cevabı vermek yerine adım adım düşündüren Sokratik soru botları, sınav koçları ve branşa özel GPT/Gemini Gems asistanları tasarlama.",
    pedagogicalImpact: "Öğrencilerin sınıf dışı bireysel öğrenme motivasyonunu %70 artırır.",
    badge: "İleri Seviye"
  },
  {
    id: "comp-4",
    icon: "Palette",
    title: "Multimodal Materyal & Görsel-İşitsel Tasarım",
    category: "Tasarım & Çoklu Ortam",
    description: "Canva Magic, Midjourney, Adobe Firefly ile ders görselleri; ElevenLabs ile tarihsel veya edebi metin seslendirmeleri; Suno ile öğretici tekerleme/şarkılar üretme becerisi.",
    pedagogicalImpact: "Görsel ve işitsel öğrenen öğrencilerin derse katılımını maksimize eder.",
    badge: "Üretken Tasarım"
  },
  {
    id: "comp-5",
    icon: "ShieldCheck",
    title: "Etik, Telif ve MEB Veri Güvenliği Uyumu",
    category: "Mevzuat & Güvenlik",
    description: "Yapay zekâ çıktılarında halüsinasyon (yanılsama) kontrolü, telif hakları, KVKK kapsamında öğrenci kişisel verilerinin korunması ve MEB yönergelerine tam riayet etme.",
    pedagogicalImpact: "Sınıf içi yapay zekâ kullanımında yasal ve etik riskleri sıfırlar.",
    badge: "Etik & Mevzuat"
  },
  {
    id: "comp-6",
    icon: "Zap",
    title: "RGB & RTF Formülleriyle Kusursuz Prompt Yazımı",
    category: "İstem Mühendisliği",
    description: "Rol (Role), Görev (Task), Format (Format) ve Rol-Girdi-Beklenen Çıktı teknikleriyle yapay zekâ modellerinden ilk seferde hatasız, öğretmen seviyesinde çıktılar alma.",
    pedagogicalImpact: "Tekrarlanan deneme-yanılma süresini ortadan kaldırır.",
    badge: "Hızlı Üretim"
  }
];

export const FEATURED_AI_TOOLS: AIToolItem[] = [
  {
    id: "tool-chatgpt",
    name: "ChatGPT",
    category: "Asistan & Sohbet",
    description: "Dünyanın en popüler çok amaçlı yapay zekâ asistanı. Metin yazımı, ders planı oluşturma ve Sokratik soru hazırlamada standart referans.",
    educationUseCase: "MEB kazanımına göre 10 soruluk açık uçlu sınav ve ayrıntılı puanlama anahtarı (rubrik) hazırlama.",
    pricing: "Freemium",
    url: "https://chatgpt.com",
    featured: true,
    tags: ["Ders Planı", "Rubrik", "Soru Hazırlama", "Genel"]
  },
  {
    id: "tool-gemini",
    name: "Google Gemini",
    category: "Asistan & Sohbet",
    description: "Google'ın 2 milyon token bağlam hafızasına sahip çok modlu AI asistanı. Kitap boyutunda PDF'leri, ders kitaplarını ve MEB müfredatını tek seferde analiz eder.",
    educationUseCase: "Tüm dönemin ders kitabını veya zümre kararlarını yükleyip ünite temelli yıllık plan ve kazanım haritası çıkartma.",
    pricing: "Ücretsiz",
    url: "https://gemini.google.com",
    featured: true,
    tags: ["Büyük Dosya Analizi", "Google Entegrasyonu", "Görsel Okuma"]
  },
  {
    id: "tool-claude",
    name: "Claude AI",
    category: "Asistan & Sohbet",
    description: "Anthropic tarafından geliştirilen, doğal dil kalitesi en yüksek ve pedagojik üslubu en zarif yapay zekâ modeli. 'Artifacts' özelliği ile canlı etkileşimli mini uygulamalar üretir.",
    educationUseCase: "Öğrenciler için HTML/JS tabanlı interaktif periyodik tablo, matematik bulmacası veya tarih zaman çizelgesi kodlatma.",
    pricing: "Freemium",
    url: "https://claude.ai",
    featured: true,
    tags: ["Akademik Dil", "Artifacts", "İnteraktif Uygulama"]
  },
  {
    id: "tool-notebooklm",
    name: "NotebookLM",
    category: "Ders & Sunum",
    description: "Google'ın sadece sizin yüklediğiniz kaynaklara (PDF, Google Docs, linkler) dayanarak çalışan kişiselleştirilmiş araştırma ve sesli özet (Deep Dive podcast) asistanı.",
    educationUseCase: "Kendi ders notlarınızı yükleyerek öğrenciler için 10 dakikalık iki yapay zekâ sunucusunun tartıştığı Türkçe/İngilizce radyo yayını üretme.",
    pricing: "Ücretsiz",
    url: "https://notebooklm.google.com",
    featured: true,
    tags: ["Sesli Podcast", "Sıfır Halüsinasyon", "Ders Notu Analizi"]
  },
  {
    id: "tool-diffit",
    name: "Diffit for Teachers",
    category: "Ders & Sunum",
    description: "Öğretmenler için özel tasarlanmış yapay zekâ platformu. Herhangi bir konuyu, makaleyi veya YouTube videosunu seçtiğiniz sınıf düzeyine (1-12. sınıf) anında uyarlar.",
    educationUseCase: "Aynı fen konusunu 4. sınıf seviyesinde okuma parçası, kelime listesi ve çoktan seçmeli sorulara tek tıkla dönüştürme.",
    pricing: "Freemium",
    url: "https://web.diffit.me",
    featured: true,
    tags: ["Kişiselleştirilmiş Düzey", "Farklılaştırılmış Eğitim", "Etkinlik Sayfası"]
  },
  {
    id: "tool-curipod",
    name: "Curipod",
    category: "Ders & Sunum",
    description: "Sınıf içi interaktif anketler, açık uçlu sorular, çizim aktiviteleri ve kelime bulutları içeren yapay zekâ destekli slayt sunum üreticisi.",
    educationUseCase: "Konu başlığını girerek öğrencilerin cep telefonu veya akıllı tahtadan katılabileceği 15 dakikalık tam interaktif ders sunumu hazırlama.",
    pricing: "Freemium",
    url: "https://curipod.com",
    featured: true,
    tags: ["Akıllı Tahta", "Canlı Etkileşim", "Oyunlaştırma"]
  },
  {
    id: "tool-gamma",
    name: "Gamma App",
    category: "Ders & Sunum",
    description: "Tek bir komuttan saniyeler içinde profesyonel ders sunumları, web sayfaları ve dokümanlar üreten yapay zekâ sunum aracı.",
    educationUseCase: "Zümre toplantısı veya veli bilgilendirme toplantısı için 10 slaytlık görsel ağırlıklı modern sunum tasarlama.",
    pricing: "Freemium",
    url: "https://gamma.app",
    featured: true,
    tags: ["Sunum Hazırlama", "Hızlı Tasarım", "Görsel Düzen"]
  },
  {
    id: "tool-quizizz-ai",
    name: "Quizizz AI",
    category: "Soru & Değerlendirme",
    description: "Yüklenen ders kitabından, web adresinden veya YouTube videosundan saniyeler içinde yarışma formatında test ve değerlendirme soruları çıkaran öğretmen aracı.",
    educationUseCase: "Bir YouTube ders anlatım videosundan 10 adet zaman damgalı kontrol sorusu ve anında geri bildirimli yarışma türetme.",
    pricing: "Freemium",
    url: "https://quizizz.com",
    featured: true,
    tags: ["Oyunlaştırılmış Sınav", "Video Soru Çıkarma", "Anlık Rapor"]
  },
  {
    id: "tool-canva-magic",
    name: "Canva Magic Studio",
    category: "Görsel & Tasarım",
    description: "MEB öğretmenleri için ücretsiz Canva for Education ile entegre çalışan yapay zekâ görsel oluşturucu, sihirli silgi ve metinden görsel üretim araçları.",
    educationUseCase: "Sınıf kapı süsü, pano afişleri, başarı belgeleri ve infografik ders özetlerini yapay zekâ desteğiyle tasarlama.",
    pricing: "MEB / Kurumsal",
    url: "https://www.canva.com/education",
    featured: true,
    tags: ["Öğretmenlere Ücretsiz", "Pano Tasarımı", "Sertifika & Afiş"]
  },
  {
    id: "tool-elevenlabs",
    name: "ElevenLabs",
    category: "Ses & Video",
    description: "İnsan doğallığında duygu ve vurgu içeren seslendirme yapabilen lider yapay zekâ ses motoru. Kusursuz Türkçe desteği sunar.",
    educationUseCase: "Tarih dersinde Mustafa Kemal Atatürk'ün bir nutkunu veya bir edebi şiiri canlandırarak öğrencilere dinletme.",
    pricing: "Freemium",
    url: "https://elevenlabs.io",
    featured: false,
    tags: ["Türkçe Seslendirme", "Dramatizasyon", "İşitsel Materyal"]
  },
  {
    id: "tool-aistudio",
    name: "Google AI Studio",
    category: "Üretken Kod & Web",
    description: "Gemini 2.0 Flash ve Gemini 1.5 Pro modellerine doğrudan, ücretsiz API anahtarı ve sistem talimatı (System Prompt) ile erişim sağlayan profesyonel geliştirici arayüzü.",
    educationUseCase: "Okul içi kullanım için sıfır maliyetle kendi branşınıza özel 'Öğretmen Asistanı Web Uygulaması' prototipleme.",
    pricing: "Ücretsiz",
    url: "https://aistudio.google.com",
    featured: true,
    tags: ["Ücretsiz API", "Özelleştirilmiş Sistem", "Geliştirici Gücü"]
  },
  {
    id: "tool-suno",
    name: "Suno AI",
    category: "Ses & Video",
    description: "Yazdığınız şarkı sözlerini veya eğitim kavramlarını birkaç saniye içinde tam prodüksiyonlu şarkıya (pop, rock, çocuk şarkısı, marş) dönüştüren müzik yapay zekâsı.",
    educationUseCase: "Çarpım tablosu, periyodik cetvel veya Türkçe sesli harfler kurallarını akılda kalıcı eğlenceli bir okul şarkısına dönüştürme.",
    pricing: "Freemium",
    url: "https://suno.com",
    featured: false,
    tags: ["Eğitici Müzik", "Şarkı Üretimi", "İlkokul / Ortaokul"]
  }
];

export const LANGUAGE_MODELS: LanguageModelItem[] = [
  {
    id: "model-gpt4o",
    name: "GPT-4o / GPT-4o mini",
    developer: "OpenAI",
    contextWindow: "128.000 Token (~300 sayfa)",
    strengths: [
      "Dünya genelinde en geniş ekosistem ve eklenti desteği",
      "Gelişmiş sesli sohbet modu (mobil uygulamada anlık karşılıklı konuşma)",
      "Pedagojik rubrik ve çoktan seçmeli soru hazırlamada yüksek başarı",
      "Canvas modu ile metin ve kod üzerinde satır satır ortak düzenleme"
    ],
    educationFit: "Günlük ders planı hazırlığı, sınav soruları oluşturma ve veli mektupları yazımı için en pratik seçim.",
    freeTierStatus: "GPT-4o mini ücretsiz, GPT-4o sınırlı kotalı ücretsiz.",
    url: "https://chatgpt.com",
    bestFor: "Genel Öğretmen Asistanlığı & Soru Hazırlama",
    badge: "En Popüler"
  },
  {
    id: "model-gemini-pro",
    name: "Google Gemini 1.5 Pro / 2.0 Flash",
    developer: "Google DeepMind",
    contextWindow: "2.000.000 Token (~5.000 sayfa)",
    strengths: [
      "Dünyanın en büyük bağlam hafızası (Kitap boyutunda dökümanlar tek seferde)",
      "Google Drive, Docs ve YouTube doğrudan entegrasyonu",
      "Çok modlu (Multimodal) görsel, ses ve video karelerini analiz etme",
      "Google AI Studio üzerinden öğretmenler için cömert ücretsiz API imkanı"
    ],
    educationFit: "Kalın MEB ders kitaplarını, zümre tutanaklarını veya tezleri yükleyip dönemlik müfredat analizi ve ünite haritası çıkartmak için rakipsiz.",
    freeTierStatus: "Gemini 2.0 Flash tamamen ücretsiz, web ve AI Studio'da geniş kota.",
    url: "https://gemini.google.com",
    bestFor: "Ders Kitabı & Uzun Belge Analizi",
    badge: "2M Token Lideri"
  },
  {
    id: "model-claude-3-7",
    name: "Claude 3.7 Sonnet / 3.5 Haiku",
    developer: "Anthropic",
    contextWindow: "200.000 Token (~500 sayfa)",
    strengths: [
      "En doğal ve incelikli Türkçe anlatım yeteneği, az yapaylık",
      "Artifacts özelliği: Slayt, interaktif simülasyon ve formları anında çalıştırma",
      "Hibrit Düşünme (Extended Thinking): Matematik ve fen problemlerinde adım adım sağlam mantık",
      "Eğitim etiği ve güvenlik filtrelerinde sektör standardı güvenilirlik"
    ],
    educationFit: "Edebi metin çözümlemeleri, karmaşık geometri/fizik çözümleri ve sınıf içi interaktif HTML simülasyonları tasarlamak için ideal.",
    freeTierStatus: "Web arayüzünde günlük sınırlı ücretsiz kullanım mevcuttur.",
    url: "https://claude.ai",
    bestFor: "Pedagojik İfade & İnteraktif Simülasyon",
    badge: "En Güçlü Mantık"
  },
  {
    id: "model-deepseek-r1",
    name: "DeepSeek R1 / V3",
    developer: "DeepSeek AI",
    contextWindow: "64.000 - 128.000 Token",
    strengths: [
      "Açık kaynak akıl yürütme (Reasoning) modeli; düşünce zincirini (CoT) şeffaf gösterir",
      "Matematiksel kanıt ve olimpiyat sorularında sıra dışı başarım",
      "Düşük maliyetli veya yerel bilgisayarda (Ollama ile) çevrimdışı çalışma imkanı",
      "Sınav hazırlıklarında mantık hatalarını adım adım denetleme"
    ],
    educationFit: "LGS/YKS zorlayıcı sayısal sorularını adım adım çözdürmek ve mantık kurgusunu test etmek için.",
    freeTierStatus: "Web'de ve API'da son derece ucuz / ücretsiz açık erişim.",
    url: "https://chat.deepseek.com",
    bestFor: "Matematik & Mantıksal Çözümleme",
    badge: "Açık Kaynak Akıl Yürütme"
  }
];

export { INITIAL_WEEKS, CURRICULUM_UNITS, HAZIRLIK_OTURUMU } from './curriculumData';

export const ADDITIONAL_RESOURCES: ResourceItem[] = [
  {
    id: "res-meb-etik",
    title: "MEB Eğitimde Yapay Zekâ Politika Belgesi ve Etik İlkeler Kılavuzu",
    organization: "Millî Eğitim Bakanlığı",
    category: "Resmi Mevzuat",
    description: "MEB tarafından yayımlanan, okullarda yapay zekâ kullanımında öğrenci veri gizliliği, telif hakları ve etik sorumlulukları düzenleyen resmi temel referans metni.",
    linkText: "MEB Resmi Dokümanı İncele",
    url: "https://meb.gov.tr",
    fileType: "PDF / Mevzuat"
  },
  {
    id: "res-unesco",
    title: "UNESCO Öğretmenler İçin Yapay Zekâ Yetkinlik Çerçevesi (AI Competency Framework)",
    organization: "UNESCO",
    category: "Resmi Mevzuat",
    description: "Öğretmenlerin 21. yüzyıl sınıflarında yapay zekâ araçlarını pedagojik, etik ve profesyonel gelişim boyutlarında nasıl kullanacaklarını belirleyen küresel standart.",
    linkText: "UNESCO Çerçeve Belgesini Oku",
    url: "https://www.unesco.org/en/digital-education/ai-teachers",
    fileType: "Küresel Rapor"
  },
  {
    id: "res-prompt-bankasi",
    title: "Öğretmenler İçin Türkçe Eğitim Prompt Bankası (50+ Şablon)",
    organization: "Fatih TOLA Öğretmen Akademisi",
    category: "Prompt Kütüphanesi",
    description: "Ders planı, yazılı sınav, rubrik, veli mektubu, proje ödevi ve sınıf içi oyunlaştırma için doğrudan kopyalanıp doldurulabilir modüler istemler.",
    linkText: "Prompt Bankasını Aç",
    url: "#prompt-bank",
    fileType: "İnteraktif Şablon"
  },
  {
    id: "res-aistudio-rehber",
    title: "Google AI Studio & Gemini API Öğretmen Başlangıç Kılavuzu",
    organization: "Google for Education & AI Studio",
    category: "Teknik Rehber",
    description: "Öğretmenlerin ücretsiz Gemini 2.0 API anahtarı alması, System Instructions tanımlaması ve kendi okul asistanını kodsuz yayına alması için adım adım resimli rehber.",
    linkText: "AI Studio Rehberine Git",
    url: "https://aistudio.google.com",
    fileType: "Teknik Dokümantasyon"
  },
  {
    id: "res-ders-plani-sablonu",
    title: "MEB Uyumlu 5E Modeli Yapay Zekâ Destekli Ders Planı Şablonu",
    organization: "Eğitim Teknolojileri Zümresi",
    category: "Ders Şablonu",
    description: "Giriş (Engage), Keşfetme (Explore), Açıklama (Explain), Derinleştirme (Elaborate) ve Değerlendirme (Evaluate) aşamalarını yapay zekâya işleten hazır plan formatı.",
    linkText: "5E Şablonunu Kopyala",
    url: "#5e-template",
    fileType: "Word / Markdown"
  },
  {
    id: "res-bep-sablonu",
    title: "Özel Eğitim ve BEP (Bireyselleştirilmiş Eğitim Programı) AI Asistan Şablonu",
    organization: "Rehberlik Servisi",
    category: "Etik & Güvenlik",
    description: "Kaynaştırma öğrencileri ve özel öğrenme güçlüğü olan çocuklar için kazanım basitleştirme ve uyarlanmış etkinlik tasarlama istem yönergesi.",
    linkText: "BEP İstem Kılavuzunu İncele",
    url: "#bep-guide",
    fileType: "Pedagojik Rehber"
  }
];

export const SAMPLE_PROMPT_CATALOG: PromptTemplate[] = [
  {
    id: "pr-1",
    title: "Kazanım Odaklı 40 Dakikalık 5E Ders Planı",
    branch: "Tüm Branşlar",
    gradeLevel: "İlkokul / Ortaokul / Lise",
    goal: "Ders planı hazırlama süresini kısaltmak ve MEB kazanımına %100 uyum sağlamak.",
    promptText: `Rol: 15 yıllık kıdemli bir [Branşınız] öğretmenisin.
Görev: MEB öğretim programında yer alan "[Kazanım Adı veya Kodu]" kazanımı için 40 dakikalık bir 5E ders planı hazırla.
Aşamalar:
1. Giriş (Engage - 5 dk): Öğrencilerin dikkatini çekecek şaşırtıcı bir soru veya kısa bir günlük hayat hikayesi.
2. Keşfetme (Explore - 15 dk): Öğrencilerin gruplar halinde yapacağı somut bir etkinlik.
3. Açıklama (Explain - 10 dk): Temel kavramların öğretmen ve öğrencilerce tanımlanması.
4. Derinleştirme (Elaborate - 7 dk): Konunun yeni bir duruma transfer edilmesi.
5. Değerlendirme (Evaluate - 3 dk): 2 adet hızlı çıkış kartı (exit ticket) sorusu.
Format: Sade Markdown başlıkları ve maddeler halinde yaz.`,
    recommendedModel: "ChatGPT veya Claude 3.7"
  },
  {
    id: "pr-2",
    title: "Açık Uçlu Sınav ve Analitik Rubrik Hazırlama",
    branch: "Matematik / Fen / Edebiyat / Sosyal",
    gradeLevel: "Ortaokul / Lise",
    goal: "MEB ortak sınav formatına tam uyumlu açık uçlu sorular ve nesnel puanlama tablosu türetmek.",
    promptText: `Rol: Ölçme ve Değerlendirme Uzmanısın.
Görev: [Ders Adı], [Sınıf] seviyesinde [Ünite Adı] konusu için MEB açık uçlu sınav sistemine uygun 4 farklı soru hazırla.
Soruların bilişsel düzeyleri:
- 1. Soru: Kavrama düzeyi
- 2. Soru: Uygulama düzeyi (Problem çözme)
- 3. Soru: Analiz düzeyi (Grafik, tablo veya olay yorumlama)
- 4. Soru: Değerlendirme düzeyi (Fikir savunma)
Ek olarak her soru için:
- Doğru model çözüm adımları
- 0, 5, 10 puanlık kriterleri içeren net Analitik Rubrik Tablosu ekle.
Format: Sınav kağıdı formatında düzenle.`,
    recommendedModel: "Claude 3.7 veya GPT-4o"
  },
  {
    id: "pr-3",
    title: "Sokratik Öğrenci Koçu (Düşündüren Öğretmen)",
    branch: "Tüm Branşlar",
    gradeLevel: "Tüm Seviyeler",
    goal: "Öğrenci soru sorduğunda cevabı direkt vermeyip onu düşündüren akıllı asistan oluşturmak.",
    promptText: `Sen şefkatli, sabırlı ve bilge bir Sokratik [Branşınız] öğretmenisin.
Temel Kuralın: Öğrenci sana hangi soruyu sorarsa sorsun ASLA doğrudan cevabı veya sonucun rakamını söylemeyeceksin!
İzleyeceğin Adımlar:
1. Öğrencinin sorusunu anladığını teyit et ve onu çabasından dolayı tebrik et.
2. Bu soruyla ilgili öğrencinin daha önce öğrendiği temel kavramı hatırlatacak 1 adet yönlendirici soru sor.
3. Gerekirse günlük hayattan benzetme (analoji) yap.
4. Öğrenci doğru adıma yaklaştıkça onu bir sonraki adıma geçir.
Üslubun: Her zaman samimi, cesaretlendirici ve merak uyandırıcı olmalı. Şimdi öğrenciden gelecek ilk soruyu bekle.`,
    recommendedModel: "Google Gemini 2.0 Flash / AI Studio"
  },
  {
    id: "pr-4",
    title: "Farklılaştırılmış Okuma Parçası ve Seviye Uyarlaması",
    branch: "Türkçe / Edebiyat / İngilizce / Sosyal",
    gradeLevel: "İlkokul / Ortaokul",
    goal: "Aynı metni sınıftaki farklı okuma düzeyindeki öğrenciler için yeniden seviyelendirmek.",
    promptText: `Rol: Farklılaştırılmış Eğitim ve Özel Öğretim Yöntemleri Uzmanısın.
Konu: [İşlenecek Metin veya Tarihi Olay]
Görev: Bu konuyu aynı sınıfta öğrenen farklı düzeydeki öğrenciler için 3 versiyonda hazırla:
- Seviye A (Destek İhtiyacı Olan): Kısa cümleler, temel kelimeler, her paragraf sonunda 1 kontrol sorusu (100 kelime).
- Seviye B (Sınıf Düzeyi): Standart anlatım, 2 çıkarım sorusu (180 kelime).
- Seviye C (İleri Düzey): Zenginleştirilmiş kavramlar, analitik düşünme ve eleştirel karşılaştırma sorusu (250 kelime).
Format: Her seviyeyi açıkça başlıklandırarak sun.`,
    recommendedModel: "ChatGPT veya Claude"
  }
];
