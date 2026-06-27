import React, { useState, useEffect } from "react";
import { 
  Menu, 
  Terminal as TerminalIcon, 
  Settings, 
  Clock, 
  DollarSign, 
  Briefcase, 
  Code, 
  Users, 
  Send, 
  Cpu, 
  CheckCircle, 
  ExternalLink,
  ChevronRight,
  Coffee,
  HelpCircle,
  TrendingUp,
  Workflow,
  Sparkles
} from "lucide-react";
import Card from "./Card";
import { motion, AnimatePresence } from "motion/react";

interface HomeViewProps {
  language: "es" | "en";
  theme: "light" | "dark";
  onTabChange?: (tab: string) => void;
}

// BILINGUAL COPY DICTIONARY FOR HIGH PRECISION
const TEXTS = {
  es: {
    heroKicker: "ESTUDIO DE SOFTWARE INDEPENDIENTE // DOS INGENIEROS SENIOR",
    heroTitle: "Construimos software de escala mundial en porciones pequeñas y perfectas.",
    heroSub: "Laura Carelli (Staff Engineer) y Nicolás Sarfati (Software Architect). Diseñamos backend hermético, APIs de alta frecuencia, aplicaciones móviles fluidas y automatización continua. Sin intermediarios, sin reuniones inútiles. Código puro, grado producción.",
    seeServices: "Ver el Menú de Servicios",
    bookCall: "Agendar una Llamada",
    humanAfterAll: "humanos después de todo · 100% libre de código genérico sin alma",

    servicesTitle: "Menú de Servicios",
    servicesSubtitle: "01 // THE MENU · SELECCIONA TU PORCIÓN",
    servicesDesc: "No vendemos horas de desarrollo corporativas infladas. Ofrecemos módulos de software cerrados y de calidad garantizada para resolver desafíos de alta complejidad:",
    backendTitle: "Arquitectura & Backend Hermético",
    backendDesc: "Motores robustos en Go, Kotlin o Node con esquemas Postgres/Firestore minuciosamente indexados. Cero fugas de memoria, tolerancia al fallo total.",
    perfTitle: "Afinamiento de Rendimiento Extremo",
    perfDesc: "Análisis de cuellos de botella en DB, balanceo de queries y optimización de latencia en APIs. Bajamos tiempos de carga de segundos a milisegundos.",
    mobileTitle: "Motores Móviles de Alta Tasa (120 FPS)",
    mobileDesc: "Aplicaciones nativas e híbridas optimizadas (Flutter/Compose). Estabilidad de render, caches eficientes offline y layouts ultra-fluidos.",
    autoTitle: "Automatización & CI/CD Continuo",
    autoDesc: "Pipelines herméticos con contenedores aislados que corren suites completas de tests en segundos. Despliegues automatizados sin estrés.",
    rescueTitle: "Rescate de Proyectos Críticos",
    rescueDesc: "Intervención rápida en codebases atascadas, refactor de arquitecturas frágiles y estabilización técnica de sistemas en producción.",

    howWeWorkTitle: "Metodología del Estudio",
    howWeWorkSubtitle: "02 // PROCESS · CÓMO HORNEAMOS EL CÓDIGO",
    how1Title: "Planificar antes de codificar",
    how1Desc: "Entregamos un plano técnico detallado de la solución propuesta antes de escribir la primera línea de código. Alineación de arquitectura garantizada.",
    how2Title: "Suite de pruebas automatizadas",
    how2Desc: "Todo entregable incluye tests automatizados unitarios y de integración reales. Si no se puede probar, no está terminado.",
    how3Title: "Documentación impecable",
    how3Desc: "Proporcionamos diagramas de arquitectura interactivos y especificaciones de API en OpenAPI/Swagger. El código que entregamos se entiende.",
    how4Title: "Entregas paulatinas y acordadas",
    how4Desc: "Trabajamos en hitos pequeños y semanales. Siempre tienes acceso a un entorno de staging vivo para probar los avances.",
    how5Title: "AI-Augmented Engineering",
    how5Desc: "Apalancamos copilotos y prompts personalizados para acelerar el boilerplate, permitiéndonos centrar el 100% de nuestra atención en la arquitectura compleja.",

    whoTitle: "Los Arquitectos",
    whoSubtitle: "03 // FOUNDERS · INGENIERÍA RIGUROSA",
    lauraDesc: "Laura se destaca en la orquestación de sistemas distribuidos, desarrollo de plataformas móviles seguras y automatización de la infraestructura. Con experiencia liderando equipos en fintechs globales, tiene un apetito insaciable por la elegancia en el código.",
    nicoDesc: "Nicolás vive y respira rendimiento. Especialista en auditoría de bases de datos de alto volumen, pipelines de datos en tiempo real y sistemas tolerantes a fallos extremos. Si algo tarda más de 20ms en responder, Nicolás no duerme.",

    ratesTitle: "Tarifas Transparentes",
    ratesSubtitle: "04 // TRANSPARENCY · SIN FACTURAS INFLADAS",
    ratesDesc: "Sin sorpresas ni cargos administrativos ocultos. Tarifas claras facturadas en USD por sprint o hitos fijos:",
    devTier: "Hito de Desarrollo Puro",
    devPrice: "$40 / hr",
    devScope: "Construcción e implementación directa sobre arquitecturas ya definidas. Ideal para expandir features de sistemas existentes con tests de calidad.",
    engTier: "Ingeniería + Arquitectura Avanzada",
    engPrice: "$50 / hr",
    engScope: "Nuestra recomendación. Incluye diseño técnico, planeación de base de datos, implementación de backend modular y documentación total.",
    leadTier: "Dirección de Plataforma Completa",
    leadPrice: "$65 / hr",
    leadScope: "Diseño integral de sistemas complejos, configuración de infraestructura en la nube multi-zona, liderazgo técnico y rescue de proyectos.",
    mostValue: "MÁS RECOMENDADO",

    workTitle: "Trabajos Destacados",
    workSubtitle: "05 // CASE STUDIES · CASOS REALES",
    project1Title: "Ashvattha Yoga Engine",
    project1Desc: "Aplicación móvil multiplataforma completa con reproducción de video en tiempo real, pasarela de cobros internacional, sincronización offline de progreso y compresión inteligente en la nube. Locked 60fps en Android y iOS.",
    project2Title: "Archivador de Planificación Técnica",
    project2Desc: "Una biblioteca modular que automatiza la sincronización de tableros de gestión con diagramas de base de datos Postgres. Diseñada para mantener a los equipos técnicos alineados sin reuniones administrativas.",

    stackTitle: "Nuestras Herramientas",
    stackSubtitle: "06 // TECH STACK · EL SOPORTE DIGITAL",
    stackDesc: "Seleccionamos tecnología moderna y probada en producción. Haz clic en cualquier ingrediente para ver por qué lo elegimos:",

    contactTitle: "Inicia el Contacto",
    contactSubtitle: "07 // DIRECT TRUNK · HABLEMOS DE SOFTWARE",
    contactDesc: "Escríbenos directamente o agenda una reunión corta de 15 minutos para entender tu desafío. Responderemos en menos de 24 horas hábiles.",
    nameLabel: "Tu Nombre",
    emailLabel: "Tu Email de Negocios",
    msgLabel: "Cuéntanos sobre tu proyecto o cuello de botella",
    sendBtn: "Enviar Mensaje de Ingeniería",
    sending: "Transmitiendo...",
    successMsg: "¡Mensaje transmitido! Nos pondremos en contacto contigo en breve para analizar el proyecto.",
    errorMsg: "Error al transmitir el mensaje. Por favor intenta de nuevo.",
    bookBtn: "Agendar Llamada Directa (15 Minutos)",
    footerNotice: "small bites, production-grade."
  },
  en: {
    heroKicker: "INDEPENDENT SOFTWARE STUDIO // TWO SENIOR ENGINEERS",
    heroTitle: "We build world-class software, in small, perfect portions.",
    heroSub: "Laura Carelli (Staff Engineer) & Nicolás Sarfati (Software Architect). We design rock-solid backends, high-frequency APIs, fluid mobile applications, and continuous automation. No middlemen, no useless meetings. Pure, production-grade code.",
    seeServices: "View the Services Menu",
    bookCall: "Book a 15-Min Call",
    humanAfterAll: "human after all · 100% free of soulless generic AI boilerplate",

    servicesTitle: "Services Menu",
    servicesSubtitle: "01 // THE MENU · SELECT YOUR BITE",
    servicesDesc: "We don't sell bloated corporate developer hours. We offer cohesive, guarantee-backed software modules to solve high-complexity technical challenges:",
    backendTitle: "Rock-Solid Architecture & Backend",
    backendDesc: "Robust engines in Go, Kotlin, or Node with meticulously indexed Postgres/Firestore schemas. Zero memory leaks, absolute fault tolerance.",
    perfTitle: "Extreme Performance Tuning",
    perfDesc: "Analysis of DB bottlenecks, query balancing, and API latency optimization. We reduce response times from seconds to single-digit milliseconds.",
    mobileTitle: "High Frame-Rate Mobile Engines (120 FPS)",
    mobileDesc: "Optimized native and hybrid applications (Flutter/Compose). Render stability, efficient offline caching, and ultra-fluid layouts.",
    autoTitle: "Seamless Automation & CI/CD",
    autoDesc: "Hermetic pipelines with isolated containers running complete test suites in seconds. Zero-stress automated production deployments.",
    rescueTitle: "Critical Project Rescue",
    rescueDesc: "Rapid intervention in stuck codebases, refactoring fragile architectures, and technically stabilizing production systems.",

    howWeWorkTitle: "Studio Methodology",
    howWeWorkSubtitle: "02 // PROCESS · HOW WE BAKE CODE",
    how1Title: "Plan before coding",
    how1Desc: "We deliver a detailed technical blueprint of the proposed solution before writing a single line of code. Guaranteed architecture alignment.",
    how2Title: "Automated test suite",
    how2Desc: "Every deliverable includes genuine automated unit and integration tests. If it cannot be tested, it is not completed.",
    how3Title: "Impeccable documentation",
    how3Desc: "We provide interactive architecture diagrams and clean OpenAPI/Swagger API specifications. The code we ship is understandable.",
    how4Title: "Incremental, agreed deliveries",
    how4Desc: "We work in small, weekly milestones. You always have access to a live staging environment to play and test progress.",
    how5Title: "AI-Augmented Engineering",
    how5Desc: "We leverage custom prompts and co-pilots to eliminate trivial boilerplate, focusing 100% of our attention on solving high-complexity problems.",

    whoTitle: "The Architects",
    whoSubtitle: "03 // FOUNDERS · RIGOROUS ENGINEERING",
    lauraDesc: "Laura excels in distributed system orchestration, secure mobile platform development, and infrastructure automation. With a history of leading engineering teams in global fintechs, she has an insatiable appetite for clean code.",
    nicoDesc: "Nicolás lives and breathes performance. Specializing in high-volume database auditing, real-time data pipelines, and extreme fault tolerance. If any server takes more than 20ms to respond, Nicolás doesn't sleep.",

    ratesTitle: "Transparent Rates",
    ratesSubtitle: "04 // TRANSPARENCY · NO INFLATED BILLS",
    ratesDesc: "No surprises or hidden administrative fees. Simple, honest rates billed in USD per sprint or fixed milestones:",
    devTier: "Pure Development Milestone",
    devPrice: "$40 / hr",
    devScope: "Direct implementation on already defined architectures. Ideal for expanding features of existing systems with clean testing.",
    engTier: "Engineering + Advanced Architecture",
    engPrice: "$50 / hr",
    engScope: "Our top recommendation. Includes technical design, database planning, modular backend implementation, and total documentation.",
    leadTier: "Full Platform Leadership",
    leadPrice: "$65 / hr",
    leadScope: "Integral design of complex systems, cloud infrastructure setup, technical leadership, and emergency project rescue.",
    mostValue: "MOST POPULAR",

    workTitle: "Featured Work",
    workSubtitle: "05 // CASE STUDIES · PROVEN IMPACT",
    project1Title: "Ashvattha Yoga Engine",
    project1Desc: "Complete cross-platform mobile application featuring real-time video playback, international billing integration, offline progress sync, and intelligent cloud compression. Locked 60fps on Android & iOS.",
    project2Title: "Technical Planning Ledger",
    project2Desc: "A modular package that automates the synchronization of board workflows with Postgres schemas. Engineered to keep developers aligned without administrative friction.",

    stackTitle: "Our Toolbelt",
    stackSubtitle: "06 // TECH STACK · DIGITAL FOUNDATION",
    stackDesc: "We select modern, production-proven tools. Click on any ingredient to see why we selected it:",

    contactTitle: "Initiate Trunk Connection",
    contactSubtitle: "07 // DIRECT TRUNK · LET'S DISCUSS SOFTWARE",
    contactDesc: "Write to us directly or book a quick 15-minute call to analyze your bottleneck. We reply in less than 24 business hours.",
    nameLabel: "Your Name",
    emailLabel: "Your Business Email",
    msgLabel: "Tell us about your project or bottleneck",
    sendBtn: "Transmit Engineering Request",
    sending: "Transmitting...",
    successMsg: "Message transmitted successfully! We'll be in touch shortly to analyze your system.",
    errorMsg: "Failed to transmit message. Please try again.",
    bookBtn: "Book Direct Call (15 Minutes)",
    footerNotice: "small bites, production-grade."
  }
};

