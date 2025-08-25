'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useNotification } from '@/context/NotificationContext';
import { 
  Camera, 
  X, 
  RotateCcw, 
  Download, 
  Upload,
  ScanLine,
  MapPin,
  Heart,
  Share2,
  Filter,
  Sparkles
} from 'lucide-react';

interface MobileCameraIntegrationProps {
  mode?: 'profile' | 'event' | 'qr-scanner' | 'business' | 'cultural';
  onCapture?: (imageData: string) => void;
  onQRScan?: (data: string) => void;
  onClose?: () => void;
  className?: string;
}

interface QRScanResult {
  type: 'business' | 'event' | 'profile' | 'cultural-site' | 'menu';
  data: any;
}

// Lusophone cultural photo filters
const PORTUGUESE_FILTERS = [
  { id: 'none', name: 'Original', namePortuguese: 'Original' },
  { id: 'fado', name: 'Fado Night', namePortuguese: 'Noite de Fado', filter: 'sepia(0.3) contrast(1.2)' },
  { id: 'azulejos', name: 'Azulejos', namePortuguese: 'Azulejos', filter: 'hue-rotate(200deg) saturate(1.5)' },
  { id: 'porto', name: 'Porto Wine', namePortuguese: 'Vinho do Porto', filter: 'contrast(1.3) brightness(0.9) hue-rotate(10deg)' },
  { id: 'sunshine', name: 'Lusophone Sun', namePortuguese: 'Sol Português', filter: 'brightness(1.2) saturate(1.3) contrast(1.1)' },
  { id: 'heritage', name: 'Heritage', namePortuguese: 'Património', filter: 'sepia(0.2) contrast(1.1) brightness(1.1)' }
];

