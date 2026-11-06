import Hero from '../components/Hero'
import About from '../components/About'
import Skills from '../components/Skills'
import Experience from '../components/Experience'
import Projects from '../components/Projects'
import Contact from '../components/Contact'
import Education from '../components/Education'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Hero />

      <section id="about" className="mt-24 scroll-mt-24 sm:mt-32">
        <About />
      </section>

      <section id="skills" className="mt-24 scroll-mt-24 sm:mt-32">
        <Skills />
      </section>

      <section id="experience" className="mt-24 scroll-mt-24 sm:mt-32">
        <Experience />
      </section>

      <section id="projects" className="mt-24 scroll-mt-24 sm:mt-32">
        <Projects />
      </section>

      <section id="education" className="mt-24 scroll-mt-24 sm:mt-32">
        <Education />
      </section>

      <section id="contact" className="mt-24 scroll-mt-24 sm:mt-32">
        <Contact />
      </section>

      <Footer />
    </>
  )
}
