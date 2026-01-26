import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../../../lib/utils';

export function BentoGrid({ settings }: { settings: any }) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {settings.items.map((item: any, i: number) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className={cn(
            "group relative overflow-hidden rounded-3xl bg-background border hover:border-primary/50 transition-all p-8 flex flex-col justify-end min-h-[300px] shadow-sm hover:shadow-elegant",
            item.size === 'large' ? "md:col-span-2" : "md:col-span-1"
          )}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5 opacity-0 group-hover:opacity-100 apple-transition" />
          
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
            <p className="text-muted-foreground">{item.description}</p>
          </div>

          {/* Abstract background element */}
          <div className={cn(
            "absolute -top-12 -right-12 w-48 h-48 rounded-full blur-3xl opacity-10 group-hover:opacity-20 apple-transition",
            i % 2 === 0 ? "bg-primary" : "bg-zinc-400"
          )} />
        </motion.div>
      ))}
    </section>
  );
}
