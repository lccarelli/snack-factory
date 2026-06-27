import React, { useState, useEffect } from "react";
import { 
  BookOpen, 
  Tag, 
  Calendar, 
  Clock, 
  User, 
  PlusCircle, 
  ArrowLeft, 
  ChevronRight, 
  FileText, 
  PenTool, 
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { BlogPost } from "../types";
import Card from "./Card";
import { motion, AnimatePresence } from "motion/react";

interface BlogViewProps {
  language: "es" | "en";
  theme: "light" | "dark";
}

const INITIAL_POSTS: BlogPost[] = [
  {
    id: "post-1",
    title: "El costo oculto de la sobre-ingeniería en startups: por qué preferimos 'bites' compactos",
    summary: "Reflexiones sobre por qué los pipelines de CI/CD gigantes, microservicios prematuros y arquitecturas Kubernetes vacías matan startups. El caso de la simplicidad y el código de alta calidad.",
    content: `## El mito del "Scale-First"

Muchas startups y equipos de ingeniería comienzan proyectos diseñando para 10 millones de usuarios activos diarios desde el día uno. Introducen Kafka, seccionan su lógica en 15 microservicios en un cluster de Kubernetes administrado, y configuran pipelines de CI/CD que tardan 40 minutos en compilar una línea de código.

¿El resultado? El costo de mantenimiento de la infraestructura supera los costos de personal, y agregar un campo nuevo a un formulario requiere sincronizar cinco repositorios distintos y actualizar tres contratos de API.

### En snack-factory diseñamos de otra forma: "bite-sized & pro"

Nuestra filosofía es construir **porciones de software pequeñas, autónomas y de grado de producción absoluto**. Un monorrepo monolítico bien estructurado en Go, TypeScript o Kotlin, corriendo en Cloud Run o VPS livianas, puede soportar un volumen inmenso antes de requerir fraccionamiento.

#### 1. Diseña la base de datos con rigor militar
La mayoría de los cuellos de botella de escalabilidad no provienen del lenguaje, sino de consultas SQL sin índices apropiados o de esquemas desnormalizados sin justificación. Un PostgreSQL bien indexado puede procesar decenas de miles de transacciones por segundo sin inmutarse.

#### 2. Escribe código legible sobre código astuto
El código astuto (clever code) te hace sentir inteligente al escribirlo, pero se convierte en una pesadilla heredada para el que lo mantiene dos meses después. Preferimos la claridad expresiva: funciones puras, inyección de dependencias simple y modularización sensata.

#### 3. Automatización incremental
No necesitas Jenkins o Jenkins pipelines de 500 líneas al inicio. Una simple GitHub Action de 30 líneas que corre linters, tests, compila y despliega directamente a un contenedor listo es todo lo que necesitas para operar al más alto nivel.

Nuestras soluciones internacionales están diseñadas para ejecutarse rápido, depurarse fácil y escalarse cuando el tráfico real lo exija, no cuando el ego del arquitecto lo decida.`,
    author: "nicolas",
    tags: ["architecture", "backend", "performance"],
    date: "2026-06-15",
    readTime: "4 min read",
    sprinkleColor: "mint",
  },
  {
    id: "post-2",
    title: "The Silent Speed-Killer in Flutter & Compose: Re-rendering Pitfalls",
    summary: "How unstable parameters, missing keys, and nested layouts slow down your Android and iOS applications. Let's fix dynamic UI performance together.",
    content: `## Why is my mobile app dropping frames?

When building high-quality Android and iOS applications using cross-platform tools like Flutter or native frameworks like Jetpack Compose, developers often marvel at how fast they can build interfaces. But when they deploy to mid-range devices, scrolling stutter (jank) and battery drain become immediately apparent.

90% of the time, the culprit isn't the framework or the bridge. It's **gratuitous re-rendering** triggered by unstable state models and inefficient list renderings.

### The Anatomy of compose and state stability

In modern declarative UI, the view is a function of state: \`UI = f(state)\`. When state changes, the framework re-calculates the tree. Here is how you keep that process lightning-fast:

#### A. Keep your Models Stable
In Jetpack Compose, if you pass a list (e.g., \`List<User>\`) directly as a parameter to a \`@Composable\` function, Compose cannot guarantee that the list hasn't mutated behind its back. It marks the parameter as *unstable* and re-evaluates the entire composable on every single state change, even if the user data is identical!
* **Solution**: Wrap your collection items in immutable data classes, or use Kotlin's \`ImmutableList\` from the immutable collections library.

#### B. The Magic of Keys in Lists
In both Flutter and Compose, when rendering a list of items dynamically (e.g., \`LazyColumn\` or \`ListView.builder\`), always provide a unique **key** for each item. 
\`\`\`kotlin
LazyColumn {
    items(
        items = users,
        key = { user -> user.id } // NEVER OMIT THIS!
    ) { user ->
        UserRow(user)
    }
}
\`\`\`
Without explicit keys, if you delete or move an item, the framework has to completely rebuild and re-measure every single viewport item instead of simply shifting the layout coordinates of the affected elements.

#### C. Debounce Your Inputs
Never update high-frequency states (such as scroll coordinates or search box characters) directly into your global state container without a debounce of at least 150ms. High-frequency state propagation bypasses frame rendering syncs and causes heavy layout thrashing.

By applying these discipline-based constraints, our clients' apps run at a locked 120fps even on standard $150 devices. No filler, absolute performance.`,
    author: "laura",
    tags: ["mobile", "performance", "frontend"],
    date: "2026-06-20",
    readTime: "5 min read",
    sprinkleColor: "strawberry",
  },
  {
    id: "post-3",
    title: "Automatización de punta a punta sin perder la cordura en CI/CD",
    summary: "Pruebas integrales eficientes utilizando contenedores efímeros y Docker Compose. Automatizando despliegues sin añadir dependencias corporativas inútiles.",
    content: `## CI/CD sin dolores de cabeza

El rol de un Staff Engineer a menudo se reduce a una sola cosa: **desbloquear la velocidad de entrega del equipo sin reducir la calidad del producto**.

Muchas empresas caen en la trampa de comprar herramientas SaaS caras que prometen 'No-Code CI/CD' u orquestadores que requieren consultores especializados. La realidad es que las mejores herramientas siguen siendo abiertas, sencillas de entender y altamente portables.

### Nuestro stack de testing hermético

Para garantizar despliegues continuos sin sorpresas negativas, en snack-factory implementamos pipelines basados en contenedores aislados:

1. **Docker-in-Docker para Integración**: Todo test de integración debe correr sobre bases de datos reales en contenedores efímeros creados durante la ejecución del pipeline. No dependas de bases de datos 'dev' compartidas que causan colisiones de tests.
2. **Esquemas autocontenidos**: La base de datos se migra dinámicamente usando herramientas de migración integradas en el binario de la aplicación (como Flyway para Java/Kotlin o Drizzle/Prisma para Node).
3. **Mocks de APIs externas**: Si dependes de pasarelas de pago (como Stripe) o APIs de terceros, usa mocks locales herméticos (como WireMock o contenedores simulados) dentro del entorno aislado de Docker Compose.

Al mantener el pipeline autónomo y libre de dependencias externas, los ingenieros pueden correr la suite completa de tests de integración en sus portátiles exactamente igual que se ejecuta en el servidor de integración continua. Menos fricción, más velocidad, entregas confiables.`,
    author: "laura",
    tags: ["automation", "backend"],
    date: "2026-06-24",
    readTime: "3 min read",
    sprinkleColor: "blueberry",
  }
];

export default function BlogView({ language, theme }: BlogViewProps) {
  const [posts, setPosts] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem("snack_factory_blog_posts");
    return saved ? JSON.parse(saved) : INITIAL_POSTS;
  });

  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [showCreateForm, setShowCreateForm] = useState(false);

  // New post form state
  const [newTitle, setNewTitle] = useState("");
  const [newSummary, setNewSummary] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newAuthor, setNewAuthor] = useState<"laura" | "nicolas">("laura");
  const [newTags, setNewTags] = useState("");
  const [newSprinkle, setNewSprinkle] = useState<"strawberry" | "mint" | "blueberry">("mint");
  const [formStatus, setFormStatus] = useState<{ type: "success" | "error" | null; msg: string }>({ type: null, msg: "" });

  useEffect(() => {
    localStorage.setItem("snack_factory_blog_posts", JSON.stringify(posts));
  }, [posts]);

  // Aggregate all unique tags from posts
  const allTags = ["all", ...Array.from(new Set(posts.flatMap((p) => p.tags)))];

  const filteredPosts = activeFilter === "all"
    ? posts
    : posts.filter((p) => p.tags.includes(activeFilter));

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newSummary.trim() || !newContent.trim()) {
      setFormStatus({
        type: "error",
        msg: language === "es" ? "Por favor completa todos los campos principales." : "Please fill out all main fields.",
      });
      return;
    }

    const tagsArray = newTags
      .split(",")
      .map((t) => t.trim().toLowerCase())
      .filter((t) => t.length > 0);

    const newPost: BlogPost = {
      id: `post-${Date.now()}`,
      title: newTitle,
      summary: newSummary,
      content: newContent,
      author: newAuthor,
      tags: tagsArray.length > 0 ? tagsArray : ["general"],
      date: new Date().toISOString().split("T")[0],
      readTime: `${Math.max(1, Math.ceil(newContent.split(/\s+/).length / 200))} min read`,
      sprinkleColor: newSprinkle,
    };

    setPosts((prev) => [newPost, ...prev]);
    setFormStatus({
      type: "success",
      msg: language === "es" ? "¡Pensamiento tecnológico publicado con éxito!" : "Tech thought successfully published!",
    });

    // Reset fields
    setNewTitle("");
    setNewSummary("");
    setNewContent("");
    setNewTags("");
    
    // Auto collapse after a delay
    setTimeout(() => {
      setShowCreateForm(false);
      setFormStatus({ type: null, msg: "" });
    }, 1500);
  };

  const handleDeletePost = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm(language === "es" ? "¿Seguro que quieres borrar esta publicación?" : "Are you sure you want to delete this post?")) {
      setPosts((prev) => prev.filter((p) => p.id !== id));
      if (selectedPost?.id === id) {
        setSelectedPost(null);
      }
    }
  };

  return (
    <div className="space-y-12 max-w-5xl mx-auto py-4" id="dev-blog-workspace">
      
      {/* Blog Header Banner */}
      <div className="relative overflow-hidden bg-[#faf6f0] dark:bg-[#1b120f] border-2 border-[#8b5a2b] dark:border-[#e28743] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[6px_6px_0px_0px_rgba(139,90,43,0.1)] dark:shadow-[6px_6px_0px_0px_rgba(226,135,67,0.1)]">
        {/* Grid Texture Background overlay */}
        <div className="absolute inset-0 pixel-grid opacity-10 pointer-events-none" />
        
        <div className="relative z-10 space-y-2 text-center md:text-left">
          <span className="font-mono text-xs text-violet-600 dark:text-emerald-400 font-bold uppercase tracking-widest block">
            ❯ MODULE_09 // BITES OF DEV (BLOG)
          </span>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-neutral-900 dark:text-stone-50 italic">
            {language === "es" ? "Pensamientos de Desarrollo" : "Bites of Dev Thoughts"}
          </h1>
          <p className="text-sm text-slate-600 dark:text-neutral-300 max-w-xl">
            {language === "es" 
              ? "Artículos técnicos, opiniones sin rodeos y micro-aprendizajes directo de la cocina de software de Laura y Nicolás. Simplicidad, rendimiento y diseño riguroso."
              : "Technical deep dives, direct opinions, and micro-learnings straight from the software kitchen of Laura & Nicolás. Simplicity, performance, and rigorous design."}
          </p>
        </div>

        <div className="shrink-0 flex flex-col items-center gap-3 relative z-10">
          <button
            onClick={() => {
              setShowCreateForm(!showCreateForm);
              setSelectedPost(null);
            }}
            className="px-5 py-3 bg-[#8b5a2b] hover:bg-[#70441e] dark:bg-[#e28743] dark:hover:bg-[#d97706] text-white dark:text-[#1b120f] rounded-xl font-mono text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition-all flex items-center space-x-2 cursor-pointer"
          >
            {showCreateForm ? (
              <>
                <ArrowLeft className="w-4 h-4" />
                <span>{language === "es" ? "Ver Artículos" : "View Articles"}</span>
              </>
            ) : (
              <>
                <PlusCircle className="w-4 h-4" />
                <span>{language === "es" ? "Escribir Post" : "Write Post"}</span>
              </>
            )}
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {selectedPost ? (
          /* SINGLE POST VIEW */
          <motion.div
            key="single-post"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-8"
          >
            {/* Go back button */}
            <button
              onClick={() => setSelectedPost(null)}
              className="flex items-center space-x-2 font-mono text-xs text-[#8b5a2b] dark:text-[#e28743] hover:underline cursor-pointer group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>{language === "es" ? "VOLVER AL LISTADO" : "BACK TO LIST"}</span>
            </button>

            {/* Post Card details */}
            <div className="bg-[#fdfbf7] dark:bg-[#170f0d] border border-neutral-200 dark:border-zinc-800 rounded-2xl p-6 md:p-10 space-y-6 shadow-sm relative">
              
              {/* Top sprinkle strip */}
              <div 
                className="absolute top-0 left-0 right-0 h-1.5 rounded-t-2xl"
                style={{
                  backgroundColor: 
                    selectedPost.sprinkleColor === "strawberry" ? "#f43f5e" :
                    selectedPost.sprinkleColor === "mint" ? "#10b981" : "#06b6d4"
                }}
              />

              {/* Meta information */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-400 dark:text-neutral-500 pt-2">
                <span className="flex items-center space-x-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{selectedPost.date}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{selectedPost.readTime}</span>
                </span>
                <span className="flex items-center space-x-1 capitalize">
                  <User className="w-3.5 h-3.5 text-violet-600 dark:text-emerald-400" />
                  <span className="font-bold text-neutral-600 dark:text-neutral-300">
                    {selectedPost.author}
                  </span>
                </span>
              </div>

              {/* Title */}
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-neutral-900 dark:text-stone-50 leading-tight">
                {selectedPost.title}
              </h2>

              <p className="text-base text-slate-500 dark:text-neutral-400 font-sans italic border-l-4 border-neutral-300 dark:border-zinc-700 pl-4 py-1">
                {selectedPost.summary}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {selectedPost.tags.map((tag) => (
                  <span key={tag} className="flex items-center space-x-1 px-2.5 py-1 bg-neutral-100 dark:bg-stone-900 rounded-full text-xs font-mono text-neutral-500">
                    <Tag className="w-3 h-3 text-[#8b5a2b] dark:text-[#e28743]" />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>

              {/* Content body rendered beautifully */}
              <article className="prose prose-neutral dark:prose-invert max-w-none text-slate-700 dark:text-stone-200 pt-6 border-t border-slate-100 dark:border-zinc-800/60 leading-relaxed font-sans space-y-4">
                {selectedPost.content.split("\n\n").map((para, idx) => {
                  if (para.startsWith("## ")) {
                    return (
                      <h3 key={idx} className="text-2xl font-serif font-bold italic text-neutral-900 dark:text-stone-50 mt-8 mb-4">
                        {para.replace("## ", "")}
                      </h3>
                    );
                  }
                  if (para.startsWith("### ")) {
                    return (
                      <h4 key={idx} className="text-lg font-mono font-bold text-[#8b5a2b] dark:text-[#e28743] mt-6 mb-3">
                        {para.replace("### ", "")}
                      </h4>
                    );
                  }
                  if (para.startsWith("#### ")) {
                    return (
                      <h5 key={idx} className="text-base font-bold text-neutral-800 dark:text-stone-200 mt-4 mb-2">
                        {para.replace("#### ", "")}
                      </h5>
                    );
                  }
                  if (para.startsWith("* ") || para.startsWith("- ")) {
                    return (
                      <ul key={idx} className="list-disc list-inside pl-4 space-y-2 my-2 text-sm text-slate-600 dark:text-neutral-300">
                        {para.split("\n").map((item, i) => (
                          <li key={i}>{item.replace(/^[*-\s]+/, "")}</li>
                        ))}
                      </ul>
                    );
                  }
                  if (para.startsWith("1. ") || para.startsWith("2. ") || para.startsWith("3. ")) {
                    return (
                      <ol key={idx} className="list-decimal list-inside pl-4 space-y-2 my-2 text-sm text-slate-600 dark:text-neutral-300">
                        {para.split("\n").map((item, i) => (
                          <li key={i}>{item.replace(/^\d+.\s+/, "")}</li>
                        ))}
                      </ol>
                    );
                  }
                  if (para.startsWith("```")) {
                    // Extract code block simple
                    const code = para.replace(/```[a-z]*/, "").replace(/```$/, "").trim();
                    return (
                      <pre key={idx} className="p-4 bg-stone-900 dark:bg-black/40 text-stone-200 rounded-xl overflow-x-auto font-mono text-xs border border-zinc-800 my-4 leading-relaxed">
                        <code>{code}</code>
                      </pre>
                    );
                  }
                  return (
                    <p key={idx} className="text-sm md:text-base leading-relaxed">
                      {para}
                    </p>
                  );
                })}
              </article>
            </div>
          </motion.div>
        ) : showCreateForm ? (
          /* WRITE NEW POST VIEW */
          <motion.div
            key="create-form"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-8"
          >
            <div className="bg-[#fdfbf7] dark:bg-[#170f0d] border border-neutral-200 dark:border-zinc-800 rounded-2xl p-6 md:p-8 space-y-6 shadow-sm">
              <div className="flex items-center space-x-2 border-b border-neutral-100 dark:border-zinc-800 pb-4">
                <PenTool className="w-5 h-5 text-violet-600 dark:text-emerald-400" />
                <h2 className="text-xl font-serif font-bold text-neutral-900 dark:text-stone-50">
                  {language === "es" ? "Añadir Pensamiento de Desarrollo" : "Add Development Thought"}
                </h2>
              </div>

              {formStatus.type && (
                <div className={`p-4 rounded-xl border flex items-center space-x-3 text-xs md:text-sm font-mono ${
                  formStatus.type === "success" 
                    ? "bg-green-500/10 text-green-500 border-green-500/20" 
                    : "bg-red-500/10 text-red-500 border-red-500/20"
                }`}>
                  {formStatus.type === "success" ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                  <span>{formStatus.msg}</span>
                </div>
              )}

              <form onSubmit={handleCreatePost} className="space-y-5 text-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Author Selection */}
                  <div className="space-y-2">
                    <label className="font-mono text-xs text-neutral-400 uppercase tracking-wider block">
                      {language === "es" ? "Autor / Firma" : "Author / Signature"}
                    </label>
                    <select
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value as "laura" | "nicolas")}
                      className="w-full px-3 py-2 bg-white dark:bg-stone-900 border border-neutral-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:border-[#8b5a2b] dark:focus:border-[#e28743] font-mono text-xs text-neutral-700 dark:text-neutral-300 cursor-pointer"
                    >
                      <option value="laura">Laura Carelli (Staff Engineer)</option>
                      <option value="nicolas">Nicolás Sarfati (Architect)</option>
                    </select>
                  </div>

                  {/* Candy Sprinkle Select */}
                  <div className="space-y-2">
                    <label className="font-mono text-xs text-neutral-400 uppercase tracking-wider block">
                      {language === "es" ? "Sabor / Color del Sprinkle" : "Sprinkle Flavor / Accent Color"}
                    </label>
                    <div className="flex items-center space-x-3 mt-1 h-9">
                      {(["mint", "strawberry", "blueberry"] as const).map((spr) => (
                        <button
                          key={spr}
                          type="button"
                          onClick={() => setNewSprinkle(spr)}
                          className={`w-8 h-8 rounded-lg flex items-center justify-center border-2 transition-all cursor-pointer ${
                            newSprinkle === spr 
                              ? "border-[#8b5a2b] dark:border-[#e28743] scale-110 shadow-sm" 
                              : "border-transparent opacity-60 hover:opacity-100"
                          }`}
                        >
                          <span 
                            className={`w-4 h-4 rounded-sm block ${
                              spr === "mint" ? "bg-[#10b981]" : 
                              spr === "strawberry" ? "bg-[#f43f5e]" : "bg-[#06b6d4]"
                            }`} 
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Title */}
                <div className="space-y-2">
                  <label className="font-mono text-xs text-neutral-400 uppercase tracking-wider block">
                    {language === "es" ? "Título" : "Post Title"}
                  </label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder={language === "es" ? "Ej: Optimizando los índices de PostgreSQL en cargas híbridas" : "e.g., Optimizing PostgreSQL indexes under hybrid workloads"}
                    className="w-full px-4 py-2.5 bg-white dark:bg-stone-900 border border-neutral-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:border-[#8b5a2b] dark:focus:border-[#e28743] font-serif text-base text-neutral-900 dark:text-stone-50"
                  />
                </div>

                {/* Summary */}
                <div className="space-y-2">
                  <label className="font-mono text-xs text-neutral-400 uppercase tracking-wider block">
                    {language === "es" ? "Resumen Breve" : "Quick Summary"}
                  </label>
                  <input
                    type="text"
                    value={newSummary}
                    onChange={(e) => setNewSummary(e.target.value)}
                    placeholder={language === "es" ? "De qué trata este pensamiento byte-sized en una sola línea..." : "What this byte-sized thought is about in one line..."}
                    className="w-full px-4 py-2.5 bg-white dark:bg-stone-900 border border-neutral-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:border-[#8b5a2b] dark:focus:border-[#e28743] font-sans text-xs text-neutral-700 dark:text-neutral-300"
                  />
                </div>

                {/* Tags input */}
                <div className="space-y-2">
                  <label className="font-mono text-xs text-neutral-400 uppercase tracking-wider block">
                    {language === "es" ? "Tags (separados por comas)" : "Tags (comma-separated)"}
                  </label>
                  <input
                    type="text"
                    value={newTags}
                    onChange={(e) => setNewTags(e.target.value)}
                    placeholder="architecture, backend, performance, mobile"
                    className="w-full px-4 py-2.5 bg-white dark:bg-stone-900 border border-neutral-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:border-[#8b5a2b] dark:focus:border-[#e28743] font-mono text-xs text-neutral-700 dark:text-neutral-300"
                  />
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="font-mono text-xs text-neutral-400 uppercase tracking-wider block">
                      {language === "es" ? "Contenido (Usa ## para títulos, ``` para código)" : "Content body (Use ## for headers, ``` for code)"}
                    </label>
                    <span className="font-mono text-[9px] text-neutral-400">
                      Markdown-friendly
                    </span>
                  </div>
                  <textarea
                    rows={12}
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    placeholder={language === "es" ? "Escribe tus pensamientos tecnológicos aquí..." : "Write your engineering notes here..."}
                    className="w-full px-4 py-3 bg-white dark:bg-stone-900 border border-neutral-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:border-[#8b5a2b] dark:focus:border-[#e28743] font-mono text-xs leading-relaxed text-neutral-700 dark:text-neutral-300"
                  />
                </div>

                <div className="pt-4 flex items-center justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowCreateForm(false)}
                    className="px-4 py-2 border border-neutral-300 dark:border-zinc-800 rounded-xl font-mono text-xs uppercase hover:bg-neutral-100 dark:hover:bg-zinc-900 cursor-pointer text-neutral-600 dark:text-neutral-300"
                  >
                    {language === "es" ? "Cancelar" : "Cancel"}
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#8b5a2b] hover:bg-[#70441e] dark:bg-[#e28743] dark:hover:bg-[#d97706] text-white dark:text-[#1b120f] rounded-xl font-mono text-xs font-bold shadow-md cursor-pointer"
                  >
                    {language === "es" ? "PUBLICAR" : "PUBLISH POST"}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        ) : (
          /* POST LISTING VIEW */
          <motion.div
            key="list-posts"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-8"
          >
            {/* Tag filters bar */}
            <div className="flex flex-wrap items-center gap-2 border-b border-neutral-200/60 dark:border-zinc-800/60 pb-4">
              <span className="font-mono text-xs text-neutral-400 uppercase tracking-wider mr-2">
                Filter:
              </span>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveFilter(tag)}
                  className={`px-3 py-1 rounded-full font-mono text-xs uppercase border cursor-pointer transition-all duration-200 ${
                    activeFilter === tag
                      ? "bg-[#8b5a2b] dark:bg-[#e28743] text-white dark:text-[#1b120f] border-transparent font-bold"
                      : "border-slate-200 dark:border-zinc-800 text-neutral-500 hover:border-slate-400 dark:hover:border-zinc-600"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Posts Grid - Redesigned Asymmetric feed */}
            {filteredPosts.length === 0 ? (
              <div className="p-12 text-center border-2 border-dashed border-neutral-200 dark:border-zinc-800 rounded-2xl">
                <FileText className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
                <p className="font-serif italic text-lg text-neutral-500">
                  {language === "es" ? "No se encontraron pensamientos con ese filtro." : "No thoughts found under this category."}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {filteredPosts.map((post, idx) => {
                  // Asymmetric layout: first post is featured (full width or spans more cols)
                  const isFeatured = idx === 0 && activeFilter === "all";
                  const colSpan = isFeatured ? "md:col-span-12" : "md:col-span-6";

                  return (
                    <div key={post.id} className={colSpan}>
                      <Card
                        variant={isFeatured ? "terminal" : "cookie"}
                        onClick={() => setSelectedPost(post)}
                        title={post.title}
                        subtitle={`${post.date} // By ${post.author.toUpperCase()}`}
                        extraLabel={isFeatured ? "FEATURED BYTE" : undefined}
                        sprinkleColor={post.sprinkleColor}
                        className="h-full"
                      >
                        <div className="space-y-4">
                          <p className={`text-slate-600 dark:text-neutral-300 leading-relaxed font-sans ${isFeatured ? "text-base" : "text-sm"}`}>
                            {post.summary}
                          </p>
                          <div className="flex items-center justify-between pt-2">
                            <div className="flex flex-wrap gap-1.5">
                              {post.tags.map((tag) => (
                                <span key={tag} className="px-2 py-0.5 bg-neutral-100/80 dark:bg-stone-900/50 rounded text-[10px] font-mono text-neutral-400">
                                  #{tag}
                                </span>
                              ))}
                            </div>
                            <div className="flex items-center space-x-2 text-xs font-mono text-[#8b5a2b] dark:text-[#e28743]">
                              <span className="font-bold uppercase tracking-wider group-hover:underline">
                                {language === "es" ? "LEER BITE" : "READ BITE"}
                              </span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </div>
                          </div>
                          
                          {/* Trash/Delete icon for locally added or customizable posts (for convenience of testing!) */}
                          <div className="flex justify-end pt-2 border-t border-slate-100 dark:border-zinc-800/40 mt-2">
                            <button
                              onClick={(e) => handleDeletePost(post.id, e)}
                              className="text-[10px] font-mono text-red-500/60 hover:text-red-500 hover:underline cursor-pointer flex items-center space-x-1"
                              title="Delete post"
                            >
                              <span>[ {language === "es" ? "BORRAR POST" : "DELETE POST"} ]</span>
                            </button>
                          </div>
                        </div>
                      </Card>
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
