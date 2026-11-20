import type { Locale } from '@/config/site';

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Dictionary {
  localeName: string;
  seo: {
    home: { title: string; description: string };
    menu: { title: string; description: string };
    seafoodBoil: { title: string; description: string };
    businessLunch: { title: string; description: string };
    delivery: { title: string; description: string };
    privateEvents: { title: string; description: string };
    reservations: { title: string; description: string };
    contact: { title: string; description: string };
    qrMenu: { title: string; description: string };
    legal: { title: string; description: string };
    privacy: { title: string; description: string };
    cookies: { title: string; description: string };
  };
  nav: {
    menu: string;
    seafoodBoil: string;
    businessLunch: string;
    privateEvents: string;
    reservations: string;
    contact: string;
    qrMenu: string;
    reserveCta: string;
    viewMenuCta: string;
    openHoursBadge: string;
  };
  hero: {
    kicker: string;
    titleLine1: string;
    titleAccent: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    stats: Array<{ value: string; label: string }>;
    addressBadge: string;
  };
  signatures: {
    kicker: string;
    title: string;
    subtitle: string;
    exploreAllCta: string;
  };
  boilHighlight: {
    kicker: string;
    title: string;
    subtitle: string;
    steps: Array<{ number: string; title: string; detail: string }>;
    cta: string;
    priceFrom: string;
  };
  lunchHighlight: {
    kicker: string;
    title: string;
    subtitle: string;
    priceTag: string;
    scheduleTag: string;
    formulaInclude: string;
    cta: string;
  };
  comparisonSeo: {
    kicker: string;
    title: string;
    subtitle: string;
    pillars: Array<{ title: string; description: string; metric: string }>;
  };
  reviews: {
    kicker: string;
    title: string;
    subtitle: string;
    items: Array<{ author: string; context: string; quote: string; dish: string }>;
  };
  faq: {
    kicker: string;
    title: string;
    items: FaqItem[];
  };
  menuPage: {
    kicker: string;
    title: string;
    subtitle: string;
    foodTab: string;
    drinkTab: string;
    searchPlaceholder: string;
    clearFilters: string;
    allCategories: string;
    allergenLabel: string;
    nutritionLabel: string;
    noResults: string;
    verifyPriceNotice: string;
    filters: {
      boil: string;
      octopus: string;
      platter: string;
      shrimp: string;
      fish: string;
      lunch: string;
    };
  };
  reservationForm: {
    kicker: string;
    title: string;
    subtitle: string;
    dateLabel: string;
    serviceLabel: string;
    lunchService: string;
    dinnerService: string;
    timeLabel: string;
    guestsLabel: string;
    guestsUnit: string;
    zoneLabel: string;
    zones: {
      mainDining: string;
      terrace: string;
      groupTable: string;
    };
    nameLabel: string;
    phoneLabel: string;
    emailLabel: string;
    notesLabel: string;
    notesPlaceholder: string;
    submitCta: string;
    whatsappCta: string;
    callDirectCta: string;
    instantConfirmNote: string;
    successTitle: string;
    successMessage: string;
  };
  footer: {
    tagline: string;
    navigationTitle: string;
    accessTitle: string;
    legalTitle: string;
    mentionsLegales: string;
    privacy: string;
    cookies: string;
    rights: string;
  };
}

