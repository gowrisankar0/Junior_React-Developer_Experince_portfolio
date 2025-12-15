"use client";

import { motion } from "framer-motion";
import { resumeData } from "../data/resume";
import { GraduationCap } from "lucide-react";

export default function Education() {
    const { education } = resumeData;

    return (
        <section className="py-24 bg-slate-950 relative">
            <div className="container mx-auto px-6 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl font-bold text-white mb-4">Education</h2>
                    <div className="w-16 h-1 bg-emerald-500 mx-auto rounded-full" />
                </motion.div>

                <div className="space-y-6">
                    {education.map((edu, index) => (
                        <motion.div
                            key={index}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: {
                                    opacity: 1,
                                    y: 0,
                                    transition: {
                                        duration: 0.5,
                                        when: "beforeChildren",
                                        staggerChildren: 0.2
                                    }
                                }
                            }}
                            className="flex items-center gap-6 p-6 rounded-2xl border border-slate-800 bg-slate-900/50 hover:border-emerald-500/30 transition-colors overflow-hidden"
                        >
                            <motion.div
                                variants={{
                                    hidden: { x: -50, opacity: 0 },
                                    visible: { x: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
                                }}
                                className="w-16 h-16 bg-slate-800 rounded-xl shadow-sm flex items-center justify-center text-emerald-400 shrink-0 border border-slate-700"
                            >
                                <GraduationCap size={32} />
                            </motion.div>
                            <motion.div
                                variants={{
                                    hidden: { x: 50, opacity: 0 },
                                    visible: { x: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
                                }}
                            >
                                <h3 className="text-xl font-bold text-white">{edu.degree}</h3>
                                <p className="text-slate-400 font-medium">{edu.institution}</p>
                                <p className="text-slate-500 text-sm mt-1">{edu.period}</p>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
