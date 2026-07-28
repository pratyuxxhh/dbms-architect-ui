import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'

export default function MainLayout({ children }) {
  return (
    <div className="animate-fade-in min-h-screen bg-background">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
