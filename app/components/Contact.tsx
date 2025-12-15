"use client";

import { motion } from "framer-motion";
import { resumeData } from "../data/resume";
import { Github, Linkedin, Mail, MapPin, Phone, Send, Loader2, CheckCircle2 } from "lucide-react";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export default function Contact() {
    const { contact } = resumeData.personalInfo;
    const formRef = useRef<HTMLFormElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState("");

    const sendEmail = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        // REPLACE THESE WITH YOUR ACTUAL EMAILJS KEYS
        // Sign up at https://www.emailjs.com/
        const SERVICE_ID = process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID || "";
        const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID || "";
        const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY || "";

        if (!formRef.current) return;

        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
            .then((result) => {
                setIsLoading(false);
                setIsSuccess(true);
                if (formRef.current) formRef.current.reset();
                setTimeout(() => setIsSuccess(false), 5000); // Reset success message after 5s
            }, (error) => {
                setIsLoading(false);
                setError("Failed to send message. Please try again later or email directly.");
                console.error(error.text);
            });
    };

    return (
        <section id="contact" className="py-24 bg-slate-950 relative">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-start">

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className="inline-block p-3 bg-emerald-500/10 rounded-2xl text-emerald-500 mb-6 border border-emerald-500/20">
                            <Mail size={32} />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Touch</span>
                        </h2>
                        <p className="text-slate-400 text-lg mb-10 leading-relaxed">
                            Have a project in mind or just want to say hi? I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
                        </p>

                        <div className="space-y-8">
                            <a href={`mailto:${contact.email}`} className="flex items-center space-x-5 group">
                                <div className="w-14 h-14 bg-slate-900 border border-slate-800 rounded-full flex items-center justify-center text-slate-400 group-hover:text-emerald-400 group-hover:border-emerald-500/30 transition-all shadow-sm">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">Email Me</p>
                                    <p className="text-lg text-white font-medium group-hover:text-emerald-400 transition-colors">{contact.email}</p>
                                </div>
                            </a>

                            <a href={`tel:${contact.phone}`} className="flex items-center space-x-5 group">
                                <div className="w-14 h-14 bg-slate-900 border border-slate-800 rounded-full flex items-center justify-center text-slate-400 group-hover:text-emerald-400 group-hover:border-emerald-500/30 transition-all shadow-sm">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">Call Me</p>
                                    <p className="text-lg text-white font-medium group-hover:text-emerald-400 transition-colors">{contact.phone}</p>
                                </div>
                            </a>

                            <div className="flex items-center space-x-5">
                                <div className="w-14 h-14 bg-slate-900 border border-slate-800 rounded-full flex items-center justify-center text-slate-400 shadow-sm">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">Location</p>
                                    <p className="text-lg text-white font-medium">{contact.location}</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4 mt-12">
                            {[
                                { icon: Github, href: contact.github },
                                { icon: Linkedin, href: contact.linkedin }
                            ].map((Social, i) => (
                                <a
                                    key={i}
                                    href={Social.href}
                                    target="_blank"
                                    className="w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors shadow-lg shadow-black/20 border border-slate-800"
                                >
                                    <Social.icon size={20} />
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        className="bg-slate-900/50 p-8 md:p-10 rounded-3xl shadow-2xl shadow-black/50 border border-slate-800 backdrop-blur-sm relative"
                    >
                        {isSuccess ? (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/95 rounded-3xl z-10 p-8 text-center animate-in fade-in duration-300">
                                <div className="w-20 h-20 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mb-6">
                                    <CheckCircle2 size={40} />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                                <p className="text-slate-400">Thanks for reaching out. I'll get back to you soon.</p>
                                <button
                                    onClick={() => setIsSuccess(false)}
                                    className="mt-8 px-6 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition"
                                >
                                    Send Another
                                </button>
                            </div>
                        ) : null}

                        <form ref={formRef} className="space-y-6" onSubmit={sendEmail}>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-400">Name</label>
                                    <input
                                        type="text"
                                        name="user_name"
                                        required
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-white placeholder:text-slate-600"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-400">Email</label>
                                    <input
                                        type="email"
                                        name="user_email"
                                        required
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-white placeholder:text-slate-600"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-400">Subject</label>
                                <input
                                    type="text"
                                    name="subject"
                                    required
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-white placeholder:text-slate-600"
                                    placeholder="Project Discussion"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-400">Message</label>
                                <textarea
                                    name="message"
                                    rows={4}
                                    required
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-white placeholder:text-slate-600 resize-none"
                                    placeholder="Tell me about your project..."
                                ></textarea>
                            </div>

                            {error && (
                                <p className="text-red-400 text-sm text-center">{error}</p>
                            )}

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-emerald-500 text-slate-950 font-bold py-4 rounded-xl hover:bg-emerald-400 transition-all flex items-center justify-center group shadow-lg shadow-emerald-500/20 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 size={18} className="mr-2 animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        Send Message
                                        <Send size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>
                    </motion.div>
                </div>

                <div className="border-t border-slate-800 mt-24 pt-8 text-center text-slate-600 text-sm">
                    © {new Date().getFullYear()} Gowrisankar.
                </div>
            </div>
        </section>
    );
}
