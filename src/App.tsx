import { motion } from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import { CheckCircle2, Heart, Star } from 'lucide-react';
import { fadeIn } from './constants';
import { CTAButton } from './components/CTAButton';
import { BenefitItem } from './components/BenefitItem';
import { PainPoint } from './components/PainPoint';
import { AudienceCard } from './components/AudienceCard';
import { TestimonialCard } from './components/TestimonialCard';
import { FloatingCTA } from './components/FloatingCTA';
import { SocialProofNotification } from './components/SocialProofNotification';
import { UpsellPopup } from './components/UpsellPopup';
import { ExitIntentPopup } from './components/ExitIntentPopup';

const ScarcityCounter = () => {
  const [spotsLeft, setSpotsLeft] = useState(7);

  useEffect(() => {
    if (spotsLeft <= 2) return;

    const delay = (8 - spotsLeft) * 10000; // 7->6: 10s, 6->5: 20s, 5->4: 30s, 4->3: 40s, 3->2: 50s
    const timer = setTimeout(() => {
      setSpotsLeft(prev => prev - 1);
    }, delay);

    return () => clearTimeout(timer);
  }, [spotsLeft]);

  return (
    <p className="text-white font-black text-center mt-4">
      Restam apenas <span className="text-yellow-400">{spotsLeft}</span> vagas neste preço
    </p>
  );
};

