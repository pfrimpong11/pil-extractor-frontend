import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, Download, Menu, Zap, Cpu, Layout, Pill } from 'lucide-react';
import Background from '../assets/images/background.jpg';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
    const year = new Date().getFullYear();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkIsMobile();
        window.addEventListener('resize', checkIsMobile);

        return () => {
            window.removeEventListener('resize', checkIsMobile);
        };
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const handleGetStarted = () => {
        navigate("/HomePage");
    }

    const colors = {
        primary: '#4a90e2',
        secondary: '#f5a623',
        accent: '#7c4dff',
        background: '#f0f4f8',
        text: '#333333',
        white: '#ffffff',
    };

    const styles = {
        landingPage: {
            maxWidth: '100%',
            overflowX: 'hidden' as const,
            fontFamily: 'Arial, sans-serif',
            lineHeight: 1.6,
            color: colors.text,
            backgroundColor: colors.background,
            margin: 0,
            padding: 0,
        },
        header: {
            backgroundColor: colors.white,
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            position: 'fixed' as const,
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            width: '100%',
        },
        nav: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem',
            maxWidth: '1200px',
            margin: '0 auto',
        },
        logo: {
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: colors.primary,
        },
        navUl: {
            display: 'flex',
            listStyleType: 'none',
            margin: 0,
            padding: 0,
        },
        navLi: {
            marginLeft: '1.5rem',
        },
        navLink: {
            textDecoration: 'none',
            color: colors.text,
            fontWeight: 500,
            transition: 'color 0.3s ease',
        },
        hamburger: {
            display: 'none',
            cursor: 'pointer',
            backgroundColor: 'transparent',
            border: 'none',
            padding: '0.5rem',
        },
        mobileMenu: {
            display: 'none',
            position: 'absolute' as const,
            top: '60px',
            left: '0',
            right: '0',
            backgroundColor: colors.white,
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            zIndex: 1000,
        },
        mobileNavUl: {
            listStyleType: 'none',
            margin: 0,
            padding: 0,
        },
        mobileNavLi: {
            padding: '1rem',
            borderBottom: `1px solid ${colors.background}`,
        },
        mobileNavLink: {
            textDecoration: 'none',
            color: colors.text,
            fontWeight: 500,
            display: 'block',
        },
        main: {
            marginTop: '60px',
        },
        hero: {
            backgroundImage: `url(${Background})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center' as const,
            color: colors.white,
            position: 'relative' as const,
        },
        heroOverlay: {
            position: 'absolute' as const,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
        },
        heroContent: {
            position: 'relative' as const,
            zIndex: 1,
            maxWidth: '800px',
            padding: '2rem',
        },
        h1: {
            fontSize: '3.5rem',
            marginBottom: '1rem',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
        },
        heroDescription: {
            fontSize: '1.2rem',
            maxWidth: '600px',
            margin: '0 auto 2rem',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
        },
        ctaButton: {
            display: 'inline-block',
            backgroundColor: colors.accent,
            color: colors.white,
            padding: '0.8rem 1.5rem',
            textDecoration: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            transition: 'background-color 0.3s ease, transform 0.2s ease',
            cursor: 'pointer',
        },
        section: {
            padding: '4rem 0',
            maxWidth: '1200px',
            margin: '0 auto',
        },
        h2: {
            textAlign: 'center' as const,
            fontSize: '2.5rem',
            marginBottom: '2rem',
            color: colors.primary,
        },
        featureGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
        },
        feature: {
            backgroundColor: colors.white,
            padding: '1.5rem',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.3s ease',
        },
        featureIcon: {
            backgroundColor: colors.secondary,
            color: colors.white,
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '0 auto 1rem',
        },
        featureH3: {
            color: colors.primary,
            marginBottom: '1rem',
            textAlign: 'center' as const,
        },
        steps: {
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap' as const,
            gap: '2rem',
        },
        step: {
            flex: 1,
            minWidth: '200px',
            textAlign: 'center' as const,
        },
        stepIcon: {
            backgroundColor: colors.accent,
            color: colors.white,
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '0 auto 1rem',
            transition: 'transform 0.3s ease',
        },
        getStarted: {
            textAlign: 'center' as const,
            backgroundColor: colors.primary,
            color: colors.white,
            padding: '4rem 0',
        },
        footer: {
            textAlign: 'center' as const,
            padding: '2rem 0',
            backgroundColor: colors.white,
            marginTop: '4rem',
        },
    }

    return (
        <div style={styles.landingPage}>
            <header style={styles.header}>
                <nav style={styles.nav}>
                    <div style={styles.logo}>
                        <Pill size={24} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
                        PharmaScan
                    </div>
                    {!isMobile && (
                        <ul style={styles.navUl}>
                            <li style={styles.navLi}><a href="#features" style={styles.navLink}>Features</a></li>
                            <li style={styles.navLi}><a href="#how-it-works" style={styles.navLink}>How It Works</a></li>
                            <li style={styles.navLi}><a href="#get-started" style={styles.navLink}>Get Started</a></li>
                        </ul>
                    )}
                    {isMobile && (
                        <button 
                            style={{...styles.hamburger, display: 'block'}} 
                            onClick={toggleMenu}
                            aria-label="Toggle navigation menu"
                        >
                            <Menu size={24} color={colors.primary} />
                        </button>
                    )}
                </nav>
                {/* Mobile Menu */}
                {isMobile && (
                    <div style={{...styles.mobileMenu, display: isMenuOpen ? 'block' : 'none'}}>
                        <ul style={styles.mobileNavUl}>
                            <li style={styles.mobileNavLi}><a href="#features" style={styles.mobileNavLink} onClick={closeMenu}>Features</a></li>
                            <li style={styles.mobileNavLi}><a href="#how-it-works" style={styles.mobileNavLink} onClick={closeMenu}>How It Works</a></li>
                            <li style={styles.mobileNavLi}><a href="#get-started" style={styles.mobileNavLink} onClick={closeMenu}>Get Started</a></li>
                        </ul>
                    </div>
                )}
            </header>

            <main style={styles.main}>
                <section style={styles.hero}>
                    <div style={styles.heroOverlay}></div>
                    <div style={styles.heroContent}>
                        <h1 style={styles.h1}>PharmaScan</h1>
                        <p style={styles.heroDescription}>
                            Simplifying drug information extraction from Patient Information Leaflets (PILs).
                        </p>
                        <a onClick={handleGetStarted} style={styles.ctaButton}>
                            <Zap size={18} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
                            Get Started
                        </a>
                    </div>
                </section>

                <section id="features" style={styles.section}>
                    <h2 style={styles.h2}>Features</h2>
                    <div style={styles.featureGrid}>
                        <div style={styles.feature}>
                            <div style={styles.featureIcon}>
                                <Zap size={24} />
                            </div>
                            <h3 style={styles.featureH3}>Fast & Accurate Extraction</h3>
                            <p>Extract critical information such as dosage, side effects, and drug interactions in seconds.</p>
                        </div>
                        <div style={styles.feature}>
                            <div style={styles.featureIcon}>
                                <Layout size={24} />
                            </div>
                            <h3 style={styles.featureH3}>Easy to Use</h3>
                            <p>Upload an image or PDF of the Patient Information Leaflet and let the app do the rest.</p>
                        </div>
                        <div style={styles.feature}>
                            <div style={styles.featureIcon}>
                                <Cpu size={24} />
                            </div>
                            <h3 style={styles.featureH3}>AI-Powered Analysis</h3>
                            <p>Our advanced AI algorithms ensure accurate and comprehensive information extraction.</p>
                        </div>
                    </div>
                </section>

                <section id="how-it-works" style={styles.section}>
                    <h2 style={styles.h2}>How It Works</h2>
                    <div style={styles.steps}>
                        <div style={styles.step}>
                            <div style={styles.stepIcon}>
                                <Upload size={24} />
                            </div>
                            <h3>Upload</h3>
                            <p>Upload your PIL in PDF or image format.</p>
                        </div>
                        <div style={styles.step}>
                            <div style={styles.stepIcon}>
                                <FileText size={24} />
                            </div>
                            <h3>Process</h3>
                            <p>Our AI-powered engine processes the document and extracts key information.</p>
                        </div>
                        <div style={styles.step}>
                            <div style={styles.stepIcon}>
                                <Download size={24} />
                            </div>
                            <h3>Download</h3>
                            <p>Download or view the extracted data, ready for your reference.</p>
                        </div>
                    </div>
                </section>

                <section id="get-started" style={styles.getStarted}>
                    <h2 style={{...styles.h2, color: colors.white}}>Ready to simplify your work?</h2>
                    <p>Get started now and experience seamless extraction of important drug information.</p>
                    <a onClick={handleGetStarted} style={{...styles.ctaButton, backgroundColor: colors.white, color: colors.primary}}>
                        <Zap size={18} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
                        Start Now
                    </a>
                </section>
            </main>

            <footer style={styles.footer}>
                <p>&copy; {year} PharmaScan. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default LandingPage;