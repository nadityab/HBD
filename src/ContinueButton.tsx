import React, { useState, useEffect } from "react";

interface ContinueButtonProps {
  onContinue: () => void; // Fungsi yang akan dijalankan saat diklik
  delay?: number; // Waktu tunggu (default bisa kita set nanti)
}

const ContinueButton: React.FC<ContinueButtonProps> = ({
  onContinue,
  delay = 2000,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  // Jika belum waktunya, jangan tampilkan apa-apa
  if (!isVisible) return null;

  return (
    <button
      onClick={onContinue}
      className="absolute bottom-16 z-30 px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/40 text-white font-bold rounded-full shadow-lg transition-all duration-500 animate-[pulse_2s_infinite] cursor-pointer"
    >
      Click to continue ✨
    </button>
  );
};

export default ContinueButton;
