import { motion } from 'motion/react';

export const CTAButton = ({ text, className = "", variant = "primary", onClick }: { text: string, className?: string, variant?: "primary" | "secondary" | "green", onClick?: () => void }) => (
  <motion.button 
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`${
      variant === "primary" 
        ? "bg-rose-600 hover:bg-rose-700 text-white shadow-[0_10px_30px_rgba(225,29,72,0.4)]" 
        : variant === "green"
        ? "bg-[#2EBE5B] hover:bg-[#28a850] text-white shadow-[0_10px_30px_rgba(46,190,91,0.4)]"
        : "bg-white hover:bg-slate-100 text-rose-700 border-2 border-rose-600"
    } font-black text-lg md:text-xl py-5 px-8 rounded-full transition-colors flex items-center justify-center gap-3 mx-auto ${className}`}
  >
    {text}
  </motion.button>
);
