"use client";

import { motion } from "framer-motion";
import { resumeData } from "../data/resume";
import { Code2, Database, Layout, Server, Settings, Terminal, Zap, Star, Trophy, Target } from "lucide-react";
import clsx from "clsx";

// Helper to get icons (expanded for Next.js and Docker)
const getLogoUrl = (skill: string) => {
    const s = skill.toLowerCase();
    const size = 48; // Ensure high quality

    // Map skills to DevIcon URLs
    if (s.includes("react")) return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg`;
    if (s.includes("next")) return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg`;
    if (s.includes("javascript")) return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg`;
    if (s.includes("typescript")) return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg`;
    if (s.includes("redux")) return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg`;
    if (s.includes("html")) return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg`;
    if (s.includes("css")) return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg`;
    if (s.includes("tailwind")) return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg`;
    if (s.includes("node")) return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg`;
    // Express logo removed due to visibility issues on dark backgrounds
    if (s.includes("mongo")) return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg`;
    if (s.includes("docker")) return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg`;
    if (s.includes("git") && !s.includes("github")) return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg`;
    if (s.includes("github")) return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg`;
    if (s.includes("figma")) return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg`;

    // Fallbacks or specialized logos not in map
    // Returning null will trigger the icon fallback
    return null;
};

// Helper for fallback icons
const getFallbackIcon = (skill: string) => {
    const s = skill.toLowerCase();
    if (s.includes("zustand")) return <Database size={24} className="text-orange-400" />; // State Management
    if (s.includes("query")) return <Zap size={24} className="text-red-400" />; // Data Fetching/Speed
    if (s.includes("express")) return <Server size={24} className="text-white" />; // Backend Framework
    return <Settings size={24} className="text-slate-500 group-hover:text-emerald-400" />;
};

const SkillPill = ({ skill, fullWidth = false }: { skill: string; fullWidth?: boolean }) => {
    const logoUrl = getLogoUrl(skill);

    return (
        <div className={`flex items-center gap-4 px-6 py-4 bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl hover:border-emerald-500/50 hover:bg-slate-800/80 transition-all duration-300 group cursor-default ${fullWidth ? "w-full" : "min-w-max"}`}>
            <div className="w-10 h-10 flex items-center justify-center p-1.5 bg-slate-950 rounded-lg border border-slate-800 group-hover:border-emerald-500/30 group-hover:scale-110 transition-all duration-300">
                {logoUrl ? (
                    <img
                        src={logoUrl}
                        alt={`${skill} logo`}
                        className={clsx(
                            "w-full h-full object-contain",
                            skill.toLowerCase().includes("github") && "invert"
                        )}
                    />
                ) : (
                    getFallbackIcon(skill)
                )}
            </div>
            <span className="text-slate-300 font-bold text-lg leading-none group-hover:text-white transition-colors">{skill}</span>
        </div>
    );
};

const AchievementCard = ({ title, description, index }: { title: string, description: string, index: number }) => {
    const icons = [Zap, Trophy, Target, Star];
    const Icon = icons[index % icons.length];

    return (
        <motion.div
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group relative flex flex-col p-8 rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden hover:border-slate-700 transition-colors"
        >
            {/* Hover Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10 flex items-start justify-between mb-8">
                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-emerald-500 group-hover:scale-110 group-hover:border-emerald-500/30 transition-all duration-300">
                    <Icon size={28} />
                </div>
                <span className="text-5xl font-black text-slate-800 group-hover:text-slate-800/50 transition-colors select-none">
                    0{index + 1}
                </span>
            </div>

            <div className="relative z-10 mt-auto">
                <h4 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">
                    {title}
                </h4>
                <p className="text-slate-400 leading-relaxed">
                    {description}
                </p>
            </div>
        </motion.div>
    );
};

export default function Skills() {
    const { skills, keyAchievements } = resumeData;

    // Split skills into rows for Desktop
    const half = Math.ceil(skills.length / 2);
    const row1 = skills.slice(0, half);
    const row2 = skills.slice(half);

    return (
        <section id="skills" className="py-20 md:py-32 bg-slate-950 relative overflow-hidden">
            {/* Subtle Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_100%)] pointer-events-none" />

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 md:mb-24 flex flex-col md:flex-row items-end justify-between gap-6"
                >
                    <div className="max-w-2xl">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Technical <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Expertise</span>
                        </h2>
                        <p className="text-slate-400 text-lg">
                            A comprehensive toolkit that enables me to build scalable, high-performance web applications.
                        </p>
                    </div>

                    <div className="hidden md:block w-full h-px bg-slate-800 mb-8 flex-1 ml-12" />
                </motion.div>

                {/* --- DESKTOP VIEW: Horizontal Scroll --- */}
                <div className="hidden md:block space-y-8 mb-32">
                    {/* Row 1: Left to Right */}
                    <div className="relative flex overflow-hidden mask-gradient-x">
                        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-950 to-transparent z-10" />
                        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-950 to-transparent z-10" />

                        <motion.div
                            className="flex gap-6 pr-6"
                            animate={{ x: ["0%", "-50%"] }}
                            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                        >
                            {[...row1, ...row1, ...row1, ...row1].map((skill, i) => (
                                <SkillPill key={`r1-${i}`} skill={skill} />
                            ))}
                        </motion.div>
                    </div>

                    {/* Row 2: Right to Left */}
                    <div className="relative flex overflow-hidden mask-gradient-x">
                        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-950 to-transparent z-10" />
                        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-950 to-transparent z-10" />

                        <motion.div
                            className="flex gap-6 pr-6"
                            animate={{ x: ["-50%", "0%"] }}
                            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                        >
                            {[...row2, ...row2, ...row2, ...row2].map((skill, i) => (
                                <SkillPill key={`r2-${i}`} skill={skill} />
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* --- MOBILE VIEW: Vertical Scroll Stack --- */}
                <div className="block md:hidden mb-24 relative h-[400px] overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-slate-950 to-transparent z-20 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-950 to-transparent z-20 pointer-events-none" />

                    <motion.div
                        className="flex flex-col gap-4"
                        animate={{ y: ["0%", "-50%"] }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    >
                        {[...skills, ...skills].map((skill, i) => (
                            <SkillPill key={`mobile-${i}`} skill={skill} fullWidth={true} />
                        ))}
                    </motion.div>
                </div>

                {/* Impact & Highlights */}
                <div>
                    <div className="flex items-center gap-4 mb-12">
                        <div className="w-12 h-1 bg-emerald-500 rounded-full" />
                        <h3 className="text-2xl font-bold text-white">Impact & Highlights</h3>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {keyAchievements.map((achievement, index) => (
                            <AchievementCard
                                key={index}
                                title={achievement.title}
                                description={achievement.description}
                                index={index}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
