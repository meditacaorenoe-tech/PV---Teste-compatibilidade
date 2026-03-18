import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import { fadeIn } from '../constants';

export const BenefitItem = ({ text }: { text: string }) => {
  return (
    <motion.div 
      {...fadeIn}
      className="flex items-start gap-4 pb-8 border-b border-slate-100 last:border-0"
    >
      <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
      <p className="text-lg text-slate-700 font-medium leading-relaxed">{text}</p>
    </motion.div>
  );
};
