"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { resumeData } from "../data/resume";
import { Briefcase, Calendar, MapPin, ExternalLink, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";

const projectImages = {
    "Tabib - Patient Management System": "/images/tabib.png",
    "Aura VMS - Visitor Management": "/images/vms.png",
    "Tritrackz - Logistics Automation": "/images/tritrackz.png"
};

const ProjectCard = ({ project, index }: { project: any, index: number }) => {
    const ref = useRef(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [30, -30]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);

    // Fallback image logic
    let imgSrc = "/images/tabib.png";
    if (project.name.toLowerCase().includes("vms")) imgSrc = "/images/vms.png";
    if (project.name.toLowerCase().includes("tritrackz") || project.name.toLowerCase().includes("logistics")) imgSrc = "/images/tritrackz.png";

    return (
        <motion.div
            ref={ref}
            style={{ opacity }}
            className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 md:gap-12 items-center mb-24 md:mb-32 last:mb-0 relative z-10`}
        >
            {/* Visual Side */}
            <div className="flex-1 w-full group perspective-1000">
                <div className="relative rounded-2xl bg-slate-900 border border-slate-800 p-2 md:p-4 shadow-2xl transform transition-all duration-500 hover:rotate-x-2 hover:scale-[1.02]">
                    {/* Browser Header Visual */}
                    <div className="flex items-center gap-2 mb-3 md:mb-4 border-b border-slate-800 pb-3 md:pb-4 px-2">
                        <div className="flex gap-2">
                            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                        </div>
                        <div className="hidden md:flex flex-1 mx-4 bg-slate-950 rounded-md h-6 items-center px-3 text-[10px] text-slate-500 font-mono overflow-hidden">
                            https://{project.name.toLowerCase().replace(/ /g, '-')}.app
                        </div>
                    </div>

                    {/* Image Container */}
                    {/* Mobile: Aspect video + contain, Desktop: Aspect 16/10 + cover/parallax */}
                    <div className="relative w-full overflow-hidden rounded-lg bg-slate-950 aspect-video md:aspect-[16/10]">
                        <motion.div
                            style={isMobile ? {} : { y }}
                            className="absolute inset-0 h-full md:h-[120%] top-0 md:-top-[10%]"
                        >
                            <Image
                                src={imgSrc}
                                alt={project.name}
                                fill
                                className="object-cover md:object-cover object-center md:object-top transition-all duration-700 group-hover:scale-105"
                            />
                        </motion.div>

                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/20 via-transparent to-transparent pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* Content Side */}
            <div className="flex-1 space-y-6 md:space-y-8 w-full">
                <div>
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold shadow-[0_0_10px_rgba(16,185,129,0.1)]">
                            <span>CASE STUDY 0{index + 1}</span>
                        </div>
                        {project.period && (
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-400 text-xs font-medium">
                                <Calendar size={12} />
                                <span>{project.period}</span>
                            </div>
                        )}
                    </div>
                    <h3 className="text-2xl md:text-4xl font-bold text-white mb-3 md:mb-4 leading-tight">{project.name}</h3>
                    <p className="text-emerald-400 font-mono text-xs md:text-sm border-l-2 border-emerald-500 pl-4 py-1">
                        {project.tech}
                    </p>
                </div>

                <div className="space-y-4">
                    <h4 className="text-xs md:text-sm font-semibold text-slate-300 uppercase tracking-wider">Key Highlights</h4>
                    <ul className="grid gap-3">
                        {project.points.map((point: string, i: number) => (
                            <li key={i} className="flex items-start gap-3 text-slate-400 text-sm md:text-base leading-relaxed group/item hover:text-slate-200 transition-colors">
                                <span className="mt-2 min-w-[6px] h-1.5 bg-slate-700 rounded-full group-hover/item:bg-emerald-500 transition-colors" />
                                <span>{point}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <button className="group flex items-center gap-2 text-white font-semibold hover:text-emerald-400 transition-colors text-sm md:text-base">
                    View Project Details
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </motion.div>
    );
};

export default function Experience() {
    const { experience } = resumeData;

    return (
        <section id="experience" className="py-20 md:py-32 bg-slate-950 relative overflow-hidden">

            {/* Background Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_top,black_40%,transparent_100%)] pointer-events-none" />

            {/* Ambient Gradients - Minimal Opacity */}
            <div className="absolute top-0 right-0 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-emerald-900/10 rounded-full blur-[80px] md:blur-[120px] pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-0 left-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-teal-900/5 rounded-full blur-[60px] md:blur-[100px] pointer-events-none mix-blend-screen" />

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-6">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-4 md:mb-6">
                            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Experience</span>
                        </h2>
                        <p className="text-slate-400 text-base md:text-lg">
                            Transforming complex requirements into scalable, user-centric digital solutions.
                        </p>
                    </div>

                    {/* Company Badge */}
                    <div className="hidden md:block">
                        <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm">
                            <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-emerald-500 border border-slate-700">
                                <Briefcase size={24} />
                            </div>
                            <div className="text-left">
                                <p className="text-white font-bold">{experience[0].role}</p>
                                <p className="text-xs text-slate-400">{experience[0].company} • {experience[0].location}</p>
                                <p className="text-xs text-emerald-400 font-medium mt-1">{experience[0].period}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    {experience.map((job, jIndex) => (
                        <div key={jIndex}>
                            {/* Mobile Company Header */}
                            <div className="md:hidden flex items-center gap-4 mb-12 p-4 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm">
                                <div className="w-10 h-10 bg-slate-800/80 rounded-lg flex items-center justify-center text-emerald-500 border border-slate-700 shrink-0">
                                    <Briefcase size={20} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white leading-tight">{job.role}</h3>
                                    <p className="text-emerald-400 text-xs font-semibold">{job.company}</p>
                                    <p className="text-slate-500 text-xs">{job.period}</p>
                                </div>
                            </div>

                            <div>
                                {job.projects.map((project, pIndex) => (
                                    <ProjectCard key={pIndex} project={project} index={pIndex} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
