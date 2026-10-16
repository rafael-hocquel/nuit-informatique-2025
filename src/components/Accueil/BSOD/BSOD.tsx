"use client"; // si tu es en app router Next.js

interface Props {
  onClick: () => void;
}

import { useState, useEffect } from "react";

const BSODScreen = ({ ...props }: Props) => {
  const [pourcentage, setPourcentage] = useState(0);
  const [afficherBouton, setAfficherBouton] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setPourcentage((p) => {
        if (p >= 100) {
          clearInterval(timer);
          setTimeout(() => setAfficherBouton(true), 2000);
          return 100;
        }
        return p + 2;
      });
    }, 50);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute z-20 min-h-[150vh] w-screen bg-[#0178d4] text-white p-10 font-sans">
      <div className="max-w-3xl mx-auto">
        {/* Smiley */}
        <div className="text-9xl mb-8">:(</div>

        {/* Message d'erreur */}
        <h1 className="text-3xl font-normal mb-12 leading-snug">
          Votre PC a rencontré un problème et doit redémarrer. Nous collectons
          simplement des informations relatives aux erreurs.
        </h1>

        {/* Progression */}
        <div className="text-3xl">{pourcentage}% terminé</div>

        {/* Modale finale */}
        {afficherBouton && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-white p-10 rounded-lg max-w-md text-center shadow-2xl">
              <div className="text-5xl mb-5">🛡️</div>
              <p className="text-gray-800 text-base mb-8">
                Votre Ordinateur fait des siennes ?
              </p>
              <h2 className="text-[#0178d4] text-2xl mb-5 font-bold">
                Une alternative existe
              </h2>
              <p className="text-gray-800 text-base mb-8">
                Le Village Numérique Résistant vous attend.
              </p>
              <button
                onClick={() => props.onClick()}
                className="w-full py-4 text-lg font-bold bg-[#0178d4] text-white rounded hover:bg-[#0165b8] transition-colors cursor-pointer"
              >
                REJOINDRE LA RÉSISTANCE
              </button>
              <p className="text-gray-600 text-xs mt-3">
                Ou restez prisonnier de l'obsolescence...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BSODScreen;
