import React, { useState, useEffect } from 'react';
import { 
  Award, 
  Github, 
  Layers, 
  ImageIcon, 
  Cpu, 
  Database, 
  Heart,
  ChevronRight,
  LayoutGrid,
  Lock,
  LogOut,
  ChevronLeft,
  Phone
} from 'lucide-react';
import { Profile, GalleryItem, Project } from './types';
import Dashboard from './components/Dashboard';
import ProjectMagang from './components/ProjectMagang';
import Gallery from './components/Gallery';
import { motion, AnimatePresence } from 'motion/react';

// Bubble Background Component
const BubblesBackground = () => {
  const [bubbles, setBubbles] = useState<Array<{ id: number; size: number; left: number; delay: number; duration: number }>>([]);

  useEffect(() => {
    // Generate stable bubble dimensions
    const generated = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      size: Math.random() * 45 + 15, // size between 15px and 60px
      left: Math.random() * 100, // percentage left
      delay: Math.random() * 12, // staggered animation starts
      duration: Math.random() * 18 + 12 // animation speed
    }));
    setBubbles(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-5]">
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="absolute rounded-full bg-gradient-to-tr from-yellow-500/5 via-red-500/5 to-blue-500/5 border border-slate-800/20 animate-float"
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            left: `${bubble.left}%`,
            bottom: `-80px`,
            animationDelay: `${bubble.delay}s`,
            animationDuration: `${bubble.duration}s`,
          }}
        />
      ))}
    </div>
  );
};

