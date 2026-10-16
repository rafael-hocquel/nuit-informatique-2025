import React, { useState, useRef } from "react";

function Carte() {
  // Position du bouton dans la boîte
  const [pos, setPos] = useState({ x: 0, y: 0 });
  // Message d'humiliation affiché dans la section supérieure
  const [message, setMessage] = useState("");
  // Taille dynamique du bouton (pour moquer le joueur)
  const [size, setSize] = useState({ w: 70, h: 30 });
  // Compteur de tentatives ratées (approches du curseur)
  const [failCount, setFailCount] = useState(0);
  // Tableau des messages encore non utilisés (pour éviter les répétitions)
  const [unusedMessages, setUnusedMessages] = useState<string[]>([]);
  // Référence vers la boîte contenant le bouton
  const boxRef = useRef<HTMLDivElement>(null);

  // Liste des messages d'humiliation / moquerie
  const emotionalMessages = [
    "Bro… tu joues avec une souris ou un bout de charbon ?",
    "Laisse tomber. Le bouton bouge plus vite que ton cerveau.",
    "Tu vises ou tu pries ? Parce que ça marche pas.",
    "Tu transpires fort pour rater aussi fort.",
    "J’ai vu des tortues avec de meilleurs réflexes.",
    "Tu veux un tuto pour cliquer ? Je demande sérieusement.",
    "Le bouton t’esquive comme ton crush.",
    "Tu m’attrapes quand ?",
    "C'est dur d’être toi, hein ?",
    "On dirait que tes doigts sont sous calmants.",
    // ... ajoute le reste des 75+ messages ici
  ];

  // Initialisation du tableau des messages non utilisés au premier rendu
  if (unusedMessages.length === 0) {
    setUnusedMessages([...emotionalMessages]);
  }

  /**
   * Fonction appelée lorsque la souris se déplace dans le conteneur du bouton
   * - Vérifie la distance entre le curseur et le centre du bouton
   * - Si la souris s'approche trop (distance < triggerDistance), le bouton "téléporte"
   * - Change le message de moquerie tous les 5 à 7 tentatives
   * - Change la taille et la position du bouton pour rendre la capture plus difficile
   */
  function handleMouseMoveContainer(e: React.MouseEvent<HTMLDivElement>): void {
    if (!boxRef.current || unusedMessages.length === 0) return;

    const rect = boxRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left; // position X du curseur relative à la boîte
    const mouseY = e.clientY - rect.top; // position Y du curseur relative à la boîte

    const centerX = pos.x + size.w / 2; // centre X du bouton
    const centerY = pos.y + size.h / 2; // centre Y du bouton
    const dx = centerX - mouseX;
    const dy = centerY - mouseY;
    const distance = Math.sqrt(dx * dx + dy * dy) || 1;

    const triggerDistance = 120; // distance à partir de laquelle le bouton s'échappe
    if (distance < triggerDistance) {
      // Compteur de tentatives ratées
      const newFailCount = failCount + 1;
      setFailCount(newFailCount);

      // Changer le message seulement tous les 5 à 7 essais
      const randomThreshold = Math.floor(Math.random() * 3) + 5; // 5,6 ou 7
      if (newFailCount % randomThreshold === 0) {
        // Sélection aléatoire d'un message non utilisé
        const index = Math.floor(Math.random() * unusedMessages.length);
        const insult = unusedMessages[index];
        setMessage(insult);

        // Retire le message utilisé pour éviter les répétitions
        const newUnused = [...unusedMessages];
        newUnused.splice(index, 1);
        setUnusedMessages(newUnused);
      }

      // Taille aléatoire du bouton pour rendre la capture plus difficile
      const newW = 50 + Math.random() * 50;
      const newH = 25 + Math.random() * 25;
      setSize({ w: newW, h: newH });

      // Nouvelle position aléatoire du bouton dans la boîte
      const boxWidth = boxRef.current.offsetWidth;
      const boxHeight = boxRef.current.offsetHeight;
      const newX = Math.random() * (boxWidth - newW);
      const newY = Math.random() * (boxHeight - newH);
      setPos({ x: newX, y: newY });
    }
  }

  /**
   * Fonction appelée au clic sur le bouton
   * - Affiche un message final humoristique
   */
  function handleClick() {
    setMessage(
      "OH NOOOOONNNNNN, COMMENT... COMMENNT... TU M'AS EU.... FELICI-NON-TATICION"
    );
  }

  return (
    <div className="flex w-full h-full border-2 border-sky-300">
      <div className="relative flex flex-col justify-between items-center p-[2%] h-full w-full bg-sky-100 rounded-2xl border-sky-200 border-2">
        {/* Section supérieure : affichage du message */}
        <div className="flex w-full h-[20%] border-2 border-sky-200 rounded-2xl justify-center items-center px-4">
          <span className="text-red-600 font-bold text-center">{message}</span>
        </div>

        {/* Section centrale : décor / contenu statique */}
        <div className="flex flex-col w-full h-[70%] border-2 border-sky-200 rounded-2xl justify-between items-center">
          <div className="flex w-[90%] h-[30%] border-2 bg-sky-200 border-sky-300 rounded-2xl"></div>
          <div className="flex w-[90%] h-[30%] border-2 bg-sky-200 border-sky-300 rounded-2xl"></div>
          <div className="flex w-[90%] h-[30%] border-2 bg-sky-200 border-sky-300 rounded-2xl"></div>
        </div>

        {/* Conteneur du bouton */}
        <div
          ref={boxRef}
          className="relative w-full h-32 bg-sky-100 flex justify-center items-center"
          onMouseMove={handleMouseMoveContainer} // détecte l'approche du curseur
        >
          <button
            onClick={handleClick}
            className="absolute bg-sky-300 text-white rounded text-xs cursor-pointer select-none"
            style={{
              left: pos.x,
              top: pos.y,
              width: size.w,
              height: size.h,
              transition: "all 0.05s ease-in-out", // transition rapide pour la "téléportation"
            }}
          >
            VALIDER
          </button>
        </div>
      </div>
    </div>
  );
}

export default Carte;
