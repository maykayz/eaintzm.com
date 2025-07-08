import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Dopa from '../assets/images/portfolio/dopa.png';
import Datawow from '../assets/images/portfolio/datawow.png';
import DatawowBlog from '../assets/images/portfolio/datawow-blog.png';
import DriveSafe from '../assets/images/portfolio/drivesafe.png';
import DriveSafeDrvr from '../assets/images/portfolio/drivesafe-map.jpg';

const Portfolio = () => {
    const portfolioRef = useRef(null);
    const imagesRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const images = [Dopa, Datawow, DatawowBlog, DriveSafe, DriveSafeDrvr];
    const imageNames = ['Dopa', 'Datawow', 'Datawow Blog', 'DriveSafe', 'DriveSafe Drvr'];

    useEffect(() => {
        let scrollTimeout;
        let accumulatedDelta = 0;
        const scrollThreshold = 50; // Minimum scroll amount needed to trigger navigation

        const handleScroll = (e) => {
            if (!portfolioRef.current?.contains(e.target)) return;
            
            e.preventDefault();
            e.stopPropagation();
            
            if (isScrolling) return;
            
            const delta = e.deltaY;
            accumulatedDelta += delta;
            
            // Clear previous timeout
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            
            // Set a timeout to handle the accumulated scroll
            scrollTimeout = setTimeout(() => {
                if (Math.abs(accumulatedDelta) >= scrollThreshold) {
                    if (accumulatedDelta > 0 && currentIndex < images.length - 1) {
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
                    } else if (accumulatedDelta < 0 && currentIndex > 0) {
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
                    } else if (accumulatedDelta > 0 && currentIndex === images.length - 1) {
                        // At last image, allow normal scroll to next section
                        // Remove event listener temporarily to allow normal scroll
                        portfolioRef.current?.removeEventListener('wheel', handleScroll);
                        portfolioRef.current?.removeEventListener('touchmove', handleTouchMove);
                        setTimeout(() => {
                            portfolioRef.current?.addEventListener('wheel', handleScroll, { passive: false });
                            portfolioRef.current?.addEventListener('touchmove', handleTouchMove, { passive: false });
                        }, 1000);
                    }
                }
                accumulatedDelta = 0;
            }, 50); // Debounce scroll events
        };

        // Handle touch events for mobile/trackpad
        let touchStartY = 0;
        let touchStartX = 0;

        const handleTouchStart = (e) => {
            if (!portfolioRef.current?.contains(e.target)) return;
            touchStartY = e.touches[0].clientY;
            touchStartX = e.touches[0].clientX;
        };

        const handleTouchMove = (e) => {
            if (!portfolioRef.current?.contains(e.target)) return;
            if (isScrolling) return;
            
            const touchY = e.touches[0].clientY;
            const touchX = e.touches[0].clientX;
            const deltaY = touchStartY - touchY;
            const deltaX = touchStartX - touchX;
            
            // Only handle horizontal swipes (ignore vertical scrolling)
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 30) {
                e.preventDefault();
                e.stopPropagation();
                
                if (deltaX > 0 && currentIndex < images.length - 1) {
                    // Swipe left to next image
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
                } else if (deltaX < 0 && currentIndex > 0) {
                    // Swipe right to previous image
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
                }
            }
        };

        const portfolio = portfolioRef.current;
        if (portfolio) {
            portfolio.addEventListener('wheel', handleScroll, { passive: false });
            portfolio.addEventListener('touchstart', handleTouchStart, { passive: false });
            portfolio.addEventListener('touchmove', handleTouchMove, { passive: false });
            
            return () => {
                portfolio.removeEventListener('wheel', handleScroll);
                portfolio.removeEventListener('touchstart', handleTouchStart);
                portfolio.removeEventListener('touchmove', handleTouchMove);
                if (scrollTimeout) {
                    clearTimeout(scrollTimeout);
                }
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