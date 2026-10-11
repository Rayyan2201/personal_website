# Rayyan Muhammad Arraffi — Personal Portfolio

Website portfolio pribadi yang memperkenalkan profil, pengalaman kerja, pendidikan, dan keahlian **Rayyan Muhammad Arraffi**. Website ini dirancang dengan tampilan modern, profesional, responsif, serta animasi interaktif agar pengunjung dapat mengenal profil dan latar belakang secara lebih menarik.

Portfolio ini cocok digunakan sebagai profil profesional online untuk melamar pekerjaan, memperkenalkan pengalaman, maupun membagikan informasi kontak dalam satu halaman yang mudah diakses.

## Tentang Website

Website ini menggabungkan informasi profesional dengan desain yang bersih dan interaksi visual yang halus. Konten utamanya menampilkan pengalaman di bidang produksi apparel dan sablon manual, latar belakang pendidikan Teknik Informatika, serta berbagai keahlian yang dapat dikembangkan untuk kesempatan kerja berikutnya.

## Isi Website

- **Beranda / Profil Utama** — nama, ringkasan profil, posisi, lokasi, dan tombol menuju kontak atau CV.
- **Tentang Saya** — perkenalan singkat, prinsip kerja, ketelitian, perhatian terhadap kualitas, dan kemampuan beradaptasi.
- **Pengalaman Kerja** — gambaran pengalaman sebagai Operator Produksi di Abyad Apparel Pro.
- **Pendidikan** — riwayat pendidikan, termasuk Universitas Pamulang (UNPAM).
- **Keahlian** — rangkuman kemampuan di bidang produksi dan operasional, kemampuan profesional, serta teknologi informasi.
- **Kontak** — tautan email dan telepon/WhatsApp agar pengunjung dapat menghubungi secara langsung.
- **CV** — tombol untuk membuka dokumen PDF, yang dapat dicetak atau disimpan melalui browser.

## Fitur dan Interaksi

- Desain modern dengan tata letak responsif untuk desktop, tablet, dan ponsel.
- Mode tema terang, gelap, dan otomatis mengikuti pengaturan perangkat.
- Animasi elemen saat muncul ketika halaman digulir (*scroll reveal*).
- Progress bar di bagian atas untuk menunjukkan posisi scroll.
- Navigasi yang menandai bagian halaman yang sedang dibuka.
- Efek hover interaktif pada kartu dan elemen tertentu.
- Efek tilt 3D pada kartu foto profil di perangkat desktop yang mendukung pointer.
- Efek ripple saat tombol ditekan.
- Menu navigasi khusus untuk layar kecil.
- Preferensi tema disimpan di browser agar pilihan tema tetap digunakan saat kunjungan berikutnya.
- Mengikuti pengaturan `prefers-reduced-motion` untuk mengurangi animasi bagi pengunjung yang memilih gerakan lebih sedikit.

## Teknologi yang Digunakan

- **HTML5** — struktur dan konten halaman.
- **CSS3** — desain visual, tata letak responsif, tema, transisi, dan animasi.
- **JavaScript** — navigasi, pergantian tema, animasi saat scroll, progress bar, dan interaksi lainnya.
- **Google Fonts** — font Manrope dan DM Mono untuk memperkuat tampilan tipografi.

Website ini bersifat **statis**. Tidak membutuhkan backend, database, Node.js, atau proses build untuk dijalankan secara lokal. Koneksi internet diperlukan untuk memuat Google Fonts; tanpa koneksi, website tetap dapat dibuka dengan font pengganti yang tersedia di perangkat.

## Struktur Folder

```text
rayyan-portfolio/
├── index.html          # Halaman utama website
├── styles.css          # Styling, layout responsif, tema, dan animasi
├── script.js           # Logika interaksi dan fitur dinamis
├── README.md           # Dokumentasi proyek
└── assets/
    ├── profile.jpg     # Foto profil
    ├── logo-rayyan.png # Logo/favikon website
    └── CV.pdf          # Dokumen CV yang ditautkan pada website
```

## Cara Menjalankan di Komputer

1. Ekstrak file ZIP proyek.
2. Buka folder `rayyan-portfolio`.
3. Klik dua kali file `index.html`.
4. Website akan terbuka di browser modern seperti Google Chrome, Microsoft Edge, atau Firefox.

Tidak ada instalasi dependency atau perintah build yang diperlukan.

## Cara Mengubah Konten

- **Teks dan bagian halaman:** edit `index.html`.
- **Warna, tampilan, layout, dan animasi CSS:** edit `styles.css`.
- **Perilaku menu, tema, dan interaksi:** edit `script.js`.
- **Foto profil:** ganti `assets/profile.jpg` dengan foto baru, gunakan nama file yang sama agar tautan tetap berfungsi.
- **Logo:** ganti `assets/logo-rayyan.png` atau sesuaikan referensinya di `index.html`.
- **CV:** ganti `assets/CV.pdf` dengan file CV terbaru menggunakan nama yang sama.

Sebaiknya simpan salinan cadangan sebelum mengubah file. Pastikan struktur folder dan nama aset tetap sesuai dengan yang dirujuk oleh HTML.

## Publikasi ke Internet

Karena website ini statis, website dapat dipublikasikan melalui layanan hosting statis seperti **GitHub Pages**, **Netlify**, atau hosting web pribadi.

Unggah seluruh isi folder proyek, bukan hanya `index.html`, agar file CSS, JavaScript, foto, logo, dan CV tetap dapat ditemukan. Setelah dipublikasikan, buka alamat website dari perangkat desktop dan ponsel untuk memeriksa tampilannya.

## Catatan

Informasi profil, pengalaman, pendidikan, kontak, dan dokumen CV mengikuti konten yang tersedia di dalam proyek. Periksa kembali informasi tersebut sebelum menggunakan website untuk keperluan profesional atau membagikannya kepada publik.

---

**Dibuat sebagai personal portfolio Rayyan Muhammad Arraffi.**
