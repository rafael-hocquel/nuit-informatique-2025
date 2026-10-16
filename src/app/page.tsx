"use client";
import Image from "next/image";
import Button from "../components/Buttons/Button";
import Title from "../components/Global/Title";
import Subtitle from "../components/Global/Subtitle";
import ReactBeforeSliderComponent from "react-before-after-slider-component";
import "react-before-after-slider-component/dist/build.css";
import PresentationCard from "../components/Accueil/PresentationCard";
import {
  ArrowBigRight,
  BriefcaseBusiness,
  Laptop,
  LifeBuoy,
  Users,
} from "lucide-react";
import CardItem from "../components/Accueil/CardItem";
import { useRouter } from "next/navigation";
import BSODScreen from "../components/Accueil/BSOD/BSOD";
import { useEffect, useState } from "react";
import ChatBrutiIcon from "../components/ChatBrutiIcon";
import Snake from "../components/Snake/Snake";

const FIRST_IMAGE = {
  imageUrl: "/linux-desktop.png",
};
const SECOND_IMAGE = {
  imageUrl: "/windows-desktop.png",
};

export default function Home() {
  const router = useRouter();
  const [showError, setShowError] = useState(true);
  return (
    <div className="relative h-[140dvh] flex flex-col justify-start items-center">
      <ChatBrutiIcon />
      <Snake />
      {showError && <BSODScreen onClick={() => setShowError(false)} />}
      <div className="relative size-full flex justify-start flex-col">
        {/* BG Picture */}
        <Image
          src="/background-picture.jpg"
          alt="Background picture"
          objectFit="cover"
          className="-z-10"
          fill
        />

        {/* NavBar */}
        <div className="flex justify-between items-center h-fit w-full py-2 px-6">
          {/* Left Side */}
          <div
            className="flex justify-center items-center gap-4 cursor-pointer"
            onClick={() => router.push("https://nird.forge.apps.education.fr/")}
          >
            {/* Logo */}
            <div className="relative w-20 h-20 translate-y-1/5">
              <Image
                src="/nird-logo-transparent.png"
                fill
                objectFit="cover"
                alt="logo nird"
              />
            </div>
            <p className="text-white font-bold text-2xl">N.I.R.D</p>
          </div>

          {/* Right Side */}
          <Button
            bgColor="#4fa1f0"
            hoverColor="#4894ef"
            rounded="normal"
            onClick={() => router.push("https://nird.forge.apps.education.fr/")}
            size="fit"
            visualEffects="all"
            textColor="white"
          >
            Découvrir
          </Button>
        </div>

        {/* Main content */}
        <main className="size-full flex justify-between items-center pr-10 pl-8">
          {/* Titres */}
          <div className="flex flex-col gap-4 justify-center items-start w-full">
            <Title textColor="#FFFFFF">
              Vous prenez soin de votre{" "}
              <span className="italic underline underline-offset-5">
                ordinateur
              </span>
              , <br /> en fait-il autant pour{" "}
              <span className="italic underline underline-offset-6">
                vous ?
              </span>
            </Title>
            <Subtitle textColor="gray">
              Le support de Windows 10 arrive à son terme, donnez une seconde
              vie à votre ordinateur
            </Subtitle>

            <a
              role="button"
              onClick={() =>
                router.push("https://nird.forge.apps.education.fr/")
              }
              className="kill-zone tap-highlight-transparent cursor-pointer hover:bg-blue-400 w-fit no-underline active:opacity-disabled group box-border appearance-none select-none subpixel-antialiased tap-highlight-transparent data-[pressed=true]:scale-[0.97] outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 transition-transform-colors-opacity motion-reduce:transition-none data-[hover=true]:opacity-hover group flex transform items-center justify-center whitespace-nowrap rounded-md border border-white bg-brand-700 px-8 font-medium text-white hover:ring-2 hover:ring-brand-700 hover:ring-offset-2 focus:outline-none focus:ring-2 focus:ring-offset-2 gap-2 overflow-clip capitalize relative z-10 h-14 text-base shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              Découvrir le NIRD <ArrowBigRight />
            </a>
          </div>
          <ReactBeforeSliderComponent
            className="absolute -right-8"
            firstImage={FIRST_IMAGE}
            secondImage={SECOND_IMAGE}
          />
        </main>
      </div>
      {/* Cartes */}
      <div className="w-full h-2/5 bg-linear-to-br bg-[#1a3473] shadow-xl p-6 flex flex-col gap-10 items-center">
        <div className="flex flex-col lg:flex-row justify-evenly gap-20">
          <PresentationCard
            title="Démarche NID - 3 Pilliers"
            icon={<Laptop size={50} />}
          >
            <CardItem icon={<Users />}>Inclusion</CardItem>
            <CardItem icon={<BriefcaseBusiness />}>Responsabilité</CardItem>
            <CardItem icon={<LifeBuoy />}>Durabiltié</CardItem>
          </PresentationCard>

          <PresentationCard
            title="Linux Nird / PrimTux - Éducation"
            icon={<Laptop size={50} />}
          >
            <CardItem icon={<Users />}>
              Enseignement Primaire & Secondaire
            </CardItem>
            <CardItem icon={<BriefcaseBusiness />}>Léger & Complet</CardItem>
            <CardItem icon={<LifeBuoy />}>
              Fonctionne sans connexion internet
            </CardItem>
          </PresentationCard>

          <PresentationCard
            title="Pourquoi Linux ?"
            icon={<Laptop size={50} />}
          >
            <CardItem icon={<Users />}>
              Respect des données personnelles
            </CardItem>
            <CardItem icon={<BriefcaseBusiness />}>
              Réduction des déchets électroniques
            </CardItem>
            <CardItem icon={<LifeBuoy />}>
              Outil d'inclusion (accessibilité etc...)
            </CardItem>
          </PresentationCard>
        </div>
        <a
          role="button"
          onClick={() => router.push("https://nird.forge.apps.education.fr/")}
          className="kill-zone tap-highlight-transparent cursor-pointer hover:bg-blue-400 w-fit no-underline active:opacity-disabled group box-border appearance-none select-none subpixel-antialiased tap-highlight-transparent data-[pressed=true]:scale-[0.97] outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 transition-transform-colors-opacity motion-reduce:transition-none data-[hover=true]:opacity-hover group flex transform items-center justify-center whitespace-nowrap rounded-md border border-white bg-brand-700 px-8 font-medium text-white hover:ring-2 hover:ring-brand-700 hover:ring-offset-2 focus:outline-none focus:ring-2 focus:ring-offset-2 gap-2 overflow-clip capitalize relative z-10 h-14 text-base shadow-lg transition-all duration-300 hover:shadow-xl"
        >
          Plus d'Informations <ArrowBigRight />
        </a>
      </div>
    </div>
  );
}
