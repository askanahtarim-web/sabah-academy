export type CourseCategory = "Mühasibat" | "HR" | "Maliyyə";
export type CourseLevel = "Başlanğıc" | "Başlanğıc-Orta" | "Orta" | "İrəli";

export type Course = {
  id: number;
  title: string;
  category: CourseCategory;
  duration: string;
  level: CourseLevel;
  price: number;
  description: string;
  icon: string;
  badge: string | null;
  /** Powers the "Ətraflı" accordion on /courses. */
  syllabus: string[];
  /** Months, derived from `duration` — used by the duration sort/filter. */
  months: number;
};

export const courses: Course[] = [
  {
    id: 1,
    title: "Professional Accounting",
    category: "Mühasibat",
    duration: "4 ay",
    level: "Başlanğıc-Orta",
    price: 450,
    description: "ACCA F1-F3 hazırlıq + praktik mühasibat",
    icon: "📊",
    badge: "Ən Populyar",
    months: 4,
    syllabus: [
      "Mühasibat uçotunun əsasları və ikili yazılış prinsipi",
      "ACCA F1 — Accountant in Business",
      "ACCA F2 — Management Accounting və maya dəyəri",
      "ACCA F3 — Financial Accounting və hesabat paketi",
      "Balans, mənfəət-zərər və pul vəsaitlərinin hərəkəti hesabatları",
      "Vergi Məcəlləsi üzrə praktik hesablamalar",
      "Yekun layihə: tam mühasibat dövriyyəsinin bağlanması",
    ],
  },
  {
    id: 2,
    title: "1C: Mühasibat 8.3",
    category: "Mühasibat",
    duration: "2 ay",
    level: "Başlanğıc",
    price: 280,
    description: "1C proqramında tam işgüzar mühasibat",
    icon: "💼",
    badge: null,
    months: 2,
    syllabus: [
      "1C: Müəssisə 8.3 interfeysi və ilkin quraşdırma",
      "Təşkilatın uçot siyasətinin konfiqurasiyası",
      "Bank və kassa əməliyyatlarının aparılması",
      "Mal-material ehtiyatları və anbar uçotu",
      "Əməkhaqqı hesablanması və kadr sənədləşməsi",
      "ƏDV, mənfəət və gəlir vergisi hesabatları",
      "Dövrün bağlanması və standart hesabatların formalaşdırılması",
    ],
  },
  {
    id: 3,
    title: "HR Management",
    category: "HR",
    duration: "3 ay",
    level: "Orta",
    price: 380,
    description: "İnsan resurslarının idarə edilməsi",
    icon: "👥",
    badge: "Yeni",
    months: 3,
    syllabus: [
      "HR funksiyasının strateji rolu və təşkilati struktur",
      "İşə qəbul: vakansiya profili, screening və müsahibə texnikaları",
      "Onboarding proqramlarının qurulması",
      "Əməkdaşların inkişafı və təlim ehtiyaclarının analizi",
      "Kompensasiya və benefit sistemləri",
      "Korporativ mədəniyyət və daxili kommunikasiya",
      "HR analitikası və dashboard hazırlanması",
    ],
  },
  {
    id: 4,
    title: "Əmək Hüququ",
    category: "HR",
    duration: "1.5 ay",
    level: "Başlanğıc",
    price: 220,
    description: "Azərbaycan əmək qanunvericiliyi",
    icon: "⚖️",
    badge: null,
    months: 1.5,
    syllabus: [
      "Azərbaycan Respublikasının Əmək Məcəlləsinə giriş",
      "Əmək müqaviləsinin bağlanması, dəyişdirilməsi və xitamı",
      "İş vaxtı, istirahət və məzuniyyət normaları",
      "Əməkhaqqı, əlavələr və təminatların hüquqi əsasları",
      "İntizam məsuliyyəti və maddi məsuliyyət",
      "Əmək mübahisələrinin həlli mexanizmi",
      "Praktik keys analizləri və sənəd nümunələri",
    ],
  },
  {
    id: 5,
    title: "Excel for Finance",
    category: "Maliyyə",
    duration: "1.5 ay",
    level: "Orta",
    price: 200,
    description: "Maliyyəçilər üçün Excel & pivot tables",
    icon: "📈",
    badge: null,
    months: 1.5,
    syllabus: [
      "Excel-də məlumatların strukturlaşdırılması və təmizlənməsi",
      "VLOOKUP, INDEX-MATCH və XLOOKUP funksiyaları",
      "Pivot cədvəllər və pivot diaqramlar",
      "Power Query ilə avtomatlaşdırılmış məlumat emalı",
      "Maliyyə modelləşdirməsinin əsasları",
      "Dashboard dizaynı və vizuallaşdırma",
      "Ssenari analizi: Goal Seek və Data Table",
    ],
  },
  {
    id: 6,
    title: "KPI & Performans",
    category: "HR",
    duration: "2 ay",
    level: "İrəli",
    price: 320,
    description: "Performans idarəetmə sistemləri",
    icon: "🎯",
    badge: null,
    months: 2,
    syllabus: [
      "Performans idarəetmə sisteminin arxitekturası",
      "SMART məqsədlərin və OKR-ların qurulması",
      "KPI-ların şöbələr üzrə kaskadlaşdırılması",
      "360 dərəcə qiymətləndirmə metodologiyası",
      "Performans müsahibələri və geribildirim mədəniyyəti",
      "Aşağı performansın idarə edilməsi planları",
      "Nəticələrin bonus və karyera sisteminə inteqrasiyası",
    ],
  },
];

export const CATEGORIES = ["Hamısı", "Mühasibat", "HR", "Maliyyə"] as const;
export type CategoryFilter = (typeof CATEGORIES)[number];

export const LEVELS: CourseLevel[] = [
  "Başlanğıc",
  "Başlanğıc-Orta",
  "Orta",
  "İrəli",
];

export const PRICE_BOUNDS = {
  min: Math.min(...courses.map((c) => c.price)),
  max: Math.max(...courses.map((c) => c.price)),
};
