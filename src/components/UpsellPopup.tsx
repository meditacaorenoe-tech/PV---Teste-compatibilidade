import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

export const UpsellPopup = ({ 
  isOpen, 
  onClose, 
  onAccept, 
  onRefuse 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onAccept: () => void; 
  onRefuse: () => void; 
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-[#1e293b] p-6 rounded-2xl shadow-2xl max-w-sm w-full relative border-2 border-emerald-500 text-white text-center"
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white">
              <X />
            </button>
            
            <img 
              src="https://i.postimg.cc/wjK2NGjY/gif-para-pv.gif" 
              alt="Upsell" 
              className="w-[30%] aspect-square object-cover rounded-lg mx-auto mb-4 border-2 border-emerald-500"
              referrerPolicy="no-referrer"
            />
            
            <h2 className="text-2xl font-black mb-4">É sério?</h2>
            
            <p className="text-lg font-medium mb-2">
              Por apenas <span className="bg-emerald-600 px-2 py-1 rounded">R$17 a mais</span>, você pode levar o plano PREMIUM completo.
            </p>
            
            <p className="text-sm text-slate-400 mb-6">
              (ele não é vendido em nenhuma outro lugar)
            </p>
            
            <button 
              onClick={onAccept}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black text-lg py-4 rounded-xl mb-4 transition-colors"
            >
              Me dá o plano completo logo!
            </button>
            
            <button 
              onClick={onRefuse}
              className="text-slate-400 underline text-sm hover:text-white"
            >
              Quero apenas o plano Essencial
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
