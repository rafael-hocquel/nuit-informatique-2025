"use client";
import { useEffect, useState } from "react";
import Subtitle from "../../Global/Subtitle";
import Title from "../../Global/Title";

import ChatInput from "./ChatInput";
import { SpecCard } from "./SpecCards/SpecCard";
import SpecCardItem from "./SpecCards/SpecCardItem";
import Bubble from "../Bubles/Bubble";
import Image from "next/image";

interface Props {
  messages: Message[];
  showLoader: boolean;
  onSubmit: (value: string) => void;
  setShowLoader: (value: boolean) => void;
}

interface Message {
  type: "sender" | "receiver";
  text: string;
  date: string;
}

const FullInputSection = ({ ...props }: Props) => {
  return (
    <div className="flex flex-col gap-8 justify-center items-center w-full h-full">
      {/* Header */}
      <section
        className={`${
          props.messages.length === 0 ? "flex" : "hidden"
        } justify-center items-center gap-3 flex-col`}
      >
        <Title>Chattez Moins, Chattez Mieux</Title>
        <Subtitle>
          ChatBruti, le premier Chatbot à la hauteur de vos ambitions
        </Subtitle>
      </section>

      {/* Specs */}
      {props.messages.length === 0 && (
        <section className="flex flex-col justify-center items-center gap-5 xl:flex-row">
          <SpecCard title="⚡ Capacités">
            <SpecCardItem>
              Répondre à vos questions (plus ou moins bien)
            </SpecCardItem>
            <SpecCardItem>Lire les réponses à l'oral</SpecCardItem>
          </SpecCard>
          <SpecCard title="⊖ Limitations">
            <SpecCardItem>Parfois (souvent) à côté de la plaque</SpecCardItem>
            <SpecCardItem>Fainéant</SpecCardItem>
          </SpecCard>
          <SpecCard title="💬 Exemples">
            <SpecCardItem>Quelle est la racine carrée de 9 ?</SpecCardItem>
            <SpecCardItem>J'aime les pâtes</SpecCardItem>
          </SpecCard>
        </section>
      )}

      <div className="h-full overflow-y-scroll overflow-x-hidden gap-3 w-full flex flex-col-reverse">
        {props.showLoader && props.messages.length <= 2 && (
          <div className="sticky size-14 overflow-hidden loader-animation">
            <Image
              src="/chatbruti-logo-transparent.png"
              fill
              objectFit="cover"
              alt="Loader"
            />
          </div>
        )}
        {props.messages.length > 0 &&
          props.messages.map((message, key) => (
            <div
              key={key}
              className={`${
                message.type === "sender" ? "justify-end" : "justify-start"
              } flex w-full`}
            >
              <Bubble type={message.type} time={message.date}>
                {message.text}
              </Bubble>
            </div>
          ))}
      </div>

      <ChatInput
        bottom={props.messages.length > 0}
        onSubmit={(value) => {
          props.onSubmit(value);
        }}
      />
      <style jsx>{`
        @keyframes loaderGrowShrink {
          0% {
            transform: scale(1) rotate(0deg);
          }
          50% {
            transform: scale(1.3) rotate(180deg);
          }
          100% {
            transform: scale(1) rotate(360deg);
          }
        }

        .loader-animation {
          animation: loaderGrowShrink 1.6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default FullInputSection;
