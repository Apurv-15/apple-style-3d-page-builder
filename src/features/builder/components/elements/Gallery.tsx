import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '../../../../lib/utils';

export function Gallery({ settings }: { settings: any }) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({
    container: containerRef
  });

  const images = settings.images || [
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80'
  ];

  return (
    <section className="space-y-8">
      <div className="px-8 max-w-5xl mx-auto flex items-end justify-between">
        <div>
          <h2 className="text-4xl font-bold tracking-tight">Gallery</h2>
          <p className="text-muted-foreground mt-2">Swipe to explore the vision.</p>
        </div>
      </div>

      <div 
        ref={containerRef}
        className="flex gap-6 overflow-x-auto pb-12 px-8 snap-x no-scrollbar"
      >
        {images.map((img: string, i: number) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex-shrink-0 w-80 md:w-[450px] aspect-[4/3] rounded-3xl overflow-hidden snap-center group border shadow-sm"
          >
            <img 
              src={img} 
              alt={`Gallery ${i}`} 
              className="w-full h-full object-cover group-hover:scale-110 apple-transition"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
