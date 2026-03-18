import { motion } from 'motion/react';
import { fadeIn } from '../constants';

export const AudienceCard = ({ text }: { text: string }) => {
  return (
    <motion.div 
      {...fadeIn}
      className="flex items-start gap-4 bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-sm"
    >
      <div className="w-2 h-2 rounded-full bg-rose-500 shrink-0 mt-2.5"></div>
      <p className="text-lg text-slate-700 font-medium leading-relaxed">{text}</p>
    </motion.div>
  );
};