const TECH_DETAILS = {
  Go: {
    es: "Preferido para APIs de altísimo rendimiento, microservicios hiper-livianos y concurrencia segura con goroutines.",
    en: "Preferred for hyper-performant APIs, lightweight microservices, and rock-solid concurrency via native goroutines."
  },
  Kotlin: {
    es: "Nuestra herramienta favorita para el ecosistema JVM. Código expresivo, seguro ante nulos y perfecto con corrutinas.",
    en: "Our favorite tool for the JVM ecosystem. Expressive code, null-safe type system, and perfect coroutine management."
  },
  Flutter: {
    es: "Ideal para prototipar e implementar aplicaciones multiplataforma con fidelidad de píxel y animaciones a 120Hz sin lags.",
    en: "Excellent for building multiplatform client-side experiences with pixel perfection and zero-lag 120Hz animation loops."
  },
  TypeScript: {
    es: "Soporte de tipado estricto para todo el ciclo frontend y serverless. Facilita la mantenibilidad a largo plazo.",
    en: "Strict type safety across the entire web frontend and serverless layers. Greatly simplifies long-term codebase maintenance."
  },
  Docker: {
    es: "Contenedores consistentes. Nos asegura que el código corre en tu staging y producción idéntico a nuestras máquinas locales.",
    en: "Consistent containerization. Ensures your staging and production environments operate identical to our local machines."
  },
  PostgreSQL: {
    es: "Nuestra base de datos relacional de elección. Indexación personalizada, soporte JSONB óptimo y robustez inquebrantable.",
    en: "Our relational database of choice. Deep indexing control, native JSONB support, and bulletproof relational integrity."
  },
  "Google Cloud": {
    es: "Infraestructura Serverless (Cloud Run, Cloud Functions) para escalar a cero y optimizar el costo mensual del cliente.",
    en: "Serverless infrastructure (Cloud Run, Cloud Functions) to scale down to zero and optimize client hosting expenditures."
  },
  "Vite + React": {
    es: "Compilación instantánea para SPAs limpias, rápidas, sin la sobrecarga ni demoras de frameworks monolíticos.",
    en: "Blazing fast builds for single-page applications. Delivers snappy clients without monolithic framework weight."
  }
};

