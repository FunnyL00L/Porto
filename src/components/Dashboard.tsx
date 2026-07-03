import React, { useState, useEffect } from 'react';
import { MapPin, Mail, Award, Github, Sparkles, Layers, Cpu, Database, ChevronLeft, ChevronRight, Edit2, Phone, MessageSquare } from 'lucide-react';
import { Profile } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface DashboardProps {
  profile: Profile;
  onOpenChat: () => void; // Kept in interface to prevent compilation issues, but won't be displayed
  isEditor?: boolean;
  onEditProfile?: (updated: Profile) => void;
}

export default function Dashboard({ profile, isEditor, onEditProfile }: DashboardProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [isEditing, setIsEditing] = useState(false);

  // Editable states
  const [editName, setEditName] = useState(profile.name);
  const [editRole, setEditRole] = useState(profile.role);
  const [editUniversity, setEditUniversity] = useState(profile.university);
  const [editMajor, setEditMajor] = useState(profile.major);
  const [editBio, setEditBio] = useState(profile.bio);
  const [editUrls, setEditUrls] = useState<string[]>(profile.avatarUrls || []);
  const [newUrlInput, setNewUrlInput] = useState('');
  const [editLocation, setEditLocation] = useState(profile.location);
  const [editCompany, setEditCompany] = useState(profile.companyName);
  const [editEmail, setEditEmail] = useState(profile.email);
  const [editWA, setEditWA] = useState(profile.whatsappNumber || '6281234567890');
  const [editGit, setEditGit] = useState(profile.githubUrl);
  const [editSkills, setEditSkills] = useState<string>(
    profile.skills?.join(', ') || 'WEB DEVELOPER, GAME DEVELOPER, IMMERSIVE DEVELOPER'
  );

  // Typewriter / rewriting effect for Gede Bramanda
  const [typedText, setTypedText] = useState('');
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const words = [
    profile.name, 
    "Game Developer", 
    "Web Development", 
    "Immersive Development"
  ];

  useEffect(() => {
    let timer: any;
    const currentWord = words[loopNum % words.length];
    
    const handleTyping = () => {
      if (!isDeleting) {
        setTypedText(currentWord.substring(0, typedText.length + 1));
        setTypingSpeed(100);
        if (typedText === currentWord) {
          timer = setTimeout(() => setIsDeleting(true), 2000);
          return;
        }
      } else {
        setTypedText(currentWord.substring(0, typedText.length - 1));
        setTypingSpeed(50);
        if (typedText === '') {
          setIsDeleting(false);
          setLoopNum(loopNum + 1);
          setTypingSpeed(400);
          return;
        }
      }
      
      timer = setTimeout(handleTyping, typingSpeed);
    };

    timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [typedText, isDeleting, loopNum]);

  // Alternating social media platform state (IG, X, Facebook) - rotates every 2 seconds
  const socialPlatforms = [
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/gbrm_918/',
      icon: (className: string) => (
        <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204 0 3.204-.013-3.583-.07-4.849-.149-3.227-1.664-4.771-4.919-4.919-1.266-.057-1.645-.069-4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
        </svg>
      ),
      colorClass: 'from-pink-600 via-rose-500 to-yellow-500 text-white border-pink-500/20',
    },
    {
      name: 'X (Twitter)',
      url: 'https://x.com/BramandaGde',
      icon: (className: string) => (
        <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
      colorClass: 'from-slate-800 to-slate-900 text-white border-slate-700/50',
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/share/191uEbbg8B/',
      icon: (className: string) => (
        <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      colorClass: 'from-blue-600 to-blue-700 text-white border-blue-600/30',
    },
  ];

  const [currentSocialIndex, setCurrentSocialIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSocialIndex((prev) => (prev + 1) % socialPlatforms.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const defaultSlides = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80', // Student Portrait
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80', // Dev Portrait
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80'  // Professional Portrait
  ];

  const slidesToUse = editUrls.length > 0 ? editUrls : defaultSlides;

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection('right');
      setCurrentSlide((prev) => (prev + 1) % slidesToUse.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slidesToUse.length]);

  const handleNext = () => {
    setDirection('right');
    setCurrentSlide((prev) => (prev + 1) % slidesToUse.length);
  };

  const handlePrev = () => {
    setDirection('left');
    setCurrentSlide((prev) => (prev - 1 + slidesToUse.length) % slidesToUse.length);
  };

  const handleSave = () => {
    if (onEditProfile) {
      const parsedSkills = editSkills
        .split(',')
        .map(s => s.trim())
        .filter(s => s.length > 0);

      onEditProfile({
        ...profile,
        name: editName,
        role: editRole,
        university: editUniversity,
        major: editMajor,
        bio: editBio,
        avatarUrls: editUrls,
        location: editLocation,
        companyName: editCompany,
        email: editEmail,
        whatsappNumber: editWA,
        githubUrl: editGit,
        skills: parsedSkills
      });
    }
    setIsEditing(false);
  };

  const addImageUrl = () => {
    if (newUrlInput.trim()) {
      setEditUrls(prev => [...prev, newUrlInput.trim()]);
      setNewUrlInput('');
    }
  };

  const removeImageUrl = (index: number) => {
    setEditUrls(prev => prev.filter((_, i) => i !== index));
  };

  const slideVariants = {
    enter: (dir: 'left' | 'right') => ({
      x: dir === 'right' ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 }
      }
    },
    exit: (dir: 'left' | 'right') => ({
      x: dir === 'right' ? '-100%' : '100%',
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 }
      }
    })
  };

  return (
    <div id="dashboard-section" className="relative">
      
      {/* Editor Button trigger if logged in as admin */}
      {isEditor && (
        <div className="absolute top-[-30px] right-0 z-30">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center space-x-1.5 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-red-500/10 transition-all transform hover:scale-105"
          >
            <Edit2 className="h-3.5 w-3.5" />
            <span>{isEditing ? 'Tutup Panel Edit' : 'Edit Biodata Gede'}</span>
          </button>
        </div>
      )}

      {/* Editor Panel Modal */}
      <AnimatePresence>
        {isEditing && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="mb-8 p-6 bg-slate-900 border-2 border-red-500/30 rounded-3xl space-y-4 shadow-2xl relative z-20"
          >
            <div className="flex items-center justify-between border-b border-slate-850 pb-3">
              <h3 className="font-extrabold text-slate-100 text-sm tracking-wide uppercase flex items-center space-x-2">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
                <span>EDIT PANEL BIODATA (BRAMANDA MODE)</span>
              </h3>
              <span className="text-[10px] font-mono text-amber-400 font-bold">AUTHORIZED SESI</span>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-slate-500 uppercase">Nama Lengkap</label>
                <input 
                  type="text" 
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 focus:outline-none focus:border-yellow-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-slate-500 uppercase">Peran / Jabatan</label>
                <input 
                  type="text" 
                  value={editRole}
                  onChange={(e) => setEditRole(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 focus:outline-none focus:border-yellow-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-slate-500 uppercase">Program Studi (Jurusan)</label>
                <input 
                  type="text" 
                  value={editMajor}
                  onChange={(e) => setEditMajor(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 focus:outline-none focus:border-yellow-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-slate-500 uppercase">Universitas</label>
                <input 
                  type="text" 
                  value={editUniversity}
                  onChange={(e) => setEditUniversity(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 focus:outline-none focus:border-yellow-400"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono text-slate-500 uppercase">Biografi Ringkas</label>
              <textarea 
                rows={3}
                value={editBio}
                onChange={(e) => setEditBio(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 focus:outline-none focus:border-yellow-400 resize-none"
              ></textarea>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono text-slate-500 uppercase">Kategori / Skill Sliding (Pisahkan dengan koma)</label>
              <input 
                type="text"
                value={editSkills}
                onChange={(e) => setEditSkills(e.target.value)}
                placeholder="WEB DEVELOPER, GAME DEVELOPER, IMMERSIVE DEVELOPER"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 focus:outline-none focus:border-yellow-400"
              />
            </div>

            {/* Slide Images manager */}
            <div className="space-y-2 p-4 bg-slate-950 rounded-2xl border border-slate-850">
              <label className="text-[10px] font-mono text-slate-400 uppercase block">Daftar Foto Pribadi Slideshow (Geser Kiri/Kanan)</label>
              
              <div className="flex space-x-2">
                <input 
                  type="url" 
                  placeholder="https://images.unsplash.com/photo-..." 
                  value={newUrlInput}
                  onChange={(e) => setNewUrlInput(e.target.value)}
                  className="flex-1 bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 focus:outline-none focus:border-yellow-400"
                />
                <button 
                  type="button" 
                  onClick={addImageUrl}
                  className="px-4 py-2.5 bg-yellow-400 hover:bg-yellow-500 text-slate-950 rounded-xl text-xs font-bold"
                >
                  Tambah Foto
                </button>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {editUrls.map((url, index) => (
                  <div key={index} className="flex items-center space-x-2 bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs">
                    <span className="text-slate-400 truncate max-w-[150px] font-mono text-[10px]">{url}</span>
                    <button 
                      type="button" 
                      onClick={() => removeImageUrl(index)}
                      className="text-red-500 font-bold hover:text-red-400"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-slate-500 uppercase">Lokasi Domisili</label>
                <input 
                  type="text" 
                  value={editLocation}
                  onChange={(e) => setEditLocation(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 focus:outline-none focus:border-yellow-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-slate-500 uppercase">Tempat Magang</label>
                <input 
                  type="text" 
                  value={editCompany}
                  onChange={(e) => setEditCompany(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 focus:outline-none focus:border-yellow-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-slate-500 uppercase">Email</label>
                <input 
                  type="email" 
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 focus:outline-none focus:border-yellow-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-slate-500 uppercase">Nomor WhatsApp (Gunakan Kode Negara: 628...)</label>
                <input 
                  type="text" 
                  value={editWA}
                  onChange={(e) => setEditWA(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 focus:outline-none focus:border-yellow-400"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-[10px] font-mono text-slate-500 uppercase">GitHub Profile URL</label>
                <input 
                  type="text" 
                  value={editGit}
                  onChange={(e) => setEditGit(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 focus:outline-none focus:border-yellow-400"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2 border-t border-slate-850">
              <button 
                type="button" 
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-400 rounded-xl text-xs font-bold"
              >
                Batal
              </button>
              <button 
                type="button" 
                onClick={handleSave}
                className="px-5 py-2 bg-gradient-to-r from-red-600 via-red-500 to-yellow-500 text-white rounded-xl text-xs font-bold shadow-lg"
              >
                Simpan Perubahan
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Swipeable transparent images styled as FULL container cover */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
          
          {/* Active 3D Stacking Deck Container (Fully Transparent background as requested) */}
          <div className="relative w-full max-w-sm aspect-[4/5] flex items-center justify-center select-none group h-[400px] sm:h-[450px]">
            
            {/* 3D Stacking Deck Layers */}
            {slidesToUse.map((slide, i) => {
              const len = slidesToUse.length;
              // Calculate relative position offset from current active slide
              const diff = (i - currentSlide + len) % len;
              
              // Only render the top 3 cards in the stack for performance
              if (diff > 2) return null;

              // Stacking deck attributes
              const scale = 1 - diff * 0.06;
              const y = diff * 16; // stacked downward
              const x = diff * 10; // stacked to the right
              const rotate = diff === 0 ? 0 : diff === 1 ? 4 : -4;
              const opacity = diff === 0 ? 1 : diff === 1 ? 0.75 : 0.45;
              const zIndex = len - diff;

              return (
                <motion.div
                  key={slide + '-' + i}
                  style={{ zIndex }}
                  animate={{
                    scale,
                    y,
                    x,
                    rotate,
                    opacity,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 260,
                    damping: 24,
                  }}
                  className={`absolute inset-0 rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center bg-transparent cursor-pointer ${
                    diff === 0 ? 'pointer-events-auto' : 'pointer-events-none'
                  }`}
                  onClick={() => {
                    if (diff === 0) {
                      handleNext();
                    }
                  }}
                >
                  <div className="w-full h-full relative rounded-3xl overflow-hidden border border-slate-800/40">
                    {/* Glassy dynamic glowing background behind transparent image */}
                    {diff === 0 && (
                      <div className="absolute inset-x-8 inset-y-8 rounded-full bg-gradient-to-tr from-yellow-500/10 via-red-500/10 to-blue-500/10 blur-3xl opacity-80 animate-pulse"></div>
                    )}

                    <img
                      src={slide}
                      alt={`${profile.name} Stack ${i + 1}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover select-none rounded-3xl"
                    />
                  </div>
                </motion.div>
              );
            })}

            {/* Slide Navigation Buttons - elegantly floating over transparent deck */}
            <button 
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              className="absolute left-2 p-2.5 bg-slate-950/90 hover:bg-slate-900 border border-slate-800 hover:border-yellow-400 text-slate-300 hover:text-yellow-400 rounded-full transition-all duration-200 z-40 shadow-xl"
              title="Sebelumnya"
            >
              <ChevronLeft className="h-4.5 w-4.5" />
            </button>

            <button 
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              className="absolute right-2 p-2.5 bg-slate-950/90 hover:bg-slate-900 border border-slate-800 hover:border-yellow-400 text-slate-300 hover:text-yellow-400 rounded-full transition-all duration-200 z-40 shadow-xl"
              title="Selanjutnya"
            >
              <ChevronRight className="h-4.5 w-4.5" />
            </button>

            {/* Slider Indicators dots */}
            <div className="absolute -bottom-2 flex justify-center space-x-1.5 z-40">
              {slidesToUse.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setDirection(i > currentSlide ? 'right' : 'left');
                    setCurrentSlide(i);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === currentSlide ? 'w-4 bg-yellow-400 animate-pulse' : 'w-1.5 bg-slate-700 hover:bg-slate-500'}`}
                />
              ))}
            </div>

          </div>

          {/* Floating tag card beneath avatar */}
          <div className="text-center mt-6 bg-slate-950/90 border border-slate-800 backdrop-blur-md py-2.5 px-5 rounded-2xl shadow-xl w-10/12">
            <h3 className="font-black text-slate-100 text-sm tracking-wide uppercase">{profile.name}</h3>
            <p className="text-[10px] font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-blue-400 tracking-widest uppercase mt-0.5">
              {profile.role}
            </p>
          </div>

        </div>

        {/* Right Column: Bio details, social interactions, triadic colorful headers */}
        <div className="lg:col-span-7 space-y-6">
          {/* Dynamic Scrolling Badges Track (Marquee slide right to left) */}
          <div className="w-full overflow-hidden py-2 relative bg-slate-900/30 border border-slate-900/60 rounded-2xl">
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none"></div>
            <motion.div 
              className="flex space-x-4 whitespace-nowrap min-w-full"
              animate={{ x: [0, -320] }}
              transition={{
                ease: "linear",
                duration: 16,
                repeat: Infinity,
              }}
            >
              {/* Repeats skills to guarantee continuous, seamless appearance */}
              {[
                ...(profile.skills || ['WEB DEVELOPER', 'GAME DEVELOPER', 'IMMERSIVE DEVELOPER']), 
                ...(profile.skills || ['WEB DEVELOPER', 'GAME DEVELOPER', 'IMMERSIVE DEVELOPER']), 
                ...(profile.skills || ['WEB DEVELOPER', 'GAME DEVELOPER', 'IMMERSIVE DEVELOPER']), 
                ...(profile.skills || ['WEB DEVELOPER', 'GAME DEVELOPER', 'IMMERSIVE DEVELOPER'])
              ].map((skill, index) => {
                const colors = [
                  'bg-yellow-400/10 border-yellow-400/20 text-yellow-400',
                  'bg-blue-500/10 border-blue-500/20 text-blue-400',
                  'bg-red-500/10 border-red-500/20 text-red-400',
                  'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
                  'bg-purple-500/10 border-purple-500/20 text-purple-400'
                ];
                const colorClass = colors[index % colors.length];

                return (
                  <span 
                    key={index} 
                    className={`inline-flex items-center space-x-1.5 border px-3.5 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${colorClass}`}
                  >
                    <Sparkles className="h-3 w-3 animate-pulse" />
                    <span>{skill}</span>
                  </span>
                );
              })}
            </motion.div>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-100 leading-none tracking-tight min-h-[55px] sm:min-h-[65px] flex items-center">
            <span>Hi, Saya&nbsp;</span>
            <span className="text-yellow-400 font-black relative inline-flex items-center">
              <span>{typedText}</span>
              <span className="inline-block w-[3px] h-[30px] sm:h-[40px] bg-yellow-400 ml-1.5 animate-pulse"></span>
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
            {profile.bio}
          </p>

          {/* Quick Details List */}
          <div className="grid sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-2xl flex items-center space-x-3.5 hover:border-blue-500/40 transition-colors">
              <div className="p-2 bg-blue-500/10 text-blue-400 rounded-xl">
                <MapPin className="h-4 w-4" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block">Domisili</span>
                <span className="text-xs sm:text-sm font-bold text-slate-200">{profile.location}</span>
              </div>
            </div>

            <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-2xl flex items-center space-x-3.5 hover:border-yellow-400/40 transition-colors">
              <div className="p-2 bg-yellow-400/10 text-yellow-400 rounded-xl">
                <Mail className="h-4 w-4" />
              </div>
              <div className="overflow-hidden">
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block">Email</span>
                <span className="text-xs sm:text-sm font-bold text-slate-200 block truncate">{profile.email}</span>
              </div>
            </div>

            <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-2xl flex items-center space-x-3.5 hover:border-red-500/40 transition-colors">
              <div className="p-2 bg-red-500/10 text-red-400 rounded-xl">
                <Award className="h-4 w-4" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block">Universitas</span>
                <span className="text-xs sm:text-sm font-bold text-slate-200">{profile.university}</span>
              </div>
            </div>

            <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-2xl flex items-center space-x-3.5 hover:border-green-500/40 transition-colors">
              <div className="p-2 bg-green-500/10 text-green-400 rounded-xl">
                <Phone className="h-4 w-4" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block">WhatsApp</span>
                <span className="text-xs sm:text-sm font-bold text-slate-200">+{profile.whatsappNumber || '6281234567890'}</span>
              </div>
            </div>
          </div>

          {/* Social CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-4">
            
            {/* Primary WA Button styled beautifully as requested */}
            <a 
              href={`https://wa.me/${profile.whatsappNumber || '6281234567890'}`}
              target="_blank" 
              rel="noreferrer"
              className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white rounded-xl font-bold text-xs sm:text-sm shadow-lg shadow-green-500/10 flex items-center space-x-2.5 transition-all hover:scale-105"
            >
              <svg className="h-4.5 w-4.5 fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.413 9.863-9.83.001-2.624-1.023-5.091-2.884-6.957C16.59 1.96 14.117.935 11.997.935c-5.442 0-9.866 4.415-9.87 9.832-.001 1.746.467 3.447 1.353 4.93L2.43 21.053l5.503-1.443L6.647 19.154z"/>
              </svg>
              <span>Hubungi Bram (WhatsApp)</span>
            </a>

            <a 
              href={profile.githubUrl} 
              target="_blank" 
              rel="noreferrer"
              className="px-5 py-3 bg-slate-900 hover:bg-slate-850 text-slate-200 border border-slate-800 rounded-xl font-bold text-xs sm:text-sm flex items-center space-x-2 transition-all hover:scale-105"
            >
              <Github className="h-4 w-4 text-blue-400" />
              <span>Akses GitHub</span>
            </a>

            {/* Alternating Platform: Instagram, X, Facebook (rotates 2s, distinct action per platform) */}
            <div className="relative inline-flex items-center min-h-[44px]">
              <AnimatePresence mode="wait">
                <motion.a 
                  key={socialPlatforms[currentSocialIndex].name}
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -10 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  href={socialPlatforms[currentSocialIndex].url}
                  target="_blank" 
                  rel="noreferrer"
                  className={`px-5 py-3 bg-gradient-to-r ${socialPlatforms[currentSocialIndex].colorClass} border rounded-xl font-bold text-xs sm:text-sm flex items-center space-x-2 transition-all hover:scale-105 shadow-md shadow-black/30`}
                >
                  {socialPlatforms[currentSocialIndex].icon("h-4 w-4")}
                  <span>Kunjungi {socialPlatforms[currentSocialIndex].name}</span>
                </motion.a>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
