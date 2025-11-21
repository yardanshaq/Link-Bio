# 🎨 Link Bio Neobrutalism - Yardan Shaquille H.

Website link bio dengan styling neobrutalism yang modern dan eye-catching, dibuat dengan React + TypeScript.

![Neobrutalism Design](https://img.shields.io/badge/Design-Neobrutalism-FF6B6B?style=for-the-badge)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

## ✨ Features

- 🎵 **Music Player** - Spotify-like player dengan data dari GitHub Gist
- 🌓 **Dark/Light Mode** - Theme toggle dengan smooth transition
- 🌍 **Multi-language** - Support Bahasa Indonesia & English
- 📱 **Responsive** - Mobile-first design
- 🎨 **Neobrutalism Style** - Bold colors, thick borders, & shadow effects
- 🔗 **Social Links** - TikTok, Twitter/X, Instagram
- 📋 **Copy to Clipboard** - Quick copy untuk semua link
- 📊 **Sections** - About, Projects, Contact dengan icon Font Awesome
- 🎯 **QR Code** - Generate & download QR code
- 🔄 **Share Modal** - Share ke WhatsApp, Facebook, Twitter, Telegram
- ⬆️ **Scroll to Top** - Floating button
- 🎬 **Loading Screen** - Animated loading state
- 🎪 **Marquee Banner** - Animated scrolling text
- 🍞 **Toast Notifications** - Feedback untuk user actions

## 🚀 Quick Start

### 1. Edit Konten Website

**EDIT FILE `/config.ts` UNTUK SEMUA KONTEN!**

File ini berisi semua konfigurasi:
- Profile info (nama, tagline, foto)
- Social media links
- Gist ID untuk music player
- Links untuk About, Projects, Contact
- Translations (ID/EN)

### 2. Setup Music Player

1. Buat file json Gist di GitHub: https://gist.github.com/ dengan nama bebas contoh songs.json
2. Copy Gist User, Gist ID, dan Gist File lalu paste ke `config.ts`
3. Contoh https://gist.github.com/yardanshaq/bdd3cdcef667ca691f4d5c86f5aff162, yardanshaq itu Gist User, lalu random string itu Gist ID dan Gist File itu file yang kamu buat masukkinnya hanya nama saja tanpa .json

### 3. Local Development

```bash
npm install
npm run dev
```

### 4. Build Production

```bash
npm run build
```

## 📁 Struktur Project

```
/
├── config.ts              # ⚙️ EDIT INI! Semua konfigurasi ada di sini
├── App.tsx                # Main app component
├── components/
│   ├── SpotifyPlayer.tsx  # Music player component
│   └── SocialIcons.tsx    # Social media icons
├── styles/
│   └── globals.css        # Global styles + neobrutalism
└── CONFIG_GUIDE.md        # 📖 Panduan lengkap
```

## 🎨 Customization

### Ganti Warna

Edit di `/config.ts`:

```typescript
export const colorPalette = {
  primary: { bg: "#ef4444", text: "#fff" },    // Merah
  secondary: { bg: "#10b981", text: "#fff" },  // Hijau
  // ... edit sesuka hati
};
```

### Tambah Social Media

Edit `socialMediaConfig` di `/config.ts`:

```typescript
{
  name: "LinkedIn",
  url: "https://linkedin.com/in/username",
  icon: "fa-brands fa-linkedin",
  bgColor: "#0077b5",
  textColor: "#fff",
  shadowColor: "#000",
}
```

### Ganti Gambar Profile

Update `profileConfig.profileImage` dengan URL gambar Anda (min. 512x512px)

## 📚 Dokumentasi Lengkap

Baca `/CONFIG_GUIDE.md` untuk panduan detail tentang:
- Setup Gist untuk music player
- Icon Font Awesome
- Color palette
- Translations
- Dan banyak lagi!

## 🛠 Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Font Awesome 6** - Icons
- **Ubuntu Mono** - Monospace font
- **Unsplash** - High quality images

## 📝 License

Free to use & modify. Made with ❤️ by Yardan Shaquille H.

## 🤝 Support

Jika ada pertanyaan atau masalah:
- Email: gg@yardansh.xyz
- GitHub: [@yardanshaq](https://github.com/yardanshaq)
- Twitter: [@yardanshaq](https://x.com/yardanshaq)

---

**⭐ Star repo ini jika berguna!**
