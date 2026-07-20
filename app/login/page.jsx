"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import AnimatedButton from "@/components/ui/animated-button";

/* ─── Role Data ─── */
const ROLES = [
  {
    id: "player",
    label: "Player",
    tagline: "Showcase your profile. Own your story.",
    description:
      "Apply for trials, connect with scouts, and build your football career.",
    image: "/login/images/player.png",
    registerHref: "/register/player",
    accentPos: "left",
  },
  {
    id: "coach",
    label: "Coach",
    tagline: "Lead. Inspire. Develop.",
    description:
      "Manage your squad, share tactical insights, and shape future talent.",
    image: "/login/images/coach.png",
    registerHref: "/register/coach",
    accentPos: "center",
  },
  {
    id: "scout",
    label: "Scout",
    tagline: "Find the next champion.",
    description:
      "Discover raw talent, evaluate players, and build a winning team.",
    image: "/login/images/scout.png",
    registerHref: "/register/scout",
    accentPos: "right",
  },
];

/* ─── Main Component ─── */
export default function LoginPage() {
  const [activeRole, setActiveRole] = useState(null); // null = selection screen
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  /* refs */
  const pageRef = useRef(null);
  const selectionRef = useRef(null);
  const loginPanelRef = useRef(null);
  const loginCardRef = useRef(null);
  const card0 = useRef(null);
  const card1 = useRef(null);
  const card2 = useRef(null);
  const cardRefs = [card0, card1, card2];
  const headerRef = useRef(null);
  const bgRef = useRef(null);

  /* ── entrance animation ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from(headerRef.current, { y: -60, opacity: 0, duration: 1 })
        .from(
          cardRefs.map((r) => r.current),
          { y: 80, opacity: 0, stagger: 0.12, duration: 0.9 },
          "-=0.6"
        );
    }, pageRef);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── role-select → login transition ── */
  const openLogin = (role) => {
    const tl = gsap.timeline({
      defaults: { ease: "expo.inOut", duration: 0.65 },
      onComplete: () => setActiveRole(role),
    });

    /* fade & compress cards out */
    tl.to(headerRef.current, { y: -40, opacity: 0, duration: 0.45 })
      .to(
        cardRefs.map((r) => r.current),
        { scale: 0.88, opacity: 0, y: 30, stagger: 0.06 },
        "-=0.35"
      )
      .to(selectionRef.current, { opacity: 0, duration: 0.3 }, "-=0.2");
  };

  /* ── login card entrance after state change ── */
  useEffect(() => {
    if (!activeRole) return;
    gsap.set(loginPanelRef.current, { display: "flex" });

    /* stadium bg zoom */
    gsap.fromTo(
      bgRef.current,
      { scale: 1.1, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.2, ease: "power3.out" }
    );

    /* card slide up */
    gsap.fromTo(
      loginCardRef.current,
      { y: 80, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.9, delay: 0.25, ease: "expo.out" }
    );
  }, [activeRole]);

  /* ── back → selection transition ── */
  const goBack = () => {
    const tl = gsap.timeline({
      onComplete: () => {
        setActiveRole(null);
        setEmail("");
        setPassword("");
      },
    });
    tl.to(loginCardRef.current, {
      y: 60, opacity: 0, scale: 0.94, duration: 0.5, ease: "expo.in",
    }).to(bgRef.current, { opacity: 0, duration: 0.35 }, "-=0.3");

    /* restore selection */
    tl.call(() => {
      gsap.set(loginPanelRef.current, { display: "none" });
      gsap.set(selectionRef.current, { opacity: 1 });
    });
    tl.from(headerRef.current, { y: -40, opacity: 0, duration: 0.6, ease: "expo.out" })
      .from(
        cardRefs.map((r) => r.current),
        { scale: 0.88, opacity: 0, y: 30, stagger: 0.08, duration: 0.65, ease: "expo.out" },
        "-=0.4"
      );
  };

  const meta = ROLES.find((r) => r.id === activeRole) || ROLES[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login:", { role: activeRole, email });
  };

  return (
    <div
      ref={pageRef}
      className="relative w-screen h-screen overflow-hidden bg-[#080808]"
    >
      {/* ══════════ AMBIENT BACKGROUND ══════════ */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 35%, rgba(255,213,74,0.045) 0%, transparent 65%), radial-gradient(ellipse 100% 100% at 50% 100%, rgba(40,40,40,0.8) 0%, transparent 60%)",
        }}
      />

      {/* Noise grain */}
      <svg className="absolute inset-0 z-[1] w-full h-full pointer-events-none opacity-[0.025]" aria-hidden>
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>

      {/* ══════════ ROLE SELECTION SCREEN ══════════ */}
      <div
        ref={selectionRef}
        className="absolute inset-0 z-[10] flex flex-col items-center justify-center px-6"
      >
        {/* Header */}
        <div ref={headerRef} className="flex flex-col items-center gap-3 mb-12 text-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 rounded-full border border-yellow-400/20 bg-yellow-400/[0.06] px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.28em] text-yellow-400">
            <span className="h-1.5 w-1.5 rounded-full bg-yellow-400 animate-pulse" />
            Mission 2K38 · Authentication
          </div>

          <h1 className="text-[clamp(2.6rem,7vw,5.5rem)] font-black tracking-[-0.03em] leading-[0.95] text-white">
            Select Your{" "}
            <span
              style={{
                background: "linear-gradient(115deg, #FFD54A 0%, #c9a030 45%, #777 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Role
            </span>
          </h1>

          <p className="text-sm text-white/40 max-w-xs leading-relaxed">
            Choose how you enter the Mission 2K38 ecosystem.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full max-w-5xl">
          {ROLES.map((role, i) => (
            <RoleCard
              key={role.id}
              ref={cardRefs[i]}
              role={role}
              onClick={() => openLogin(role.id)}
            />
          ))}
        </div>

        {/* Bottom wordmark */}
        <p className="absolute bottom-6 text-[10px] tracking-[0.2em] uppercase text-white/15">
          © 2026 Mission 2K38 · All rights reserved
        </p>
      </div>

      {/* ══════════ LOGIN PANEL (hidden until role selected) ══════════ */}
      <div
        ref={loginPanelRef}
        className="absolute inset-0 z-[20] hidden items-center justify-center px-4"
      >
        {/* Stadium BG */}
        <div
          ref={bgRef}
          className="absolute inset-0 z-0"
          style={{ opacity: 0 }}
        >
          <Image
            src="/login/images/stadium.jpg"
            alt="Stadium"
            fill
            className="object-cover object-center"
            priority
            style={{ filter: "blur(3px) brightness(0.35)" }}
          />
          {/* Yellow radial on stadium */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,213,74,0.08) 0%, transparent 70%)",
            }}
          />
          {/* Vignette */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
        </div>

        {/* Login Card */}
        <div
          ref={loginCardRef}
          className="relative z-[10] w-full"
          style={{ maxWidth: 460, opacity: 0 }}
        >
          {/* Card shell */}
          <div
            className="relative overflow-hidden rounded-3xl border border-white/[0.09] bg-black/50 backdrop-blur-2xl"
            style={{
              boxShadow:
                "0 0 0 1px rgba(255,213,74,0.08), 0 32px 80px rgba(0,0,0,0.75), 0 0 100px rgba(255,213,74,0.05)",
            }}
          >
            {/* Top glow line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent" />

            {/* Role image strip */}
            {activeRole && (
              <div className="relative h-36 w-full overflow-hidden">
                <Image
                  src={`/login/images/${activeRole}.png`}
                  alt={activeRole}
                  fill
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90" />
                {/* Role badge */}
                <div className="absolute bottom-4 left-6 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-yellow-400/40 bg-yellow-400/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-yellow-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-yellow-400 animate-pulse" />
                    {meta.label}
                  </span>
                </div>
              </div>
            )}

            {/* Form content */}
            <div className="flex flex-col gap-5 px-8 py-7">
              {/* Headings */}
              <div>
                <h2 className="text-2xl font-black tracking-tight text-white">
                  {meta.label} Login
                </h2>
                <p className="mt-1 text-xs text-white/40 leading-relaxed">
                  Welcome back. Sign in to continue your Mission 2K38 journey.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/35">
                    Email Address
                  </label>
                  <div
                    className="rounded-xl transition-all duration-300"
                    style={{
                      boxShadow: emailFocused
                        ? "0 0 0 1.5px #FFD54A, 0 0 18px rgba(255,213,74,0.18)"
                        : "0 0 0 1px rgba(255,255,255,0.07)",
                    }}
                  >
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setEmailFocused(true)}
                      onBlur={() => setEmailFocused(false)}
                      placeholder="you@example.com"
                      required
                      id={`${activeRole}-email`}
                      autoComplete="email"
                      className="w-full rounded-xl bg-white/[0.04] px-4 py-3.5 text-sm text-white placeholder-white/20 outline-none"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/35">
                      Password
                    </label>
                    <button
                      type="button"
                      className="text-[10px] text-white/25 hover:text-yellow-400 transition-colors"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <div
                    className="rounded-xl transition-all duration-300"
                    style={{
                      boxShadow: passwordFocused
                        ? "0 0 0 1.5px #FFD54A, 0 0 18px rgba(255,213,74,0.18)"
                        : "0 0 0 1px rgba(255,255,255,0.07)",
                    }}
                  >
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setPasswordFocused(true)}
                      onBlur={() => setPasswordFocused(false)}
                      placeholder="Enter your password"
                      required
                      id={`${activeRole}-password`}
                      autoComplete="current-password"
                      className="w-full rounded-xl bg-white/[0.04] px-4 py-3.5 text-sm text-white placeholder-white/20 outline-none"
                    />
                  </div>
                </div>

                {/* Submit */}
                <div className="mt-1">
                  <AnimatedButton
                    type="submit"
                    className="w-full !rounded-xl !bg-[#FFD54A] !border-yellow-500/40 !text-black !font-black dark:!bg-[#FFD54A] dark:!text-black dark:!border-yellow-500/40"
                  >
                    Sign In to Mission 2K38
                  </AnimatedButton>
                </div>
              </form>

              {/* Footer row */}
              <div className="flex items-center justify-between">
                <button
                  onClick={goBack}
                  className="flex items-center gap-1.5 text-[10px] font-medium text-white/30 hover:text-white/70 transition-colors uppercase tracking-widest"
                >
                  ← Change Role
                </button>
                <span className="text-[10px] text-white/30">
                  New?{" "}
                  <a
                    href={meta.registerHref}
                    className="font-bold text-yellow-400 hover:text-yellow-300 transition-colors"
                  >
                    Register
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────── */
/*  ROLE CARD sub-component                */
/* ─────────────────────────────────────── */
import { forwardRef } from "react";

