import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../../../lib/utils';
import { CheckCircle2 } from 'lucide-react';

export function Features({ settings }: { settings: any }) {
  const features = settings.features || [
    { title: 'Retina Display', description: 'See everything in stunning detail.' },
    { title: 'Neural Engine', description: 'AI performance like never before.' },
    { title: 'All-day Battery', description: 'Power through your biggest tasks.' },
    { title: 'Privacy', description: 'What happens on your device stays on your device.' }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 px-8">
        {features.map((feature: any, i: number) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="flex gap-6"
          >
            <div className="mt-1">
              <CheckCircle2 className="text-primary" size={24} />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground text-lg leading-relaxed font-medium">
                {feature.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
