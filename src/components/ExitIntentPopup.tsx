import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

export const ExitIntentPopup = ({ 
  isOpen, 
  onClose, 
  onGoToOffers 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onGoToOffers: () => void; 
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
            className="bg-white p-6 rounded-2xl shadow-2xl max-w-sm w-full relative border-2 border-rose-500 text-center"
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
              <X />
            </button>
            
            <h2 className="text-2xl font-black text-slate-900 mb-4">Já vai? 😱</h2>
            
            <p className="text-lg font-medium text-slate-700 mb-6">
              Você está prestes a perder a chance de descobrir sua compatibilidade amorosa real! Não saia sem ver as ofertas.
            </p>
            
            <button 
              onClick={onGoToOffers}
              className="w-full bg-rose-600 hover:bg-rose-700 text-white font-black text-lg py-4 rounded-xl transition-colors"
            >
              Ver ofertas agora!
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
