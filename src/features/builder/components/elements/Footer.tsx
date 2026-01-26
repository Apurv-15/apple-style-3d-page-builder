import React from 'react';
import { cn } from '../../../../lib/utils';

export function Footer({ settings }: { settings: any }) {
  return (
    <footer className="py-20 border-t bg-zinc-50 dark:bg-zinc-950/50 rounded-t-[3rem] mt-24 px-12">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2 space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-black dark:bg-white rounded flex items-center justify-center">
              <div className="w-3 h-3 bg-white dark:bg-black rounded-sm rotate-45" />
            </div>
            <span className="font-bold text-xl tracking-tight italic">Studio 3D</span>
          </div>
          <p className="text-muted-foreground max-w-sm font-medium leading-relaxed">
            Designing tomorrow's experiences today. Our mission is to make the web immersive, beautiful, and intuitive.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="font-bold text-sm uppercase tracking-widest text-primary">Company</h4>
          <ul className="space-y-3 text-muted-foreground font-medium">
            <li className="hover:text-foreground cursor-pointer transition-colors">About Us</li>
            <li className="hover:text-foreground cursor-pointer transition-colors">Press</li>
            <li className="hover:text-foreground cursor-pointer transition-colors">Careers</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="font-bold text-sm uppercase tracking-widest text-primary">Support</h4>
          <ul className="space-y-3 text-muted-foreground font-medium">
            <li className="hover:text-foreground cursor-pointer transition-colors">Contact</li>
            <li className="hover:text-foreground cursor-pointer transition-colors">Help Center</li>
            <li className="hover:text-foreground cursor-pointer transition-colors">Documentation</li>
          </ul>
        </div>
      </div>

      <div className="max-w-5xl mx-auto pt-12 mt-12 border-t flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-muted-foreground font-medium">
        <p>© 2026 Studio 3D. All rights reserved.</p>
        <div className="flex gap-8">
          <span className="hover:text-foreground cursor-pointer transition-colors">Privacy Policy</span>
          <span className="hover:text-foreground cursor-pointer transition-colors">Terms of Service</span>
        </div>
      </div>
    </footer>
  );
}
