import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, PresentationControls, MeshWobbleMaterial } from '@react-three/drei';
import { cn } from '../../../../lib/utils';

export function Showcase3D({ settings }: { settings: any }) {
  return (
    <section className="h-[600px] bg-zinc-50 dark:bg-zinc-900 rounded-3xl border overflow-hidden relative group">
      <div className="absolute top-8 left-8 z-10 max-w-xs">
        <h2 className="text-3xl font-bold tracking-tight mb-2">Interactivity</h2>
        <p className="text-muted-foreground text-sm font-medium uppercase tracking-widest">Orbit & Explore</p>
      </div>

      <Canvas dpr={[1, 2]} shadows camera={{ position: [0, 0, 4], fov: 50 }}>
        <color attach="background" args={['transparent']} />
        <Suspense fallback={null}>
          <PresentationControls
            speed={1.5}
            global
            zoom={0.7}
            polar={[-0.1, Math.PI / 4]}
          >
            <Stage environment="city" intensity={0.6} contactShadow={false}>
              <mesh scale={1.5}>
                <torusKnotGeometry args={[1, 0.3, 128, 32]} />
                <MeshWobbleMaterial 
                  color="#18181b" 
                  factor={0.4} 
                  speed={2} 
                  roughness={0.1}
                  metalness={0.8}
                />
              </mesh>
            </Stage>
          </PresentationControls>
        </Suspense>
        <OrbitControls enableZoom={false} autoRotate={settings.autoRotate} autoRotateSpeed={4} />
      </Canvas>

      <div className="absolute bottom-8 right-8 flex gap-4">
        <div className="glass px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          Real-time Engine
        </div>
      </div>
    </section>
  );
}
