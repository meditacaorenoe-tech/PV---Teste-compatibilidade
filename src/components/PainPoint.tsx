import { motion } from 'motion/react';
import { AlertTriangle } from 'lucide-react';
import { fadeIn } from '../constants';

export const PainPoint = ({ text }: { text: string }) => {
  return (
    <motion.div 
      {...fadeIn}
      className="flex items-start gap-5 bg-rose-900/30 border border-rose-800/50 p-6 md:p-8 rounded-2xl"
    >
      <AlertTriangle className="w-8 h-8 text-rose-400 shrink-0 mt-0.5" />
      <p className="text-lg md:text-xl font-medium text-rose-50 leading-relaxed">{text}</p>
    </motion.div>
  );
};
