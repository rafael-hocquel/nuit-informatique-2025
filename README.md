# Nuit de l'Informatique 2025 - Les 8 Bits

Site web réalisé en une nuit pour la Nuit de l'Informatique 2025: une page de
sensibilisation sur le thème du **NIRD**, plus un chatbot volontairement
incompétent et une série de clins d'œil cachés à débusquer.

**Équipe :** Les 8 Bits  
**Événement :** Nuit de l'Informatique  
**Version :** 1.0

## Le thème : le NIRD

Le site part du constat suivant : **le support de Windows 10 est terminé**.
Plutôt que de jeter un ordinateur qui fonctionne encore, il peut passer à
Linux et gagner plusieurs années.

Le **NIRD** (Numérique Inclusif, Responsable et Durable) est un ensemble de
logiciels libres pour l'éducation, mis en avant par le ministère. Le site
présente ses trois piliers, ses distributions pour l'école et les raisons de
s'y intéresser, et renvoie vers sa forge officielle.

| Ce que la page met en avant | Pourquoi |
|-----------------------------|----------|
| Inclusion | Un outil utilisable par tous, y compris avec des besoins d'accessibilité |
| Responsabilité | Respect des données personnelles, pas de dépendance à un géant du logiciel |
| Durabilité | Moins de déchets électroniques, et ça fonctionne sans connexion internet |

## Ce que contient le site

| Élément | Ce que ça fait |
|---------|----------------|
| **L'écran d'accueil** | Un écran bleu de plantage Windows s'affiche à l'arrivée — un clic et le vrai site apparaît |
| **La bannière** | Le message « Vous prenez soin de votre ordinateur, en fait-il autant pour vous ? » avec un curseur avant / après qui compare un bureau Linux et un bureau Windows |
| **Les trois cartes** | Les piliers du NIRD, les distributions pour l'école et les arguments pour Linux |
| **ChatBruti** | Un chatbot qui répond mal, exprès : la consigne donnée à l'IA est d'être un « ragebaiter » professionnel |
| **La page des formulaires** | Une page cachée avec trois formulaires à découvrir, dont un code César |
| **Le serpent** | Un jeu de Snake complet, avec le meilleur score sauvegardé |

## Les clins d'œil cachés

| Le clin d'œil | Comment le déclencher |
|---------------|-----------------------|
| L'écran bleu | Il s'affiche tout seul à l'arrivée, un clic n'importe où pour continuer |
| ChatBruti | La bulle de discussion en haut de l'écran, ou l'adresse `/chatbruti` |
| Le snake | Saisir le code Konami : ↑ ↑ ↓ ↓ ← → ← → B A |
| Les trois formulaires | Aller sur `/formulaire`, puis taper le nom d'une page en code César, décalage de 3 (`suhvhqwdwlrq`, `lpsohphqwdwlrq`) |
| Le bouton qui bouge | Il fuit la souris et se moque de vos échecs (sur la page formulaire) |
| Le sélecteur | 100 numéros mélangés en boucle toutes les trois secondes pour ajuster le volume de l'appareil |
| Le rickroll | Se tromper de mot de passe dans le formulaire |

## Comment le chat fonctionne

ChatBruti envoie chaque message à **Gemini 2.5 Flash**, accompagné d'une
consigne stockée dans `config.json` qui lui demande d'être insolent, de répondre
à côté, voire de faire semblant d'abandonner en pleine phrase. Si le modèle ne
renvoie rien, le site répond lui-même « Flemme de répondre, laisse moi me
reposer et réessaye plus tard ».

## Technos

| Outil | Rôle |
|-------|------|
| **Next.js 16** et **React 19** | Structure du site et navigation entre les pages |
| **TypeScript** | Typage de tous les composants |
| **Tailwind CSS 4** | Mise en page et styles |
| **shadcn/ui**, Radix et lucide-react | Composants de base : menus, cartes, infobulles, icônes |
| **Gemini 2.5 Flash** | Le chatbot |

## Lancer le site

```bash
git clone https://github.com/rafael-hocquel/nuit-informatique-2025.git
cd nuit-informatique-2025
npm install
