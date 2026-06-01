import React from 'react';
// @ts-ignore
import { Pannellum } from 'pannellum-react';

const VrViewer = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '80vh',
        padding: '20px',
        boxSizing: 'border-box',
      }}
    >
      <h1
        style={{
          marginBottom: '15px',
          fontSize: '24px',
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        عرض الصورة 360 درجة
      </h1>

      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        }}
      >
        <Pannellum
          width="100%"
          height="100%"
          image="/6.png"
          pitch={10}
          yaw={180}
          hfov={110}
          autoLoad
          showZoomCtrl={true}
          showFullscreenCtrl={true}
          onLoad={() => {
            console.log('360 Image Loaded successfully');
          }}
        />
      </div>
      <p style={{ marginTop: '10px', color: '#666', textAlign: 'center' }}>
        استخدم الماوس للسحب والتحرك داخل الصورة، أو عجلة الماوس لعمل Zoom.
      </p>
    </div>
  );
};

export default VrViewer;