export default function HomeView({ language, theme, onTabChange }: HomeViewProps) {
  const t = TEXTS[language];
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  
  // Interactive Terminal state
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    "❯ snack-factory init --studio",
    "Initializing Laura & Nicolás profile cores... OK",
    "Establishing direct billing channel: USD... OK",
    "Running code texture analysis... 0 errors, 100% coverage",
    "❯ bake-system --flavor=production",
    "Baking: backend Go microservice... READY [22ms]",
    "Baking: mobile Flutter UI engine... READY [120 FPS]",
    "Sprinkling: mint performance sprinkles... COMPLETED"
  ]);
  const [terminalInput, setTerminalInput] = useState("");

  // Contact Form state
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMsg, setContactMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<"success" | "error" | null>(null);

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;

    const cmd = terminalInput.trim().toLowerCase();
    let reply = `Command not found: ${cmd}. Type 'help' for available snacks.`;

    if (cmd === "help") {
      reply = language === "es" 
        ? "Available commands: 'menu' (services), 'team' (Laura & Nico), 'blog' (dev thoughts), 'bake' (refresh cookie), 'clear'"
        : "Available commands: 'menu' (services), 'team' (profiles), 'blog' (latest bytes), 'bake' (refresh state), 'clear'";
    } else if (cmd === "menu" || cmd === "services") {
      reply = language === "es"
        ? "Baking menus: [01 Backend] [02 Perf Tuning] [03 Mobile] [04 Automation] [05 Rescue]"
        : "Baking menus: [01 Backend] [02 Perf Tuning] [03 Mobile] [04 Automation] [05 Rescue]";
    } else if (cmd === "team") {
      reply = "Laura Carelli (Tech Lead, Staff JVM) & Nicolás Sarfati (Scalability & DB Performance Architect)";
    } else if (cmd === "blog") {
      reply = language === "es"
        ? "Redirecting mental bytes... Check our Development Thoughts tab!"
        : "Redirecting mental bytes... Head over to the Blog tab above!";
    } else if (cmd === "bake") {
      reply = "Baking fresh cookies... 🍪 Sprinkles applied successfully! Bite taken!";
    } else if (cmd === "clear") {
      setTerminalHistory([]);
      setTerminalInput("");
      return;
    }

    setTerminalHistory((prev) => [...prev, `❯ ${terminalInput}`, reply]);
    setTerminalInput("");
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMsg) return;

    setIsSubmitting(true);
    setSubmitResult(null);

    // Simulate sending message to backend
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitResult("success");
      setContactName("");
      setContactEmail("");
      setContactMsg("");
    }, 1200);
  };

  return (
    <div className="space-y-24 animate-fadeIn" id="home-view-container">
      
      {/* 1. HERO SECTION: Asymmetrical Split */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[75vh]" id="hero-section">
        <div className="lg:col-span-7 space-y-6">
          <span className="font-mono text-[10px] text-violet-600 dark:text-emerald-400 font-bold uppercase tracking-widest block bg-[#8b5a2b]/5 dark:bg-[#e28743]/5 py-1.5 px-3 rounded-md w-fit border border-[#8b5a2b]/10 dark:border-[#e28743]/10">
            {t.heroKicker}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-extrabold text-neutral-900 dark:text-white leading-none tracking-tight">
            {language === "es" ? (
              <>
                Construimos software <span className="italic text-[#8b5a2b] dark:text-[#e28743]">de escala mundial</span> en porciones pequeñas.
              </>
            ) : (
              <>
                We build world-class software, in <span className="italic text-[#8b5a2b] dark:text-[#e28743]">small, perfect</span> portions.
              </>
            )}
          </h1>
          <p className="text-base md:text-lg text-slate-600 dark:text-neutral-300 leading-relaxed font-sans max-w-2xl">
            {t.heroSub}
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="#services-menu"
              className="px-6 py-3.5 bg-[#8b5a2b] hover:bg-[#70441e] dark:bg-[#e28743] dark:hover:bg-[#d97706] text-white dark:text-[#1b120f] font-mono text-xs font-bold rounded-xl shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center space-x-2"
            >
              <Menu className="w-4 h-4" />
              <span>{t.seeServices}</span>
            </a>
            <a
              href="#contact-section"
              className="px-6 py-3.5 bg-white dark:bg-stone-900 border border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-stone-300 font-mono text-xs font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-stone-950 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center space-x-2"
            >
              <Clock className="w-4 h-4" />
              <span>{t.bookCall}</span>
            </a>
          </div>

          <p className="font-mono text-[9px] uppercase tracking-widest text-neutral-400 dark:text-neutral-500 pt-3">
            🛸 {t.humanAfterAll}
          </p>
        </div>

        {/* Dynamic Interactive Terminal (The Hero moment!) */}
        <div className="lg:col-span-5 h-full flex flex-col justify-center" id="hero-interactive-terminal">
          <div className="bg-[#1b120f] border-2 border-[#e28743] rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[340px] relative">
            
            {/* Terminal Header */}
            <div className="bg-[#291c18] border-b-2 border-[#e28743] px-4 py-2 flex items-center justify-between font-mono text-[9px] text-[#e28743]">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded bg-[#f43f5e]" />
                <span className="w-2.5 h-2.5 rounded bg-[#10b981]" />
                <span className="w-2.5 h-2.5 rounded bg-[#06b6d4]" />
              </div>
              <span className="font-bold tracking-widest">SNACK_TERMINAL // C://BAKERY</span>
              <span className="text-zinc-500">v1.2</span>
            </div>

            {/* Terminal Monitor lines */}
            <div className="p-4 flex-grow overflow-y-auto font-mono text-[11px] text-[#fdfbf7]/90 space-y-2 scrollbar-thin scrollbar-thumb-zinc-800">
              {terminalHistory.map((line, idx) => (
                <div key={idx} className={line.startsWith("❯") ? "text-[#e28743] font-bold" : "text-emerald-400/90"}>
                  {line}
                </div>
              ))}
            </div>

            {/* Terminal Input Form */}
            <form onSubmit={handleTerminalSubmit} className="bg-[#110b0a] border-t border-[#e28743]/30 px-3 py-2 flex items-center">
              <span className="font-mono text-xs text-[#e28743] mr-2">❯</span>
              <input
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                placeholder={language === "es" ? "Escribe 'help' para comandos..." : "Type 'help' for commands..."}
                className="w-full bg-transparent border-none text-[11px] font-mono text-stone-100 focus:outline-none"
              />
            </form>
          </div>
        </div>
      </section>

      {/* 2. SERVICES SECTION: Redesigned as a Cohesive restaurant menu */}
      <section className="space-y-10 scroll-mt-24" id="services-menu">
        <div className="text-center space-y-2">
          <span className="font-mono text-xs text-[#8b5a2b] dark:text-[#e28743] font-bold uppercase tracking-widest">
            {t.servicesSubtitle}
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-neutral-900 dark:text-stone-50 italic">
            {t.servicesTitle}
          </h2>
          <p className="text-sm text-slate-500 dark:text-neutral-400 max-w-2xl mx-auto">
            {t.servicesDesc}
          </p>
        </div>

        {/* Menu list treatment */}
        <div className="max-w-4xl mx-auto bg-[#faf6f0]/40 dark:bg-[#1b120f]/20 border border-slate-200/60 dark:border-zinc-800/60 rounded-3xl p-4 md:p-8 space-y-4">
          <Card variant="menu" title={t.backendTitle} subtitle="BACKEND ARCHITECTURE // GO · KOTLIN" extraLabel="PORTION FIXED" sprinkleColor="mint">
            {t.backendDesc}
          </Card>
          <Card variant="menu" title={t.perfTitle} subtitle="API OPTIMIZATION // SINGLE-DIGIT LATENCY" extraLabel="TIME & MATERIAL" sprinkleColor="strawberry">
            {t.perfDesc}
          </Card>
          <Card variant="menu" title={t.mobileTitle} subtitle="MOBILE ENGINE // FLUTTER · JETPACK" extraLabel="PORTION FIXED" sprinkleColor="blueberry">
            {t.mobileDesc}
          </Card>
          <Card variant="menu" title={t.autoTitle} subtitle="INFRASTRUCTURE // ISOLATED CONTAINERS" extraLabel="PORTION FIXED" sprinkleColor="mint">
            {t.autoDesc}
          </Card>
          <Card variant="menu" title={t.rescueTitle} subtitle="PROJECT HEALTH // CODE STABILIZATION" extraLabel="EMERGENCY HOURLY" sprinkleColor="strawberry">
            {t.rescueDesc}
          </Card>
        </div>
      </section>

      {/* 3. PROCESS/HOW WE WORK: Staggered Stepping cards */}
      <section className="space-y-12" id="how-we-work">
        <div className="text-center space-y-2">
          <span className="font-mono text-xs text-violet-600 dark:text-emerald-400 font-bold uppercase tracking-widest">
            {t.howWeWorkSubtitle}
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-neutral-900 dark:text-stone-50 italic">
            {t.howWeWorkTitle}
          </h2>
        </div>

        {/* Staggered process grid with custom cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="md:translate-y-0">
            <Card variant="cookie" title={t.how1Title} subtitle="STEP 01 // BLUEPRINT" sprinkleColor="mint" className="h-full">
              {t.how1Desc}
            </Card>
          </div>
          <div className="md:translate-y-4">
            <Card variant="cookie" title={t.how2Title} subtitle="STEP 02 // RIGOR" sprinkleColor="strawberry" className="h-full">
              {t.how2Desc}
            </Card>
          </div>
          <div className="md:translate-y-8">
            <Card variant="cookie" title={t.how3Title} subtitle="STEP 03 // CLARITY" sprinkleColor="blueberry" className="h-full">
              {t.how3Desc}
            </Card>
          </div>
          <div className="md:translate-y-12">
            <Card variant="cookie" title={t.how4Title} subtitle="STEP 04 // FLOW" sprinkleColor="mint" className="h-full">
              {t.how4Desc}
            </Card>
          </div>
          <div className="md:translate-y-16">
            <Card variant="cookie" title={t.how5Title} subtitle="STEP 05 // VELOCITY" sprinkleColor="strawberry" className="h-full">
              {t.how5Desc}
            </Card>
          </div>
        </div>

        {/* Spacer to prevent overlap on subsequent sections due to translate-y offsets */}
        <div className="hidden md:block h-16" />
      </section>

      {/* 4. WHO WE ARE: High-end Profiles */}
      <section className="space-y-10" id="founders-profiles">
        <div className="text-center space-y-2">
          <span className="font-mono text-xs text-[#8b5a2b] dark:text-[#e28743] font-bold uppercase tracking-widest">
            {t.whoSubtitle}
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-neutral-900 dark:text-stone-50 italic">
            {t.whoTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Laura */}
          <Card variant="profile" title="Laura Carelli" subtitle="STAFF ENGINEER & TECH LEAD" sprinkleColor="strawberry">
            <p className="text-sm text-slate-600 dark:text-neutral-300 mb-4">
              {t.lauraDesc}
            </p>
            <div className="flex items-center space-x-3 text-xs font-mono text-[#8b5a2b] dark:text-[#e28743] border-t border-slate-200/60 dark:border-zinc-800/40 pt-4">
              <span className="font-bold">SPECS:</span>
              <span>Go, Kotlin, JVM, Docker, Flutter, GCP, Android</span>
            </div>
          </Card>

          {/* Nicolás */}
          <Card variant="profile" title="Nicolás Sarfati" subtitle="SOFTWARE ARCHITECT & PERF SPECIALIST" sprinkleColor="mint">
            <p className="text-sm text-slate-600 dark:text-neutral-300 mb-4">
              {t.nicoDesc}
            </p>
            <div className="flex items-center space-x-3 text-xs font-mono text-[#8b5a2b] dark:text-[#e28743] border-t border-slate-200/60 dark:border-zinc-800/40 pt-4">
              <span className="font-bold">SPECS:</span>
              <span>Go, PostgreSQL, Redis, Kubernetes, CI/CD, Linux, JVM</span>
            </div>
          </Card>
        </div>
      </section>

      {/* 5. RATES: Vending Machine Tier Comparison */}
      <section className="space-y-10" id="pricing-rates">
        <div className="text-center space-y-2">
          <span className="font-mono text-xs text-violet-600 dark:text-emerald-400 font-bold uppercase tracking-widest">
            {t.ratesSubtitle}
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-neutral-900 dark:text-stone-50 italic">
            {t.ratesTitle}
          </h2>
          <p className="text-sm text-slate-500 dark:text-neutral-400 max-w-2xl mx-auto">
            {t.ratesDesc}
          </p>
        </div>

        {/* 3 tier columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Tier 1 */}
          <Card variant="terminal" title={t.devTier} extraLabel="TIER 01">
            <div className="space-y-6">
              <div className="border-b border-slate-100 dark:border-zinc-800/60 pb-4">
                <span className="text-4xl font-serif font-extrabold text-[#8b5a2b] dark:text-[#e28743] italic">
                  {t.devPrice}
                </span>
                <span className="text-xs text-neutral-400 ml-1 font-mono">/ {language === "es" ? "hora" : "hour"}</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-neutral-300 h-24">
                {t.devScope}
              </p>
              <div className="pt-2">
                <span className="font-mono text-[10px] text-neutral-400 block mb-1">❯ SPECS GUARANTEED:</span>
                <ul className="text-xs font-mono text-neutral-500 space-y-1 list-disc list-inside">
                  <li>Pure implementation</li>
                  <li>Unit tests coverage</li>
                  <li>Git branch alignment</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Tier 2 */}
          <Card variant="terminal" title={t.engTier} extraLabel="TIER 02 · HOST RECOMMENDED" sprinkleColor="mint">
            <div className="space-y-6">
              <div className="border-b border-slate-100 dark:border-zinc-800/60 pb-4 flex items-center justify-between">
                <div>
                  <span className="text-4xl font-serif font-extrabold text-[#8b5a2b] dark:text-[#e28743] italic">
                    {t.engPrice}
                  </span>
                  <span className="text-xs text-neutral-400 ml-1 font-mono">/ {language === "es" ? "hora" : "hour"}</span>
                </div>
                <span className="text-[9px] bg-emerald-400/15 text-emerald-500 font-mono font-bold px-2 py-0.5 rounded border border-emerald-500/20">
                  {t.mostValue}
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-neutral-300 h-24">
                {t.engScope}
              </p>
              <div className="pt-2">
                <span className="font-mono text-[10px] text-neutral-400 block mb-1">❯ SPECS GUARANTEED:</span>
                <ul className="text-xs font-mono text-neutral-500 space-y-1 list-disc list-inside">
                  <li>DB architecture planning</li>
                  <li>Integration test pipelines</li>
                  <li>Detailed technical plans</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Tier 3 */}
          <Card variant="terminal" title={t.leadTier} extraLabel="TIER 03">
            <div className="space-y-6">
              <div className="border-b border-slate-100 dark:border-zinc-800/60 pb-4">
                <span className="text-4xl font-serif font-extrabold text-[#8b5a2b] dark:text-[#e28743] italic">
                  {t.leadPrice}
                </span>
                <span className="text-xs text-neutral-400 ml-1 font-mono">/ {language === "es" ? "hora" : "hour"}</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-neutral-300 h-24">
                {t.leadScope}
              </p>
              <div className="pt-2">
                <span className="font-mono text-[10px] text-neutral-400 block mb-1">❯ SPECS GUARANTEED:</span>
                <ul className="text-xs font-mono text-neutral-500 space-y-1 list-disc list-inside">
                  <li>Multi-zone hosting infra</li>
                  <li>Technical leadership</li>
                  <li>Emergency project intervention</li>
                </ul>
              </div>
            </div>
          </Card>

        </div>
      </section>

      {/* 6. WORK & CASE STUDIES: Asymmetric Showcase */}
      <section className="space-y-10" id="portfolio-work">
        <div className="text-center space-y-2">
          <span className="font-mono text-xs text-[#8b5a2b] dark:text-[#e28743] font-bold uppercase tracking-widest">
            {t.workSubtitle}
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-neutral-900 dark:text-stone-50 italic">
            {t.workTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 max-w-5xl mx-auto">
          {/* Project 1 */}
          <div className="md:col-span-7">
            <Card variant="cookie" title={t.project1Title} subtitle="CASE STUDY // MOBILE PRODUCTION ENGINE" sprinkleColor="strawberry" className="h-full">
              <p className="text-sm text-slate-600 dark:text-neutral-300 leading-relaxed mb-6">
                {t.project1Desc}
              </p>
              <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100 dark:border-zinc-800/60">
                <span className="px-2.5 py-0.5 bg-neutral-100 dark:bg-stone-900 rounded font-mono text-[10px] text-neutral-400">#Flutter</span>
                <span className="px-2.5 py-0.5 bg-neutral-100 dark:bg-stone-900 rounded font-mono text-[10px] text-neutral-400">#NodeJS</span>
                <span className="px-2.5 py-0.5 bg-neutral-100 dark:bg-stone-900 rounded font-mono text-[10px] text-neutral-400">#HLS Video</span>
              </div>
            </Card>
          </div>

          {/* Project 2 */}
          <div className="md:col-span-5">
            <Card variant="cookie" title={t.project2Title} subtitle="CASE STUDY // AUTOMATION LIBRARY" sprinkleColor="blueberry" className="h-full">
              <p className="text-sm text-slate-600 dark:text-neutral-300 leading-relaxed mb-6">
                {t.project2Desc}
              </p>
              <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100 dark:border-zinc-800/60">
                <span className="px-2.5 py-0.5 bg-neutral-100 dark:bg-stone-900 rounded font-mono text-[10px] text-neutral-400">#Go</span>
                <span className="px-2.5 py-0.5 bg-neutral-100 dark:bg-stone-900 rounded font-mono text-[10px] text-neutral-400">#PostgreSQL</span>
                <span className="px-2.5 py-0.5 bg-neutral-100 dark:bg-stone-900 rounded font-mono text-[10px] text-neutral-400">#TypeScript</span>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* 7. TECH STACK: Interactive ingredient shelf */}
      <section className="space-y-10" id="tools-shelf">
        <div className="text-center space-y-2">
          <span className="font-mono text-xs text-violet-600 dark:text-emerald-400 font-bold uppercase tracking-widest">
            {t.stackSubtitle}
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-neutral-900 dark:text-stone-50 italic">
            {t.stackTitle}
          </h2>
          <p className="text-sm text-slate-500 dark:text-neutral-400 max-w-2xl mx-auto">
            {t.stackDesc}
          </p>
        </div>

        {/* Dynamic click tag bar */}
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {Object.keys(TECH_DETAILS).map((tech) => (
              <button
                key={tech}
                onClick={() => setSelectedTech(selectedTech === tech ? null : tech)}
                className={`px-4 py-2 rounded-xl font-mono text-xs font-bold border transition-all duration-300 cursor-pointer ${
                  selectedTech === tech
                    ? "bg-[#8b5a2b] dark:bg-[#e28743] border-transparent text-white dark:text-[#1b120f] scale-105 shadow-md"
                    : "bg-white dark:bg-stone-900/40 border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-stone-300 hover:border-slate-400 dark:hover:border-zinc-600"
                }`}
              >
                ❯ {tech}
              </button>
            ))}
          </div>

          {/* Interactive panel showing why */}
          <AnimatePresence mode="wait">
            {selectedTech && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 p-5 bg-[#faf6f0] dark:bg-[#1b120f] border-2 border-dashed border-[#8b5a2b]/30 dark:border-[#e28743]/30 rounded-xl max-w-xl mx-auto"
              >
                <span className="font-mono text-[9px] text-[#8b5a2b] dark:text-[#e28743] font-bold block mb-1">
                  ❯ WHY WE PREFER {selectedTech.toUpperCase()}:
                </span>
                <p className="text-sm text-slate-700 dark:text-stone-200 leading-relaxed font-sans">
                  {TECH_DETAILS[selectedTech as keyof typeof TECH_DETAILS][language]}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* 8. CONTACT & DIRECT TRUNK: Clean form + calendar trigger */}
      <section className="space-y-12 scroll-mt-24" id="contact-section">
        <div className="text-center space-y-2">
          <span className="font-mono text-xs text-[#8b5a2b] dark:text-[#e28743] font-bold uppercase tracking-widest">
            {t.contactSubtitle}
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-neutral-900 dark:text-stone-50 italic">
            {t.contactTitle}
          </h2>
          <p className="text-sm text-slate-500 dark:text-neutral-400 max-w-xl mx-auto">
            {t.contactDesc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 max-w-4xl mx-auto">
          
          {/* Write directly form */}
          <div className="md:col-span-7 bg-[#fdfbf7] dark:bg-[#170f0d] border border-neutral-200 dark:border-zinc-800 p-6 rounded-2xl shadow-sm">
            <h3 className="font-serif font-bold text-lg text-neutral-900 dark:text-stone-50 mb-4 italic">
              {language === "es" ? "Canal de Entrada Directo" : "Direct Input Channel"}
            </h3>

            {submitResult === "success" && (
              <div className="p-4 bg-green-500/10 text-green-500 border border-green-500/20 rounded-xl text-xs md:text-sm font-mono mb-4 flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 shrink-0" />
                <span>{t.successMsg}</span>
              </div>
            )}

            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider block">
                    {t.nameLabel}
                  </label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Laura / Nicolas"
                    className="w-full px-3 py-2 bg-white dark:bg-stone-900 border border-slate-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:border-[#8b5a2b] dark:focus:border-[#e28743]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider block">
                    {t.emailLabel}
                  </label>
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="clients@company.com"
                    className="w-full px-3 py-2 bg-white dark:bg-stone-900 border border-slate-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:border-[#8b5a2b] dark:focus:border-[#e28743]"
                  />
                </div>
              </div>

              <div className="space-y-1.5 text-xs">
                <label className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider block">
                  {t.msgLabel}
                </label>
                <textarea
                  rows={4}
                  required
                  value={contactMsg}
                  onChange={(e) => setContactMsg(e.target.value)}
                  placeholder={language === "es" ? "Ej: Necesitamos estabilizar una API en Kotlin que soporta 10k RPS..." : "e.g., We need to stabilize a Kotlin API serving 10k requests per second..."}
                  className="w-full px-3 py-2 bg-white dark:bg-stone-900 border border-slate-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:border-[#8b5a2b] dark:focus:border-[#e28743] leading-relaxed"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-[#8b5a2b] hover:bg-[#70441e] dark:bg-[#e28743] dark:hover:bg-[#d97706] text-white dark:text-[#1b120f] font-mono text-xs font-bold rounded-xl shadow transition-all cursor-pointer flex items-center justify-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? t.sending : t.sendBtn}</span>
              </button>
            </form>
          </div>

          {/* Quick links & book call card */}
          <div className="md:col-span-5 flex flex-col justify-between space-y-6">
            <div className="bg-[#faf6f0]/60 dark:bg-[#1b120f]/40 border border-[#f3ede2] dark:border-[#291c18] rounded-2xl p-6 flex-grow flex flex-col justify-between">
              <div className="space-y-4">
                <h3 className="font-serif font-bold text-lg text-neutral-900 dark:text-stone-50 italic">
                  {language === "es" ? "Frecuencias de Radio" : "Radio Frequencies"}
                </h3>
                <div className="space-y-3 font-mono text-[11px] text-neutral-500">
                  <div className="flex justify-between border-b border-slate-100 dark:border-zinc-800 pb-2">
                    <span className="font-bold">EMAIL:</span>
                    <a href="mailto:hello@snack-factory.com" className="text-violet-600 dark:text-emerald-400 hover:underline">hello@snack-factory.com</a>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 dark:border-zinc-800 pb-2">
                    <span className="font-bold">GITHUB:</span>
                    <a href="https://github.com/snack-factory" target="_blank" rel="noreferrer" className="text-violet-600 dark:text-emerald-400 hover:underline flex items-center">github.com/snack-factory <ExternalLink className="w-3 h-3 ml-1" /></a>
                  </div>
                  <div className="flex justify-between pb-2">
                    <span className="font-bold">LOCALIZATION:</span>
                    <span>BA / ARGENTINA (GMT-3) // GLOBAL</span>
                  </div>
                </div>
              </div>

              {/* Booking box button trigger */}
              <div className="pt-6 border-t border-slate-200/50 dark:border-zinc-800/40 mt-6">
                <button
                  onClick={() => alert(language === "es" ? "Conectando al Calendly de snack-factory..." : "Routing connection to snack-factory Calendly...")}
                  className="w-full py-3 bg-white dark:bg-stone-900 border border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-stone-300 font-mono text-[11px] font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-stone-950 transition-all cursor-pointer flex items-center justify-center space-x-2 shadow-sm"
                >
                  <Coffee className="w-4 h-4 text-violet-600 dark:text-emerald-400" />
                  <span>{t.bookBtn}</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
