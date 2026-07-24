import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

export default function MainLayout({ hero, children }) {
  return (
    <div className="relative z-10">
      <Navbar name={hero?.name} />
      <main>{children}</main>
      <Footer name={hero?.name} />
    </div>
  )
}
