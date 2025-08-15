import React from 'react';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Features from './components/sections/Features';
import SignupLogin from './components/sections/SignupLogin';
import Demo from './components/sections/Demo';
import Testimonials from './components/sections/Testimonials';
import Pricing from './components/sections/Pricing';
import Contact from './components/sections/Contact';
import FAQ from './components/sections/FAQ';
import Footer from './components/layout/Footer';

function App() {
  return (
    <div className="bg-gray-50 text-gray-800">
      <Navbar />
      <Hero />
      <About />
      <Features />
      <SignupLogin />
      <Demo />
      <Testimonials />
      <Pricing />
      <Contact />
      <FAQ />
      <Footer />
    </div>
  );
}

export default App;