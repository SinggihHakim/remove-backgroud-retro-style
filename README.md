
# 🖼️ AI Background Remover

**A Professional Tool for Automatic Image Background Removal**

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![API](https://img.shields.io/badge/Remove.bg-API-green?style=for-the-badge)

## 📖 Overview

This is a simple yet powerful web application designed to remove image backgrounds instantly using Artificial Intelligence. By leveraging the **remove.bg** API, it provides accurate cutouts and allows users to download the result as a transparent PNG.

The project is built as a pure frontend application, making it lightweight and easy to deploy.

---

## ✨ Key Features

| Feature | Description |
| :--- | :--- |
| 📤 **Flexible Uploads** | Supports image uploading via standard file selection or **Drag & Drop**. |
| 🤖 **AI Processing** | Utilizes the **remove.bg API** for fast and precise background removal. |
| 👁️ **Live Preview** | Displays the original image and the processed result side-by-side. |
| ⬇️ **Instant Download** | Download the final result immediately as a high-quality transparent PNG. |
| 🛡️ **Smart Validation** | Includes file size validation (Max 10MB) and real-time error notifications. |

---

## 🛠️ Technologies Used

* **HTML5 & CSS3:** For responsive structure and modern styling.
* **JavaScript (Vanilla JS):** Handles client-side logic, UI interactivity, and DOM manipulation.
* **Fetch API:** Manages asynchronous communication with the remove.bg service.
* **remove.bg API:** The AI engine behind the image processing.

---

## ⚙️ Installation & Configuration

This project is a standalone frontend application. You only need a browser and a valid API Key to run it.

### 1. Prerequisites

You must obtain an **API Key** from [remove.bg](https://www.remove.bg/api). You can sign up for a free account to get started.

### 2. Project Structure

The code is consolidated into a single file structure for simplicity:
```text
.
└── index.html  (Contains HTML structure, CSS styles, and JS logic)

```

### 3. 🔑 API Key Configuration (IMPORTANT)

To make the app functional, you need to insert your API key:

1. Open the `index.html` file in your code editor.
2. Scroll down to the `<script>` tag at the bottom.
3. Locate the following line:
```javascript
// API key remove.bg - Replace with your actual API key
const apiKey = 'YOUR_API_KEY_HERE'; 

```


4. **Replace** the placeholder (`YOUR_API_KEY_HERE`) with your actual key from the remove.bg dashboard.

---

## 🚀 Usage Guide

1. **Open the App:** Open `index.html` in any modern web browser.
2. **Upload an Image:**
* Click the **Drag & Drop** area to select a file.
* Or simply drag an image file and drop it into the box.


3. **Process:** Once the preview appears, click the **"Remove Background"** (Proses Penghapusan Latar Belakang) button.
4. **Download:** Wait for the AI to process the image. Once done, the result will appear. Click **"Download Image"** to save your transparent PNG.

---


<div align="center">
Created by <strong>Singgih Hakim</strong>
</div>


