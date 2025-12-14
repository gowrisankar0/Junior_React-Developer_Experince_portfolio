"use client";

import { motion } from "framer-motion";
import { resumeData } from "../data/resume";
import { Download, Code, Database, Globe } from "lucide-react";
import { useEffect, useState } from "react";

// Reusable Looping Typewriter Component
const Typewriter = ({ text, delay = 0 }: { text: string; delay?: number }) => {
    const [displayedText, setDisplayedText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setStarted(true);
        }, delay * 1000);
        return () => clearTimeout(timeout);
    }, [delay]);

    useEffect(() => {
        if (!started) return;

        const handleTyping = () => {
            const currentLength = displayedText.length;
            const fullLength = text.length;

            if (!isDeleting) {
                // Typing
                if (currentLength < fullLength) {
                    setDisplayedText(text.slice(0, currentLength + 1));
                } else {
                    // Finished typing, wait then start deleting
                    setTimeout(() => setIsDeleting(true), 2000);
                }
            } else {
                // Deleting
                if (currentLength > 0) {
                    setDisplayedText(text.slice(0, currentLength - 1));
                } else {
                    // Finished deleting, start typing again
                    setIsDeleting(false);
                }
            }
        };

        const timer = setTimeout(handleTyping, isDeleting ? 50 : 150);
        return () => clearTimeout(timer);
    }, [displayedText, isDeleting, text, started]);

    return (
        <span className="inline-block min-h-[1.2em]">
            {displayedText}
            <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block ml-1 w-1 h-[1em] bg-emerald-500 align-middle"
            />
        </span>
    );
};

