"use client";

import { useState } from "react";

/** Click-to-load YouTube testimonial. No YouTube scripts until someone presses play. */
export function VideoTestimonial({ id, label, vertical = false }: { id: string; label: string; vertical?: boolean }) {
  const [on, setOn] = useState(false);
  return (
    <figure className={`oma-vt${vertical ? " vert" : ""}`}>
      <div className="frame">
        {on ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
            title={label}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            aria-label={`Play: ${label}`}
            onClick={() => {
              setOn(true);
              (window as unknown as { dataLayer?: object[] }).dataLayer?.push({ event: "oma_testimonial_play", video: id });
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" />
            <span className="play" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M6 4l14 8-14 8z" /></svg>
            </span>
          </button>
        )}
      </div>
      <figcaption className="lbl">{label}</figcaption>
    </figure>
  );
}
