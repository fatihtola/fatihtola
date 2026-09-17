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
    name: "1. Grup (Matematik & Fen Zümresi - A)",
    day: "Pazartesi",
    timeSlot: "15:30 - 16:10",
    location: "BT Laboratuvarı 1",
    currentWeek: 1,
    totalWeeks: 8,
    participants: [
      { id: "p1", fullName: "Ahmet Yılmaz", branch: "Matematik", attendance: [true, false, false, false, false, false, false, false] },
      { id: "p2", fullName: "Zeynep Kaya", branch: "Fen Bilimleri", attendance: [true, false, false, false, false, false, false, false] },
      { id: "p3", fullName: "Mehmet Demir", branch: "Fizik", attendance: [true, false, false, false, false, false, false, false] },
      { id: "p4", fullName: "Elif Çelik", branch: "Kimya", attendance: [true, false, false, false, false, false, false, false] },
      { id: "p5", fullName: "Burak Şahin", branch: "Biyoloji", attendance: [true, false, false, false, false, false, false, false] }
    ],
    notes: "Ders planı promptları ve Geogebra / formül üretimi üzerine odaklanılacak."
  },
  {
    id: "grup-2",
    groupNumber: 2,
    name: "2. Grup (Türkçe & Edebiyat Zümresi)",
    day: "Salı",
    timeSlot: "15:30 - 16:10",
    location: "BT Laboratuvarı 1",
    currentWeek: 1,
    totalWeeks: 8,
    participants: [
      { id: "p6", fullName: "Ayşe Öztürk", branch: "Türkçe", attendance: [true, false, false, false, false, false, false, false] },
      { id: "p7", fullName: "Kemal Arslan", branch: "Türk Dili ve Edebiyatı", attendance: [true, false, false, false, false, false, false, false] },
      { id: "p8", fullName: "Fatma Doğan", branch: "Türkçe", attendance: [true, false, false, false, false, false, false, false] },
      { id: "p9", fullName: "Mustafa Koç", branch: "Türk Dili ve Edebiyatı", attendance: [true, false, false, false, false, false, false, false] }
    ],
    notes: "Metin analizi, okuduğunu anlama soruları ve yaratıcı yazarlık promptları."
  },
  {
    id: "grup-3",
    groupNumber: 3,
    name: "3. Grup (Yabancı Diller Zümresi)",
    day: "Çarşamba",
    timeSlot: "15:30 - 16:10",
    location: "Dil Laboratuvarı",
    currentWeek: 1,
    totalWeeks: 8,
    participants: [
      { id: "p10", fullName: "Selin Yıldırım", branch: "İngilizce", attendance: [true, false, false, false, false, false, false, false] },
      { id: "p11", fullName: "Deniz Aydın", branch: "İngilizce", attendance: [true, false, false, false, false, false, false, false] },
      { id: "p12", fullName: "Ebru Güneş", branch: "Almanca", attendance: [true, false, false, false, false, false, false, false] },
      { id: "p13", fullName: "Caner Bulut", branch: "İngilizce", attendance: [true, false, false, false, false, false, false, false] }
    ],
    notes: "Konuşma pratik botları, telaffuz araçları ve seviyeye uygun reading metni üretimi."
  },
  {
    id: "grup-4",
    groupNumber: 4,
    name: "4. Grup (Sosyal Bilgiler & Tarih/Coğrafya)",
    day: "Perşembe",
    timeSlot: "15:30 - 16:10",
    location: "BT Laboratuvarı 1",
    currentWeek: 1,
    totalWeeks: 8,
    participants: [
      { id: "p14", fullName: "İbrahim Kurt", branch: "Tarih", attendance: [true, false, false, false, false, false, false, false] },
      { id: "p15", fullName: "Merve Çetin", branch: "Coğrafya", attendance: [true, false, false, false, false, false, false, false] },
      { id: "p16", fullName: "Hakan Özkan", branch: "Sosyal Bilgiler", attendance: [true, false, false, false, false, false, false, false] },
      { id: "p17", fullName: "Derya Keskin", branch: "Felsefe", attendance: [true, false, false, false, false, false, false, false] }
    ],
    notes: "Tarihsel rol yapma botları (Role-play AI) ve infografik materyal tasarımı."
  },
  {
    id: "grup-5",
    groupNumber: 5,
    name: "5. Grup (İlkokul / Sınıf Öğretmenleri - A)",
    day: "Cuma",
    timeSlot: "14:30 - 15:10",
    location: "Öğretmenler Odası Toplantı Salonu",
    currentWeek: 1,
    totalWeeks: 8,
    participants: [
      { id: "p18", fullName: "Semra Aksoy", branch: "Sınıf Öğretmenliği", attendance: [true, false, false, false, false, false, false, false] },
      { id: "p19", fullName: "Oğuzhan Tekin", branch: "Sınıf Öğretmenliği", attendance: [true, false, false, false, false, false, false, false] },
      { id: "p20", fullName: "Berna Polat", branch: "Sınıf Öğretmenliği", attendance: [true, false, false, false, false, false, false, false] },
      { id: "p21", fullName: "Turgut Yavuz", branch: "Sınıf Öğretmenliği", attendance: [true, false, false, false, false, false, false, false] }
    ],
    notes: "Okuma anlama etkinlik kağıtları, masal üretimi ve eğitici boyama sayfaları."
  },
  {
    id: "grup-6",
    groupNumber: 6,
    name: "6. Grup (İlkokul / Sınıf Öğretmenleri - B)",
    day: "Pazartesi",
    timeSlot: "16:20 - 17:00",
    location: "BT Laboratuvarı 2",
    currentWeek: 1,
    totalWeeks: 8,
    participants: [
      { id: "p22", fullName: "Gülşen Erdem", branch: "Sınıf Öğretmenliği", attendance: [true, false, false, false, false, false, false, false] },
      { id: "p23", fullName: "Ali Rıza Şimşek", branch: "Sınıf Öğretmenliği", attendance: [true, false, false, false, false, false, false, false] },
      { id: "p24", fullName: "Nesrin Korkmaz", branch: "Sınıf Öğretmenliği", attendance: [true, false, false, false, false, false, false, false] }
    ],
    notes: "Kavram öğretimi görselleri ve veli bilgilendirme bülteni hazırlama."
  },
  {
    id: "grup-7",
    groupNumber: 7,
    name: "7. Grup (Matematik & Fen Zümresi - B)",
    day: "Salı",
    timeSlot: "16:20 - 17:00",
    location: "BT Laboratuvarı 1",
    currentWeek: 1,
    totalWeeks: 8,
    participants: [
      { id: "p25", fullName: "Serdar Bayraktar", branch: "Matematik", attendance: [true, false, false, false, false, false, false, false] },
      { id: "p26", fullName: "Duygu Uysal", branch: "Fen Bilimleri", attendance: [true, false, false, false, false, false, false, false] },
      { id: "p27", fullName: "Murat Taş", branch: "Biyoloji", attendance: [true, false, false, false, false, false, false, false] }
    ],
    notes: "LGS ve YKS tipi yeni nesil beceri temelli soru havuzları oluşturma."
  },
  {
    id: "grup-8",
    groupNumber: 8,
    name: "8. Grup (Güzel Sanatlar & Beden Eğitimi & Müzik)",
    day: "Çarşamba",
    timeSlot: "16:20 - 17:00",
    location: "Çok Amaçlı Salon",
    currentWeek: 1,
    totalWeeks: 8,
    participants: [
      { id: "p28", fullName: "Hande Yalçın", branch: "Görsel Sanatlar", attendance: [true, false, false, false, false, false, false, false] },
      { id: "p29", fullName: "Barış Eren", branch: "Müzik", attendance: [true, false, false, false, false, false, false, false] },
      { id: "p30", fullName: "Serhat Genç", branch: "Beden Eğitimi", attendance: [true, false, false, false, false, false, false, false] }
    ],
    notes: "Suno AI ile eğitim şarkısı besteleme, Midjourney/Firefly ile sanat tarihi görselleri."
  },
  {
    id: "grup-9",
    groupNumber: 9,
    name: "9. Grup (Rehberlik & Özel Eğitim Zümresi)",
    day: "Perşembe",
    timeSlot: "16:20 - 17:00",
    location: "Rehberlik Servisi Toplantı Odası",
    currentWeek: 1,
    totalWeeks: 8,
    participants: [
      { id: "p31", fullName: "Pınar Avcı", branch: "Rehberlik / Psikolojik Danışmanlık", attendance: [true, false, false, false, false, false, false, false] },
      { id: "p32", fullName: "Onur Başar", branch: "Özel Eğitim", attendance: [true, false, false, false, false, false, false, false] },
      { id: "p33", fullName: "Esra Tan", branch: "Rehberlik", attendance: [true, false, false, false, false, false, false, false] }
    ],
    notes: "Bireyselleştirilmiş Eğitim Planı (BEP) hazırlama, davranış takip formu oluşturma."
  },
  {
    id: "grup-10",
    groupNumber: 10,
    name: "10. Grup (Bilişim & Mesleki Alan Öğretmenleri)",
    day: "Cuma",
    timeSlot: "15:20 - 16:00",
    location: "BT Laboratuvarı 1",
    currentWeek: 1,
    totalWeeks: 8,
    participants: [
      { id: "p34", fullName: "Emre Vural", branch: "Bilişim Teknolojileri", attendance: [true, false, false, false, false, false, false, false] },
      { id: "p35", fullName: "Tolga Sağlam", branch: "Elektrik-Elektronik", attendance: [true, false, false, false, false, false, false, false] },
      { id: "p36", fullName: "Gizem Acar", branch: "Grafik ve Tasarım", attendance: [true, false, false, false, false, false, false, false] }
    ],
    notes: "Google AI Studio, API entegrasyonu, web tabanlı eğitim botları ve ileri düzey projeler."
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

export const INITIAL_WEEKS: WeekSession[] = [
  {
    id: "hafta-1",
    weekNumber: 1,
    title: "1. Hafta: Eğitimde Yapay Zekâya Giriş ve Temel Kavramlar",
    duration: "40 Dakika (1 Ders Saati)",
    category: "temel",
    summary: "Yapay zekânın eğitimdeki yeri, büyük dil modellerinin (LLM) çalışma felsefesi, öğretmenler için fırsatlar ve sınırlılıklar. İlk istem denemeleri.",
    learningOutcomes: [
      "Yapay zekâ ve üretken yapay zekâ (Generative AI) ayrımını kavrar.",
      "Büyük dil modellerinin birer 'olasılık ve örüntü motoru' olduğunu anlar.",
      "Halüsinasyon kavramını öğrenir ve çıktı doğrulama refleksini kazanır."
    ],
    sessionFlow: [
      { minuteRange: "00-10 dk", activity: "Kavramsal Çerçeve", description: "Yapay zekâ nedir? Eğitimde yapay zekânın pedagojik fırsatları ve öğretmenin değişen rolü." },
      { minuteRange: "10-22 dk", activity: "Model Karşılaştırması & Canlı Demo", description: "ChatGPT, Gemini ve Claude arayüzlerinin incelenmesi. Aynı soruya farklı modellerin yanıtları." },
      { minuteRange: "22-34 dk", activity: "Öğretmen İlk İstem Uygulaması", description: "Katılımcıların kendi branşlarında ilk 5 soruluk mini etkinlik kağıdını yazdırması." },
      { minuteRange: "34-40 dk", activity: "Etik Değerlendirme & Soru-Cevap", description: "Öğrenci verilerinin gizliliği (KVKK) ve haftalık uygulama görevinin paylaşımı." }
    ],
    keyTools: [
      { name: "ChatGPT", url: "https://chatgpt.com", purpose: "İlk genel istem denemeleri ve arayüz keşfi" },
      { name: "Google Gemini", url: "https://gemini.google.com", purpose: "Hızlı yanıt ve güncel internet verisiyle sorgulama" }
    ],
    practicalExercise: "Kendi branşınızda bu hafta işleyeceğiniz bir konuyu seçin ve yapay zekâdan '5. sınıf öğrencisinin ilgisini çekecek 3 dakikalık bir giriş hikayesi' yazmasını isteyin.",
    samplePrompt: "Rol: Deneyimli bir [Branşınız] öğretmenisin.\nGörev: [Sınıf Seviyeniz] öğrencilerine [Konu Başlığınız] konusunu anlatırken dersin başında dikkat çekmek için 150 kelimelik merak uyandırıcı, günlük hayatla bağlantılı bir açılış senaryosu oluştur.\nFormat: Akıcı bir dille, 2 paragraf halinde yaz.",
    materials: [
      { title: "MEB Eğitimde Yapay Zeka Uygulamaları Rehberi (Özet)", type: "belge" },
      { title: "ChatGPT & Gemini Hızlı Başlangıç Kılavuzu", type: "sablon" }
    ],
    notes: "Tüm katılımcıların en az bir LLM hesabına (Google/OpenAI) giriş yapabildiğinden emin olunmalıdır."
  },
  {
    id: "hafta-2",
    weekNumber: 2,
    title: "2. Hafta: Öğretmenler İçin İleri Düzey İstem (Prompt) Mühendisliği",
    duration: "40 Dakika (1 Ders Saati)",
    category: "temel",
    summary: "Tek seferde kusursuz yanıt alma sanatı: RGB (Rol-Girdi-Beklenen Çıktı) ve RTF (Rol-Görev-Format) kuralları, Few-Shot istemleme ve Sokratik yönlendirme.",
    learningOutcomes: [
      "Zayıf istem ile pedagojik güçlü istem arasındaki farkı somut olarak görür.",
      "RGB ve RTF istem şablonlarını kendi ders hazırlıklarına uyarlar.",
      "Few-Shot (Örneklemeli) istem tekniğiyle yapay zekâya okul şablonunu öğretir."
    ],
    sessionFlow: [
      { minuteRange: "00-08 dk", activity: "İstem Formülleri Eğitimi", description: "RGB ve RTF yapıları. Neden 'Bana bir sınav hazırla' demek yetersiz kalır?" },
      { minuteRange: "08-20 dk", activity: "Kötü İstem vs İyi İstem Atölyesi", description: "Öğretmenlerin hazırladığı örnek promptların canlı ekranda optimize edilmesi." },
      { minuteRange: "20-32 dk", activity: "Few-Shot Tekniğiyle Format Zorlama", description: "Yapay zekâya 1 örnek gösterip sonraki 5 soruyu tam o kalıpta üretme pratiği." },
      { minuteRange: "32-40 dk", activity: "Haftanın İstem Kataloğu & Kapanış", description: "Öğretmenler için 20 hazır istem şablonunun paylaşımı." }
    ],
    keyTools: [
      { name: "Claude AI", url: "https://claude.ai", purpose: "Metin zarafeti ve ayrıntılı pedagojik üslup testi" },
      { name: "ChatGPT", url: "https://chatgpt.com", purpose: "RGB yapılı istem optimizasyonu" }
    ],
    practicalExercise: "Kendi branşınız için MEB kazanım kodunu da belirterek RTF formülüne uygun 1 adet kapsamlı ders planı istemi yazın ve çıktısını inceleyin.",
    samplePrompt: "Rol: 15 yıllık tecrübeli [Branşınız] Zümre Başkanısın.\nGörev: MEB [Kazanım Kodu / Adı] kazanımına yönelik 40 dakikalık bir ders planı hazırla. Planda Giriş (5 dk), Keşfetme (15 dk), Açıklama (10 dk), Derinleştirme (7 dk) ve Değerlendirme (3 dk) basamakları yer alsın.\nFormat: Markdown tablosu ve maddeli listeler halinde, uygulanabilir öğretmen yönergeleriyle sun.",
    materials: [
      { title: "RGB ve RTF İstem Kartı (PDF/Yazdırılabilir)", type: "sablon" },
      { title: "Öğretmenler İçin 50 Hazır Türkçe Prompt Bankası", type: "link" }
    ],
    notes: "Katılımcılara her istemde mutlaka 'Hedef Kitle / Yaş Grubu' belirtmelerinin önemi vurgulanmalıdır."
  },
  {
    id: "hafta-3",
    weekNumber: 3,
    title: "3. Hafta: MEB Müfredatına Uygun Soru Havuzu, Sınav ve Rubrik Geliştirme",
    duration: "40 Dakika (1 Ders Saati)",
    category: "degerlendirme",
    summary: "Bloom taksonomisine göre basamaklı soru hazırlama, açık uçlu sorular için ayrıntılı analitik dereceli puanlama anahtarı (rubrik) ve kazanım eşleştirme.",
    learningOutcomes: [
      "Hatırlama, anlama, uygulama ve analiz düzeyinde dengeli sınav kağıdı üretir.",
      "MEB ortak sınav standartlarına tam uyumlu açık uçlu soru senaryoları türetir.",
      "Analitik ve holistik rubrikleri 2 dakika içinde yapılandırır."
    ],
    sessionFlow: [
      { minuteRange: "00-08 dk", activity: "Bloom Taksonomisi & Yapay Zekâ", description: "Bilişsel basamakların promptlara entegre edilmesi." },
      { minuteRange: "08-20 dk", activity: "Canlı Açık Uçlu Sınav Üretimi", description: "MEB 1. ve 2. dönem ortak sınav formatına göre 4 senaryolu soru hazırlama." },
      { minuteRange: "20-32 dk", activity: "Rubrik Matrisi Tasarımı", description: "Her soru için 0, 5, 10 puanlık kriterlerin ve beklenen anahtar sözcüklerin yazdırılması." },
      { minuteRange: "32-40 dk", activity: "Diffit & Quizizz AI Entegrasyonu", description: "Metinden veya YouTube linkinden anında soru türeten özel araçların incelenmesi." }
    ],
    keyTools: [
      { name: "Diffit for Teachers", url: "https://web.diffit.me", purpose: "Seviyeye göre farklılaştırılmış soru ve okuma parçaları" },
      { name: "ChatGPT", url: "https://chatgpt.com", purpose: "Analitik rubrik tablosu ve puanlama ölçeği" },
      { name: "Quizizz AI", url: "https://quizizz.com", purpose: "Canlı etkileşimli çoktan seçmeli yarışma türetme" }
    ],
    practicalExercise: "Yaklaşan 1. veya 2. yazılı sınavınız için 4 adet açık uçlu soru ve bu soruların 'Öğrenci Çözüm Örneği + Puanlama Kriterleri' tablosunu oluşturun.",
    samplePrompt: "Rol: Ölçme ve Değerlendirme Uzmanısın.\nGörev: [Ders Adı], [Sınıf] seviyesinde [Ünite Adı] için Bloom taksonomisinin 'Uygulama' ve 'Analiz' basamaklarında 3 adet açık uçlu soru ve her bir soru için 4 sütunlu (Yetersiz-1, Geliştirilmeli-2, Başarılı-3, Mükemmel-4) analitik rubrik tablosu hazırla.\nFormat: Tablo düzeninde, anlaşılır puanlama açıklamalarıyla sun.",
    materials: [
      { title: "MEB Açık Uçlu Sınav Yönergesi Şablonu", type: "belge" },
      { title: "Bloom Taksonomisi İstem Çarkı", type: "sablon" }
    ],
    notes: "Sorularda çeldiricilerin mantıklı ve öğretici olması kuralı hatırlatılacak."
  },
  {
    id: "hafta-4",
    weekNumber: 4,
    title: "4. Hafta: Görsel, Tasarım ve Multimodal Materyal Üretimi",
    duration: "40 Dakika (1 Ders Saati)",
    category: "multimodal",
    summary: "Canva Magic Studio, Adobe Firefly ve Midjourney mantığı ile eğitim afişleri, kavram karikatürleri, boyama sayfaları ve infografik tasarlama.",
    learningOutcomes: [
      "Metinden görsel üreten (Text-to-Image) modellerin parametrelerini (oran, stil, aydınlatma) kavrar.",
      "Canva for Education yapay zekâ özelliklerini sınıf panosu ve çalışma kağıtlarında kullanır.",
      "Telif sorunu olmayan özgün eğitsel grafikler üretir."
    ],
    sessionFlow: [
      { minuteRange: "00-08 dk", activity: "Eğitimde Görsel Yapay Zekâ", description: "Görsel prompt yazımı: Konu, stil, açı, aydınlatma ve en-boy oranı (--ar 16:9, 1:1)." },
      { minuteRange: "08-20 dk", activity: "Canva Magic Studio Uygulaması", description: "Ders afişi, kavram haritası ve pano tasarımında AI kullanımı." },
      { minuteRange: "20-32 dk", activity: "Kavram Karikatürü ve Boyama Sayfası", description: "İlkokul ve ortaokul için siyah-beyaz çizgi çizim boyama kağıtları türetme." },
      { minuteRange: "32-40 dk", activity: "Görsel Okuma & Çözümleme", description: "Bir görseli ChatGPT/Gemini'ye yükleyip 'Bu grafiği öğrencilere açıklayan 3 soru yaz' uygulaması." }
    ],
    keyTools: [
      { name: "Canva for Education", url: "https://www.canva.com/education", purpose: "Öğretmen hesabı ile sınırsız yapay zekâ tasarımı" },
      { name: "Adobe Firefly", url: "https://firefly.adobe.com", purpose: "Etik ve ticari güvenli görsel üretimi" },
      { name: "Google Gemini", url: "https://gemini.google.com", purpose: "Görsel yükleyip ders etkinliği analizi çıkarma" }
    ],
    practicalExercise: "Dersinizin en soyut veya anlaşılması zor bir kavramını anlatan 1 adet renkli sınıf panosu afişi ve 1 adet kavram karikatürü tasarlayın.",
    samplePrompt: "Görsel İstemi: 'A clean, vibrant educational vector infographic illustration depicting [Kavramınız - örn: Su Döngüsü / Fotosentez], showing labeled steps in clear modern flat design, educational poster style, high contrast, warm daylight, 4k resolution, no clutter --ar 16:9'",
    materials: [
      { title: "Eğitim Görselleri İçin İngilizce/Türkçe Prompt Sözlüğü", type: "sablon" },
      { title: "Canva Magic Araçları Hızlı Kullanım Rehberi", type: "link" }
    ],
    notes: "Öğretmenlere Canva for Education doğrulamalarını yapmaları için önceden bilgi verilmiş olmalıdır."
  },
  {
    id: "hafta-5",
    weekNumber: 5,
    title: "5. Hafta: İnteraktif Sunumlar ve Akıllı Tahta Etkinlikleri",
    duration: "40 Dakika (1 Ders Saati)",
    category: "icerik",
    summary: "Gamma App ve Curipod ile tek tıkla slayt hazırlama, NotebookLM ile sesli ders özeti üretme ve akıllı tahtada öğrencileri derse katan canlı etkileşimler.",
    learningOutcomes: [
      "10 dakikada 12 slaytlık profesyonel ve modern bir ders sunumu oluşturur.",
      "Curipod ile öğrencilerin telefon/tablet üzerinden canlı katıldığı quizler kurgular.",
      "NotebookLM ile ders notlarından iki sunuculu podcast (Deep Dive) oluşturur."
    ],
    sessionFlow: [
      { minuteRange: "00-08 dk", activity: "Geleneksel Slayt vs AI Sunum", description: "Gamma ve Curipod çalışma prensipleri." },
      { minuteRange: "08-20 dk", activity: "Gamma App ile Canlı Sunum İnşası", description: "Kazanım metninden görsel ve içerik olarak zengin 8 slaytlık ders destesi üretme." },
      { minuteRange: "20-32 dk", activity: "NotebookLM Mucizesi", description: "Öğretmenin PDF ders notunu yükleyip yapay zekâ radyo tiyatrosu/tartışması türetmesi." },
      { minuteRange: "32-40 dk", activity: "Akıllı Tahta & Curipod Entegrasyonu", description: "Etkinliklerin okul tahtalarında tam ekran sunumu ve canlı öğrenci anketi." }
    ],
    keyTools: [
      { name: "Gamma App", url: "https://gamma.app", purpose: "Otomatik sunum ve doküman oluşturucu" },
      { name: "NotebookLM", url: "https://notebooklm.google.com", purpose: "Ders notlarından sıfır halüsinasyonlu podcast ve özet çıkarma" },
      { name: "Curipod", url: "https://curipod.com", purpose: "Canlı öğrenci etkileşimli akıllı tahta sunumları" }
    ],
    practicalExercise: "Önümüzdeki hafta anlatacağınız bir konu için Gamma App üzerinden 8 slaytlık bir sunum türetin ve 2 slaytını kendi anlatım üslubunuza göre düzenleyin.",
    samplePrompt: "Konu: [Ünite Adı]\nHedef Kitle: [Sınıf Seviyesi] öğrencileri.\nİçerik: Konunun günlük hayattaki önemi, 3 temel ilkesi, 1 can alıcı soru ve 1 sınıf içi tartışma etkinliği içeren 8 kartlık akıcı bir Gamma sunumu taslağı hazırla.",
    materials: [
      { title: "Akıllı Tahta Uyumlu Sunum Hazırlama Rehberi", type: "belge" },
      { title: "NotebookLM Kaynak Ekleme ve Podcast Rehberi", type: "link" }
    ],
    notes: "NotebookLM'in Türkçe kaynakları başarıyla özetleyebildiği uygulamalı olarak gösterilecektir."
  },
  {
    id: "hafta-6",
    weekNumber: 6,
    title: "6. Hafta: Öğrenci Veri Analizi, Excel Otomasyonu ve Veli Rehberliği",
    duration: "40 Dakika (1 Ders Saati)",
    category: "degerlendirme",
    summary: "Öğrenci sınav sonuçları tablosunu ChatGPT/Gemini'ye anonim yükleyerek başarı dağılımı grafikleri, eksik kazanım raporları ve kişiye özel gelişim mektupları yazdırma.",
    learningOutcomes: [
      "Excel ve CSV tablolarını yapay zekâya analiz ettirip en çok hata yapılan soruları saptar.",
      "Kişisel verileri (KVKK) korumak için isimleri rumuzlama (Öğrenci A, B, C) kuralını uygular.",
      "Veli toplantıları için öğrencinin güçlü ve geliştirilmesi gereken yönlerini anlatan yapıcı mektuplar üretir."
    ],
    sessionFlow: [
      { minuteRange: "00-08 dk", activity: "KVKK & Veri Güvenliği", description: "Asla öğrenci TC no veya tam adı yüklenmemesi kuralı. Anonimleştirme." },
      { minuteRange: "08-20 dk", activity: "Sınav Notları Analiz Atölyesi", description: "Örnek karne notları tablosundan başarı yüzdesi, medyan ve zayıf konuların tespiti." },
      { minuteRange: "20-32 dk", activity: "Bireysel Gelişim Mektubu Şablonu", description: "Velilere iletilmek üzere olumlu, cesaretlendirici ve somut öneriler içeren rapor metni üretimi." },
      { minuteRange: "32-40 dk", activity: "Rehberlik Servisi & BEP Entegrasyonu", description: "Özel eğitim ve BEP planları için AI desteği ve haftalık özet." }
    ],
    keyTools: [
      { name: "ChatGPT (Advanced Data Analysis)", url: "https://chatgpt.com", purpose: "Excel yükleyip grafik ve korelasyon çıkarma" },
      { name: "Claude AI", url: "https://claude.ai", purpose: "Pedagojik veli mektupları ve nazik rehberlik dili" }
    ],
    practicalExercise: "Sınıfınızdaki 5 anonim öğrencinin (Öğrenci 1..5) sınav notları ve ders içi katılım puanlarını girerek velileri için 1'er paragraflık yapıcı ara karne mektubu hazırlatın.",
    samplePrompt: "Rol: Anlayışlı ve çözüm odaklı bir sınıf rehber öğretmenisin.\nGörev: Matematik dersinde sınav notu 65 olan ancak derse aktif katılan ve ödevlerini düzenli yapan bir öğrenci için velisine hitaben yapıcı, motive edici, evde desteklenebilecek 2 somut çalışma önerisi içeren 120 kelimelik bir gelişim notu yaz.\nFormat: Saygılı ve samimi bir mektup üslubu.",
    materials: [
      { title: "Anonim Öğrenci Not Analiz Şablonu (Excel)", type: "sablon" },
      { title: "Veli İletişiminde Kullanılacak 10 Örnek AI İstem Metni", type: "belge" }
    ],
    notes: "Öğrenci isimlerinin mutlaka anonim tutulması kırmızı çizgimizdir."
  },
  {
    id: "hafta-7",
    weekNumber: 7,
    title: "7. Hafta: Kendi Branş Yapay Zekâ Asistanını Tasarlama (Custom GPT / Gem)",
    duration: "40 Dakika (1 Ders Saati)",
    category: "asistan",
    summary: "Kod yazmadan kendi özel yapay zekâ asistanınızı oluşturma: Sistem talimatı (System Prompt) yazma, branş ders kitabını bilgi tabanı (Knowledge) olarak yükleme ve Sokratik soru sorma davranışı kazandırma.",
    learningOutcomes: [
      "Sistem Talimatı (System Prompt) ile Kullanıcı İstem farkını anlar.",
      "Öğrenciye cevabı direkt vermek yerine ipucu veren Sokratik asistan tasarlar.",
      "Oluşturduğu asistanın paylaşım linkini alıp zümre arkadaşlarıyla paylaşır."
    ],
    sessionFlow: [
      { minuteRange: "00-08 dk", activity: "Özel Asistan Mantığı (Gems & Custom GPTs)", description: "Neden her derse özel bir bot gerekir?" },
      { minuteRange: "08-20 dk", activity: "Canlı Asistan Mimarisi", description: "Adım adım 'Matematik Soru Koçu' veya 'Edebiyat Tahlil Asistanı' sistem komutu yazımı." },
      { minuteRange: "20-32 dk", activity: "Bilgi Tabanı (Knowledge) Yükleme", description: "MEB müfredat PDF'inin bota eklenmesi ve botun sadece bu dökümandan konuşmasının sağlanması." },
      { minuteRange: "32-40 dk", activity: "Botu Test Etme ve Paylaşma", description: "Sınıf ortamında öğrencilere sunulacak güvenli bot linkinin oluşturulması." }
    ],
    keyTools: [
      { name: "Google AI Studio", url: "https://aistudio.google.com", purpose: "System Instructions ile profesyonel asistan tanımlama" },
      { name: "ChatGPT (GPTs)", url: "https://chatgpt.com/gpts", purpose: "Özelleştirilmiş GPT oluşturma sihirbazı" }
    ],
    practicalExercise: "Kendi branşınız için 'Öğrencinin ödevini doğrudan yapmayan, ona düşündürücü sorular sorarak çözüme ulaştıran' bir Sokratik Asistan Sistem Talimatı hazırlayın.",
    samplePrompt: "System Prompt: 'Sen [Ders Adı] dersi için Sokratik bir öğretmen asistanısın. Görevin öğrenci soru sorduğunda ASLA cevabı direkt söylememektir. Bunun yerine öğrencinin bildiklerini sorgulayan 1 adet yönlendirici soru ve küçük bir ipucu ver. Dilin her zaman cesaretlendirici ve Türkçe dil bilgisine tam uygun olsun.'",
    materials: [
      { title: "Sokratik Öğretmen Asistanı System Prompt Şablonu", type: "sablon" },
      { title: "Google AI Studio Sistem Talimatı Ekleme Rehberi", type: "link" }
    ],
    notes: "Öğretmenler geliştirdikleri asistanları birbirleriyle test ederek eğlenceli senaryolar canlandıracaklar."
  },
  {
    id: "hafta-8",
    weekNumber: 8,
    title: "8. Hafta: Öğretmen Proje Sunumları, Okul İçi Yaygınlaştırma ve Sertifikasyon",
    duration: "40 Dakika (1 Ders Saati)",
    category: "proje",
    summary: "10 grubun 2026-2027 eğitim süresince geliştirdiği ders materyalleri, soru bankaları ve yapay zekâ asistanlarının sergilenmesi. Okul içi iyi örnekler havuzunun oluşturulması ve katılım belgeleri.",
    learningOutcomes: [
      "Geliştirdiği eğitim materyalini zümre arkadaşlarına etkili şekilde sunar.",
      "Okul içi ortak Yapay Zekâ Eğitim Havuzuna materyal katkısı sağlar.",
      "Eğitim sonrasında sınıf içi düzenli yapay zekâ uygulama takvimini netleştirir."
    ],
    sessionFlow: [
      { minuteRange: "00-08 dk", activity: "Açılış & Dönem Özeti", description: "Eğitmen Fatih TOLA'nın genel değerlendirmesi ve elde edilen kazanımlar." },
      { minuteRange: "08-22 dk", activity: "Öğretmen Sunumları & Paylaşım", description: "Her katılımcının hazırladığı en iyi promptu veya materyali 2'şer dakikada tanıtması." },
      { minuteRange: "22-32 dk", activity: "Okul Yapay Zekâ Havuzuna Aktarım", description: "Üretilen tüm şablon ve materyallerin portal kütüphanesine kaydedilmesi." },
      { minuteRange: "32-40 dk", activity: "Katılım Belgeleri & Kapanış", description: "Katılım belgelerinin takdimi ve sonraki dönem ileri seviye grup planlaması." }
    ],
    keyTools: [
      { name: "Yapay Zekâ Eğitim Portalı", url: "#", purpose: "Tüm kaynakların ve grup projelerinin tek merkezden yönetimi" },
      { name: "Canva Sertifika", url: "https://www.canva.com", purpose: "Öğretmen katılım belgelerinin teslimi" }
    ],
    practicalExercise: "Bu eğitim serisinde öğrendiğiniz araçlardan en az ikisini birleştirerek oluşturduğunuz bir ders etkinliğini portala ekleyin.",
    samplePrompt: "Proje Özeti: [Ders] - [Konu] için hazırlanan 1 adet Canva afişi + 1 adet Diffit okuma parçası + 1 adet 5 soruluk analitik rubrik içeren paket ders materyali.",
    materials: [
      { title: "Okulumuz Öğretmen Akademisi Katılım Belgesi", type: "belge" },
      { title: "Gelecek Dönem İleri Düzey AI Kulübü Başvuru Formu", type: "link" }
    ],
    notes: "Her katılımcıya özel katılım belgesi ve teşekkür takdim edilecektir."
  }
];

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
