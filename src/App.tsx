import { useEffect, useRef } from 'react';

const INSTAGRAM_URL = 'https://instagram.com/rend25072026';

function useReveal() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const targets = root.querySelectorAll<HTMLElement>('.reveal');

    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return rootRef;
}

function App() {
  const rootRef = useReveal();

  return (
    <div ref={rootRef} className="relative min-h-screen bg-black text-white">
      {/* Ambient backdrop glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            'radial-gradient(60% 50% at 50% 0%, rgba(255,255,255,0.08) 0%, rgba(0,0,0,0) 70%)',
        }}
      />

      <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <p className="reveal mb-6 text-[0.7rem] font-medium uppercase tracking-[0.45em] text-white/45">
          Video Editing Agency
        </p>

        <h1
          className="reveal font-extrabold tracking-tighter leading-none"
          style={{
            fontSize: 'clamp(4.5rem, 18vw, 13rem)',
            transitionDelay: '0.1s',
          }}
        >
          Rend
        </h1>

        <h2
          className="reveal mt-10 max-w-3xl font-medium tracking-tight"
          style={{
            fontSize: 'clamp(1.5rem, 3.4vw, 2.6rem)',
            lineHeight: 1.2,
            transitionDelay: '0.25s',
          }}
        >
          Professional Video Editing for Your Videos
        </h2>

        <p
          className="reveal mt-6 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg"
          style={{ transitionDelay: '0.4s' }}
        >
          We help YouTube creators and businesses with high-quality long-form
          videos and Shorts that keep viewers engaged.
        </p>

        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="reveal group mt-12 inline-flex items-center gap-2.5 rounded-full bg-white px-9 py-4 text-sm font-semibold text-black transition-all duration-300 ease-out hover:scale-[1.06] hover:bg-white active:scale-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          style={{ transitionDelay: '0.55s' }}
        >
          Contact Us on Instagram
          <svg
            className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </a>
      </main>

      <footer className="flex items-center justify-center px-6 py-10 text-center">
        <p className="reveal text-xs font-normal tracking-wide text-white/35">
          © 2026 Rend. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;