// Coding Block Background Component
const CodingBlocks = () => {
    return (
        <div className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
            {/* Abstract Code Snippets */}
            <motion.div
                className="absolute top-10 right-10 bg-slate-800 p-3 rounded-lg border border-slate-700 font-mono text-xs text-emerald-400 shadow-xl"
                animate={{ y: [0, -10, 0], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
                <div>const dev = &#123;</div>
                <div className="pl-2">skill: &quot;React&quot;,</div>
                <div className="pl-2">level: &quot;Expert&quot;</div>
                <div>&#125;;</div>
            </motion.div>

            <motion.div
                className="absolute bottom-20 left-10 bg-slate-800 p-3 rounded-lg border border-slate-700 font-mono text-xs text-blue-400 shadow-xl"
                animate={{ y: [0, 15, 0], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
                <div>&lt;Component /&gt;</div>
            </motion.div>

            <motion.div
                className="absolute top-1/2 -right-4 bg-slate-800 p-2 rounded-lg border border-slate-700 font-mono text-xs text-purple-400 shadow-xl"
                animate={{ x: [0, -5, 0], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
                <div>npm install success</div>
            </motion.div>
        </div>
    );
};


export default function Hero() {
    const { personalInfo } = resumeData;

    return (
        <section className="relative min-h-[95vh] flex items-center justify-center bg-[#020617] overflow-hidden pt-20">
            {/* Professional Grid Background */}
            <div className="absolute inset-0 bg-grid-white/[0.03] bg-[length:40px_40px] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-[#020617]/80 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-transparent to-[#020617]/50 pointer-events-none" />

            {/* Decor Gradients */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="w-full lg:container lg:mx-auto lg:px-6 lg:pl-20 relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">

                    {/* LEFT CONTENT - Details with Blur Effect */}
                    <div className="flex-1 text-center lg:text-left w-full relative">

                        {/* Mobile Pink/Dark Blur Background Layer */}
                        <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/10 via-slate-900/60 to-slate-900/90 backdrop-blur-2xl -z-10 lg:hidden" />

                        <div className="box-border p-6 md:p-8 lg:p-0">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 text-slate-300 text-sm font-medium mb-6 backdrop-blur-sm shadow-sm"
                            >
                                <span className="flex h-2 w-2 relative">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </span>
                                <span>Available for Work</span>
                            </motion.div>

                            {/* Name Section with Typewriter */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="mb-6"
                            >
                                <h2 className="text-xl md:text-2xl text-emerald-400 font-medium mb-2 tracking-wide">Hello World, I Am</h2>
                                <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-4 min-h-[80px]">
                                    <Typewriter text={personalInfo.name} delay={0.5} />
                                </h1>
                            </motion.div>

                            {/* Role & Summary */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 2.5 }}
                            >
                                <h3 className="text-2xl md:text-3xl text-slate-300 font-semibold mb-6 flex flex-col md:flex-row md:items-center justify-center lg:justify-start gap-2 md:gap-4">
                                    <span>Frontend Developer</span>
                                    <span className="hidden md:inline w-2 h-2 rounded-full bg-slate-600" />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
                                        React Developer
                                    </span>
                                </h3>

                                <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8 font-light">
                                    With <b>1.6 years of hands-on experience</b> in the <b>React ecosystem</b>, I craft responsive, high-performance web applications that merge stunning visuals with robust functionality.
                                </p>

                                {/* Upgraded Tech Stack Visuals */}
                                <div className="mb-10">
                                    <p className="text-sm uppercase tracking-widest text-slate-500 mb-4 font-semibold">Core Tech Stack</p>
                                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                                        {[
                                            { icon: <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg" className="w-5 h-5" alt="Mongo" />, name: "MongoDB", color: "hover:bg-green-500/10 hover:border-green-500/50" },
                                            { icon: <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg" className="w-5 h-5 invert" alt="Express" />, name: "Express", color: "hover:bg-slate-500/10 hover:border-slate-500/50" },
                                            { icon: <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" className="w-5 h-5" alt="React" />, name: "React", color: "hover:bg-cyan-500/10 hover:border-cyan-500/50" },
                                            { icon: <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg" className="w-5 h-5" alt="Node" />, name: "Node.js", color: "hover:bg-emerald-500/10 hover:border-emerald-500/50" },
                                            { icon: <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" className="w-5 h-5" alt="TS" />, name: "TypeScript", color: "hover:bg-blue-500/10 hover:border-blue-500/50" },
                                        ].map((tech, index) => (
                                            <div key={index} className={`flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800/50 border border-slate-700 transition-all cursor-default ${tech.color}`}>
                                                {tech.icon}
                                                <span className="text-slate-300 text-sm font-medium">{tech.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Experience Badge & CTA */}
                                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6">
                                    <div className="flex items-center gap-3">
                                        <div className="text-5xl font-black text-white/10 relative">
                                            1.6
                                            <span className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10">1.6</span>
                                        </div>
                                        <div className="text-left">
                                            <div className="text-emerald-400 font-bold uppercase tracking-wider text-sm">Years of</div>
                                            <div className="text-slate-300 font-bold uppercase tracking-wider text-sm">Experience</div>
                                        </div>
                                    </div>

                                    <div className="h-10 w-[1px] bg-slate-800 hidden sm:block" />

                                    <a
                                        href="/resume.pdf"
                                        target="_blank"
                                        className="px-6 py-3 bg-slate-900 text-white rounded-lg border border-slate-700 hover:border-emerald-500/50 hover:bg-slate-800 transition-all flex items-center gap-2 group shadow-lg shadow-emerald-900/10"
                                    >
                                        <Download size={18} className="group-hover:translate-y-0.5 transition-transform" />
                                        <span>Download Resume</span>
                                    </a>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* RIGHT CONTENT - 3D DEVELOPER CHARACTER (Hidden on Mobile) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="hidden lg:flex flex-1 justify-center items-center relative min-h-[500px] w-full perspective-[1000px]"
                    >
                        {/* Soft Ambient Glow */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-emerald-500/10 blur-[100px] rounded-full mix-blend-screen pointer-events-none" />

                        {/* Floating Character */}
                        <motion.div
                            animate={{ y: [-20, 20, -20] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            className="relative z-10 w-full max-w-lg"
                        >
                            <img
                                src="/images/hero_developer_3d.png"
                                alt="3D Developer Coding"
                                className="w-full h-auto mix-blend-screen drop-shadow-[0_0_30px_rgba(34,211,238,0.3)]"
                            />
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
