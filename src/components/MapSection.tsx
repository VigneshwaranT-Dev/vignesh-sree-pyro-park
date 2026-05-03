const MapSection = () => {
  return (
    <div className="relative mt-12">

      {/* 🔥 OUTER GLOW BORDER */}
      <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-orange-500/20 via-transparent to-orange-500/20 blur-md opacity-70" />

      {/* 🔥 MAIN CARD */}
      <div className="
        relative
        rounded-2xl
        overflow-hidden
        border border-white/10
        bg-[#020617]/60
        backdrop-blur-xl
        shadow-[0_0_40px_rgba(0,0,0,0.6)]
      ">

        {/* MAP */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d770.9742526969418!2d77.87810576946784!3d9.571638999407064!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b06d3888431332f%3A0xe8db017deb1374bd!2sVignesh%20Sree%20Pyro%20Park!5e1!3m2!1sen!2sin!4v1777806156176!5m2!1sen!2sin"
          className="w-full h-[360px] brightness-[0.85] contrast-[1.1] saturate-[0.9]"
          loading="lazy"
        />

        {/* 🔥 DARK OVERLAY (THEME MATCH) */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-[#020617]/50" />

        {/* 🔥 TOP LEFT BADGE */}
        {/* <div className="absolute top-3 left-3 z-10 flex items-center gap-2">

          <a
            href="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d770.9742526969418!2d77.87810576946784!3d9.571638999407064!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b06d3888431332f%3A0xe8db017deb1374bd!2sVignesh%20Sree%20Pyro%20Park!5e1!3m2!1sen!2sin!4v1777806156176!5m2!1sen!2sin"
            target="_blank"
            rel="noopener noreferrer"
            className="
              bg-white/90 text-black text-xs px-3 py-1.5 rounded-md
              shadow hover:bg-white transition
              backdrop-blur
            "
          >
            Open in Maps
          </a>

        </div> */}

        {/* 🔥 BOTTOM INFO (PREMIUM TOUCH) */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">

          <p className="text-sm text-white font-medium">
            Vignesh Sree Pyro Park
          </p>

          <p className="text-xs text-gray-400">
            Sivakasi, Tamil Nadu • Trusted fireworks supplier
          </p>

        </div>

      </div>
    </div>
  );
};

export default MapSection;