import React, { useState, useRef, useEffect } from 'react';
import { Github, Globe, Code, ShieldCheck, Edit2, Trash, Plus, Save, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Project } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface ProjectMagangProps {
  projects: Project[];
  isEditor?: boolean;
  onAddProject?: (p: Project) => void;
  onEditProject?: (p: Project) => void;
  onDeleteProject?: (id: string) => void;
  whatsappNumber?: string;
}

// Helper to detect HTML tags
const isHTML = (text: string) => {
  return /<[a-z][\s\S]*>/i.test(text);
};

// Helper to strip HTML tags for clean preview
const getCleanPreviewText = (text: string) => {
  if (isHTML(text)) {
    const clean = text.replace(/<[^>]*>/g, ' ');
    return clean.replace(/\s+/g, ' ').trim();
  }
  return text;
};

// 3D Tilt interactive project card
function InteractiveProjectCard({ 
  project, 
  index, 
  isEditor, 
  onEditClick, 
  onDeleteClick,
  onClick
}: { 
  project: Project; 
  index: number; 
  isEditor?: boolean; 
  onEditClick: () => void; 
  onDeleteClick: () => void;
  onClick: () => void;
  key?: string | number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Normalize coordinates: -0.5 to 0.5
    const normX = (x / rect.width) - 0.5;
    const normY = (y / rect.height) - 0.5;
    
    // Calculate tilt angle: tilt up to 15 degrees
    const rotateY = normX * 16;
    const rotateX = -normY * 16;
    
    setTilt({ x: rotateY, y: rotateX });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const borderColors = [
    'hover:border-blue-500 hover:shadow-blue-500/20',
    'hover:border-yellow-400 hover:shadow-yellow-400/20',
    'hover:border-red-500 hover:shadow-red-500/20'
  ];
  const textGlows = [
    'text-blue-400 bg-blue-500/10 border-blue-500/20',
    'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
    'text-red-400 bg-red-500/10 border-red-500/20'
  ];
  const borderClass = borderColors[index % borderColors.length];
  const badgeClass = textGlows[index % textGlows.length];

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform: isHovered 
          ? `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) scale(1.03)`
          : `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`,
        transition: isHovered ? 'none' : 'transform 0.4s ease-out'
      }}
      className={`bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-6 shadow-xl transition-all duration-300 flex flex-col justify-between group ${borderClass} relative [transform-style:preserve-3d] cursor-pointer h-full`}
    >
      <div>
        {/* Header Tags */}
        <div className="flex justify-between items-center mb-4">
          <span className={`text-[10px] px-2.5 py-1 rounded-lg font-extrabold uppercase tracking-wider border ${badgeClass}`}>
            {project.category}
          </span>
          
          {/* Admin Actions */}
          {isEditor && (
            <div className="flex items-center space-x-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800" onClick={(e) => e.stopPropagation()}>
              <button 
                onClick={onEditClick}
                className="text-slate-400 hover:text-yellow-400 p-1 rounded transition-colors"
                title="Edit Projek"
              >
                <Edit2 className="h-3 w-3" />
              </button>
              <button 
                onClick={onDeleteClick}
                className="text-slate-400 hover:text-red-500 p-1 rounded transition-colors"
                title="Hapus Projek"
              >
                <Trash className="h-3 w-3" />
              </button>
            </div>
          )}
        </div>

        {/* Cover/Placeholder Image */}
        <div className="aspect-video w-full rounded-xl bg-slate-950 border border-slate-800/80 mb-4 overflow-hidden relative flex items-center justify-center">
          <div className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:scale-105 group-hover:opacity-60 transition-all duration-500 animate-fade-in" style={{ backgroundImage: `url(${project.imageUrl})` }}></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
          
          <div className="relative z-10 p-3 rounded-full bg-slate-900/80 border border-slate-800/80 text-yellow-400 shadow-md">
            <Code className="h-5 w-5" />
          </div>
        </div>

        {/* Title & Description */}
        <h3 className="text-base sm:text-lg font-black text-slate-100 group-hover:text-yellow-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-slate-400 text-xs mt-2 leading-relaxed line-clamp-3">
          {getCleanPreviewText(project.description)}
        </p>
      </div>

      {/* Technologies Badges */}
      <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-wrap gap-1.5">
        {project.tech.map((t) => (
          <span 
            key={t}
            className="bg-slate-950 text-slate-400 text-[9px] font-mono font-bold px-2.5 py-1 rounded border border-slate-800"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function ProjectMagang({ 
  projects, 
  isEditor, 
  onAddProject, 
  onEditProject, 
  onDeleteProject,
  whatsappNumber = '6281234567890'
}: ProjectMagangProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingProj, setEditingProj] = useState<Project | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Form State
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [category, setCategory] = useState('Web Development');
  const [techInput, setTechInput] = useState('');

  // Handle active slide index if count of projects changes
  useEffect(() => {
    if (currentIndex >= projects.length) {
      setCurrentIndex(0);
    }
  }, [projects.length, currentIndex]);

  const handleOpenAdd = () => {
    setEditingProj(null);
    setTitle('');
    setDesc('');
    setImageUrl('');
    setGithubUrl('');
    setLiveUrl('');
    setCategory('Web Development');
    setTechInput('');
    setShowForm(true);
  };

  const handleOpenEdit = (p: Project) => {
    setEditingProj(p);
    setTitle(p.title);
    setDesc(p.description);
    setImageUrl(p.imageUrl);
    setGithubUrl(p.githubUrl || '');
    setLiveUrl(p.liveUrl || '');
    setCategory(p.category);
    setTechInput(p.tech.join(', '));
    setShowForm(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !desc) return;

    const techArray = techInput.split(',').map(t => t.trim()).filter(t => t !== '');
    const fallbackImages = [
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=600&q=80'
    ];
    const imageToUse = imageUrl || fallbackImages[Math.floor(Math.random() * fallbackImages.length)];

    const compiledProject: Project = {
      id: editingProj ? editingProj.id : 'user-proj-' + Date.now(),
      title,
      description: desc,
      imageUrl: imageToUse,
      githubUrl,
      liveUrl: liveUrl || undefined,
      category,
      tech: techArray.length > 0 ? techArray : ['Web']
    };

    if (editingProj && onEditProject) {
      onEditProject(compiledProject);
    } else if (onAddProject) {
      onAddProject(compiledProject);
    }

    setShowForm(false);
  };

  const handleNextSlide = () => {
    if (projects.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrevSlide = () => {
    if (projects.length <= 1) return;
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  // Get displayed projects in the carousel viewport (up to 3 items)
  const getVisibleProjects = () => {
    if (projects.length === 0) return [];
    if (projects.length === 1) return projects;
    
    // Always return up to 3 items in a looped/rotated order!
    const count = Math.min(3, projects.length);
    const visible = [];
    for (let i = 0; i < count; i++) {
      const idx = (currentIndex + i) % projects.length;
      visible.push(projects[idx]);
    }
    return visible;
  };

  const visibleProjects = getVisibleProjects();

  return (
    <div id="projects-section" className="space-y-8">
      
      {/* Editor Controls for Project */}
      {isEditor && (
        <div className="flex justify-end pb-2">
          <button
            onClick={handleOpenAdd}
            className="flex items-center space-x-1.5 px-4 py-2 bg-gradient-to-r from-red-600 to-yellow-500 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-transform hover:scale-105"
          >
            <Plus className="h-4 w-4" />
            <span>Tambah Projek Baru</span>
          </button>
        </div>
      )}

      {/* Project Form Modal / Drawer */}
      {showForm && (
        <form onSubmit={handleFormSubmit} className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h4 className="font-extrabold text-xs uppercase tracking-widest text-slate-100">
              {editingProj ? 'Edit Informasi Projek' : 'Tambah Projek Baru'}
            </h4>
            <button 
              type="button" 
              onClick={() => setShowForm(false)}
              className="text-slate-400 hover:text-slate-200 text-xs"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-mono text-slate-500 uppercase">Nama Projek</label>
              <input 
                type="text" 
                required 
                placeholder="Contoh: Balinese RPG Game"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 focus:outline-none focus:border-yellow-400"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono text-slate-500 uppercase">Kategori</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-300 focus:outline-none focus:border-yellow-400"
              >
                <option value="Web Development">Web Development</option>
                <option value="Game Development">Game Development</option>
                <option value="Immersive Technology">Immersive Technology</option>
                <option value="Server System">Server System</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-mono text-slate-500 uppercase">Deskripsi Lengkap Projek</label>
            <textarea 
              required 
              rows={4}
              placeholder="Jelaskan detail isi projek, fitur, teknologi, serta arsitektur yang digunakan..."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 focus:outline-none focus:border-yellow-400"
            ></textarea>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-mono text-slate-500 uppercase">URL Gambar / Cover Tautan</label>
              <input 
                type="url" 
                placeholder="https://images.unsplash.com/..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 focus:outline-none focus:border-yellow-400"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono text-slate-500 uppercase">Daftar Teknologi (Pisahkan koma)</label>
              <input 
                type="text" 
                placeholder="Unity, Unreal, WebXR, React"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 focus:outline-none focus:border-yellow-400"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-mono text-slate-500 uppercase">GitHub Repository URL</label>
              <input 
                type="url" 
                placeholder="https://github.com/gedebramanda/..."
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 focus:outline-none focus:border-yellow-400"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono text-slate-500 uppercase">Live Demo Link (Opsional)</label>
              <input 
                type="url" 
                placeholder="https://mygame-demo.com"
                value={liveUrl}
                onChange={(e) => setLiveUrl(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 focus:outline-none focus:border-yellow-400"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-2 border-t border-slate-800">
            <button 
              type="button" 
              onClick={() => setShowForm(false)}
              className="px-3.5 py-2 bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-400 rounded-xl text-xs font-bold"
            >
              Batal
            </button>
            <button 
              type="submit" 
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl text-xs font-bold shadow-lg"
            >
              Simpan Projek
            </button>
          </div>
        </form>
      )}

      {/* Cards View with Horizontal Slider if projects count > 1 */}
      <div className="relative">
        
        {projects.length > 1 && (
          <div className="absolute top-1/2 -translate-y-1/2 -left-4 sm:-left-6 z-20">
            <button 
              onClick={handlePrevSlide}
              className="p-3 bg-slate-950 hover:bg-slate-900 text-slate-300 hover:text-yellow-400 rounded-full border border-slate-800 hover:border-yellow-400/50 shadow-2xl transition-all duration-200"
              title="Geser Kiri"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleProjects.map((project, idx) => (
            <div key={project.id} className="h-full">
              <InteractiveProjectCard 
                project={project}
                index={idx + currentIndex}
                isEditor={isEditor}
                onEditClick={() => handleOpenEdit(project)}
                onDeleteClick={() => {
                  if (confirm('Hapus projek ini?')) {
                    if (onDeleteProject) onDeleteProject(project.id);
                  }
                }}
                onClick={() => setSelectedProject(project)}
              />
            </div>
          ))}
        </div>

        {projects.length > 1 && (
          <div className="absolute top-1/2 -translate-y-1/2 -right-4 sm:-right-6 z-20">
            <button 
              onClick={handleNextSlide}
              className="p-3 bg-slate-950 hover:bg-slate-900 text-slate-300 hover:text-yellow-400 rounded-full border border-slate-800 hover:border-yellow-400/50 shadow-2xl transition-all duration-200"
              title="Geser Kanan"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>

      {/* Pagination indicators for slider if > 1 */}
      {projects.length > 1 && (
        <div className="flex justify-center space-x-1.5 pt-4">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${i === currentIndex ? 'w-5 bg-yellow-400' : 'w-2 bg-slate-800 hover:bg-slate-600'}`}
              title={`Slide ke ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-6xl text-slate-100 shadow-2xl relative max-h-[92vh] flex flex-col overflow-hidden"
            >
              {/* Top Bar / Header with title & close button */}
              <div className="flex justify-between items-center px-6 py-4 bg-slate-950/60 border-b border-slate-850 z-10 shrink-0">
                <div className="flex items-center space-x-3">
                  <span className="text-xs px-2.5 py-1 bg-yellow-400/10 text-yellow-400 font-black uppercase tracking-wider rounded-lg border border-yellow-400/20">
                    {selectedProject.category}
                  </span>
                  <h3 className="text-sm font-black text-slate-100 tracking-tight truncate max-w-[200px] sm:max-w-md">
                    {selectedProject.title}
                  </h3>
                </div>
                {/* Close Button */}
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="bg-slate-950 hover:bg-slate-850 p-2 rounded-full text-slate-400 hover:text-slate-200 transition-colors border border-slate-850 flex items-center justify-center"
                  title="Tutup (Esc)"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Scrollable Columns Panel */}
              <div className="overflow-y-auto p-6 md:p-8 flex-grow grid grid-cols-1 lg:grid-cols-12 gap-8 scrollbar-thin">
                
                {/* Left Column (Meta & Actions) - Span 5 */}
                <div className="lg:col-span-5 space-y-6">
                  {/* Large Cover Image */}
                  <div className="w-full h-48 sm:h-64 rounded-2xl overflow-hidden border border-slate-800 relative shadow-inner shrink-0 group">
                    <img 
                      src={selectedProject.imageUrl} 
                      alt={selectedProject.title} 
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                  </div>

                  {/* Summary Details */}
                  <div className="space-y-4">
                    <div className="border-b border-slate-850 pb-2">
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block font-black">Informasi Projek</span>
                    </div>
                    <h1 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight leading-snug">
                      {selectedProject.title}
                    </h1>
                    
                    {/* Technology tags */}
                    <div className="space-y-2">
                      <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block font-bold">Teknologi & Tools</span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedProject.tech.map((t) => (
                          <span 
                            key={t}
                            className="bg-slate-950 text-slate-400 text-[10px] font-mono font-bold px-2.5 py-1.5 rounded-lg border border-slate-850"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons Stacks */}
                  <div className="space-y-2.5 pt-4 border-t border-slate-850">
                    <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block font-bold mb-1">Aksi & Kontak</span>
                    <div className="flex flex-col gap-2.5">
                      {selectedProject.liveUrl && (
                        <a 
                          href={selectedProject.liveUrl} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="w-full py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-slate-950 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 transition-all hover:scale-[1.01] shadow-lg shadow-yellow-500/5"
                        >
                          <span>Buka Live Link</span>
                        </a>
                      )}
                      {selectedProject.githubUrl && (
                        <a 
                          href={selectedProject.githubUrl} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="w-full py-3 bg-slate-950 hover:bg-slate-850 text-slate-200 border border-slate-800 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 transition-all hover:scale-[1.01]"
                        >
                          <Github className="h-4 w-4 text-blue-400" />
                          <span>Situs Github</span>
                        </a>
                      )}
                      {/* Whatsapp Hubungi Gede */}
                      <a 
                        href={`https://wa.me/${whatsappNumber}`}
                        target="_blank" 
                        rel="noreferrer" 
                        className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold text-xs flex items-center justify-center space-x-2 transition-all hover:scale-[1.01]"
                      >
                        <svg className="h-4 w-4 fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.413 9.863-9.83.001-2.624-1.023-5.091-2.884-6.957C16.59 1.96 14.117.935 11.997.935c-5.442 0-9.866 4.415-9.87 9.832-.001 1.746.467 3.447 1.353 4.93L2.43 21.053l5.503-1.443L6.647 19.154z"/>
                        </svg>
                        <span>Hubungi via WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Right Column (Complete Documentation) - Span 7 */}
                <div className="lg:col-span-7 space-y-4 text-left">
                  <div className="border-b border-slate-850 pb-2">
                    <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest font-black">Dokumentasi Lengkap Projek</span>
                  </div>
                  
                  {/* Rich HTML Content or Text */}
                  {isHTML(selectedProject.description) ? (
                    <div 
                      className="text-slate-300 text-sm leading-relaxed p-6 sm:p-8 bg-slate-950/60 rounded-2xl border border-slate-850 overflow-x-auto text-left space-y-5 [&_hr]:border-slate-800/80 [&_hr]:my-6 [&_table]:border-collapse [&_table]:w-full [&_table]:my-6 [&_th]:border-b [&_th]:border-slate-800 [&_th]:p-3 [&_th]:text-slate-200 [&_th]:font-bold [&_th]:bg-slate-900/40 [&_td]:border-b [&_td]:border-slate-900 [&_td]:p-3 [&_td]:text-slate-300 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_li]:text-slate-300 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-slate-100 [&_h2]:mt-8 [&_h2]:mb-4 [&_h2]:border-l-4 [&_h2]:border-yellow-400 [&_h2]:pl-3 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-slate-100 [&_h3]:mt-6 [&_h3]:mb-3 [&_h4]:text-base [&_h4]:font-bold [&_h4]:text-slate-100 [&_p]:leading-relaxed [&_p]:text-slate-300 [&_a]:text-blue-400 [&_a]:hover:underline"
                      dangerouslySetInnerHTML={{ __html: selectedProject.description }}
                    />
                  ) : (
                    <div className="text-slate-300 text-sm leading-relaxed whitespace-pre-line p-6 bg-slate-950/60 rounded-2xl border border-slate-850">
                      {selectedProject.description}
                    </div>
                  )}
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Info Notice card */}
      <div className="p-5 bg-gradient-to-r from-blue-900/10 via-red-950/15 to-yellow-500/10 border border-slate-800 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3 text-center sm:text-left">
          <div className="p-2.5 bg-yellow-400/10 text-yellow-400 rounded-xl">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-100 text-sm">Portofolio Projek Modular</h4>
            <p className="text-xs text-slate-400 mt-0.5">Seluruh karya dan projek dikembangkan dan dioptimalkan secara modular berbasis standar Web, Game, dan Immersive.</p>
          </div>
        </div>
        <a 
          href="https://github.com/gedebramanda" 
          target="_blank" 
          rel="noreferrer"
          className="px-4 py-2 bg-slate-950 border border-slate-800 hover:border-yellow-400 text-slate-300 hover:text-slate-100 rounded-xl text-xs font-bold transition-all shrink-0"
        >
          Lihat Profil GitHub
        </a>
      </div>
    </div>
  );
}
