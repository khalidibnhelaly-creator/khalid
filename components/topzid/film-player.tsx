"use client";

import { useState } from "react";

/**
 * Click-to-load YouTube player. Only a thumbnail ships with the page; the
 * YouTube iframe (and its ~1 MB of scripts) loads when someone presses play.
 */
export function FilmPlayer({
  id,
  title,
  hires = false,
  onPlay,
}: {
  id: string;
  title: string;
  hires?: boolean;
  onPlay?: () => void;
}) {
  const [playing, setPlaying] = useState(false);
  const [thumb, setThumb] = useState(
    `https://i.ytimg.com/vi/${id}/${hires ? "maxresdefault" : "hqdefault"}.jpg`
  );

  if (playing) {
    return (
      <div className="player">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className="player">
      <button
        type="button"
        aria-label={`Play: ${title}`}
        onClick={() => {
          setPlaying(true);
          onPlay?.();
          (window as unknown as { dataLayer?: object[] }).dataLayer?.push({ event: "tz_film_play", film: id });
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={thumb}
          alt=""
          loading="lazy"
          onError={() => setThumb(`https://i.ytimg.com/vi/${id}/hqdefault.jpg`)}
          onLoad={(e) => {
            // YouTube serves a 120px placeholder instead of 404 when maxres is missing
            if (e.currentTarget.naturalWidth <= 120) setThumb(`https://i.ytimg.com/vi/${id}/hqdefault.jpg`);
          }}
        />
        <span className="play">
          <span>
            <svg viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
              <path d="M6 4l14 8-14 8z" />
            </svg>
          </span>
        </span>
      </button>
    </div>
  );
}

/** Hero reel card: hides its caption overlay once playing. */
export function ReelCard({ id, title, tag }: { id: string; title: string; tag: string }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className={`reel${playing ? " is-playing" : ""}`}>
      <FilmPlayer id={id} title={title} hires onPlay={() => setPlaying(true)} />
      <div className="label">
        <b>{title}</b>
        <span>{tag}</span>
      </div>
    </div>
  );
}
