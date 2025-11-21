// ==================== PROFILE INFO ====================
export const profileConfig = {
  name: "YARDAN SHAQ",
  fullName: "Yardan Shaquille H.",
  tagline: {
    id: "Fullstack Developer | Open Source Enthusiast",
    en: "Fullstack Developer | Open Source Enthusiast",
  },
  profileImage: "https://avatars.githubusercontent.com/u/139103935?v=4",
  profileUrl: "https://github.com/yardanshaq",
};

// ==================== MUSIC PLAYER ====================
export const musicConfig = {
  gistUser: "yardanshaq",
  gistId: "daf658c28c6efa59d22565988431c866",
  gistFile: "playlist",
  sectionTitle: {
    id: "Albumku",
    en: "My Album",
  },
};

// ==================== SOCIAL MEDIA LINKS ====================
export const socialMediaConfig = [
  {
    name: "TikTok",
    url: "https://www.tiktok.com/@yardanshaq",
    icon: "fa-brands fa-tiktok",
    bgColor: "#000",
    textColor: "#fff",
    shadowColor: "#fbbf24",
  },
  {
    name: "X / Twitter",
    url: "https://x.com/yardanshaq",
    icon: "fa-brands fa-x-twitter",
    bgColor: "#000",
    textColor: "#fff",
    shadowColor: "#fbbf24",
  },
  {
    name: "Instagram",
    url: "https://instagram.com/shaqsyr",
    icon: "fa-brands fa-instagram",
    bgColor: "#ec4899",
    textColor: "#fff",
    shadowColor: "#000",
  },
];

// ==================== ABOUT SECTION ====================
export const aboutLinks = [
  {
    title: "Portfolio Website",
    url: "yardansh.xyz",
    href: "https://www.yardansh.xyz",
    icon: "fa-solid fa-book",
    color: "primary", // primary, secondary, tertiary, social, contact, orange, cyan, dark
  },
  {
    title: "CV / Resume Online",
    url: "link ke CV PDF",
    href: "https://www.yardansh.xyz/cv/CV%20Yardan.pdf",
    icon: "fa-solid fa-file-text",
    color: "secondary",
  },
  {
    title: "Sertifikat",
    url: "Sertifikat",
    href: "#", // Ganti dengan link sertifikat kamu
    icon: "fa-solid fa-file-text",
    color: "tertiary",
  },
];

// ==================== PROJECTS & KARYA SECTION ====================
export const projectLinks = [
  {
    title: "GitHub Projects",
    url: "github.com/yardanshaq",
    href: "https://github.com/yardanshaq",
    icon: "fa-brands fa-github",
    color: "dark",
  },
  {
    title: "Weather App",
    url: "Real-time Weather Forecast",
    href: "https://www.yardansh.xyz/weather",
    icon: "fa-solid fa-globe",
    color: "cyan",
  },
  {
    title: "Digital Payment",
    url: "E-Wallet Payment Gateway",
    href: "https://www.yardansh.xyz/payment",
    icon: "fa-solid fa-globe",
    color: "orange",
  },
  {
    title: "Brat Generator",
    url: "Aesthetic Image Generator",
    href: "https://www.yardansh.xyz/brat",
    icon: "fa-solid fa-globe",
    color: "social",
  },
  {
    title: "Photobooth Online",
    url: "Web-based Photo Capture",
    href: "https://www.yardansh.xyz/photobooth",
    icon: "fa-solid fa-globe",
    color: "contact",
  },
  {
    title: "CDN & Shortlink",
    url: "Content Delivery Network",
    href: "https://www.kiracloud.my.id",
    icon: "fa-solid fa-globe",
    color: "tertiary",
  },
  {
    title: "Media Downloader",
    url: "Social Media Download Tool",
    href: "https://www.kiracloud.my.id/downloader",
    icon: "fa-solid fa-globe",
    color: "secondary",
  },
];

// ==================== CONTACT SECTION ====================
export const contactLinks = [
  {
    title: "Email",
    url: "gg@yardansh.xyz",
    href: "mailto:gg@yardansh.xyz",
    icon: "fa-solid fa-envelope",
    color: "primary",
  },
  {
    title: "Buy Me a Coffee",
    url: "buymeacoffee.com/-",
    href: "#", //
    icon: "fa-solid fa-mug-hot",
    color: "orange",
  },
  {
    title: "Form Collaboration",
    url: "google form / notion form",
    href: "#",
    icon: "fa-solid fa-file-pen",
    color: "contact",
  },
];

