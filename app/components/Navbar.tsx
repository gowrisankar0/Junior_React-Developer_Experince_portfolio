"use client";

import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import clsx from "clsx";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "About", href: "#about" },
        { name: "Experience", href: "#experience" },
        { name: "Skills", href: "#skills" },
        { name: "Contact", href: "#contact" },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={clsx(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
                isScrolled || isOpen
                    ? "bg-slate-950/70 backdrop-blur-xl shadow-lg border-b border-slate-800/50 py-4"
                    : "bg-transparent py-6"
            )}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                <Link href="/" className="text-xl font-bold tracking-tight text-white relative group">
                    <span className="relative z-10">Gowrisankar.</span>
                    <span className="absolute bottom-0 left-0 w-full h-2 bg-emerald-500/30 -z-10 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 transform -rotate-1"></span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-10">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-slate-300 hover:text-emerald-400 transition-colors relative"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Custom Mobile Menu Button */}
                <button
                    className="md:hidden relative group w-12 h-12 flex items-center justify-center rounded-full bg-slate-900/50 backdrop-blur-md border border-slate-700/50 shadow-[0_0_15px_rgba(0,0,0,0.2)] overflow-hidden transition-all duration-300 hover:border-emerald-500/50"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle Menu"
                >
                    <div className="flex flex-col gap-1.5 w-6">
                        <motion.span
                            animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                            className="w-full h-0.5 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full origin-center transition-all duration-300"
                        />
                        <motion.span
                            animate={isOpen ? { opacity: 0, x: -20 } : { opacity: 1, x: 0 }}
                            className="w-3/4 h-0.5 bg-slate-300 rounded-full transition-all duration-300 self-end group-hover:w-full group-hover:bg-emerald-400"
                        />
                        <motion.span
                            animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                            className="w-full h-0.5 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full origin-center transition-all duration-300"
                        />
                    </div>

                    {/* Subtle Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "100vh" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="md:hidden bg-slate-950 fixed top-[72px] left-0 w-full border-t border-slate-800 overflow-hidden"
                >
                    <div className="flex flex-col items-center justify-center space-y-8 p-12 h-full pb-32">
                        {navLinks.map((link, i) => (
                            <motion.div
                                key={link.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Link
                                    href={link.href}
                                    className="text-2xl font-medium text-slate-300 hover:text-emerald-400"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}
        </motion.nav>
    );
}
