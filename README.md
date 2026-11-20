# Pescobar Seafood Bruxelles — Site Officiel & SEO Local (`pescobarseafoodbruxelles.be`)

Architecture **Next.js 15 App Router + TypeScript + Tailwind CSS** conçue pour la domination SEO locale à Bruxelles (**`fr-BE`**, **`nl-BE`**, **`en`**, **`ro`**) et la conversion mobile.

## 1. Configuration Centralisée (`src/config/site.ts`)
Toutes les données opérationnelles du restaurant se modifient dans un seul fichier (`src/config/site.ts`) :
- **Adresse :** Rue Jourdan 18, 1060 Saint-Gilles (Quartier Avenue Louise / Place Stéphanie), Bruxelles
- **Téléphone & WhatsApp :** `+32 499 00 70 22`
- **Horaires :** Tous les jours `12:00 – 23:00` (`Business Lunch : 12:00 – 15:00` à `19 €`)
- **Mentions Légales Belgique :** Numéros `BCE / KBO` et `TVA / BTW` prêts à être complétés.

## 2. Carte Interactive SSR (`src/data/menu.ts`)
- Importée et vérifiée directement depuis la source officielle `https://pescobaroctopus.com/pescobar-bruxelles-qr-menu/` (`-en/` et `-ro/`), avec traduction flamande (`nl-BE`).
- **26 catégories officielles** (15 `Nourriture` + 11 `Boissons`) et **185 produits vérifiés** avec :
  - Prix exacts en Euros (`€`)
  - Grammages / volumes nets (`950g`, `4500g`, `675g`, `75 cl`)
  - Liste complète des ingrédients et valeurs nutritionnelles `/ 100g`
  - Allergènes réglementaires UE (`Crustaceans`, `Molluscs`, `Fish`, `Gluten`, `Milk`, `Soya`, `Celery`, etc.)
  - Photos réelles haute résolution en lightbox modal.

## 3. Commandes & Déploiement Vercel
```bash
npm install
npm run dev      # Serveur de développement (http://localhost:3000)
npm run build    # Build de production SSG / SSR
npm run start    # Serveur de production
```

