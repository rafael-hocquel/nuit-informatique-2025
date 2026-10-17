# Nuit de l'Informatique 2025 — Les 8 Bits

Projet réalisé en une nuit lors de l'édition 2025 de la Nuit de l'Informatique. Le site mêle le sujet principal de sensibilisation autour du **NIRD** (Numérique Inclusif, Responsable et Durable) à plusieurs défis annexes : une interface volontairement frustrante (*bad UI*), des easter eggs cachés et un chatbot programmé pour être le plus inutile possible.

## Le sujet : le NIRD et la fin de Windows 10

Le constat de départ est simple : avec la fin du support de Windows 10, des milliers de PC parfaitement fonctionnels risquent d'être jetés. Plutôt que de renouveler le matériel, basculer sur Linux permet de prolonger leur durée de vie de plusieurs années.

Le site met en avant la démarche **NIRD** portée par le ministère de l'Éducation nationale, qui promeut des distributions libres adaptées aux écoles autour de trois piliers :
- **Inclusion :** Des outils accessibles à tous, sans barrière financière.
- **Responsabilité :** Maîtrise des données personnelles et souveraineté numérique (sortir de la dépendance aux GAFAM).
- **Durabilité :** Lutte contre l'obsolescence programmée et fonctionnement hors-ligne.

## Fonctionnalités principales

- **Faux BSOD d'accueil :** Le site s'ouvre sur un écran bleu de plantage Windows 10. Un clic n'importe où permet de « réparer » l'erreur et d'accéder au vrai site en passant sur Linux.
- **Comparateur interactif :** Une bannière avec le message *« Vous prenez soin de votre ordinateur, en fait-il autant pour vous ? »* accompagnée d'un slider avant/après comparant un bureau Windows et un bureau Linux afin de montrer que la transition est simple et intuitive.
- **Présentation du NIRD :** Trois sections détaillant les piliers du projet, les distributions éducatives recommandées et un renvoi vers la forge officielle.
- **ChatBruti (`/chatbruti`) :** Un assistant virtuel propulsé par **Gemini 2.5 Flash**, configuré via son prompt système (`config.json`) pour agir comme un *ragebaiter* professionnel. Il répond à côté, se montre insolent ou abandonne au milieu d'une phrase. Si l'API ne répond pas, le fallback local prend le relais avec le même état d'esprit : *« Flemme de répondre, laisse-moi me reposer et réessaye plus tard »*.

## Easter Eggs & Défis annexes

Comme tout projet de la Nuit de l'Info, le site cache plusieurs fonctionnalités et pires pratiques d'ergonomie (*Bad UI*) :

| Élément | Comment le déclencher | Ce que ça fait |
| :--- | :--- | :--- |
| **Jeu du Snake** | Taper le Konami Code au clavier (`↑ ↑ ↓ ↓ ← → ← → B A`) | Lance un Snake complet avec sauvegarde du meilleur score |
| **Formulaires cachés** | Aller sur `/formulaire` et saisir un nom de page chiffré avec un code César à décalage de 3 (ex. `suhvhqwdwlrq` ou `lpsohphqwdwlrq`) | Débloque l'accès aux trois formulaires cachés du défi |
| **Le bouton fuyant** | Sur la page `/formulaire` | Le bouton de validation esquive le curseur de la souris et se moque de l'utilisateur |
| **Sélecteur de volume de l'enfer** | Sur la page `/formulaire` | Une grille de 100 numéros re-mélangée toutes les 3 secondes pour régler le volume |
| **Rickroll** | Se tromper de mot de passe dans le formulaire | À vous de le découvrir... |

## Stack technique

- **Framework :** Next.js 16, React 19, TypeScript
- **UI & Style :** Tailwind CSS 4, shadcn/ui (Radix UI), Lucide Icons
- **IA :** API Google Gemini (`gemini-2.5-flash`)

## Lancer le projet en local

```bash
git clone https://github.com/rafael-hocquel/nuit-informatique-2025.git
cd nuit-informatique-2025
npm install
npm run dev
