import type { Locale } from '@/config/site';

export interface GoogleReviewItem {
  id: string;
  image: string;
  objectPosition: string;
  tag: Record<Locale, string>;
  dish: Record<Locale, string>;
  highlight: Record<Locale, string>;
  quote: Record<Locale, string>;
}

export const REVIEWS_SECTION_COPY: Record<
  Locale,
  {
    kicker: string;
    title: string;
    subtitle: string;
    googleBadge: string;
    readAllCta: string;
    showMore: (remaining: number) => string;
    showLess: string;
    readMoreInline: string;
    readLessInline: string;
    starsAria: string;
  }
> = {
  fr: {
    kicker: '+1 000 AVIS GOOGLE',
    title: 'Vrai goût marin, vraie ambiance sur Rue Jourdan',
    subtitle:
      'Des premières visites en couple aux grandes tablées d’amis, ce que nos clients retiennent de Pescobar Bruxelles.',
    googleBadge: 'Avis Google vérifiés',
    readAllCta: 'Lire tous les avis sur Google',
    showMore: (n) => `Voir les ${n} autres avis`,
    showLess: 'Réduire la liste',
    readMoreInline: 'Lire la suite',
    readLessInline: 'Réduire',
    starsAria: 'Note 5 sur 5 sur Google',
  },
  nl: {
    kicker: '+1.000 GOOGLE-REVIEWS',
    title: 'Verse zeevruchten en echte sfeer in de Jourdanstraat',
    subtitle:
      'Van een eerste bezoek met z’n tweeën tot grote vriendengroepen: dit vertellen gasten over Pescobar Brussel.',
    googleBadge: 'Geverifieerde Google-reviews',
    readAllCta: 'Lees alle reviews op Google',
    showMore: (n) => `Bekijk nog ${n} reviews`,
    showLess: 'Minder tonen',
    readMoreInline: 'Lees meer',
    readLessInline: 'Minder',
    starsAria: 'Beoordeling 5 van 5 op Google',
  },
  en: {
    kicker: '1,000+ GOOGLE REVIEWS',
    title: 'Fresh seafood, real warmth on Rue Jourdan',
    subtitle:
      'From first-time couples in Brussels to tables of seven, hear what guests share after dining with us.',
    googleBadge: 'Verified Google Reviews',
    readAllCta: 'Read all reviews on Google',
    showMore: (n) => `Show ${n} more reviews`,
    showLess: 'Show fewer',
    readMoreInline: 'Read full review',
    readLessInline: 'Show less',
    starsAria: 'Rated 5 out of 5 on Google',
  },
  ro: {
    kicker: '+1 000 RECENZII GOOGLE',
    title: 'Fructe de mare proaspete și atmosferă autentică',
    subtitle:
      'De la prima vizită în cuplu în Bruxelles până la mese de 7 persoane, experiențele reale lăsate pe Google.',
    googleBadge: 'Recenzii reale Google',
    readAllCta: 'Citește toate recenziile pe Google',
    showMore: (n) => `Vezi încă ${n} recenzii`,
    showLess: 'Restrânge recenziile',
    readMoreInline: 'Citește tot',
    readLessInline: 'Mai puțin',
    starsAria: 'Evaluare 5 din 5 pe Google',
  },
};

/**
 * Ordered for maximum trust and conversion:
 * 1-2: Guest vibe, warmth & halal reassurance with staff
 * 3-6: High-ticket sharing platters, weekday Business Lunch & seafood pasta
 * 7-10: Large group speed, repeat visits, grilled octopus & everyday hospitality
 */
