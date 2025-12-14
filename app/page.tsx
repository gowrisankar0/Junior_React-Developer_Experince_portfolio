import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Education from "./components/Education";
import Certifications from "./components/Certifications";

export default function Home() {
  return (
    <main className="min-h-screen bg-background relative selection:bg-accent/30 selection:text-accent">
      <Navbar />
      <Hero />
      <Experience />
      <Skills />
      <Education />
      <Certifications />
      <Contact />
    </main>
  );
}
