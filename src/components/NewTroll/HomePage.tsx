"use client";
import { useState, useEffect } from "react";
import RickRoll from "./RickRoll";
import CaesarForm from "./CaesarForm";
import Bouton from "../BoutonQuiBouge/Bouton";
import SelectorN100 from "../SeLecteurDeFou/Selecteur";

function caesarCipher(str: string, shift: number = 3) {
  return str
    .split("")
    .map((char) => {
      if (/[a-z]/.test(char)) {
        const code = ((char.charCodeAt(0) - 97 + shift) % 26) + 97;
        return String.fromCharCode(code);
      }
      if (/[A-Z]/.test(char)) {
        const code = ((char.charCodeAt(0) - 65 + shift) % 26) + 65;
        return String.fromCharCode(code);
      }
      return char;
    })
    .join("");
}

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState<
    "home" | "presentation" | "implementation" | "rickroll"
  >("home");
  const [input, setInput] = useState("");
  const [isChinese, setIsChinese] = useState(false);

  const pages: Record<string, "presentation" | "implementation"> = {
    presentation: "presentation",
    implementation: "implementation",
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const normalized = input.toLowerCase();

    for (const [name, page] of Object.entries(pages)) {
      const encoded = caesarCipher(name, 3).toLowerCase();
      if (normalized === encoded) {
        setCurrentPage(page);
        return;
      }
    }
    setCurrentPage("rickroll");
  };

  const handleSkip = () => {
    setIsChinese(true);
  };

  useEffect(() => {
    if (isChinese) {
      const timer = setTimeout(() => setIsChinese(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [isChinese]);

  if (isChinese) {
    return (
      <div className="p-6 bg-white rounded-xl border border-black shadow-lg">
        <h1 className="text-xl font-bold mb-4">可用页面：</h1>
        <ul className="list-disc ml-6">
          <li>演示页面)</li>
          <li>实施页面</li>
        </ul>
        <p className="mt-4">请输入凯撒密码（偏移量为）。</p>
        <CaesarForm
          onSubmit={handleSubmit}
          onSkip={handleSkip}
          setInput={setInput}
          isChinese
        />
      </div>
    );
  }

  if (currentPage === "home") {
    return (
      <div className="p-6 bg-white rounded-xl border border-black shadow-lg">
        <h1>
          ON A FAIT TROIS FORMULAIRE TRES SPECIAL A VOUS DE LES DECOUVRIR!
        </h1>
        <div>‎ ‎ </div>
        <div>‎ ‎ </div>
        <h1 className="text-xl font-bold mb-4">Pages disponibles :</h1>
        <ul className="list-disc ml-6">
          {Object.keys(pages).map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
        <p className="mt-4">Tape le nom en code César (décalage de 3).</p>
        <CaesarForm
          onSubmit={handleSubmit}
          onSkip={handleSkip}
          setInput={setInput}
        />
        <div>‎ ‎ </div>
        <div>‎ ‎ </div>
        <div>
          {" "}
          <Bouton></Bouton>
        </div>
        <div>‎ ‎ </div>
        <div>‎ ‎ </div>
        <div>
          <SelectorN100></SelectorN100>
        </div>
      </div>
    );
  }

  if (currentPage === "presentation") {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold">
          On avais la flemme de faire la page force a vous😹😹💩💩
        </h2>
        <button
          onClick={() => setCurrentPage("home")}
          className="mt-4 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          Retour
        </button>
      </div>
    );
  }

  if (currentPage === "implementation") {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold">Mise en œuvre</h2>
        <button
          onClick={() => setCurrentPage("home")}
          className="mt-4 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          Retour
        </button>
      </div>
    );
  }

  if (currentPage === "rickroll") {
    return <RickRoll onFinish={() => setCurrentPage("home")} />;
  }

  return null;
}
