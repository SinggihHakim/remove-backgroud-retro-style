# Background Remover | Alat Penghapus Latar Belakang Profesional

Aplikasi web sederhana untuk menghapus latar belakang gambar secara otomatis menggunakan teknologi AI.

---

## Fitur Utama

| Fitur | Deskripsi |
| :--- | :--- |
| **Unggahan Fleksibel** | Mendukung unggahan gambar melalui klik tombol atau **Seret & Letakkan** (*Drag and Drop*). |
| **Pemrosesan AI** | Menggunakan API **remove.bg** untuk penghapusan latar belakang yang cepat dan akurat. |
| **Pratinjau Hasil** | Menampilkan perbandingan berdampingan (sebelum vs. sesudah diproses). |
| **Unduh Instan** | Hasil diunduh dalam format PNG transparan berkualitas tinggi. |
| **Validasi & Notifikasi** | Memiliki validasi ukuran file (maks. 10MB) dan sistem notifikasi kesalahan real-time. |

---

##  Instalasi dan Konfigurasi

Proyek ini adalah *frontend* murni (HTML, CSS, JS) dan hanya memerlukan API Key dari layanan pihak ketiga.

### 1. Prasyarat

Anda harus memiliki **API Key** dari [remove.bg](https://www.remove.bg/api) untuk mengaktifkan fungsi pemrosesan gambar.

### 2. Struktur File

Kode Anda digabungkan dalam satu file, namun secara konseptual, strukturnya adalah:

. └── index.html (Struktur, Gaya, dan Logika Aplikasi terintegrasi)


### Konfigurasi Kunci API (PENTING)

1.  Buka file `index.html`.
2.  Gulir ke bawah ke dalam tag `<script>` (di bagian JavaScript).
3.  Temukan baris berikut:

    ```javascript
    // API key remove.bg - Ganti dengan API key Anda yang asli
    const apiKey = 'API_KEY'; 
    ```

4.  **Ganti** nilai *placeholder* (`mWP5FxsCuygWZFXbkh1GFiUA`) dengan **API Key remove.bg** Anda.

---

## Panduan Penggunaan

1.  Buka file `index.html` di browser web Anda (atau di mode *Preview*).
2.  Lakukan unggahan dengan salah satu cara:
    * Klik area **Seret & Letakkan** untuk memilih file.
    * Seret dan lepas file gambar ke area yang ditunjukkan.
3.  Setelah file diunggah dan pratinjau muncul, tombol **Proses Penghapusan Latar Belakang** akan aktif.
4.  Klik tombol tersebut. Aplikasi akan mengirim gambar ke API remove.bg.
5.  Setelah selesai, gambar hasil (latar belakang transparan) akan ditampilkan, dan tombol **Unduh Gambar** akan muncul.

---

##  Teknologi yang Digunakan

* **HTML5 & CSS3:** Untuk struktur dan gaya responsif.
* **JavaScript (Vanilla JS):** Untuk logika klien, validasi, dan manipulasi DOM.
* **Fetch API:** Untuk komunikasi dengan layanan remove.bg.
* **remove.bg API:** Layanan kecerdasan buatan untuk
