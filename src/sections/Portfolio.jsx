import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Dopa from '../assets/images/portfolio/dopa.png';
import Datawow from '../assets/images/portfolio/datawow.png';
import DatawowBlog from '../assets/images/portfolio/datawow-blog.png';

const Portfolio = () => {
    const portfolioRef = useRef(null);
    const imagesRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const images = [Dopa, Datawow, DatawowBlog];
    const imageNames = ['Dopa', 'Datawow', 'Datawow Blog'];

    useEffect(() => {
        const handleWheel = (e) => {
            if (!portfolioRef.current?.contains(e.target)) return;
            
            e.preventDefault();
            e.stopPropagation();
            
            if (isScrolling) return;
            
            const delta = e.deltaY;
            
            if (delta > 0 && currentIndex < images.length - 1) {
                // Scroll right to next image
                setIsScrolling(true);
                setCurrentIndex(prev => prev + 1);
                
                gsap.to(imagesRef.current, {
                    x: -((currentIndex + 1) * window.innerWidth),
                    duration: 0.8,
                    ease: "power2.out",
                    onComplete: () => {
                        setTimeout(() => setIsScrolling(false), 300);
                    }
                });
            } else if (delta < 0 && currentIndex > 0) {
                // Scroll left to previous image
                setIsScrolling(true);
                setCurrentIndex(prev => prev - 1);
                
                gsap.to(imagesRef.current, {
                    x: -((currentIndex - 1) * window.innerWidth),
                    duration: 0.8,
                    ease: "power2.out",
                    onComplete: () => {
                        setTimeout(() => setIsScrolling(false), 300);
                    }
                });
            } else if (delta > 0 && currentIndex === images.length - 1) {
                // At last image, allow normal scroll to next section
                // Remove event listener temporarily to allow normal scroll
                portfolioRef.current?.removeEventListener('wheel', handleWheel);
                setTimeout(() => {
                    portfolioRef.current?.addEventListener('wheel', handleWheel, { passive: false });
                }, 1000);
            }
        };

        const portfolio = portfolioRef.current;
        if (portfolio) {
            portfolio.addEventListener('wheel', handleWheel, { passive: false });
            
            return () => {
                portfolio.removeEventListener('wheel', handleWheel);
            };
        }
    }, [currentIndex, isScrolling, images.length]);

    return (
        <section ref={portfolioRef} className="hero h-screen section flex flex-col justify-center items-center overflow-hidden relative">
            <h1 className="hero__title text-white font-saunde lg:text-8xl md:text-6xl text-6xl mb-10" data-aos="flip-up" data-aos-duration="1000">Portfolio</h1>
            
            <div className="w-full h-[60vh] overflow-hidden relative">
                <div ref={imagesRef} className="flex flex-row h-full">
                    {images.map((image, index) => (
                        <img 
                            key={index}
                            src={image} 
                            alt={imageNames[index]} 
                            className="w-screen h-full object-contain flex-shrink-0 rounded-lg" 
                            data-aos="fade-up" 
                            data-aos-delay={100 * (index + 1)} 
                        />
                    ))}
                </div>
            </div>
            
            {/* Navigation dots */}
            <div className="flex gap-2 mt-6">
                {images.map((_, index) => (
                    <div 
                        key={index}
                        className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                            index === currentIndex ? 'bg-secondary' : 'bg-white/30'
                        }`}
                    />
                ))}
            </div>
        </section>
    );
}

export default Portfolio;