export const GOOGLE_REVIEWS: GoogleReviewItem[] = [
  {
    id: 'rev-01-vibe-halal',
    image: '/images/reviews/review-01.jpg',
    objectPosition: '50% 42%',
    tag: {
      fr: 'Ambiance & Halal',
      nl: 'Sfeer & Halal',
      en: 'Vibe & Halal',
      ro: 'Atmosferă & Halal',
    },
    dish: {
      fr: 'Terrasse • Options Halal • Service par Andrei',
      nl: 'Terras • Halal opties • Bediening door Andrei',
      en: 'Terrace • Halal options • Served by Andrei',
      ro: 'Terasă • Opțiuni Halal • Servit de Andrei',
    },
    highlight: {
      fr: 'Première visite à Bruxelles',
      nl: 'Eerste bezoek aan Brussel',
      en: 'First visit to Brussels',
      ro: 'Prima vizită la Bruxelles',
    },
    quote: {
      fr: 'Mon mari et moi avons adoré l’ambiance dès notre arrivée ! Pour notre première visite à Bruxelles, c’était une évidence de venir ici en tant qu’amateurs de fruits de mer — et aucune déception. Tout était frais, savoureux et à un prix très correct. Merci tout particulier à Andrei pour sa gentillesse et pour nous avoir indiqué les options halal avec autant d’attention. On reviendra, in shaa Allah !',
      nl: 'Mijn man en ik vonden de sfeer meteen geweldig! Als liefhebbers van zeevruchten kozen we tijdens ons eerste bezoek aan Brussel zonder twijfel voor Pescobar — en het stelde geen seconde teleur. Alles was vers, heerlijk op smaak en heel schappelijk geprijsd. Speciale dank aan Andrei voor zijn warme ontvangst en het meedenken rond halal opties. We komen zeker terug, in shaa Allah!',
      en: 'My husband and I absolutely loved the vibe of this restaurant! As seafood lovers, choosing Pescobar during our first visit to Brussels was a no-brainer—and it did not disappoint. Everything was fresh, delicious, and very reasonably priced. A special thank you to Andrei for being so warm and thoughtfully pointing out the halal options for us. We’ll definitely be back, in shaa Allah!',
      ro: 'Eu și soțul meu am adorat atmosfera de aici! Fiind mari iubitori de fructe de mare, am ales fără ezitare acest restaurant la prima noastră vizită în Bruxelles și nu ne-a dezamăgit deloc. Totul a fost proaspăt, gustos și la un preț corect. Mulțumiri speciale lui Andrei pentru căldura cu care ne-a servit și pentru că ne-a arătat cu atenție opțiunile halal. Revenim cu siguranță, in shaa Allah!',
    },
  },
  {
    id: 'rev-02-vibe-daniel',
    image: '/images/reviews/review-02.jpg',
    objectPosition: '50% 38%',
    tag: {
      fr: 'Service & Équipe',
      nl: 'Gastvrijheid',
      en: 'Hospitality',
      ro: 'Oameni & Servire',
    },
    dish: {
      fr: 'En salle • Service par Daniel & l’équipe',
      nl: 'In de zaak • Bediening door Daniel & team',
      en: 'Dining room • Daniel & the team',
      ro: 'În salon • Daniel & echipa',
    },
    highlight: {
      fr: 'Service ultra rapide',
      nl: 'Vlotte bediening',
      en: 'Standout service',
      ro: 'Servire rapidă',
    },
    quote: {
      fr: 'La cuisine est bonne et les prix honnêtes, mais le service a été tout simplement bluffant. Les plats sont arrivés très vite et chaque demande était réglée en un rien de temps. Des restaurants, il y en a plein, les cartes se ressemblent souvent, mais ce sont les gens qui font la différence. On a eu la chance d’être servis par Daniel : rarement vu un tel dévouement.',
      nl: 'Het eten is lekker en de prijzen zijn netjes, maar de bediening was ronduit fantastisch. Alles stond heel snel op tafel en elke vraag werd meteen opgepakt. Restaurants zijn er genoeg en gerechten lijken soms op elkaar, maar de mensen maken het verschil. Wij hadden het geluk om Daniel aan tafel te hebben — zelden zo’n inzet gezien.',
      en: 'Good food and fair prices, and the service was genuinely fantastic. Our dishes arrived fast and anything we asked for was handled in seconds. There are plenty of restaurants out there where the food feels similar—what truly sets a place apart is the people. We were lucky to have Daniel taking care of our table; service like that is rare.',
      ro: 'Mâncarea este bună, iar prețurile decente. Serviciul a fost absolut fantastic — totul a ajuns foarte repede, iar între orice cerere și rezolvarea ei a trecut extraordinar de puțin timp. Restaurante sunt multe, mâncarea poate semăna, dar diferența o fac oamenii. Am avut norocul să-l avem ospătar pe Daniel; rar așa implicare.',
    },
  },
  {
    id: 'rev-03-platter-andrei',
    image: '/images/reviews/review-03.jpg',
    objectPosition: '50% 58%',
    tag: {
      fr: 'Plateau 10/10',
      nl: '10/10 Schotel',
      en: 'Platter Favorite',
      ro: 'Nota 10',
    },
    dish: {
      fr: 'Grand Plateau • Homard, poulpe & calamar',
      nl: 'Grote Schotel • Kreeft, octopus & inktvis',
      en: 'Grand Platter • Lobster, octopus & squid',
      ro: 'Platou mare • Homar, caracatiță & calamar',
    },
    highlight: {
      fr: 'Portions généreuses',
      nl: 'Royale porties',
      en: 'Generous portions',
      ro: 'Porții generoase',
    },
    quote: {
      fr: 'Une expérience 10/10 chez Pescobar Bruxelles ! Fruits de mer ultra frais, portions généreuses et cuisson impeccable. Le plateau est idéal si vous voulez goûter à tout dans une super ambiance. Un grand merci à Andrei pour son professionnalisme et ses conseils justes du début à la fin. On recommande les yeux fermés et on reviendra.',
      nl: 'Een dikke 10 bij Pescobar Brussel! Superverse zeevruchten, royale porties en alles perfect gegaard. De schotel is ideaal als je van alles wilt proeven, en de sfeer zit meteen goed. Grote dank aan Andrei voor het professionele advies van begin tot eind. Absolute aanrader!',
      en: 'A 10/10 experience at Pescobar Brussels! Ultra-fresh seafood, generous portions, and everything cooked spot-on. The platter is ideal when you want to taste a bit of everything in a great atmosphere. Huge thanks to Andrei for guiding us to the right dishes from start to finish. We’ll be back for sure!',
      ro: 'O experiență de nota 10 la Pescobar Bruxelles! Fructele de mare au fost extrem de proaspete, porțiile generoase și totul gătit impecabil. Platoul este perfect dacă vrei să încerci din toate, iar atmosfera foarte plăcută. Mulțumiri lui Andrei pentru recomandări și atenția la detalii!',
    },
  },
  {
    id: 'rev-04-business-lunch',
    image: '/images/reviews/review-04.jpg',
    objectPosition: '50% 55%',
    tag: {
      fr: 'Business Lunch',
      nl: 'Business Lunch',
      en: 'Business Lunch',
      ro: 'Business Lunch',
    },
    dish: {
      fr: 'Menu du midi • Soupe aux fruits de mer',
      nl: 'Middagmenu • Zeevruchtensoep',
      en: 'Weekday Lunch • Seafood soup',
      ro: 'Prânz • Supă cu fructe de mare',
    },
    highlight: {
      fr: 'Client fidèle du midi',
      nl: 'Vaste lunchgast',
      en: 'Regular lunch spot',
      ro: 'Client fidel la prânz',
    },
    quote: {
      fr: 'Je reviens régulièrement le midi quand je travaille dans le quartier. L’équipe est toujours souriante et attentionnée, et la soupe aux fruits de mer est un régal à chaque fois. La formule Business Lunch offre un super rapport qualité-prix. Andrei et Gabi sont au top.',
      nl: 'Ik kom hier geregeld terug voor de lunch. Het team is altijd vriendelijk en attent, en de zeevruchtensoep stelt nooit teleur. Het Business Lunch-menu heeft een heel sterke prijs-kwaliteitverhouding. Andrei en Gabi zijn toppers.',
      en: 'I keep coming back here whenever I can for lunch. The staff is warm and attentive, and the seafood soup hits the spot every single time. The Business Lunch menu is genuinely great value—and Andrei and Gabi are awesome.',
      ro: 'Revin ori de câte ori am ocazia la prânz. Echipa este mereu atentă și primitoare, iar supa de fructe de mare este delicioasă de fiecare dată. Meniul de Business Lunch merită din plin, iar Andrei și Gabi sunt de nota zece.',
    },
  },
  {
    id: 'rev-05-platter-advice',
    image: '/images/reviews/review-05.jpg',
    objectPosition: '50% 52%',
    tag: {
      fr: 'Plateaux à partager',
      nl: 'Schotels om te delen',
      en: 'Sharing Platters',
      ro: 'Platouri',
    },
    dish: {
      fr: 'Daurade, demi-homards & poulpe grillé',
      nl: 'Dorade, halve kreeften & octopus',
      en: 'Sea bream, lobster & grilled octopus',
      ro: 'Doradă, homar & caracatiță',
    },
    highlight: {
      fr: 'Conseil sur mesure',
      nl: 'Persoonlijk advies',
      en: 'Guided choice',
      ro: 'Recomandare inspirată',
    },
    quote: {
      fr: 'Les fruits de mer sont cuits à la perfection, ultra frais et à un prix justifié ! Comme toute la carte faisait envie, on hésitait sur quel plateau choisir : Andrei nous a très bien orientés, et c’était délicieux.',
      nl: 'De zeevruchten zijn perfect gegaard, kraakvers en hun prijs meer dan waard! Omdat alles er zo goed uitzag, twijfelden we over welke schotel te nemen — Andrei hielp ons kiezen en het smaakte fantastisch.',
      en: 'The seafood is well cooked, fresh, and genuinely worth the price! Since everything on the menu looked tempting, we weren’t sure which platter to order—Andrei helped us pick the right one and it tasted incredible.',
      ro: 'Fructe de mare gătite corect, proaspete și un raport bun calitate-preț! Cum totul arăta apetisant, nu știam ce platou să alegem — Andrei ne-a ajutat să ne decidem și alegerea a fost excelentă.',
    },
  },
  {
    id: 'rev-06-pasta-drinks',
    image: '/images/reviews/review-06.jpg',
    objectPosition: '50% 48%',
    tag: {
      fr: 'Pâtes & Jus frais',
      nl: 'Pasta & Drankjes',
      en: 'Seafood Pasta',
      ro: 'Paste cu creveți',
    },
    dish: {
      fr: 'Pâtes aux crevettes & frutti di mare',
      nl: 'Pasta met garnalen & frutti di mare',
      en: 'Shrimp & frutti di mare pasta',
      ro: 'Paste cu creveți & fructe de mare',
    },
    highlight: {
      fr: 'Équipe multilingue',
      nl: 'Meertalig team',
      en: 'Fast & friendly',
      ro: 'Servire rapidă',
    },
    quote: {
      fr: 'Nous avons pris les pâtes aux crevettes et les pâtes frutti di mare : tout était super savoureux, tout comme le jus pomme-mangue. Service rapide, serveurs adorables qui parlent même espagnol. On reviendra sans hésiter !',
      nl: 'We kozen de garnalenpasta en de pasta frutti di mare en die waren allebei heerlijk, net als het appel-mangosap. Snelle bediening en vriendelijke obers die zelfs Spaans spreken. We komen zeker terug.',
      en: 'We ordered the shrimp pasta and the frutti di mare pasta and both were packed with flavor. The apple-mango juice was a highlight too. Quick service, friendly waiters—who even speak Spanish—and we will definitely return.',
      ro: 'Am comandat paste cu creveți și paste cu fructe de mare și au fost delicioase, iar sucul de mere cu mango excelent. Servire rapidă, ospătari foarte prietenoși (vorbesc chiar și spaniolă). Recomand din suflet!',
    },
  },
  {
    id: 'rev-07-group-of-7',
    image: '/images/reviews/review-07.jpg',
    objectPosition: '50% 54%',
    tag: {
      fr: 'Grands Groupes',
      nl: 'Groepen (7 pers.)',
      en: 'Group of 7',
      ro: 'Grup 7 persoane',
    },
    dish: {
      fr: 'Calamars grillés, moules & gambas',
      nl: 'Gegrilde calamar, mosselen & gamba’s',
      en: 'Grilled squid, mussels & prawns',
      ro: 'Calamar, midii & creveți Black Tiger',
    },
    highlight: {
      fr: 'Table de 7 servie vite',
      nl: 'Tafel voor 7 snel bediend',
      en: 'Fast for 7 dishes',
      ro: 'Rapid pentru grupuri',
    },
    quote: {
      fr: 'Super expérience chez Pescobar Seafood Bruxelles ! Personnel accueillant, ambiance chaleureuse et service rapide alors que nous étions 7 à table avec des plats différents. Un grand merci à Andrei pour son professionnalisme.',
      nl: 'Fantastische service bij Pescobar Seafood Brussel! Heel gastvrij onthaald en verrassend vlot geserveerd voor een groep van 7 mensen met allemaal andere gerechten. Bedankt Andrei voor de professionele bediening!',
      en: 'Fantastic quality of service at Pescobar Seafood Brussels! The staff were welcoming and warm, and everything came out fast even for our table of 7 ordering completely different dishes. Thank you to Andrei for the professional service!',
      ro: 'Calitate impecabilă a servirii la Pescobar Seafood Bruxelles! Personal foarte primitor și totul adus rapid pentru o masă de 7 persoane care au comandat preparate diferite. Mulțumim mult lui Andrei pentru profesionalism!',
    },
  },
  {
    id: 'rev-08-regular-visits',
    image: '/images/reviews/review-08.jpg',
    objectPosition: '50% 60%',
    tag: {
      fr: '3 à 4 visites',
      nl: 'Al 3-4 keer geweest',
      en: 'Repeat Guest',
      ro: 'Client fidel',
    },
    dish: {
      fr: 'Grand plateau & verre de rosé',
      nl: 'Royale schotel & rosé',
      en: 'Platter & chilled wine',
      ro: 'Platou mare & vin',
    },
    highlight: {
      fr: 'Constance & qualité',
      nl: 'Vaste kwaliteit',
      en: 'Consistent even when busy',
      ro: 'Calitate constantă',
    },
    quote: {
      fr: 'J’y suis déjà allé 3 ou 4 fois et je n’ai jamais été déçu : assiettes savoureuses, produits bien travaillés et personnel agréable. Même quand la salle est pleine, le service reste fluide et l’attente raisonnable. Une adresse où je retourne toujours avec plaisir.',
      nl: 'Ik ben hier intussen al 3 of 4 keer geweest en ben geen enkele keer teleurgesteld. De gerechten zitten vol smaak en je proeft dat alles met zorg bereid is. Zelfs op drukke avonden blijft de service vlot. Een vast adres waar ik graag terugkom!',
      en: 'I’ve been here 3 or 4 times now and haven’t been disappointed once. Flavorful plates, well-prepared seafood, and friendly service—even on busy nights, the wait stays reasonable and everything runs smoothly. A Brussels address I gladly return to.',
      ro: 'Am fost deja de 3-4 ori și nu am plecat niciodată dezamăgit. Mâncarea este foarte gustoasă, se simte prospețimea, iar servirea rămâne rapidă și plăcută chiar și atunci când localul e plin. O adresă la care revin mereu cu drag!',
    },
  },
  {
    id: 'rev-09-octopus-walkin',
    image: '/images/reviews/review-09.jpg',
    objectPosition: '50% 50%',
    tag: {
      fr: 'Poulpe Grillé',
      nl: 'Gegrilde Octopus',
      en: 'Walk-in Welcome',
      ro: 'Caracatiță',
    },
    dish: {
      fr: 'Tentacules de poulpe & sauce maison',
      nl: 'Octopustentakels & huissaus',
      en: 'Char-grilled octopus tentacles',
      ro: 'Tentacule la grătar & sos',
    },
    highlight: {
      fr: 'Installés sans réservation',
      nl: 'Meteen plek zonder reservatie',
      en: 'Seated right away',
      ro: 'Fără așteptare',
    },
    quote: {
      fr: 'Super adresse ! Nous avons eu une table tout de suite même sans réservation. Personnel très poli et attentionné. Probablement l’un des meilleurs repas de fruits de mer que j’aie mangés, sans être hors de prix. Je reviendrai sans doute !',
      nl: 'Wat een fijne plek! We kregen meteen een tafel, zelfs zonder reservatie. Heel beleefd personeel en misschien wel een van de beste zeevruchtenmaaltijden die ik ooit gegeten heb, voor een schappelijke prijs. Tot snel!',
      en: 'What a great spot! They seated us right away even without a booking. Polite staff, fast pacing, and the freshly cooked seafood was well worth the short kitchen wait—honestly some of the best seafood I’ve ever had without being overpriced.',
      ro: 'Super loc! Ne-au așezat imediat la masă chiar și fără rezervare. Personal foarte politicos și atent, iar preparatele din fructe de mare au meritat din plin — probabil printre cele mai bune pe care le-am mâncat vreodată, la un preț rezonabil.',
    },
  },
  {
    id: 'rev-10-gabi-plentiful',
    image: '/images/reviews/review-10.jpg',
    objectPosition: '50% 55%',
    tag: {
      fr: 'Assiettes copieuses',
      nl: 'Royale porties',
      en: 'Generous Dishes',
      ro: 'Porții uriașe',
    },
    dish: {
      fr: 'Poêlée de moules, paella & gambas',
      nl: 'Mosselen in saus, paella & gamba’s',
      en: 'Mussels in sauce & seafood paella',
      ro: 'Midii în sos, paella & creveți',
    },
    highlight: {
      fr: 'Ambiance signée Gabi',
      nl: 'Topsfeer met Gabi',
      en: 'Fun vibe with Gabi',
      ro: 'Servit de Gabi',
    },
    quote: {
      fr: 'Service impeccable et équipe super sympa — c’est Gabi qui s’est occupé de nous, attentionné et plein d’humour. Les assiettes de fruits de mer étaient délicieuses et tellement copieuses qu’on n’a même pas pu tout finir !',
      nl: 'Onberispelijke bediening en superleuke sfeer — Gabi hielp ons aan tafel, attent en vol humor. De zeevruchtengerechten waren zalig en de porties zo ruim dat we ze met moeite op kregen!',
      en: 'Spotless service and genuinely warm waiters—Gabi looked after us and kept us smiling all evening. The seafood plates were super tasty and so generous we were completely full before finishing the table!',
      ro: 'Servire impecabilă și ospătari super drăguți — pe noi ne-a servit Gabi, atent și plin de umor. Mâncarea foarte gustoasă și porții atât de mari încât ne-am săturat pe deplin fără să reușim să terminăm tot!',
    },
  },
];
