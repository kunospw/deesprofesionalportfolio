"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { songs, type Song } from "@/data/songs";

type AudioState = {
  track: Song;
  index: number;
  playing: boolean;
  currentTime: number;
  duration: number;
  toggle: () => void;
  next: () => void;
  prev: () => void;
  seek: (time: number) => void;
};

const AudioContext = createContext<AudioState | null>(null);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const resumeAfterSwitch = useRef(false);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const goTo = useCallback(
    (nextIndex: number, autoplay: boolean) => {
      resumeAfterSwitch.current = autoplay;
      setCurrentTime(0);
      setDuration(0);
      setIndex((nextIndex + songs.length) % songs.length);
    },
    [],
  );

  // The <audio> src follows `index`; resume playback once the new track is set.
  useEffect(() => {
    if (!resumeAfterSwitch.current) return;
    resumeAfterSwitch.current = false;
    audioRef.current?.play().catch(() => setPlaying(false));
  }, [index]);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) audio.play().catch(() => setPlaying(false));
    else audio.pause();
  }, []);

  const next = useCallback(() => goTo(index + 1, true), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1, true), [goTo, index]);

  const seek = useCallback((time: number) => {
    const audio = audioRef.current;
    if (!audio || !Number.isFinite(time)) return;
    audio.currentTime = time;
    setCurrentTime(time);
  }, []);

  const value = useMemo(
    () => ({
      track: songs[index],
      index,
      playing,
      currentTime,
      duration,
      toggle,
      next,
      prev,
      seek,
    }),
    [index, playing, currentTime, duration, toggle, next, prev, seek],
  );

  return (
    <AudioContext.Provider value={value}>
      {children}
      <audio
        ref={audioRef}
        src={songs[index].src}
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onDurationChange={(e) => setDuration(e.currentTarget.duration)}
        onEnded={() => goTo(index + 1, true)}
      />
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error("useAudio must be used inside <AudioProvider>");
  return ctx;
}
