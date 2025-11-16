📸 Background Remover | Alat Penghapus Latar Belakang Profesional
Alat berbasis web sederhana ini memungkinkan pengguna untuk mengunggah gambar dan menghapus latar belakangnya secara otomatis menggunakan layanan API remove.bg, memanfaatkan teknologi kecerdasan buatan (AI) untuk hasil yang cepat dan berkualitas tinggi.

✨ Fitur Utama
Antarmuka Pengguna Intuitif: Desain bersih dan user-friendly dalam Bahasa Indonesia.

Dukungan Unggahan Fleksibel: Unggah gambar melalui klik atau Seret & Letakkan (Drag and Drop).

Pemrosesan AI Cepat: Menggunakan remove.bg API untuk penghapusan latar belakang yang akurat.

Pratinjau Hasil: Tampilkan perbandingan berdampingan antara gambar asli dan gambar hasil.

Validasi File: Memastikan ukuran (maks. 10MB) dan format gambar (JPG, PNG, WebP) yang valid.

Notifikasi Real-time: Memberikan umpan balik yang jelas tentang proses unggah, pemrosesan, dan kesalahan (misalnya, API Key tidak valid atau kuota habis).

🛠️ Persyaratan dan Instalasi
Proyek ini adalah aplikasi frontend murni. Anda hanya perlu layanan hosting web statis (atau menjalankannya secara lokal menggunakan ekstensi seperti Live Server di VS Code).

Prasyarat
Anda memerlukan API Key dari remove.bg untuk mengaktifkan fungsi penghapusan latar belakang.

Struktur Proyek
background-remover/
├── index.html        (Struktur halaman web)
├── style.css         (Gaya/tampilan)
└── app.js            (Logika aplikasi JavaScript & integrasi API)
Konfigurasi API
Buka file app.js.

Temukan baris berikut:

JavaScript

// API key remove.bg - Ganti dengan API key Anda yang asli
const apiKey = 'mWP5FxsCuygWZFXbkh1GFiUA'; 
Ganti nilai placeholder (mWP5FxsCuygWZFXbkh1GFiUA) dengan API Key remove.bg Anda yang sebenarnya.

🚀 Cara Menggunakan
Buka Halaman: Buka file index.html di browser web Anda.

Unggah Gambar:

Klik pada area Seret & Letakkan dan pilih file gambar Anda.

Atau, Seret file gambar langsung ke area tersebut.

Proses: Setelah file divalidasi dan pratinjau muncul, klik tombol hijau: Proses Penghapusan Latar Belakang.

Lihat Hasil: Gambar yang sudah dihapus latar belakangnya akan muncul di sisi kanan perbandingan.

Unduh: Klik tombol Unduh Gambar untuk menyimpan hasilnya (dalam format PNG transparan) ke perangkat Anda.

💻 Teknologi yang Digunakan
HTML5: Untuk struktur dasar.

CSS3: Untuk styling dan layout.

JavaScript (Vanilla JS): Untuk logika aplikasi, event handling, dan interaksi API.

Fetch API: Untuk melakukan permintaan POST ke layanan remove.bg.

remove.bg API: Layanan pihak ketiga yang melakukan pemrosesan gambar AI.

🤝 Kontribusi
Proyek ini dibuat untuk tujuan pembelajaran dan demo. Jika Anda memiliki saran perbaikan atau ingin berkontribusi, silakan buat Pull Request atau Issu