const RoleCard = forwardRef(function RoleCard({ role, onClick }, ref) {
  const hoverTl = useRef(null);

  const onEnter = () => {
    hoverTl.current = gsap.to(ref.current, {
      y: -10,
      scale: 1.03,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  const onLeave = () => {
    gsap.to(ref.current, {
      y: 0,
      scale: 1,
      duration: 0.5,
      ease: "elastic.out(1,0.5)",
    });
  };

  return (
    <div
      ref={ref}
      onClick={onClick}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="group relative flex flex-col cursor-pointer overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03]"
      style={{
        boxShadow: "0 0 0 1px rgba(255,213,74,0.05), 0 8px 40px rgba(0,0,0,0.55)",
        backdropFilter: "blur(12px)",
        willChange: "transform",
      }}
      role="button"
      tabIndex={0}
      aria-label={`Continue as ${role.label}`}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
    >
      {/* Top glow strip */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent" />

      {/* Hover yellow inner glow */}
      <div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
        style={{
          boxShadow: "inset 0 0 50px rgba(255,213,74,0.07), 0 0 60px rgba(255,213,74,0.06)",
        }}
      />

      {/* Role image */}
      <div className="relative h-[200px] sm:h-[220px] w-full overflow-hidden">
        <Image
          src={role.image}
          alt={role.label}
          fill
          className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.06]"
          sizes="(max-width: 640px) 90vw, 33vw"
        />
        {/* Bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#080808]" />
      </div>

      {/* Text */}
      <div className="flex flex-col gap-2 px-5 pb-6 pt-3">
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-3 py-[3px] text-[10px] font-bold uppercase tracking-[0.22em] text-yellow-400">
          <span className="h-1 w-1 rounded-full bg-yellow-400 animate-pulse" />
          {role.label}
        </span>

        <p className="text-[11px] leading-relaxed text-white/45 group-hover:text-white/65 transition-colors duration-300">
          {role.description}
        </p>

        {/* CTA */}
        <div className="mt-1 flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.18em] text-yellow-400/60 group-hover:text-yellow-400 transition-colors duration-300">
          Enter as {role.label}
          <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
        </div>
      </div>
    </div>
  );
});
