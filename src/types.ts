export interface TeacherGroup {
  id: string;
  groupNumber: number;
  name: string;
  day: string;
  timeSlot: string; // e.g. "15:30 - 16:30"
  location: string; // e.g. "Bilişim Teknolojileri Laboratuvarı"
  currentWeek: number;
  totalWeeks: number;
  participants: Participant[];
  notes: string;
  weekDates?: string[]; // Date string for each week, e.g. ["14 Eki", "21 Eki"]
}

export interface Participant {
  id: string;
  fullName: string;
  branch: string; // e.g. "Matematik", "Fen Bilimleri", "Türkçe"
  attendance: boolean[]; // true/false for each week (1-8 or 1-10)
}

export interface WeekSession {
  id: string;
  weekNumber: number;
  title: string;
  duration: string; // "40 Dakika (1 Ders Saati)"
  category: 'temel' | 'icerik' | 'multimodal' | 'degerlendirme' | 'asistan' | 'proje';
  summary: string;
  learningOutcomes: string[];
  sessionFlow: {
    minuteRange: string;
    activity: string;
    description: string;
  }[];
  keyTools: {
    name: string;
    url: string;
    purpose: string;
  }[];
  practicalExercise: string;
  samplePrompt: string;
  materials: {
    title: string;
    url?: string;
    type: 'link' | 'belge' | 'sablon';
  }[];
  notes?: string;
  customAdded?: boolean;
}

export interface CompetencyItem {
  id: string;
  icon: string;
  title: string;
  category: string;
  description: string;
  pedagogicalImpact: string;
  badge: string;
}

export interface AIToolItem {
  id: string;
  name: string;
  category: 'Asistan & Sohbet' | 'Ders & Sunum' | 'Soru & Değerlendirme' | 'Görsel & Tasarım' | 'Ses & Video' | 'Üretken Kod & Web';
  description: string;
  educationUseCase: string;
  pricing: 'Ücretsiz' | 'Freemium' | 'MEB / Kurumsal' | 'Ücretli';
  url: string;
  featured: boolean;
  tags: string[];
}

export interface LanguageModelItem {
  id: string;
  name: string;
  developer: string;
  contextWindow: string;
  strengths: string[];
  educationFit: string;
  freeTierStatus: string;
  url: string;
  bestFor: string;
  badge?: string;
}

export interface ResourceItem {
  id: string;
  title: string;
  organization: string;
  category: 'Resmi Mevzuat' | 'Etik & Güvenlik' | 'Prompt Kütüphanesi' | 'Ders Şablonu' | 'Teknik Rehber';
  description: string;
  linkText: string;
  url: string;
  fileType: string;
}

export interface PromptTemplate {
  id: string;
  title: string;
  branch: string;
  gradeLevel: string;
  goal: string;
  promptText: string;
  recommendedModel: string;
}
