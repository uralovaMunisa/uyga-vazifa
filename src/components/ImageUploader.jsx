import React, { useState, useRef, useEffect } from 'react';
import { 
  Camera, 
  UploadCloud, 
  X, 
  Sparkles, 
  Video, 
  CheckCircle2
} from 'lucide-react';
import { SAMPLE_HOMEWORK_IMAGES } from '../data/mockHomeworkData';
import { sounds } from '../services/audioService';
import { TRANSLATIONS } from '../data/translations';

export default function ImageUploader({
  imageSrc,
  onImageChange,
  onPresetSelect,
  selectedPresetId = null,
  language = 'uz',
}) {
  const t = TRANSLATIONS[language] || TRANSLATIONS.uz;
  const isUz = language === 'uz';

  const [isDragging, setIsDragging] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    return () => {
      stopCameraStream();
    };
  }, []);

  const stopCameraStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  const startCamera = async () => {
    sounds.playPop();
    setCameraError(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error(isUz ? 'Kamera qurilmangizda qo‘llab-quvvatlanmadi.' : 'Camera access is not supported by your browser.');
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: 'environment' }, width: { ideal: 1280 } }
      });
      streamRef.current = stream;
      setCameraActive(true);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }, 100);
    } catch (err) {
      console.warn('Camera access error:', err);
      setCameraError(err.message || (isUz ? 'Kameraga ulanib bo‘lmadi. Ruxsatni tekshiring.' : 'Could not access camera.'));
      setCameraActive(false);
    }
  };

  const capturePhoto = () => {
    sounds.playVictory();
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
    
    stopCameraStream();
    onImageChange(dataUrl, null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    sounds.playPop();
    if (!file.type.startsWith('image/')) {
      alert(isUz ? 'Iltimos, rasm faylini yuklang (PNG, JPG yoki SVG).' : 'Please upload an image file.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      onImageChange(uploadEvent.target.result, null);
    };
    reader.readAsDataURL(file);
  };

  const handleSelectSample = (sample) => {
    sounds.playPop();
    onPresetSelect(sample);
  };

  const handleRemoveImage = () => {
    sounds.playPop();
    stopCameraStream();
    onImageChange(null, null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-4">
      
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInput}
        className="hidden"
      />

      {/* Main Upload / Camera View Area */}
      {!imageSrc && !cameraActive && (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative border-3 border-dashed rounded-3xl p-6 sm:p-8 text-center transition-all duration-200 ${
            isDragging
              ? 'border-sky-500 bg-sky-50/80 scale-[1.01]'
              : 'border-sky-200 bg-sky-50/30 hover:bg-sky-50/60 hover:border-sky-400'
          }`}
        >
          {/* Animated decorative camera icon */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 rounded-3xl bg-gradient-to-tr from-sky-400 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-sky-200 animate-float-y">
            <Camera className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>

          <h3 className="font-bubble text-lg sm:text-xl font-bold text-slate-800 mb-1">
            {t.imageUploader.dropTitle}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mb-5">
            {t.imageUploader.dropDesc}
          </p>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={startCamera}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bubble text-sm font-bold shadow-md shadow-emerald-200 active:scale-95 transition-all"
            >
              <Video className="w-4 h-4" />
              <span>{t.imageUploader.openCamera}</span>
            </button>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 font-bubble text-sm font-bold border-2 border-slate-200 hover:border-sky-300 shadow-2xs active:scale-95 transition-all"
            >
              <UploadCloud className="w-4 h-4 text-sky-500" />
              <span>{t.imageUploader.uploadPhoto}</span>
            </button>
          </div>

          {cameraError && (
            <p className="mt-4 text-xs text-rose-600 bg-rose-50 border border-rose-200 rounded-xl p-2 max-w-sm mx-auto">
              {cameraError}
            </p>
          )}
        </div>
      )}

      {/* Live Camera Viewfinder */}
      {cameraActive && (
        <div className="relative rounded-3xl overflow-hidden bg-slate-900 border-4 border-emerald-400 shadow-xl max-w-lg mx-auto">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-72 sm:h-80 object-cover"
          />

          <div className="absolute inset-4 border-2 border-dashed border-white/60 rounded-2xl pointer-events-none flex items-center justify-center">
            <span className="bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full font-semibold">
              {t.imageUploader.cameraGuide}
            </span>
          </div>

          <div className="absolute bottom-4 inset-x-0 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={stopCameraStream}
              className="px-4 py-2 rounded-2xl bg-slate-800/80 text-white font-semibold text-xs hover:bg-slate-700 backdrop-blur-sm"
            >
              {t.imageUploader.cancelCamera}
            </button>

            <button
              type="button"
              onClick={capturePhoto}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bubble text-base font-bold shadow-lg shadow-emerald-900/50 active:scale-95 transition-all"
            >
              <Camera className="w-5 h-5" />
              <span>{t.imageUploader.snapPhoto}</span>
            </button>
          </div>
        </div>
      )}

      {/* Uploaded / Selected Image Preview */}
      {imageSrc && !cameraActive && (
        <div className="relative bg-white p-3 sm:p-4 rounded-3xl border-2 border-sky-300 shadow-md">
          <div className="relative rounded-2xl overflow-hidden bg-slate-100 max-h-80 flex items-center justify-center border border-slate-200">
            <img
              src={imageSrc}
              alt="Homework Preview"
              className="w-full h-auto max-h-72 object-contain"
            />

            <button
              type="button"
              onClick={handleRemoveImage}
              title="Remove image"
              className="absolute top-3 right-3 p-2 bg-rose-500 hover:bg-rose-600 text-white rounded-full shadow-lg transition-transform hover:scale-110 active:scale-95"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full border border-sky-200 text-xs font-bold text-sky-800 flex items-center gap-1.5 shadow-2xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>{t.imageUploader.readyBadge}</span>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <p className="text-xs text-slate-500 font-medium">
              {t.imageUploader.readyText}
            </p>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-xs font-bold text-sky-600 hover:text-sky-700 underline"
            >
              {t.imageUploader.changeImage}
            </button>
          </div>
        </div>
      )}

      {/* Preset Homework Sample Photos (Great for instant testing!) */}
      <div className="bg-white/90 p-4 rounded-3xl border border-sky-100 shadow-2xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>{t.imageUploader.demoTitle}</span>
          </div>
          <span className="text-[11px] text-slate-400 hidden sm:inline">{t.imageUploader.oneClickTest}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {SAMPLE_HOMEWORK_IMAGES.map((sample) => {
            const isSelected = selectedPresetId === sample.id;
            return (
              <button
                key={sample.id}
                type="button"
                onClick={() => handleSelectSample(sample)}
                className={`flex items-center gap-2.5 p-2.5 rounded-2xl border-2 text-left transition-all ${
                  isSelected
                    ? 'border-sky-500 bg-sky-50 shadow-2xs scale-[1.02]'
                    : 'border-slate-200 bg-white hover:border-sky-300 hover:bg-slate-50'
                }`}
              >
                <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100 border border-slate-200">
                  <img
                    src={sample.thumbnail}
                    alt={sample.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bubble font-bold text-slate-800 truncate">
                      {isUz ? sample.title : sample.titleEn}
                    </span>
                  </div>
                  <p className="text-[10px] text-sky-600 font-semibold truncate">
                    {isUz ? sample.badge : sample.badgeEn}
                  </p>
                  <p className="text-[10px] text-slate-400 truncate">
                    {sample.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}
