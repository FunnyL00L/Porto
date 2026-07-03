import express from 'express';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';

dotenv.config();

const app = express();

// Set high body size limit to allow base64 image uploads
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ limit: '15mb', extended: true }));

// Ensure uploads directory exists at project root
const UPLOADS_DIR = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Serve uploaded files statically
app.use('/uploads', express.static(UPLOADS_DIR));

// File path for persistent gallery data JSON
const GALLERY_FILE = path.join(process.cwd(), 'gallery_data.json');

// Get saved gallery items
app.get('/api/gallery', (req, res) => {
  try {
    if (fs.existsSync(GALLERY_FILE)) {
      const data = fs.readFileSync(GALLERY_FILE, 'utf-8');
      return res.json(JSON.parse(data));
    }
    res.json([]);
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to read gallery data: ' + error.message });
  }
});

// Save/update full gallery items
app.post('/api/gallery', (req, res) => {
  try {
    const galleryItems = req.body;
    fs.writeFileSync(GALLERY_FILE, JSON.stringify(galleryItems, null, 2), 'utf-8');
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to save gallery data: ' + error.message });
  }
});

// File path for persistent projects data JSON
const PROJECTS_FILE = path.join(process.cwd(), 'projects_data.json');

// Get saved projects
app.get('/api/projects', (req, res) => {
  try {
    if (fs.existsSync(PROJECTS_FILE)) {
      const data = fs.readFileSync(PROJECTS_FILE, 'utf-8');
      return res.json(JSON.parse(data));
    }
    res.json([]);
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to read projects data: ' + error.message });
  }
});

// Save/update full projects
app.post('/api/projects', (req, res) => {
  try {
    const projects = req.body;
    fs.writeFileSync(PROJECTS_FILE, JSON.stringify(projects, null, 2), 'utf-8');
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to save projects data: ' + error.message });
  }
});

// Upload image endpoint
app.post('/api/upload', (req, res) => {
  try {
    const { filename, base64 } = req.body;
    if (!filename || !base64) {
      return res.status(400).json({ error: 'Filename and base64 data are required' });
    }

    // Remove base64 mime-type header if present
    const cleanBase64 = base64.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(cleanBase64, 'base64');

    // Generate safe, unique filename to prevent overwrites
    const ext = path.extname(filename) || '.jpg';
    const base = path.basename(filename, ext).replace(/[^a-zA-Z0-9]/g, "_");
    const uniqueName = `${base}_${Date.now()}${ext}`;

    const filePath = path.join(UPLOADS_DIR, uniqueName);
    fs.writeFileSync(filePath, buffer);

    res.json({ url: `/uploads/${uniqueName}` });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to save file: ' + error.message });
  }
});

// Initialize Google Gen AI
const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey ? new GoogleGenAI({
  apiKey: apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
}) : null;

// Prompt for Gede's Internship Assistant
const systemInstruction = `
Anda adalah Asisten AI Jurnal & Biografi Magang Gede Bramanda. Tugas Anda adalah membantu pengunjung mengetahui segala hal tentang Gede Bramanda, latar belakang akademisnya, kegiatannya di TRPL Undiksha, ataupun projek sistem digital yang disiapkannya selama masa magang!
Jawablah dengan bahasa Indonesia yang sangat ramah, sopan, komunikatif, profesional, dan inspiratif.

Gunakan data berikut sebagai referensi utama Anda:
- Nama Lengkap: Gede Bramanda
- Universitas: Universitas Pendidikan Ganesha (Undiksha), Singaraja, Bali
- Jurusan/Program Studi: Teknologi Rekayasa Perangkat Lunak (TRPL) Undiksha
- Email Kontak: gedebramanda155@gmail.com
- Blog Utama: https://gedebramanda.blogspot.com/
- GitHub Profile: https://github.com/gedebramanda
- Keahlian Utama: Web Development (React, Express, Tailwind CSS), Database Management (MySQL, PostgreSQL), UI/UX Design, dan Network Engineering (Konfigurasi jaringan & server local).

Aktivitas Jurnal Magang Utama Gede Bramanda:
- Minggu 1 (Orientasi & Pengenalan): Pengenalan lingkungan magang, analisis sistem jaringan internal kantor, dan setup workspace pembangunan web.
- Minggu 2 (Desain Basis Data): Merancang diagram ERD dan database skema untuk aplikasi pelaporan kegiatan internal, melakukan migrasi data lokal.
- Minggu 3 (Development Frontend): Mengimplementasikan antarmuka web modern menggunakan React dan Tailwind CSS dengan layout responsive dan interaktif.
- Minggu 4 (Integration & Backend): Membuat rute API CRUD menggunakan Node.js dan mengintegrasikan form masukan jurnal kegiatan magang harian.
- Minggu 5 (Testing & Dockerization): Melakukan uji coba performa aplikasi, memperbaiki bug fungsionalitas, serta containerization menggunakan Docker untuk deployment lokal.
- Minggu 6 (Finalisasi & Laporan): Mengonfigurasi Nginx reverse proxy, penyusunan laporan magang akhir untuk pihak Universitas (Undiksha), dan presentasi hasil sistem magang kepada pembimbing lapangan.

Projek Unggulan Selama Magang:
1. **E-Report System Undiksha** (Sistem Laporan Magang berbasis web yang menyederhanakan input harian mahasiswa ke dosen pembimbing).
2. **Balinese Cultural Blog Optimizer** (Optimasi performa dan SEO blogspot kebudayaan Bali dengan modern headless design).
3. **Interactive Network Topology Map** (Aplikasi visualisasi rute intranet lokal untuk monitoring jaringan internal).

Berikan jawaban yang ringkas namun informatif. Jika ditanya tentang link atau blog, ingatkan mereka bahwa mereka dapat mengklik tombol "Kunjungi Blogspot" atau "GitHub" yang ada di layar utama untuk detail lebih lengkap. Jangan pernah mengarang informasi di luar lingkup ini, namun Anda boleh memberikan motivasi hangat khas Bali (seperti menyapa dengan "Om Swastyastu" atau salam penutup "Om Shanti Shanti Shanti Om" jika cocok).
`;

// API endpoint for Gede's AI Chat
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!apiKey || !ai) {
      return res.json({ 
        text: "Fitur Asisten AI saat ini dinonaktifkan karena kunci API (GEMINI_API_KEY) belum dipasang."
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: message,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error('Error with Gemini API:', error);
    res.status(500).json({ error: error.message || 'Terjadi kesalahan sistem' });
  }
});

const PORT = 3000;

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('dist'));
  // Handle SPA fallback
  app.get('*', (req, res) => {
    res.sendFile('dist/index.html', { root: '.' });
  });
} else {
  // Integrate Vite dev server middleware
  const { createServer: createViteServer } = await import('vite');
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
