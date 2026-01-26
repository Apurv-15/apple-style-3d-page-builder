import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Float, OrbitControls, MeshDistortMaterial, GradientTexture } from '@react-three/drei';
import { cn } from '../../../../lib/utils';

export function Hero({ settings }: { settings: any }) {
  const isDark = settings.theme === 'dark';

  return (
    <section className={cn(
      "relative h-[80vh] overflow-hidden rounded-3xl apple-transition",
      isDark ? "bg-black text-white" : "bg-white text-black border"
    )}>
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-60">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <Suspense fallback={null}>
            <Float speed={2} rotationIntensity={1} floatIntensity={1}>
              <mesh position={[1.5, 0, 0]}>
                <sphereGeometry args={[1.2, 64, 64]} />
                <MeshDistortMaterial
                  color={isDark ? "#ffffff" : "#000000"}
                  speed={2}
                  distort={0.4}
                  radius={1}
                />
              </mesh>
            </Float>
          </Suspense>
        </Canvas>
      </div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-12 max-w-3xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="text-6xl md:text-7xl font-bold tracking-tighter mb-6 leading-tight"
        >
          {settings.title}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          className="text-xl md:text-2xl text-muted-foreground max-w-2xl font-medium mb-10 leading-relaxed"
        >
          {settings.subtitle}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
        >
          <button className={cn(
            "px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 active:scale-95 transition-all shadow-elegant",
            isDark ? "bg-white text-black" : "bg-black text-white"
          )}>
            Get Started
          </button>
        </motion.div>
      </div>

      {/* Decorative Gradient */}
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-t from-primary/5 to-transparent blur-3xl pointer-events-none" />
    </section>
  );
}
