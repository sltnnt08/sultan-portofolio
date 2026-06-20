import NavBar from '@/components/NavBar'
import HeroSection from '@/components/HeroSection'
import SkillsSection from '@/components/SkillsSection'
import ProjectsSection from '@/components/ProjectsSection'
import CodeSection from '@/components/CodeSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'

export default function Page() {
  return (
    <main className="bg-[#000000] min-h-screen">
      <NavBar />
      <HeroSection />
      <SkillsSection />
      <ProjectsSection />
      <CodeSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