// ==================== TRANSLATIONS ====================
export const translations = {
  id: {
    greeting: profileConfig.tagline.id,
    marquee:
      "SELAMAT DATANG DI LINK BIO SAYA! • JELAJAHI PORTFOLIO & PROJECT SAYA",
    about: "Tentang Saya",
    projects: "Project & Karya",
    contact: "Kontak",
    shareTitle: "Share Link",
    shareSubtitle: "Share project ini ke teman-temanmu",
    close: "Tutup",
    qrTitle: "QR Code",
    qrSubtitle: "Scan untuk mengunjungi link bio",
    download: "Download QR Code",
    footer: `© 2025 ${profileConfig.name}.`,
    loadingText: "Memuat konten...",
    musicSection: musicConfig.sectionTitle.id,
  },
  en: {
    greeting: profileConfig.tagline.en,
    marquee:
      "WELCOME TO MY LINK BIO! • EXPLORE MY PORTFOLIO & PROJECTS",
    about: "About Me",
    projects: "Projects & Works",
    contact: "Contact",
    shareTitle: "Share Link",
    shareSubtitle: "Choose platform to share",
    close: "Close",
    qrTitle: "QR Code",
    qrSubtitle: "Scan to visit link bio",
    download: "Download QR Code",
    footer: `© 2025 ${profileConfig.name}.`,
    loadingText: "Loading content...",
    musicSection: musicConfig.sectionTitle.en,
  },
};

// ==================== SHARE CONFIG ====================
export const shareConfig = {
  shareText: `${profileConfig.fullName} - Fullstack Developer`,
  // URL akan otomatis menggunakan window.location.href
};

// ==================== COLOR PALETTE ====================
// Definisi warna untuk setiap tipe link (untuk referensi)
export const colorPalette = {
  primary: { bg: "#ef4444", text: "#fff" },
  secondary: { bg: "#10b981", text: "#fff" },
  tertiary: { bg: "#3b82f6", text: "#fff" },
  social: { bg: "#8b5cf6", text: "#fff" },
  contact: { bg: "#ec4899", text: "#fff" },
  orange: { bg: "#f97316", text: "#fff" },
  cyan: { bg: "#06b6d4", text: "#fff" },
  dark: { bg: "#333", text: "#fff" },
};

// ==================== NOTES ====================
/**
 * CARA MENGGUNAKAN CONFIG INI:
 *
 * 1. PROFILE INFO:
 *    - Edit nama, tagline, dan URL gambar profile kamu
 *    - Untuk gambar berkualitas tinggi, gunakan minimal 512x512px
 *
 * 2. MUSIC PLAYER:
 *    - Ganti gistId dengan ID Gist GitHub kamu
 *    - Format Gist: https://gist.github.com/USERNAME/GIST_ID
 *    - Struktur JSON di Gist harus seperti ini:
 *      {
 *        "songs": [
 *          {
 *            "title": "Judul Lagu",
 *            "artist": "Nama Artist",
 *            "albumArtUrl": "URL gambar album",
 *            "audioSrc": "URL file audio MP3"
 *          }
 *        ]
 *      }
 *
 * 3. SOCIAL MEDIA:
 *    - Tambah/hapus/edit social media links
 *    - Icon menggunakan Font Awesome (https://fontawesome.com/icons)
 *    - Sesuaikan warna background, text, dan shadow
 *
 * 4. LINKS (About, Projects, Contact):
 *    - Edit title, url, href, icon, dan color
 *    - Color options: primary, secondary, tertiary, social, contact, orange, cyan, dark
 *
 * 5. TRANSLATIONS:
 *    - Edit teks untuk bahasa Indonesia dan Inggris
 *
 * TIPS:
 * - Setelah edit, save file dan refresh browser (Ctrl+R / Cmd+R)
 * - Jangan hapus struktur object, hanya edit value-nya
 * - Untuk icon, cek Font Awesome untuk class name yang tepat
 */