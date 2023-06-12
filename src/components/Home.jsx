import React, { useState, useRef, useEffect } from "react";
import videoBG from "../assets/videoBG.mp4";
import { HiOutlinePlayPause } from "react-icons/hi2";
import { GoMute, GoUnmute } from "react-icons/go";
import { Link as RouteLink } from "react-router-dom";

const HomeMultimedia = () => {
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {});

  const handleToggleMute = () => {
    setMuted(!muted);
  };

  const handlePlayPause = () => {
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setPlaying(!playing);
  };

  return (
    <section id="home" className="font-header">
      <div className="relative flex items-center justify-center">
        <div className="relative">
          <div className="absolute top-0 left-0 w-full h-full bg-black/40"></div>

          <video
            className="w-full h-full"
            src={videoBG}
            autoPlay
            loop
            muted={muted}
            ref={videoRef}
          />

          <div className="absolute grid place-items-start h-full w-full top-0 left-0 mt-40 ml-8">
            <div className="py-2 px-4 rounded-lg font-bold text-7xl text-white leading-normal text-left">
              <h1>Sangka</h1>
              <h1>Registration</h1>
              <h4 className="text-lg mt-5">
                Unleash Your Inner Champion: Register Now for the most awaited
                SANGKA
              </h4>
              <RouteLink
                to="/register"
                className="text-white rounded-xl button backdrop-blur-sm bg-black/50 tracking-wide font-semibold"
              >
                Register Now!
              </RouteLink>
            </div>
          </div>
        </div>

        <div className="absolute bottom-5 right-5 flex justify-center gap-5">
          <button className="m-5" onClick={handlePlayPause}>
            <HiOutlinePlayPause size={20} color="white" />
          </button>

          <button className="m-5" onClick={handleToggleMute}>
            {muted ? (
              <GoMute size={20} color="white" />
            ) : (
              <GoUnmute size={20} color="white" />
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default HomeMultimedia;