export default function MobileCameraIntegration({
  mode = 'profile',
  onCapture,
  onQRScan,
  onClose,
  className = ''
}: MobileCameraIntegrationProps) {
  const { language, t } = useLanguage();
  const { addNotification } = useNotification();

  // Camera states
  const [isActive, setIsActive] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('none');
  
  // QR Scanner states
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<QRScanResult | null>(null);
  
  // Refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const qrScannerRef = useRef<any>(null);
  
  // Photo compression settings for Lusophone cultural content
  const compressionSettings = {
    profile: { quality: 0.8, maxWidth: 800, maxHeight: 800 },
    event: { quality: 0.9, maxWidth: 1200, maxHeight: 1200 },
    business: { quality: 0.85, maxWidth: 1000, maxHeight: 1000 },
    cultural: { quality: 0.95, maxWidth: 1600, maxHeight: 1600 }
  };

  useEffect(() => {
    if (isActive) {
      initializeCamera();
    } else {
      cleanup();
    }

    return () => cleanup();
  }, [isActive, facingMode]);

  useEffect(() => {
    if (mode === 'qr-scanner' && isActive && isScanning) {
      initializeQRScanner();
    }

    return () => {
      if (qrScannerRef.current) {
        qrScannerRef.current.stop();
      }
    };
  }, [mode, isActive, isScanning]);

  const initializeCamera = async () => {
    try {
      // Check if camera is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera not supported');
      }

      const constraints = {
        video: {
          facingMode,
          width: { ideal: 1920, max: 1920 },
          height: { ideal: 1080, max: 1080 }
        },
        audio: false
      };

      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(mediaStream);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play();
      }

      console.log('[Camera] Initialized successfully');
    } catch (error) {
      console.error('[Camera] Initialization failed:', error);
      addNotification({
        id: 'camera-error',
        type: 'error',
        title: language === 'pt' ? 'Erro da Câmara' : 'Camera Error',
        message: language === 'pt' 
          ? 'Não foi possível aceder à câmara' 
          : 'Could not access camera',
        duration: 5000
      });
    }
  };

  const initializeQRScanner = async () => {
    try {
      if (typeof window === 'undefined') return;
      const { Html5QrcodeScanner } = await import('html5-qrcode');
      
      const scanner = new Html5QrcodeScanner(
        "qr-reader",
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0,
          showTorchButtonIfSupported: true,
          showZoomSliderIfSupported: true,
          defaultZoomValueIfSupported: 2
        },
        false
      );

      scanner.render(handleQRScanSuccess, handleQRScanError);
      qrScannerRef.current = scanner;

      console.log('[QR Scanner] Initialized successfully');
    } catch (error) {
      console.error('[QR Scanner] Initialization failed:', error);
      addNotification({
        id: 'qr-scanner-error',
        type: 'error',
        title: language === 'pt' ? 'Erro do Scanner QR' : 'QR Scanner Error',
        message: language === 'pt' 
          ? 'Não foi possível inicializar o scanner' 
          : 'Could not initialize QR scanner',
        duration: 5000
      });
    }
  };

  const handleQRScanSuccess = (decodedText: string) => {
    console.log('[QR Scanner] Scan successful:', decodedText);
    
    try {
      const result = parseQRCode(decodedText);
      setScanResult(result);
      
      if (onQRScan) {
        onQRScan(decodedText);
      }
      
      // Provide haptic feedback if supported
      if ('vibrate' in navigator) {
        navigator.vibrate([100, 30, 100]);
      }
      
      addNotification({
        id: 'qr-scan-success',
        type: 'success',
        title: language === 'pt' ? 'QR Code Encontrado!' : 'QR Code Found!',
        message: getQRResultMessage(result),
        duration: 5000
      });
      
    } catch (error) {
      console.error('[QR Scanner] Parse error:', error);
    }
  };

  const handleQRScanError = (error: string) => {
    // Ignore frequent scanning errors
    if (!error.includes('NotFoundException')) {
      console.log('[QR Scanner] Scan error:', error);
    }
  };

  const parseQRCode = (data: string): QRScanResult => {
    try {
      // Try parsing as JSON first
      const parsed = JSON.parse(data);
      
      if (parsed.type && parsed.data) {
        return parsed as QRScanResult;
      }
    } catch (e) {
      // Not JSON, try parsing as URL or text
    }
    
    // Parse URLs for Portuguese businesses/events
    if (data.startsWith('http')) {
      const url = new URL(data);
      
      if (url.hostname.includes('lusotown')) {
        if (url.pathname.includes('/business/')) {
          return { type: 'business', data: { url: data, id: url.pathname.split('/').pop() } };
        } else if (url.pathname.includes('/event/')) {
          return { type: 'event', data: { url: data, id: url.pathname.split('/').pop() } };
        }
      }
      
      return { type: 'business', data: { url: data, external: true } };
    }
    
    // Default to text
    return { type: 'business', data: { text: data } };
  };

  const getQRResultMessage = (result: QRScanResult): string => {
    switch (result.type) {
      case 'business':
        return language === 'pt' ? 'Negócio português encontrado' : 'Portuguese business found';
      case 'event':
        return language === 'pt' ? 'Evento cultural encontrado' : 'Cultural event found';
      case 'cultural-site':
        return language === 'pt' ? 'Local cultural encontrado' : 'Cultural site found';
      case 'menu':
        return language === 'pt' ? 'Menu de restaurante encontrado' : 'Restaurant menu found';
      default:
        return language === 'pt' ? 'QR Code processado' : 'QR Code processed';
    }
  };

  const capturePhoto = useCallback(async () => {
    if (!videoRef.current || !canvasRef.current) return;

    setIsProcessing(true);

    try {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      if (!context) throw new Error('Canvas context not available');

      // Set canvas size based on video dimensions
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Apply filter if selected
      const filter = PORTUGUESE_FILTERS.find(f => f.id === selectedFilter);
      if (filter && filter.filter) {
        context.filter = filter.filter;
      }

      // Draw the current video frame
      context.drawImage(video, 0, 0);

      // Get image data with compression
      const settings = compressionSettings[mode] || compressionSettings.profile;
      const imageData = canvas.toDataURL('image/jpeg', settings.quality);

      setCapturedImage(imageData);

      // Provide haptic feedback
      if ('vibrate' in navigator) {
        navigator.vibrate(50);
      }

      console.log('[Camera] Photo captured successfully');

      addNotification({
        id: 'photo-captured',
        type: 'success',
        title: language === 'pt' ? 'Foto Capturada!' : 'Photo Captured!',
        message: language === 'pt' 
          ? 'Foto pronta para a comunidade de falantes de português' 
          : 'Photo ready for Portuguese-speaking community',
        duration: 3000
      });

    } catch (error) {
      console.error('[Camera] Capture failed:', error);
      addNotification({
        id: 'capture-error',
        type: 'error',
        title: language === 'pt' ? 'Erro na Captura' : 'Capture Error',
        message: language === 'pt' 
          ? 'Não foi possível capturar a foto' 
          : 'Could not capture photo',
        duration: 5000
      });
    } finally {
      setIsProcessing(false);
    }
  }, [selectedFilter, mode, language]);

  const retakePhoto = () => {
    setCapturedImage(null);
    setSelectedFilter('none');
  };

  const savePhoto = async () => {
    if (!capturedImage) return;

    try {
      if (onCapture) {
        onCapture(capturedImage);
      }

      // For cultural events, add location if available
      if (mode === 'cultural' || mode === 'event') {
        await addLocationToPhoto();
      }

      addNotification({
        id: 'photo-saved',
        type: 'success',
        title: language === 'pt' ? 'Foto Guardada!' : 'Photo Saved!',
        message: language === 'pt' 
          ? 'Adicionada ao teu perfil português' 
          : 'Added to your Lusophone profile',
        duration: 3000
      });

      cleanup();
      if (onClose) onClose();

    } catch (error) {
      console.error('[Camera] Save failed:', error);
      addNotification({
        id: 'save-error',
        type: 'error',
        title: language === 'pt' ? 'Erro ao Guardar' : 'Save Error',
        message: language === 'pt' 
          ? 'Não foi possível guardar a foto' 
          : 'Could not save photo',
        duration: 5000
      });
    }
  };

  const addLocationToPhoto = async () => {
    if ('geolocation' in navigator) {
      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        console.log('[Camera] Location added to photo:', position.coords);
        
        // Send location data with photo for Lusophone cultural mapping
        // This would be sent to backend for cultural site identification
        
      } catch (error) {
        console.log('[Camera] Location not available:', error);
      }
    }
  };

  const switchCamera = () => {
    setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
  };

  const cleanup = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }

    if (qrScannerRef.current) {
      qrScannerRef.current.stop();
      qrScannerRef.current = null;
    }

    setIsScanning(false);
  };

  const startCamera = () => {
    setIsActive(true);
    if (mode === 'qr-scanner') {
      setIsScanning(true);
    }
  };

  const closeCamera = () => {
    cleanup();
    setIsActive(false);
    setCapturedImage(null);
    setScanResult(null);
    if (onClose) onClose();
  };

  const downloadImage = () => {
    if (!capturedImage) return;

    const link = document.createElement('a');
    link.download = `lusotown-${mode}-${new Date().getTime()}.jpg`;
    link.href = capturedImage;
    link.click();
  };

  const shareImage = async () => {
    if (!capturedImage || !navigator.share) return;

    try {
      // Convert data URL to blob
      const response = await fetch(capturedImage);
      const blob = await response.blob();
      const file = new File([blob], `lusotown-photo.jpg`, { type: 'image/jpeg' });

      await navigator.share({
        title: language === 'pt' ? 'Foto da LusoTown' : 'LusoTown Photo',
        text: language === 'pt' 
          ? 'Partilhado da comunidade de falantes de português em Londres' 
          : 'Shared from Portuguese-speaking community in London',
        files: [file]
      });

    } catch (error) {
      console.error('[Camera] Share failed:', error);
    }
  };

  if (!isActive) {
    return (
      <div className={`flex items-center justify-center p-6 ${className}`}>
        <button
          onClick={startCamera}
          className="flex items-center space-x-3 bg-gradient-to-r from-red-600 to-green-600 text-white px-6 py-3 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
        >
          <Camera className="h-6 w-6" />
          <span>
            {mode === 'qr-scanner' 
              ? (language === 'pt' ? 'Abrir Scanner QR' : 'Open QR Scanner')
              : (language === 'pt' ? 'Abrir Câmara' : 'Open Camera')
            }
          </span>
        </button>
      </div>
    );
  }

  return (
    <div className={`fixed inset-0 bg-black z-50 flex flex-col ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-black text-white">
        <button
          onClick={closeCamera}
          className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
        >
          <X className="h-6 w-6" />
        </button>
        
        <h1 className="font-semibold">
          {mode === 'qr-scanner' 
            ? (language === 'pt' ? 'Scanner QR' : 'QR Scanner')
            : (language === 'pt' ? 'Câmara LusoTown' : 'LusoTown Camera')
          }
        </h1>
        
        <div className="w-10" /> {/* Spacer */}
      </div>

      {/* Camera/Scanner Content */}
      <div className="flex-1 relative">
        {mode === 'qr-scanner' ? (
          <>
            <div id="qr-reader" className="w-full h-full"></div>
            
            {/* Scanning overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative">
                <div className="w-64 h-64 border-2 border-white rounded-lg"></div>
                <ScanLine className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-8 w-8 text-white animate-pulse" />
              </div>
            </div>
            
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <p className="text-white text-sm">
                {language === 'pt' 
                  ? 'Aponta para um QR code de negócio português ou evento cultural' 
                  : 'Point at a Portuguese business or cultural event QR code'}
              </p>
            </div>
          </>
        ) : (
          <>
            {/* Camera view */}
            {!capturedImage ? (
              <div className="relative w-full h-full">
                <video
                  ref={videoRef}
                  className={`w-full h-full object-cover ${selectedFilter !== 'none' ? 'filtered' : ''}`}
                  style={{
                    filter: selectedFilter !== 'none' 
                      ? PORTUGUESE_FILTERS.find(f => f.id === selectedFilter)?.filter 
                      : 'none'
                  }}
                  playsInline
                  muted
                />
                
                {/* Camera UI overlay */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
                  {/* Filter selector */}
                  <select
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                    className="bg-black bg-opacity-50 text-white px-3 py-2 rounded-lg text-sm"
                  >
                    {PORTUGUESE_FILTERS.map(filter => (
                      <option key={filter.id} value={filter.id}>
                        {language === 'pt' ? filter.namePortuguese : filter.name}
                      </option>
                    ))}
                  </select>
                  
                  {/* Switch camera button */}
                  <button
                    onClick={switchCamera}
                    className="p-3 bg-black bg-opacity-50 text-white rounded-full"
                  >
                    <RotateCcw className="h-5 w-5" />
                  </button>
                </div>

                {/* Capture button */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                  <button
                    onClick={capturePhoto}
                    disabled={isProcessing}
                    className={`w-16 h-16 rounded-full border-4 border-white bg-red-600 hover:bg-red-700 transition-colors ${isProcessing ? 'opacity-50' : ''}`}
                  >
                    {isProcessing ? (
                      <div className="animate-spin w-8 h-8 border-2 border-white border-t-transparent rounded-full mx-auto" />
                    ) : (
                      <div className="w-12 h-12 bg-white rounded-full mx-auto" />
                    )}
                  </button>
                </div>
              </div>
            ) : (
              /* Photo preview */
              <div className="relative w-full h-full">
                <img
                  src={capturedImage}
                  alt="Captured"
                  className="w-full h-full object-cover"
                />
                
                {/* Photo actions */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
                  <button
                    onClick={retakePhoto}
                    className="flex items-center space-x-2 bg-gray-800 text-white px-4 py-2 rounded-lg"
                  >
                    <RotateCcw className="h-4 w-4" />
                    <span>{language === 'pt' ? 'Repetir' : 'Retake'}</span>
                  </button>
                  
                  <button
                    onClick={downloadImage}
                    className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
                  >
                    <Download className="h-4 w-4" />
                    <span>{language === 'pt' ? 'Guardar' : 'Save'}</span>
                  </button>
                  
                  {navigator.share && (
                    <button
                      onClick={shareImage}
                      className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg"
                    >
                      <Share2 className="h-4 w-4" />
                      <span>{language === 'pt' ? 'Partilhar' : 'Share'}</span>
                    </button>
                  )}
                  
                  <button
                    onClick={savePhoto}
                    className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg"
                  >
                    <Upload className="h-4 w-4" />
                    <span>{language === 'pt' ? 'Usar' : 'Use'}</span>
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* QR Scan Result */}
      {scanResult && (
        <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg p-4 shadow-lg">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              {scanResult.type === 'business' && <MapPin className="h-6 w-6 text-red-600" />}
              {scanResult.type === 'event' && <Heart className="h-6 w-6 text-green-600" />}
              {scanResult.type === 'cultural-site' && <Sparkles className="h-6 w-6 text-blue-600" />}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">
                {getQRResultMessage(scanResult)}
              </h3>
              {scanResult.data.url && (
                <a
                  href={scanResult.data.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm mt-1 inline-block"
                >
                  {language === 'pt' ? 'Abrir ligação' : 'Open link'}
                </a>
              )}
            </div>
            <button
              onClick={() => setScanResult(null)}
              className="p-1 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Hidden canvas for photo processing */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}