"use client";

import { motion } from "framer-motion";
import { resumeData } from "../data/resume";
import { Award, BookOpen, ExternalLink } from "lucide-react";

export default function Certifications() {
    const { certifications } = resumeData;

    if (!certifications || certifications.length === 0) return null;

    return (
        <section className="py-24 bg-[#020617] relative">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 md:flex items-end justify-between gap-6"
                >
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Certifications & <span className="text-emerald-400">Internship</span>
                        </h2>
                        <div className="w-20 h-1 bg-emerald-500 rounded-full" />
                    </div>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                    {certifications.map((cert: any, index: number) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-emerald-500/30 transition-all duration-300"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />

                            <div className="relative z-10">
                                <div className="flex items-start justify-between mb-6">
                                    <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-emerald-500 group-hover:scale-110 transition-transform">
                                        {cert.title.toLowerCase().includes("internship") ? (
                                            <BookOpen size={24} />
                                        ) : (
                                            <Award size={24} />
                                        )}
                                    </div>
                                    <span className="text-slate-500 text-sm font-mono border border-slate-800 px-3 py-1 rounded-full bg-slate-950">
                                        {cert.date}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                                    {cert.title}
                                </h3>
                                <p className="text-slate-400 font-medium mb-4 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                                    {cert.issuer}
                                </p>

                                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                                    {cert.description}
                                </p>

                                {cert.skills && (
                                    <div className="flex flex-wrap gap-2">
                                        {cert.skills.map((skill: string, i: number) => (
                                            <span
                                                key={i}
                                                className="text-xs font-medium text-emerald-300 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
