"use client";
import React, { useEffect, useState } from "react";

const Preloader = ({ isLoading, setIsLoading }) => {
    const [mounted, setMounted] = useState(false);
    const [showChampions, setShowChampions] = useState(false);
    const [isFadingOut, setIsFadingOut] = useState(false);

    useEffect(() => {
        // Start initial fade-in of "Who are we?" immediately after mounting
        setMounted(true);

        // Disable scrolling while loader is active
        document.body.style.overflow = "hidden";

        // Reveal "CHAMPIONS" after 1 second
        const timer1 = setTimeout(() => {
            setShowChampions(true);
        }, 1000);

        // 3 seconds minimum loader duration
        const timer2 = setTimeout(() => {
            // Start fade out transition
            setIsFadingOut(true);

            // Wait for the fade out to finish (800ms) before unmounting
            setTimeout(() => {
                setIsLoading(false);
                document.body.style.overflow = "";
            }, 800);
        }, 3000);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            document.body.style.overflow = "";
        };
    }, [setIsLoading]);

    if (!isLoading) return null;

    return (
        <div
            className={`fixed inset-0 z-[999999] bg-[#000000] flex flex-col items-center justify-center transition-opacity duration-[800ms] ease-in-out ${isFadingOut ? "opacity-0" : "opacity-100"
                }`}
        >
            <div className="flex flex-col items-center justify-center text-white font-sans text-center px-4">
                {/* Screen 1: "Who are we?" */}
                <h1
                    className={`text-[clamp(3rem,8vw,7.5rem)] font-[900] tracking-tight leading-none transition-opacity duration-1000 ease-in-out ${mounted ? "opacity-100" : "opacity-0"
                        }`}
                >
                    Who are we?
                </h1>

                {/* Screen 2: "CHAMPIONS" */}
                <div className="overflow-hidden mt-2 md:mt-4">
                    <h1
                        className={`text-[clamp(3.5rem,10vw,8.75rem)] font-[900] tracking-widest leading-none transform transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${showChampions ? "translate-y-0 opacity-100" : "translate-y-[100%] opacity-0"
                            }`}
                    >
                        CHAMPIONS
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default Preloader;
