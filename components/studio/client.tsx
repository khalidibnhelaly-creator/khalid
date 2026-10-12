"use client";

import { useEffect, useRef, useState } from "react";

const pad = (n: number) => String(n).padStart(2, "0");

/** Camera-style timecode (HH:MM:SS:FF at 24 fps) counting from page load. */
export function Timecode() {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const start = performance.now();
    let raf = 0;
    let last = -1;
    const tick = (now: number) => {
      const frames = Math.floor(((now - start) / 1000) * 24);
      if (frames !== last && ref.current) {
        last = frames;
        const ff = frames % 24;
        const s = Math.floor(frames / 24);
        ref.current.textContent = `${pad(Math.floor(s / 3600))}:${pad(Math.floor(s / 60) % 60)}:${pad(s % 60)}:${pad(ff)}`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return <span ref={ref}>00:00:00:00</span>;
}

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 3.5v17l15-8.5z" />
  </svg>
);

/**
 * Click-to-load YouTube film. Only the poster ships with the page; the
 * player (and YouTube's scripts) load when someone presses play.
 */
export function StudioFilm({
  id,
  title,
  label,
  featured = false,
}: {
  id: string;
  title: string;
  label: string;
  featured?: boolean;
}) {
  const [playing, setPlaying] = useState(false);
  const [thumb, setThumb] = useState(`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`);
  const fallback = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

  if (playing) {
    return (
      <div className="st-film">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className="st-film">
      <button
        type="button"
        className="st-film-poster"
        aria-label={`Play film: ${title}`}
        onClick={() => {
          setPlaying(true);
          (window as unknown as { dataLayer?: object[] }).dataLayer?.push({ event: "studio_film_play", film: id });
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={thumb}
          alt=""
          loading={featured ? "eager" : "lazy"}
          onError={() => thumb !== fallback && setThumb(fallback)}
          onLoad={(e) => {
            // YouTube serves a 120px placeholder instead of a 404 when maxres is missing
            if (e.currentTarget.naturalWidth <= 120 && thumb !== fallback) setThumb(fallback);
          }}
        />
        {featured ? (
          <span className="st-film-meta">
            <span>
              <span className="cred">{label}</span>
              <span className="disp t">{title}</span>
            </span>
            <span className="st-play"><PlayIcon /></span>
          </span>
        ) : (
          <span className="st-play"><PlayIcon /></span>
        )}
      </button>
    </div>
  );
}
