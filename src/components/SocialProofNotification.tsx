import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

const mockSales = [
  { name: "Marcos", city: "Rio de Janeiro", state: "RJ", plan: "Plano VIP" },
  { name: "Maria", city: "São Paulo", state: "SP", plan: "Plano VIP" },
  { name: "Ana", city: "Belo Horizonte", state: "MG", plan: "Plano VIP" },
];

export const SocialProofNotification = ({ isVisibleSection }: { isVisibleSection: boolean }) => {
  const [notification, setNotification] = useState<typeof mockSales[0] | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!isVisibleSection) {
      setShow(false);
      return;
    }

    const showNotification = () => {
      const randomSale = mockSales[Math.floor(Math.random() * mockSales.length)];
      setNotification(randomSale);
      setShow(true);

      setTimeout(() => {
        setShow(false);
      }, 4000);
    };

    // Show first one immediately when entering section
    showNotification();

    const interval = setInterval(showNotification, Math.random() * 5000 + 15000); // 15-20 seconds

    return () => clearInterval(interval);
  }, [isVisibleSection]);

  return (
    <AnimatePresence>
      {show && notification && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 left-2 right-2 md:left-4 md:right-auto z-50 bg-[#1e293b] p-4 rounded-lg shadow-2xl border border-slate-700 max-w-sm flex items-center gap-3"
        >
          <CheckCircle2 className="w-8 h-8 text-emerald-500 flex-shrink-0" />
          <p className="text-sm text-slate-300">
            <strong className="text-white text-base">{notification.name}</strong> de {notification.city}, {notification.state} 
            <br />
            acabou de comprar o <strong className="text-white">{notification.plan}</strong>
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
