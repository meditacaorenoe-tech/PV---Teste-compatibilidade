import { motion, AnimatePresence } from 'motion/react';
import { CTAButton } from './CTAButton';

export const FloatingCTA = ({ 
  isVisible, 
  onScrollToPremium 
}: { 
  isVisible: boolean; 
  onScrollToPremium: () => void; 
}) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200 shadow-2xl z-50 md:hidden"
        >
          <CTAButton 
            text="QUERO ACESSO IMEDIATO" 
            variant="green" 
            className="w-full text-lg py-4"
            onClick={onScrollToPremium}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
