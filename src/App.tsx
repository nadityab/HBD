import { useState, useEffect } from "react";
import Bunny from "./Bunny";
import HappyBirthday from "./HappyBirthdays"; // <-- Kita akan buat file ini

function App() {
  const [currentScreen, setCurrentScreen] = useState<"welcome" | "mainApp">(
    "welcome"
  );
  const [canContinue, setCanContinue] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (currentScreen === "welcome") {
      timer = setTimeout(() => {
        setCanContinue(true);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [currentScreen]);

  const handleScreenClick = () => {
    if (canContinue) {
      setCurrentScreen("mainApp");
    }
  };

  return (
    <main className="w-full h-dvh overflow-hidden bg-gray-50">
      {/* --- HALAMAN 1: WELCOME SCREEN --- */}
      {currentScreen === "welcome" && (
        <div
          onClick={handleScreenClick}
          className={`relative flex flex-col justify-evenly items-center w-full h-dvh bg-linear-to-br from-indigo-500 to-purple-700 transition-all duration-500 py-10 ${
            canContinue ? "cursor-pointer" : "cursor-default"
          }`}
        >
          <div className="hidden md:block h-4"></div>
          <div className="shrink-0">
            <Bunny name="Name!" />
          </div>
          <div
            className={`shrink-0 transition-opacity duration-1000 ${
              canContinue ? "opacity-100" : "opacity-0"
            }`}
          >
            <p className="text-white/90 font-medium text-sm md:text-lg tracking-widest animate-pulse px-6 py-3 bg-black/20 backdrop-blur-md rounded-full shadow-lg">
              Tap anywhere to continue ✨
            </p>
          </div>
        </div>
      )}

      {/* --- HALAMAN 2: KOMPONEN NATIVE REACT --- */}
      {currentScreen === "mainApp" && (
        // Tidak ada lagi iframe! Kita panggil komponennya langsung
        <HappyBirthday />
      )}
    </main>
  );
}

export default App;
