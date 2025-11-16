document.addEventListener('DOMContentLoaded', function() {
    // Ambil elemen-elemen HTML
    const uploadArea = document.getElementById('uploadArea');
    const uploadInput = document.getElementById('upload');
    const fileInfo = document.getElementById('fileInfo');
    const removeBgBtn = document.getElementById('removeBgBtn');
    const originalImage = document.getElementById('originalImage');
    const outputImage = document.getElementById('outputImage');
    const downloadBtn = document.getElementById('downloadBtn');
    const resetBtn = document.getElementById('resetBtn');
    const resultsSection = document.getElementById('resultsSection');
    const originalPlaceholder = document.getElementById('originalPlaceholder');
    const resultPlaceholder = document.getElementById('resultPlaceholder');
    const btnText = document.querySelector('.btn-text');
    const btnLoader = document.querySelector('.btn-loader');
    const notificationContainer = document.getElementById('notificationContainer');

    const apiKey = 'API_KEY'; 

    // Variabel untuk menyimpan URL blob hasil
    let processedImageUrl = null;

    // Event listener untuk area upload (klik)
    uploadArea.addEventListener('click', (e) => {
        // Mencegah event bubbling yang bisa menyebabkan multiple triggers
        if (e.target === uploadArea || e.target.closest('.upload-area')) {
            uploadInput.click();
        }
    });

    // Event listener untuk drag and drop (visual feedback)
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.stopPropagation();
        uploadArea.classList.add('dragover');
    });

    uploadArea.addEventListener('dragenter', (e) => {
        e.preventDefault();
        e.stopPropagation();
        uploadArea.classList.add('dragover');
    });

    uploadArea.addEventListener('dragleave', (e) => {
        e.preventDefault();
        e.stopPropagation();
        // Only remove class if leaving the upload area
        if (!uploadArea.contains(e.relatedTarget)) {
            uploadArea.classList.remove('dragover');
        }
    });

    // Event listener untuk drop file (memproses file)
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        e.stopPropagation();
        uploadArea.classList.remove('dragover');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            // *** PERBAIKAN PENTING DI SINI ***
            // Menyimpan FileList yang di-drop ke elemen input file agar dapat diakses oleh processImage()
            uploadInput.files = files; 
            
            handleFileSelection(files[0]);
        }
    });

    // Event listener untuk input file (change)
    uploadInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files.length > 0) {
            // Tidak perlu mengatur ulang uploadInput.files di sini karena event 'change' sudah melakukannya
            handleFileSelection(e.target.files[0]);
        }
    });

    // Fungsi untuk menangani pemilihan file (validasi & pratinjau)
    function handleFileSelection(file) {
        // Validasi file
        if (!file) {
            showNotification('Tidak ada file yang dipilih', 'error');
            return;
        }

        // Validasi tipe file
        const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
        if (!validImageTypes.includes(file.type)) {
            showNotification('Silakan pilih file gambar (JPG, PNG, WebP, GIF)', 'error');
            // Reset input file agar pengguna dapat memilih lagi
            uploadInput.value = '';
            removeBgBtn.disabled = true;
            fileInfo.classList.remove('active');
            return;
        }

        // Validasi ukuran file (max 10MB)
        const maxSize = 10 * 1024 * 1024; // 10MB
        if (file.size > maxSize) {
            showNotification('Ukuran file terlalu besar. Maksimal 10MB', 'error');
            // Reset input file
            uploadInput.value = '';
            removeBgBtn.disabled = true;
            fileInfo.classList.remove('active');
            return;
        }

        // Tampilkan informasi file
        fileInfo.innerHTML = `
            <strong>File terpilih:</strong> ${file.name}<br>
            <strong>Ukuran:</strong> ${formatFileSize(file.size)}<br>
            <strong>Tipe:</strong> ${file.type}
        `;
        fileInfo.classList.add('active');

        // Aktifkan tombol proses
        removeBgBtn.disabled = false;

        // Tampilkan gambar asli
        const reader = new FileReader();
        reader.onload = (e) => {
            originalImage.src = e.target.result;
            originalImage.style.display = 'block';
            originalPlaceholder.style.display = 'none';
            
            // Sembunyikan hasil sebelumnya jika ada
            resultsSection.style.display = 'none';
            resultsSection.classList.remove('active');
            outputImage.style.display = 'none';
            resultPlaceholder.style.display = 'flex';
            downloadBtn.style.display = 'none';
        };
        reader.onerror = () => {
            showNotification('Gagal membaca file gambar', 'error');
        };
        reader.readAsDataURL(file);

        showNotification('Gambar berhasil diunggah! Klik "Proses" untuk menghapus latar belakang.', 'success');
    }

    // Event listener untuk tombol proses
    removeBgBtn.addEventListener('click', processImage);

    // Fungsi untuk memproses gambar
    function processImage() {
        const file = uploadInput.files[0];
        
        if (!file) {
            showNotification('Pilih gambar terlebih dahulu!', 'error');
            return;
        }

        // Validasi API key
        if (!apiKey || apiKey === 'mWP5FxsCuygWZFXbkh1GFiUA') {
            showNotification('API key belum dikonfigurasi. Silakan ganti dengan API key Anda yang asli.', 'error');
            return;
        }

        // Tampilkan indikator loading
        btnText.style.display = 'none';
        btnLoader.style.display = 'flex';
        removeBgBtn.disabled = true;

        // Siapkan form data untuk API
        const formData = new FormData();
        formData.append('image_file', file);
        formData.append('size', 'auto');
        formData.append('format', 'png'); // PNG untuk transparansi terbaik

        // Mengirim permintaan API remove.bg
        fetch('https://api.remove.bg/v1.0/removebg', {
            method: 'POST',
            headers: {
                'X-Api-Key': apiKey,
                // Tidak perlu 'Content-Type': 'multipart/form-data' karena FormData otomatis menanganinya
            },
            body: formData,
        })
        .then(response => {
            if (!response.ok) {
                // Jika respons API gagal, baca respons sebagai JSON untuk mendapatkan pesan error yang lebih detail
                return response.json().then(errorData => {
                    let errorMessage = 'Terjadi kesalahan saat memproses gambar.';
                    if (errorData && errorData.errors && errorData.errors.length > 0) {
                        errorMessage = errorData.errors.map(err => err.title).join('; ');
                    } else if (response.status === 402) {
                        errorMessage = 'Kuota API habis. Silakan periksa akun remove.bg Anda.';
                    } else if (response.status === 403) {
                        errorMessage = 'API key tidak valid atau akses ditolak.';
                    }
                    throw new Error(errorMessage);
                });
            }
            return response.blob();
        })
        .then(blob => {
            // Bersihkan URL blob sebelumnya jika ada
            if (processedImageUrl) {
                URL.revokeObjectURL(processedImageUrl);
            }

            // Buat URL untuk blob hasil
            processedImageUrl = URL.createObjectURL(blob);
            
            // Tampilkan gambar hasil
            outputImage.src = processedImageUrl;
            outputImage.style.display = 'block';
            resultPlaceholder.style.display = 'none';

            // Tampilkan section hasil
            resultsSection.style.display = 'block';
            resultsSection.classList.add('active');

            // Tampilkan tombol download
            downloadBtn.style.display = 'flex';

            showNotification('Latar belakang berhasil dihapus!', 'success');
        })
        .catch(error => {
            console.error('Error removing background:', error);
            
            let errorMessage = 'Terjadi kesalahan saat memproses gambar. ';
            if (error.message.includes('network') || error.message.includes('Failed to fetch')) {
                errorMessage = 'Koneksi internet bermasalah. Periksa koneksi Anda.';
            } else {
                errorMessage += error.message;
            }
            
            showNotification(errorMessage, 'error');
        })
        .finally(() => {
            // Reset tombol proses
            btnText.style.display = 'block';
            btnLoader.style.display = 'none';
            removeBgBtn.disabled = false;
        });
    }

    // Event listener untuk tombol download
    downloadBtn.addEventListener('click', function() {
        if (!processedImageUrl) {
            showNotification('Tidak ada gambar yang dapat diunduh', 'error');
            return;
        }

        const a = document.createElement('a');
        a.href = processedImageUrl;
        // Gunakan file name asli jika tersedia, jika tidak gunakan nama default
        const originalFileName = uploadInput.files[0] ? uploadInput.files[0].name.split('.')[0] : 'image';
        a.download = `${originalFileName}-no-background.png`; 
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        showNotification('Gambar berhasil diunduh!', 'success');
    });

    // Event listener untuk tombol reset
    resetBtn.addEventListener('click', resetApplication);

    // Fungsi untuk reset aplikasi
    function resetApplication() {
        // Reset form dan input
        uploadInput.value = '';
        fileInfo.textContent = '';
        fileInfo.classList.remove('active');
        removeBgBtn.disabled = true;
        
        // Reset gambar
        originalImage.src = '';
        originalImage.style.display = 'none';
        originalPlaceholder.style.display = 'flex';
        
        outputImage.src = '';
        outputImage.style.display = 'none';
        resultPlaceholder.style.display = 'flex';
        
        // Reset section hasil
        resultsSection.style.display = 'none';
        resultsSection.classList.remove('active');
        
        // Reset tombol download
        downloadBtn.style.display = 'none';
        
        // Bersihkan URL blob
        if (processedImageUrl) {
            URL.revokeObjectURL(processedImageUrl);
            processedImageUrl = null;
        }
        
        showNotification('Aplikasi telah direset. Unggah gambar baru untuk memulai.', 'info');
    }

    // Fungsi utilitas untuk format ukuran file
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    // Fungsi untuk menampilkan notifikasi
    function showNotification(message, type = 'info') {
        // Batasi jumlah notifikasi
        if (notificationContainer.children.length >= 3) {
            notificationContainer.removeChild(notificationContainer.firstElementChild);
        }

        // Buat elemen notifikasi
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        `;

        // Tambahkan ke container
        notificationContainer.appendChild(notification);

        // Event listener untuk tombol close
        notification.querySelector('.notification-close').addEventListener('click', () => {
            removeNotification(notification);
        });

        // Hapus otomatis setelah 5 detik
        setTimeout(() => {
            if (notification.parentNode) {
                removeNotification(notification);
            }
        }, 5000);
    }

    // Fungsi untuk menghapus notifikasi
    function removeNotification(notification) {
        notification.classList.add('hiding');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }

    // Validasi API key saat load
    if (!apiKey || apiKey === 'mWP5FxsCuygWZFXbkh1GFiUA') {
        console.warn('API key remove.bg belum dikonfigurasi. Silakan ganti dengan API key Anda yang asli.');
        showNotification('Peringatan: API key belum dikonfigurasi. Fitur pemrosesan gambar tidak akan berfungsi.', 'warning');
    }

    // Prevent default behavior untuk drag and drop di document (agar browser tidak membuka file)
    document.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.stopPropagation();
    });

    document.addEventListener('drop', (e) => {
        e.preventDefault();
        e.stopPropagation();
    });

});