export default function App() {
  const [isPricingInView, setIsPricingInView] = useState(false);
  const [isUpsellOpen, setIsUpsellOpen] = useState(false);
  const [isExitIntentOpen, setIsExitIntentOpen] = useState(false);
  const pricingSectionRef = useRef<HTMLElement>(null);
  const premiumPlanRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const hasShown = sessionStorage.getItem('exitIntentShown');

    if (!hasShown) {
      timer = setTimeout(() => {
        const handleMouseLeave = (e: MouseEvent) => {
          if (e.clientY <= 0 && !sessionStorage.getItem('exitIntentShown')) {
            setIsExitIntentOpen(true);
            sessionStorage.setItem('exitIntentShown', 'true');
          }
        };
        window.addEventListener('mouseleave', handleMouseLeave);
        return () => window.removeEventListener('mouseleave', handleMouseLeave);
      }, 15000);
    }

    return () => clearTimeout(timer);
  }, []);

  const scrollToPricing = () => {
    pricingSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    setIsExitIntentOpen(false);
  };

  const scrollToPremium = () => {
    premiumPlanRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBasicCheckout = () => {
    window.location.href = 'https://pay.hotmart.com/F105001165Y?checkoutMode=10';
    setIsUpsellOpen(false);
  };

  const handlePremiumCheckout = () => {
    window.location.href = 'https://pay.hotmart.com/H105004096K?checkoutMode=10';
    setIsUpsellOpen(false);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsPricingInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (pricingSectionRef.current) {
      observer.observe(pricingSectionRef.current);
    }

    return () => {
      if (pricingSectionRef.current) {
        observer.unobserve(pricingSectionRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-rose-200 selection:text-rose-900">
      <UpsellPopup 
        isOpen={isUpsellOpen} 
        onClose={() => setIsUpsellOpen(false)} 
        onAccept={handlePremiumCheckout}
        onRefuse={handleBasicCheckout}
      />
      <ExitIntentPopup
        isOpen={isExitIntentOpen}
        onClose={() => setIsExitIntentOpen(false)}
        onGoToOffers={scrollToPricing}
      />
      <SocialProofNotification isVisibleSection={isPricingInView} />
      <FloatingCTA isVisible={isPricingInView} onScrollToPremium={scrollToPremium} />
      
      {/* 1. Hero Section */}
      <section className="bg-slate-950 text-white py-16 md:py-24 px-4 md:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/40 via-slate-950 to-slate-950"></div>
        <div className="max-w-6xl mx-auto relative z-10 grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column: Text */}
          <div className="text-left">
            <motion.div {...fadeIn} className="flex items-center gap-3 mb-8">
              <img 
                src="https://i.postimg.cc/vH22rtPt/Chat_GPT_Image_14_de_mar_de_2026_08_43_14.jpg" 
                alt="Logo" 
                className="w-12 h-12"
                referrerPolicy="no-referrer"
              />
              <span className="text-base font-light uppercase text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-500 tracking-tight">Teste de Compatibilidade Amorosa</span>
            </motion.div>
            <motion.h1 
              {...fadeIn} transition={{ delay: 0.1, duration: 0.6 }}
              className="text-3xl md:text-5xl lg:text-6xl font-black mb-6 leading-[1.1]"
            >
              Antes de se envolver mais, descubra se você está com a pessoa certa… ou apenas ignorando sinais
            </motion.h1>
            <motion.p 
              {...fadeIn} transition={{ delay: 0.2, duration: 0.6 }}
              className="text-lg md:text-xl text-slate-300 mb-6 font-medium leading-relaxed"
            >
              Você pode estar investindo tempo, emoção e expectativa em alguém que não tem o mesmo caminho que você — e nem percebeu ainda.
            </motion.p>
            <motion.p 
              {...fadeIn} transition={{ delay: 0.3, duration: 0.6 }}
              className="text-lg md:text-xl text-slate-300 mb-8 font-medium leading-relaxed"
            >
              Leva menos de 2 minutos para descobrir.
            </motion.p>
            <CTAButton text="Descobrir agora" variant="primary" className="w-full md:w-auto" onClick={scrollToPricing} />
          </div>
          
          {/* Right Column: Mockup */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex justify-center md:justify-end"
          >
            <img 
              src="https://i.postimg.cc/VLykY2Qp/hero-imagem-pv-calculadora.jpg" 
              alt="Mockup do aplicativo Compatibilidade Amorosa" 
              className="w-full max-w-sm md:max-w-md rounded-3xl shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </section>

      {/* 2. Features Section */}
      <section className="bg-white py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <motion.h2 {...fadeIn} className="text-2xl md:text-4xl font-black text-slate-900 text-center mb-16 leading-tight">
            O que você vai descobrir
          </motion.h2>
          
          <div className="space-y-8">
            <BenefitItem text="O nível real de compatibilidade entre vocês" />
            <BenefitItem text="Se existe potencial de longo prazo ou apenas atração momentânea" />
            <BenefitItem text="Pontos de conflito que ainda não ficaram claros" />
            <BenefitItem text="Se vale a pena continuar investindo emocionalmente" />
            
            <div className="bg-rose-50 p-8 rounded-3xl border border-rose-100 mt-8">
              <p className="text-slate-900 font-bold text-lg text-center">
                Não é sobre curiosidade. É sobre evitar escolhas erradas.
              </p>
            </div>
          </div>

          <motion.h2 {...fadeIn} className="text-2xl md:text-4xl font-black text-slate-900 text-center mt-24 mb-16 leading-tight">
            Como funciona
          </motion.h2>
          <div className="text-lg text-slate-700 font-medium text-center space-y-4">
            <p>Você só precisa informar as datas de nascimento.</p>
            <p>O sistema cruza padrões de compatibilidade e em poucos segundos mostra um resultado direto, claro e fácil de entender — direto no seu celular.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="text-center font-bold text-slate-900">Rápido (menos de 2 minutos)</div>
            <div className="text-center font-bold text-slate-900">Simples (sem cadastro complicado)</div>
            <div className="text-center font-bold text-slate-900">Resultado imediato</div>
          </div>
        </div>
      </section>

      {/* 3. Example Section */}
      <section className="bg-slate-50 py-16 md:py-24 px-4 md:px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.h2 {...fadeIn} className="text-2xl md:text-4xl font-black text-slate-900 text-center mb-16">
            Resultado na prática
          </motion.h2>
          
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <motion.div {...fadeIn} className="flex-1 space-y-8 text-lg text-slate-700">
              <div>
                <p className="text-lg font-medium">Você recebe uma análise clara com um percentual de compatibilidade e uma leitura simples do que isso significa na prática.</p>
                <p className="text-rose-600 font-bold mt-4">Sem termos confusos. Sem enrolação. Apenas clareza.</p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex-1 w-full max-w-md mx-auto lg:max-w-none"
            >
              <img 
                src="https://i.postimg.cc/nrpS2H9v/pv-canculadora-mockup.jpg" 
                alt="Exemplo de funcionamento do app" 
                className="w-full max-w-[320px] mx-auto rounded-3xl shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>
          
        </div>
      </section>

      {/* 9. Testimonials Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.h2 {...fadeIn} className="text-2xl md:text-4xl font-black text-slate-900 text-center mb-16">
            O que algumas pessoas perceberam
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard 
              name="Mariana S." 
              text="“Eu estava em dúvida se continuava com ele… fiz o teste mais por curiosidade, mas o resultado bateu exatamente com o que eu já sentia. Foi meio assustador, mas me ajudou a enxergar melhor.”" 
            />
            <TestimonialCard 
              name="Carla R." 
              text="“Usei antes de me envolver mais sério… e olhando agora, foi uma das melhores decisões. Evitei entrar em algo que claramente não ia dar certo.”" 
            />
            <TestimonialCard 
              name="Juliana M." 
              text="“Eu achava que era só insegurança minha. Quando vi o resultado, entendi que não era coisa da minha cabeça.”" 
            />
          </div>
        </div>
      </section>

      {/* 4. History Section */}
      <section className="bg-white py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 {...fadeIn} className="text-2xl md:text-4xl font-black text-slate-900 mb-10">
            Por que essa análise funciona?
          </motion.h2>
          <motion.div {...fadeIn} className="text-lg text-slate-700 space-y-6 font-medium text-left md:text-center max-w-3xl mx-auto leading-relaxed">
            <p>Essa análise é inspirada em padrões utilizados há milhares de anos para entender relações humanas e compatibilidade entre pessoas.</p>
            <p>Não é um teste aleatório — é uma leitura baseada em estrutura e comportamento.</p>
          </motion.div>
        </div>
      </section>

      {/* 5. Pain Points Section */}
      <section className="bg-rose-950 text-white py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h2 {...fadeIn} className="text-2xl md:text-4xl font-black text-center mb-16 leading-tight">
            Sinais de baixa compatibilidade
          </motion.h2>
          <div className="space-y-6">
            <PainPoint text="Você sente dúvida mesmo quando tudo parece “ok”" />
            <PainPoint text="Existe uma sensação de desalinhamento difícil de explicar" />
            <PainPoint text="Você ignora pequenos sinais para evitar conflitos" />
          </div>
          <p className="text-center font-bold text-white mt-12 text-xl">Na maioria dos casos, esses sinais não são coincidência.</p>
          <p className="text-center font-bold text-white mt-12 text-xl">Quanto mais você espera, mais você se envolve emocionalmente… e mais difícil fica enxergar com clareza.</p>
        </div>
      </section>

      {/* 8. Who is this tool for */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <motion.h2 {...fadeIn} className="text-2xl md:text-4xl font-black text-slate-900 text-center mb-16">
            Para quem é
          </motion.h2>
          <div className="grid sm:grid-cols-1 gap-6">
            <AudienceCard text="Para quem está conhecendo alguém e quer evitar erros" />
            <AudienceCard text="Para quem já está envolvido, mas sente dúvida" />
            <AudienceCard text="Para quem quer clareza antes de se entregar mais" />
          </div>
        </div>
      </section>


      {/* 6. Intro to Versions Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeIn} className="mb-8 flex justify-center">
            <img 
              src="https://i.postimg.cc/9QgqH4RS/calculadora-2-0-scaner-mockup.jpg" 
              alt="Escolha a versão da análise" 
              className="w-full max-w-sm md:max-w-md rounded-3xl shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <motion.h2 {...fadeIn} className="text-2xl md:text-4xl font-black text-slate-900 mb-6">
            Escolha sua análise
          </motion.h2>
          <motion.p {...fadeIn} className="text-lg text-slate-600 mb-4 font-medium">
            Escolha a opção que melhor se adapta ao seu momento.
          </motion.p>
        </div>
      </section>

      {/* 9. Pricing Table */}
      <section ref={pricingSectionRef} className="py-16 md:py-24 px-4 md:px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Básico */}
            <div className="bg-white p-8 md:p-10 rounded-3xl border-2 border-slate-200 shadow-sm">
              <h3 className="text-2xl font-black text-slate-900 mb-4">Análise Essencial</h3>
              <p className="text-slate-600 mb-8 font-medium">Acesso à análise essencial de compatibilidade</p>
              <div className="text-4xl font-black text-slate-900 mb-8">R$10</div>
              <CTAButton text="Descobrir agora" variant="green" className="w-full !font-bold !text-base" onClick={() => setIsUpsellOpen(true)} />
            </div>

            {/* Premium */}
            <div ref={premiumPlanRef} className="bg-slate-900 p-8 md:p-10 rounded-3xl border-2 border-green-400 shadow-2xl relative">
              <h3 className="text-2xl font-black text-white mb-4">Análise Premium</h3>
              <p className="text-slate-300 mb-8 font-medium">Análise completa com leitura mais profunda e detalhada</p>
              <div className="text-center mb-8">
                <div className="text-6xl font-black text-white">R$17</div>
              </div>
              <CTAButton text="Descobrir agora" variant="green" className="w-full !font-bold !text-base" onClick={handlePremiumCheckout} />
              <ScarcityCounter />
            </div>
          </div>
          <div className="mt-12 text-center space-y-4">
            <p className="text-lg font-bold text-slate-800">
              Um pequeno valor para evitar uma decisão emocional errada.
            </p>
            <p className="text-2xl font-black text-slate-900 mt-12">
              Você pode continuar na dúvida… ou descobrir agora
            </p>
            <CTAButton text="Quero descobrir se estou com a pessoa certa" variant="primary" className="w-full md:w-auto mt-8" onClick={handlePremiumCheckout} />
          </div>
        </div>
      </section>



      <footer className="bg-slate-50 py-10 text-center text-slate-500 text-sm font-medium border-t border-slate-200">
        <p>© {new Date().getFullYear()} Teste de Compatibilidade Amorosa. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

// Subcomponents removed, imported from ./components/
