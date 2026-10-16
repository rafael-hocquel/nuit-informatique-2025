"use client";
import React, { ReactNode, useState } from "react";

interface Icon {
  icon: ReactNode;
  iconPosition: "left" | "right";
}

interface Props {
  icon?: Icon;
  children: ReactNode;
  bgColor: string;
  hoverColor: string;
  textColor: string;
  size: "fit" | "fill";
  rounded: "normal" | "full";
  visualEffects: "all" | "hover" | "active" | "none";
  onClick: () => void;
}

/**
 * Renvoie un bouton customisable
 * @param icon NON-OBLIGATOIRE -> Permet d'ajouter une icone et sa position dans la carte
 * @param children -> Le texte du bouton
 * @param bgColor -> La couleur de fond du bouton
 * @param hoverColor NON-OBLIGATOIRE - Si non utilisé mettre "" -> Spécifie la couleur du background lors du survol
 * @param textColor -> La couleur du texte
 * @param size -> Fit: Prend uniquement l'espace nécessaire | Fill: Prend tout l'espace disponible
 * @param rounded -> Le niveau d'arrondi des coins du bouton | Full: borde-radius maximal
 * @param visualEffects -> All: Hover + Active | Hover: Hover | Active: Active | None: Aucun
 * @returns Le bouton correspondant aux spécifications en paramètres
 */
const Button = ({ ...props }: Props) => {
  const [bgColor, setBgColor] = useState(props.bgColor);

  const hoverActive =
    props.visualEffects === "all" || props.visualEffects === "hover";
  const activeActive =
    props.visualEffects === "all" || props.visualEffects === "active";

  return (
    <button
      className={` kill-zone flex justify-center items-center py-2 px-4 cursor-pointer gap-2 rounded-2xl ${
        props.size === "fit" ? "w-fit" : "w-full"
      } ${props.rounded === "full" ? "rounded-full" : "rounded-xl"}
       ${activeActive && "active:scale-97"} transition-all duration-250`}
      style={{ backgroundColor: bgColor, color: props.textColor }}
      onMouseEnter={() => hoverActive && setBgColor(props.hoverColor)}
      onMouseLeave={() => setBgColor(props.bgColor)}
      onClick={() => props.onClick()}
    >
      {props.icon?.iconPosition === "left" && props.icon.icon}
      {props.children}
      {props.icon?.iconPosition === "right" && props.icon.icon}
    </button>
  );
};

export default Button;