export default function App() {
  // Gede Bramanda Initial Profile Data - TRPL Undiksha
  const initialProfile: Profile = {
    name: 'Gede Bramanda',
    role: 'WEB Dev, Game Developer & Immersive Developer',
    university: 'Universitas Pendidikan Ganesha (Undiksha)',
    major: 'Teknologi Rekayasa Perangkat Lunak (TRPL) Undiksha',
    bio: 'Saya mahasiswa IT proaktif dari program studi Teknologi Rekayasa Perangkat Lunak (TRPL) Undiksha. Saya aktif berkarya sebagai Web Developer, Game Developer, dan Immersive Developer. Saya sangat menyukai perancangan sistem web modern, pembuatan game interaktif interaktif, serta implementasi teknologi imersif (AR/VR/XR) berbasis web. Portofolio interaktif ini mendokumentasikan hasil karya nyata serta galeri media saya.',
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80',
    avatarUrls: [
       ],
    location: 'Singaraja, Bali, Indonesia',
    period: 'Juni - Juli 2026',
    companyName: 'Undiksha IT Infrastructure',
    department: 'Sistem Informasi & Jaringan',
    githubUrl: 'https://github.com/gedebramanda',
    whatsappNumber: '6281234567890',
    email: 'gedebramanda155@gmail.com',
    linkedinUrl: '#',
    skills: ['WEB DEVELOPER', 'GAME DEVELOPER', 'IMMERSIVE DEVELOPER']
  };

  // Initial Gallery Items
  const initialGallery: GalleryItem[] = [
    {
      id: 'gal-1',
      title: 'Rapat Perencanaan Topologi',
      category: 'Infrastruktur',
      imageUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80',
      description: 'Sesi brainstorming skema rute server & firewall untuk intranet kampus.',
      date: '2026-06-03'
    },
    {
      id: 'gal-2',
      title: 'Refining Frontend Codebase',
      category: 'Kegiatan',
      imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
      description: 'Merapikan modularitas komponen React & hooks serta arsitektur clean-code.',
      date: '2026-06-17'
    },
    {
      id: 'gal-3',
      title: 'Konfigurasi Server Rack',
      category: 'Infrastruktur',
      imageUrl: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=600&q=80',
      description: 'Instalasi Nginx reverse proxy di server docker lokal laboratorium TRPL.',
      date: '2026-06-25'
    },
    {
      id: 'gal-4',
      title: 'Koordinasi Mahasiswa Undiksha',
      category: 'Undiksha',
      imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80',
      description: 'Berdiskusi menyusun kerangka format laporan magang bersama dosen pembimbing.',
      date: '2026-06-29'
    },
    {
      id: 'gal-5',
      title: 'Testing Load Query DB',
      category: 'Infrastruktur',
      imageUrl: 'https://images.unsplash.com/photo-1618401471353-b98aedd07871?auto=format&fit=crop&w=600&q=80',
      description: 'Meneliti performa index query database PostgreSQL untuk optimasi latency.',
      date: '2026-07-01'
    },
    {
      id: 'gal-6',
      title: 'WebXR Immersive Testing',
      category: 'Kegiatan',
      imageUrl: 'https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&w=600&q=80',
      description: 'Pengujian fungsionalitas rendering 3D dan kacamata VR pada modul WebXR Bali virtual tour.',
      date: '2026-07-01'
    },
    {
      id: 'gal-7',
      title: 'Penyusunan Modul Game',
      category: 'Kegiatan',
      imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
      description: 'Perancangan state machine AI musuh dan sistem inventori dinamis game RPG Unity.',
      date: '2026-07-02'
    },
    {
      id: 'gal-8',
      title: 'Asistensi Lab Pemrograman',
      category: 'Undiksha',
      imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80',
      description: 'Mendampingi praktikum mahasiswa baru dalam pengenalan dasar web modern.',
      date: '2026-07-02'
    },
    {
      id: 'gal-9',
      title: 'Presentasi Evaluasi Akhir',
      category: 'Undiksha',
      imageUrl: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=600&q=80',
      description: 'Penyajian demo hasil projek magang sistem e-report di depan juri penguji Undiksha.',
      date: '2026-07-03'
    }
  ];

  // Initial Projects Completed
  const initialProjects: Project[] = [
    {
      id: 'proj-1',
      title: 'E-Report System TRPL Undiksha',
      description: 'Portal web modular untuk menyederhanakan pelaporan logbook harian mahasiswa magang TRPL langsung ke Universitas, menghilangkan birokrasi kertas.',
      tech: ['React', 'Express', 'PostgreSQL', 'Docker'],
      githubUrl: 'https://github.com/gedebramanda',
      imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80',
      category: 'Web Development'
    },
    {
      id: 'proj-2',
      title: 'Interactive Balinese VR / WebXR',
      description: 'Pengembangan teknologi imersif berbasis WebXR untuk menyajikan visualisasi 3D warisan budaya Bali secara interaktif langsung di peramban web tanpa instalasi tambahan.',
      tech: ['Three.js', 'A-Frame', 'WebXR', 'HTML5'],
      githubUrl: 'https://github.com/gedebramanda',
      imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80',
      category: 'Immersive Technology'
    },
    {
      id: 'proj-3',
      title: 'Interactive 3D RPG Game (Unity)',
      description: 'Pembuatan game petualangan 3D interaktif yang menyajikan mekanik gameplay modular, sistem inventori, custom visual shader, serta optimasi performa tinggi untuk platform mobile dan PC.',
      tech: ['Unity', 'C#', 'ShaderGraph', 'Blender'],
      githubUrl: 'https://github.com/gedebramanda',
      imageUrl: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=600&q=80',
      category: 'Game Development'
    }
  ];

  // PERSISTENT STATES IN LOCALSTORAGE
  const [profile, setProfile] = useState<Profile>(() => {
    const saved = localStorage.getItem('bramanda_profile_v2');
    return saved ? JSON.parse(saved) : initialProfile;
  });

  const [projects, setProjects] = useState<Project[]>(initialProjects);

  const [gallery, setGallery] = useState<GalleryItem[]>(initialGallery);

  // Load projects from server database on mount to persist across builds & refreshes
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data) && data.length > 0) {
            setProjects(data);
          } else {
            // Seed the server with initial data if it's empty
            await fetch('/api/projects', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(initialProjects)
            });
          }
        }
      } catch (error) {
        console.error('Failed to fetch projects from server:', error);
      }
    };
    fetchProjects();
  }, []);

  // Load gallery from server database on mount to persist across builds & refreshes
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await fetch('/api/gallery');
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data) && data.length > 0) {
            setGallery(data);
          } else {
            // Seed the server with initial data if it's empty
            await fetch('/api/gallery', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(initialGallery)
            });
          }
        }
      } catch (error) {
        console.error('Failed to fetch gallery from server:', error);
      }
    };
    fetchGallery();
  }, []);

  // NAVIGATION TAB STATE (restricted to biografi, projek, galeri)
  const [activeTab, setActiveTab] = useState<'biografi' | 'projek' | 'galeri'>('biografi');

  // ADMIN/EDITOR STATE (Checking path /editor#bram or hash contains bram)
  const [isEditor, setIsEditor] = useState(() => {
    return sessionStorage.getItem('bramanda_editor_authorized') === 'true';
  });
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Save states to LocalStorage on updates
  useEffect(() => {
    localStorage.setItem('bramanda_profile_v2', JSON.stringify(profile));
  }, [profile]);

  // Touch Gesture Swiper for Section Navigation ("dan saat aku geser ke samping layar dia akan menalihkan ke bagain yang lainnya yaa")
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 60; // Minimum sliding distance

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    const tabList: Array<'biografi' | 'projek' | 'galeri'> = ['biografi', 'projek', 'galeri'];
    const currentIdx = tabList.indexOf(activeTab);

    if (isLeftSwipe) {
      // Swipe Left -> Switch to Next Tab
      const nextIdx = (currentIdx + 1) % tabList.length;
      setActiveTab(tabList[nextIdx]);
    } else if (isRightSwipe) {
      // Swipe Right -> Switch to Previous Tab
      const prevIdx = (currentIdx - 1 + tabList.length) % tabList.length;
      setActiveTab(tabList[prevIdx]);
    }
  };

  // Keyboard Left / Right arrow navigation keys to slide/swipe sections
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore when typing inside input elements
      const tag = document.activeElement?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') {
        return;
      }

      const tabList: Array<'biografi' | 'projek' | 'galeri'> = ['biografi', 'projek', 'galeri'];
      const currentIdx = tabList.indexOf(activeTab);

      if (e.key === 'ArrowRight') {
        const nextIdx = (currentIdx + 1) % tabList.length;
        setActiveTab(tabList[nextIdx]);
      } else if (e.key === 'ArrowLeft') {
        const prevIdx = (currentIdx - 1 + tabList.length) % tabList.length;
        setActiveTab(tabList[prevIdx]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab]);

  // URL hash change detector for Editor route
  useEffect(() => {
    const detectEditorPath = () => {
      const isBramHash = window.location.hash.includes('bram');
      const isEditorPath = window.location.pathname.includes('editor') || window.location.hash.includes('editor');
      
      if ((isBramHash || isEditorPath) && !isEditor) {
        setShowPasswordPrompt(true);
      }
    };

    detectEditorPath();
    window.addEventListener('hashchange', detectEditorPath);
    return () => window.removeEventListener('hashchange', detectEditorPath);
  }, [isEditor]);

  // Handle password check
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'Bram123') {
      setIsEditor(true);
      sessionStorage.setItem('bramanda_editor_authorized', 'true');
      setShowPasswordPrompt(false);
      setPasswordInput('');
      setPasswordError('');
      alert('AUTHORIZED: Selamat Datang Gede Bramanda! Anda kini dalam Mode Editor.');
    } else {
      setPasswordError('Password salah! Silakan coba lagi.');
    }
  };

  const handleLogoutEditor = () => {
    setIsEditor(false);
    sessionStorage.removeItem('bramanda_editor_authorized');
    window.location.hash = '';
    window.location.pathname = '/';
  };

  // State Handler Modifiers
  const handleEditProfile = (updatedProfile: Profile) => {
    setProfile(updatedProfile);
  };

  const saveProjectsToServer = async (items: Project[]) => {
    try {
      await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(items)
      });
    } catch (err) {
      console.error('Failed to save projects to server:', err);
    }
  };

  const handleAddProject = (newProj: Project) => {
    setProjects(prev => {
      const updated = [newProj, ...prev];
      saveProjectsToServer(updated);
      return updated;
    });
  };

  const handleEditProject = (updatedProj: Project) => {
    setProjects(prev => {
      const updated = prev.map(p => p.id === updatedProj.id ? updatedProj : p);
      saveProjectsToServer(updated);
      return updated;
    });
  };

  const handleDeleteProject = (id: string) => {
    setProjects(prev => {
      const updated = prev.filter(p => p.id !== id);
      saveProjectsToServer(updated);
      return updated;
    });
  };

  const saveGalleryToServer = async (items: GalleryItem[]) => {
    try {
      await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(items)
      });
    } catch (err) {
      console.error('Failed to save gallery to server:', err);
    }
  };

  const handleUploadGalleryImage = (newItem: GalleryItem) => {
    setGallery(prev => {
      const updated = [newItem, ...prev];
      saveGalleryToServer(updated);
      return updated;
    });
  };

  const handleEditGalleryImage = (updatedItem: GalleryItem) => {
    setGallery(prev => {
      const updated = prev.map(item => item.id === updatedItem.id ? updatedItem : item);
      saveGalleryToServer(updated);
      return updated;
    });
  };

  const handleDeleteGalleryImage = (id: string) => {
    setGallery(prev => {
      const updated = prev.filter(item => item.id !== id);
      saveGalleryToServer(updated);
      return updated;
    });
  };

  // 3D Scroll Perspective factor
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      id="app-root" 
      className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-yellow-400 selection:text-slate-950 overflow-x-hidden relative flex flex-col justify-between"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      
      {/* Dynamic floating bubbles background */}
      <BubblesBackground />

      {/* Background Cyber Grid */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35 pointer-events-none -z-20"></div>

      {/* Futuristic Orbs */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] aspect-square bg-yellow-500/10 rounded-full blur-[130px] pointer-events-none -z-15"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] aspect-square bg-blue-500/10 rounded-full blur-[130px] pointer-events-none -z-15"></div>
      <div className="fixed top-[40%] right-[10%] w-[35%] aspect-square bg-red-500/5 rounded-full blur-[130px] pointer-events-none -z-15"></div>

      {/* Editor Active Warning Banner */}
      {isEditor && (
        <div className="bg-red-600 text-white font-extrabold text-[11px] sm:text-xs uppercase tracking-widest text-center py-2 px-4 flex items-center justify-center space-x-3 shadow-lg z-50 sticky top-0">
          <span className="w-2.5 h-2.5 bg-white rounded-full animate-ping"></span>
          <span>MODE EDITOR AKTIF — Perubahan langsung mempengaruhi data web</span>
          <button 
            onClick={handleLogoutEditor}
            className="bg-slate-950/80 hover:bg-slate-950 text-white hover:text-red-400 px-3 py-1 rounded-lg text-[9px] font-mono border border-slate-800 transition-colors flex items-center space-x-1"
          >
            <LogOut className="h-3 w-3" />
            <span>LOGOUT</span>
          </button>
        </div>
      )}

      {/* HEADER / NAVIGATION BAR */}
      <header id="app-header" className={`sticky ${isEditor ? 'top-[36px]' : 'top-0'} z-40 bg-slate-950/85 backdrop-blur-md relative`}>
        {/* Animated RGB backlight glow */}
        <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-r from-red-500 via-yellow-400 via-green-400 via-blue-500 via-purple-500 to-red-500 blur-md opacity-25 animate-rgb-aura -z-10 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo & Info */}
          <div className="flex items-center space-x-3">
            <div>
              <span className="font-extrabold text-slate-50 tracking-tight text-sm sm:text-base block">Gede Bramanda</span>
              <span className="text-[9px] sm:text-[10px] font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-blue-400 tracking-widest uppercase block">
                TrigantalapatiStudio
              </span>
            </div>
          </div>

          {/* Nav Tab Controls */}
          <nav className="hidden md:flex items-center space-x-6 text-[11px] font-black uppercase tracking-widest">
            <button
              onClick={() => setActiveTab('biografi')}
              className={`pb-1 transition-all border-b-2 hover:text-yellow-400 ${
                activeTab === 'biografi' ? 'text-yellow-400 border-yellow-400' : 'text-slate-400 border-transparent'
              }`}
            >
              Biografi
            </button>
            <button
              onClick={() => setActiveTab('projek')}
              className={`pb-1 transition-all border-b-2 hover:text-yellow-400 ${
                activeTab === 'projek' ? 'text-yellow-400 border-yellow-400' : 'text-slate-400 border-transparent'
              }`}
            >
              Projek Utama
            </button>
            <button
              onClick={() => setActiveTab('galeri')}
              className={`pb-1 transition-all border-b-2 hover:text-blue-400 ${
                activeTab === 'galeri' ? 'text-blue-400 border-blue-400' : 'text-slate-400 border-transparent'
              }`}
            >
              Galeri Dokumentasi
            </button>
          </nav>

          <div className="flex items-center space-x-2">
            <a 
              href={profile.githubUrl}
              target="_blank" 
              rel="noreferrer" 
              className="p-2.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-blue-500 text-slate-300 rounded-xl transition-colors"
              title="Akses GitHub Gede"
            >
              <Github className="h-4 w-4 text-blue-400" />
            </a>
            
            {/* Direct WhatsApp trigger button */}
            <a 
              href={`https://wa.me/${profile.whatsappNumber || '6281234567890'}`}
              target="_blank" 
              rel="noreferrer" 
              className="px-3.5 py-2 bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-wider shadow-lg shadow-green-500/10 transition-transform active:scale-95 flex items-center space-x-1.5"
            >
              <Phone className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Hubungi Bram</span>
            </a>
          </div>
        </div>

        {/* Shifting RGB bottom-line border */}
        <div className="h-[2px] w-full bg-gradient-to-r from-red-500 via-yellow-400 via-green-400 via-blue-500 via-purple-500 to-red-500 animate-rgb-aura shadow-[0_1px_10px_rgba(239,68,68,0.3)]"></div>
      </header>

      {/* MOBILE TAB CONTROLS */}
      <div className="md:hidden bg-slate-950/90 border-b border-slate-900 sticky top-16 z-30 p-2 overflow-x-auto flex space-x-1 justify-center">
        <button
          onClick={() => setActiveTab('biografi')}
          className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider ${
            activeTab === 'biografi' ? 'bg-yellow-400 text-slate-950 font-black' : 'text-slate-400'
          }`}
        >
          Bio
        </button>
        <button
          onClick={() => setActiveTab('projek')}
          className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider ${
            activeTab === 'projek' ? 'bg-yellow-400 text-slate-950 font-black' : 'text-slate-400'
          }`}
        >
          Projek
        </button>
        <button
          onClick={() => setActiveTab('galeri')}
          className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider ${
            activeTab === 'galeri' ? 'bg-blue-500 text-white font-black' : 'text-slate-400'
          }`}
        >
          Galeri
        </button>
      </div>

      {/* MAIN CONTAINER WITH 3D PERSPECTIVE SCROLL BOUNDS */}
      <main className={`mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 relative z-10 flex-grow transition-all duration-300 ${
        activeTab === 'galeri' ? 'max-w-none w-full xl:px-12' : 'max-w-7xl'
      }`}>
        
        {/* Render Only the Current Selected Tab */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
          >
            {activeTab === 'biografi' && (
              <section 
                id="biografi-section" 
                className="transition-all duration-700 ease-out"
                style={{
                  transform: `perspective(1000px) rotateX(${Math.max(-4, Math.min(4, scrollY * 0.005))}deg) translateY(${Math.max(-15, Math.min(15, scrollY * 0.01))}deg)`,
                  opacity: 1
                }}
              >
                <Dashboard 
                  profile={profile} 
                  onOpenChat={() => {}} // dummy no-op
                  isEditor={isEditor}
                  onEditProfile={handleEditProfile}
                />
              </section>
            )}

            {activeTab === 'projek' && (
              <section id="projek-section" className="p-6 sm:p-8 bg-slate-950/60 border border-slate-900 rounded-3xl relative">
                <div className="absolute top-0 right-1/4 w-48 h-[2px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
                <div className="mb-6">
                  <h2 className="text-lg sm:text-xl font-extrabold text-slate-100 uppercase tracking-widest flex items-center space-x-2">
                    <Layers className="h-5 w-5 text-yellow-400" />
                    <span>PROJEK UTAMA & CAROUSEL</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Kumpulan sistem digital yang dideploy, diuji, dan dioptimasi Gede Bramanda. Klik projek untuk melihat deskripsi lengkap!
                  </p>
                </div>
                <ProjectMagang 
                  projects={projects} 
                  isEditor={isEditor}
                  onAddProject={handleAddProject}
                  onEditProject={handleEditProject}
                  onDeleteProject={handleDeleteProject}
                  whatsappNumber={profile.whatsappNumber}
                />
              </section>
            )}

            {activeTab === 'galeri' && (
              <section id="galeri-section" className="p-6 sm:p-10 bg-slate-950/60 border border-slate-900 rounded-3xl relative w-full max-w-full">
                <div className="absolute bottom-0 left-10 w-48 h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
                <div className="mb-6 border-b border-slate-900 pb-4">
                  <h2 className="text-lg sm:text-xl font-extrabold text-slate-100 uppercase tracking-widest flex items-center space-x-2">
                    <LayoutGrid className="h-5 w-5 text-blue-400 animate-pulse" />
                    <span>Galeri Dokumentasi</span>
                  </h2>
                </div>
                <Gallery 
                  galleryItems={gallery} 
                  isEditor={isEditor}
                  onUploadImage={handleUploadGalleryImage}
                  onEditImage={handleEditGalleryImage}
                  onDeleteImage={handleDeleteGalleryImage}
                />
              </section>
            )}
          </motion.div>
        </AnimatePresence>

      </main>

      {/* FOOTER */}
      <footer className="mt-16 bg-slate-950 border-t border-slate-900 py-12 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-12 gap-8 items-center pb-8 border-b border-slate-900">
            <div className="md:col-span-6 space-y-3">
              <span className="font-black text-slate-100 text-lg uppercase tracking-wider block">Gede Bramanda</span>
              <p className="text-slate-500 text-xs max-w-sm leading-relaxed">
                Website portofolio interaktif Teknologi Rekayasa Perangkat Lunak (TRPL) Undiksha Bali. Dibuat menggunakan React, Tailwind CSS, didukung visual efek 3D, serta transisi geser horizontal.
              </p>
            </div>
            <div className="md:col-span-6 flex flex-wrap gap-4 text-[10px] font-black uppercase tracking-widest text-slate-500 md:justify-end">
              <button onClick={() => setActiveTab('biografi')} className="hover:text-yellow-400 transition-colors">Biografi</button>
              <button onClick={() => setActiveTab('projek')} className="hover:text-yellow-400 transition-colors">Projek</button>
              <button onClick={() => setActiveTab('galeri')} className="hover:text-blue-400 transition-colors">Galeri</button>
              <a href={profile.githubUrl} target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors">GitHub</a>
              <a href={`https://wa.me/${profile.whatsappNumber || '6281234567890'}`} target="_blank" rel="noreferrer" className="hover:text-green-400 transition-colors">WhatsApp</a>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-slate-600 gap-4">
            <p>© {new Date().getFullYear()} GEDE BRAMANDA. TRPL UNDIKSHA BALI. ALL RIGHTS RESERVED.</p>
            <div className="flex items-center space-x-1">
              <span>Crafted with</span>
              <Heart className="h-3 w-3 text-red-500 fill-red-500" />
              <span>in Singaraja, Bali</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ADMIN PASSWORD PROMPT MODAL */}
      <AnimatePresence>
        {showPasswordPrompt && (
          <div className="fixed inset-0 bg-slate-950/95 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900 border border-slate-800 p-6 rounded-3xl w-full max-w-sm text-center space-y-4 shadow-2xl relative"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
              
              <div className="mx-auto w-12 h-12 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl flex items-center justify-center">
                <Lock className="h-6 w-6 animate-pulse" />
              </div>

              <div>
                <h3 className="font-extrabold text-slate-100 text-sm tracking-wide uppercase">AUTENTIKASI EDITOR</h3>
                <p className="text-[10px] text-slate-400 mt-1">Masukkan kata sandi khusus untuk mengaktifkan Bramanda Editor Mode.</p>
              </div>

              <form onSubmit={handlePasswordSubmit} className="space-y-3">
                <input 
                  type="password"
                  required
                  placeholder="Kata Sandi (Bram123)"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-center text-slate-100 placeholder-slate-600 focus:outline-none focus:border-yellow-400"
                />
                
                {passwordError && (
                  <p className="text-red-500 text-[10px] font-semibold">{passwordError}</p>
                )}

                <div className="flex space-x-2 pt-2">
                  <button 
                    type="button"
                    onClick={() => {
                      setShowPasswordPrompt(false);
                      window.location.hash = '';
                      window.location.pathname = '/';
                    }}
                    className="flex-1 px-4 py-2.5 bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-400 rounded-xl text-xs font-bold"
                  >
                    Batal
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-red-600 via-red-500 to-yellow-500 text-white rounded-xl text-xs font-bold shadow-lg"
                  >
                    Verifikasi
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
