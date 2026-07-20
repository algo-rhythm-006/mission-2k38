"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { AnimatedTitle } from "./Animated-Title";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const container = useRef(null);

    useGSAP(
        () => {
            const clipAnimation = gsap.timeline({
                scrollTrigger: {
                    trigger: "#clip",
                    start: "center center",
                    end: "+=1000 center",
                    scrub: 1,
                    pin: true,
                    pinSpacing: true,
                },
            });

            clipAnimation.to(".mask-clip-path", {
                width: "100%",
                height: "100%",
                borderRadius: 0,
                ease: "power2.inOut",
            });
        },
        { scope: container }
    );

    return (
        <section
            ref={container}
            id="about"
            className="min-h-screen w-full bg-white text-black"
        >
            {/* TOP CONTENT */}
            <div className="relative flex flex-col items-center justify-center gap-6 py-32 text-center text-black min-h-[50vh]">
                <p className="font-general text-sm uppercase md:text-[10px] relative z-10">
                    Welcome to Zentry
                </p>

                <AnimatedTitle containerClass="mt-5 text-center !text-black text-6xl md:text-8xl font-black uppercase">
                    {
                        "Discover the world's<br /> largest shared adventure"
                    }
                </AnimatedTitle>

                <div className="about-subtext space-y-2 text-gray-700 text-sm md:text-base max-w-2xl px-6">
                    <p>
                        The Game of Games begins-your life, now an epic MMORPG
                    </p>

                    <p>
                        Zentry unites every player from countless games and platforms
                    </p>
                </div>
            </div>

            {/* IMAGE SECTION */}
            <div id="clip" className="relative h-screen w-full">
                <div
                    className="
            mask-clip-path
            relative
            overflow-hidden
            rounded-[40px]
            w-[300px]
            h-[400px]
            md:w-[500px]
            md:h-[600px]
            mx-auto
          "
                >
                    <img
                        src="https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1974&auto=format&fit=crop"
                        alt="Gaming World"
                        className="absolute top-0 left-0 h-full w-full object-cover"
                    />

                    <div className="absolute inset-0 bg-black/30" />
                </div>
            </div>
        </section>
    );
};

export default About;