export const DICTIONARIES: Record<Locale, Dictionary> = {
  fr: {
    localeName: 'Français',
    seo: {
      home: {
        title: 'Restaurant à Bruxelles (Avenue Louise & Saint-Gilles) | Pescobar Seafood',
        description:
          'Restaurant de fruits de mer à Bruxelles, Rue Jourdan 18 (Avenue Louise, Saint-Gilles) : Seafood Boil 130 €, poulpe grillé & Business Lunch (12h–23h).',
      },
      menu: {
        title: 'Carte & Prix Seafood Boil, Poulpe & Business Lunch | Pescobar Bruxelles',
        description:
          'Tous nos plats avec prix et grammages à Rue Jourdan 18 : Business Lunch, Seafood Boil 130 €, poulpe grillé, vins Aerosoli et allergènes UE affichés.',
      },
      seafoodBoil: {
        title: 'Seafood Boil Bruxelles (130 €) & Poulpe Grillé | Pescobar Louise',
        description:
          'Seafood Boil à 130 €, grands plateaux à partager et poulpe grillé près de l’Avenue Louise. Homard, Black Tiger, moules et vin Aerosoli inclus sur sélection.',
      },
      businessLunch: {
        title: 'Business Lunch Avenue Louise Bruxelles | Pescobar 12h–15h',
        description:
          'Business Lunch près de l’Avenue Louise (Rue Jourdan 18) de 12h à 15h : soupe de fruits de mer 400g + Fish & Chips, crevettes, poêlée ou paella.',
      },
      privateEvents: {
        title: 'Événements Privés & Dîners d’Affaires Bruxelles | Pescobar',
        description:
          'Dîners d’affaires, anniversaires et groupes Rue Jourdan 18 (Avenue Louise). Grands plateaux Seafood Boil, menus sur mesure et facturation TVA belge.',
      },
      delivery: {
        title: 'Livraison Fruits de Mer Bruxelles | Uber Eats, Deliveroo & Takeaway',
        description:
          'Commandez Pescobar Bruxelles en livraison (Uber Eats, Deliveroo, Takeaway.com) ou à emporter au Rue Jourdan 18 : Seafood Boil, poulpe & plats 12h–23h.',
      },
      reservations: {
        title: 'Réserver une Table à Bruxelles (Avenue Louise) | Restaurant Pescobar',
        description:
          'Réservez votre table au restaurant Pescobar Bruxelles, Rue Jourdan 18 (Avenue Louise & Saint-Gilles). Ouvert 7j/7 de 12:00 – 23:00 pour déjeuner ou dîner.',
      },
      contact: {
        title: 'Rue Jourdan 18, 1060 Saint-Gilles | Quartier Louise 12:00–23:00',
        description:
          'Pescobar Bruxelles : Rue Jourdan 18, 1060 Saint-Gilles, au cœur du quartier Louise. Ouvert 7j/7 de 12:00 – 23:00. +32 499 00 70 22.',
      },
      qrMenu: {
        title: 'Carte QR en Salle & Grammages | Pescobar Bruxelles',
        description:
          'Consultez la carte Pescobar Bruxelles à table : prix TTC, grammages nets, allergènes UE, Business Lunch, Seafood Boil 130 € et vins Aerosoli.',
      },
      legal: {
        title: 'Mentions Légales (BCE / TVA BE 1022.567.070) | Pescobar',
        description:
          'Mentions légales de Pescobar Seafood Bruxelles (Rue Jourdan 18, 1060 Saint-Gilles). Coordonnées BCE/TVA BE 1022.567.070, éditeur du site et contact.',
      },
      privacy: {
        title: 'Politique de Confidentialité (RGPD) | Pescobar Bruxelles',
        description:
          'Politique de confidentialité de Pescobar Bruxelles (Rue Jourdan 18, Saint-Gilles) conforme au RGPD et à l’Autorité de protection des données en Belgique.',
      },
      cookies: {
        title: 'Politique de Cookies & Préférences | Pescobar Bruxelles',
        description:
          'Informations sur les cookies techniques et mesures d’audience utilisés sur pescobarseafoodbruxelles.be pour votre visite chez Pescobar Bruxelles.',
      },
    },
    nav: {
      menu: 'La Carte',
      seafoodBoil: 'Seafood Boil & Poulpe',
      businessLunch: 'Business Lunch',
      privateEvents: 'Événements Privés',
      reservations: 'Réservations',
      contact: 'Accès & Contact',
      qrMenu: 'Menu QR',
      reserveCta: 'Réserver',
      viewMenuCta: 'Voir la carte',
      openHoursBadge: '7j/7 • 12h00 – 23h00',
    },
    hero: {
      kicker: 'RUE JOURDAN 18 • SAINT-GILLES / LOUISE',
      titleLine1: 'PESCOBAR BRUXELLES',
      titleAccent: 'SEAFOOD BOIL & POULPE GRILLÉ',
      subtitle:
        'Fruits de mer frais, poulpe grillé minute et grands plateaux chauds à partager. Rue Jourdan 18, à deux pas de l’Avenue Louise.',
      primaryCta: 'Réserver une table',
      secondaryCta: 'Voir la carte',
      stats: [
        { value: '4 Formules', label: 'Business Lunch (Soupe + Plat • 12h–15h)' },
        { value: '5 kg', label: 'Plateau "Le Sommet du Monde"' },
        { value: '7j/7', label: 'Service continu 12h00 – 23h00' },
        { value: '75 cl', label: 'Vin Aerosoli offert sur sélection' },
      ],
      addressBadge: 'Rue Jourdan 18, 1060 Saint-Gilles • +32 499 00 70 22',
    },
    signatures: {
      kicker: 'LA CARTE',
      title: 'LES INCONTOURNABLES',
      subtitle:
        'Nos plateaux à partager et spécialités de poulpe préparés à la commande.',
      exploreAllCta: 'Voir toute la carte',
    },
    boilHighlight: {
      kicker: 'À PARTAGER',
      title: 'SEAFOOD BOIL & POULPE GRILLÉ',
      subtitle:
        'Pescobar Seafood Boil, grands plateaux à partager (homard, langouste, écrevisses, crevettes Black Tiger, moules) et poulpe entier grillé.',
      steps: [
        {
          number: '01',
          title: 'Fruits de mer & crustacés',
          detail: 'Homard, langouste, écrevisses, crevettes Black Tiger, poulpe entier (950g), moules, palourdes et poissons grillés.',
        },
        {
          number: '02',
          title: 'Sauces maison',
          detail: 'Beurre à l’ail, vin blanc, chimichurri frais, aïoli, sweet chilli, sriracha ou sauce spéciale by Pescobar.',
        },
        {
          number: '03',
          title: 'Bouteille de vin offerte',
          detail: 'Une bouteille de vin Aerosoli Blanc ou Rosé (75 cl) est incluse avec une sélection de grands plateaux et le poulpe entier.',
        },
      ],
      cta: 'Voir les plateaux',
      priceFrom: 'Plateaux de 64 € à 184 € (2 à 6 personnes)',
    },
    lunchHighlight: {
      kicker: 'MIDI EN SEMAINE • 12H00 – 15H00',
      title: 'BUSINESS LUNCH',
      subtitle:
        'Soupe aux fruits de mer (400g) suivie d’un plat au choix. Servi rapidement le midi à deux pas de l’Avenue Louise.',
      priceTag: 'Soupe + Plat au choix',
      scheduleTag: '12h00 – 15h00',
      formulaInclude: 'Soupe aux fruits de mer (400g) + Plat au choix (Fish & Chips, Crevettes grillées, Poêlée de fruits de mer ou Paella)',
      cta: 'Voir les 4 formules',
    },
    comparisonSeo: {
      kicker: 'LE RESTAURANT',
      title: 'POURQUOI VENIR CHEZ PESCOBAR',
      subtitle:
        'Des portions généreuses, les poids affichés sur toute la carte et un accès facile à Saint-Gilles.',
      pillars: [
        {
          title: 'Poids affichés sur la carte',
          description: 'Chaque plat indique le poids net des ingrédients (poulpe entier 950g, grand plateau 5000g) et les allergènes.',
          metric: 'Poids net affiché',
        },
        {
          title: '10 recettes de poulpe',
          description: 'Poulpe grillé au chimichurri, à la Gallega, sur lit de pommes de terre, en pâtes Carbonara ou sur plateau.',
          metric: '10 plats de poulpe',
        },
        {
          title: 'Quartier Louise',
          description: 'Rue Jourdan 18, une table chaleureuse au cœur du quartier Louise – Saint-Gilles.',
          metric: 'Quartier Louise • Rue Jourdan 18',
        },
      ],
    },
    reviews: {
      kicker: 'AVIS CLIENTS',
      title: 'LES AVIS DE NOS CLIENTS',
      subtitle: 'Retours de clients venus déjeuner ou dîner Rue Jourdan.',
      items: [
        {
          author: 'Laurent V.',
          context: 'Dîner entre amis • Louise',
          quote: 'Le plateau Sommet du Monde est très copieux : homard, poulpe bien tendre, crevettes Black Tiger et la bouteille de vin blanc incluse. On s’est régalés à quatre.',
          dish: 'Plateau "Le Sommet du Monde"',
        },
        {
          author: 'Sophie & Marc D.',
          context: 'Business Lunch • Place Stéphanie',
          quote: 'À deux pas de l’Avenue Louise, une vraie soupe de fruits de mer suivie de crevettes grillées avec du riz, servies avec attention en moins de 30 minutes.',
          dish: 'Business Lunch — Crevettes Grillées',
        },
        {
          author: 'Alexandru M.',
          context: 'Dîner en famille • Saint-Gilles',
          quote: 'Le poulpe grillé au chimichurri est super tendre, le Fritto Misto bien chaud et croustillant. Accueil sympa et service rapide.',
          dish: 'Poulpe Grillé de Pescobar',
        },
      ],
    },
    faq: {
      kicker: 'INFOS PRATIQUES',
      title: 'QUESTIONS FRÉQUENTES',
      items: [
        {
          question: 'Où se trouve le restaurant et quels sont vos horaires ?',
          answer:
            'Rue Jourdan 18, 1060 Saint-Gilles (quartier Louise), ouvert tous les jours de 12:00 à 23:00.',
        },
        {
          question: 'Que comprend le Business Lunch ?',
          answer:
            'Servi en semaine (12:00–15:00), le Business Lunch inclut une soupe aux fruits de mer (400 g) et un plat au choix : Fish & Chips de cabillaud, crevettes grillées avec riz, poêlée de fruits de mer ou paella.',
        },
        {
          question: 'Faut-il réserver pour le Seafood Boil à 130 € ou un grand plateau ?',
          answer:
            'La réservation est conseillée du jeudi au dimanche soir pour le Seafood Boil (130 €, 5–6 pers.) et les grands plateaux à partager. Une bouteille de vin Aerosoli 75 cl est offerte sur une sélection.',
        },
        {
          question: 'Organisez-vous des dîners de groupe avec facturation TVA belge ?',
          answer:
            'Oui, nous accueillons repas d’affaires et événements privés près de l’Avenue Louise avec plateaux à partager ou menus sur mesure. Facturation disponible avec TVA belge (BE 1022.567.070).',
        },
        {
          question: 'Les allergènes UE et les grammages sont-ils indiqués ?',
          answer:
            'Oui, chaque plat affiche les allergènes UE (crustacés, mollusques, poissons, gluten, lait, soja, céleri) et le grammage net des ingrédients.',
        },
        {
          question: 'Faites-vous à emporter ou en livraison à Bruxelles ?',
          answer:
            'Oui, commandez à emporter au +32 499 00 70 22, ou faites-vous livrer à Bruxelles via Uber Eats, Deliveroo et Takeaway.com.',
        },
      ],
    },
    menuPage: {
      kicker: 'CARTE & PRIX',
      title: 'LA CARTE',
      subtitle:
        'Tous nos plats de fruits de mer, plateaux à partager et boissons avec prix et grammages.',
      foodTab: 'Plats (15)',
      drinkTab: 'Boissons & Vins (11)',
      searchPlaceholder: 'Rechercher un plat, homard, poulpe, crevettes, vin...',
      clearFilters: 'Réinitialiser',
      allCategories: 'Toutes les catégories',
      allergenLabel: 'Allergènes :',
      nutritionLabel: 'Valeurs / 100g :',
      noResults: 'Aucun plat trouvé pour cette recherche.',
      verifyPriceNotice: 'Prix TTC en euros (€). Grammages nets affichés par plat.',
      filters: {
        boil: 'Seafood Boil & Plateaux',
        octopus: 'Poulpe',
        platter: 'À Partager (2–6 pers.)',
        shrimp: 'Crevettes & Homard',
        fish: 'Poissons & Fritto',
        lunch: 'Business Lunch',
      },
    },
    reservationForm: {
      kicker: 'RÉSERVATION',
      title: 'RÉSERVER UNE TABLE',
      subtitle:
        'Pour le déjeuner (12h00–15h00) ou le dîner (18h00–23h00).',
      dateLabel: 'Date',
      serviceLabel: 'Service',
      lunchService: 'Midi / Business Lunch (12:00 – 15:00)',
      dinnerService: 'Soir (18:00 – 23:00)',
      timeLabel: 'Heure',
      guestsLabel: 'Personnes',
      guestsUnit: 'personnes',
      zoneLabel: 'Placement',
      zones: {
        mainDining: 'Salle principale',
        terrace: 'Terrasse (selon météo)',
        groupTable: 'Grande table (4+ pers.)',
      },
      nameLabel: 'Nom',
      phoneLabel: 'Téléphone',
      emailLabel: 'E-mail (optionnel)',
      notesLabel: 'Remarques ou allergies',
      notesPlaceholder: 'Plateau, allergie, chaise bébé...',
      submitCta: 'Envoyer la demande',
      whatsappCta: 'Réserver sur WhatsApp',
      callDirectCta: 'Appeler le +32 499 00 70 22',
      instantConfirmNote: 'Pour plus de 8 personnes ou pour ce soir, appelez-nous directement ou écrivez-nous sur WhatsApp.',
      successTitle: 'Votre demande est prête',
      successMessage:
        'Cliquez ci-dessous pour envoyer votre réservation par WhatsApp au restaurant ou appelez-nous directement.',
    },
    footer: {
      tagline:
        'Restaurant de fruits de mer, Seafood Boil et poulpe grillé à Bruxelles (Rue Jourdan 18, 1060 Saint-Gilles).',
      navigationTitle: 'Navigation',
      accessTitle: 'Adresse & Horaires',
      legalTitle: 'Informations Légales',
      mentionsLegales: 'Mentions légales (BCE / TVA)',
      privacy: 'Politique de confidentialité (RGPD)',
      cookies: 'Politique de cookies',
      rights: 'Tous droits réservés.',
    },
  },
  nl: {
    localeName: 'Nederlands',
    seo: {
      home: {
        title: 'Restaurant in Brussel (Louizalaan & Sint-Gillis) | Pescobar Seafood',
        description:
          'Visrestaurant in Brussel, Jourdanstraat 18 (Louizalaan, Sint-Gillis): Seafood Boil 130 €, gegrilde octopus, Aerosoli wijn & Business Lunch (12u–23u).',
      },
      menu: {
        title: 'Menu & Prijzen Seafood Boil, Octopus & Lunch | Pescobar Brussel',
        description:
          'Volledige kaart aan Jourdanstraat 18 met prijzen en gewichten: Business Lunch, Seafood Boil 130 €, gegrilde octopus, Aerosoli wijnen en EU-allergenen.',
      },
      seafoodBoil: {
        title: 'Seafood Boil Brussel (130 €) & Octopus | Pescobar Louiza',
        description:
          'Seafood Boil voor 130 €, schotels om te delen en hele gegrilde octopus bij de Louizalaan. Kreeft, Black Tiger garnalen, mosselen en Aerosoli wijn inbegrepen.',
      },
      businessLunch: {
        title: 'Business Lunch Louizalaan Brussel | Pescobar (12u–15u)',
        description:
          'Business Lunch vlak bij de Louizalaan (Jourdanstraat 18) van 12u tot 15u: zeevruchtensoep 400g + Fish & Chips, garnalen, zeevruchtenpan of paella.',
      },
      privateEvents: {
        title: 'Privé-evenementen & Zakenlunches Brussel | Pescobar Louiza',
        description:
          'Bedrijfsdiners, verjaardagen en groepen aan Jourdanstraat 18 (Louizalaan). Seafood Boil schotels, menu’s op maat en facturatie met Belgisch btw-nummer.',
      },
      delivery: {
        title: 'Zeevruchten Bezorgen Brussel | Uber Eats, Deliveroo & Takeaway',
        description:
          'Bestel Pescobar Brussel aan huis (Uber Eats, Deliveroo, Takeaway.com) of om af te halen aan Jourdanstraat 18: Seafood Boil, octopus & vis 12u–23u.',
      },
      reservations: {
        title: 'Tafel Reserveren in Brussel (Louizalaan) | Restaurant Pescobar',
        description:
          'Reserveer een tafel bij restaurant Pescobar Brussel, Jourdanstraat 18 (Louizalaan & Sint-Gillis). Dagelijks open 12:00 – 23:00 voor lunch, diner of groep.',
      },
      contact: {
        title: 'Jourdanstraat 18, 1060 Sint-Gillis | Louizawijk 12:00–23:00',
        description:
          'Pescobar Brussel: Jourdanstraat 18, 1060 Sint-Gillis, in het hart van de Louizawijk. Dagelijks 12:00 – 23:00. Tel: +32 499 00 70 22.',
      },
      qrMenu: {
        title: 'QR Menukaart & Gewichten aan Tafel | Pescobar Brussel',
        description:
          'Raadpleeg de kaart van Pescobar Brussel aan tafel: prijzen inclusief btw, nettogewichten, EU-allergenen, Business Lunch en Seafood Boil 130 €.',
      },
      legal: {
        title: 'Wettelijke Vermeldingen (KBO / BTW BE 1022.567.070) | Pescobar',
        description:
          'Wettelijke gegevens van Pescobar Seafood Brussel (Jourdanstraat 18, 1060 Sint-Gillis): KBO- en btw-nummer BE 1022.567.070, uitgever en contactinfo.',
      },
      privacy: {
        title: 'Privacybeleid & Gegevensbescherming (AVG) | Pescobar Brussel',
        description:
          'Privacybeleid van Pescobar Brussel (Jourdanstraat 18, Sint-Gillis) volgens de AVG en de Belgische Gegevensbeschermingsautoriteit voor reserveringen.',
      },
      cookies: {
        title: 'Cookiebeleid & Privacyvoorkeuren | Pescobar Brussel',
        description:
          'Informatie over functionele en analytische cookies op pescobarseafoodbruxelles.be tijdens uw bezoek of reservatie bij Pescobar Brussel.',
      },
    },
    nav: {
      menu: 'Menukaart',
      seafoodBoil: 'Seafood Boil & Octopus',
      businessLunch: 'Business Lunch',
      privateEvents: 'Privé-evenementen',
      reservations: 'Reserveren',
      contact: 'Adres & Contact',
      qrMenu: 'QR Menu',
      reserveCta: 'Reserveren',
      viewMenuCta: 'Menukaart',
      openHoursBadge: '7/7 • 12u00 – 23u00',
    },
    hero: {
      kicker: 'JOURDANSTRAAT 18 • SINT-GILLIS / LOUIZA',
      titleLine1: 'PESCOBAR BRUSSEL',
      titleAccent: 'SEAFOOD BOIL & GEGRILDE OCTOPUS',
      subtitle:
        'Verse zeevruchten, à la minute gegrilde octopus en royale schotels om te delen. Jourdanstraat 18, vlak bij de Louizalaan.',
      primaryCta: 'Tafel reserveren',
      secondaryCta: 'Bekijk de menukaart',
      stats: [
        { value: '4 Formules', label: 'Business Lunch (Soep + Hoofdgerecht • 12u–15u)' },
        { value: '5 kg', label: 'Schotel "Top of the World"' },
        { value: '7/7', label: 'Doorlopend open 12u00 – 23u00' },
        { value: '75 cl', label: 'Fles Aerosoli wijn bij selectie' },
      ],
      addressBadge: 'Jourdanstraat 18, 1060 Sint-Gillis • +32 499 00 70 22',
    },
    signatures: {
      kicker: 'DE KAART',
      title: 'ONZE SPECIALITEITEN',
      subtitle:
        'Warme zeevruchtenschotels om te delen en huisgemaakte octopusgerechten.',
      exploreAllCta: 'Volledige menukaart',
    },
    boilHighlight: {
      kicker: 'OM TE DELEN',
      title: 'SEAFOOD BOIL & GEGRILDE OCTOPUS',
      subtitle:
        'Pescobar Seafood Boil, royale zeevruchtenschotels (kreeft, langoest, rivierkreeftjes, Black Tiger garnalen, mosselen) en hele gegrilde octopus.',
      steps: [
        {
          number: '01',
          title: 'Verse zeevruchten',
          detail: 'Kreeft, langoest, rivierkreeftjes, Black Tiger garnalen, hele octopus (950g), mosselen en venusschelpen.',
        },
        {
          number: '02',
          title: 'Huisgemaakte sauzen',
          detail: 'Knoflookboter, witte wijn, verse chimichurri, aioli, sweet chili, sriracha of Special by Pescobar saus.',
        },
        {
          number: '03',
          title: 'Fles wijn inbegrepen',
          detail: 'Bij een selectie grote grillschotels en de hele octopus is een fles Aerosoli Wit of Rosé (75 cl) inbegrepen.',
        },
      ],
      cta: 'Bekijk de schotels',
      priceFrom: 'Schotels van 64 € tot 184 € (2 tot 6 personen)',
    },
    lunchHighlight: {
      kicker: 'LUNCH • 12U00 – 15U00',
      title: 'BUSINESS LUNCH',
      subtitle:
        'Zeevruchtensoep (400g) gevolgd door een hoofdgerecht naar keuze. Vlot geserveerd vlak bij de Louizalaan.',
      priceTag: 'Soep + Hoofdgerecht',
      scheduleTag: '12u00 – 15u00',
      formulaInclude: 'Zeevruchtensoep (400g) + Hoofdgerecht naar keuze (Fish & Chips, Gegrilde garnalen, Zeevruchtenpan of Paella)',
      cta: 'Bekijk de 4 formules',
    },
    comparisonSeo: {
      kicker: 'HET RESTAURANT',
      title: 'WAAROM KIEZEN VOOR PESCOBAR',
      subtitle:
        'Ruime porties, duidelijke gewichten op het menu en makkelijk bereikbaar in Sint-Gillis.',
      pillars: [
        {
          title: 'Duidelijke gewichten',
          description: 'Bij elk gerecht staan het nettogewicht (hele octopus 950g, reuzenschotel 5000g) en de allergenen vermeld.',
          metric: 'Nettogewicht',
        },
        {
          title: '10 octopusgerechten',
          description: 'Gegrilde octopus met chimichurri, a la Gallega, op een bedje van aardappelen, Carbonara of op schotel.',
          metric: '10 recepten',
        },
        {
          title: 'Louizawijk',
          description: 'Jourdanstraat 18, een sfeervol adres in het hart van de wijk Louiza – Sint-Gillis.',
          metric: 'Louizawijk • Jourdanstraat 18',
        },
      ],
    },
    reviews: {
      kicker: 'BEOORDELINGEN',
      title: 'WAT ONZE GASTEN ZEGGEN',
      subtitle: 'Ervaringen van gasten bij Pescobar in Brussel.',
      items: [
        {
          author: 'Pieter-Jan V.',
          context: 'Diner met vrienden • Louiza',
          quote: 'De Top of the World schotel is enorm: kreeft, malse octopus, Black Tiger garnalen en een fles witte wijn inbegrepen. Aanrader als je met een groep bent.',
          dish: 'Schotel "Top of the World"',
        },
        {
          author: 'Evelien K.',
          context: 'Business Lunch • Stefaniaplein',
          quote: 'Vlak bij de Louizalaan krijg je een goedgevulde zeevruchtensoep en gegrilde garnalen met rijst. Binnen een halfuur op tafel, heel handig tijdens de lunchpauze.',
          dish: 'Business Lunch — Gegrilde Garnalen',
        },
        {
          author: 'Thomas B.',
          context: 'Diner • Sint-Gillis',
          quote: 'De gegrilde octopus met chimichurri en de Fritto Misto zijn erg lekker. Gezellige zaak en vriendelijke bediening.',
          dish: 'Gegrilde Octopus',
        },
      ],
    },
    faq: {
      kicker: 'PRAKTISCHE INFO',
      title: 'VEELGESTELDE VRAGEN',
      items: [
        {
          question: 'Waar ligt het restaurant en wat zijn de openingsuren?',
          answer:
            'Jourdanstraat 18, 1060 Sint-Gillis (Louizawijk), dagelijks geopend van 12:00 tot 23:00.',
        },
        {
          question: 'Wat zit er in de Business Lunch?',
          answer:
            'Van maandag tot vrijdag (12:00–15:00) omvat de Business Lunch zeevruchtensoep (400 g) en een hoofdgerecht naar keuze: Fish & Chips van kabeljauw, gegrilde garnalen met rijst, zeevruchtenpan of paella.',
        },
        {
          question: 'Moet ik reserveren voor de Seafood Boil van 130 € of een grote schotel?',
          answer:
            'Reserveren is aanbevolen van donderdag tot zondagavond voor de Seafood Boil (130 €, 5–6 pers.) en grote schotels om te delen. Bij geselecteerde schotels is een fles Aerosoli wijn (75 cl) inbegrepen.',
        },
        {
          question: 'Organiseren jullie groepsdiners met Belgische btw-facturatie?',
          answer:
            'Ja, we ontvangen zakelijke diners en privéfeesten nabij de Louizalaan met schotels om te delen of menu’s op maat. Facturatie met Belgisch btw-nummer (BE 1022.567.070) is mogelijk.',
        },
        {
          question: 'Staan EU-allergenen en gramgewichten vermeld op de kaart?',
          answer:
            'Ja, bij elk gerecht staan de EU-allergenen (schaaldieren, weekdieren, vis, gluten, melk, soja, selderij) en het nettogewicht per ingrediënt vermeld.',
        },
        {
          question: 'Kan ik ook afhalen of laten leveren in Brussel?',
          answer:
            'Ja, bestel telefonisch om af te halen via +32 499 00 70 22, of laat leveren in Brussel via Uber Eats, Deliveroo en Takeaway.com.',
        },
      ],
    },
    menuPage: {
      kicker: 'MENU & PRIJZEN',
      title: 'MENUKAART',
      subtitle:
        'Al onze zeevruchtengerechten, schotels om te delen en dranken met prijzen en gewichten.',
      foodTab: 'Gerechten (15)',
      drinkTab: 'Dranken & Wijn (11)',
      searchPlaceholder: 'Zoek een gerecht, kreeft, octopus, garnalen, wijn...',
      clearFilters: 'Reset',
      allCategories: 'Alle categorieën',
      allergenLabel: 'Allergenen:',
      nutritionLabel: 'Voedingswaarden / 100g:',
      noResults: 'Geen gerechten gevonden voor deze zoekopdracht.',
      verifyPriceNotice: 'Prijzen inclusief btw in euro (€). Nettogewichten per gerecht vermeld.',
      filters: {
        boil: 'Seafood Boil & Schotels',
        octopus: 'Octopus',
        platter: 'Om te Delen (2–6 pers.)',
        shrimp: 'Garnalen & Kreeft',
        fish: 'Vis & Fritto',
        lunch: 'Business Lunch',
      },
    },
    reservationForm: {
      kicker: 'RESERVEREN',
      title: 'TAFEL RESERVEREN',
      subtitle:
        'Voor de lunch (12u00–15u00) of het diner (18u00–23u00).',
      dateLabel: 'Datum',
      serviceLabel: 'Service',
      lunchService: 'Lunch / Business Lunch (12:00 – 15:00)',
      dinnerService: 'Diner (18:00 – 23:00)',
      timeLabel: 'Tijdstip',
      guestsLabel: 'Aantal personen',
      guestsUnit: 'personen',
      zoneLabel: 'Voorkeur',
      zones: {
        mainDining: 'Restaurantzaal',
        terrace: 'Terras (afhankelijk van het weer)',
        groupTable: 'Grote tafel (4+ pers.)',
      },
      nameLabel: 'Naam',
      phoneLabel: 'Telefoonnummer',
      emailLabel: 'E-mailadres (optioneel)',
      notesLabel: 'Opmerkingen of allergieën',
      notesPlaceholder: 'Schotel, allergieën, kinderstoel...',
      submitCta: 'Aanvraag versturen',
      whatsappCta: 'Reserveren via WhatsApp',
      callDirectCta: 'Bel +32 499 00 70 22',
      instantConfirmNote: 'Voor groepen vanaf 8 personen of reservaties voor vanavond kunt u ons het best bellen of sturen via WhatsApp.',
      successTitle: 'Uw aanvraag is klaar',
      successMessage:
        'Klik hieronder om uw reservatie via WhatsApp te versturen of bel ons rechtstreeks.',
    },
    footer: {
      tagline:
        'Zeevruchtenrestaurant, Seafood Boil en gegrilde octopus in Brussel (Jourdanstraat 18, 1060 Sint-Gillis).',
      navigationTitle: 'Navigatie',
      accessTitle: 'Adres & Openingsuren',
      legalTitle: 'Wettelijke Informatie',
      mentionsLegales: 'Wettelijke vermeldingen (KBO / BTW)',
      privacy: 'Privacybeleid (AVG)',
      cookies: 'Cookiebeleid',
      rights: 'Alle rechten voorbehouden.',
    },
  },
  en: {
    localeName: 'English',
    seo: {
      home: {
        title: 'Restaurant in Brussels (Avenue Louise & Saint-Gilles) | Pescobar Seafood',
        description:
          'Seafood restaurant in Brussels, Rue Jourdan 18 (off Avenue Louise, Saint-Gilles): €130 Seafood Boil, grilled octopus & Business Lunch daily 12:00–23:00.',
      },
      menu: {
        title: 'Menu & Prices: Seafood Boil, Octopus & Lunch | Pescobar Brussels',
        description:
          'Full menu at Rue Jourdan 18 with prices and gram weights: Business Lunch, €130 Seafood Boil, grilled octopus, Aerosoli wines & EU allergens listed.',
      },
      seafoodBoil: {
        title: 'Seafood Boil Brussels (€130) & Grilled Octopus | Pescobar Louise',
        description:
          '€130 Seafood Boil, sharing platters and grilled octopus near Avenue Louise. Lobster, Black Tiger prawns, mussels & Aerosoli wine included on select platters.',
      },
      businessLunch: {
        title: 'Business Lunch Avenue Louise Brussels | Pescobar 12:00–15:00',
        description:
          'Weekday Business Lunch near Avenue Louise (Rue Jourdan 18) from 12:00 to 15:00: 400g Seafood Soup plus Cod Fish & Chips, grilled shrimp, skillet or paella.',
      },
      privateEvents: {
        title: 'Private Events & Group Dining Brussels | Pescobar Louise',
        description:
          'Corporate dinners, birthdays and group dining at Rue Jourdan 18 (Avenue Louise). Seafood Boil sharing platters, tailored menus and Belgian VAT invoicing.',
      },
      delivery: {
        title: 'Seafood Delivery Brussels | Uber Eats, Deliveroo & Takeaway',
        description:
          'Order Pescobar Brussels for delivery on Uber Eats, Deliveroo & Takeaway.com or direct pickup at Rue Jourdan 18: Seafood Boil, grilled octopus 12:00–23:00.',
      },
      reservations: {
        title: 'Book a Table in Brussels (Avenue Louise) | Pescobar Restaurant',
        description:
          'Book a table at Pescobar Brussels, Rue Jourdan 18 (Avenue Louise & Saint-Gilles). Open daily 12:00 – 23:00 for Business Lunch or seafood dinner.',
      },
      contact: {
        title: 'Rue Jourdan 18, 1060 Saint-Gilles | Louise District 12:00–23:00',
        description:
          'Pescobar Brussels: Rue Jourdan 18, 1060 Saint-Gilles, in the heart of the Louise district. Open daily 12:00 – 23:00. Tel: +32 499 00 70 22.',
      },
      qrMenu: {
        title: 'QR Table Menu, Prices & Weights | Pescobar Brussels',
        description:
          'Browse the Pescobar Brussels table menu: prices in euros, net gram weights, EU allergens, Business Lunch, €130 Seafood Boil and Aerosoli wine list.',
      },
      legal: {
        title: 'Legal Notice (BCE / VAT BE 1022.567.070) | Pescobar Brussels',
        description:
          'Belgian company details for Pescobar Seafood Brussels (Rue Jourdan 18, 1060 Saint-Gilles): BCE & VAT BE 1022.567.070, publisher and legal contact.',
      },
      privacy: {
        title: 'Privacy Policy & Data Protection (GDPR) | Pescobar Brussels',
        description:
          'Privacy policy for Pescobar Brussels (Rue Jourdan 18, Saint-Gilles) in line with EU GDPR and the Belgian Data Protection Authority for bookings.',
      },
      cookies: {
        title: 'Cookie Policy & Site Preferences | Pescobar Brussels',
        description:
          'Details on essential and analytics cookies used on pescobarseafoodbruxelles.be when browsing the menu or booking a table at Pescobar Brussels.',
      },
    },
    nav: {
      menu: 'Menu',
      seafoodBoil: 'Seafood Boil & Octopus',
      businessLunch: 'Business Lunch',
      privateEvents: 'Private Events',
      reservations: 'Book a Table',
      contact: 'Location & Contact',
      qrMenu: 'QR Menu',
      reserveCta: 'Book a Table',
      viewMenuCta: 'View Menu',
      openHoursBadge: 'Daily • 12:00 – 23:00',
    },
    hero: {
      kicker: 'RUE JOURDAN 18 • SAINT-GILLES / LOUISE',
      titleLine1: 'PESCOBAR BRUSSELS',
      titleAccent: 'SEAFOOD BOIL & GRILLED OCTOPUS',
      subtitle:
        'Fresh seafood, char-grilled octopus and hot sharing platters. Rue Jourdan 18, just off Avenue Louise.',
      primaryCta: 'Book a table',
      secondaryCta: 'View the menu',
      stats: [
        { value: '4 Options', label: 'Business Lunch (Soup + Main • 12:00–15:00)' },
        { value: '5 kg', label: '"Top of the World" Platter' },
        { value: '7/7', label: 'Open daily 12:00 – 23:00' },
        { value: '75 cl', label: 'Aerosoli wine included on selection' },
      ],
      addressBadge: 'Rue Jourdan 18, 1060 Saint-Gilles • +32 499 00 70 22',
    },
    signatures: {
      kicker: 'OUR MENU',
      title: 'HOUSE FAVORITES',
      subtitle:
        'Sharing platters and grilled octopus cooked to order.',
      exploreAllCta: 'See full menu',
    },
    boilHighlight: {
      kicker: 'FOR THE TABLE',
      title: 'SEAFOOD BOIL & GRILLED OCTOPUS',
      subtitle:
        'Pescobar Seafood Boil, grand sharing platters (lobster, spiny lobster, crayfish, Black Tiger prawns, mussels) and whole char-grilled octopus.',
      steps: [
        {
          number: '01',
          title: 'Fresh shellfish & seafood',
          detail: 'Whole lobster, spiny lobster, crayfish, Black Tiger prawns, whole octopus (950g), mussels and clams.',
        },
        {
          number: '02',
          title: 'House sauces',
          detail: 'Garlic butter, white wine, fresh chimichurri, aioli, sweet chili, sriracha or Special by Pescobar sauce.',
        },
        {
          number: '03',
          title: 'Bottle of wine included',
          detail: 'Selected large sharing platters and our whole grilled octopus include a 75 cl bottle of Aerosoli White or Rosé.',
        },
      ],
      cta: 'See platters & boils',
      priceFrom: 'Platters from €64 to €184 (2 to 6 guests)',
    },
    lunchHighlight: {
      kicker: 'WEEKDAY LUNCH • 12:00 – 15:00',
      title: 'BUSINESS LUNCH',
      subtitle:
        'Seafood soup (400g) followed by a main course of your choice. Quick lunch service just off Avenue Louise.',
      priceTag: 'Soup + Main Course',
      scheduleTag: '12:00 – 15:00',
      formulaInclude: '400g Seafood Soup + Main Course of choice (Cod Fish & Chips, Grilled Shrimp with Rice, Seafood Skillet or Paella)',
      cta: 'See the 4 lunch options',
    },
    comparisonSeo: {
      kicker: 'THE RESTAURANT',
      title: 'WHAT TO EXPECT AT PESCOBAR',
      subtitle:
        'Generous portions, exact weights listed on the menu and easy access in Saint-Gilles.',
      pillars: [
        {
          title: 'Exact weights on the menu',
          description: 'Every dish shows the net weight of its ingredients (whole octopus 950g, large platter 5000g) and allergens.',
          metric: 'Weights listed',
        },
        {
          title: '10 octopus dishes',
          description: 'Char-grilled with chimichurri, Gallega style, over roasted potatoes, octopus Carbonara or on sharing platters.',
          metric: '10 octopus recipes',
        },
        {
          title: 'Louise District',
          description: 'Rue Jourdan 18, a warm dining room in the heart of the Louise – Saint-Gilles neighborhood.',
          metric: 'Louise District • Rue Jourdan 18',
        },
      ],
    },
    reviews: {
      kicker: 'REVIEWS',
      title: 'WHAT OUR GUESTS SAY',
      subtitle: 'Feedback from lunch and dinner tables on Rue Jourdan.',
      items: [
        {
          author: 'James H.',
          context: 'Dinner with friends • Louise',
          quote: 'The Top of the World platter easily fed five of us—lobster, whole octopus, tiger prawns, red mullet and a bottle of white wine included. Great value for Brussels.',
          dish: '"Top of the World" Platter',
        },
        {
          author: 'Elena R.',
          context: 'Business Lunch • Place Stéphanie',
          quote: 'A generous 400g bowl of seafood soup plus grilled prawns and rice right off Avenue Louise is hard to beat. Fast, warm service.',
          dish: 'Business Lunch — Grilled Shrimp',
        },
        {
          author: 'David & Claire M.',
          context: 'Dinner • Saint-Gilles',
          quote: 'The grilled octopus with chimichurri is tender and properly charred. Good atmosphere and relaxed service.',
          dish: 'Grilled Octopus',
        },
      ],
    },
    faq: {
      kicker: 'PRACTICAL INFO',
      title: 'FREQUENTLY ASKED QUESTIONS',
      items: [
        {
          question: 'Where is the restaurant located and what are your opening hours?',
          answer:
            'Rue Jourdan 18, 1060 Saint-Gilles (Louise district), open daily from 12:00 to 23:00.',
        },
        {
          question: 'What is included in the Business Lunch?',
          answer:
            'Served weekdays (12:00–15:00), the Business Lunch includes a 400 g Seafood Soup plus your choice of Cod Fish & Chips, Grilled Shrimp with Rice, Seafood Skillet or Paella.',
        },
        {
          question: 'Do I need to book ahead for the €130 Seafood Boil or a large platter?',
          answer:
            'Booking is recommended Thursday to Sunday evenings for the Seafood Boil (€130, 5–6 guests) and large sharing platters. Selected platters and the whole grilled octopus include a 75 cl bottle of Aerosoli wine.',
        },
        {
          question: 'Do you host private group events and issue Belgian VAT invoices?',
          answer:
            'Yes, we host private dinners and corporate groups near Avenue Louise with sharing platters or tailored menus. Belgian VAT invoices (BE 1022.567.070) are available on request.',
        },
        {
          question: 'Are EU allergens and gram weights listed on the menu?',
          answer:
            'Yes, every dish lists EU allergens (crustaceans, molluscs, fish, gluten, milk, soy, celery) alongside net ingredient weights.',
        },
        {
          question: 'Do you offer takeaway or delivery in Brussels?',
          answer:
            'Yes, call +32 499 00 70 22 for takeaway pickup, or order delivery across Brussels via Uber Eats, Deliveroo and Takeaway.com.',
        },
      ],
    },
    menuPage: {
      kicker: 'MENU & PRICES',
      title: 'OUR MENU',
      subtitle:
        'All our seafood dishes, sharing platters and drinks with prices and weights.',
      foodTab: 'Food (15)',
      drinkTab: 'Drinks & Wine (11)',
      searchPlaceholder: 'Search dishes, lobster, octopus, shrimp, wine...',
      clearFilters: 'Reset',
      allCategories: 'All categories',
      allergenLabel: 'Allergens:',
      nutritionLabel: 'Nutrition / 100g:',
      noResults: 'No dishes match your search.',
      verifyPriceNotice: 'Prices in Euros (€) including VAT. Net weights listed per dish.',
      filters: {
        boil: 'Seafood Boil & Platters',
        octopus: 'Octopus',
        platter: 'For Sharing (2–6 guests)',
        shrimp: 'Shrimp & Lobster',
        fish: 'Fish & Fritto',
        lunch: 'Business Lunch',
      },
    },
    reservationForm: {
      kicker: 'RESERVATIONS',
      title: 'BOOK A TABLE',
      subtitle:
        'For lunch (12:00–15:00) or dinner (18:00–23:00).',
      dateLabel: 'Date',
      serviceLabel: 'Service',
      lunchService: 'Lunch / Business Lunch (12:00 – 15:00)',
      dinnerService: 'Dinner (18:00 – 23:00)',
      timeLabel: 'Time',
      guestsLabel: 'Guests',
      guestsUnit: 'guests',
      zoneLabel: 'Seating',
      zones: {
        mainDining: 'Main dining room',
        terrace: 'Terrace (weather permitting)',
        groupTable: 'Large table (4+ guests)',
      },
      nameLabel: 'Full Name',
      phoneLabel: 'Phone Number',
      emailLabel: 'Email (optional)',
      notesLabel: 'Notes or allergies',
      notesPlaceholder: 'Platter, allergy, high chair...',
      submitCta: 'Send booking request',
      whatsappCta: 'Book via WhatsApp',
      callDirectCta: 'Call +32 499 00 70 22',
      instantConfirmNote: 'For groups of 8+ or same-day bookings, please call us directly or send a WhatsApp message.',
      successTitle: 'Your request is ready',
      successMessage:
        'Click below to send your booking details via WhatsApp or call us directly.',
    },
    footer: {
      tagline:
        'Seafood restaurant, Seafood Boil and grilled octopus in Brussels (Rue Jourdan 18, 1060 Saint-Gilles).',
      navigationTitle: 'Navigation',
      accessTitle: 'Address & Hours',
      legalTitle: 'Legal Information',
      mentionsLegales: 'Legal Notice (BCE / VAT)',
      privacy: 'Privacy Policy (GDPR)',
      cookies: 'Cookie Policy',
      rights: 'All rights reserved.',
    },
  },
  ro: {
    localeName: 'Română',
    seo: {
      home: {
        title: 'Restaurant în Bruxelles (Avenue Louise / Luiza) | Pescobar Seafood',
        description:
          'Restaurant de fructe de mare în Bruxelles, Rue Jourdan 18 (Avenue Louise / Luiza, Saint-Gilles): Seafood Boil 130 €, caracatiță & Business Lunch (12–23).',
      },
      menu: {
        title: 'Meniu & Prețuri : Seafood Boil, Caracatiță & Prânz | Pescobar Bruxelles',
        description:
          'Meniul complet de pe Rue Jourdan 18 cu prețuri și gramaje: Business Lunch, Seafood Boil 130 €, caracatiță la grătar, vinuri Aerosoli și alergeni UE.',
      },
      seafoodBoil: {
        title: 'Seafood Boil Bruxelles (130 €) & Caracatiță | Pescobar Louise',
        description:
          'Seafood Boil la 130 €, platouri de împărțit și caracatiță întreagă la grătar lângă Avenue Louise. Homar, creveți Black Tiger, midii și vin Aerosoli inclus.',
      },
      businessLunch: {
        title: 'Business Lunch Avenue Louise Bruxelles | Pescobar Prânz',
        description:
          'Business Lunch lângă Avenue Louise (Rue Jourdan 18), 12:00–15:00: supă cu fructe de mare 400g + Fish & Chips, creveți la grătar, tigaie sau paella.',
      },
      privateEvents: {
        title: 'Evenimente Private & Mese Corporate Bruxelles | Pescobar',
        description:
          'Cine corporate, aniversări și grupuri pe Rue Jourdan 18 (Avenue Louise). Platouri Seafood Boil, meniuri personalizate și facturare cu TVA belgian.',
      },
      delivery: {
        title: 'Livrare Fructe de Mare Bruxelles | Uber Eats, Deliveroo & Takeaway',
        description:
          'Comandă Pescobar Bruxelles cu livrare (Uber Eats, Deliveroo, Takeaway.com) sau ridicare din Rue Jourdan 18: Seafood Boil, caracatiță & platouri 12–23.',
      },
      reservations: {
        title: 'Rezervare Masă Restaurant Bruxelles (Avenue Louise / Luiza) | Pescobar',
        description:
          'Rezervă o masă la restaurant Pescobar Bruxelles, Rue Jourdan 18 (lângă Avenue Louise / Luiza). Deschis zilnic 12:00 – 23:00 pentru prânz sau cină.',
      },
      contact: {
        title: 'Rue Jourdan 18, 1060 Saint-Gilles | Cartierul Louise 12:00–23:00',
        description:
          'Pescobar Bruxelles: Rue Jourdan 18, 1060 Saint-Gilles, în inima cartierului Louise. Zilnic 12:00 – 23:00. Tel: +32 499 00 70 22.',
      },
      qrMenu: {
        title: 'Meniu QR la Masă, Prețuri & Gramaje | Pescobar Bruxelles',
        description:
          'Consultă meniul Pescobar Bruxelles la masă: prețuri cu TVA, gramaje nete, alergeni UE, Business Lunch, Seafood Boil 130 € și vinuri Aerosoli.',
      },
      legal: {
        title: 'Mențiuni Legale (BCE / TVA BE 1022.567.070) | Pescobar',
        description:
          'Date legale Pescobar Seafood Bruxelles (Rue Jourdan 18, 1060 Saint-Gilles): înregistrare BCE și TVA BE 1022.567.070, editor și contact oficial.',
      },
      privacy: {
        title: 'Politică de Confidențialitate (GDPR) | Pescobar Bruxelles',
        description:
          'Politica de confidențialitate Pescobar Bruxelles (Rue Jourdan 18, Saint-Gilles) conform GDPR și Autorității Belgiene pentru Protecția Datelor.',
      },
      cookies: {
        title: 'Politică de Cookies & Preferințe | Pescobar Bruxelles',
        description:
          'Informații despre modulele cookie esențiale și de analiză utilizate pe pescobarseafoodbruxelles.be pentru navigare și rezervarea mesei.',
      },
    },
    nav: {
      menu: 'Meniu',
      seafoodBoil: 'Seafood Boil & Caracatiță',
      businessLunch: 'Business Lunch',
      privateEvents: 'Evenimente Private',
      reservations: 'Rezervări',
      contact: 'Adresă & Contact',
      qrMenu: 'Meniu QR',
      reserveCta: 'Rezervă o masă',
      viewMenuCta: 'Vezi meniul',
      openHoursBadge: 'Zilnic • 12:00 – 23:00',
    },
    hero: {
      kicker: 'RUE JOURDAN 18 • SAINT-GILLES / LOUISE',
      titleLine1: 'PESCOBAR BRUXELLES',
      titleAccent: 'SEAFOOD BOIL & CARACATIȚĂ LA GRĂTAR',
      subtitle:
        'Fructe de mare proaspete, caracatiță pe grătar și platouri calde de împărțit la masă. Rue Jourdan 18, lângă Avenue Louise.',
      primaryCta: 'Rezervă o masă',
      secondaryCta: 'Vezi meniul',
      stats: [
        { value: '4 Variante', label: 'Business Lunch (Supă + Fel Principal • 12–15)' },
        { value: '5 kg', label: 'Platoul "Top of the World"' },
        { value: '7/7', label: 'Deschis zilnic 12:00 – 23:00' },
        { value: '75 cl', label: 'Vin Aerosoli inclus la selecție' },
      ],
      addressBadge: 'Rue Jourdan 18, 1060 Saint-Gilles • +32 499 00 70 22',
    },
    signatures: {
      kicker: 'DIN MENIU',
      title: 'CELE MAI COMANDATE',
      subtitle:
        'Platourile noastre mari și specialitățile din caracatiță gătite pe loc.',
      exploreAllCta: 'Vezi tot meniul',
    },
    boilHighlight: {
      kicker: 'PENTRU MASĂ',
      title: 'SEAFOOD BOIL & CARACATIȚĂ LA GRĂTAR',
      subtitle:
        'Pescobar Seafood Boil, platouri mari de împărțit (homar, langustă, raci, creveți Black Tiger, midii) și caracatiță întreagă la grătar.',
      steps: [
        {
          number: '01',
          title: 'Fructe de mare proaspete',
          detail: 'Homar, langustă, raci, creveți Black Tiger, caracatiță întreagă (950g), midii și carne de scoici.',
        },
        {
          number: '02',
          title: 'Sosuri de casă',
          detail: 'Unt cu usturoi, vin alb, sos chimichurri, aioli, sweet chilli, sriracha sau sosul Special by Pescobar.',
        },
        {
          number: '03',
          title: 'Sticlă de vin inclusă',
          detail: 'O selecție de platouri mari și caracatița întreagă la grătar includ o sticlă de vin Aerosoli Alb sau Rose (75 cl).',
        },
      ],
      cta: 'Vezi platourile',
      priceFrom: 'Platouri între 64 € și 184 € (2 – 6 persoane)',
    },
    lunchHighlight: {
      kicker: 'PRÂNZ • 12:00 – 15:00',
      title: 'BUSINESS LUNCH',
      subtitle:
        'Supă cu fructe de mare (400g) și un fel principal la alegere. Servire rapidă la prânz, lângă Avenue Louise.',
      priceTag: 'Supă + Fel Principal',
      scheduleTag: '12:00 – 15:00',
      formulaInclude: 'Supă cu fructe de mare (400g) + Fel principal la alegere (Fish & Chips, Creveți la grătar cu orez, Tigaie marină sau Paella)',
      cta: 'Vezi cele 4 meniuri',
    },
    comparisonSeo: {
      kicker: 'RESTAURANTUL',
      title: 'CE GĂSEȘTI LA PESCOBAR BRUXELLES',
      subtitle:
        'Porții mari, gramaje trecute în meniu la fiecare preparat și acces ușor în Saint-Gilles.',
      pillars: [
        {
          title: 'Gramaje clare în meniu',
          description: 'Fiecare preparat are gramajul net trecut în meniu (caracatiță întreagă 950g, platou mare 5000g) și lista de alergeni.',
          metric: 'Gramaj net',
        },
        {
          title: '10 rețete cu caracatiță',
          description: 'La grătar cu chimichurri, a la Gallega, pe pat de cartofi, paste Carbonara cu caracatiță sau pe platouri.',
          metric: '10 preparate',
        },
        {
          title: 'Cartierul Louise',
          description: 'Rue Jourdan 18, o adresă primitoare în inima cartierului Louise – Saint-Gilles.',
          metric: 'Cartierul Louise • Rue Jourdan 18',
        },
      ],
    },
    reviews: {
      kicker: 'RECENZII',
      title: 'CE SPUN CLIENȚII NOȘTRI',
      subtitle: 'Păreri de la cei care ne-au trecut pragul pe Rue Jourdan.',
      items: [
        {
          author: 'Andrei & Diana P.',
          context: 'Cină cu prietenii • Bruxelles',
          quote: 'Am luat platoul Top of the World la 5 persoane — homar, caracatiță fragedă, creveți Black Tiger, barbun și o sticlă de vin Aerosoli inclusă. Foarte gustos și sățios.',
          dish: 'Platoul "Top of the World"',
        },
        {
          author: 'Cristian T.',
          context: 'Business Lunch • Avenue Louise',
          quote: 'În zona Avenue Louise primești un bol mare de supă de fructe de mare și creveți la grătar cu orez. Servire rapidă și gust autentic în pauza de masă.',
          dish: 'Business Lunch — Creveți la Grătar',
        },
        {
          author: 'Mihaela S.',
          context: 'Cină în weekend • Saint-Gilles',
          quote: 'Caracatița la grătar și tigaia cu creveți sunt gătite exact cum trebuie. Atmosferă plăcută și oameni primitori.',
          dish: 'Caracatiță la Grătar',
        },
      ],
    },
    faq: {
      kicker: 'INFORMAȚII UTILE',
      title: 'ÎNTREBĂRI FRECVENTE',
      items: [
        {
          question: 'Unde se află restaurantul și ce program aveți?',
          answer:
            'Rue Jourdan 18, 1060 Saint-Gilles (cartierul Louise), deschis zilnic de la 12:00 la 23:00.',
        },
        {
          question: 'Ce include Business Lunch-ul?',
          answer:
            'Servit în timpul săptămânii (12:00–15:00), meniul Business Lunch include o supă cu fructe de mare (400 g) și un fel principal: Fish & Chips de cod, creveți la grătar cu orez, tigaie cu fructe de mare sau paella.',
        },
        {
          question: 'Trebuie rezervare pentru Seafood Boil de 130 € sau platourile mari?',
          answer:
            'Recomandăm rezervarea de joi până duminică seara pentru Seafood Boil (130 €, 5–6 pers.) și platourile mari. O selecție de platouri și caracatița întreagă includ o sticlă de vin Aerosoli (75 cl).',
        },
        {
          question: 'Organizați mese de grup și emiteți factură cu TVA belgian?',
          answer:
            'Da, găzduim evenimente private și cine corporate lângă Avenue Louise, cu platouri de împărțit sau meniuri personalizate. Emitem facturi cu TVA belgian (BE 1022.567.070).',
        },
        {
          question: 'Sunt afișați alergenii UE și gramajele în meniu?',
          answer:
            'Da, fiecare preparat afișează alergenii UE (crustacee, moluște, pește, gluten, lapte, soia, țelină) și gramajul net al ingredientelor.',
        },
        {
          question: 'Pot comanda la pachet sau cu livrare în Bruxelles?',
          answer:
            'Da, comandă la pachet la +32 499 00 70 22 sau cu livrare în Bruxelles prin Uber Eats, Deliveroo și Takeaway.com.',
        },
      ],
    },
    menuPage: {
      kicker: 'MENIU & PREȚURI',
      title: 'MENIUL COMPLET',
      subtitle:
        'Toate preparatele cu fructe de mare, platourile de împărțit și băuturile, cu prețuri și gramaje.',
      foodTab: 'Mâncare (15)',
      drinkTab: 'Băuturi & Vinuri (11)',
      searchPlaceholder: 'Caută un preparat, homar, caracatiță, creveți, vin...',
      clearFilters: 'Resetează',
      allCategories: 'Toate categoriile',
      allergenLabel: 'Alergeni:',
      nutritionLabel: 'Valori / 100g:',
      noResults: 'Niciun preparat găsit pentru această căutare.',
      verifyPriceNotice: 'Prețuri în euro (€) cu TVA inclus. Gramajele nete sunt afișate la fiecare preparat.',
      filters: {
        boil: 'Seafood Boil & Platouri',
        octopus: 'Caracatiță',
        platter: 'Platouri (2–6 pers.)',
        shrimp: 'Creveți & Homar',
        fish: 'Pește & Fritto',
        lunch: 'Business Lunch',
      },
    },
    reservationForm: {
      kicker: 'REZERVĂRI',
      title: 'REZERVĂ O MASĂ',
      subtitle:
        'Pentru prânz (12:00–15:00) sau cină (18:00–23:00).',
      dateLabel: 'Data',
      serviceLabel: 'Interval',
      lunchService: 'Prânz / Business Lunch (12:00 – 15:00)',
      dinnerService: 'Cină (18:00 – 23:00)',
      timeLabel: 'Ora',
      guestsLabel: 'Persoane',
      guestsUnit: 'persoane',
      zoneLabel: 'Locul la masă',
      zones: {
        mainDining: 'În interior',
        terrace: 'Terasă (în funcție de vreme)',
        groupTable: 'Masă mare (4+ pers.)',
      },
      nameLabel: 'Nume',
      phoneLabel: 'Telefon',
      emailLabel: 'E-mail (opțional)',
      notesLabel: 'Mențiuni sau alergii',
      notesPlaceholder: 'Platou, alergie, scaun copil...',
      submitCta: 'Trimite rezervarea',
      whatsappCta: 'Rezervă pe WhatsApp',
      callDirectCta: 'Sună la +32 499 00 70 22',
      instantConfirmNote: 'Pentru grupuri de peste 8 persoane sau rezervări pentru azi, sună-ne direct sau scrie-ne pe WhatsApp.',
      successTitle: 'Detaliile sunt pregătite',
      successMessage:
        'Apasă mai jos pentru a trimite rezervarea pe WhatsApp sau sună-ne direct.',
    },
    footer: {
      tagline:
        'Restaurant cu fructe de mare, Seafood Boil și caracatiță la grătar în Bruxelles (Rue Jourdan 18, 1060 Saint-Gilles).',
      navigationTitle: 'Navigare',
      accessTitle: 'Adresă & Program',
      legalTitle: 'Informații Legale',
      mentionsLegales: 'Mențiuni legale (BCE / TVA)',
      privacy: 'Politică de confidențialitate (GDPR)',
      cookies: 'Politică de cookies',
      rights: 'Toate drepturile rezervate.',
    },
  },
};

export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale] ?? DICTIONARIES.fr;
}
