import { motion } from 'motion/react';
import { Star } from 'lucide-react';
import { fadeIn } from '../constants';

export const TestimonialCard = ({ name, text }: { name: string, text: string }) => {
  return (
    <motion.div 
      {...fadeIn}
      className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex gap-1 mb-2">
        {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />)}
      </div>
      <p className="font-bold text-slate-900 mb-4">{name}</p>
      <p className="text-slate-700 font-medium leading-relaxed italic">"{text}"</p>
    </motion.div>
  );
};
