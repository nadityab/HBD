import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./HappyBirthday.css";

interface CustomData {
  greeting: string;
  name: string;
  greetingText: string;
  text1: string;
  textInChatBox: string;
  sendButtonLabel: string;
  text2: string;
  text3: string;
  text4: string;
  text4Adjective: string;
  text5Entry: string;
  text5Content: string;
  smiley: string;
  bigTextPart1: string;
  bigTextPart2: string;
  imagePath: string;
  wishHeading: string;
  wishText: string;
  outroText: string;
  replayText: string;
  outroSmiley: string;
}

// FUNGSI BARU: Memecah teks per huruf dengan cara yang AMAN untuk React
// FUNGSI BARU: Memecah teks per huruf dan mendeteksi "Enter" (\n)
const SplitText = ({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) => {
  return (
    <span className={className}>
      {text.split("").map((char, i) => {
        // Jika kode mendeteksi \n, maka buat baris baru (<br />)
        if (char === "\n") return <br key={i} />;

        // Jika mendeteksi spasi biasa, paksa React membaca spasinya (&nbsp;)
        if (char === " ") return <span key={i}>&nbsp;</span>;

        // Selain itu, render hurufnya seperti biasa
        return <span key={i}>{char}</span>;
      })}
    </span>
  );
};

const SplitText2 = ({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) => {
  return (
    <span className={className}>
      {text.split("").map((char, i) => (
        <span key={i}>{char}</span>
      ))}
    </span>
  );
};

const HappyBirthday: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<CustomData | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    fetch("/customize.json")
      .then((res) => res.json())
      .then((jsonData) => setData(jsonData))
      .catch((err) => console.error("Gagal memuat JSON:", err));
  }, []);

  useEffect(() => {
    if (!data || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // Setup Timeline GSAP
      const tl = gsap.timeline();
      tlRef.current = tl;

      const ideaTextTrans = {
        opacity: 0,
        y: -20,
        rotationX: 5,
        skewX: "15deg",
      };
      const ideaTextTransLeave = {
        opacity: 0,
        y: 20,
        rotationY: 5,
        skewX: "-15deg",
      };

      // Mulai Animasi
      tl.to(containerRef.current, {
        duration: 0.1,
        visibility: "visible",
        opacity: 1,
      })
        .from(".one", { duration: 0.7, opacity: 0, y: 10 })
        .from(".two", { duration: 0.4, opacity: 0, y: 10 })
        .to(".one", { duration: 0.7, opacity: 0, y: 10 }, "+=2.5")
        .to(".two", { duration: 0.7, opacity: 0, y: 10 }, "-=1")
        .from(".three", { duration: 0.7, opacity: 0, y: 10 })
        .to(".three", { duration: 0.7, opacity: 0, y: 10 }, "+=2")
        .from(".four", { duration: 0.7, scale: 0.2, opacity: 0 })
        .from(".fake-btn", { duration: 0.3, scale: 0.2, opacity: 0 })
        // Animasi ketikan chatbox memanggil elemen span di dalamnya
        .to(".hbd-chatbox span", {
          duration: 0.5,
          visibility: "visible",
          stagger: 0.05,
        })
        .to(".fake-btn", {
          duration: 0.1,
          backgroundColor: "rgb(127, 206, 248)",
        })
        .to(
          ".four",
          { duration: 0.5, scale: 0.2, opacity: 0, y: -150 },
          "+=0.7"
        )
        .from(".idea-1", { duration: 0.7, ...ideaTextTrans })
        .to(".idea-1", { duration: 0.7, ...ideaTextTransLeave }, "+=1.5")
        .from(".idea-2", { duration: 0.7, ...ideaTextTrans })
        .to(".idea-2", { duration: 0.7, ...ideaTextTransLeave }, "+=1.5")
        .from(".idea-3", { duration: 0.7, ...ideaTextTrans })
        .to(".idea-3 strong", {
          duration: 0.5,
          scale: 1.2,
          x: 10,
          backgroundColor: "rgb(21, 161, 237)",
          color: "#fff",
        })
        .to(".idea-3", { duration: 0.7, ...ideaTextTransLeave }, "+=1.5")
        .from(".idea-4", { duration: 0.7, ...ideaTextTrans })
        .to(".idea-4", { duration: 0.7, ...ideaTextTransLeave }, "+=1.5")
        .from(
          ".idea-5",
          {
            duration: 0.7,
            rotationX: 15,
            rotationZ: -10,
            skewY: "-5deg",
            y: 50,
            z: 10,
            opacity: 0,
          },
          "+=0.5"
        )
        .to(".idea-5 .smiley", { duration: 0.7, rotation: 90, x: 8 }, "+=0.4")
        .to(".idea-5", { duration: 0.7, scale: 0.2, opacity: 0 }, "+=2")
        .from(".idea-6 span", {
          duration: 0.8,
          scale: 3,
          opacity: 0,
          rotation: 15,
          ease: "expo.out",
          stagger: 0.2,
        })
        .to(
          ".idea-6 span",
          {
            duration: 0.8,
            scale: 3,
            opacity: 0,
            rotation: -15,
            ease: "expo.out",
            stagger: 0.2,
          },
          "+=1"
        )
        .fromTo(
          ".baloons img",
          { opacity: 0.9, y: 1400 },
          { duration: 2.5, opacity: 1, y: -1000, stagger: 0.2 }
        )
        .from(
          ".lydia-dp",
          {
            duration: 0.5,
            scale: 3.5,
            opacity: 0,
            x: 25,
            y: -25,
            rotationZ: -45,
          },
          "-=2"
        )
        .from(".hat", {
          duration: 0.5,
          x: -100,
          y: 350,
          rotation: -180,
          opacity: 0,
        })
        .from(".wish-hbd span", {
          duration: 0.7,
          opacity: 0,
          y: -50,
          rotation: 150,
          skewX: "30deg",
          ease: "elastic.out(1, 0.5)",
          stagger: 0.1,
        })
        .fromTo(
          ".wish-hbd span",
          { scale: 1.4, rotationY: 150 },
          {
            duration: 0.7,
            scale: 1,
            rotationY: 0,
            color: "#ff69b4",
            ease: "expo.out",
            stagger: 0.1,
          },
          "party"
        )
        .from(
          ".wish h5",
          { duration: 0.5, opacity: 0, y: 10, skewX: "-15deg" },
          "party"
        )

        // Animasi loading cepat!
        .to(".eight svg", {
          duration: 0.8,
          visibility: "visible",
          opacity: 0,
          scale: 80,
          repeat: 1,
          repeatDelay: 0.3,
          stagger: 0.1,
        })
        .to(".six", { duration: 0.5, opacity: 0, y: 30, zIndex: "-1" })

        // Teks Akhir Muncul
        .from(".nine p:not(#replay)", {
          duration: 1,
          ...ideaTextTrans,
          stagger: 0.8,
        })
        .to(".last-smile", { duration: 0.5, rotation: 90 }, "+=0.3")

        // MUNCULKAN LAYAR KLIK DI AKHIR SAJA
        .set("#replay-overlay", { display: "flex", opacity: 0 })
        .to("#replay-overlay", { duration: 0.5, opacity: 1 });
    }, containerRef);

    return () => ctx.revert();
  }, [data]);

  // Fungsi untuk restart dan hilangkan layar klik
  const handleReplayClick = () => {
    if (tlRef.current) {
      gsap.set("#replay-overlay", { display: "none" }); // Sembunyikan layar klik seketika
      tlRef.current.restart();
    }
  };

  if (!data)
    return (
      <div className="text-center mt-20 font-bold text-gray-500">
        Loading your surprise...
      </div>
    );

  return (
    <div
      className="container relative w-full h-dvh overflow-hidden bg-slate-900 text-white"
      ref={containerRef}
      style={{ visibility: "hidden", opacity: 0 }}
    >
      {/* --- OVERLAY KLIK DIMANAPUN (HANYA AKTIF DI AKHIR) --- */}
      <div
        id="replay-overlay"
        onClick={handleReplayClick}
        className="absolute inset-0 z-50 cursor-pointer hidden flex-col justify-end pb-12 items-center"
      >
        <div className="animate-bounce bg-blue-100/90 backdrop-blur-sm border border-blue-200 text-blue-600 px-6 py-3 rounded-full text-base md:text-lg font-bold shadow-lg flex flex-col items-center">
          <span>{data.replayText}</span>
          <span className="text-xs mt-1 font-normal opacity-80">
            (Tap anywhere)
          </span>
        </div>
      </div>

      <div className="one absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
        <h1 className="one flex flex-col items-center gap-2 mb-4">
          <span className="text-4xl md:text-5xl font-black text-pink-500">
            {data.greeting}
          </span>
          <span className="text-5xl md:text-7xl font-black text-pink-500">
            {data.name}
          </span>
        </h1>
        <p className="two text-xl md:text-2xl mt-4 text-gold-600">
          {data.greetingText}
        </p>
      </div>

      <div className="three absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
        <p className="text-2xl md:text-4xl font-bold">{data.text1}</p>
      </div>

      <div className="four absolute inset-0 flex flex-col items-center justify-center px-4">
        <div className="text-box w-full max-w-lg p-6 bg-gray-50 rounded-2xl shadow-xl border border-gray-100 text-center">
          {/* MENGGUNAKAN KOMPONEN SPLITTEXT YANG AMAN */}
          <SplitText2
            text={data.textInChatBox}
            className="hbd-chatbox block text-lg md:text-xl leading-relaxed text-gray-500"
          />
          <p className="fake-btn mt-6 inline-block px-8 py-3 bg-blue-500 text-white font-bold rounded-full shadow-md">
            {data.sendButtonLabel}
          </p>
        </div>
      </div>

      <div className="five absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
        <p className="idea-1 text-xl md:text-3xl mb-4 text-gray-500">
          {data.text2}
        </p>
        <p className="idea-2 text-xl md:text-3xl mb-4 text-gray-500">
          {data.text3}
        </p>
        <p className="idea-3 text-xl md:text-3xl mb-4 flex flex-col items-center gap-4 mt-6">
          <span>{data.text4}</span>
          <strong className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-lg text-2xl md:text-4xl">
            {data.text4Adjective}
          </strong>
        </p>
        <p className="idea-4 text-xl md:text-3xl mt-8 mb-4">
          {data.text5Entry}
        </p>
        <p className="idea-5 text-3xl md:text-5xl font-black mt-4 flex flex-col items-center justify-center gap-6">
          <span className="text-center">{data.text5Content}</span>
          <span className="smiley inline-block rotate-90 text-blue-500 text-6xl">
            {data.smiley}
          </span>
        </p>
        <p className="idea-6 text-6xl md:text-8xl font-black flex justify-center gap-8 mt-12 text-pink-500">
          <span>{data.bigTextPart1}</span>
          <span>{data.bigTextPart2}</span>
        </p>
      </div>

      <div className="six absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
        <div className="relative inline-flex flex-col items-center mt-6">
          <img
            src={data.imagePath}
            alt="Profile"
            className="lydia-dp w-48 h-48 md:w-64 md:h-64 object-cover rounded-full border-8 border-white shadow-2xl relative z-10"
          />
          <img
            src="/img/hat.svg"
            alt="Hat"
            className="hat absolute -top-12 md:-top-16 left-1/2 -translate-x-1/2 w-24 md:w-32 z-20 drop-shadow-xl"
          />
        </div>
        <div className="wish mt-12 flex flex-col items-center">
          {/* MENGGUNAKAN KOMPONEN SPLITTEXT YANG AMAN */}
          <SplitText
            text={data.wishHeading}
            className="wish-hbd block text-3xl md:text-4xl font-black mb-6 text-gray-400 uppercase tracking-wide"
          />
          <h5 className="text-xl md:text-3xl text-gray-400 italic font-medium">
            {data.wishText}
          </h5>
        </div>
      </div>

      <div className="seven absolute inset-0 pointer-events-none overflow-hidden">
        <div className="baloons flex justify-around w-full h-full items-end">
          {[1, 2, 3, 1, 2, 3, 2, 3, 1, 2, 3, 2, 1, 3, 2, 3].map((num, i) => (
            <img
              key={i}
              src={`/img/ballon${num}.svg`}
              alt="Balloon"
              className="w-12 md:w-20 opacity-85"
            />
          ))}
        </div>
      </div>

      <div className="eight absolute inset-0 pointer-events-none">
        {[...Array(9)].map((_, i) => (
          <svg
            key={i}
            viewBox="0 0 40 40"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute w-12 h-12 opacity-0"
            style={{
              top: `${Math.random() * 80}%`,
              left: `${Math.random() * 80}%`,
            }}
          >
            <circle
              cx="20"
              cy="20"
              r="20"
              fill={i % 2 === 0 ? "#FF69B4" : "#87CEFA"}
            />
          </svg>
        ))}
      </div>

      <div className="nine absolute inset-0 flex flex-col items-center justify-center px-4 text-center z-40">
        <p className="text-2xl md:text-4xl mb-8 font-medium text-gray-350">
          {data.outroText}
        </p>
        {/* Teks replay aslinya kita hilangkan saja karena sudah diganti dengan tombol "Click Anywhere" */}
        <p id="replay" className="hidden"></p>
        <p className="last-smile text-6xl md:text-7xl font-black text-blue-500">
          {data.outroSmiley}
        </p>
      </div>
    </div>
  );
};

export default HappyBirthday;
