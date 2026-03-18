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
    window.location.href = 'https://pay.hotmart.com/D104952377P?bid=1773776045738';
    setIsUpsellOpen(false);
  };

  const handlePremiumCheckout = () => {
    window.location.href = 'https://pay.hotmart.com/D104967142B?checkoutMode=10';
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
              Descubra com quem você <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-500">realmente combina</span> usando apenas a data de nascimento.
            </motion.h1>
            <motion.p 
              {...fadeIn} transition={{ delay: 0.2, duration: 0.6 }}
              className="text-lg md:text-xl text-slate-300 mb-6 font-medium leading-relaxed"
            >
              Baseado na <span className="text-rose-400 font-bold">Numerologia Védica da Índia</span> — um conhecimento milenar utilizado na Índia para analisar a compatibilidade entre casais antes mesmo de iniciarem um relacionamento.
            </motion.p>
            <motion.p 
              {...fadeIn} transition={{ delay: 0.3, duration: 0.6 }}
              className="text-lg md:text-xl text-slate-300 mb-8 font-medium leading-relaxed"
            >
              Em <span className="text-rose-400 font-bold">poucos segundos</span> você pode descobrir se existe harmonia natural entre duas pessoas… ou sinais de conflito que podem gerar sofrimento no futuro.
            </motion.p>
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
            O que você pode descobrir com a Análise de Compatibilidade Amorosa
          </motion.h2>
          
          <div className="space-y-8">
            <BenefitItem text="Descubra com quem você combina analisando a compatibilidade entre duas pessoas usando apenas a data de nascimento." />
            <BenefitItem text="Identifique sinais de harmonia ou possíveis conflitos de personalidade antes de se envolver mais profundamente." />
            <BenefitItem text="Entenda melhor a dinâmica entre duas pessoas e perceba tendências do relacionamento que muitas vezes passam despercebidas no início." />
            
            <div className="bg-rose-50 p-8 rounded-3xl border border-rose-100 mt-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-rose-500 text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest">USO ILIMITADO</span>
              </div>
              <p className="text-slate-700 font-medium mb-4">
                Conheceu alguém novo? Está pensando em iniciar um relacionamento? Quer entender melhor alguém da sua vida?
              </p>
              <p className="text-slate-900 font-bold text-lg">
                Basta inserir as datas e descobrir a compatibilidade.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Example Section */}
      <section className="bg-slate-50 py-16 md:py-24 px-4 md:px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.h2 {...fadeIn} className="text-2xl md:text-4xl font-black text-slate-900 text-center mb-16">
            Veja um exemplo de como funciona
          </motion.h2>
          
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <motion.div {...fadeIn} className="flex-1 space-y-8 text-lg text-slate-700">
              <div>
                <p className="font-bold text-slate-900 text-xl mb-4">Exemplo real de cálculo de compatibilidade:</p>
                <ul className="space-y-3 bg-white p-6 rounded-2xl border border-slate-100">
                  <li className="flex items-center gap-3"><span className="text-2xl">👩</span> <span className="font-semibold">Ana nasceu no dia 15</span></li>
                  <li className="flex items-center gap-3"><span className="text-2xl">👨</span> <span className="font-semibold">João nasceu no dia 28</span></li>
                </ul>
              </div>
              
              <div>
                <p className="mb-4 font-medium">Após inserir as duas datas na análise, o resultado indica:</p>
                <div className="bg-indigo-50 p-8 rounded-3xl border border-indigo-100 relative">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Heart className="w-24 h-24" />
                  </div>
                  <p className="text-3xl font-black text-indigo-700 mb-6 relative z-10">Compatibilidade: 75%</p>
                  <p className="font-bold text-slate-900 mb-4 text-xl relative z-10">Interpretação:</p>
                  <ul className="space-y-3 relative z-10">
                    <li className="flex items-start gap-3">
                      <div className="mt-1.5 w-2 h-2 rounded-full bg-indigo-400 shrink-0"></div>
                      <span>Existe atração e curiosidade entre os dois</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-1.5 w-2 h-2 rounded-full bg-indigo-400 shrink-0"></div>
                      <span>Há potencial de conexão emocional</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-1.5 w-2 h-2 rounded-full bg-rose-400 shrink-0"></div>
                      <span className="font-semibold text-rose-700">Porém podem surgir conflitos de personalidade ao longo do tempo</span>
                    </li>
                  </ul>
                </div>
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
            O que algumas pessoas começaram a perceber sobre seus relacionamentos
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard 
              name="Mariana S." 
              text="Eu testei com meu ex e com a pessoa que estou conhecendo agora… e fiquei surpresa como a análise fez sentido. Foi muito interessante ver as diferenças entre os dois." 
            />
            <TestimonialCard 
              name="Carla R." 
              text="Usei a calculadora com duas pessoas diferentes e a leitura da compatibilidade bateu muito com o que eu sinto no relacionamento." 
            />
            <TestimonialCard 
              name="Juliana M." 
              text="Eu sempre acabava me envolvendo com pessoas que depois percebia que não tinham nada a ver comigo. Comecei a usar a calculadora mais por curiosidade, mas hoje virou quase um filtro. Quando conheço alguém, faço o teste e já consigo ter uma ideia melhor se vale a pena investir ou não." 
            />
          </div>
        </div>
      </section>

      {/* 4. History Section */}
      <section className="bg-white py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 {...fadeIn} className="text-2xl md:text-4xl font-black text-slate-900 mb-10">
            Por que esse conhecimento existe há milhares de anos?
          </motion.h2>
          <motion.div {...fadeIn} className="text-lg text-slate-700 space-y-6 font-medium text-left md:text-center max-w-3xl mx-auto leading-relaxed">
            <p>Na Índia, antes de muitos casamentos, é comum verificar a compatibilidade entre o casal.</p>
            <p>Essa análise busca identificar se existe harmonia entre as personalidades, emoções e padrões de vida das duas pessoas. Isso ajuda a evitar conflitos futuros e relações incompatíveis.</p>
            <p>Por isso, culturalmente, a taxa de separação no país é muito menor do que em muitos lugares do mundo.</p>
            <div className="bg-slate-50 p-8 rounded-2xl shadow-sm border border-slate-100 mt-10">
              <p className="font-bold text-rose-600 text-xl md:text-2xl leading-tight">
                Em vez de descobrir incompatibilidades depois de meses ou anos de relacionamento…<br/><br className="md:hidden"/>
                <span className="text-slate-900">Eles preferem descobrir antes de se envolver profundamente.</span>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. Pain Points Section */}
      <section className="bg-rose-950 text-white py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h2 {...fadeIn} className="text-2xl md:text-4xl font-black text-center mb-16 leading-tight">
            3 sinais de que um relacionamento pode ter baixa compatibilidade
          </motion.h2>
          <div className="space-y-6">
            <PainPoint text="Conflitos constantes mesmo quando a relação ainda está no começo." />
            <PainPoint text="Sensação de atração forte, mas dificuldade em manter harmonia no dia a dia." />
            <PainPoint text="Diferenças profundas na forma de pensar, reagir emocionalmente e lidar com a vida." />
          </div>
        </div>
      </section>

      {/* 8. Who is this tool for */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <motion.h2 {...fadeIn} className="text-2xl md:text-4xl font-black text-slate-900 text-center mb-16">
            Para quem é esta ferramenta?
          </motion.h2>
          <motion.div {...fadeIn} className="mb-16 flex justify-center">
            <img 
              src="https://i.postimg.cc/13svM8pM/pv-calculadora-mockup2.jpg" 
              alt="Para quem é esta ferramenta" 
              className="w-full max-w-sm md:max-w-md rounded-3xl shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <div className="grid sm:grid-cols-1 gap-6">
            <AudienceCard text="Mulheres que estão conhecendo alguém." />
            <AudienceCard text="Mulheres que querem entender melhor um relacionamento." />
            <AudienceCard text="Mulheres que querem evitar investir no relacionamento errado." />
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
            Escolha a versão da análise
          </motion.h2>
          <motion.p {...fadeIn} className="text-lg text-slate-600 mb-4 font-medium">
            Você pode usar a análise em duas versões diferentes dependendo da profundidade da análise que deseja fazer.
          </motion.p>
          <motion.p {...fadeIn} className="text-lg text-rose-600 font-black">
            A maioria das pessoas escolhe a versão Premium para ter análises mais completas
          </motion.p>
        </div>
      </section>

      {/* 7. Pricing Table */}
      <section ref={pricingSectionRef} className="py-16 md:py-24 px-4 md:px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Essencial */}
            <div className="bg-white p-8 md:p-10 rounded-3xl border-2 border-slate-200 shadow-sm">
              <h3 className="text-2xl font-black text-slate-900 mb-4">Análise de Compatibilidade Amorosa – Essencial</h3>
              <p className="text-red-500 line-through mb-8 font-black text-lg">R$97</p>
              <ul className="space-y-4 mb-10">
                <li className="flex items-center gap-3 font-medium text-slate-700"><CheckCircle2 className="w-5 h-5 text-emerald-500" /> Análise entre duas pessoas</li>
                <li className="flex items-center gap-3 font-medium text-slate-700"><CheckCircle2 className="w-5 h-5 text-emerald-500" /> Leitura básica da dinâmica</li>
                <li className="flex items-center gap-3 font-medium text-slate-700"><CheckCircle2 className="w-5 h-5 text-emerald-500" /> Identificação de conflitos</li>
                <li className="flex items-center gap-3 font-medium text-slate-700"><CheckCircle2 className="w-5 h-5 text-emerald-500" /> Uso ilimitado</li>
              </ul>
              <div className="text-4xl font-black text-slate-900 mb-8">R$10</div>
              <CTAButton text="SIM! QUERO ACESSAR AGORA" variant="green" className="w-full" onClick={() => setIsUpsellOpen(true)} />
            </div>

            {/* Premium */}
            <div ref={premiumPlanRef} className="bg-slate-900 p-8 md:p-10 rounded-3xl border-2 border-green-400 shadow-2xl relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-400 text-slate-950 font-black px-6 py-1 rounded-full text-sm uppercase tracking-widest shadow-lg">
                ⭐ Mais popular
              </div>
              <h3 className="text-2xl font-black text-white mb-4">Scanner de Compatibilidade Amorosa – Premium</h3>
              <p className="text-slate-300 mb-8 font-medium">Aplicativo completo com análise numerológica avançada. A versão premium faz uma análise muito mais profunda da compatibilidade e revela também com quem você realmente combina.</p>
              <ul className="space-y-4 mb-10">
                <li className="flex items-center gap-3 font-medium text-slate-100"><CheckCircle2 className="w-5 h-5 text-green-400" /> Tudo do plano essencial + <span className="text-red-500 line-through font-normal">R$97</span></li>
                <li className="flex items-center gap-3 font-medium text-slate-100"><CheckCircle2 className="w-5 h-5 text-green-400" /> Lista de números ideais para namoro <span className="text-red-500 line-through font-normal">R$27</span></li>
                <li className="flex items-center gap-3 font-medium text-slate-100"><CheckCircle2 className="w-5 h-5 text-green-400" /> Lista de números ideais para casamento <span className="text-red-500 line-through font-normal">R$27</span></li>
                <li className="flex items-center gap-3 font-medium text-slate-100"><CheckCircle2 className="w-5 h-5 text-green-400" /> Alerta de números com conflitos <span className="text-red-500 line-through font-normal">R$37</span></li>
                <li className="flex items-center gap-3 font-medium text-slate-100"><CheckCircle2 className="w-5 h-5 text-green-400" /> Porcentagem de compatibilidade (0-99%)</li>
                <li className="flex items-center gap-3 font-medium text-slate-100"><CheckCircle2 className="w-5 h-5 text-green-400" /> Análise dos 3 pilares do relacionamento <span className="text-red-500 line-through font-normal">R$47</span></li>
                <li className="flex items-center gap-3 font-medium text-slate-100"><CheckCircle2 className="w-5 h-5 text-green-400" /> Mini análise "Tira-Teima" <span className="text-red-500 line-through font-normal">R$37</span></li>
              </ul>
              
              {/* Bônus */}
              <div className="bg-slate-950 p-6 rounded-2xl border-2 border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.3)] mb-10">
                <p className="font-black text-amber-100 mb-4 flex items-center gap-2">
                  <span className="text-2xl">🎁</span> Bônus da versão Premium <span className="text-red-500 line-through font-normal">R$97</span>
                </p>
                <ul className="space-y-2 text-slate-200 font-medium">
                  <li className="flex items-center gap-2"><span className="text-xl">🤝</span> Compatibilidade de amizade</li>
                  <li className="flex items-center gap-2"><span className="text-xl">💼</span> Compatibilidade para sociedade / negócios</li>
                </ul>
              </div>

              <div className="text-center mb-8">
                <p className="text-slate-400 font-medium line-through">De R$369</p>
                <p className="text-white font-medium">você vai investir somente</p>
                <div className="text-6xl font-black text-white">R$27,00</div>
              </div>
              <CTAButton text="SIM! QUERO ACESSAR AGORA" variant="green" className="w-full" onClick={handlePremiumCheckout} />
              <ScarcityCounter />
            </div>
          </div>
          <div className="mt-12 text-center space-y-4">
            <p className="text-lg font-bold text-slate-800">
              👉 Aproveite agora. Você NÃO vai encontrar essa oferta depois.
            </p>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm inline-block">
              <p className="text-slate-700 font-medium">
                <span className="font-black text-emerald-600">Risco ZERO</span> Use a vontade por 7 dias. 
                Se você não gostar do aplicativo, basta pedir o seu dinheiro de volta.
              </p>
            </div>
            <div className="pt-6">
              <CTAButton text="QUERO ACESSO IMEDIATO" variant="green" className="w-full max-w-md" onClick={() => window.location.href = 'https://pay.hotmart.com/D104967142B?checkoutMode=10'} />
            </div>
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
