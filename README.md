# 📰 Next.js Blog with Payload CMS

Bu proje, **Next.js** frontend'i ile **Payload CMS** backend'ini entegre ederek oluşturulmuş modern, hızlı ve özelleştirilebilir bir blog platformudur. Statik site üretimi (SSG), Incremental Static Regeneration (ISR), dinamik tema desteği ve üçüncü parti API entegrasyonu gibi ileri seviye özellikler içerir.

## 🔗 Canlı Demo

Frontend (Vercel): [https://your-vercel-link.vercel.app](https://your-vercel-link.vercel.app)  
Backend (Payload Admin Panel): [https://your-backend-url.com/admin](http://localhost:3000/admin)

> GitHub: [https://github.com/aylinakyol/nextjs-app](https://github.com/aylinakyol/nextjs-app)

---

## 🏗️ Proje Yapısı

### 📦 Backend (Payload CMS)

Backend, Payload CMS kullanılarak oluşturulmuştur. Aşağıdaki veri modellerini içerir:

- **Posts (Yazılar)**: `title`, `slug`, `author`, `category`, `content`, `seo` alanlarını içerir.
- **Categories (Kategoriler)**: `name`, `slug`
- **Authors (Yazarlar)**: `name`, `avatar`
- **Globals - SiteSettings**: `siteTitle`, `description`, `themeColors` gibi genel ayarlar

### 🌐 Frontend (Next.js)

Frontend, Next.js kullanılarak geliştirilmiştir ve statik olarak üretilecek sayfaları içerir:

- `/`: Ana sayfa, son yazıları ve “Günün Sözü”nü listeler (`getStaticProps`)
- `/posts/[slug]`: Tek bir yazının detayını gösterir (`getStaticProps` & `getStaticPaths`)
- `/category/[slug]`: Kategoriye ait tüm yazıları gösterir (`getStaticProps` & `getStaticPaths`)

---

## 🚀 Gelişmiş Özellikler (Challenges)

- ✅ **Incremental Static Regeneration (ISR)**: Sayfalar belirli aralıklarla yeniden oluşturulur (`revalidate`)
- ✅ **Dinamik Tema Değiştirme**: Light/Dark mod geçişi ve `localStorage` ile kalıcılık sağlandı
- ✅ **Üçüncü Parti API**: Zen Quotes API ile "Günün Sözü" asenkron olarak çekiliyor

---

## 🛠️ Kurulum

### 1. Backend (Payload CMS)

```bash
cd payload-backend
npm install
npm run dev
```
* MongoDB bağlantısı ve .env tanımlamaları

### 1. Frontend (Next.js)

```bash
cd nextjs-app
npm install
npm run dev
```
* Tailwind css kurulumu ve darkMode: class kullanımı

## 🧠 Karşılaşılan Zorluklar

    Payload verilerinin Lexical rich text formatında işlenmesi ve frontend'de HTML'e çevrilmesi.

    getStaticPaths ve getStaticProps ile dinamik yolların doğru oluşturulması.

    Light/Dark tema geçişinde Tailwind ile class temelli dark mode yönetimi.

    Tailwind ile versiyon uyumluluk sorunları.

    External API requesti için yeni bir API endpoint yazılması.