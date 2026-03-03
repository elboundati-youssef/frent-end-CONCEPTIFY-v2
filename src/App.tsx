import React from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { ReactLenis } from "lenis/react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import Library from "./pages/Library";
import ServiceDetail from "./pages/ServiceDetail";
import Partenaires from "./pages/Partenaires";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CustomCursor from "./components/CustomCursor";

const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    mass: 0.1,
    stiffness: 100,
    damping: 20,
    restDelta: 0.001,
  });

  return (
    <ReactLenis root options={{ lerp: 0.08, smoothWheel: true }}>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8E2A8B] to-[#4DA8C8] origin-left z-[100]"
        style={{ scaleX: smoothProgress }}
      />
      {children}
    </ReactLenis>
  );
};

const NoiseOverlay = () => (
  <div
    className="fixed inset-0 z-50 pointer-events-none opacity-[0.04] mix-blend-overlay"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
    }}
  />
);

const AnimatedRoutes = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/login') || location.pathname.startsWith('/dashboard');

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
   
          <Route path="/reference/:id" element={<Library />} />
          <Route path="/service/:id" element={<ServiceDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </AnimatePresence>
      {!isAdminRoute && <Footer />}
    </>
  );
};

export default function App() {
  return (
    <Router>
      <CustomCursor />
      <NoiseOverlay />
      <SmoothScroll>
        <div className="min-h-screen bg-bg text-white selection:bg-accent selection:text-white font-sans">
          <AnimatedRoutes />
        </div>
      </SmoothScroll>
    </Router>
  );
}
