import React from "react";
import { motion } from "motion/react";

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  lightText?: boolean;
}

export default function Logo({ className = "", iconOnly = false, lightText = true }: LogoProps) {
  return (
    <div className={`flex items-center select-none ${className}`}>
      <motion.img 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: "spring", bounce: 0.5 }}
        whileHover={{ scale: 1.05 }}
        src="https://i.ibb.co/Z6ymRPct/Mi-Foodbank-2048x1152-1-copy-3.png" 
        alt="Mi Foodbank" 
        className="h-16 sm:h-24 w-auto object-contain" 
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
