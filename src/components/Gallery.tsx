import React, { useState, useRef, useEffect } from 'react';
import { LayoutGrid, AlertCircle, Plus, Upload, Trash2, Edit3, Calendar, Sparkles, X, ImageIcon, Loader2 } from 'lucide-react';
import { GalleryItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface GalleryProps {
  galleryItems: GalleryItem[];
  isEditor?: boolean;
  onUploadImage?: (newItem: GalleryItem) => void;
  onEditImage?: (updatedItem: GalleryItem) => void;
  onDeleteImage?: (id: string) => void;
}

export default function Gallery({ 
  galleryItems, 
  isEditor = false, 
  onUploadImage, 
  onEditImage, 
  onDeleteImage 
}: GalleryProps) {
  // Upload & Form state
  const [showAddForm, setShowAddForm] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Kegiatan');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [imageUrl, setImageUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  // Editing state
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editDate, setEditDate] = useState('');
  const [editImageUrl, setEditImageUrl] = useState('');
  const [isEditUploading, setIsEditUploading] = useState(false);

  // Lightbox view state
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  // Displayed items state (maximum 9, changes periodically/shuffles)
  const [displayedItems, setDisplayedItems] = useState<GalleryItem[]>([]);

  // Helper to shuffle array
  const shuffleArray = <T,>(array: T[]): T[] => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  // Sync displayed items immediately when galleryItems prop changes
  useEffect(() => {
    if (galleryItems.length <= 9) {
      setDisplayedItems(galleryItems);
    } else {
      // Initially show the first 9 items
      setDisplayedItems(galleryItems.slice(0, 9));
    }
  }, [galleryItems]);

  // Periodic rotation and position shuffle (every 60 seconds)
  useEffect(() => {
    const rotateAndShuffle = () => {
      if (galleryItems.length === 0) return;
      
      setDisplayedItems(() => {
        if (galleryItems.length <= 9) {
          // If <= 9 items, just shuffle their grid locations (order)
          return shuffleArray(galleryItems);
        } else {
          // If > 9 items, pick 9 random items from the whole pool to display in random turns
          const shuffledPool = shuffleArray(galleryItems);
          return shuffledPool.slice(0, 9);
        }
      });
    };

    // Shuffle / rotate every 60 seconds (1 minute)
    const interval = setInterval(rotateAndShuffle, 60000);
    return () => clearInterval(interval);
  }, [galleryItems]);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedItem(null);
      }
    };
    if (selectedItem) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedItem]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);

  // File Upload Handler (Base64 -> Server /api/upload)
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, isForEdit = false) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (e.g., max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('Ukuran file terlalu besar! Maksimum 10MB.');
      return;
    }

    if (isForEdit) {
      setIsEditUploading(true);
    } else {
      setIsUploading(true);
      setUploadError('');
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        const base64String = reader.result as string;
        const response = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ filename: file.name, base64: base64String })
        });

        if (!response.ok) {
          throw new Error('Upload gagal di server');
        }

        const data = await response.json();
        if (data.url) {
          if (isForEdit) {
            setEditImageUrl(data.url);
          } else {
            setImageUrl(data.url);
          }
        } else {
          throw new Error('Server tidak mengembalikan URL gambar');
        }
      } catch (err: any) {
        console.error(err);
        if (!isForEdit) {
          setUploadError('Gagal mengunggah gambar: ' + err.message);
        } else {
          alert('Gagal mengunggah gambar edit');
        }
      } finally {
        if (isForEdit) {
          setIsEditUploading(false);
        } else {
          setIsUploading(false);
        }
      }
    };

    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && fileInputRef.current) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      fileInputRef.current.files = dataTransfer.files;
      // Trigger onChange programmatically
      const event = { target: fileInputRef.current } as React.ChangeEvent<HTMLInputElement>;
      handleFileChange(event);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl) {
      setUploadError('Anda harus memilih/mengunggah foto terlebih dahulu!');
      return;
    }
    if (!title.trim() || !description.trim()) {
      setUploadError('Judul dan deskripsi foto wajib diisi.');
      return;
    }

    if (onUploadImage) {
      onUploadImage({
        id: `gal-${Date.now()}`,
        title,
        category,
        imageUrl,
        description,
        date
      });

      // Reset form
      setTitle('');
      setCategory('Kegiatan');
      setDescription('');
      setDate(new Date().toISOString().split('T')[0]);
      setImageUrl('');
      setShowAddForm(false);
      setUploadError('');
    }
  };

  const handleStartEdit = (item: GalleryItem) => {
    setEditingItemId(item.id);
    setEditTitle(item.title);
    setEditCategory(item.category);
    setEditDescription(item.description);
    setEditDate(item.date);
    setEditImageUrl(item.imageUrl);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editTitle.trim() || !editDescription.trim() || !editImageUrl) {
      alert('Judul, deskripsi, dan gambar wajib diisi.');
      return;
    }

    if (onEditImage && editingItemId) {
      onEditImage({
        id: editingItemId,
        title: editTitle,
        category: editCategory,
        imageUrl: editImageUrl,
        description: editDescription,
        date: editDate
      });
      setEditingItemId(null);
    }
  };

  return (
    <div id="gallery-container" className="space-y-6">
      
      {/* Editor Controls Header inside tab */}
      {isEditor && (
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center space-x-2 transition-transform hover:scale-[1.02] shadow-md shadow-blue-950/40"
          >
            {showAddForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            <span>{showAddForm ? 'Batalkan Unggah' : 'Unggah Foto Baru'}</span>
          </button>
        </div>
      )}

      {/* Add Image Form Section */}
      <AnimatePresence>
        {showAddForm && isEditor && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden bg-slate-900/80 border border-blue-950 rounded-2xl p-5 mb-6 space-y-4 shadow-xl"
          >
            <div className="flex items-center space-x-2 border-b border-slate-800 pb-3 mb-2">
              <Sparkles className="h-4 w-4 text-yellow-400" />
              <h3 className="text-xs font-black text-slate-100 uppercase tracking-widest">Form Unggah Dokumentasi Galeri</h3>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Drag & Drop Upload Zone */}
              <div className="space-y-2 flex flex-col justify-between">
                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">File Foto Dokumentasi</label>
                
                <div 
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1 min-h-[160px] border-2 border-dashed border-slate-800 hover:border-blue-500 bg-slate-950 rounded-xl flex flex-col items-center justify-center p-4 cursor-pointer transition-colors relative group"
                >
                  <input 
                    type="file"
                    ref={fileInputRef}
                    onChange={(e) => handleFileChange(e, false)}
                    accept="image/*"
                    className="hidden"
                  />

                  {isUploading ? (
                    <div className="flex flex-col items-center space-y-2 text-blue-400">
                      <Loader2 className="h-8 w-8 animate-spin" />
                      <span className="text-xs font-bold font-mono">Sedang mengunggah...</span>
                    </div>
                  ) : imageUrl ? (
                    <div className="absolute inset-0 p-2">
                      <img 
                        src={imageUrl} 
                        alt="Preview" 
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                        <Upload className="h-6 w-6 text-white" />
                        <span className="text-[10px] font-mono text-white ml-2">Ganti Gambar</span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center space-y-2">
                      <div className="p-3 bg-slate-900 rounded-full inline-block group-hover:bg-blue-500/10 transition-colors">
                        <ImageIcon className="h-6 w-6 text-slate-400 group-hover:text-blue-400" />
                      </div>
                      <p className="text-xs font-bold text-slate-300">Klik atau seret foto ke sini</p>
                      <p className="text-[9px] font-mono text-slate-500">Mendukung JPEG, PNG, WEBP (Max 10MB)</p>
                    </div>
                  )}
                </div>

                {uploadError && (
                  <p className="text-[10px] font-mono text-red-400 bg-red-950/20 border border-red-900/30 p-2 rounded-lg">{uploadError}</p>
                )}
              </div>

              {/* Text Fields */}
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Judul Kegiatan / Foto</label>
                  <input 
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Contoh: Diskusi Perancangan Server"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Kategori</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                    >
                      <option value="Kegiatan">Kegiatan</option>
                      <option value="Infrastruktur">Infrastruktur</option>
                      <option value="Undiksha">Undiksha</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Tanggal</label>
                    <input 
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Deskripsi Singkat</label>
                  <textarea 
                    required
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Tuliskan latar belakang foto dan kegiatannya secara mendetail..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-md shadow-blue-950/50 transition-all hover:translate-y-[-1px]"
                >
                  Simpan Foto ke Galeri
                </button>
              </div>

            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dynamic Rotation & Shuffling Status Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/30 border border-slate-850 p-4 rounded-2xl">
        <div className="flex items-center space-x-2">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </div>
          <span className="text-xs font-bold text-slate-300">
            Sistem Galeri Rotasi Otomatis
          </span>
        </div>
        <div className="text-[10px] font-mono text-slate-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-900">
          Menampilkan <span className="text-blue-400 font-bold">{displayedItems.length}</span> dari <span className="text-slate-200 font-bold">{galleryItems.length}</span> Foto • Lokasi & Pilihan Acak Setiap 60 Detik
        </div>
      </div>

      {/* Main 3x3 Grid forms a square shape */}
      <div 
        id="gallery-3x3-grid" 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full mx-auto"
      >
        {displayedItems.map((item, index) => {
          const isEditingThis = editingItemId === item.id;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              onClick={() => {
                if (!isEditingThis) {
                  setSelectedItem(item);
                }
              }}
              className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 group aspect-square shadow-xl flex flex-col justify-end cursor-pointer transition-shadow hover:shadow-2xl hover:border-slate-700"
            >
              {isEditingThis ? (
                /* Edit Mode Inner Panel */
                <form 
                  onSubmit={handleSaveEdit} 
                  onClick={(e) => e.stopPropagation()} 
                  className="absolute inset-0 bg-slate-950 p-4 flex flex-col justify-between overflow-y-auto z-20"
                >
                  <div className="space-y-2 text-left">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-1.5 mb-1.5">
                      <span className="text-[9px] font-mono text-blue-400 uppercase tracking-wider font-bold">Edit Detail Gambar</span>
                      <button type="button" onClick={() => setEditingItemId(null)} className="text-slate-400 hover:text-white">
                        <X className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="space-y-1">
                      <input 
                        type="text" 
                        required
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-850 p-1.5 rounded-lg text-[11px] text-slate-100"
                        placeholder="Judul"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <select
                        value={editCategory}
                        onChange={(e) => setEditCategory(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-850 p-1.5 rounded-lg text-[10px] text-slate-100"
                      >
                        <option value="Kegiatan">Kegiatan</option>
                        <option value="Infrastruktur">Infrastruktur</option>
                        <option value="Undiksha">Undiksha</option>
                      </select>
                      <input 
                        type="date"
                        required
                        value={editDate}
                        onChange={(e) => setEditDate(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-850 p-1.5 rounded-lg text-[10px] text-slate-100"
                      />
                    </div>

                    <div>
                      <textarea
                        required
                        rows={2}
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-850 p-1.5 rounded-lg text-[10px] text-slate-200"
                        placeholder="Deskripsi"
                      ></textarea>
                    </div>

                    {/* Change image option inside edit */}
                    <div className="flex items-center justify-between bg-slate-900 p-1.5 rounded-lg border border-slate-850">
                      <span className="text-[8px] font-mono text-slate-500 truncate max-w-[120px]">{editImageUrl || 'Tidak ada file'}</span>
                      <button 
                        type="button" 
                        onClick={() => editFileInputRef.current?.click()}
                        className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded text-[8px] font-bold"
                      >
                        {isEditUploading ? 'Unggah...' : 'Ganti Foto'}
                      </button>
                      <input 
                        type="file"
                        ref={editFileInputRef}
                        onChange={(e) => handleFileChange(e, true)}
                        accept="image/*"
                        className="hidden"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-black text-[10px] uppercase tracking-wider rounded-lg"
                  >
                    Simpan Perubahan
                  </button>
                </form>
              ) : (
                /* Regular View Mode with hover overlays */
                <>
                  <img 
                    src={item.imageUrl} 
                    alt={item.title}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 pointer-events-none"
                  />
                  
                  {/* Elegant overlay card details */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 z-10">
                    <span className="text-[9px] font-mono font-bold text-yellow-400 uppercase tracking-widest block">{item.category}</span>
                    <h4 className="text-xs font-black text-slate-100 leading-tight block mt-1">{item.title}</h4>
                    <p className="text-[10px] text-slate-300 mt-1 line-clamp-2 leading-relaxed">{item.description}</p>
                    <span className="text-[9px] font-mono text-slate-500 mt-1.5">{item.date}</span>
                  </div>

                  {/* Editor Quick Action Badges */}
                  {isEditor && (
                    <div className="absolute top-3 right-3 flex items-center space-x-1.5 z-25 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStartEdit(item);
                        }}
                        title="Edit Detail Foto"
                        className="p-2 bg-slate-950/90 hover:bg-slate-900 text-blue-400 hover:text-blue-300 border border-slate-800 rounded-lg backdrop-blur-sm transition-transform hover:scale-105"
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm(`Hapus foto "${item.title}" dari galeri secara permanen?`)) {
                            onDeleteImage?.(item.id);
                          }
                        }}
                        title="Hapus Foto"
                        className="p-2 bg-slate-950/90 hover:bg-red-950/90 text-red-400 hover:text-red-300 border border-slate-800 rounded-lg backdrop-blur-sm transition-transform hover:scale-105"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  )}
                </>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Lightbox / Modal View Mode for Detailed Full-screen view */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6 md:p-8"
            onClick={() => setSelectedItem(null)}
          >
            {/* Exit/Close Button in Top Right of the Screen */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 p-3 bg-slate-950/80 border border-slate-800 hover:border-red-500/50 text-slate-300 hover:text-red-400 rounded-full transition-all duration-200 shadow-xl backdrop-blur-sm z-[60] flex items-center justify-center group"
              title="Tutup (Esc)"
            >
              <X className="h-5 w-5 transform group-hover:rotate-90 transition-transform" />
            </button>

            {/* Modal Card Box */}
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden max-w-7xl w-full max-h-[92vh] flex flex-col md:flex-row shadow-2xl relative z-55"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking card
            >
              {/* Left Column: Full/Large Image */}
              <div className="w-full md:w-2/3 bg-black/40 flex items-center justify-center relative p-2 min-h-[250px] md:min-h-[500px]">
                <img
                  src={selectedItem.imageUrl}
                  alt={selectedItem.title}
                  referrerPolicy="no-referrer"
                  className="max-h-[55vh] md:max-h-[82vh] w-full object-contain rounded-2xl select-none"
                />
              </div>

              {/* Right Column: Detailed Info */}
              <div className="w-full md:w-1/3 p-6 sm:p-8 flex flex-col justify-between border-t md:border-t-0 md:border-l border-slate-800 bg-slate-950/40">
                <div className="space-y-4">
                  {/* Category badge */}
                  <div>
                    <span className="inline-block px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-xl text-[10px] font-black uppercase tracking-widest">
                      {selectedItem.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-black text-slate-100 leading-snug tracking-tight">
                    {selectedItem.title}
                  </h3>

                  {/* Date badge */}
                  <div className="flex items-center space-x-1.5 text-slate-500">
                    <Calendar className="h-3.5 w-3.5" />
                    <span className="font-mono text-xs">{selectedItem.date}</span>
                  </div>

                  {/* Description */}
                  <div className="border-t border-slate-900/60 pt-4 mt-2">
                    <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line font-normal">
                      {selectedItem.description}
                    </p>
                  </div>
                </div>

                {/* Footer close option */}
                <div className="pt-6 mt-6 border-t border-slate-900 flex justify-end">
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="px-5 py-2.5 bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-white border border-slate-800 rounded-xl text-xs font-bold transition-all"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
