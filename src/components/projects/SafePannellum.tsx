import { useState, useEffect } from 'react';
// @ts-ignore
import { Pannellum } from 'pannellum-react';

interface SafePannellumProps {
  imageUrl: string;
  isRTL: boolean;
}

export default function SafePannellum({ imageUrl, isRTL }: SafePannellumProps) {
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [debugError, setDebugError] = useState<string | null>(null);

  useEffect(() => {
    if (!imageUrl) return;

    setLoading(true);
    setDebugError(null);

    const apiBaseUrl = import.meta.env.VITE_API || 'http://localhost:8000/api/';

    const cleanBaseUrl = apiBaseUrl.endsWith('/')
      ? apiBaseUrl.slice(0, -1)
      : apiBaseUrl;

    const proxyUrl = `${cleanBaseUrl}/vr-proxy?url=${encodeURIComponent(imageUrl)}`;

    fetch(proxyUrl)
      .then((res) => {
        if (!res.ok) {
          return res
            .json()
            .then((json) => {
              throw new Error(
                json.error || `HTTP error! status: ${res.status}`
              );
            })
            .catch(() => {
              throw new Error(`HTTP error! status: ${res.status}`);
            });
        }
        return res.blob();
      })
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        setBlobUrl(url);
        setLoading(false);
      })
      .catch((err) => {
        setDebugError(err.message || 'تعذر تحميل الصورة التفاعلية.');
        setLoading(false);
      });

    return () => {
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  }, [imageUrl]);

  if (loading) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-950 text-zinc-400 text-xs gap-3">
        <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        <span>
          {isRTL
            ? 'جاري تهيئة وفحص العرض التفاعلي 360°...'
            : 'Initializing & testing 360° View...'}
        </span>
      </div>
    );
  }

  if (debugError) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-950 text-red-500 text-xs p-6 text-center gap-2">
        <span className="font-bold">❌ فشل تحميل الـ VR</span>
        <code className="text-[10px] bg-red-950/40 text-red-400 p-2 rounded border border-red-900/50 font-mono max-w-full overflow-x-auto block">
          {debugError}
        </code>
      </div>
    );
  }

  return (
    <Pannellum
      width="100%"
      height="100%"
      image={blobUrl || imageUrl}
      pitch={10}
      yaw={180}
      hfov={100}
      autoLoad
      showZoomCtrl={true}
      showFullscreenCtrl={true}
      crossOrigin="anonymous"
    />
  );
}
