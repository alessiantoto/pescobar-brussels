// AUTO-GENERATED FROM OFFICIAL PESCOBAR BRUXELLES QR MENU (https://pescobaroctopus.com/pescobar-bruxelles-qr-menu/)
// Total Categories: 26 (15 Nourriture + 11 Boissons) | Total Verified Items: 185
import type { Locale } from '@/config/site';

export type MenuTag = 'boil' | 'octopus' | 'platter' | 'shrimp' | 'fish' | 'lunch' | 'featured';

export interface MenuCategory {
  id: string;
  type: 'food' | 'drink';
  names: Record<Locale, string>;
}

export interface MenuItemTranslation {
  name: string;
  description: string;
  nutrition?: string;
}

export interface MenuItem {
  id: string;
  postId: string;
  categoryId: string;
  type: 'food' | 'drink';
  priceEur: number;
  priceFormatted: string;
  isVerifiedPrice: boolean;
  weight: string;
  image: string | null;
  allergens: string[];
  tags: MenuTag[];
  translations: Record<Locale, MenuItemTranslation>;
}

export const MENU_CATEGORIES: MenuCategory[] = [
  {
    "id": "pescobar-seafood-boil",
    "type": "food",
    "names": {
      "fr": "Pescobar Seafood Boil",
      "en": "Pescobar Seafood Boil",
      "ro": "Pescobar Seafood Boil",
      "nl": "Pescobar Seafood Boil"
    }
  },
  {
    "id": "business-lunch",
    "type": "food",
    "names": {
      "fr": "Business Lunch",
      "en": "Business Lunch",
      "ro": "Business Lunch",
      "nl": "Business Lunch"
    }
  },
  {
    "id": "aperitifs",
    "type": "food",
    "names": {
      "fr": "Apéritifs",
      "en": "Appetizers",
      "ro": "Aperitive",
      "nl": "Voorgerechten"
    }
  },
  {
    "id": "delices-marins",
    "type": "food",
    "names": {
      "fr": "Délices marins",
      "en": "Seafood Snacks",
      "ro": "Gustări Marine",
      "nl": "Zeevruchten Snacks"
    }
  },
  {
    "id": "soupes",
    "type": "food",
    "names": {
      "fr": "Soupes",
      "en": "Soups",
      "ro": "Supe",
      "nl": "Soepen"
    }
  },
  {
    "id": "cuisine-avec-talent",
    "type": "food",
    "names": {
      "fr": "Cuisiné avec talent",
      "en": "Cooked with Talent",
      "ro": "Gătite cu talent",
      "nl": "Met Talent Bereid"
    }
  },
  {
    "id": "viande",
    "type": "food",
    "names": {
      "fr": "Viande",
      "en": "Meat",
      "ro": "Carne",
      "nl": "Vleesgerechten"
    }
  },
  {
    "id": "pates",
    "type": "food",
    "names": {
      "fr": "Pâtes",
      "en": "Pasta",
      "ro": "Paste",
      "nl": "Pasta"
    }
  },
  {
    "id": "la-pieuvre-de-pescobar",
    "type": "food",
    "names": {
      "fr": "La pieuvre de Pescobar",
      "en": "Pescobar's Octopus",
      "ro": "Caracatița lui Pescobar",
      "nl": "Pescobar's Octopus"
    }
  },
  {
    "id": "specialites",
    "type": "food",
    "names": {
      "fr": "Spécialités",
      "en": "Specialties",
      "ro": "Specialități",
      "nl": "Specialiteiten"
    }
  },
  {
    "id": "poisson",
    "type": "food",
    "names": {
      "fr": "Poisson",
      "en": "Fish",
      "ro": "Pește",
      "nl": "Visgerechten"
    }
  },
  {
    "id": "plateaux",
    "type": "food",
    "names": {
      "fr": "Plateaux",
      "en": "Platters",
      "ro": "Platouri",
      "nl": "Zeevruchtenschotels"
    }
  },
  {
    "id": "garniture",
    "type": "food",
    "names": {
      "fr": "Garniture",
      "en": "Sides",
      "ro": "Garnituri",
      "nl": "Bijgerechten"
    }
  },
  {
    "id": "sauces",
    "type": "food",
    "names": {
      "fr": "Sauces",
      "en": "Sauces",
      "ro": "Sosuri",
      "nl": "Sauzen"
    }
  },
  {
    "id": "dessert",
    "type": "food",
    "names": {
      "fr": "Dessert",
      "en": "Dessert",
      "ro": "Desert",
      "nl": "Desserts"
    }
  },
  {
    "id": "cafe-boissons-chaudes",
    "type": "drink",
    "names": {
      "fr": "Café & Boissons Chaudes",
      "en": "Coffee & Hot Drinks",
      "ro": "Cafea & Băuturi Calde",
      "nl": "Koffie & Warme Dranken"
    }
  },
  {
    "id": "boissons-gazeuses",
    "type": "drink",
    "names": {
      "fr": "Boissons Gazeuses",
      "en": "Soft Drinks",
      "ro": "Băuturi Răcoritoare",
      "nl": "Frisdranken"
    }
  },
  {
    "id": "boissons-naturelles",
    "type": "drink",
    "names": {
      "fr": "Boissons Naturelles",
      "en": "Natural Drinks",
      "ro": "Băuturi Naturale",
      "nl": "Huisgemaakte Limonades"
    }
  },
  {
    "id": "cocktails",
    "type": "drink",
    "names": {
      "fr": "Cocktails",
      "en": "Cocktails",
      "ro": "Cocktailuri",
      "nl": "Cocktails"
    }
  },
  {
    "id": "cocktails-sans-alcool",
    "type": "drink",
    "names": {
      "fr": "Cocktails sans alcool",
      "en": "Mocktails",
      "ro": "Cocktailuri fără alcool",
      "nl": "Mocktails (Alcoholvrij)"
    }
  },
  {
    "id": "boissons-fortes",
    "type": "drink",
    "names": {
      "fr": "Boissons Fortes",
      "en": "Spirits",
      "ro": "Băuturi Spirtoase",
      "nl": "Sterke Dranken"
    }
  },
  {
    "id": "gin-tonic",
    "type": "drink",
    "names": {
      "fr": "Gin & Tonic",
      "en": "Gin & Tonic",
      "ro": "Gin & Tonic",
      "nl": "Gin & Tonic"
    }
  },
  {
    "id": "vins",
    "type": "drink",
    "names": {
      "fr": "Vins",
      "en": "Wines",
      "ro": "Vinuri",
      "nl": "Wijnen"
    }
  },
  {
    "id": "cocktails-petillants",
    "type": "drink",
    "names": {
      "fr": "Cocktails Pétillants",
      "en": "Sparkling Cocktails",
      "ro": "Cocktailuri Spumante",
      "nl": "Sparkling Cocktails"
    }
  },
  {
    "id": "biere",
    "type": "drink",
    "names": {
      "fr": "Bière",
      "en": "Beer",
      "ro": "Bere",
      "nl": "Bieren"
    }
  },
  {
    "id": "mousseux",
    "type": "drink",
    "names": {
      "fr": "Mousseux",
      "en": "Sparkling & Champagne",
      "ro": "Spumante & Șampanie",
      "nl": "Schuimwijnen & Champagne"
    }
  }
];

export const MENU_ITEMS: MenuItem[] = [
  {
    "id": "pescobar-seafood-boil-3026",
    "postId": "3026",
    "categoryId": "pescobar-seafood-boil",
    "type": "food",
    "priceEur": 130,
    "priceFormatted": "130 €",
    "isVerifiedPrice": true,
    "weight": "",
    "image": "/images/catalog/seafood-boil-1.jpg",
    "allergens": [
      "Crustaceans",
      "Molluscs",
      "Fish",
      "Milk"
    ],
    "tags": [
      "boil",
      "platter",
      "featured"
    ],
    "translations": {
      "fr": {
        "name": "Plateau de fruits de mer Pescobar (5-6 personnes)",
        "description": "",
        "nutrition": ""
      },
      "nl": {
        "name": "Pescobar Seafood Boil Schotel (5–6 personen)",
        "description": "",
        "nutrition": ""
      },
      "en": {
        "name": "Pescobar Seafood Boil Platter (5-6 people)",
        "description": "",
        "nutrition": ""
      },
      "ro": {
        "name": "Platou Pescobar Seafood Boil (5-6 persoane)",
        "description": "",
        "nutrition": ""
      }
    }
  },
  {
    "id": "business-lunch-1678",
    "postId": "1678",
    "categoryId": "business-lunch",
    "type": "food",
    "priceEur": 19,
    "priceFormatted": "19 €",
    "isVerifiedPrice": true,
    "weight": "675g",
    "image": null,
    "allergens": [
      "Gluten",
      "Crustaceans",
      "Fish",
      "Soya",
      "Celery",
      "Molluscs"
    ],
    "tags": [
      "shrimp",
      "lunch"
    ],
    "translations": {
      "fr": {
        "name": "Business Lunch 1",
        "description": "Soupe aux Fruits de Mer + Fish & Chips. Soupe aux Fruits de Mer (400g): Sauce Tomate 180g, Moules 55g, Chair de Palourdes 50g, Crevettes 30g, Tomates Cerises 30g, Vin Blanc de Table 20ml, Sauce Végétale 10g, Oignon 5g, Céleri 5g, Huile d’Olive 5ml, Sauce Soja 5ml, Ail 3g, Poivre 1g, Sel 1g. Fish & Chips (275g): Filet de Cabillaud 140g, Pommes de Terre 100g, Citron 25g, Sauce Batter 5g (Bière, Eau Minérale, Farine, Poivre, Amidon, Sel), Farine 5g.",
        "nutrition": "Contains: (4E | 0,91 g sel | 1,69 g sucre)/100g."
      },
      "nl": {
        "name": "Business Lunch 1 (Zeevruchtensoep + Fish & Chips)",
        "description": "Zeevruchtensoep + Fish & Chips. Zeevruchtensoep (400g): Tomatensaus 180g, Mosselen 55g, Venusschelpenvlees 50g, Garnalen 30g, Kerstdrostomaatjes 30g, Table Witte Wijn 20ml, Vegetable Sauce 10g, Onion 5g, Celery 5g, Olijfolie 5ml, Soy Sauce 5ml, Knoflook 3g, Peper 1g, Zout 1g. Fish & Chips (275g): Kabeljauwfilet 140g, Aardappelen 100g, Citroen 25g, Batter Sauce 5g (Beer, Mineral Water, Flour, Peper, Starch, Zout), Flour 5g.",
        "nutrition": "Contains: (4E | 0.91g salt | 1.69g sugar)/100g."
      },
      "en": {
        "name": "Business Lunch 1",
        "description": "Seafood Soup + Fish & Chips. Seafood Soup (400g): Tomato Sauce 180g, Mussels 55g, Clam Meat 50g, Shrimp 30g, Cherry Tomatoes 30g, Table White Wine 20ml, Vegetable Sauce 10g, Onion 5g, Celery 5g, Olive Oil 5ml, Soy Sauce 5ml, Garlic 3g, Pepper 1g, Salt 1g. Fish & Chips (275g): Cod Fillet 140g, Potatoes 100g, Lemon 25g, Batter Sauce 5g (Beer, Mineral Water, Flour, Pepper, Starch, Salt), Flour 5g.",
        "nutrition": "Contains: (4E | 0.91g salt | 1.69g sugar)/100g."
      },
      "ro": {
        "name": "Business Lunch 1",
        "description": "Supa cu fructe de mare + Fish & Chips. Supa cu fructe de mare (400g): Sos de rosii 180g, Scoici 55g,Carne scoici 50g, Creveti 30g, Rosii cherry 30g, Vin alb de masa 20ml, Sos vegetal 10g, Ceapa 5g, Telina apio 5g, Ulei de masline 5ml, Sos soia 5ml, Usturoi 3g, Piper 1g, Sare 1g. Fish & Chips (275g): File de cod 140g, Cartofi 100 g, Lamaie 25g, Sos Batter 5g (Bere, Apă minerală, Făină, Piper, Amidon, Sare), Făină 5g.",
        "nutrition": "Conține: (4E | 0.91g sare | 1.69g zahar)/100g."
      }
    }
  },
  {
    "id": "business-lunch-1679",
    "postId": "1679",
    "categoryId": "business-lunch",
    "type": "food",
    "priceEur": 19,
    "priceFormatted": "19 €",
    "isVerifiedPrice": true,
    "weight": "670g",
    "image": null,
    "allergens": [
      "Gluten",
      "Crustaceans",
      "Fish",
      "Soya",
      "Milk",
      "Celery",
      "Molluscs"
    ],
    "tags": [
      "shrimp",
      "lunch"
    ],
    "translations": {
      "fr": {
        "name": "Business Lunch 2",
        "description": "Soupe de fruits de mer + Crevettes grillées avec riz. Soupe aux fruits de mer (400g) : Sauce tomate 180g, Moules 55g, Viande de palourdes 50g, Crevettes 30g, Tomates cerises 30g, Vin blanc de table 20ml, Sauce végétale 10g, Oignon 5g, Céleri branche 5g, Huile d’olive 5ml, Sauce soja 5ml, Ail 3g, Poivre 1g, Sel 1g. Crevettes grillées avec riz (270g) : Crevettes 145g, Riz 100g (Eau, Riz basmati, Sauce soja, Beurre, Curcuma, Poivre, Sel), Citron 25g.",
        "nutrition": "Contains: (3E | 0,21 g sel | 0,66 g sucre)/100g."
      },
      "nl": {
        "name": "Business Lunch 2 (Zeevruchtensoep + Gegrilde Garnalen & Rijst)",
        "description": "Zeevruchtensoep + Gegrilde Garnalen with Rice. Zeevruchtensoep (400g): Tomatensaus 180g, Mosselen 55g, Venusschelpenvlees 50g, Garnalen 30g, Kerstdrostomaatjes 30g, White table wine 20ml, Vegetable sauce 10g, Onion 5g, Celery stalk 5g, Olijfolie 5ml, Soy sauce 5ml, Knoflook 3g, Peper 1g, Zout 1g. Gegrilde Garnalen with rice (270g): Garnalen 145g, Rice 100g (Water, Basmati rice, Soy sauce, Boter, Turmeric, Peper, Zout), Citroen 25g.",
        "nutrition": "Contains: (3E | 0.21 g salt | 0.66 g sugar)/100g."
      },
      "en": {
        "name": "Business Lunch 2",
        "description": "Seafood Soup + Grilled Shrimps with Rice. Seafood soup (400g): Tomato sauce 180g, Mussels 55g, Clam meat 50g, Shrimp 30g, Cherry tomatoes 30g, White table wine 20ml, Vegetable sauce 10g, Onion 5g, Celery stalk 5g, Olive oil 5ml, Soy sauce 5ml, Garlic 3g, Pepper 1g, Salt 1g. Grilled shrimp with rice (270g): Shrimp 145g, Rice 100g (Water, Basmati rice, Soy sauce, Butter, Turmeric, Pepper, Salt), Lemon 25g.",
        "nutrition": "Contains: (3E | 0.21 g salt | 0.66 g sugar)/100g."
      },
      "ro": {
        "name": "Business Lunch 2",
        "description": "Supa cu fructe de mare + Creveti la gratar cu orez. Supa cu fructe de mare (400g): Sos de rosii 180g, Scoici 55g,Carne scoici 50g, Creveti 30g, Rosii cherry 30g, Vin alb de masa 20ml, Sos vegetal 10g, Ceapa 5g, Telina apio 5g, Ulei de masline 5ml, Sos soia 5ml, Usturoi 3g, Piper 1g, Sare 1g. Creveti la gratar cu orez (270g): Creveti 145g, Orez 100g (Apa, Orez basmati,Sos soia, Unt, Turmeric, Piper, Sare), Lamaie 25g.",
        "nutrition": "Conține: (3E | 0.21g sare | 0.66g zahar)/100g."
      }
    }
  },
  {
    "id": "business-lunch-1680",
    "postId": "1680",
    "categoryId": "business-lunch",
    "type": "food",
    "priceEur": 19,
    "priceFormatted": "19 €",
    "isVerifiedPrice": true,
    "weight": "720g",
    "image": null,
    "allergens": [
      "Gluten",
      "Crustaceans",
      "Fish",
      "Soya",
      "Milk",
      "Celery",
      "Molluscs"
    ],
    "tags": [
      "shrimp",
      "lunch"
    ],
    "translations": {
      "fr": {
        "name": "Business Lunch 3",
        "description": "Soupe de fruits de mer + Poêlée de fruits de mer. Soupe aux Fruits de Mer (400g): Sauce Tomate 180g, Moules 55g, Chair de Palourdes 50g, Crevettes 30g, Tomates Cerises 30g, Vin Blanc de Table 20ml, Sauce Végétale 10g, Oignon 5g, Céleri 5g, Huile d’Olive 5ml, Sauce Soja 5ml, Ail 3g, Poivre 1g, Sel 1g. Poêlée de Fruits de Mer (320g): Sauce Tomate 100g, Chair de Palourdes 75g, Moules 60g, Crevettes 30g, Tomates Cerises 30g, Huile d’Olive 15ml, Beurre 5g, Ail 4g, Sel 1g.",
        "nutrition": "Contains: (3E | 0,91 g sel | 0,62 g sucre)/100g."
      },
      "nl": {
        "name": "Business Lunch 3 (Zeevruchtensoep + Zeevruchtenpan)",
        "description": "Zeevruchtensoep + Seafood Skillet. Zeevruchtensoep (400g): Tomatensaus 180g, Mosselen 55g, Venusschelpenvlees 50g, Garnalen 30g, Kerstdrostomaatjes 30g, Table Witte Wijn 20ml, Vegetable Sauce 10g, Onion 5g, Celery 5g, Olijfolie 5ml, Soy Sauce 5ml, Knoflook 3g, Peper 1g, Zout 1g. Seafood Pan (320g): Tomatensaus 100g, Venusschelpenvlees 75g, Mosselen 60g, Garnalen 30g, Kerstdrostomaatjes 30g, Olijfolie 15ml, Boter 5g, Knoflook 4g, Zout 1g.",
        "nutrition": "Contains: (3E | 0.91 g salt | 0.62 g sugar)/100g."
      },
      "en": {
        "name": "Business Lunch 3",
        "description": "Seafood Soup + Seafood Skillet. Seafood Soup (400g): Tomato Sauce 180g, Mussels 55g, Clam Meat 50g, Shrimps 30g, Cherry Tomatoes 30g, Table White Wine 20ml, Vegetable Sauce 10g, Onion 5g, Celery 5g, Olive Oil 5ml, Soy Sauce 5ml, Garlic 3g, Pepper 1g, Salt 1g. Seafood Pan (320g): Tomato Sauce 100g, Clam Meat 75g, Mussels 60g, Shrimps 30g, Cherry Tomatoes 30g, Olive Oil 15ml, Butter 5g, Garlic 4g, Salt 1g.",
        "nutrition": "Contains: (3E | 0.91 g salt | 0.62 g sugar)/100g."
      },
      "ro": {
        "name": "Business Lunch 3",
        "description": "Supa cu fructe de mare + Tigaie cu fructe de mare. Supa cu fructe de mare (400g): Sos de rosii 180g, Scoici 55g, Carne scoici 50g, Creveti 30g, Rosii cherry 30g, Vin alb de masa 20ml, Sos vegetal 10g, Ceapa 5g, Telina apio 5g, Ulei de masline 5ml, Sos soia 5ml, Usturoi 3g, Piper 1g, Sare 1g. Tigaie fructe de mare (320g): Sos de rosii 100g, Carne scoici 75g, Scoici 60g, Creveti 30g, Rosii cherry 30 g, Ulei de masline 15ml, Unt 5g, Usturoi 4g, Sare 1g.",
        "nutrition": "Conține: (3E | 0.91g sare | 0.62g zahar)/100g."
      }
    }
  },
  {
    "id": "business-lunch-1681",
    "postId": "1681",
    "categoryId": "business-lunch",
    "type": "food",
    "priceEur": 19,
    "priceFormatted": "19 €",
    "isVerifiedPrice": true,
    "weight": "720g",
    "image": null,
    "allergens": [
      "Gluten",
      "Crustaceans",
      "Fish",
      "Soya",
      "Celery",
      "Molluscs"
    ],
    "tags": [
      "shrimp",
      "lunch"
    ],
    "translations": {
      "fr": {
        "name": "Business Lunch 4",
        "description": "Soupe de fruits de mer + Paella. Soupe aux Fruits de Mer (400g): Sauce Tomate 180g, Moules 55g, Chair de Palourdes 50g, Crevettes 30g, Tomates Cerises 30g, Vin Blanc de Table 20ml, Sauce Végétale 10g, Oignon 5g, Céleri 5g, Huile d’Olive 5ml, Sauce Soja 5ml, Ail 3g, Poivre 1g, Sel 1g. Paella aux Fruits de Mer (320g): Moules 65g, Crevettes 60g, Riz Arborio 50g, Chair de Palourdes 50g, Calamar 45g, Sauce Tomate 20g, Vin Blanc de Table 10ml, Oignon 10g, Huile d’Olive 5ml, Ail 3g, Curcuma 1g, Sel 0,5g, Poivre 0,5g.",
        "nutrition": "Contains: (4E | 0,91 g sel | 1,69 g sucre)/100g."
      },
      "nl": {
        "name": "Business Lunch 4 (Zeevruchtensoep + Zeevruchten Paella)",
        "description": "Zeevruchtensoep + Paella. Zeevruchtensoep (400g): Tomatensaus 180g, Mosselen 55g, Venusschelpenvlees 50g, Garnalen 30g, Kerstdrostomaatjes 30g, Table Witte Wijn 20ml, Vegetable Sauce 10g, Onion 5g, Celery 5g, Olijfolie 5ml, Soy Sauce 5ml, Knoflook 3g, Peper 1g, Zout 1g. Seafood Paella (320g): Mosselen 65g, Garnalen 60g, Arborio Rice 50g, Venusschelpenvlees 50g, Inktvis (Calamari) 45g, Tomatensaus 20g, Table Witte Wijn 10ml, Onion 10g, Olijfolie 5ml, Knoflook 3g, Turmeric 1g, Zout 0.5g, Peper 0.5g.",
        "nutrition": "Contains: (4E | 0.91 g salt | 1.69 g sugar)/100g."
      },
      "en": {
        "name": "Business Lunch 4",
        "description": "Seafood Soup + Paella. Seafood Soup (400g): Tomato Sauce 180g, Mussels 55g, Clam Meat 50g, Shrimps 30g, Cherry Tomatoes 30g, Table White Wine 20ml, Vegetable Sauce 10g, Onion 5g, Celery 5g, Olive Oil 5ml, Soy Sauce 5ml, Garlic 3g, Pepper 1g, Salt 1g. Seafood Paella (320g): Mussels 65g, Shrimps 60g, Arborio Rice 50g, Clam Meat 50g, Squid 45g, Tomato Sauce 20g, Table White Wine 10ml, Onion 10g, Olive Oil 5ml, Garlic 3g, Turmeric 1g, Salt 0.5g, Pepper 0.5g.",
        "nutrition": "Contains: (4E | 0.91 g salt | 1.69 g sugar)/100g."
      },
      "ro": {
        "name": "Business Lunch 4",
        "description": "Supa cu fructe de mare + Paella. Supa cu fructe de mare (400g): Sos de rosii 180g, Scoici 55g,Carne scoici 50g, Creveti 30g, Rosii cherry 30g, Vin alb de masa 20ml, Sos vegetal 10g, Ceapa 5g, Telina apio 5g, Ulei de masline 5ml, Sos soia 5ml, Usturoi 3g, Piper 1g, Sare 1g. Paella cu fructe de mare (320g): Scoici 65g, Creveți 60g, Orez arborio 50g, Carne de scoici 50g, Calamar 45g, Sos de roșii 20g, Vin alb de masă 10ml, Ceapă 10g, Ulei de măsline 5ml, Usturoi 3g, Turmeric 1g, Sare 0.5g, Piper 0.5g.",
        "nutrition": "Conține: (4E | 0.91g sare | 1.69g zahar)/100g."
      }
    }
  },
  {
    "id": "aperitifs-690",
    "postId": "690",
    "categoryId": "aperitifs",
    "type": "food",
    "priceEur": 88,
    "priceFormatted": "88 €",
    "isVerifiedPrice": true,
    "weight": "200g",
    "image": "/images/catalog/oysters-caviar-taverna-racilor.jpg",
    "allergens": [
      "Fish",
      "Molluscs"
    ],
    "tags": [
      "platter"
    ],
    "translations": {
      "fr": {
        "name": "Plateau Huîtres & Caviar",
        "description": "Huîtres royales 120 g, caviar 30 g, citron vert 50 g.",
        "nutrition": "Contains: (0 kcal | 0,02g de sel | 0,02g de sucre) / 100g."
      },
      "nl": {
        "name": "Oysters & Caviar Schotel",
        "description": "Royal oysters 120 g, caviar 30 g, lime 50 g.",
        "nutrition": "Contains: (0E | 0.02g salt | 0.02g sugar)/100g."
      },
      "en": {
        "name": "Oysters & Caviar Platter",
        "description": "Royal oysters 120 g, caviar 30 g, lime 50 g.",
        "nutrition": "Contains: (0E | 0.02g salt | 0.02g sugar)/100g."
      },
      "ro": {
        "name": "Platou Oysters & Caviar",
        "description": "Stridii Regale 120g, Caviar 30g, Lime50g.",
        "nutrition": "Conține: (0E | 0.02g sare | 0.02g zaharuri)/100g."
      }
    }
  },
  {
    "id": "aperitifs-705",
    "postId": "705",
    "categoryId": "aperitifs",
    "type": "food",
    "priceEur": 76,
    "priceFormatted": "76 €",
    "isVerifiedPrice": true,
    "weight": "130g",
    "image": null,
    "allergens": [
      "Gluten",
      "Fish",
      "Milk"
    ],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Caviar Royal",
        "description": "Pita grecque 75 g, caviar 30 g, beurre 25 g.",
        "nutrition": "Contains: (0 kcal | 0,5 g sel | 2,74 g sucres) / 100 g."
      },
      "nl": {
        "name": "Royal Caviar",
        "description": "Greek pita 75 g, caviar 30 g, Boter 25 g.",
        "nutrition": "Contains: (0E | 0.5g salt | 2.74g sugar)/100g."
      },
      "en": {
        "name": "Royal Caviar",
        "description": "Greek pita 75 g, caviar 30 g, butter 25 g.",
        "nutrition": "Contains: (0E | 0.5g salt | 2.74g sugar)/100g."
      },
      "ro": {
        "name": "Royal Caviar",
        "description": "Pita greceasca 75g, Caviar 30g, Unt 25g.",
        "nutrition": "Conține: (0E | 0.5g sare | 2.74g zaharuri)/100g."
      }
    }
  },
  {
    "id": "aperitifs-588",
    "postId": "588",
    "categoryId": "aperitifs",
    "type": "food",
    "priceEur": 60,
    "priceFormatted": "60 €",
    "isVerifiedPrice": true,
    "weight": "530g",
    "image": "/images/catalog/stridii-regale-gold-12buc.jpg",
    "allergens": [
      "Fish",
      "Sulfur dioxide and sulphites",
      "Molluscs"
    ],
    "tags": [
      "platter"
    ],
    "translations": {
      "fr": {
        "name": "Plateau d’huîtres royales \"Or\" Boutrais – 12 pièces",
        "description": "Huîtres royales 360 g, citron 120 g, vinaigre de cidre 35 g, oignon rouge 10 g, miel polyfloral 5 g.",
        "nutrition": "Contains: (0 kcal | 1,98g sel | 0,55g sucre) / 100g."
      },
      "nl": {
        "name": "Royal Oysters \"Gold\" Boutrais Schotel – 12 pcs",
        "description": "Royal oysters 360 g, Citroen 120 g, apple cider vinegar 35 g, red onion 10 g, polyfloral honey 5 g.",
        "nutrition": "Contains: (0 kcal | 1.98g salt | 0.55g sugar) / 100g."
      },
      "en": {
        "name": "Royal Oysters \"Gold\" Boutrais Platter – 12 pcs",
        "description": "Royal oysters 360 g, lemon 120 g, apple cider vinegar 35 g, red onion 10 g, polyfloral honey 5 g.",
        "nutrition": "Contains: (0 kcal | 1.98g salt | 0.55g sugar) / 100g."
      },
      "ro": {
        "name": "Stridii Regale \"Aur\" Boutrais Platou - 12 buc",
        "description": "Stridii Regale 360g, Lamaie 120g, Otet de mere 35g, Ceapa rosie 10g, Miere poliflora 5g.",
        "nutrition": "Conține: (0E | 1.98g sare | 0.55g zahar)/100g."
      }
    }
  },
  {
    "id": "aperitifs-587",
    "postId": "587",
    "categoryId": "aperitifs",
    "type": "food",
    "priceEur": 33,
    "priceFormatted": "33 €",
    "isVerifiedPrice": true,
    "weight": "290g",
    "image": "/images/catalog/stridii-regale-gold-6buc.jpg",
    "allergens": [
      "Fish",
      "Sulfur dioxide and sulphites",
      "Molluscs"
    ],
    "tags": [
      "platter"
    ],
    "translations": {
      "fr": {
        "name": "Plateau d’huîtres royales \"Or\" Boutrais – 6 pièces",
        "description": "Huîtres royales 180 g, citron 60 g, vinaigre de cidre 35 ml, oignon rouge 10 g, miel polyfloral 5 g.",
        "nutrition": "Contains: (0 kcal | 3,31g sel | 0,78g sucre) / 100g."
      },
      "nl": {
        "name": "Royal Oysters \"Gold\" Boutrais Schotel – 6 pcs",
        "description": "Royal oysters 180 g, Citroen 60 g, apple cider vinegar 35 ml, red onion 10 g, polyfloral honey 5 g.",
        "nutrition": "Contains: (0 kcal | 3.31g salt | 0.78g sugar) / 100g."
      },
      "en": {
        "name": "Royal Oysters \"Gold\" Boutrais Platter – 6 pcs",
        "description": "Royal oysters 180 g, lemon 60 g, apple cider vinegar 35 ml, red onion 10 g, polyfloral honey 5 g.",
        "nutrition": "Contains: (0 kcal | 3.31g salt | 0.78g sugar) / 100g."
      },
      "ro": {
        "name": "Stridii Regale \"Aur\" Boutrais Platou - 6 buc",
        "description": "Stridii Regale 180g, Lamaie 60g, Otet de mere 35ml, Ceapa rosie 10g, Miere poliflora 5g.",
        "nutrition": "Conține: (0E | 3.31g sare | 0.78g zahar)/100g."
      }
    }
  },
  {
    "id": "aperitifs-532",
    "postId": "532",
    "categoryId": "aperitifs",
    "type": "food",
    "priceEur": 17,
    "priceFormatted": "17 €",
    "isVerifiedPrice": true,
    "weight": "285g",
    "image": "/images/catalog/taverna-racilor-7.jpg",
    "allergens": [
      "Crustaceans",
      "Fish"
    ],
    "tags": [
      "shrimp"
    ],
    "translations": {
      "fr": {
        "name": "Salade d’œufs de carpe et de crevettes",
        "description": "Œufs de carpe 200 g (œufs de carpe, eau minérale, jus de citron frais, huile végétale), crevettes 50 g, citron 25 g, oignon rouge 10 g.",
        "nutrition": "Contains: (0 kcal | 0,34g sel | 0,46g sucre) / 100g."
      },
      "nl": {
        "name": "Carp Roe & Garnalen Salad",
        "description": "Carp roe 200 g (carp roe, mineral water, fresh Citroen juice, vegetable oil), Garnalen 50 g, Citroen 25 g, red onion 10 g.",
        "nutrition": "Contains: (0 kcal | 0.34g salt | 0.46g sugar) / 100g."
      },
      "en": {
        "name": "Carp Roe & Shrimp Salad",
        "description": "Carp roe 200 g (carp roe, mineral water, fresh lemon juice, vegetable oil), shrimp 50 g, lemon 25 g, red onion 10 g.",
        "nutrition": "Contains: (0 kcal | 0.34g salt | 0.46g sugar) / 100g."
      },
      "ro": {
        "name": "Salată de icre de crap & creveți",
        "description": "Icre crap 200g (Icre crap, ,Apa minerala, Fresh lamaie, Ulei Vegetal), Creveti 50 g, Lamaie 25g, Ceapa rosie 10g.",
        "nutrition": "Conține: (0E | 0.34g sare | 0.46g zahar)/100g."
      }
    }
  },
  {
    "id": "aperitifs-533",
    "postId": "533",
    "categoryId": "aperitifs",
    "type": "food",
    "priceEur": 16,
    "priceFormatted": "16 €",
    "isVerifiedPrice": true,
    "weight": "225g",
    "image": "/images/catalog/taverna-racilor-10.jpg",
    "allergens": [
      "Crustaceans",
      "Fish"
    ],
    "tags": [
      "shrimp"
    ],
    "translations": {
      "fr": {
        "name": "Houmous aux crevettes",
        "description": "Houmous 150 g (pois chiches, tahini, huile d’olive, ail, jus de citron frais, paprika, sel), crevettes 50 g, citron 25 g.",
        "nutrition": "Contains: (0 kcal | 0,98g sel | 10,02g sucre) / 100g."
      },
      "nl": {
        "name": "Hummus with Garnalen",
        "description": "Hummus 150 g (chickpeas, tahini, Olijfolie, Knoflook, fresh Citroen juice, paprika, Zout), Garnalen 50 g, Citroen 25 g.",
        "nutrition": "Contains: (0 kcal | 0.98g salt | 10.02g sugar) / 100g."
      },
      "en": {
        "name": "Hummus with Shrimp",
        "description": "Hummus 150 g (chickpeas, tahini, olive oil, garlic, fresh lemon juice, paprika, salt), shrimp 50 g, lemon 25 g.",
        "nutrition": "Contains: (0 kcal | 0.98g salt | 10.02g sugar) / 100g."
      },
      "ro": {
        "name": "Humus cu creveți",
        "description": "Hummus 150g (Naut, Pasta de susan, Ulei de masline, Usturoi, Fresh de lamaie, Boia de ardei, Sare), Creveti 50g, Lamaie 25g.",
        "nutrition": "Conține: (0E | 0.98g sare | 10.02g zahar)/100g."
      }
    }
  },
  {
    "id": "aperitifs-534",
    "postId": "534",
    "categoryId": "aperitifs",
    "type": "food",
    "priceEur": 16.5,
    "priceFormatted": "16,5 €",
    "isVerifiedPrice": true,
    "weight": "200g",
    "image": "/images/catalog/taverna-racilor-12.jpg",
    "allergens": [
      "Fish",
      "Molluscs"
    ],
    "tags": [
      "octopus"
    ],
    "translations": {
      "fr": {
        "name": "Houmous à la pieuvre",
        "description": "Houmous 150 g (pois chiches, tahini, huile d’olive, ail, jus de citron frais, paprika, sel), poulpe 25 g, citron 25 g.",
        "nutrition": "Contains: (0 kcal | 0,63g sel | 8,97g sucre) / 100g."
      },
      "nl": {
        "name": "Hummus met Gegrilde Octopus",
        "description": "Hummus 150 g (chickpeas, tahini, Olijfolie, Knoflook, fresh Citroen juice, paprika, Zout), Octopus 25 g, Citroen 25 g.",
        "nutrition": "Contains: (0 kcal | 0.63g salt | 8.97g sugar) / 100g."
      },
      "en": {
        "name": "Hummus with Octopus",
        "description": "Hummus 150 g (chickpeas, tahini, olive oil, garlic, fresh lemon juice, paprika, salt), octopus 25 g, lemon 25 g.",
        "nutrition": "Contains: (0 kcal | 0.63g salt | 8.97g sugar) / 100g."
      },
      "ro": {
        "name": "Humus cu caracatiță",
        "description": "Hummus 150g (Naut, Pasta de susan, Ulei de masline, Usturoi, Fresh de lamaie, Boia de ardei, Sare), Caracatita 25 g, Lamaie 25g.",
        "nutrition": "Conține: (0E | 0.63g sare | 8.97g zahar)/100g."
      }
    }
  },
  {
    "id": "aperitifs-531",
    "postId": "531",
    "categoryId": "aperitifs",
    "type": "food",
    "priceEur": 13,
    "priceFormatted": "13 €",
    "isVerifiedPrice": true,
    "weight": "235g",
    "image": "/images/catalog/taverna-racilor-6.jpg",
    "allergens": [
      "Fish"
    ],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Salade de œufs de carpe",
        "description": "Œufs de carpe 200 g (œufs de carpe, eau minérale, jus de citron frais, huile végétale), citron 25 g, oignon rouge 10 g.",
        "nutrition": "Contains: (0 kcal | 0,07g sel | 0,29g sucre) / 100g."
      },
      "nl": {
        "name": "Carp Roe Salad",
        "description": "Carp roe 200 g (carp roe, mineral water, fresh Citroen juice, vegetable oil), Citroen 25 g, red onion 10 g.",
        "nutrition": "Contains: (0 kcal | 0.07g salt | 0.29g sugar) / 100g."
      },
      "en": {
        "name": "Carp Roe Salad",
        "description": "Carp roe 200 g (carp roe, mineral water, fresh lemon juice, vegetable oil), lemon 25 g, red onion 10 g.",
        "nutrition": "Contains: (0 kcal | 0.07g salt | 0.29g sugar) / 100g."
      },
      "ro": {
        "name": "Salată de icre de crap",
        "description": "Icre crap 200g (Icre crap, ,Apa minerala, Fresh lamaie, Ulei Vegetal), Lamaie 25 g, Ceapa rosie 10g.",
        "nutrition": "Conține: (0E | 0.07g sare | 0.29g zahar)/100g."
      }
    }
  },
  {
    "id": "delices-marins-540",
    "postId": "540",
    "categoryId": "delices-marins",
    "type": "food",
    "priceEur": 25,
    "priceFormatted": "25 €",
    "isVerifiedPrice": true,
    "weight": "550g",
    "image": "/images/catalog/taverna-racilor-60.jpg",
    "allergens": [
      "Gluten",
      "Crustaceans",
      "Egg",
      "Fish",
      "Milk",
      "Molluscs"
    ],
    "tags": [
      "shrimp",
      "fish",
      "featured"
    ],
    "translations": {
      "fr": {
        "name": "Fritto Misto",
        "description": "Comprend une sauce Spécial by Pescobar offerte. Calmar 120g, Crevettes 120g, Viande de palourdes 100g, Sauce panure 60g (Œuf, Lait, Farine, Huile de tournesol, Amidon, Poivre, Sel), Filet de cabillaud 50g, Sauce aioli 50g (Yaourt, Ail, Jus de citron frais, Sel), Citron 25g, Farine 25g.",
        "nutrition": "Contains: (0E | 0,77g de sel | 1,01g de sucre) / 100g."
      },
      "nl": {
        "name": "Fritto Misto",
        "description": "Includes a Special by Pescobar sauce on the house. Inktvis (Calamari) 120g, Garnalen 120g, Venusschelpenvlees 100g, Batter sauce 60g (Egg, Milk, Flour, Sunflower oil, Starch, Peper, Zout), Kabeljauwfilet 50g, Aioli sauce 50g (Yogurt, Knoflook, Fresh Citroen juice, Zout), Citroen 25g, Flour 25g.",
        "nutrition": "Contains: (0E | 0.77g salt | 1.01g sugar) / 100g."
      },
      "en": {
        "name": "Fritto Misto",
        "description": "Includes a Special by Pescobar sauce on the house. Squid 120g, Shrimp 120g, Clam meat 100g, Batter sauce 60g (Egg, Milk, Flour, Sunflower oil, Starch, Pepper, Salt), Cod fillet 50g, Aioli sauce 50g (Yogurt, Garlic, Fresh lemon juice, Salt), Lemon 25g, Flour 25g.",
        "nutrition": "Contains: (0E | 0.77g salt | 1.01g sugar) / 100g."
      },
      "ro": {
        "name": "Fritto Misto",
        "description": "Contine un Sos special by Pescobar din partea casei. Calamar 120 g, Creveti 120g,Carne scoica 100g, Sos paneuri 60 g(Ou, Lapte, Faina, Ulei de floarea soarelui, Amidon, Piper, Sare), File de cod 50g, Sos aioli 50 g (Iaurt, Usturoi, Fresh de lamaie, Sare), Lamaie 25g, Faina 25g.",
        "nutrition": "Conține: (0E | 0.77g sare | 1.01g zahar)/100g."
      }
    }
  },
  {
    "id": "delices-marins-536",
    "postId": "536",
    "categoryId": "delices-marins",
    "type": "food",
    "priceEur": 22,
    "priceFormatted": "22 €",
    "isVerifiedPrice": true,
    "weight": "500g",
    "image": "/images/catalog/taverna-racilor-41.jpg",
    "allergens": [
      "Gluten",
      "Crustaceans",
      "Egg",
      "Fish",
      "Milk"
    ],
    "tags": [
      "shrimp",
      "fish"
    ],
    "translations": {
      "fr": {
        "name": "Grosses crevettes 30/40 sur lit de pommes de terre (12 pièces)",
        "description": "Comprend une sauce Spécial by Pescobar offerte. Crevettes 220g, Pommes de terre 180g, Sauce aioli 50g (Yaourt, Ail, Jus de citron frais, Sel), Citron 25g, Sauce panure 15g (Œuf, Lait, Farine, Huile de tournesol, Amidon, Poivre), Farine 10g.",
        "nutrition": "Contains: (0E | 0,71g de sel | 0,41g de sucre) / 100g."
      },
      "nl": {
        "name": "Large Garnalen 30/40 on a Bed of Aardappelen (12 pcs)",
        "description": "Contine un Sos special by Pescobar din partea casei. Creveți 220g, Cartofi 180g, Sos aioli 50g (Iaurt, Usturoi, Fresh de lămâie, Sare), Lămâie 25g, Sos paneuri 15g (Ou, Lapte, Făină, Ulei de floarea-soarelui, Amidon, Piper), Făină 10g.",
        "nutrition": "Contains: (0E | 0.71g salt | 0.41g sugar) / 100g."
      },
      "en": {
        "name": "Large Shrimps 30/40 on a Bed of Potatoes (12 pcs)",
        "description": "Contine un Sos special by Pescobar din partea casei. Creveți 220g, Cartofi 180g, Sos aioli 50g (Iaurt, Usturoi, Fresh de lămâie, Sare), Lămâie 25g, Sos paneuri 15g (Ou, Lapte, Făină, Ulei de floarea-soarelui, Amidon, Piper), Făină 10g.",
        "nutrition": "Contains: (0E | 0.71g salt | 0.41g sugar) / 100g."
      },
      "ro": {
        "name": "Creveți pe pat de cartofi (12 buc)",
        "description": "Includes a complimentary Special Sauce by Pescobar. Creveti 220g, Cartofi 180g, Sos aioli 50g (Iaurt, Usturoi, Fresh de lamaie, Sare), Lamaie 25g, Sos paneuri 15g (Ou, Lapte, Faina, Ulei floarea soarelui, Amidon, Piper), Faina 10g.",
        "nutrition": "Conține: (0E | 0.71g sare | 0.41g zahar)/100g."
      }
    }
  },
  {
    "id": "delices-marins-539",
    "postId": "539",
    "categoryId": "delices-marins",
    "type": "food",
    "priceEur": 22,
    "priceFormatted": "22 €",
    "isVerifiedPrice": true,
    "weight": "470g",
    "image": "/images/catalog/taverna-racilor-62.jpg",
    "allergens": [
      "Gluten",
      "Egg",
      "Fish",
      "Milk",
      "Molluscs"
    ],
    "tags": [
      "fish"
    ],
    "translations": {
      "fr": {
        "name": "Calamar pané sur lit de pommes de terre",
        "description": "Comprend une sauce Spécial by Pescobar offerte. Calmar 180g, Pommes de terre 180g, Sauce aioli 50g (Yaourt, Ail, Sel, Jus de citron frais), Citron 25g, Farine 20g, Sauce panure 15g (Œuf, Lait, Farine, Huile de tournesol, Amidon, Poivre, Sel).",
        "nutrition": "Contains: (0E | 0,23g de sel | 0,6g de sucre) / 100g."
      },
      "nl": {
        "name": "Gepaneerde Inktvis (Calamari) on a Bed of Aardappelen",
        "description": "Includes a Special by Pescobar sauce on the house. Inktvis (Calamari) 180g, Aardappelen 180g, Aioli sauce 50g (Yogurt, Knoflook, Zout, Fresh Citroen juice), Citroen 25g, Flour 20g, Batter sauce 15g (Egg, Milk, Flour, Sunflower oil, Starch, Peper, Zout).",
        "nutrition": "Contains: (0E | 0.23g salt | 0.6g sugar) / 100g."
      },
      "en": {
        "name": "Breaded Squid on a Bed of Potatoes",
        "description": "Includes a Special by Pescobar sauce on the house. Squid 180g, Potatoes 180g, Aioli sauce 50g (Yogurt, Garlic, Salt, Fresh lemon juice), Lemon 25g, Flour 20g, Batter sauce 15g (Egg, Milk, Flour, Sunflower oil, Starch, Pepper, Salt).",
        "nutrition": "Contains: (0E | 0.23g salt | 0.6g sugar) / 100g."
      },
      "ro": {
        "name": "Calamar pane pe pat de cartofi",
        "description": "Contine un Sos special by Pescobar din partea casei. Calamar 180g, Cartofi 180g, Sos Aioli 50g (Iaurt, Usturoi, Sare, Fresh de lamaie), Lamaie 25g, Faina 20g, Sos paneuri 15g (Ou, Lapte, Faina, Ulei floarea soarelui, Amidon, Piper, Sare).",
        "nutrition": "Conține: (0E | 0.23g sare | 0.6g zahar)/100g."
      }
    }
  },
  {
    "id": "delices-marins-538",
    "postId": "538",
    "categoryId": "delices-marins",
    "type": "food",
    "priceEur": 21,
    "priceFormatted": "21 €",
    "isVerifiedPrice": true,
    "weight": "340g",
    "image": "/images/catalog/creveti-panko-taverna-racilor.jpg",
    "allergens": [
      "Gluten",
      "Crustaceans",
      "Egg",
      "Fish",
      "Milk"
    ],
    "tags": [
      "shrimp",
      "fish"
    ],
    "translations": {
      "fr": {
        "name": "Grosses crevettes panées PANKO (12 pièces)",
        "description": "Comprend une sauce Spécial by Pescobar offerte. Crevettes 220g, Sauce aioli 50g (Yaourt, Ail, Sel, Jus de citron frais), Citron 25g, Chapelure Panko 20g, Farine 15g, Sauce panure 10g (Œuf, Lait, Farine, Huile de tournesol, Amidon, Poivre, Sel).",
        "nutrition": "Contains: (2E | 0,82g de sel | 1,57g de sucre) / 100g."
      },
      "nl": {
        "name": "Panko-Gepaneerde Garnalen (12 pcs)",
        "description": "Includes a Special by Pescobar sauce on the house. Garnalen 220g, Aioli sauce 50g (Yogurt, Knoflook, Zout, Fresh Citroen juice), Citroen 25g, Panko breadcrumbs 20g, Flour 15g, Batter sauce 10g (Egg, Milk, Flour, Sunflower oil, Starch, Peper, Zout).",
        "nutrition": "Contains: (2E | 0.82g salt | 1.57g sugar) / 100g."
      },
      "en": {
        "name": "Panko-Breaded Shrimps (12 pcs)",
        "description": "Includes a Special by Pescobar sauce on the house. Shrimp 220g, Aioli sauce 50g (Yogurt, Garlic, Salt, Fresh lemon juice), Lemon 25g, Panko breadcrumbs 20g, Flour 15g, Batter sauce 10g (Egg, Milk, Flour, Sunflower oil, Starch, Pepper, Salt).",
        "nutrition": "Contains: (2E | 0.82g salt | 1.57g sugar) / 100g."
      },
      "ro": {
        "name": "Creveți pane PANKO (12 buc)",
        "description": "Contine un Sos special by Pescobar din partea casei. Creveti 220g, Sos Aioli 50g (Iaurt, Usturoi, Sare, Fresh de lamaie), Lamaie 25g, Pesmet Panko 20g, Faina 15g, Sos paneuri 10g(Ou, Lapte, Faina, Ulei floarea soarelui, Amidon, Piper, Sare).",
        "nutrition": "Conține: (2E | 0.82g sare | 1.57g zahar)/100g."
      }
    }
  },
  {
    "id": "delices-marins-541",
    "postId": "541",
    "categoryId": "delices-marins",
    "type": "food",
    "priceEur": 20,
    "priceFormatted": "20 €",
    "isVerifiedPrice": true,
    "weight": "320g",
    "image": "/images/catalog/pui-de-balta-taverna-racilor.jpg",
    "allergens": [
      "Gluten",
      "Egg",
      "Fish",
      "Milk"
    ],
    "tags": [
      "fish"
    ],
    "translations": {
      "fr": {
        "name": "Cuisses de grenouille panées",
        "description": "Comprend une sauce Spécial by Pescobar offerte. Cuisses de grenouille 220g, Sauce aioli 50g (Yaourt, Ail, Jus de citron frais, Sel), Citron 25g, Sauce panure 15g, Farine 10g (Œuf, Lait, Farine, Huile de tournesol, Amidon, Poivre, Sel).",
        "nutrition": "Contains: (0E | 0,4g de sel | 1,24g de sucre) / 100g."
      },
      "nl": {
        "name": "Gepaneerde Kikkerbilletjes",
        "description": "Includes a Special by Pescobar sauce on the house. Kikkerbilletjes 220g, Aioli sauce 50g (Yogurt, Knoflook, Fresh Citroen juice, Zout), Citroen 25g, Batter sauce 15g, Flour 10g (Egg, Milk, Flour, Sunflower oil, Starch, Peper, Zout).",
        "nutrition": "Contains: (0E | 0.4g salt | 1.24g sugar) / 100g."
      },
      "en": {
        "name": "Breaded Frog Legs",
        "description": "Includes a Special by Pescobar sauce on the house. Frog legs 220g, Aioli sauce 50g (Yogurt, Garlic, Fresh lemon juice, Salt), Lemon 25g, Batter sauce 15g, Flour 10g (Egg, Milk, Flour, Sunflower oil, Starch, Pepper, Salt).",
        "nutrition": "Contains: (0E | 0.4g salt | 1.24g sugar) / 100g."
      },
      "ro": {
        "name": "Pui de baltă pane",
        "description": "Contine un Sos special by Pescobar din partea casei. Pui de balta 220g, Sos aioli 50g (Iaurt, Usturoi, Fresh de lamaie, Sare), Lamaie 25g, Sos paneuri 15g, Faina 10g, (Ou, Lapte, Faina, Ulei floarea soarelui, Amidon, Piper, Sare).",
        "nutrition": "Conține: (0E | 0.4g sare | 1.24g zahar)/100g."
      }
    }
  },
  {
    "id": "delices-marins-542",
    "postId": "542",
    "categoryId": "delices-marins",
    "type": "food",
    "priceEur": 19,
    "priceFormatted": "19 €",
    "isVerifiedPrice": true,
    "weight": "550g",
    "image": "/images/catalog/taverna-racilor-57.jpg",
    "allergens": [
      "Gluten",
      "Fish",
      "Milk"
    ],
    "tags": [
      "fish"
    ],
    "translations": {
      "fr": {
        "name": "Fish & Chips",
        "description": "Comprend une sauce Spécial by Pescobar offerte. Filet de cabillaud 280g, Pommes de terre 200g, Sauce aioli 50g (Yaourt, Ail, Jus de citron frais, Sel), Sauce Batter 10g (Bière, Eau gazeuse, Farine, Poivre, Amidon, Sel 0), Farine 10g.",
        "nutrition": "Contains: (0E | 0,01g de sel | 0,01g de sucre) / 100g."
      },
      "nl": {
        "name": "Fish & Chips",
        "description": "Includes a Special by Pescobar sauce on the house. Kabeljauwfilet 280g, Aardappelen 200g, Aioli sauce 50g (Yogurt, Knoflook, Fresh Citroen juice, Zout), Batter sauce 10g (Beer, Sparkling water, Flour, Peper, Starch, Zout 0), Flour 10g.",
        "nutrition": "Contains: (0E | 0.01g salt | 0.01g sugar) / 100g."
      },
      "en": {
        "name": "Fish & Chips",
        "description": "Includes a Special by Pescobar sauce on the house. Cod fillet 280g, Potatoes 200g, Aioli sauce 50g (Yogurt, Garlic, Fresh lemon juice, Salt), Batter sauce 10g (Beer, Sparkling water, Flour, Pepper, Starch, Salt 0), Flour 10g.",
        "nutrition": "Contains: (0E | 0.01g salt | 0.01g sugar) / 100g."
      },
      "ro": {
        "name": "Fish & Chips",
        "description": "Contine un Sos special by Pescobar din partea casei. File de cod 280g, Cartofi 200g, Sos aioli 50 g (Iaurt, Usturoi, Fresh de lamaie, Sare), Sos Batter 10g(Bere, Apa minerala, Faina, Piper, Amidon, Sare 0), Faina 10g.",
        "nutrition": "Conține: (0E | 0.01g sare | 0.01g zahar)/100g."
      }
    }
  },
  {
    "id": "delices-marins-535",
    "postId": "535",
    "categoryId": "delices-marins",
    "type": "food",
    "priceEur": 19,
    "priceFormatted": "19 €",
    "isVerifiedPrice": true,
    "weight": "300g",
    "image": "/images/catalog/carne-scoica-pane-taverna-racilor.jpg",
    "allergens": [
      "Gluten",
      "Egg",
      "Milk",
      "Molluscs"
    ],
    "tags": [
      "fish"
    ],
    "translations": {
      "fr": {
        "name": "Chaire de moules panée",
        "description": "Comprend une sauce Spécial by Pescobar offerte. Viande de palourdes 200g, Sauce aioli 50g (Yaourt, Ail, Sel, Jus de citron frais), Citron 25g, Farine 15g, Sauce panure 10g (Œuf, Lait, Farine, Huile de tournesol, Amidon, Poivre, Sel).",
        "nutrition": "Contains: (0E | 0,38g de sel | 1,15g de sucre) / 100g."
      },
      "nl": {
        "name": "Gepaneerde Mosselen Meat",
        "description": "Includes a Special by Pescobar sauce on the house. Venusschelpenvlees 200g, Aioli sauce 50g (Yogurt, Knoflook, Zout, Fresh Citroen juice), Citroen 25g, Flour 15g, Batter sauce 10g (Egg, Milk, Flour, Sunflower oil, Starch, Peper, Zout).",
        "nutrition": "Contains: (0E | 0.38g salt | 1.15g sugar) / 100g."
      },
      "en": {
        "name": "Breaded Mussels Meat",
        "description": "Includes a Special by Pescobar sauce on the house. Clam meat 200g, Aioli sauce 50g (Yogurt, Garlic, Salt, Fresh lemon juice), Lemon 25g, Flour 15g, Batter sauce 10g (Egg, Milk, Flour, Sunflower oil, Starch, Pepper, Salt).",
        "nutrition": "Contains: (0E | 0.38g salt | 1.15g sugar) / 100g."
      },
      "ro": {
        "name": "Carne de scoică pane",
        "description": "Contine un Sos special by Pescobar din partea casei. Carne de scoica 200g, Sos Aioli 50g (Iaurt, Usturoi, Sare, Fresh de lamaie), Lamaie 25g, Faina 15g, Sos paneuri 10g (Ou, Lapte, Faina, Ulei floarea soarelui, Amidon, Piper, Sare).",
        "nutrition": "Conține: (0E | 0.38g sare | 1.15g zahar)/100g."
      }
    }
  },
  {
    "id": "delices-marins-537",
    "postId": "537",
    "categoryId": "delices-marins",
    "type": "food",
    "priceEur": 19,
    "priceFormatted": "19 €",
    "isVerifiedPrice": true,
    "weight": "280g",
    "image": "/images/catalog/taverna-racilor-63.jpg",
    "allergens": [
      "Gluten",
      "Egg",
      "Fish",
      "Milk",
      "Molluscs"
    ],
    "tags": [
      "fish"
    ],
    "translations": {
      "fr": {
        "name": "Calamar pané",
        "description": "Comprend une sauce Spécial by Pescobar offerte. Calmar 180g, Sauce aioli 50g (Yaourt 45g, Ail 3g, Sel 1g, Jus de citron frais 1ml), Citron 25g, Farine 20g, Sauce panure 15g (Œuf, Lait, Farine, Huile de tournesol, Amidon, Poivre, Sel).",
        "nutrition": "Contains: (0E | 0,35g de sel | 1,12g de sucre) / 100g."
      },
      "nl": {
        "name": "Gepaneerde Inktvis (Calamari)",
        "description": "Includes a Special by Pescobar sauce on the house. Inktvis (Calamari) 180g, Aioli sauce 50g (Yogurt 45g, Knoflook 3g, Zout 1g, Fresh Citroen juice 1ml), Citroen 25g, Flour 20g, Batter sauce 15g (Egg, Milk, Flour, Sunflower oil, Starch, Peper, Zout).",
        "nutrition": "Contains: (0E | 0.35g salt | 1.12g sugar) / 100g."
      },
      "en": {
        "name": "Breaded Squid",
        "description": "Includes a Special by Pescobar sauce on the house. Squid 180g, Aioli sauce 50g (Yogurt 45g, Garlic 3g, Salt 1g, Fresh lemon juice 1ml), Lemon 25g, Flour 20g, Batter sauce 15g (Egg, Milk, Flour, Sunflower oil, Starch, Pepper, Salt).",
        "nutrition": "Contains: (0E | 0.35g salt | 1.12g sugar) / 100g."
      },
      "ro": {
        "name": "Calamar pane",
        "description": "Contine un Sos special by Pescobar din partea casei. Calamar 180g, Sos Aioli 50g (Iaurt 45g, Usturoi 3g, Sare 1g, Fresh de lamaie 1ml), Lamaie 25g, Faina 20g, Sos paneuri 15g(Ou, Lapte, Faina, Ulei floarea soarelui, Amidon, Piper, Sare).",
        "nutrition": "Conține: (0E | 0.35g sare | 1.12g zahar)/100g."
      }
    }
  },
  {
    "id": "delices-marins-586",
    "postId": "586",
    "categoryId": "delices-marins",
    "type": "food",
    "priceEur": 17,
    "priceFormatted": "17 €",
    "isVerifiedPrice": true,
    "weight": "150g",
    "image": "/images/catalog/creveti-crispy-popcorn.jpg",
    "allergens": [
      "Gluten",
      "Crustaceans",
      "Egg",
      "Fish",
      "Milk",
      "Mustard"
    ],
    "tags": [
      "shrimp",
      "fish"
    ],
    "translations": {
      "fr": {
        "name": "Crevettes \" Crispy Popcorn \"",
        "description": "Crevettes 90g, Mayonnaise 25g, Sweet chilli 15g, Sauce panure 10g (Œuf, Lait, Farine, Huile de tournesol, Amidon, Poivre, Sel), Farine 8g, Ciboulette 2g.",
        "nutrition": "Contains: (4E | 0,22g de sel | 0,46g de sucre) / 100g."
      },
      "nl": {
        "name": "“Crispy Popcorn” Garnalen",
        "description": "Garnalen 90g, Mayonnaise 25g, Sweet chilli 15g, Batter sauce 10g (Egg, Milk, Flour, Sunflower oil, Starch, Peper, Zout), Flour 8g, Chives 2g.",
        "nutrition": "Contains: (4E | 0.22g salt | 0.46g sugar) / 100g."
      },
      "en": {
        "name": "“Crispy Popcorn” Shrimps",
        "description": "Shrimp 90g, Mayonnaise 25g, Sweet chilli 15g, Batter sauce 10g (Egg, Milk, Flour, Sunflower oil, Starch, Pepper, Salt), Flour 8g, Chives 2g.",
        "nutrition": "Contains: (4E | 0.22g salt | 0.46g sugar) / 100g."
      },
      "ro": {
        "name": "Creveți \"Crispy Popcorn\"",
        "description": "Creveti 90g, Maioneza 25g, Sweet chilli 15g, Sos paneuri 10g (Ou, Lapte, Faina, Ulei floarea soarelui, Amidon, Piper, Sare), Faina 8g, Chives 2g.",
        "nutrition": "Conține: (4E | 0.22g sare | 0.46g zahar)/100g."
      }
    }
  },
  {
    "id": "delices-marins-543",
    "postId": "543",
    "categoryId": "delices-marins",
    "type": "food",
    "priceEur": 14,
    "priceFormatted": "14 €",
    "isVerifiedPrice": true,
    "weight": "250g",
    "image": "/images/catalog/taverna-racilor-15.jpg",
    "allergens": [
      "Gluten",
      "Fish"
    ],
    "tags": [
      "fish"
    ],
    "translations": {
      "fr": {
        "name": "Anchois de la Mer Noire",
        "description": "Anchois 210g, Citron 25g, Farine 12g, Sel 3g.",
        "nutrition": "Contains: (0E | 0g de sel | 0,74g de sucre) / 100g."
      },
      "nl": {
        "name": "Black Sea Anchovy",
        "description": "Anchovy 210g, Citroen 25g, Flour 12g, Zout 3g.",
        "nutrition": "Contains: (0E | 0g salt | 0.74g sugar) / 100g."
      },
      "en": {
        "name": "Black Sea Anchovy",
        "description": "Anchovy 210g, Lemon 25g, Flour 12g, Salt 3g.",
        "nutrition": "Contains: (0E | 0g salt | 0.74g sugar) / 100g."
      },
      "ro": {
        "name": "Hamsie Marea Neagră",
        "description": "Hamsie 210g, Lamaie 25g, Faina 12g Sare 3g.",
        "nutrition": "Conține: (0E | 0g sare | 0.74g zahar)/100g."
      }
    }
  },
  {
    "id": "soupes-1677",
    "postId": "1677",
    "categoryId": "soupes",
    "type": "food",
    "priceEur": 15,
    "priceFormatted": "15 €",
    "isVerifiedPrice": true,
    "weight": "450g",
    "image": "/images/catalog/supa-fructe-de-mare-taverna-racilor.jpg",
    "allergens": [
      "Gluten",
      "Crustaceans",
      "Fish",
      "Soya",
      "Celery",
      "Molluscs"
    ],
    "tags": [
      "shrimp"
    ],
    "translations": {
      "fr": {
        "name": "Soupe de fruits de mer",
        "description": "Sauce tomate 180g, Moules 60g, Viande de palourdes 50g, Calmar 45g, Crevettes 30g, Tomates cerises 30g, Vin blanc de table 20ml, Sauce végétale 10g, Oignon 5g, Céleri branche 5g, Huile d’olive 5ml, Sauce soja 5ml, Ail 3g, Poivre 1g, Sel 1g.",
        "nutrition": "Contains: (3E | 0,81 g sel | 0,73 g sucre)/100g."
      },
      "nl": {
        "name": "Zeevruchtensoep",
        "description": "Tomatensaus 180g, Mosselen 60g, Venusschelpenvlees 50g, Inktvis (Calamari) 45g, Garnalen 30g, Kerstdrostomaatjes 30g, White table wine 20ml, Vegetable sauce 10g, Onion 5g, Celery stalk 5g, Olijfolie 5ml, Soy sauce 5ml, Knoflook 3g, Peper 1g, Zout 1g.",
        "nutrition": "Contains: (3E | 0.81g salt | 0.73g sugar)/100g."
      },
      "en": {
        "name": "Seafood Soup",
        "description": "Tomato sauce 180g, Mussels 60g, Clam meat 50g, Squid 45g, Shrimp 30g, Cherry tomatoes 30g, White table wine 20ml, Vegetable sauce 10g, Onion 5g, Celery stalk 5g, Olive oil 5ml, Soy sauce 5ml, Garlic 3g, Pepper 1g, Salt 1g.",
        "nutrition": "Contains: (3E | 0.81g salt | 0.73g sugar)/100g."
      },
      "ro": {
        "name": "Supă cu fructe de mare",
        "description": "Sos de rosii 180g ,Scoici 60g,Carne scoici 50g, Calamar 45g, Creveti 30g, Rosii cherry 30g, Vin alb de masa 20ml, Sos vegetal 10g, Ceapa 5g, Telina apio 5g, Ulei de masline 5ml, Sos soia 5ml, Usturoi 3g, Piper 1g, Sare 1g.",
        "nutrition": "Conține: (3E | 0.81g sare | 0.73g zahar)/100g."
      }
    }
  },
  {
    "id": "cuisine-avec-talent-546",
    "postId": "546",
    "categoryId": "cuisine-avec-talent",
    "type": "food",
    "priceEur": 32,
    "priceFormatted": "32 €",
    "isVerifiedPrice": true,
    "weight": "260g",
    "image": "/images/catalog/caracatita-4.jpg",
    "allergens": [
      "Fish",
      "Celery",
      "Mustard",
      "Molluscs"
    ],
    "tags": [
      "octopus",
      "featured"
    ],
    "translations": {
      "fr": {
        "name": "Poulpe grillé de Pescobar",
        "description": "Poulpe 180 g, salade mixte 30 g, citron 25 g, sauce salade 5 g (miel, jus de citron frais, huile d’olive, sel, moutarde).",
        "nutrition": "Contains: (0E | 0,29g de sel | 1,06g de sucre) / 100g."
      },
      "nl": {
        "name": "Pescobar’s Gegrilde Octopus",
        "description": "Octopus 180 g, mixed salad 30 g, Citroen 25 g, salad dressing 5 g (honey, fresh Citroen juice, Olijfolie, Zout, mustard).",
        "nutrition": "Contains: (0E | 0.29g salt | 1.06g sugar) / 100g."
      },
      "en": {
        "name": "Pescobar’s Grilled Octopus",
        "description": "Octopus 180 g, mixed salad 30 g, lemon 25 g, salad dressing 5 g (honey, fresh lemon juice, olive oil, salt, mustard).",
        "nutrition": "Contains: (0E | 0.29g salt | 1.06g sugar) / 100g."
      },
      "ro": {
        "name": "Caracatița lui Pescobar la grătar",
        "description": "Caracatita 180g, Salata mix 30g, Lamaie 25g, Dressing salata 5g (Miere, Fresh de lamaie, Ulei de masline, Sare, Mustar).",
        "nutrition": "Conține: (0E | 0.29g sare | 1.06g zahar)/100g."
      }
    }
  },
  {
    "id": "cuisine-avec-talent-545",
    "postId": "545",
    "categoryId": "cuisine-avec-talent",
    "type": "food",
    "priceEur": 26,
    "priceFormatted": "26 €",
    "isVerifiedPrice": true,
    "weight": "600g",
    "image": "/images/catalog/taverna-racilor-29.jpg",
    "allergens": [
      "Crustaceans",
      "Fish",
      "Molluscs"
    ],
    "tags": [
      "shrimp"
    ],
    "translations": {
      "fr": {
        "name": "Poêlée épicée de fruits de mer",
        "description": "Moules 140g, Sauce Tomate 120g, Crevettes 100g, Chair de Palourdes 100g, Calamar 90g, Vin Blanc de Table 30ml, Huile d’Olive 10ml, Ail 5g, Sel 2g, Poivre 2g, Flocons de Piment 1g.",
        "nutrition": "Contains: (0E | 0,26g de sel | 0,36g de sucre) / 100g."
      },
      "nl": {
        "name": "Spicy Seafood Skillet",
        "description": "Mosselen 140g, Tomatensaus 120g, Garnalen 100g, Venusschelpenvlees 100g, Inktvis (Calamari) 90g, Table Witte Wijn 30ml, Olijfolie 10ml, Knoflook 5g, Zout 2g, Peper 2g, Chili Flakes 1g.",
        "nutrition": "Contains: (0E | 0.26g salt | 0.36g sugar) / 100g."
      },
      "en": {
        "name": "Spicy Seafood Skillet",
        "description": "Mussels 140g, Tomato Sauce 120g, Shrimp 100g, Clam Meat 100g, Squid 90g, Table White Wine 30ml, Olive Oil 10ml, Garlic 5g, Salt 2g, Pepper 2g, Chili Flakes 1g.",
        "nutrition": "Contains: (0E | 0.26g salt | 0.36g sugar) / 100g."
      },
      "ro": {
        "name": "Tigaie picantă cu fructe de mare",
        "description": "Scoici 140g, Sos de rosii 120g, Creveti 100g, Carne scoici 100g, Calamar 90g, Vin alb de masa 30 ml, Ulei de masline 10ml, Usturoi 5g, Sare 2g, Piper 2g, Fulgi Chili 1g.",
        "nutrition": "Conține: (0E | 0.26g sare | 0.36g zahar)/100g."
      }
    }
  },
  {
    "id": "cuisine-avec-talent-548",
    "postId": "548",
    "categoryId": "cuisine-avec-talent",
    "type": "food",
    "priceEur": 24,
    "priceFormatted": "24 €",
    "isVerifiedPrice": true,
    "weight": "240g",
    "image": "/images/catalog/taverna-racilor-45.jpg",
    "allergens": [
      "Celery",
      "Mustard",
      "Molluscs"
    ],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Tentacules de calamar grillés avec salade",
        "description": "Tentacule de calmar 180g, Salade mixte 25g, Citron 25g, Sauce salade 10g (Huile d’olive, Jus de citron frais, Sel, Moutarde, Miel polyfloral).",
        "nutrition": "Contains: (5E | 0,43g de sel | 1,37g de sucres) / 100g."
      },
      "nl": {
        "name": "Gegrilde Inktvistentakels with Salad",
        "description": "Inktvis (Calamari) tentacle 180g, Mixed salad 25g, Citroen 25g, Salad dressing 10g (Olijfolie, Fresh Citroen, Zout, Mustard, Polyfloral honey).",
        "nutrition": "Contains: (5E | 0.43g salt | 1.37g sugars) / 100g."
      },
      "en": {
        "name": "Grilled Squid Tentacles with Salad",
        "description": "Squid tentacle 180g, Mixed salad 25g, Lemon 25g, Salad dressing 10g (Olive oil, Fresh lemon, Salt, Mustard, Polyfloral honey).",
        "nutrition": "Contains: (5E | 0.43g salt | 1.37g sugars) / 100g."
      },
      "ro": {
        "name": "Tentacule de calamar la grătar cu salată",
        "description": "Tentacule calamar 180g , Salata mix 25g, Lamaie 25g, Dressing Salata 10g (Ulei de masline, Fresh lamaie, Sare, Mustar, Miere Poliflora).",
        "nutrition": "Conține: (5E | 0.43g sare | 1.37g zaharuri)/100g."
      }
    }
  },
  {
    "id": "cuisine-avec-talent-549",
    "postId": "549",
    "categoryId": "cuisine-avec-talent",
    "type": "food",
    "priceEur": 24,
    "priceFormatted": "24 €",
    "isVerifiedPrice": true,
    "weight": "350g",
    "image": "/images/catalog/taverna-racilor-69.jpg",
    "allergens": [
      "Crustaceans",
      "Fish",
      "Milk"
    ],
    "tags": [
      "shrimp"
    ],
    "translations": {
      "fr": {
        "name": "Crevettes à la sauce au vin blanc et à l’ail",
        "description": "Crevettes 240 g, vin blanc de table 70 ml, beurre 20 g, huile d’olive 10 ml, ail 5 g, sel 3 g, poivre 2 g.",
        "nutrition": "Contains: (0E | 0,86g de sel | 0,22g de sucre) / 100g."
      },
      "nl": {
        "name": "Garnalen in Witte Wijn and Knoflook Sauce",
        "description": "Garnalen 240 g, table Witte Wijn 70 ml, Boter 20 g, Olijfolie 10 ml, Knoflook 5 g, Zout 3 g, Peper 2 g.",
        "nutrition": "Contains: (0E | 0.86g salt | 0.22g sugar) / 100g."
      },
      "en": {
        "name": "Shrimps in White Wine and Garlic Sauce",
        "description": "Shrimp 240 g, table white wine 70 ml, butter 20 g, olive oil 10 ml, garlic 5 g, salt 3 g, pepper 2 g.",
        "nutrition": "Contains: (0E | 0.86g salt | 0.22g sugar) / 100g."
      },
      "ro": {
        "name": "Creveți în sos de vin și usturoi",
        "description": "Creveti 240g, Vin alb de masa 70ml, Unt 20g, Ulei de masline 10ml, Usturoi 5g, Sare 3g, Piper 2g.",
        "nutrition": "Conține: (0E | 0.86g sare | 0.22g zahar)/100g."
      }
    }
  },
  {
    "id": "cuisine-avec-talent-547",
    "postId": "547",
    "categoryId": "cuisine-avec-talent",
    "type": "food",
    "priceEur": 22,
    "priceFormatted": "22 €",
    "isVerifiedPrice": true,
    "weight": "450g",
    "image": "/images/catalog/taverna-racilor-33.jpg",
    "allergens": [
      "Crustaceans",
      "Fish",
      "Milk"
    ],
    "tags": [
      "shrimp"
    ],
    "translations": {
      "fr": {
        "name": "Poêlée épicée aux crevettes",
        "description": "Crevettes 220g, Sauce Tomate 160g, Vin Blanc de Table 30ml, Huile d’Olive 15ml, Beurre 15g, Ail 5g, Sel 3g, Poivre 2g.",
        "nutrition": "Contains: (0E | 0,82g de sel | 0,42g de sucre) / 100g."
      },
      "nl": {
        "name": "Spicy Garnalen Skillet",
        "description": "Garnalen 220g, Tomatensaus 160g, Table Witte Wijn 30ml, Olijfolie 15ml, Boter 15g, Knoflook 5g, Zout 3g, Peper 2g.",
        "nutrition": "Contains: (0E | 0.82g salt | 0.42g sugar) / 100g."
      },
      "en": {
        "name": "Spicy Shrimp Skillet",
        "description": "Shrimp 220g, Tomato Sauce 160g, Table White Wine 30ml, Olive Oil 15ml, Butter 15g, Garlic 5g, Salt 3g, Pepper 2g.",
        "nutrition": "Contains: (0E | 0.82g salt | 0.42g sugar) / 100g."
      },
      "ro": {
        "name": "Tigaie picantă cu creveți",
        "description": "Creveti 220g , Sos de rosii 160g, Vin alb de masa 30ml, Ulei de masline 15ml, Unt 15g, Usturoi 5g, Sare 3g, Piper 2g.",
        "nutrition": "Conține: (0E | 0.82g sare | 0.42g zahar)/100g."
      }
    }
  },
  {
    "id": "cuisine-avec-talent-564",
    "postId": "564",
    "categoryId": "cuisine-avec-talent",
    "type": "food",
    "priceEur": 21,
    "priceFormatted": "21 €",
    "isVerifiedPrice": true,
    "weight": "650g",
    "image": "/images/catalog/taverna-racilor-107.jpg",
    "allergens": [
      "Gluten",
      "Crustaceans",
      "Fish",
      "Molluscs"
    ],
    "tags": [
      "shrimp"
    ],
    "translations": {
      "fr": {
        "name": "Paella aux fruits de mer",
        "description": "Moules 140 g, crevettes 120 g, riz Arborio 100 g, chair de palourdes 100 g, calamar 90 g, sauce tomate 40 g, vin blanc de table 20 ml, oignon 20 g, huile d’olive 10 ml, ail 6 g, curcuma 2 g, sel 1 g, poivre 1 g.",
        "nutrition": "Contains: (0E | 0,42g de sel | 0,4g de sucre) / 100g."
      },
      "nl": {
        "name": "Seafood Paella",
        "description": "Mosselen 140 g, Garnalen 120 g, Arborio rice 100 g, Venusschelpenvlees 100 g, Inktvis (Calamari) 90 g, Tomatensaus 40 g, table Witte Wijn 20 ml, onion 20 g, Olijfolie 10 ml, Knoflook 6 g, turmeric 2 g, Zout 1 g, Peper 1 g.",
        "nutrition": "Contains: (0E | 0.42g salt | 0.4g sugar) / 100g."
      },
      "en": {
        "name": "Seafood Paella",
        "description": "Mussels 140 g, shrimp 120 g, Arborio rice 100 g, clam meat 100 g, squid 90 g, tomato sauce 40 g, table white wine 20 ml, onion 20 g, olive oil 10 ml, garlic 6 g, turmeric 2 g, salt 1 g, pepper 1 g.",
        "nutrition": "Contains: (0E | 0.42g salt | 0.4g sugar) / 100g."
      },
      "ro": {
        "name": "Paella cu fructe de mare",
        "description": "Scoici 140g, Creveti 120g, Orez arborio 100g, Carne de scoici 100g, Calamar 90g, Sos de rosii 40g, Vin alb de masa 20ml, Ceapa 20g, Ulei de masline 10ml, Usturoi 6g, Turmeric 2g, Sare 1g, Piper 1g.",
        "nutrition": "Conține: (0E | 0.42g sare | 0.4g zahar)/100g."
      }
    }
  },
  {
    "id": "cuisine-avec-talent-550",
    "postId": "550",
    "categoryId": "cuisine-avec-talent",
    "type": "food",
    "priceEur": 18,
    "priceFormatted": "18 €",
    "isVerifiedPrice": true,
    "weight": "330g",
    "image": "/images/catalog/creveti-la-gratar-taverna-racilor.jpg",
    "allergens": [
      "Crustaceans",
      "Fish",
      "Celery",
      "Mustard"
    ],
    "tags": [
      "shrimp"
    ],
    "translations": {
      "fr": {
        "name": "Crevettes grillées",
        "description": "Crevettes 270 g, citron 25 g, salade mixte 20 g, sauce salade 10 g (huile d’olive, jus de citron frais, sel, moutarde, miel polyfloral), huile d’olive 5 ml.",
        "nutrition": "Contains: (0E | 0,9g de sel | 0,92g de sucre) / 100g."
      },
      "nl": {
        "name": "Gegrilde Garnalen",
        "description": "Garnalen 270 g, Citroen 25 g, mixed salad 20 g, salad dressing 10 g (Olijfolie, fresh Citroen juice, Zout, mustard, polyfloral honey), Olijfolie 5 ml.",
        "nutrition": "Contains: (0E | 0.9g salt | 0.92g sugar) / 100g."
      },
      "en": {
        "name": "Grilled Shrimps",
        "description": "Shrimp 270 g, lemon 25 g, mixed salad 20 g, salad dressing 10 g (olive oil, fresh lemon juice, salt, mustard, polyfloral honey), olive oil 5 ml.",
        "nutrition": "Contains: (0E | 0.9g salt | 0.92g sugar) / 100g."
      },
      "ro": {
        "name": "Creveți la grătar",
        "description": "Creveti 270g, Lamaie 25g, Salata mix 20g, Dressing Salata 10g (Ulei de masline, Fresh lamaie, Sare, Mustar, Miere Poliflora), Ulei de masline 5ml.",
        "nutrition": "Conține: (0E | 0.9g sare | 0.92g zahar)/100g."
      }
    }
  },
  {
    "id": "cuisine-avec-talent-553",
    "postId": "553",
    "categoryId": "cuisine-avec-talent",
    "type": "food",
    "priceEur": 18,
    "priceFormatted": "18 €",
    "isVerifiedPrice": true,
    "weight": "550g",
    "image": "/images/catalog/raci-fierti.jpg",
    "allergens": [
      "Crustaceans",
      "Fish"
    ],
    "tags": [
      "boil"
    ],
    "translations": {
      "fr": {
        "name": "Écrevisses bouillies à l’aneth et à l’ail",
        "description": "Écrevisses 500 g, citron 25 g, huile d’olive 15 g, ail 5 g, aneth 5 g.",
        "nutrition": "Contains: (0E | 0,01g de sel | 0,19g de sucre) / 100g."
      },
      "nl": {
        "name": "Boiled Rivierkreeftjes with Dill and Knoflook",
        "description": "Rivierkreeftjes 500 g, Citroen 25 g, Olijfolie 15 g, Knoflook 5 g, dill 5 g.",
        "nutrition": "Contains: (0E | 0.01g salt | 0.19g sugar) / 100g."
      },
      "en": {
        "name": "Boiled Crayfish with Dill and Garlic",
        "description": "Crayfish 500 g, lemon 25 g, olive oil 15 g, garlic 5 g, dill 5 g.",
        "nutrition": "Contains: (0E | 0.01g salt | 0.19g sugar) / 100g."
      },
      "ro": {
        "name": "Raci fierți cu mărar și usturoi",
        "description": "Raci 500g, Lamaie 25g, Ulei de masline 15g, Usturoi 5g, Marar 5g.",
        "nutrition": "Conține: (0E | 0.01g sare | 0.19g zahar)/100g."
      }
    }
  },
  {
    "id": "cuisine-avec-talent-551",
    "postId": "551",
    "categoryId": "cuisine-avec-talent",
    "type": "food",
    "priceEur": 15,
    "priceFormatted": "15 €",
    "isVerifiedPrice": true,
    "weight": "700g",
    "image": "/images/catalog/taverna-racilor-44.jpg",
    "allergens": [
      "Fish",
      "Soya",
      "Molluscs"
    ],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Moules à la sauce au vin blanc",
        "description": "Moules 500 g, chair de palourdes 100 g, vin blanc de table 60 ml, sauce végétale 20 g, huile d’olive 10 ml, ail 6 g, poivre 2 g, sel 1 g, flocons de piment 1 g.",
        "nutrition": "Contains: (0E | 0,22g de sel | 0,25g de sucre) / 100g."
      },
      "nl": {
        "name": "Mosselen in Witte Wijn Sauce",
        "description": "Mosselen 500 g, Venusschelpenvlees 100 g, table Witte Wijn 60 ml, vegetable sauce 20 g, Olijfolie 10 ml, Knoflook 6 g, Peper 2 g, Zout 1 g, chili flakes 1 g.",
        "nutrition": "Contains: (0E | 0.22g salt | 0.25g sugar)/100g."
      },
      "en": {
        "name": "Mussels in White Wine Sauce",
        "description": "Mussels 500 g, clam meat 100 g, table white wine 60 ml, vegetable sauce 20 g, olive oil 10 ml, garlic 6 g, pepper 2 g, salt 1 g, chili flakes 1 g.",
        "nutrition": "Contains: (0E | 0.22g salt | 0.25g sugar)/100g."
      },
      "ro": {
        "name": "Scoici în sos de vin",
        "description": "Scoici 500g, Carne Scoici 100g, Vin alb de masa 60ml, Sos Vegetal 20g, Ulei de masline 10ml, Usturoi 6g, Piper 2g, Sare 1g, Fulgi chilli 1g.",
        "nutrition": "Conține: (0E | 0.22g sare | 0.25g zahar)/100g."
      }
    }
  },
  {
    "id": "viande-1135",
    "postId": "1135",
    "categoryId": "viande",
    "type": "food",
    "priceEur": 32,
    "priceFormatted": "32 €",
    "isVerifiedPrice": true,
    "weight": "280g",
    "image": "/images/catalog/sirloin-taverna-racilor.jpg",
    "allergens": [
      "Nuts",
      "Soya",
      "Celery",
      "Sesame"
    ],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Faux-filet",
        "description": "Faux-Filet de Bœuf 200g, Citron 45g, Sauce Szechuan 30g (Noisettes, Huile de Tournesol, Sucre, Sauce Soja, Ail, Flocons de Piment, Sel, Huile de Sésame), Sel 3g, Ciboulette 2g.",
        "nutrition": "Contains: (2E | 2,62g sel | 0,54g sucre)/100g."
      },
      "nl": {
        "name": "Sirloin",
        "description": "Beef Sirloin 200g, Citroen 45g, Szechuan Sauce 30g (Hazelnuts, Sunflower Oil, Sugar, Soy Sauce, Knoflook, Chili Flakes, Zout, Sesame Oil), Zout 3g, Chives 2g.",
        "nutrition": "Contains: (2E | 2.62g salt | 0.54g sugar)/100g."
      },
      "en": {
        "name": "Sirloin",
        "description": "Beef Sirloin 200g, Lemon 45g, Szechuan Sauce 30g (Hazelnuts, Sunflower Oil, Sugar, Soy Sauce, Garlic, Chili Flakes, Salt, Sesame Oil), Salt 3g, Chives 2g.",
        "nutrition": "Contains: (2E | 2.62g salt | 0.54g sugar)/100g."
      },
      "ro": {
        "name": "Sirloin",
        "description": "Vrabioara de vita 200g, Lamaie 45g, Sos Szechuan 30g (Alune de padure, Ulei floarea soarelui, Zahar, Sos soia, Usturoi, Fulgi Chili, Sare, Ulei de susan), Sare 3g, Chives 2g.",
        "nutrition": "Conține: (2E | 2.62g sare | 0.54g zahar)/100g."
      }
    }
  },
  {
    "id": "viande-1134",
    "postId": "1134",
    "categoryId": "viande",
    "type": "food",
    "priceEur": 29,
    "priceFormatted": "29 €",
    "isVerifiedPrice": true,
    "weight": "280g",
    "image": "/images/catalog/cotlete-berbecut-taverna-racilor.jpg",
    "allergens": [
      "Sesame"
    ],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Côtes d’agneau",
        "description": "Côtelette d’Agneau 220g, Citron 50g, Graines de Sésame 5g, Sel 3g, Ciboulette 2g.",
        "nutrition": "Contains: (2E | 5,68g sel | 0,87g sucre)/100g."
      },
      "nl": {
        "name": "Lamb Chops",
        "description": "Lamb Chop 220g, Citroen 50g, Sesame Seeds 5g, Zout 3g, Chives 2g.",
        "nutrition": "Contains: (2E | 5.68g salt | 0.87g sugar)/100g."
      },
      "en": {
        "name": "Lamb Chops",
        "description": "Lamb Chop 220g, Lemon 50g, Sesame Seeds 5g, Salt 3g, Chives 2g.",
        "nutrition": "Contains: (2E | 5.68g salt | 0.87g sugar)/100g."
      },
      "ro": {
        "name": "Cotlete de berbecuț",
        "description": "Cotlet de berbecut 220g, Lamaie 50g, Semințe susan 5g, Sare 3g, Chives 2g.",
        "nutrition": "Conține: (2E | 5.68g sare | 0.87g zahar)/100g."
      }
    }
  },
  {
    "id": "viande-1137",
    "postId": "1137",
    "categoryId": "viande",
    "type": "food",
    "priceEur": 25,
    "priceFormatted": "25 €",
    "isVerifiedPrice": true,
    "weight": "450g",
    "image": "/images/catalog/burger-wagyu-taverna-racilor.jpg",
    "allergens": [
      "Gluten",
      "Egg",
      "Soya",
      "Milk",
      "Mustard",
      "Sesame"
    ],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Burger Wagyu",
        "description": "Burger Wagyu 160g, Pommes de Terre 120g, Pain 80g, Mayonnaise 30g, Fromage Cheddar 20g, Tomates 15g, Laitue Verte 12g, Cornichons 12g, Huile de Tournesol 1ml.",
        "nutrition": "Contains: (0E | 0,1g sel | 0g sucre)/100g."
      },
      "nl": {
        "name": "Wagyu Burger",
        "description": "Wagyu Burger 160g, Aardappelen 120g, Bun 80g, Mayonnaise 30g, Cheddar Cheese 20g, Tomatoes 15g, Green Lettuce 12g, Pickled Cucumbers 12g, Sunflower Oil 1ml.",
        "nutrition": "Contains: (0E | 0.1g salt | 0g sugar)/100g."
      },
      "en": {
        "name": "Wagyu Burger",
        "description": "Wagyu Burger 160g, Potatoes 120g, Bun 80g, Mayonnaise 30g, Cheddar Cheese 20g, Tomatoes 15g, Green Lettuce 12g, Pickled Cucumbers 12g, Sunflower Oil 1ml.",
        "nutrition": "Contains: (0E | 0.1g salt | 0g sugar)/100g."
      },
      "ro": {
        "name": "Wagyu Burger",
        "description": "Wagyu Burger 160g, Catofi 120g, Chifla 80 g, Maioneza 30g, Branza Cedar 20g, Rosii 15g, Salata verde 12g, Castraveti Murati 12g, Ulei floarea soarelui 1ml.",
        "nutrition": "Conține: (0E | 0.1g sare | 0g zahar)/100 g."
      }
    }
  },
  {
    "id": "viande-1140",
    "postId": "1140",
    "categoryId": "viande",
    "type": "food",
    "priceEur": 15,
    "priceFormatted": "15 €",
    "isVerifiedPrice": true,
    "weight": "180g",
    "image": "/images/catalog/frigarui-pui-taverna-racilor.jpg",
    "allergens": [
      "Sesame"
    ],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Brochettes de poulet teriyaki",
        "description": "Blanc de Poulet 150g, Sauce Teriyaki 20g, Huile de Tournesol 5ml, Graines de Sésame 2g, Sel 2g, Poivre 1g.",
        "nutrition": "Contains: (2E | 0,83g sel | 1,2g sucre)/100g."
      },
      "nl": {
        "name": "Teriyaki Chicken Skewers",
        "description": "Chicken Breast 150g, Teriyaki Sauce 20g, Sunflower Oil 5ml, Sesame Seeds 2g, Zout 2g, Peper 1g.",
        "nutrition": "Contains: (2E | 0.83g salt | 1.2g sugar)/100g."
      },
      "en": {
        "name": "Teriyaki Chicken Skewers",
        "description": "Chicken Breast 150g, Teriyaki Sauce 20g, Sunflower Oil 5ml, Sesame Seeds 2g, Salt 2g, Pepper 1g.",
        "nutrition": "Contains: (2E | 0.83g salt | 1.2g sugar)/100g."
      },
      "ro": {
        "name": "Frigărui de pui teriyaki",
        "description": "Piept de pui 150g, Sos Teriaki 20g, Ulei floarea soarelui 5ml,Seminte de susan 2g, Sare 2g, Piper 1g.",
        "nutrition": "Conține: (2E | 0.83g sare | 1.2g zahar)/100g."
      }
    }
  },
  {
    "id": "pates-567",
    "postId": "567",
    "categoryId": "pates",
    "type": "food",
    "priceEur": 45,
    "priceFormatted": "45 €",
    "isVerifiedPrice": true,
    "weight": "950g",
    "image": "/images/catalog/homar-pe-pat-de-spaghetii-cu-fructe-de-mare-taverna-racilor.jpg",
    "allergens": [
      "Gluten",
      "Crustaceans",
      "Fish",
      "Soya",
      "Milk",
      "Molluscs"
    ],
    "tags": [
      "shrimp"
    ],
    "translations": {
      "fr": {
        "name": "Homard avec Spaghetti et Fruits de Mer",
        "description": "Homard 320g, Spaghetti 200g, Moules 100g, Crevettes 80g, Chair de Palourdes 80g, Calamar 70g, Sauce Tomate 40g, Vin Blanc de Table 15ml, Sauce Végétale 15g, Beurre 15g, Huile d’Olive 5ml, Ail 5g, Sel 2g, Flocons de Piment 2g, Poivre 1g.",
        "nutrition": "Contains: (3E | 0,58g de sel | 0,99g de sucre) / 100g."
      },
      "nl": {
        "name": "Kreeft with Spaghetti and Seafood",
        "description": "Kreeft 320g, Spaghetti 200g, Mosselen 100g, Garnalen 80g, Venusschelpenvlees 80g, Inktvis (Calamari) 70g, Tomatensaus 40g, Table Witte Wijn 15ml, Vegetable Sauce 15g, Boter 15g, Olijfolie 5ml, Knoflook 5g, Zout 2g, Chili Flakes 2g, Peper 1g.",
        "nutrition": "Contains: (3E | 0.58g salt | 0.99g sugar) / 100g."
      },
      "en": {
        "name": "Lobster with Spaghetti and Seafood",
        "description": "Lobster 320g, Spaghetti 200g, Mussels 100g, Shrimp 80g, Clam Meat 80g, Squid 70g, Tomato Sauce 40g, Table White Wine 15ml, Vegetable Sauce 15g, Butter 15g, Olive Oil 5ml, Garlic 5g, Salt 2g, Chili Flakes 2g, Pepper 1g.",
        "nutrition": "Contains: (3E | 0.58g salt | 0.99g sugar) / 100g."
      },
      "ro": {
        "name": "Homar cu spaghetti si fructe de mare",
        "description": "Homar 320 g, Spaghete 200g, Scoci 100g, Creveti 80g, Carne scoici 80g, Calamar 70g, Sos de rosii 40g, Vin alb de masa 15ml, Sos vegetal 15g, Unt 15g, Ulei de masline 5ml, Usturoi 5g, Sare 2g, Fulgi Chili 2g, Piper 1g.",
        "nutrition": "Conține: (3E | 0.58g sare | 0.99g zahar)/100g."
      }
    }
  },
  {
    "id": "pates-568",
    "postId": "568",
    "categoryId": "pates",
    "type": "food",
    "priceEur": 43,
    "priceFormatted": "43 €",
    "isVerifiedPrice": true,
    "weight": "850g",
    "image": "/images/catalog/homar-pe-pat-de-spagetti-cu-creveti-taverna-racilor.jpg",
    "allergens": [
      "Gluten",
      "Crustaceans",
      "Fish",
      "Soya",
      "Milk"
    ],
    "tags": [
      "shrimp"
    ],
    "translations": {
      "fr": {
        "name": "Homard sur lit de spaghetti et crevettes",
        "description": "Homard 320g, Spaghetti 200g, Crevettes 180g, Sauce Tomate 40g, Tomates Cerises 35g, Vin Blanc de Table 20ml, Sauce Végétale 20g, Courgette 20g, Huile d’Olive 5ml, Ail 5g, Sel 2g, Flocons de Piment 2g, Poivre 1g.",
        "nutrition": "Contains: (3E | 0,65g de sel | 0,88g de sucre) / 100g."
      },
      "nl": {
        "name": "Kreeft on a Bed of Spaghetti and Garnalen",
        "description": "Kreeft 320g, Spaghetti 200g, Garnalen 180g, Tomatensaus 40g, Kerstdrostomaatjes 35g, Table Witte Wijn 20ml, Vegetable Sauce 20g, Zucchini 20g, Olijfolie 5ml, Knoflook 5g, Zout 2g, Chili Flakes 2g, Peper 1g.",
        "nutrition": "Contains: (3E | 0.65g salt | 0.88g sugar) / 100g."
      },
      "en": {
        "name": "Lobster on a Bed of Spaghetti and Shrimp",
        "description": "Lobster 320g, Spaghetti 200g, Shrimp 180g, Tomato Sauce 40g, Cherry Tomatoes 35g, Table White Wine 20ml, Vegetable Sauce 20g, Zucchini 20g, Olive Oil 5ml, Garlic 5g, Salt 2g, Chili Flakes 2g, Pepper 1g.",
        "nutrition": "Contains: (3E | 0.65g salt | 0.88g sugar) / 100g."
      },
      "ro": {
        "name": "Homar pe pat de spaghetti și creveți",
        "description": "Homar 320g, Spaghete 200g, Creveti 180g, Sos de rosii 40g, Rosii cherry 35g, Vin alb de masa 20ml, Sos vegetal 20g, Zuchini 20g, Ulei de masline 5ml, Usturoi 5g, Sare 2g, Fulgi Chili 2g, Piper 1g.",
        "nutrition": "Conține: (3E | 0.65g sare | 0.88g zahar)/100g."
      }
    }
  },
  {
    "id": "pates-566",
    "postId": "566",
    "categoryId": "pates",
    "type": "food",
    "priceEur": 38,
    "priceFormatted": "38 €",
    "isVerifiedPrice": true,
    "weight": "650g",
    "image": "/images/catalog/homar-pe-pat-de-spagetti-taverna-racilor.jpg",
    "allergens": [
      "Gluten",
      "Crustaceans",
      "Fish",
      "Soya",
      "Milk"
    ],
    "tags": [
      "shrimp"
    ],
    "translations": {
      "fr": {
        "name": "Homard sur lit de spaghetti",
        "description": "Homard 320g, Spaghetti 200g, Sauce Tomate 30g, Tomates Cerises 25g, Sauce Végétale 25g, Courgette 20g, Beurre 15g, Huile d’Olive 5ml, Ail 5g, Sel 2g, Flocons de Piment 2g, Poivre 1g.",
        "nutrition": "Contains: (3E | 0,49g de sel | 1,13g de sucre) / 100g."
      },
      "nl": {
        "name": "Kreeft on a Bed of Spaghetti",
        "description": "Kreeft 320g, Spaghetti 200g, Tomatensaus 30g, Kerstdrostomaatjes 25g, Vegetable Sauce 25g, Zucchini 20g, Boter 15g, Olijfolie 5ml, Knoflook 5g, Zout 2g, Chili Flakes 2g, Peper 1g.",
        "nutrition": "Contains: (3E | 0.49g salt | 1.13g sugar) / 100g."
      },
      "en": {
        "name": "Lobster on a Bed of Spaghetti",
        "description": "Lobster 320g, Spaghetti 200g, Tomato Sauce 30g, Cherry Tomatoes 25g, Vegetable Sauce 25g, Zucchini 20g, Butter 15g, Olive Oil 5ml, Garlic 5g, Salt 2g, Chili Flakes 2g, Pepper 1g.",
        "nutrition": "Contains: (3E | 0.49g salt | 1.13g sugar) / 100g."
      },
      "ro": {
        "name": "Homar pe pat de spaghetti",
        "description": "Homar 320g, Spaghete 200g, Sos de rosii 30g, Rosii cherry 25g, Sos vegetal 25g, Zuchini 20g, Unt 15g, Ulei de masline 5ml, Usturoi 5g, Sare 2g, Fulgi Chili 2g, Piper 1g.",
        "nutrition": "Conține: (3E | 0.49g sare | 1.13g zahar)/100g."
      }
    }
  },
  {
    "id": "pates-555",
    "postId": "555",
    "categoryId": "pates",
    "type": "food",
    "priceEur": 26,
    "priceFormatted": "26 €",
    "isVerifiedPrice": true,
    "weight": "750g",
    "image": "/images/catalog/taverna-racilor-52.jpg",
    "allergens": [
      "Gluten",
      "Crustaceans",
      "Fish",
      "Milk",
      "Molluscs"
    ],
    "tags": [
      "shrimp"
    ],
    "translations": {
      "fr": {
        "name": "Spaghetti aux fruits de mer",
        "description": "Spaghetti 200g, Moules 140g, Crevettes 100g, Chair de Palourdes 100g, Calamar 90g, Sauce Tomate 60g, Beurre 20g, Vin Blanc de Table 20ml, Huile d’Olive 10ml, Ail 5g, Sel 2g, Flocons de Piment 2g, Poivre 1g.",
        "nutrition": "Contains: (0E | 0,48g de sel | 0,86g de sucre) / 100g."
      },
      "nl": {
        "name": "Seafood Spaghetti",
        "description": "Spaghetti 200g, Mosselen 140g, Garnalen 100g, Venusschelpenvlees 100g, Inktvis (Calamari) 90g, Tomatensaus 60g, Boter 20g, Table Witte Wijn 20ml, Olijfolie 10ml, Knoflook 5g, Zout 2g, Chili Flakes 2g, Peper 1g.",
        "nutrition": "Contains: (0E | 0.48g salt | 0.86g sugar) / 100g."
      },
      "en": {
        "name": "Seafood Spaghetti",
        "description": "Spaghetti 200g, Mussels 140g, Shrimp 100g, Clam Meat 100g, Squid 90g, Tomato Sauce 60g, Butter 20g, Table White Wine 20ml, Olive Oil 10ml, Garlic 5g, Salt 2g, Chili Flakes 2g, Pepper 1g.",
        "nutrition": "Contains: (0E | 0.48g salt | 0.86g sugar) / 100g."
      },
      "ro": {
        "name": "Spaghetti cu fructe de mare",
        "description": "Spaghete 200 g, Scoici 140g, Creveti 100g, Carne scoici 100g, Calamar 90g , Sos de rosii 60, Unt 20g, Vin alb de masa 20ml, Ulei de masline 10ml, Usturoi 5g, Sare 2g, Fulgi Chili 2g, Piper 1g.",
        "nutrition": "Conține: (0E | 0.48g sare | 0.86g zahar)/100g."
      }
    }
  },
  {
    "id": "pates-554",
    "postId": "554",
    "categoryId": "pates",
    "type": "food",
    "priceEur": 24,
    "priceFormatted": "24 €",
    "isVerifiedPrice": true,
    "weight": "550g",
    "image": "/images/catalog/taverna-racilor-49.jpg",
    "allergens": [
      "Gluten",
      "Fish",
      "Soya",
      "Milk"
    ],
    "tags": [
      "shrimp"
    ],
    "translations": {
      "fr": {
        "name": "Spaghetti aux Crevettes",
        "description": "Spaghetti 200g, Crevettes 180g, Sauce Végétale 50g, Vin Blanc de Table 30ml, Tomates Cerises 35g, Courgette 20g, Beurre 15g, Huile d’Olive 10ml, Ail 5g, Sel 2g, Flocons de Piment 2g, Poivre 1g.",
        "nutrition": "Contains: (3E | 2,01g de sel | 1,17g de sucre) / 100g."
      },
      "nl": {
        "name": "Spaghetti with Garnalen",
        "description": "Spaghetti 200g, Garnalen 180g, Vegetable Sauce 50g, Table Witte Wijn 30ml, Kerstdrostomaatjes 35g, Zucchini 20g, Boter 15g, Olijfolie 10ml, Knoflook 5g, Zout 2g, Chili Flakes 2g, Peper 1g.",
        "nutrition": "Contains: (3E | 2.01g salt | 1.17g sugar) / 100g."
      },
      "en": {
        "name": "Spaghetti with Shrimp",
        "description": "Spaghetti 200g, Shrimp 180g, Vegetable Sauce 50g, Table White Wine 30ml, Cherry Tomatoes 35g, Zucchini 20g, Butter 15g, Olive Oil 10ml, Garlic 5g, Salt 2g, Chili Flakes 2g, Pepper 1g.",
        "nutrition": "Contains: (3E | 2.01g salt | 1.17g sugar) / 100g."
      },
      "ro": {
        "name": "Spaghetti cu creveți",
        "description": "Spaghete 200g, Creveti 180g , Sos vegetal 50g, Vin alb de masa 30ml, Rosii cherry 35g, Zuchini 20g, Unt 15g, Ulei de masline 10ml, Usturoi 5g, Sare 2g, Fulgi Chili 2g, Piper 1g.",
        "nutrition": "Conține: (3E | 2.01g sare | 1.17g zahar)/100g."
      }
    }
  },
  {
    "id": "pates-2247",
    "postId": "2247",
    "categoryId": "pates",
    "type": "food",
    "priceEur": 19,
    "priceFormatted": "19 €",
    "isVerifiedPrice": true,
    "weight": "350g",
    "image": "/images/catalog/paste-carbonara-cu-caracatita.jpg",
    "allergens": [
      "Egg",
      "Fish",
      "Milk",
      "Molluscs"
    ],
    "tags": [
      "octopus"
    ],
    "translations": {
      "fr": {
        "name": "Spaghettis Carbonara au Poulpe",
        "description": "Spaghettis 200g, Poulpe 90g, Parmesan 25g, Tomates séchées 15g, Œuf 5g, Huile d’Olive 5ml, Ail 5g, Sel 3g, Poivre 2g.",
        "nutrition": ""
      },
      "nl": {
        "name": "Spaghetti Carbonara met Octopus",
        "description": "Spaghetti 200g, Octopus 90g, Parmesan 25g, Sun-Dried Tomatoes 15g, Egg 5g, Olijfolie 5ml, Knoflook 5g, Zout 3g, Peper 2g.",
        "nutrition": ""
      },
      "en": {
        "name": "Spaghetti Carbonara with Octopus",
        "description": "Spaghetti 200g, Octopus 90g, Parmesan 25g, Sun-Dried Tomatoes 15g, Egg 5g, Olive Oil 5ml, Garlic 5g, Salt 3g, Pepper 2g.",
        "nutrition": ""
      },
      "ro": {
        "name": "Spaghette carbonara cu caracatiță",
        "description": "Spaghete 200g, Caracatita 90g, Parmezan 25g, Rosii uscate 15g, Ou 5g, Ulei de masline 5ml, Usturoi 5g, Sare 3g, Piper 2g.",
        "nutrition": ""
      }
    }
  },
  {
    "id": "pates-556",
    "postId": "556",
    "categoryId": "pates",
    "type": "food",
    "priceEur": 14,
    "priceFormatted": "14 €",
    "isVerifiedPrice": true,
    "weight": "270g",
    "image": "/images/catalog/taverna-racilor-53.jpg",
    "allergens": [
      "Gluten"
    ],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Spaghetti AOP",
        "description": "Spaghetti 255g, Huile d’Olive 5ml, Ail 5g, Sel 3g, Poivre 2g.",
        "nutrition": "Contains: (0E | 0,24g de sel | 0,05g de sucre) / 100g."
      },
      "nl": {
        "name": "Spaghetti AOP",
        "description": "Spaghetti 255g, Olijfolie 5ml, Knoflook 5g, Zout 3g, Peper 2g.",
        "nutrition": "Contains: (0E | 0.24g salt | 0.05g sugar) / 100g."
      },
      "en": {
        "name": "Spaghetti AOP",
        "description": "Spaghetti 255g, Olive Oil 5ml, Garlic 5g, Salt 3g, Pepper 2g.",
        "nutrition": "Contains: (0E | 0.24g salt | 0.05g sugar) / 100g."
      },
      "ro": {
        "name": "Spaghetti AOP",
        "description": "Spaghete 255g, Ulei de masline 5ml, Usturoi 5g, Sare 3g, Piper 2g.",
        "nutrition": "Conține: (0E | 0.24g sare | 0.05g zahar)/100g."
      }
    }
  },
  {
    "id": "la-pieuvre-de-pescobar-687",
    "postId": "687",
    "categoryId": "la-pieuvre-de-pescobar",
    "type": "food",
    "priceEur": 134,
    "priceFormatted": "134 €",
    "isVerifiedPrice": true,
    "weight": "950g",
    "image": "/images/catalog/caracatita-intreaga-taverna-racilor.jpg",
    "allergens": [
      "Fish",
      "Molluscs"
    ],
    "tags": [
      "octopus",
      "featured"
    ],
    "translations": {
      "fr": {
        "name": "Poulpe du Entier Grillé",
        "description": "+1 bouteille de Vin Aerosoli Blanc/Rosé. Poulpe 850g, Citron 50g, Sauce Chimichurri 50g (Poivron, Huile d’olive, Persil frais, Oignon, Ail, Sel, Flocons de piment, Jus de citron frais).",
        "nutrition": "Contains: (0E | 0,4g de sel | 0,07g de sucre) / 100g."
      },
      "nl": {
        "name": "Hele Gegrilde Octopus (+ 1 fles Aerosoli Wijn)",
        "description": "+1 fles Aerosoli White/Rosé Wine. Octopus 850g, Citroen 50g, Chimichurri sauce 50g (Bell Peper, Olijfolie, Fresh parsley, Onion, Knoflook, Zout, Chili flakes, Fresh Citroen juice).",
        "nutrition": "Contains: (0E | 0.4g salt | 0.07g sugar) / 100g."
      },
      "en": {
        "name": "Whole Grilled Octopus",
        "description": "+1 bottle of Aerosoli White/Rosé Wine. Octopus 850g, Lemon 50g, Chimichurri sauce 50g (Bell pepper, Olive oil, Fresh parsley, Onion, Garlic, Salt, Chili flakes, Fresh lemon juice).",
        "nutrition": "Contains: (0E | 0.4g salt | 0.07g sugar) / 100g."
      },
      "ro": {
        "name": "Caracatiță întreagă la grătar",
        "description": "+1 sticlă de Vin Aerosoli Alb/Rose. Caracatita 850g, Lamaie 50g, Sos Chimichurri 50g (Ardei gras, Ulei de masline, Patrunjel verde, Ceapa, Usturoi, Sare, Fulgi Chili, Fresh de lamaie).",
        "nutrition": "Conține: (0E | 0.4g sare | 0.07g zaharuri)/100g."
      }
    }
  },
  {
    "id": "la-pieuvre-de-pescobar-2240",
    "postId": "2240",
    "categoryId": "la-pieuvre-de-pescobar",
    "type": "food",
    "priceEur": 53,
    "priceFormatted": "53 €",
    "isVerifiedPrice": true,
    "weight": "750g",
    "image": "/images/catalog/caracatita-pe-pat-de-cartofi.jpg",
    "allergens": [
      "Fish",
      "Milk",
      "Molluscs"
    ],
    "tags": [
      "octopus",
      "platter"
    ],
    "translations": {
      "fr": {
        "name": "Poulpe sur un Lit de Pommes de Terre (2 personnes)",
        "description": "Contient une Sauce Aïoli offerte par la maison. Poulpe 400 g, Pommes de terre au four 200 g (Pommes de terre nouvelles, Beurre, Paprika doux, Ail, Sel, Romarin frais), Citron 50 g, Sauce Chimichurri 50 g (Poivron, Huile d’Olive, Persil frais, Oignon, Ail, Sel, Flocons de Chili, Jus de citron frais), Sauce Aïoli 50 g (Mayonnaise, Ail, Sel, Jus de citron frais).",
        "nutrition": ""
      },
      "nl": {
        "name": "Octopus on a Bed of Aardappelen (2 persons)",
        "description": "Includes a House Aioli Sauce. Octopus 400 g, Baked Aardappelen 200 g (New Aardappelen, Boter, Sweet Paprika, Knoflook, Zout, Fresh Rosemary), Citroen 50 g, Chimichurri Sauce 50 g (Bell Peper, Olijfolie, Fresh Parsley, Onion, Knoflook, Zout, Chili Flakes, Fresh Citroen Juice), Aioli Sauce 50 g (Mayonnaise, Knoflook, Zout, Fresh Citroen Juice).",
        "nutrition": ""
      },
      "en": {
        "name": "Octopus on a Bed of Potatoes (2 persons)",
        "description": "Includes a House Aioli Sauce. Octopus 400 g, Baked Potatoes 200 g (New Potatoes, Butter, Sweet Paprika, Garlic, Salt, Fresh Rosemary), Lemon 50 g, Chimichurri Sauce 50 g (Bell Pepper, Olive Oil, Fresh Parsley, Onion, Garlic, Salt, Chili Flakes, Fresh Lemon Juice), Aioli Sauce 50 g (Mayonnaise, Garlic, Salt, Fresh Lemon Juice).",
        "nutrition": ""
      },
      "ro": {
        "name": "Caracatiță pe pat de cartofi (2 persoane)",
        "description": "Contine un Sos Aioli din partea casei. Caracatita 400 g, Cartofi la cuptor 200 g (Cartofi noi, Unt, Boia de ardei dulce, Usturoi, Sare, Rozmarin proaspat), Lamaie 50 g, Sos Chimichurri 50 g (Ardei gras, Ulei de masline, Patrunjel verde, Ceapa, Usturoi, Sare, Fulgi Chili, Fresh de lamaie), Sos Aioli 50 g (Maioneza, Usturoi, Sare, Fresh de lamaie).",
        "nutrition": ""
      }
    }
  },
  {
    "id": "la-pieuvre-de-pescobar-2244",
    "postId": "2244",
    "categoryId": "la-pieuvre-de-pescobar",
    "type": "food",
    "priceEur": 33,
    "priceFormatted": "33 €",
    "isVerifiedPrice": true,
    "weight": "320g",
    "image": "/images/catalog/tigaie-caracatita-si-creveti.jpg",
    "allergens": [
      "Crustaceans",
      "Fish",
      "Molluscs"
    ],
    "tags": [
      "octopus",
      "shrimp",
      "featured"
    ],
    "translations": {
      "fr": {
        "name": "Poêle avec Crevettes et Poulpe",
        "description": "Crevettes 200g, Poulpe 100g, Huile d’Olive 10 ml, Ail 5g, Paprika doux 3g, Sel 2g.",
        "nutrition": ""
      },
      "nl": {
        "name": "Pan with Garnalen and Octopus",
        "description": "Garnalen 200g, Octopus 100g, Olijfolie 10 ml, Knoflook 5g, Sweet Paprika 3g, Zout 2g.",
        "nutrition": ""
      },
      "en": {
        "name": "Pan with Shrimp and Octopus",
        "description": "Shrimp 200g, Octopus 100g, Olive Oil 10 ml, Garlic 5g, Sweet Paprika 3g, Salt 2g.",
        "nutrition": ""
      },
      "ro": {
        "name": "Tigaie cu creveți și caracatița",
        "description": "Creveti 200g, Caracatita 100g, Ulei de masline 10 ml, Usturoi 5g, Boia dulce 3g, Sare 2g.",
        "nutrition": ""
      }
    }
  },
  {
    "id": "la-pieuvre-de-pescobar-546",
    "postId": "546",
    "categoryId": "la-pieuvre-de-pescobar",
    "type": "food",
    "priceEur": 32,
    "priceFormatted": "32 €",
    "isVerifiedPrice": true,
    "weight": "260g",
    "image": "/images/catalog/caracatita-4.jpg",
    "allergens": [
      "Fish",
      "Celery",
      "Mustard",
      "Molluscs"
    ],
    "tags": [
      "octopus",
      "featured"
    ],
    "translations": {
      "fr": {
        "name": "Poulpe grillé de Pescobar",
        "description": "Poulpe 180 g, salade mixte 30 g, citron 25 g, sauce salade 5 g (miel, jus de citron frais, huile d’olive, sel, moutarde).",
        "nutrition": "Contains: (0E | 0,29g de sel | 1,06g de sucre) / 100g."
      },
      "nl": {
        "name": "Pescobar’s Gegrilde Octopus",
        "description": "Octopus 180 g, mixed salad 30 g, Citroen 25 g, salad dressing 5 g (honey, fresh Citroen juice, Olijfolie, Zout, mustard).",
        "nutrition": "Contains: (0E | 0.29g salt | 1.06g sugar) / 100g."
      },
      "en": {
        "name": "Pescobar’s Grilled Octopus",
        "description": "Octopus 180 g, mixed salad 30 g, lemon 25 g, salad dressing 5 g (honey, fresh lemon juice, olive oil, salt, mustard).",
        "nutrition": "Contains: (0E | 0.29g salt | 1.06g sugar) / 100g."
      },
      "ro": {
        "name": "Caracatița lui Pescobar la grătar",
        "description": "Caracatita 180g, Salata mix 30g, Lamaie 25g, Dressing salata 5g (Miere, Fresh de lamaie, Ulei de masline, Sare, Mustar).",
        "nutrition": "Conține: (0E | 0.29g sare | 1.06g zahar)/100g."
      }
    }
  },
  {
    "id": "la-pieuvre-de-pescobar-1848",
    "postId": "1848",
    "categoryId": "la-pieuvre-de-pescobar",
    "type": "food",
    "priceEur": 24,
    "priceFormatted": "24 €",
    "isVerifiedPrice": true,
    "weight": "290g",
    "image": "/images/catalog/caracatita-galega.jpg",
    "allergens": [
      "Fish",
      "Molluscs"
    ],
    "tags": [
      "octopus"
    ],
    "translations": {
      "fr": {
        "name": "Poulpe Espagne à la Révolution",
        "description": "Pommes de terre 150g, Poulpe 130g, Huile d’olive 5ml, Sel de mer 3g, Paprika 2g.",
        "nutrition": ""
      },
      "nl": {
        "name": "Octopus Spain à la Revolución",
        "description": "Aardappelen 150g, Octopus 130g, Olijfolie 5ml, Sea Zout 3g, Paprika 2g.",
        "nutrition": ""
      },
      "en": {
        "name": "Octopus Spain à la Revolución",
        "description": "Potatoes 150g, Octopus 130g, Olive oil 5ml, Sea salt 3g, Paprika 2g.",
        "nutrition": ""
      },
      "ro": {
        "name": "Caracatiță Spania à la Revolución",
        "description": "Cartofi 150g, Caracatita 130g, Ulei de masline 5ml, Sare de mare 3g, Paprika 2g.",
        "nutrition": ""
      }
    }
  },
  {
    "id": "la-pieuvre-de-pescobar-1849",
    "postId": "1849",
    "categoryId": "la-pieuvre-de-pescobar",
    "type": "food",
    "priceEur": 21,
    "priceFormatted": "21 €",
    "isVerifiedPrice": true,
    "weight": "300g",
    "image": "/images/catalog/caracatita-a-la-revolution-1.jpg",
    "allergens": [
      "Fish",
      "Molluscs"
    ],
    "tags": [
      "octopus"
    ],
    "translations": {
      "fr": {
        "name": "Poulpe a la Gallega",
        "description": "Pommes de terre 160g, Poulpe 130g, Huile d’olive 5ml, Paprika 2g, Sel de mer 2g, Flocons de piment 1g.",
        "nutrition": ""
      },
      "nl": {
        "name": "Octopus a la Gallega",
        "description": "Aardappelen 160g, Octopus 130g, Olijfolie 5ml, Paprika 2g, Sea Zout 2g, Chilli flakes 1g.",
        "nutrition": ""
      },
      "en": {
        "name": "Octopus a la Gallega",
        "description": "Potatoes 160g, Octopus 130g, Olive oil 5ml, Paprika 2g, Sea salt 2g, Chilli flakes 1g.",
        "nutrition": ""
      },
      "ro": {
        "name": "Caracatiță a la Gallega",
        "description": "Cartofi 160g, Caracatita 130g, Ulei de masline 5ml, Paprika 2g, Sare de mare 2g, Fulgi chilli 1g.",
        "nutrition": ""
      }
    }
  },
  {
    "id": "la-pieuvre-de-pescobar-1696",
    "postId": "1696",
    "categoryId": "la-pieuvre-de-pescobar",
    "type": "food",
    "priceEur": 20,
    "priceFormatted": "20 €",
    "isVerifiedPrice": true,
    "weight": "220g",
    "image": "/images/catalog/hotdog-caracatita-taverna-racilor.jpg",
    "allergens": [
      "Egg",
      "Fish",
      "Milk",
      "Mustard",
      "Molluscs"
    ],
    "tags": [
      "octopus"
    ],
    "translations": {
      "fr": {
        "name": "Hot Dog au Poulpe",
        "description": "Poulpe 80g, Pain Hot Dog 80g, Sauce aioli 40g (Mayonnaise, Ail, Jus de citron frais, Sel), Sauce chimichurri 20g (Poivron, Huile d’olive, Persil frais, Oignon, Ail, Sel, Flocons de piment, Jus de citron frais).",
        "nutrition": ""
      },
      "nl": {
        "name": "Octopus Hot Dog",
        "description": "Octopus 80g, Hot Dog bun 80g, Aioli sauce 40g (Mayonnaise, Knoflook, Fresh Citroen juice, Zout), Chimichurri sauce 20g (Bell Peper, Olijfolie, Fresh parsley, Onion, Knoflook, Zout, Chili flakes, Fresh Citroen juice).",
        "nutrition": ""
      },
      "en": {
        "name": "Octopus Hot Dog",
        "description": "Octopus 80g, Hot Dog bun 80g, Aioli sauce 40g (Mayonnaise, Garlic, Fresh lemon juice, Salt), Chimichurri sauce 20g (Bell pepper, Olive oil, Fresh parsley, Onion, Garlic, Salt, Chili flakes, Fresh lemon juice).",
        "nutrition": ""
      },
      "ro": {
        "name": "Hot dog de Caracatiță",
        "description": "Caracatita 80 g, Chiflă Hot Dog 80, Sos aioli 40g (Maioneza, Usturoi, Fresh de lamaie, Sare), Sos Chimichurri 20g (Ardei gras, Ulei de masline, Patrunjel verde, Ceapa, Usturoi, Sare, Fulgi Chili Fresh de lamaie).",
        "nutrition": ""
      }
    }
  },
  {
    "id": "la-pieuvre-de-pescobar-2247",
    "postId": "2247",
    "categoryId": "la-pieuvre-de-pescobar",
    "type": "food",
    "priceEur": 19,
    "priceFormatted": "19 €",
    "isVerifiedPrice": true,
    "weight": "350g",
    "image": "/images/catalog/paste-carbonara-cu-caracatita.jpg",
    "allergens": [
      "Egg",
      "Fish",
      "Milk",
      "Molluscs"
    ],
    "tags": [
      "octopus"
    ],
    "translations": {
      "fr": {
        "name": "Spaghettis Carbonara au Poulpe",
        "description": "Spaghettis 200g, Poulpe 90g, Parmesan 25g, Tomates séchées 15g, Œuf 5g, Huile d’Olive 5ml, Ail 5g, Sel 3g, Poivre 2g.",
        "nutrition": ""
      },
      "nl": {
        "name": "Spaghetti Carbonara met Octopus",
        "description": "Spaghetti 200g, Octopus 90g, Parmesan 25g, Sun-Dried Tomatoes 15g, Egg 5g, Olijfolie 5ml, Knoflook 5g, Zout 3g, Peper 2g.",
        "nutrition": ""
      },
      "en": {
        "name": "Spaghetti Carbonara with Octopus",
        "description": "Spaghetti 200g, Octopus 90g, Parmesan 25g, Sun-Dried Tomatoes 15g, Egg 5g, Olive Oil 5ml, Garlic 5g, Salt 3g, Pepper 2g.",
        "nutrition": ""
      },
      "ro": {
        "name": "Spaghette carbonara cu caracatiță",
        "description": "Spaghete 200g, Caracatita 90g, Parmezan 25g, Rosii uscate 15g, Ou 5g, Ulei de masline 5ml, Usturoi 5g, Sare 3g, Piper 2g.",
        "nutrition": ""
      }
    }
  },
  {
    "id": "la-pieuvre-de-pescobar-1700",
    "postId": "1700",
    "categoryId": "la-pieuvre-de-pescobar",
    "type": "food",
    "priceEur": 17,
    "priceFormatted": "17 €",
    "isVerifiedPrice": true,
    "weight": "350g",
    "image": "/images/catalog/wrap-caracatita.jpg",
    "allergens": [
      "Crustaceans",
      "Fish",
      "Milk",
      "Celery",
      "Mustard",
      "Molluscs"
    ],
    "tags": [
      "octopus",
      "shrimp"
    ],
    "translations": {
      "fr": {
        "name": "Wrap au poulpe et aux crevettes",
        "description": "Comprend une sauce Spicy Mayo offerte. Crevettes 70g, Tortilla wraps 70g, Poulpe 50g, Pommes de terre 50g, Sauce Spicy Mayo 50g (Mayonnaise, Sriracha), Sauce aioli 30g (Mayonnaise, Ail, Sel, Jus de citron frais), Fromage 20g, Salade mixte 10g.",
        "nutrition": ""
      },
      "nl": {
        "name": "Wrap with Octopus and Garnalen",
        "description": "Includes a Spicy Mayo sauce on the house. Garnalen 70g, Tortilla wraps 70g, Octopus 50g, Aardappelen 50g, Spicy Mayo sauce 50g (Mayonnaise, Sriracha), Aioli sauce 30g (Mayonnaise, Knoflook, Zout, Fresh Citroen juice), Cheese 20g, Mixed salad 10g.",
        "nutrition": ""
      },
      "en": {
        "name": "Wrap with octopus and shrimp",
        "description": "Includes a Spicy Mayo sauce on the house. Shrimp 70g, Tortilla wraps 70g, Octopus 50g, Potatoes 50g, Spicy Mayo sauce 50g (Mayonnaise, Sriracha), Aioli sauce 30g (Mayonnaise, Garlic, Salt, Fresh lemon juice), Cheese 20g, Mixed salad 10g.",
        "nutrition": ""
      },
      "ro": {
        "name": "Wrap cu caracatiță și creveți",
        "description": "Contine un Sos Spicy Mayo din partea casei. Creveți 70g, Tortila wraps 70g, Caracatiță 50g, Cartofi 50g, Sos Spicy Mayo 50g (Maioneza, Siracha), Sos Aioli 30g (Maioneza, Usturoi, Sare, Fresh de lamaie), Cascaval 20g, Salata mix 10g.",
        "nutrition": ""
      }
    }
  },
  {
    "id": "la-pieuvre-de-pescobar-1701",
    "postId": "1701",
    "categoryId": "la-pieuvre-de-pescobar",
    "type": "food",
    "priceEur": 14,
    "priceFormatted": "14 €",
    "isVerifiedPrice": true,
    "weight": "325g",
    "image": null,
    "allergens": [
      "Gluten",
      "Egg",
      "Fish",
      "Milk",
      "Mustard",
      "Molluscs"
    ],
    "tags": [
      "octopus"
    ],
    "translations": {
      "fr": {
        "name": "Poulpe Karaage",
        "description": "Riz 150g (Eau, Riz basmati, Sauce soja, Beurre, Poivre, Sel), Poulpe 100g, Mayonnaise 20g, Sriracha 15g, Sweet chilli 10g, Lait 10ml, Farine blanche 10g, Ail 5g, Flocons de piment 2g, Poivre 2g, Sel 1g.",
        "nutrition": ""
      },
      "nl": {
        "name": "Octopus Karaage",
        "description": "Rice 150g (Water, Basmati rice, Soy sauce, Boter, Peper, Zout), Octopus 100g, Mayonnaise 20g, Sriracha 15g, Sweet chilli 10g, Milk 10ml, White flour 10g, Knoflook 5g, Chili flakes 2g, Peper 2g, Zout 1g.",
        "nutrition": ""
      },
      "en": {
        "name": "Octopus Karaage",
        "description": "Rice 150g (Water, Basmati rice, Soy sauce, Butter, Pepper, Salt), Octopus 100g, Mayonnaise 20g, Sriracha 15g, Sweet chilli 10g, Milk 10ml, White flour 10g, Garlic 5g, Chili flakes 2g, Pepper 2g, Salt 1g.",
        "nutrition": ""
      },
      "ro": {
        "name": "Octopus Kaarage",
        "description": "Orez 150g (Apa, Orez basmati, Sos soia, Unt, Piper, Sare), Caracatita 100g, Maioneza 20g, Siracha 15g, Sweet chilli 10g, Lapte 10ml, Faina alba 10g, Usturoi 5g, Fulgi Chili 2g, Piper 2g, Sare 1g.",
        "nutrition": ""
      }
    }
  },
  {
    "id": "specialites-561",
    "postId": "561",
    "categoryId": "specialites",
    "type": "food",
    "priceEur": 28,
    "priceFormatted": "28 €",
    "isVerifiedPrice": true,
    "weight": "350g",
    "image": "/images/catalog/calamar-umplut-cu-creveti-taverna-racilor.jpg",
    "allergens": [
      "Crustaceans",
      "Fish",
      "Celery",
      "Mustard",
      "Molluscs"
    ],
    "tags": [
      "shrimp"
    ],
    "translations": {
      "fr": {
        "name": "Calamar farci aux crevettes",
        "description": "Calamar 180g, Crevettes 110g, Citron 25g, Salade Mixte 20g, Sauce Salade 10g (Huile d’Olive, Jus de Citron Frais, Sel, Moutarde, Miel Polyfloral), Huile d’Olive 5ml.",
        "nutrition": "Contains: (0E | 0,24g de sel | 0,71g de sucre) / 100g."
      },
      "nl": {
        "name": "Stuffed Inktvis (Calamari) with Garnalen",
        "description": "Inktvis (Calamari) 180g, Garnalen 110g, Citroen 25g, Mixed Salad 20g, Salad Dressing 10g (Olijfolie, Fresh Citroen Juice, Zout, Mustard, Polyfloral Honey), Olijfolie 5ml.",
        "nutrition": "Contains: (0E | 0.24g salt | 0.71g sugar) / 100g."
      },
      "en": {
        "name": "Stuffed Squid with Shrimp",
        "description": "Squid 180g, Shrimp 110g, Lemon 25g, Mixed Salad 20g, Salad Dressing 10g (Olive Oil, Fresh Lemon Juice, Salt, Mustard, Polyfloral Honey), Olive Oil 5ml.",
        "nutrition": "Contains: (0E | 0.24g salt | 0.71g sugar) / 100g."
      },
      "ro": {
        "name": "Calamar umplut cu creveți",
        "description": "Calamar 180g, Creveti 110g, Lamaie 25g, Salata mix 20g, Dressing Salata 10g (Ulei de masline, Fresh lamaie, Sare, Mustar, Miere Poliflora), Ulei de masline 5ml.",
        "nutrition": "Conține: (0E | 0.24g sare | 0.71g zahar)/100g."
      }
    }
  },
  {
    "id": "specialites-552",
    "postId": "552",
    "categoryId": "specialites",
    "type": "food",
    "priceEur": 25,
    "priceFormatted": "25 €",
    "isVerifiedPrice": true,
    "weight": "300g",
    "image": "/images/catalog/calamar-umplut-cu-feta-taverna-racilor.jpg",
    "allergens": [
      "Fish",
      "Milk",
      "Celery",
      "Mustard",
      "Molluscs"
    ],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Calamar farci à la feta",
        "description": "Calamar 180g, Fromage Feta 60g, Citron 25g, Salade Mixte 20g, Sauce Salade 10g (Huile d’Olive, Jus de Citron Frais, Sel, Moutarde, Miel Polyfloral), Huile d’Olive 5ml.",
        "nutrition": "Contains: (0E | 0,17g de sel | 0,72g de sucre) / 100g."
      },
      "nl": {
        "name": "Stuffed Inktvis (Calamari) with Feta",
        "description": "Inktvis (Calamari) 180g, Feta Cheese 60g, Citroen 25g, Mixed Salad 20g, Salad Dressing 10g (Olijfolie, Fresh Citroen Juice, Zout, Mustard, Polyfloral Honey), Olijfolie 5ml.",
        "nutrition": "Contains: (0E | 0.17g salt | 0.72g sugar) / 100g."
      },
      "en": {
        "name": "Stuffed Squid with Feta",
        "description": "Squid 180g, Feta Cheese 60g, Lemon 25g, Mixed Salad 20g, Salad Dressing 10g (Olive Oil, Fresh Lemon Juice, Salt, Mustard, Polyfloral Honey), Olive Oil 5ml.",
        "nutrition": "Contains: (0E | 0.17g salt | 0.72g sugar) / 100g."
      },
      "ro": {
        "name": "Calamar umplut cu feta",
        "description": "Calamar 180g, Branza Feta 60g, Lamaie 25g, Salata mix 20g, Dressing Salata 10g (Ulei de masline, Fresh lamaie, Sare, Mustar, Miere Poliflora), Ulei de masline 5ml.",
        "nutrition": "Conține: (0E | 0.17g sare | 0.72g zahar)/100g."
      }
    }
  },
  {
    "id": "specialites-563",
    "postId": "563",
    "categoryId": "specialites",
    "type": "food",
    "priceEur": 23,
    "priceFormatted": "23 €",
    "isVerifiedPrice": true,
    "weight": "320g",
    "image": "/images/catalog/taverna-racilor-37.jpg",
    "allergens": [
      "Crustaceans",
      "Fish",
      "Milk"
    ],
    "tags": [
      "shrimp"
    ],
    "translations": {
      "fr": {
        "name": "Crevettes en Sauce Douce Épicée",
        "description": "Crevettes 220g, Sweet Chilli 60g, Beurre 20g, Cognac 10ml, Huile d’Olive 9ml, Flocons de Piment 1g.",
        "nutrition": "Contains: (3E | 1,44g de sel | 15,7g de sucre) / 100g."
      },
      "nl": {
        "name": "Large Garnalen in Sweet & Spicy Sauce",
        "description": "Garnalen 220g, Sweet Chilli 60g, Boter 20g, Cognac 10ml, Olijfolie 9ml, Chili Flakes 1g.",
        "nutrition": "Contains: (3E | 1.44g salt | 15.7g sugar) / 100g."
      },
      "en": {
        "name": "Large Shrimp in Sweet & Spicy Sauce",
        "description": "Shrimp 220g, Sweet Chilli 60g, Butter 20g, Cognac 10ml, Olive Oil 9ml, Chili Flakes 1g.",
        "nutrition": "Contains: (3E | 1.44g salt | 15.7g sugar) / 100g."
      },
      "ro": {
        "name": "Creveți mari în sos dulce picant",
        "description": "Creveti 220g, Sweet chilli 60g, Unt 20 g, Coniac 10 ml, Ulei de masline 9ml, Fulgi Chili 1g.",
        "nutrition": "Conține: (3E | 1.44g sare | 15.7g zahar)/100g."
      }
    }
  },
  {
    "id": "specialites-562",
    "postId": "562",
    "categoryId": "specialites",
    "type": "food",
    "priceEur": 22,
    "priceFormatted": "22 €",
    "isVerifiedPrice": true,
    "weight": "240g",
    "image": "/images/catalog/calamar-la-gratar-bun-taverna-racilor.jpg",
    "allergens": [
      "Fish",
      "Celery",
      "Mustard",
      "Molluscs"
    ],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Calamar grillé",
        "description": "Calamar 180g, Citron 25g, Salade Mixte 20g, Sauce Salade 10g (Huile d’Olive, Jus de Citron Frais, Sel, Moutarde, Miel Polyfloral), Huile d’Olive 5ml.",
        "nutrition": "Contains: (0E | 0,01g de sel | 0,91g de sucre) / 100g."
      },
      "nl": {
        "name": "Gegrilde Inktvis (Calamari)",
        "description": "Inktvis (Calamari) 180g, Citroen 25g, Mixed Salad 20g, Salad Dressing 10g (Olijfolie, Fresh Citroen Juice, Zout, Mustard, Polyfloral Honey), Olijfolie 5ml.",
        "nutrition": "Contains: (0E | 0.01g salt | 0.91g sugar) / 100g."
      },
      "en": {
        "name": "Grilled Squid",
        "description": "Squid 180g, Lemon 25g, Mixed Salad 20g, Salad Dressing 10g (Olive Oil, Fresh Lemon Juice, Salt, Mustard, Polyfloral Honey), Olive Oil 5ml.",
        "nutrition": "Contains: (0E | 0.01g salt | 0.91g sugar) / 100g."
      },
      "ro": {
        "name": "Calamar la grătar",
        "description": "Calamar 180g, Lamaie 25g, Salata mix 20g, Dressing Salata 10g (Ulei de masline, Fresh lamaie, Sare, Mustar, Miere Poliflora), Ulei de masline 5ml.",
        "nutrition": "Conține: (0E | 0.01g sare | 0.91g zahar)/100g."
      }
    }
  },
  {
    "id": "poisson-569",
    "postId": "569",
    "categoryId": "poisson",
    "type": "food",
    "priceEur": 33,
    "priceFormatted": "33 €",
    "isVerifiedPrice": true,
    "weight": "490g",
    "image": "/images/catalog/taverna-racilor-108.jpg",
    "allergens": [
      "Fish",
      "Celery"
    ],
    "tags": [
      "fish"
    ],
    "translations": {
      "fr": {
        "name": "Turbot de la Mer Noire avec Polenta",
        "description": "Turbot 300g, Polenta 150g (Farine de Maïs, Lait, Beurre, Sel), Citron 25g, Huile d’Olive 10ml, Sel 3g, Poivre 2g.",
        "nutrition": "Contains: (0E | 0,2g de sel | 0,76g de sucre) / 100g."
      },
      "nl": {
        "name": "Zwarte Zee Tarbot with Polenta",
        "description": "Tarbot 300g, Polenta 150g (Cornmeal, Milk, Boter, Zout), Citroen 25g, Olijfolie 10ml, Zout 3g, Peper 2g.",
        "nutrition": "Contains: (0E | 0.2g salt | 0.76g sugar) / 100g."
      },
      "en": {
        "name": "Black Sea Turbot with Polenta",
        "description": "Turbot 300g, Polenta 150g (Cornmeal, Milk, Butter, Salt), Lemon 25g, Olive Oil 10ml, Salt 3g, Pepper 2g.",
        "nutrition": "Contains: (0E | 0.2g salt | 0.76g sugar) / 100g."
      },
      "ro": {
        "name": "Calcan din Marea Neagră cu mămăliguță",
        "description": "Calcan 300g, Mamaliguta 150g (Malai, Lapte, Unt, Sare g), Lamaie 25g, Ulei de masline 10ml, Sare 3g, Piper 2g.",
        "nutrition": "Conține: (0E | 0.2g sare | 0.76g zahar)/100g."
      }
    }
  },
  {
    "id": "poisson-570",
    "postId": "570",
    "categoryId": "poisson",
    "type": "food",
    "priceEur": 28,
    "priceFormatted": "28 €",
    "isVerifiedPrice": true,
    "weight": "340g",
    "image": "/images/catalog/dorada-taverna-racilor.jpg",
    "allergens": [
      "Fish",
      "Celery",
      "Mustard"
    ],
    "tags": [
      "fish"
    ],
    "translations": {
      "fr": {
        "name": "Dorade Grillée",
        "description": "Dorade 280g, Citron 25g, Salade Mixte 20g, Sauce Salade 8g (Huile d’Olive, Jus de Citron Frais, Sel, Moutarde, Miel Polyfloral), Huile d’Olive 5ml, Sel 1g, Poivre 1g.",
        "nutrition": "Contains: (0E | 0,02g de sel | 0,66g de sucre) / 100g."
      },
      "nl": {
        "name": "Gegrilde Dorade (Zeebrasem)",
        "description": "Gilt-head Bream 280g, Citroen 25g, Mixed Salad 20g, Salad Dressing 8g (Olijfolie, Fresh Citroen Juice, Zout, Mustard, Polyfloral Honey), Olijfolie 5ml, Zout 1g, Peper 1g.",
        "nutrition": "Contains: (0E | 0.02g salt | 0.66g sugar) / 100g."
      },
      "en": {
        "name": "Grilled Sea Bream",
        "description": "Gilt-head Bream 280g, Lemon 25g, Mixed Salad 20g, Salad Dressing 8g (Olive Oil, Fresh Lemon Juice, Salt, Mustard, Polyfloral Honey), Olive Oil 5ml, Salt 1g, Pepper 1g.",
        "nutrition": "Contains: (0E | 0.02g salt | 0.66g sugar) / 100g."
      },
      "ro": {
        "name": "Doradă la grătar",
        "description": "Dorada 280g , Lamaie 25g, Salata mix 20g, Dressing Salata 8g (Ulei de masline, Fresh lamaie, Sare, Mustar, Miere Poliflora), Ulei de masline 5ml, Sare 1g, Piper 1g.",
        "nutrition": "Conține: (0E | 0.02g sare | 0.66g zahar)/100g."
      }
    }
  },
  {
    "id": "poisson-706",
    "postId": "706",
    "categoryId": "poisson",
    "type": "food",
    "priceEur": 25,
    "priceFormatted": "25 €",
    "isVerifiedPrice": true,
    "weight": "500g",
    "image": "/images/catalog/redfish-taverna-racilpr.jpg",
    "allergens": [
      "Fish",
      "Celery",
      "Mustard"
    ],
    "tags": [
      "fish"
    ],
    "translations": {
      "fr": {
        "name": "Redfish Grillé",
        "description": "Redfish 440g, Citron 25g, Salade mixte 20g, Huile d’olive 7ml, Sauce salade 5g (Huile d’olive, Citron frais, Sel, Moutarde, Miel polyfloral), Sel 2g, Poivre 1g.",
        "nutrition": ""
      },
      "nl": {
        "name": "Gegrilde Redfish",
        "description": "Redfish 440g, Citroen 25g, Mixed salad 20g, Olijfolie 7ml, Salad dressing 5g (Olijfolie, Fresh Citroen, Zout, Mustard, Polyfloral honey), Zout 2g, Peper 1g.",
        "nutrition": ""
      },
      "en": {
        "name": "Grilled Redfish",
        "description": "Redfish 440g, Lemon 25g, Mixed salad 20g, Olive oil 7ml, Salad dressing 5g (Olive oil, Fresh lemon, Salt, Mustard, Polyfloral honey), Salt 2g, Pepper 1g.",
        "nutrition": ""
      },
      "ro": {
        "name": "Redfish la gratar",
        "description": "Redfish 440g, Lamaie 25g, Salata mix 20g, Ulei de masline 7ml, Dressing Salata 5g (Ulei de masline, Fresh lamaie, Sare, Mustar, Miere Poliflora), Sare 2g, Piper 1g.",
        "nutrition": ""
      }
    }
  },
  {
    "id": "poisson-1667",
    "postId": "1667",
    "categoryId": "poisson",
    "type": "food",
    "priceEur": 19,
    "priceFormatted": "19 €",
    "isVerifiedPrice": true,
    "weight": "300g",
    "image": "/images/catalog/somon-la-gratar.jpg",
    "allergens": [
      "Fish",
      "Celery"
    ],
    "tags": [
      "fish"
    ],
    "translations": {
      "fr": {
        "name": "Saumon grillé",
        "description": "Saumon 250g, Citron 25g, Salade Mixte 20g, Huile d’Olive 1ml, Sel 1g, Miel Polyfloral 1g, Poivre 1g, Jus de Citron Frais 1g.",
        "nutrition": "Contains: (0E | 0,56 g de sel | 0,63 g de sucres)/100 g."
      },
      "nl": {
        "name": "Gegrilde Zalm",
        "description": "Zalm 250g, Citroen 25g, Mixed Salad 20g, Olijfolie 1ml, Zout 1g, Polyfloral Honey 1g, Peper 1g, Fresh Citroen 1g.",
        "nutrition": "Contains: (0E | 0.56g salt | 0.63g sugars)/100g."
      },
      "en": {
        "name": "Grilled salmon",
        "description": "Salmon 250g, Lemon 25g, Mixed Salad 20g, Olive Oil 1ml, Salt 1g, Polyfloral Honey 1g, Pepper 1g, Fresh Lemon 1g.",
        "nutrition": "Contains: (0E | 0.56g salt | 0.63g sugars)/100g."
      },
      "ro": {
        "name": "Somon la gratar",
        "description": "Somon 250g, Lamaie 25g, Salata mix 20g, Ulei de masline 1ml, Sare 1g, Miere Poliflora 1g, Piper 1g, Fresh lamaie 1g.",
        "nutrition": "Conține: (0E | 0.56g sare | 0.63g zaharuri)/100g."
      }
    }
  },
  {
    "id": "poisson-543",
    "postId": "543",
    "categoryId": "poisson",
    "type": "food",
    "priceEur": 14,
    "priceFormatted": "14 €",
    "isVerifiedPrice": true,
    "weight": "250g",
    "image": "/images/catalog/taverna-racilor-15.jpg",
    "allergens": [
      "Gluten",
      "Fish"
    ],
    "tags": [
      "fish"
    ],
    "translations": {
      "fr": {
        "name": "Anchois de la Mer Noire",
        "description": "Anchois 210g, Citron 25g, Farine 12g, Sel 3g.",
        "nutrition": "Contains: (0E | 0g de sel | 0,74g de sucre) / 100g."
      },
      "nl": {
        "name": "Black Sea Anchovy",
        "description": "Anchovy 210g, Citroen 25g, Flour 12g, Zout 3g.",
        "nutrition": "Contains: (0E | 0g salt | 0.74g sugar) / 100g."
      },
      "en": {
        "name": "Black Sea Anchovy",
        "description": "Anchovy 210g, Lemon 25g, Flour 12g, Salt 3g.",
        "nutrition": "Contains: (0E | 0g salt | 0.74g sugar) / 100g."
      },
      "ro": {
        "name": "Hamsie Marea Neagră",
        "description": "Hamsie 210g, Lamaie 25g, Faina 12g Sare 3g.",
        "nutrition": "Conține: (0E | 0g sare | 0.74g zahar)/100g."
      }
    }
  },
  {
    "id": "plateaux-680",
    "postId": "680",
    "categoryId": "plateaux",
    "type": "food",
    "priceEur": 184,
    "priceFormatted": "184 €",
    "isVerifiedPrice": true,
    "weight": "4000g",
    "image": "/images/catalog/platou-paul-taverna-racilor.jpg",
    "allergens": [
      "Gluten",
      "Crustaceans",
      "Egg",
      "Fish",
      "Milk",
      "Molluscs"
    ],
    "tags": [
      "octopus",
      "platter",
      "shrimp"
    ],
    "translations": {
      "fr": {
        "name": "Plateau de fruits de mer de Paul (4 personnes)",
        "description": "+ 1 bouteille de vin Aerosoli Blanc/Rosé Poisson rouge 900g, Moules 550g, Crevettes 550g, Poulpe 360g, Tentacules de calmar 360g, Viande de palourdes 300g, Homard épineux 280g, Calmar 200g, Citron 150g, Filet de cabillaud 90g, Sauce panure 90g (Œuf, Lait, FARINE, Huile de tournesol, Amidon, Poivre, Sel, Citron), Vin blanc de table 60ml, Huile d’olive 50ml, Farine 40g, Ail 12g, Sel 5g, Flocons de piment 5g, Poivre 3g.",
        "nutrition": "Contains: (0E | 0,53g sel | 0,22g sucre)/100g."
      },
      "nl": {
        "name": "Paul’s Seafood Schotel (4 persons)",
        "description": "+ 1 fles Aerosoli White/Rosé Red Fish 900g, Mosselen 550g, Garnalen 550g, Octopus 360g, Inktvistentakels 360g, Venusschelpenvlees 300g, Spiny Kreeft 280g, Inktvis (Calamari) 200g, Citroen 150g, Kabeljauwfilet 90g, Batter sauce 90g (Egg, Milk, FLOUR, Sunflower oil, Starch, Peper, Zout, Citroen), White table wine 60ml, Olijfolie 50ml, Flour 40g, Knoflook 12g, Zout 5g, Chili flakes 5g, Peper 3g.",
        "nutrition": "Contains: (0E | 0.53g salt | 0.22g sugar)/100g."
      },
      "en": {
        "name": "Paul’s Seafood Platter (4 persons)",
        "description": "+ 1 bottle of Aerosoli White/Rosé Red Fish 900g, Mussels 550g, Shrimp 550g, Octopus 360g, Squid tentacles 360g, Clam meat 300g, Spiny lobster 280g, Squid 200g, Lemon 150g, Cod fillet 90g, Batter sauce 90g (Egg, Milk, FLOUR, Sunflower oil, Starch, Pepper, Salt, Lemon), White table wine 60ml, Olive oil 50ml, Flour 40g, Garlic 12g, Salt 5g, Chili flakes 5g, Pepper 3g.",
        "nutrition": "Contains: (0E | 0.53g salt | 0.22g sugar)/100g."
      },
      "ro": {
        "name": "Platou Paul's Seafood (4 persoane)",
        "description": "+1 sticlă Aerosoli Alb/Rose. Red Fish 900g, Scoici 550g, Creveti 550g, Caracatita 360g, Tentacule de calamar 360g, Carne de scoici 300g, Homar spinos 280g, Calamar 200g, Lamaie 150g, File de cod 90g, Sos paneuri 90g(Ou, Lapte, FAINA, Ulei floarea soarelui, Amidon, Piper, Sare, Lamaie ) Vin alb de masa 60ml, Ulei de masline 50ml, Faina 40g, Usturoi 12g, Sare 5g, Fulgi Chili 5g, Piper 3g.",
        "nutrition": "Conține: (0E | 0.53g sare | 0.22g zahar)/100g."
      }
    }
  },
  {
    "id": "plateaux-1653",
    "postId": "1653",
    "categoryId": "plateaux",
    "type": "food",
    "priceEur": 184,
    "priceFormatted": "184 €",
    "isVerifiedPrice": true,
    "weight": "5000g",
    "image": "/images/catalog/topul-de-pe-lume-platter-4-person-1.jpg",
    "allergens": [
      "Gluten",
      "Crustaceans",
      "Egg",
      "Fish",
      "Milk",
      "Molluscs"
    ],
    "tags": [
      "octopus",
      "platter",
      "shrimp",
      "featured"
    ],
    "translations": {
      "fr": {
        "name": "Plateau Géant \"Le Sommet du Monde\" by Pescobar (4–6 personnes)",
        "description": "+ 1 bouteille Aerosoli Blanc/Rosé. Crevettes Black Tiger 800g, Sébaste 900g, Crevettes 600g, Moules 500g, Homard 350g, Poulpe 360g, Asperges 300g, Polenta 300g (Farine de maïs, Lait, Beurre, Sel), Pommes de terre 200g, Calmar 180g, Citron 150g, Chair de moules 100g, Vin Blanc de Table 90ml, Beurre 50g, Huile d’Olive 40ml, Sauce panure 40g (Œuf, Lait, Farine, Huile de tournesol, Amidon, Poivre, Sel), Ail 20g, Sel 10g, Poivre 7g, Thym frais 2g, Flocons de Chili 1g.",
        "nutrition": "Contains: (0E | 0,51g de sel | 0,22g de sucres) / 100g."
      },
      "nl": {
        "name": "Gigant Schotel \"Top of the World\" by Pescobar (4–6 persons)",
        "description": "+ 1 Aerosoli White/Rosé bottle. Black Tiger Garnalen 800g, Redfish 900g, Garnalen 600g, Mosselen 500g, Kreeft 350g, Octopus 360g, Asparagus 300g, Polenta 300g (Cornmeal, Milk, Boter, Zout), Aardappelen 200g, Inktvis (Calamari) 180g, Citroen 150g, Mosselvlees 100g, Table Witte Wijn 90ml, Boter 50g, Olijfolie 40ml, Breading Sauce 40g (Egg, Milk, Flour, Sunflower Oil, Starch, Peper, Zout), Knoflook 20g, Zout 10g, Peper 7g, Fresh Thyme 2g, Chili Flakes 1g.",
        "nutrition": "Contains: (0E | 0.51g salt | 0.22g sugars) / 100g."
      },
      "en": {
        "name": "Gigant Platter \"Top of the World\" by Pescobar (4–6 persons)",
        "description": "+ 1 Aerosoli White/Rosé bottle. Black Tiger Shrimp 800g, Redfish 900g, Shrimp 600g, Mussels 500g, Lobster 350g, Octopus 360g, Asparagus 300g, Polenta 300g (Cornmeal, Milk, Butter, Salt), Potatoes 200g, Squid 180g, Lemon 150g, Mussel Meat 100g, Table White Wine 90ml, Butter 50g, Olive Oil 40ml, Breading Sauce 40g (Egg, Milk, Flour, Sunflower Oil, Starch, Pepper, Salt), Garlic 20g, Salt 10g, Pepper 7g, Fresh Thyme 2g, Chili Flakes 1g.",
        "nutrition": "Contains: (0E | 0.51g salt | 0.22g sugars) / 100g."
      },
      "ro": {
        "name": "Platou Gigant \"Topul de pe lume\" by Pescobar (4-6 persoane)",
        "description": "+ 1 sticlă Aerosoli Alb/Rose. Creveți black Tiger 800g, Redfish 900g, Creveti 600g, Scoici 500g, Homar 350g, Caracatita 360g, Sparanghel 300g, Mamaliguta 300g(Malai, Lapte, Unt, Sare), Cartofi 200g, Calamar 180g, Lamaie 150g, Carne de scoici 100g, Vin alb de masa 90ml, Unt 50g, Ulei de masline 40ml, Sos paneuri 40g(Ou, Lapte, Faina, Ulei floarea soarelui, Amidon, Piper, Sare), Usturoi 20g, Sare 10g, Piper 7g, Cimbru verde 2g, Fulgi Chili 1g.",
        "nutrition": "Conține: (0E | 0.51g sare | 0.22g zaharuri)/100g."
      }
    }
  },
  {
    "id": "plateaux-681",
    "postId": "681",
    "categoryId": "plateaux",
    "type": "food",
    "priceEur": 164,
    "priceFormatted": "164 €",
    "isVerifiedPrice": true,
    "weight": "2200g",
    "image": "/images/catalog/platou-mixt-grill-4-pers-taverna-racilor.jpg",
    "allergens": [
      "Crustaceans",
      "Fish",
      "Molluscs"
    ],
    "tags": [
      "platter",
      "shrimp",
      "fish"
    ],
    "translations": {
      "fr": {
        "name": "Plateau Mixte Grillades (4–6 personnes)",
        "description": "+ 1 bouteille Aerosoli Blanc/Rosé. Dorade 560g, Crevettes 440g, Tentacules de calmar 360g, Moules 360g, Calmar 360g, Citron 100g, Huile d’Olive 20ml.",
        "nutrition": "Contains: (0E | 1,27g sel | 0,37g sucre)/100g."
      },
      "nl": {
        "name": "Mixed Grill Schotel (4–6 persons)",
        "description": "+ 1 Aerosoli White/Rosé bottle. Gilt-head Bream 560g, Garnalen 440g, Inktvistentakels 360g, Mosselen 360g, Inktvis (Calamari) 360g, Citroen 100g, Olijfolie 20ml.",
        "nutrition": "Contains: (0E | 1.27g salt | 0.37g sugar)/100g."
      },
      "en": {
        "name": "Mixed Grill Platter (4–6 persons)",
        "description": "+ 1 Aerosoli White/Rosé bottle. Gilt-head Bream 560g, Shrimp 440g, Squid Tentacles 360g, Mussels 360g, Squid 360g, Lemon 100g, Olive Oil 20ml.",
        "nutrition": "Contains: (0E | 1.27g salt | 0.37g sugar)/100g."
      },
      "ro": {
        "name": "Platou Mixt Grill (4-6 persoane)",
        "description": "+ 1 sticlă Aerosoli Alb/Rose. Dorada 560g, Creveti 440g, Tentacule calamar 360g, Scoici 360g, Calamar 360g, Lamaie 100g, Ulei de masline 20ml.",
        "nutrition": "Conține: (0E | 1.27g sare | 0.37g zahar)/100g."
      }
    }
  },
  {
    "id": "plateaux-1684",
    "postId": "1684",
    "categoryId": "plateaux",
    "type": "food",
    "priceEur": 148,
    "priceFormatted": "148 €",
    "isVerifiedPrice": true,
    "weight": "4000g",
    "image": "/images/catalog/gipsy-king-platter.jpg",
    "allergens": [
      "Gluten",
      "Crustaceans",
      "Egg",
      "Fish",
      "Milk",
      "Molluscs"
    ],
    "tags": [
      "octopus",
      "platter",
      "shrimp",
      "fish"
    ],
    "translations": {
      "fr": {
        "name": "Plateau “Gipsy King” (4–6 personnes)",
        "description": "+ 1 bouteille Aerosoli Blanc/Rosé. Crevettes 850g, Dorade 650g, Poulpe 550g, Calmar 420g, Viande de palourdes 400g, Moules 300g, Riz arborio 200g, Sauce tomate 160g, Citron 150g, Filet de cabillaud 100g, Vin blanc de table 80ml, Huile d’olive 30ml, Oignon 30g, Sauce panure 30g (Œuf, Lait, Farine, Huile de tournesol, Amidon, Poivre, Sel), Ail 15g, Beurre 15g, Sel 10g, Poivre 7g, Curcuma 3g.",
        "nutrition": "Contains: (0E | 0,66 g sel | 0,27 g sucres)/100g."
      },
      "nl": {
        "name": "Schotel “Gipsy King” (4–6 persons)",
        "description": "+ 1 bottle Aerosoli White/Rosé. Garnalen 850g, Gilt-head bream 650g, Octopus 550g, Inktvis (Calamari) 420g, Venusschelpenvlees 400g, Mosselen 300g, Arborio rice 200g, Tomatensaus 160g, Citroen 150g, Kabeljauwfilet 100g, White table wine 80ml, Olijfolie 30ml, Onion 30g, Batter sauce 30g (Egg, Milk, Flour, Sunflower oil, Starch, Peper, Zout), Knoflook 15g, Boter 15g, Zout 10g, Peper 7g, Turmeric - curcuma 3g.",
        "nutrition": "Contains: (0E | 0.66 g salt | 0.27 g sugars)/100g."
      },
      "en": {
        "name": "Platter “Gipsy King” (4–6 persons)",
        "description": "+ 1 bottle Aerosoli White/Rosé. Shrimp 850g, Gilt-head bream 650g, Octopus 550g, Squid 420g, Clam meat 400g, Mussels 300g, Arborio rice 200g, Tomato sauce 160g, Lemon 150g, Cod fillet 100g, White table wine 80ml, Olive oil 30ml, Onion 30g, Batter sauce 30g (Egg, Milk, Flour, Sunflower oil, Starch, Pepper, Salt), Garlic 15g, Butter 15g, Salt 10g, Pepper 7g, Turmeric - curcuma 3g.",
        "nutrition": "Contains: (0E | 0.66 g salt | 0.27 g sugars)/100g."
      },
      "ro": {
        "name": "Ptatou Gipsy King (4-6 persoane)",
        "description": "+1 sticlă Aerosoli Alb/Rose. Creveti 850g, Dorada 650g, Caracatita 550g, Calamar 420g, Carne de scoici 400g, Scoici 300g, Orez arborio 200g, Sos de rosii 160g,Lamaie 150g, File de cod 100g, Vin alb de masa 80ml, Ulei de masline 30ml, Ceapa 30g, Sos paneuri 30g (Ou, Lapte, Faina, Ulei floarea soarelui, Amidon, Piper, Sare), Usturoi 15g, Unt 15g, Sare 10g, Piper 7g, Turmeric - curcuma 3g.",
        "nutrition": "Conține: (0E | 0.66g sare | 0.27g zaharuri)/100g."
      }
    }
  },
  {
    "id": "plateaux-2246",
    "postId": "2246",
    "categoryId": "plateaux",
    "type": "food",
    "priceEur": 140,
    "priceFormatted": "140 €",
    "isVerifiedPrice": true,
    "weight": "2100g",
    "image": "/images/catalog/platou-wow.jpg",
    "allergens": [
      "Gluten",
      "Crustaceans",
      "Egg",
      "Fish",
      "Milk",
      "Molluscs"
    ],
    "tags": [
      "octopus",
      "platter",
      "shrimp"
    ],
    "translations": {
      "fr": {
        "name": "Plateau \"Wow\" (4 personnes)",
        "description": "+1 bouteille de Vin Aerosoli Blanc/Rosé. Pommes de terre 440g, Crevettes 400g, Poulpe 400g, Moules 300g, Calmar 120g, Chair de moules 100g, Vin Blanc de Table 100ml, Filet de cabillaud 55g, Sauce Chimichurri 50g (Poivron, Huile d’Olive, Persil frais, Oignon, Ail, Sel, Flocons de Chili, Jus de citron frais), Farine 40g, Sauce panure 40g (Œuf, Lait, Farine, Huile de tournesol, Amidon, Poivre, Sel), Huile d’Olive 20ml, Ail 20g, Beurre 5g, Sel 5g, Paprika doux 2g, Poivre 2g, Flocons de Chili 1g.",
        "nutrition": ""
      },
      "nl": {
        "name": "Schotel \"Wow\" (4 persons)",
        "description": "+1 fles Aerosoli White/Rosé Wine. Aardappelen 440g, Garnalen 400g, Octopus 400g, Mosselen 300g, Inktvis (Calamari) 120g, Mosselvlees 100g, Table Witte Wijn 100ml, Kabeljauwfilet 55g, Chimichurri Sauce 50g (Bell Peper, Olijfolie, Fresh Parsley, Onion, Knoflook, Zout, Chili Flakes, Fresh Citroen Juice), Flour 40g, Breading Sauce 40g (Egg, Milk, Flour, Sunflower Oil, Starch, Peper, Zout), Olijfolie 20ml, Knoflook 20g, Boter 5g, Zout 5g, Sweet Paprika 2g, Peper 2g, Chili Flakes 1g.",
        "nutrition": ""
      },
      "en": {
        "name": "Platter \"Wow\" (4 persons)",
        "description": "+1 bottle of Aerosoli White/Rosé Wine. Potatoes 440g, Shrimp 400g, Octopus 400g, Mussels 300g, Squid 120g, Mussel Meat 100g, Table White Wine 100ml, Cod Fillet 55g, Chimichurri Sauce 50g (Bell Pepper, Olive Oil, Fresh Parsley, Onion, Garlic, Salt, Chili Flakes, Fresh Lemon Juice), Flour 40g, Breading Sauce 40g (Egg, Milk, Flour, Sunflower Oil, Starch, Pepper, Salt), Olive Oil 20ml, Garlic 20g, Butter 5g, Salt 5g, Sweet Paprika 2g, Pepper 2g, Chili Flakes 1g.",
        "nutrition": ""
      },
      "ro": {
        "name": "Platou \"Wow\" (4 persoane)",
        "description": "+1 sticlă de Vin Aerosoli Alb/Rose. Cartofi 440g, Creveti 400g, Caracatita 400 g, Scoici 300g , Calamar 120g, Carne de scoici 100 g, Vin alb de masa 100ml, File de cod 55g,Sos Chimichurri 50g (Ardei gras, Ulei de masline, Patrunjel verde, Ceapa, Usturoi, Sare, Fulgi Chili, Fresh de lamaie), Faina 40g, Sos paneuri 40g (Ou, Lapte, Faina, Ulei floarea soarelui, Amidon, Piper, Sare), Ulei de masline 20ml, Usturoi 20g, Unt 5g, Sare 5g, Boia dulce 2g, Piper 2g, Fulgi Chili 1g.",
        "nutrition": ""
      }
    }
  },
  {
    "id": "plateaux-687",
    "postId": "687",
    "categoryId": "plateaux",
    "type": "food",
    "priceEur": 134,
    "priceFormatted": "134 €",
    "isVerifiedPrice": true,
    "weight": "950g",
    "image": "/images/catalog/caracatita-intreaga-taverna-racilor.jpg",
    "allergens": [
      "Fish",
      "Molluscs"
    ],
    "tags": [
      "octopus",
      "platter",
      "featured"
    ],
    "translations": {
      "fr": {
        "name": "Poulpe du Entier Grillé",
        "description": "+1 bouteille de Vin Aerosoli Blanc/Rosé. Poulpe 850g, Citron 50g, Sauce Chimichurri 50g (Poivron, Huile d’olive, Persil frais, Oignon, Ail, Sel, Flocons de piment, Jus de citron frais).",
        "nutrition": "Contains: (0E | 0,4g de sel | 0,07g de sucre) / 100g."
      },
      "nl": {
        "name": "Hele Gegrilde Octopus (+ 1 fles Aerosoli Wijn)",
        "description": "+1 fles Aerosoli White/Rosé Wine. Octopus 850g, Citroen 50g, Chimichurri sauce 50g (Bell Peper, Olijfolie, Fresh parsley, Onion, Knoflook, Zout, Chili flakes, Fresh Citroen juice).",
        "nutrition": "Contains: (0E | 0.4g salt | 0.07g sugar) / 100g."
      },
      "en": {
        "name": "Whole Grilled Octopus",
        "description": "+1 bottle of Aerosoli White/Rosé Wine. Octopus 850g, Lemon 50g, Chimichurri sauce 50g (Bell pepper, Olive oil, Fresh parsley, Onion, Garlic, Salt, Chili flakes, Fresh lemon juice).",
        "nutrition": "Contains: (0E | 0.4g salt | 0.07g sugar) / 100g."
      },
      "ro": {
        "name": "Caracatiță întreagă la grătar",
        "description": "+1 sticlă de Vin Aerosoli Alb/Rose. Caracatita 850g, Lamaie 50g, Sos Chimichurri 50g (Ardei gras, Ulei de masline, Patrunjel verde, Ceapa, Usturoi, Sare, Fulgi Chili, Fresh de lamaie).",
        "nutrition": "Conține: (0E | 0.4g sare | 0.07g zaharuri)/100g."
      }
    }
  },
  {
    "id": "plateaux-685",
    "postId": "685",
    "categoryId": "plateaux",
    "type": "food",
    "priceEur": 124,
    "priceFormatted": "124 €",
    "isVerifiedPrice": true,
    "weight": "1500g",
    "image": "/images/catalog/love-shrimp-4-pers-taverna-racilor.jpg",
    "allergens": [
      "Gluten",
      "Crustaceans",
      "Egg",
      "Fish",
      "Soya",
      "Milk",
      "Mustard"
    ],
    "tags": [
      "platter",
      "shrimp"
    ],
    "translations": {
      "fr": {
        "name": "Plateau Shrimp Love (4 personnes)",
        "description": "+1 bouteille de vin Aerosoli Blanc/Rosé Crevettes 880g, Riz 400g (Eau, Riz basmati, Sauce soja, Beurre, Curcuma, Poivre, Sel), Citron 100g, Sauce panure 40g (Œuf, Lait, Farine, Huile de tournesol, Amidon, Poivre, Sel), Mayonnaise 35g, Farine Tempura 20g, Chapelure Panko 20g, Poivre 5g.",
        "nutrition": "Contains: (1E | 0,98g sel | 0,33g sucre)/100g."
      },
      "nl": {
        "name": "Garnalen Love Schotel (4 persons)",
        "description": "+1 fles Aerosoli White/Rosé Garnalen 880g, Rice 400g (Water, Basmati rice, Soy sauce, Boter, Turmeric, Peper, Zout), Citroen 100g, Batter sauce 40g (Egg, Milk, Flour, Sunflower oil, Starch, Peper, Zout), Mayonnaise 35g, Tempura flour 20g, Panko breadcrumbs 20g, Peper 5g.",
        "nutrition": "Contains: (1E | 0.98g salt | 0.33g sugar)/100g."
      },
      "en": {
        "name": "Shrimp Love Platter (4 persons)",
        "description": "+1 bottle of Aerosoli White/Rosé Shrimp 880g, Rice 400g (Water, Basmati rice, Soy sauce, Butter, Turmeric, Pepper, Salt), Lemon 100g, Batter sauce 40g (Egg, Milk, Flour, Sunflower oil, Starch, Pepper, Salt), Mayonnaise 35g, Tempura flour 20g, Panko breadcrumbs 20g, Pepper 5g.",
        "nutrition": "Contains: (1E | 0.98g salt | 0.33g sugar)/100g."
      },
      "ro": {
        "name": "Platou Shrimp Love ( 4 persoane )",
        "description": "+1 sticlă Aerosoli Alb/Rose. Creveti 880g, Orez 400g (Apa, Orez basmati, Sos soia, Unt, Turmeric, Piper, Sare), Lamaie 100g, Sos paneuri 40g(Ou, Lapte, Faina, Ulei floarea soarelui, Amidon, Piper, Sare), Maioneza 35g, Faina Tempura 20g, Pesmet Panko 20g, Piper 5g.",
        "nutrition": "Conține: (1E | 0.98g sare | 0.33g zahar)/100g."
      }
    }
  },
  {
    "id": "plateaux-579",
    "postId": "579",
    "categoryId": "plateaux",
    "type": "food",
    "priceEur": 124,
    "priceFormatted": "124 €",
    "isVerifiedPrice": true,
    "weight": "1800g",
    "image": "/images/catalog/platou-gest-by-pescobar-taverna-racilor.jpg",
    "allergens": [
      "Crustaceans",
      "Fish",
      "Molluscs"
    ],
    "tags": [
      "octopus",
      "platter",
      "shrimp",
      "featured"
    ],
    "translations": {
      "fr": {
        "name": "Plateau Pescobar (2–3 personnes)",
        "description": "+ 1 Bouteille de vin blanc/rosé Aerosoli Moules 500g, Crevettes 360g, Langouste 280g, Calmar 180g, Poulpe 180g, Viande de moules 100g, Citron 100g, Vin blanc de table 60ml, Huile d’olive 20ml, Ail 10g, Sel 5g, Poivre 3g, Flocons de piment 2g.",
        "nutrition": "Contains: (0E | 0,25g de sel | 0,28g de sucre) / 100g."
      },
      "nl": {
        "name": "Pescobar Schotel (2–3 persons)",
        "description": "+ 1 fles Aerosoli White/Rosé Wine Mosselen 500g, Garnalen 360g, Spiny Kreeft 280g, Inktvis (Calamari) 180g, Octopus 180g, Mosselvlees 100g, Citroen 100g, Table Witte Wijn 60ml, Olijfolie 20ml, Knoflook 10g, Zout 5g, Peper 3g, Chili flakes 2g.",
        "nutrition": "Contains: (0E | 0.25g salt | 0.28g sugar) / 100g."
      },
      "en": {
        "name": "Pescobar Platter (2–3 persons)",
        "description": "+ 1 Bottle of Aerosoli White/Rosé Wine Mussels 500g, Shrimps 360g, Spiny lobster 280g, Squid 180g, Octopus 180g, Mussel meat 100g, Lemon 100g, Table white wine 60ml, Olive oil 20ml, Garlic 10g, Salt 5g, Pepper 3g, Chili flakes 2g.",
        "nutrition": "Contains: (0E | 0.25g salt | 0.28g sugar) / 100g."
      },
      "ro": {
        "name": "Platou Pescobar (2-3 persoane)",
        "description": "+ 1 sticlă Aerosoli Alb/Rose. Scoici 500g, Creveti 360g, Homar spinos 280g, Calamar 180g, Caracatita 180g, Carne de scoici 100g, Lamaie 100g, Vin alb de masa 60ml, Ulei de masline 20ml, Usturoi 10g, Sare 5g, Piper 3g, Fulgi Chili 2g.",
        "nutrition": "Conține: (0E | 0.25g sare | 0.28g zahar)/100g."
      }
    }
  },
  {
    "id": "plateaux-1683",
    "postId": "1683",
    "categoryId": "plateaux",
    "type": "food",
    "priceEur": 99,
    "priceFormatted": "99 €",
    "isVerifiedPrice": true,
    "weight": "2100g",
    "image": "/images/catalog/paul-platter-2-person.jpg",
    "allergens": [
      "Gluten",
      "Crustaceans",
      "Egg",
      "Fish",
      "Milk",
      "Molluscs"
    ],
    "tags": [
      "octopus",
      "platter",
      "shrimp"
    ],
    "translations": {
      "fr": {
        "name": "Plateau “Paul’s Seafood” (2–3 personnes)",
        "description": "+ 1 bouteille Aerosoli Blanc/Rosé. Rouget 450g, Homard épineux 280g, Crevettes 280g, Moules 250g, Poulpe 180g, Tentacules de calmar 180g, Viande de palourdes 145g, Calmar 100g, Citron 100g, Filet de cabillaud 45g, Vin blanc de table 30ml, Huile d’olive 25ml, Sauce panure 25g (Œuf, Lait, Farine, Huile de tournesol, Amidon, Poivre, Sel), Ail 6g, Sel 2g, Poivre 1g, Flocons de piment 1g.",
        "nutrition": "Contains: (0E | 0,63 g sel | 0,28 g sucres)/100g."
      },
      "nl": {
        "name": "Schotel “Paul’s Seafood” (2–3 persons)",
        "description": "+ 1 bottle Aerosoli White/Rosé. Redfish 450g, Spiny Kreeft 280g, Garnalen 280g, Mosselen 250g, Octopus 180g, Inktvistentakels 180g, Venusschelpenvlees 145g, Inktvis (Calamari) 100g, Citroen 100g, Kabeljauwfilet 45g, White table wine 30ml, Olijfolie 25ml, Batter sauce 25g (Egg, Milk, Flour, Sunflower oil, Starch, Peper, Zout), Knoflook 6g, Zout 2g, Peper 1g, Chili flakes 1g.",
        "nutrition": "Contains: (0E | 0.63 g salt | 0.28 g sugars)/100g."
      },
      "en": {
        "name": "Platter “Paul’s Seafood” (2–3 persons)",
        "description": "+ 1 bottle Aerosoli White/Rosé. Redfish 450g, Spiny lobster 280g, Shrimp 280g, Mussels 250g, Octopus 180g, Squid tentacles 180g, Clam meat 145g, Squid 100g, Lemon 100g, Cod fillet 45g, White table wine 30ml, Olive oil 25ml, Batter sauce 25g (Egg, Milk, Flour, Sunflower oil, Starch, Pepper, Salt), Garlic 6g, Salt 2g, Pepper 1g, Chili flakes 1g.",
        "nutrition": "Contains: (0E | 0.63 g salt | 0.28 g sugars)/100g."
      },
      "ro": {
        "name": "Platou Paul's Seafood (2-3 persoane)",
        "description": "+1 sticlă Aerosoli Alb/Rose. Redfish 450g, Homar spinos 280g, Creveti 280g, Scoici 250g, Caracatita 180g, Tentacule calamar 180g, Carne de scoici 145g, Calamar 100g, Lamaie 100g, File de cod 45g, Vin alb de masa 30ml, Ulei de masline 25ml, Sos paneuri 25g(Ou, Lapte, Faina, Ulei floarea soarelui, Amidon, Piper, Sare), Usturoi 6g, Sare 2g, Piper 1g, Fulgi Chili 1g.",
        "nutrition": "Conține: (0E | 0.63g sare | 0.28g zaharuri)/100g."
      }
    }
  },
  {
    "id": "plateaux-1682",
    "postId": "1682",
    "categoryId": "plateaux",
    "type": "food",
    "priceEur": 99,
    "priceFormatted": "99 €",
    "isVerifiedPrice": true,
    "weight": "2500g",
    "image": "/images/catalog/topul-de-pe-lume-platter-2-person.jpg",
    "allergens": [
      "Gluten",
      "Crustaceans",
      "Egg",
      "Fish",
      "Milk",
      "Molluscs"
    ],
    "tags": [
      "octopus",
      "platter",
      "shrimp"
    ],
    "translations": {
      "fr": {
        "name": "Plateau “Top of the World” by Pescobar (2–3 personnes)",
        "description": "+ 1 bouteille Aerosoli Blanc/Rosé. Rouget 450g, Crevettes Black Tiger 400g, Homard 350g, Poulpe 270g, Pommes de terre 200g, Calmar 180g, Crevettes 180g, Polenta 200g (Farine de maïs, Lait, Beurre, Sel), Citron 120g, Huile d’olive 30ml, Sauce panure 30g (Œuf, Lait, Farine, Huile de tournesol, Amidon, Poivre, Sel), Vin blanc de table 30g, Beurre 30g, Ail 10g, Sel 5g, Poivre 3g, Thym frais 1g, Flocons de piment 1g.",
        "nutrition": "Contains: (0E | 0,77 g sel | 0,4 g sucres)/100g."
      },
      "nl": {
        "name": "Schotel “Top of the World” by Pescobar (2–3 persons)",
        "description": "+ 1 bottle Aerosoli White/Rosé. Redfish 450g, Black Tiger Garnalen 400g, Kreeft 350g, Octopus 270g, Aardappelen 200g, Inktvis (Calamari) 180g, Garnalen 180g, Polenta 200g (Cornmeal, Milk, Boter, Zout), Citroen 120g, Olijfolie 30ml, Batter sauce 30g (Egg, Milk, Flour, Sunflower oil, Starch, Peper, Zout), White table wine 30g, Boter 30g, Knoflook 10g, Zout 5g, Peper 3g, Fresh thyme 1g, Chili flakes 1g.",
        "nutrition": "Contains: (0E | 0.77 g salt | 0.4 g sugars)/100g."
      },
      "en": {
        "name": "Platter “Top of the World” by Pescobar (2–3 persons)",
        "description": "+ 1 bottle Aerosoli White/Rosé. Redfish 450g, Black Tiger shrimp 400g, Lobster 350g, Octopus 270g, Potatoes 200g, Squid 180g, Shrimp 180g, Polenta 200g (Cornmeal, Milk, Butter, Salt), Lemon 120g, Olive oil 30ml, Batter sauce 30g (Egg, Milk, Flour, Sunflower oil, Starch, Pepper, Salt), White table wine 30g, Butter 30g, Garlic 10g, Salt 5g, Pepper 3g, Fresh thyme 1g, Chili flakes 1g.",
        "nutrition": "Contains: (0E | 0.77 g salt | 0.4 g sugars)/100g."
      },
      "ro": {
        "name": "Platou \"Topul de pe lume\" by Pescobar (2–3 persoane)",
        "description": "+ 1 sticlă Aerosoli Alb/Rose. Redfish 450g, Creveti Black Tiger 400g, Homar 350g, Caracatita 270g, Cartofi 200g, Calamar 180g, Creveti 180g, Mamaliguta 200g (Malai, Lapte, Unt, Sare), Lamaie 120g, Ulei de masline 30ml, Sos paneuri 30g(Ou, Lapte, Faina, Ulei floarea soarelui, Amidon, Piper, Sare), Vin alb de masa 30g, Unt 30g, Usturoi 10g, Sare 5g, Piper 3g, Cimbru verde 1g, Fulgi Chili 1g.",
        "nutrition": "Conține: (0E | 0.77g sare | 0.4g zaharuri)/100g."
      }
    }
  },
  {
    "id": "plateaux-578",
    "postId": "578",
    "categoryId": "plateaux",
    "type": "food",
    "priceEur": 94,
    "priceFormatted": "94 €",
    "isVerifiedPrice": true,
    "weight": "1300g",
    "image": "/images/catalog/platou-cald.jpg",
    "allergens": [
      "Gluten",
      "Crustaceans",
      "Egg",
      "Fish",
      "Milk",
      "Molluscs"
    ],
    "tags": [
      "platter",
      "shrimp"
    ],
    "translations": {
      "fr": {
        "name": "Plateau chaud pané (2–3 personnes)",
        "description": "Comprend 2 sauces Spécial by Pescobar offertes. Pommes de terre 400g, Crevettes 200g, Viande de palourdes 180g, Calmar 180g, Filet de cabillaud 100g, Citron 100g, Tentacule de calmar 90g, Sauce panure 45g (Œuf, Lait, Farine, Huile de tournesol, Amidon, Poivre, Sel), Sel 3g, Poivre 2g.",
        "nutrition": "Contains: (5E | 0,58g sel | 0,79g sucre)/100g."
      },
      "nl": {
        "name": "Hot Gepaneerde Schotel (2–3 persons)",
        "description": "Includes 2 Special by Pescobar sauces on the house. Aardappelen 400g, Garnalen 200g, Venusschelpenvlees 180g, Inktvis (Calamari) 180g, Kabeljauwfilet 100g, Citroen 100g, Inktvis (Calamari) tentacle 90g, Batter sauce 45g (Egg, Milk, Flour, Sunflower oil, Starch, Peper, Zout), Zout 3g, Peper 2g.",
        "nutrition": "Contains: (5E | 0.58g salt | 0.79g sugar)/100g."
      },
      "en": {
        "name": "Hot Breaded Platter (2–3 persons)",
        "description": "Includes 2 Special by Pescobar sauces on the house. Potatoes 400g, Shrimp 200g, Clam meat 180g, Squid 180g, Cod fillet 100g, Lemon 100g, Squid tentacle 90g, Batter sauce 45g (Egg, Milk, Flour, Sunflower oil, Starch, Pepper, Salt), Salt 3g, Pepper 2g.",
        "nutrition": "Contains: (5E | 0.58g salt | 0.79g sugar)/100g."
      },
      "ro": {
        "name": "Platou cald pane (2 -3 persoane)",
        "description": "Contine 2 sosuri Special by Pescobar din partea casei. Cartofi 400g, Creveti 200g, Carne scoica 180g, Calamar 180g, File de cod 100g, Lamaie 100g, Tentacul Calamar 90g, Sos paneuri 45g (Ou, Lapte, Faina, Ulei floarea soarelui, Amidon, Piper, Sare), Sare 3g, Piper 2g.",
        "nutrition": "Conține: (5E | 0.58g sare | 0.79g zahar)/100g."
      }
    }
  },
  {
    "id": "plateaux-573",
    "postId": "573",
    "categoryId": "plateaux",
    "type": "food",
    "priceEur": 90,
    "priceFormatted": "90 €",
    "isVerifiedPrice": true,
    "weight": "1100g",
    "image": "/images/catalog/platou-mixt-grill-2-pers-taverna-racilor.jpg",
    "allergens": [
      "Crustaceans",
      "Fish",
      "Molluscs"
    ],
    "tags": [
      "platter",
      "shrimp",
      "fish"
    ],
    "translations": {
      "fr": {
        "name": "Plateau Mixte Grillades (2–3 personnes)",
        "description": "+ 1 bouteille Aerosoli Blanc/Rosé. Dorade 280g, Crevettes 220g, Tentacules de calmar 180g, Moules 180g, Calmar 180g, Citron 50g, Huile d’Olive 10ml.",
        "nutrition": "Contains: (0E | 1,23g sel | 0,34g sucre)/100g."
      },
      "nl": {
        "name": "Mixed Grill Schotel (2–3 persons)",
        "description": "+ 1 Aerosoli White/Rosé bottle. Gilt-head Bream 280g, Garnalen 220g, Inktvistentakels 180g, Mosselen 180g, Inktvis (Calamari) 180g, Citroen 50g, Olijfolie 10ml.",
        "nutrition": "Contains: (0E | 1.23g salt | 0.34g sugar) / 100g."
      },
      "en": {
        "name": "Mixed Grill Platter (2–3 persons)",
        "description": "+ 1 Aerosoli White/Rosé bottle. Gilt-head Bream 280g, Shrimp 220g, Squid Tentacles 180g, Mussels 180g, Squid 180g, Lemon 50g, Olive Oil 10ml.",
        "nutrition": "Contains: (0E | 1.23g salt | 0.34g sugar) / 100g."
      },
      "ro": {
        "name": "Platou Mixt Grill (2-3 persoane)",
        "description": "+ 1 sticlă Aerosoli Alb/Rose., Dorada 280g, Creveti 220g, Tentacule calamar 180g, Scoici 180g, Calamar 180g, Lamaie 50g, Ulei de masline 10ml.",
        "nutrition": "Conține: (0E | 1.23g sare | 0.34g zahar)/100g."
      }
    }
  },
  {
    "id": "plateaux-686",
    "postId": "686",
    "categoryId": "plateaux",
    "type": "food",
    "priceEur": 80,
    "priceFormatted": "80 €",
    "isVerifiedPrice": true,
    "weight": "900g",
    "image": "/images/catalog/love-shrimp-2-pers-taverna-racilor.jpg",
    "allergens": [
      "Gluten",
      "Crustaceans",
      "Egg",
      "Fish",
      "Soya",
      "Milk",
      "Mustard"
    ],
    "tags": [
      "platter",
      "shrimp"
    ],
    "translations": {
      "fr": {
        "name": "Plateau Shrimp Love (2 personnes)",
        "description": "Crevettes 540g, Riz 200g (Eau, Riz basmati, Sauce soja, Beurre, Curcuma, Poivre, Sel), Citron 100g, Sauce panure 20g (Œuf, Lait, Farine, Huile de tournesol, Amidon, Poivre, Sel), Mayonnaise 18g, Farine Tempura 10g, Chapelure Panko 10g, Poivre 2g.",
        "nutrition": "Contains: (1E | 0,98g sel | 0,33g sucre)/100g."
      },
      "nl": {
        "name": "Garnalen Love Schotel (2 persons)",
        "description": "Garnalen 540g, Rice 200g (Water, Basmati rice, Soy sauce, Boter, Turmeric, Peper, Zout), Citroen 100g, Batter sauce 20g (Egg, Milk, Flour, Sunflower oil, Starch, Peper, Zout), Mayonnaise 18g, Tempura flour 10g, Panko breadcrumbs 10g, Peper 2g.",
        "nutrition": "Contains: (1E | 0.98g salt | 0.33g sugar)/100g."
      },
      "en": {
        "name": "Shrimp Love Platter (2 persons)",
        "description": "Shrimp 540g, Rice 200g (Water, Basmati rice, Soy sauce, Butter, Turmeric, Pepper, Salt), Lemon 100g, Batter sauce 20g (Egg, Milk, Flour, Sunflower oil, Starch, Pepper, Salt), Mayonnaise 18g, Tempura flour 10g, Panko breadcrumbs 10g, Pepper 2g.",
        "nutrition": "Contains: (1E | 0.98g salt | 0.33g sugar)/100g."
      },
      "ro": {
        "name": "Platou Shrimp Love ( 2 persoane )",
        "description": "Creveti 540g, Orez 200g (Apa, Orez basmati, Sos soia, Unt, Turmeric, Piper, Sare), Lamaie 100g, Sos paneuri 20g(Ou, Lapte, Faina, Ulei floarea soarelui, Amidon, Piper, Sare), Maioneza 18g, Faina Tempura 10g, Pesmet Panko 10g, Piper 2g.",
        "nutrition": "Conține: (1E | 0.98g sare | 0.33g zahar)/100g."
      }
    }
  },
  {
    "id": "plateaux-575",
    "postId": "575",
    "categoryId": "plateaux",
    "type": "food",
    "priceEur": 70,
    "priceFormatted": "70 €",
    "isVerifiedPrice": true,
    "weight": "1100g",
    "image": "/images/catalog/platou-scoici-si-creveti-taverna-racilor-1.jpg",
    "allergens": [
      "Crustaceans",
      "Fish",
      "Milk",
      "Molluscs"
    ],
    "tags": [
      "platter",
      "shrimp"
    ],
    "translations": {
      "fr": {
        "name": "Plateau aux moules et crevettes dans une sauce au vin blanc et à l’ail",
        "description": "Moules 500g, Crevettes 350g, Viande de palourdes 100g, Citron 50g, Vin blanc de table 35ml, Beurre 30g, Huile d’olive 15ml, Ail 10g, Sel 4g, Flocons de piment 3g, Poivre 3g.",
        "nutrition": "Contains: (0E | 0,58g sel | 0,39g sucre)/100g."
      },
      "nl": {
        "name": "Schotel with Mosselen and Garnalen in Witte Wijn & Knoflook Sauce",
        "description": "Mosselen 500g, Garnalen 350g, Venusschelpenvlees 100g, Citroen 50g, White table wine 35ml, Boter 30g, Olijfolie 15ml, Knoflook 10g, Zout 4g, Chili flakes 3g, Peper 3g.",
        "nutrition": "Contains: (0E | 0.58g salt | 0.39g sugar)/100g."
      },
      "en": {
        "name": "Platter with Mussels and Shrimps in White Wine & Garlic Sauce",
        "description": "Mussels 500g, Shrimp 350g, Clam meat 100g, Lemon 50g, White table wine 35ml, Butter 30g, Olive oil 15ml, Garlic 10g, Salt 4g, Chili flakes 3g, Pepper 3g.",
        "nutrition": "Contains: (0E | 0.58g salt | 0.39g sugar)/100g."
      },
      "ro": {
        "name": "Platou cu scoici și creveți în sos de vin și usturoi",
        "description": "Scoici 500g, Creveti 350g, Carne de scoici 100g, Lamaie 50g, Vin alb de masa 35ml, Unt 30g, Ulei de masline 15ml Usturoi 10g, Sare 4g, Fulgi Chili 3g, Piper 3g.",
        "nutrition": "Conține: (0E | 0.58g sare | 0.39g zahar)/100g."
      }
    }
  },
  {
    "id": "plateaux-574",
    "postId": "574",
    "categoryId": "plateaux",
    "type": "food",
    "priceEur": 65,
    "priceFormatted": "65 €",
    "isVerifiedPrice": true,
    "weight": "1250g",
    "image": "/images/catalog/platou-raci-si-scoici.jpg",
    "allergens": [
      "Crustaceans",
      "Fish",
      "Milk",
      "Molluscs"
    ],
    "tags": [
      "platter"
    ],
    "translations": {
      "fr": {
        "name": "Plateau avec écrevisses et moules",
        "description": "Écrevisses 500g, Moules 500g, Viande de palourdes 100g, Citron 50g, Vin blanc de table 30ml, Huile d’olive 25ml, Beurre 15g, Ail 12g, Aneth 10g, Sel 3g, Flocons de piment 3g, Poivre 2g.",
        "nutrition": "Contains: (0E | 0,2g sel | 0,38g sucre)/100g."
      },
      "nl": {
        "name": "Schotel with Rivierkreeftjes and Mosselen",
        "description": "Rivierkreeftjes 500g, Mosselen 500g, Venusschelpenvlees 100g, Citroen 50g, White table wine 30ml, Olijfolie 25ml, Boter 15g, Knoflook 12g, Dill 10g, Zout 3g, Chili flakes 3g, Peper 2g.",
        "nutrition": "Contains: (0E | 0.2g salt | 0.38g sugar)/100g."
      },
      "en": {
        "name": "Platter with Crayfish and Mussels",
        "description": "Crayfish 500g, Mussels 500g, Clam meat 100g, Lemon 50g, White table wine 30ml, Olive oil 25ml, Butter 15g, Garlic 12g, Dill 10g, Salt 3g, Chili flakes 3g, Pepper 2g.",
        "nutrition": "Contains: (0E | 0.2g salt | 0.38g sugar)/100g."
      },
      "ro": {
        "name": "Platou cu raci și scoici",
        "description": "Raci 500g, Scoici 500g, Carne de scoici 100g, Lamaie 50g, Vin alb de masa 30ml, Ulei de masline 25ml, Unt 15 g, Usturoi 12g, Marar 10g, Sare 3g, Fulgi Chili 3g, Piper 2g.",
        "nutrition": "Conține: (0E | 0.2g sare | 0.38g zahar)/100g."
      }
    }
  },
  {
    "id": "plateaux-572",
    "postId": "572",
    "categoryId": "plateaux",
    "type": "food",
    "priceEur": 64,
    "priceFormatted": "64 €",
    "isVerifiedPrice": true,
    "weight": "1000g",
    "image": "/images/catalog/platou-raci-si-creveti-taverna-racilor-1.jpg",
    "allergens": [
      "Crustaceans",
      "Fish",
      "Milk"
    ],
    "tags": [
      "platter",
      "shrimp"
    ],
    "translations": {
      "fr": {
        "name": "Plateau aux écrevisses et crevettes dans une sauce au vin blanc et à l’ail",
        "description": "Écrevisses 500g, Crevettes 370g, Citron 50g, Vin blanc de table 30ml, Beurre 15g, Huile d’olive 15ml, Ail 10g, Aneth 5g, Sel 3g, Poivre 2g.",
        "nutrition": "Contains: (0E | 0,46g de sel | 0,19g de sucre) / 100g."
      },
      "nl": {
        "name": "Schotel with Rivierkreeftjes and Garnalen in Witte Wijn & Knoflook Sauce",
        "description": "Rivierkreeftjes 500g, Garnalen 370g, Citroen 50g, White table wine 30ml, Boter 15g, Olijfolie 15ml, Knoflook 10g, Dill 5g, Zout 3g, Peper 2g.",
        "nutrition": "Contains: (0E | 0.46g salt | 0.19g sugar) / 100g."
      },
      "en": {
        "name": "Platter with Crayfish and Shrimps in White Wine & Garlic Sauce",
        "description": "Crayfish 500g, Shrimp 370g, Lemon 50g, White table wine 30ml, Butter 15g, Olive oil 15ml, Garlic 10g, Dill 5g, Salt 3g, Pepper 2g.",
        "nutrition": "Contains: (0E | 0.46g salt | 0.19g sugar) / 100g."
      },
      "ro": {
        "name": "Platou cu raci și creveți în sos de vin și usturoi",
        "description": "Raci 500g, Creveti 370g, Lamaie 50g, Vin alb de masa 30ml, Unt 15g, Ulei de masline 15ml, Usturoi 10g, Marar 5g, Sare 3g, Piper 2g.",
        "nutrition": "Conține: (0E | 0.46g sare | 0.19g zahar)/100g."
      }
    }
  },
  {
    "id": "garniture-557",
    "postId": "557",
    "categoryId": "garniture",
    "type": "food",
    "priceEur": 5,
    "priceFormatted": "5 €",
    "isVerifiedPrice": true,
    "weight": "260g",
    "image": "/images/catalog/mamaliguta-taverna-racilor.jpg",
    "allergens": [
      "Milk"
    ],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Polenta",
        "description": "Polenta 200g (Farine de Maïs 80g, Lait 80g, Beurre 12g, Sel 3g).",
        "nutrition": "Contains: (0E | 0,81g de sel | 1,93g de sucre) / 100g."
      },
      "nl": {
        "name": "Polenta",
        "description": "Polenta 200g (Cornmeal 80g, Milk 80g, Boter 12g, Zout 3g).",
        "nutrition": "Contains: (0E | 0.81g salt | 1.93g sugar) / 100g."
      },
      "en": {
        "name": "Polenta",
        "description": "Polenta 200g (Cornmeal 80g, Milk 80g, Butter 12g, Salt 3g).",
        "nutrition": "Contains: (0E | 0.81g salt | 1.93g sugar) / 100g."
      },
      "ro": {
        "name": "Mămăliguță",
        "description": "Mamaliguta 200g (Malai 80g, Lapte 80g, Unt 12g, 3g).",
        "nutrition": "Conține: (0E | 0.81g sare | 1.93g zahar)/100g."
      }
    }
  },
  {
    "id": "garniture-558",
    "postId": "558",
    "categoryId": "garniture",
    "type": "food",
    "priceEur": 5,
    "priceFormatted": "5 €",
    "isVerifiedPrice": true,
    "weight": "220g",
    "image": "/images/catalog/taverna-racilor-36.jpg",
    "allergens": [
      "Gluten",
      "Soya",
      "Milk"
    ],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Riz aux Légumes",
        "description": "Riz 200g (Eau, Riz Basmati, Sauce Soja, Beurre, Curcuma, Poivre, Sel), Légumes Mélangés.",
        "nutrition": "Contains: (0E | 0,49g de sel | 0,9g de sucre) / 100g."
      },
      "nl": {
        "name": "Rice with Vegetables",
        "description": "Rice 200g (Water, Basmati Rice, Soy Sauce, Boter, Turmeric, Peper, Zout), Mixed Vegetables.",
        "nutrition": "Contains: (0E | 0.49g salt | 0.9g sugar) / 100g."
      },
      "en": {
        "name": "Rice with Vegetables",
        "description": "Rice 200g (Water, Basmati Rice, Soy Sauce, Butter, Turmeric, Pepper, Salt), Mixed Vegetables.",
        "nutrition": "Contains: (0E | 0.49g salt | 0.9g sugar) / 100g."
      },
      "ro": {
        "name": "Orez cu legume",
        "description": "Orez 200 g (Apa, Orez basmati, Sos soia, Unt, Turmeric, Piper, Sare), Amestec legume .",
        "nutrition": "Conține: (0E | 0.49g sare | 0.9g zahar)/100g."
      }
    }
  },
  {
    "id": "garniture-559",
    "postId": "559",
    "categoryId": "garniture",
    "type": "food",
    "priceEur": 5,
    "priceFormatted": "5 €",
    "isVerifiedPrice": true,
    "weight": "200g",
    "image": "/images/catalog/taverna-racilor-23.jpg",
    "allergens": [
      "Celery",
      "Mustard"
    ],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Mélange de Salade",
        "description": "Salade Mixte 150g, Citron 25g, Sauce Salade 25g (Miel, Jus de Citron Frais, Huile d’Olive, Sel, Moutarde).",
        "nutrition": "Contains: (0E | 0,11g de sel | 1,82g de sucre) / 100g."
      },
      "nl": {
        "name": "Salad Mix",
        "description": "Mixed Salad 150g, Citroen 25g, Salad Dressing 25g (Honey, Fresh Citroen Juice, Olijfolie, Zout, Mustard).",
        "nutrition": "Contains: (0E | 0.11g salt | 1.82g sugar) / 100g."
      },
      "en": {
        "name": "Salad Mix",
        "description": "Mixed Salad 150g, Lemon 25g, Salad Dressing 25g (Honey, Fresh Lemon Juice, Olive Oil, Salt, Mustard).",
        "nutrition": "Contains: (0E | 0.11g salt | 1.82g sugar) / 100g."
      },
      "ro": {
        "name": "Mix de salată",
        "description": "Salata mix 150g, Lamaie 25g, Dressing salata 25g (Miere, Fresh de lamaie, Ulei de masline, Sare, Mustar).",
        "nutrition": "Conține: (0E | 0.11g sare | 1.82g zahar)/100g."
      }
    }
  },
  {
    "id": "garniture-584",
    "postId": "584",
    "categoryId": "garniture",
    "type": "food",
    "priceEur": 5,
    "priceFormatted": "5 €",
    "isVerifiedPrice": true,
    "weight": "160g",
    "image": "/images/catalog/sparanghel-taverna-racilor.jpg",
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Asperges grillées",
        "description": "Asperges 155g, Huile d’Olive 3ml, Sel 2g.",
        "nutrition": "Contains: (0E | 0,6g de sel | 1,9g de sucre) / 100g."
      },
      "nl": {
        "name": "Gegrilde Asparagus",
        "description": "Asparagus 155g, Olijfolie 3ml, Zout 2g.",
        "nutrition": "Contains: (0E | 0.6g salt | 1.9g sugar) / 100g."
      },
      "en": {
        "name": "Grilled Asparagus",
        "description": "Asparagus 155g, Olive Oil 3ml, Salt 2g.",
        "nutrition": "Contains: (0E | 0.6g salt | 1.9g sugar) / 100g."
      },
      "ro": {
        "name": "Sparanghel la grătar",
        "description": "Sparanghel 155g, Ulei de masline 3ml, Sare 2g.",
        "nutrition": "Conține: (0E | 0.6g sare | 1.9g zahar)/100g."
      }
    }
  },
  {
    "id": "garniture-585",
    "postId": "585",
    "categoryId": "garniture",
    "type": "food",
    "priceEur": 5,
    "priceFormatted": "5 €",
    "isVerifiedPrice": true,
    "weight": "200g",
    "image": "/images/catalog/orez.jpg",
    "allergens": [
      "Milk"
    ],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Riz",
        "description": "Riz Basmati 190g, Beurre 8g, Sel 1g, Poivre 0,5g, Curcuma 0,5g.",
        "nutrition": "Contains: (0E | 0g de sel | 0g de sucre) / 100g."
      },
      "nl": {
        "name": "Rice",
        "description": "Basmati Rice 190g, Boter 8g, Zout 1g, Peper 0.5g, Turmeric 0.5g.",
        "nutrition": "Contains: (0E | 0g salt | 0g sugar) / 100g."
      },
      "en": {
        "name": "Rice",
        "description": "Basmati Rice 190g, Butter 8g, Salt 1g, Pepper 0.5g, Turmeric 0.5g.",
        "nutrition": "Contains: (0E | 0g salt | 0g sugar) / 100g."
      },
      "ro": {
        "name": "Orez",
        "description": "Orez basmati 190g, Unt 8g, Sare 1g, Piper 0,5, Turmeri 0,5g.",
        "nutrition": "Conține: (0E | 0g sare | 0g zahar)/100g."
      }
    }
  },
  {
    "id": "garniture-666",
    "postId": "666",
    "categoryId": "garniture",
    "type": "food",
    "priceEur": 5,
    "priceFormatted": "5 €",
    "isVerifiedPrice": true,
    "weight": "200g",
    "image": "/images/catalog/taverna-racilor-32-1.jpg",
    "allergens": [
      "Gluten"
    ],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Frites",
        "description": "Pommes de Terre 200g, Sel.",
        "nutrition": "Contains: (0E | 0g de sel | 0g de sucre) / 100g."
      },
      "nl": {
        "name": "Frietjes",
        "description": "Aardappelen 200g, Zout.",
        "nutrition": "Contains: (0E | 0g salt | 0g sugar) / 100g."
      },
      "en": {
        "name": "French Fries",
        "description": "Potatoes 200g, Salt.",
        "nutrition": "Contains: (0E | 0g salt | 0g sugar) / 100g."
      },
      "ro": {
        "name": "Cartofi prăjiți",
        "description": "Cartofi 200g, Sare.",
        "nutrition": "Conține: (0E | 0g sare | 0g zahar)/100g."
      }
    }
  },
  {
    "id": "garniture-688",
    "postId": "688",
    "categoryId": "garniture",
    "type": "food",
    "priceEur": 5,
    "priceFormatted": "5 €",
    "isVerifiedPrice": true,
    "weight": "160g",
    "image": null,
    "allergens": [
      "Gluten"
    ],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Pain à l’Ail",
        "description": "Pita Chypriote 150g, Ail 10g.",
        "nutrition": ""
      },
      "nl": {
        "name": "Knoflook Bread",
        "description": "Cypriot Pita 150g, Knoflook 10g.",
        "nutrition": ""
      },
      "en": {
        "name": "Garlic Bread",
        "description": "Cypriot Pita 150g, Garlic 10g.",
        "nutrition": ""
      },
      "ro": {
        "name": "Garlic Bread",
        "description": "Pita cipriota 150g, Usturoi 10 g.",
        "nutrition": ""
      }
    }
  },
  {
    "id": "garniture-665",
    "postId": "665",
    "categoryId": "garniture",
    "type": "food",
    "priceEur": 0,
    "priceFormatted": "Gratis! €",
    "isVerifiedPrice": false,
    "weight": "120g",
    "image": "/images/catalog/cos-cu-paine.jpg",
    "allergens": [
      "Gluten"
    ],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Pain l’ail",
        "description": "Pita Grecque 120g.",
        "nutrition": ""
      },
      "nl": {
        "name": "Bread",
        "description": "Greek Pita 120g.",
        "nutrition": ""
      },
      "en": {
        "name": "Bread",
        "description": "Greek Pita 120g.",
        "nutrition": ""
      },
      "ro": {
        "name": "Coș cu pâine - 4 buc",
        "description": "Pita Greceasca 120g.",
        "nutrition": ""
      }
    }
  },
  {
    "id": "sauces-667",
    "postId": "667",
    "categoryId": "sauces",
    "type": "food",
    "priceEur": 2.5,
    "priceFormatted": "2,5 €",
    "isVerifiedPrice": true,
    "weight": "50g",
    "image": "/images/catalog/sriracha-sos-taverna-racilor-1.jpg",
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Sauce Sriracha Piquante",
        "description": "Flocons de piment 40g, Vinaigre 2g, Ail 2g, Eau 2ml, Sel 2g, Sucre 2g.",
        "nutrition": ""
      },
      "nl": {
        "name": "Spicy Sriracha Sauce",
        "description": "Chili flakes 40g, Vinegar 2g, Knoflook 2g, Water 2ml, Zout 2g, Sugar 2g.",
        "nutrition": ""
      },
      "en": {
        "name": "Spicy Sriracha Sauce",
        "description": "Chili flakes 40g, Vinegar 2g, Garlic 2g, Water 2ml, Salt 2g, Sugar 2g.",
        "nutrition": ""
      },
      "ro": {
        "name": "Sos picant Sriracha",
        "description": "Fulgi Chili 40g, Otet 2g, Usturoi 2g, Apa 2ml, Sare 2g, Zahar 2g.",
        "nutrition": ""
      }
    }
  },
  {
    "id": "sauces-668",
    "postId": "668",
    "categoryId": "sauces",
    "type": "food",
    "priceEur": 2.5,
    "priceFormatted": "2,5 €",
    "isVerifiedPrice": true,
    "weight": "50g",
    "image": "/images/catalog/sweet-chili-taverna-racilor.jpg",
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Sauce Sweet Chilli",
        "description": "Piment rouge fort 15g, Amidon 5g, Vinaigre 5g, Sel 5g, Ail 5g, Eau 5g, Sucre 5g.",
        "nutrition": ""
      },
      "nl": {
        "name": "Sweet Chilli Sauce",
        "description": "Red hot chili Peper 15g, Starch 5g, Vinegar 5g, Zout 5g, Knoflook 5g, Water 5g, Sugar 5g.",
        "nutrition": ""
      },
      "en": {
        "name": "Sweet Chilli Sauce",
        "description": "Red hot chili pepper 15g, Starch 5g, Vinegar 5g, Salt 5g, Garlic 5g, Water 5g, Sugar 5g.",
        "nutrition": ""
      },
      "ro": {
        "name": "Sos sweet chilli",
        "description": "Ardei rosu iute 15g, Amidon 5g, Otet 5g, Sare 5g, Usturoi 5g, Apa 5g, Zahar 5g.",
        "nutrition": ""
      }
    }
  },
  {
    "id": "sauces-1693",
    "postId": "1693",
    "categoryId": "sauces",
    "type": "food",
    "priceEur": 2.5,
    "priceFormatted": "2,5 €",
    "isVerifiedPrice": true,
    "weight": "50g",
    "image": null,
    "allergens": [
      "Egg",
      "Milk"
    ],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Sauce spéciale by Pescobar",
        "description": "Yaourt 44g, Ail 3g, Sel 1g, Jus de citron frais 1ml.",
        "nutrition": ""
      },
      "nl": {
        "name": "Special Sauce by Pescobar",
        "description": "Yogurt 44g, Knoflook 3g, Zout 1g, Fresh Citroen juice 1ml.",
        "nutrition": ""
      },
      "en": {
        "name": "Special Sauce by Pescobar",
        "description": "Yogurt 44g, Garlic 3g, Salt 1g, Fresh lemon juice 1ml.",
        "nutrition": ""
      },
      "ro": {
        "name": "Sos special by Pescobar",
        "description": "Iaurt 44g, Usturoi 3g, Sare 1g, Fresh de lamaie 1ml.",
        "nutrition": ""
      }
    }
  },
  {
    "id": "sauces-581",
    "postId": "581",
    "categoryId": "sauces",
    "type": "food",
    "priceEur": 2.5,
    "priceFormatted": "2,5 €",
    "isVerifiedPrice": true,
    "weight": "50g",
    "image": "/images/catalog/mujdei-de-usturoi.jpg",
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Sauce à l'ail (Mujdei)",
        "description": "Eau gazeuse : 30ml, Ail : 10g, Huile de tournesol : 7ml, Sel : 3g",
        "nutrition": "Contains: (0E | 6g sel | 0.4g sucre)/100g."
      },
      "nl": {
        "name": "Knoflook Sauce",
        "description": "Sparkling water: 30ml, Knoflook: 10g, Sunflower oil: 7ml, Zout: 3g.",
        "nutrition": "Contains: (0E | 6g salt | 0.4g sugar)/100g."
      },
      "en": {
        "name": "Garlic Sauce",
        "description": "Sparkling water: 30ml, Garlic: 10g, Sunflower oil: 7ml, Salt: 3g.",
        "nutrition": "Contains: (0E | 6g salt | 0.4g sugar)/100g."
      },
      "ro": {
        "name": "Mujdei de usturoi",
        "description": "Apa minerala 30ml, Usturoi 10g, Ulei floarea soarelui 7ml, Sare 3g.",
        "nutrition": "Conține: (0E | 6g sare | 0.4g zahar)/100g."
      }
    }
  },
  {
    "id": "sauces-582",
    "postId": "582",
    "categoryId": "sauces",
    "type": "food",
    "priceEur": 2.5,
    "priceFormatted": "2,5 €",
    "isVerifiedPrice": true,
    "weight": "50g",
    "image": "/images/catalog/pescobar-octopus-taverna-racilor-sosuri.jpg",
    "allergens": [
      "Egg",
      "Milk",
      "Mustard"
    ],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Sauce Aïoli",
        "description": "Mayonnaise 45g, Ail 3g, Sel 1g, Jus de citron frais 1ml.",
        "nutrition": ""
      },
      "nl": {
        "name": "Aioli Sauce",
        "description": "Mayonnaise 45g, Knoflook 3g, Zout 1g, Fresh Citroen juice 1ml.",
        "nutrition": ""
      },
      "en": {
        "name": "Aioli Sauce",
        "description": "Mayonnaise 45g, Garlic 3g, Salt 1g, Fresh lemon juice 1ml.",
        "nutrition": ""
      },
      "ro": {
        "name": "Sos aioli",
        "description": "Maioneza 45g, Usturoi 3g, Sare 1g, Fresh de lamaie 1ml.",
        "nutrition": "Conține: (0E | 2.41g sare | 0.75g zahar)/100g."
      }
    }
  },
  {
    "id": "sauces-583",
    "postId": "583",
    "categoryId": "sauces",
    "type": "food",
    "priceEur": 2.5,
    "priceFormatted": "2,5 €",
    "isVerifiedPrice": true,
    "weight": "50g",
    "image": "/images/catalog/spicy-mayo.jpg",
    "allergens": [
      "Egg",
      "Mustard"
    ],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Mayonnaise Piquante",
        "description": "Mayonnaise 45g, Sriracha 5g.",
        "nutrition": ""
      },
      "nl": {
        "name": "Spicy Mayonnaise",
        "description": "Maioneză 45g, Sriracha 5g.",
        "nutrition": ""
      },
      "en": {
        "name": "Spicy Mayonnaise",
        "description": "Maioneză 45g, Sriracha 5g.",
        "nutrition": ""
      },
      "ro": {
        "name": "Maioneză picantă",
        "description": "Mayonnaise 45g, Sriracha 5g.",
        "nutrition": "Conține: (10E | 1.94g sare | 4.08g zahar)/100g."
      }
    }
  },
  {
    "id": "dessert-670",
    "postId": "670",
    "categoryId": "dessert",
    "type": "food",
    "priceEur": 9,
    "priceFormatted": "9 €",
    "isVerifiedPrice": true,
    "weight": "150 g",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Dessert du jour",
        "description": "",
        "nutrition": ""
      },
      "nl": {
        "name": "Dessert of the Day",
        "description": "",
        "nutrition": ""
      },
      "en": {
        "name": "Dessert of the Day",
        "description": "",
        "nutrition": ""
      },
      "ro": {
        "name": "Desertul zilei",
        "description": "",
        "nutrition": ""
      }
    }
  },
  {
    "id": "cafe-boissons-chaudes-1270",
    "postId": "1270",
    "categoryId": "cafe-boissons-chaudes",
    "type": "drink",
    "priceEur": 9,
    "priceFormatted": "9 €",
    "isVerifiedPrice": true,
    "weight": "",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Irish Coffee",
        "description": "Johnnie Walker Red, Café, Crème liquide, Sucre.",
        "nutrition": ""
      },
      "nl": {
        "name": "Irish Coffee",
        "description": "Johnnie Walker Red, Coffee, Liquid cream, Sugar.",
        "nutrition": ""
      },
      "en": {
        "name": "Irish Coffee",
        "description": "Johnnie Walker Red, Coffee, Liquid cream, Sugar.",
        "nutrition": ""
      },
      "ro": {
        "name": "Irish Coffee",
        "description": "Johnnie Walker Red,Cafea,Frisca lichida,Zahar.",
        "nutrition": ""
      }
    }
  },
  {
    "id": "cafe-boissons-chaudes-596",
    "postId": "596",
    "categoryId": "cafe-boissons-chaudes",
    "type": "drink",
    "priceEur": 6,
    "priceFormatted": "6 €",
    "isVerifiedPrice": true,
    "weight": "25 cl",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Ice Latte",
        "description": "20 cl de lait, 3 cl d’eau, 20g de miel, 8g de café.",
        "nutrition": ""
      },
      "nl": {
        "name": "Ice Latte",
        "description": "20 cl Milk, 3 cl Water, 20g Honey, 8g Coffee.",
        "nutrition": ""
      },
      "en": {
        "name": "Ice Latte",
        "description": "20 cl Milk, 3 cl Water, 20g Honey, 8g Coffee.",
        "nutrition": ""
      },
      "ro": {
        "name": "Ice Latte",
        "description": "20 cl Lapte, 3 cl Apă, 20g Miere, 8g Cafea.",
        "nutrition": ""
      }
    }
  },
  {
    "id": "cafe-boissons-chaudes-594",
    "postId": "594",
    "categoryId": "cafe-boissons-chaudes",
    "type": "drink",
    "priceEur": 5.5,
    "priceFormatted": "5,5 €",
    "isVerifiedPrice": true,
    "weight": "5 cl",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Espresso Freddo",
        "description": "3 cl d’eau, 20g de miel, 8g de café.",
        "nutrition": ""
      },
      "nl": {
        "name": "Espresso Freddo",
        "description": "3 cl Water, 20g Honey, 8g Coffee.",
        "nutrition": ""
      },
      "en": {
        "name": "Espresso Freddo",
        "description": "3 cl Water, 20g Honey, 8g Coffee.",
        "nutrition": ""
      },
      "ro": {
        "name": "Espresso Freddo",
        "description": "3 cl Apă, 20g Miere, 8g Cafea.",
        "nutrition": ""
      }
    }
  },
  {
    "id": "cafe-boissons-chaudes-597",
    "postId": "597",
    "categoryId": "cafe-boissons-chaudes",
    "type": "drink",
    "priceEur": 5,
    "priceFormatted": "5 €",
    "isVerifiedPrice": true,
    "weight": "10 cl",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Cappuccino",
        "description": "7 cl de lait, 3 cl d’eau, 8g de café.",
        "nutrition": ""
      },
      "nl": {
        "name": "Cappuccino",
        "description": "7 cl Milk, 3 cl Water, 8g Coffee.",
        "nutrition": ""
      },
      "en": {
        "name": "Cappuccino",
        "description": "7 cl Milk, 3 cl Water, 8g Coffee.",
        "nutrition": ""
      },
      "ro": {
        "name": "Cappuccino",
        "description": "7 cl Lapte, 3 cl Apă, 8g Cafea.",
        "nutrition": ""
      }
    }
  },
  {
    "id": "cafe-boissons-chaudes-599",
    "postId": "599",
    "categoryId": "cafe-boissons-chaudes",
    "type": "drink",
    "priceEur": 5,
    "priceFormatted": "5,r €",
    "isVerifiedPrice": true,
    "weight": "20 cl",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Café Latte",
        "description": "12 cl de lait, 3 cl d’eau, 8g de café.",
        "nutrition": ""
      },
      "nl": {
        "name": "Caffe Latte",
        "description": "12 cl Milk, 3 cl Water, 8g Coffee.",
        "nutrition": ""
      },
      "en": {
        "name": "Caffe Latte",
        "description": "12 cl Milk, 3 cl Water, 8g Coffee.",
        "nutrition": ""
      },
      "ro": {
        "name": "Caffe Latte",
        "description": "12 cl Lapte, 3 cl Apă, 8g Cafea.",
        "nutrition": ""
      }
    }
  },
  {
    "id": "cafe-boissons-chaudes-600",
    "postId": "600",
    "categoryId": "cafe-boissons-chaudes",
    "type": "drink",
    "priceEur": 5,
    "priceFormatted": "5 €",
    "isVerifiedPrice": true,
    "weight": "40 cl",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Thé Chaud",
        "description": "40 cl d'eau, 1 sachet de thé : Noir / Vert / Fruits des bois / Camomille / Citron & Gingembre / Citron / Papaye / Fruit de la passion / Ananas.",
        "nutrition": ""
      },
      "nl": {
        "name": "Hot Tea",
        "description": "40 cl Water, 1 tea bag: Black / Green / Forest Fruits / Chamomile / Citroen & Ginger / Citroen / Papaya / Passion Fruit / Pineapple.",
        "nutrition": ""
      },
      "en": {
        "name": "Hot Tea",
        "description": "40 cl Water, 1 tea bag: Black / Green / Forest Fruits / Chamomile / Lemon & Ginger / Lemon / Papaya / Passion Fruit / Pineapple.",
        "nutrition": ""
      },
      "ro": {
        "name": "Ceai Cald",
        "description": "40 cl Apă, 1 plic ceai: Negru / Verde / Fructe de Padure / Musetel/ Lamaie si ghimbir/ Lamaie/ Papaya/ Fructul Pasiunii/ Ananas.",
        "nutrition": ""
      }
    }
  },
  {
    "id": "cafe-boissons-chaudes-590",
    "postId": "590",
    "categoryId": "cafe-boissons-chaudes",
    "type": "drink",
    "priceEur": 4,
    "priceFormatted": "4 €",
    "isVerifiedPrice": true,
    "weight": "3 cl",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Espresso",
        "description": "3 cl d’eau, 8g de café.",
        "nutrition": ""
      },
      "nl": {
        "name": "Espresso",
        "description": "30 cl Water, 8g Coffee.",
        "nutrition": ""
      },
      "en": {
        "name": "Espresso",
        "description": "30 cl Water, 8g Coffee.",
        "nutrition": ""
      },
      "ro": {
        "name": "Espresso",
        "description": "3 cl Apă, 8g Cafea.",
        "nutrition": ""
      }
    }
  },
  {
    "id": "cafe-boissons-chaudes-593",
    "postId": "593",
    "categoryId": "cafe-boissons-chaudes",
    "type": "drink",
    "priceEur": 4.5,
    "priceFormatted": "4,5 €",
    "isVerifiedPrice": true,
    "weight": "3 cl",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Espresso Macchiato",
        "description": "2 cl d’eau, 1 cl de lait, 8g de café.",
        "nutrition": ""
      },
      "nl": {
        "name": "Espresso Macchiato",
        "description": "2 cl Water, 1 cl Milk, 8g Coffee.",
        "nutrition": ""
      },
      "en": {
        "name": "Espresso Macchiato",
        "description": "2 cl Water, 1 cl Milk, 8g Coffee.",
        "nutrition": ""
      },
      "ro": {
        "name": "Espresso Machiatto",
        "description": "20 cl Apă, 10 cl Lapte, 8g Cafea.",
        "nutrition": ""
      }
    }
  },
  {
    "id": "boissons-gazeuses-1184",
    "postId": "1184",
    "categoryId": "boissons-gazeuses",
    "type": "drink",
    "priceEur": 6,
    "priceFormatted": "6 €",
    "isVerifiedPrice": true,
    "weight": "25 cl",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Fi-ga",
        "description": "",
        "nutrition": ""
      },
      "nl": {
        "name": "Fi-ga",
        "description": "",
        "nutrition": ""
      },
      "en": {
        "name": "Fi-ga",
        "description": "",
        "nutrition": ""
      },
      "ro": {
        "name": "Fi-ga",
        "description": "",
        "nutrition": ""
      }
    }
  },
  {
    "id": "boissons-gazeuses-1185",
    "postId": "1185",
    "categoryId": "boissons-gazeuses",
    "type": "drink",
    "priceEur": 6,
    "priceFormatted": "6 €",
    "isVerifiedPrice": true,
    "weight": "25 cl",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Fi-ga Light",
        "description": "",
        "nutrition": ""
      },
      "nl": {
        "name": "Fi-ga Light",
        "description": "",
        "nutrition": ""
      },
      "en": {
        "name": "Fi-ga Light",
        "description": "",
        "nutrition": ""
      },
      "ro": {
        "name": "Fi-ga Light",
        "description": "",
        "nutrition": ""
      }
    }
  },
  {
    "id": "boissons-gazeuses-1165",
    "postId": "1165",
    "categoryId": "boissons-gazeuses",
    "type": "drink",
    "priceEur": 5.5,
    "priceFormatted": "5,5 €",
    "isVerifiedPrice": true,
    "weight": "50 cl",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Eau plate",
        "description": "",
        "nutrition": ""
      },
      "nl": {
        "name": "Still water",
        "description": "",
        "nutrition": ""
      },
      "en": {
        "name": "Still water",
        "description": "",
        "nutrition": ""
      },
      "ro": {
        "name": "Apa plata",
        "description": "",
        "nutrition": ""
      }
    }
  },
  {
    "id": "boissons-gazeuses-1166",
    "postId": "1166",
    "categoryId": "boissons-gazeuses",
    "type": "drink",
    "priceEur": 5.5,
    "priceFormatted": "5,5 €",
    "isVerifiedPrice": true,
    "weight": "50 cl",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Eau gazeuse",
        "description": "",
        "nutrition": ""
      },
      "nl": {
        "name": "Sparkling water",
        "description": "",
        "nutrition": ""
      },
      "en": {
        "name": "Sparkling water",
        "description": "",
        "nutrition": ""
      },
      "ro": {
        "name": "Apa Carbogazoasa Minerala",
        "description": "",
        "nutrition": ""
      }
    }
  },
  {
    "id": "boissons-gazeuses-1175",
    "postId": "1175",
    "categoryId": "boissons-gazeuses",
    "type": "drink",
    "priceEur": 4,
    "priceFormatted": "4 €",
    "isVerifiedPrice": true,
    "weight": "25 cl",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Looza Pomme Cerise",
        "description": "",
        "nutrition": ""
      },
      "nl": {
        "name": "Sprite",
        "description": "",
        "nutrition": ""
      },
      "en": {
        "name": "Sprite",
        "description": "",
        "nutrition": ""
      },
      "ro": {
        "name": "Looza Apple Cherry",
        "description": "",
        "nutrition": ""
      }
    }
  },
  {
    "id": "boissons-gazeuses-1176",
    "postId": "1176",
    "categoryId": "boissons-gazeuses",
    "type": "drink",
    "priceEur": 4,
    "priceFormatted": "4 €",
    "isVerifiedPrice": true,
    "weight": "25 cl",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Looza Tomate",
        "description": "",
        "nutrition": ""
      },
      "nl": {
        "name": "Looza Tomato",
        "description": "",
        "nutrition": ""
      },
      "en": {
        "name": "Looza Tomato",
        "description": "",
        "nutrition": ""
      },
      "ro": {
        "name": "Looza Tomato",
        "description": "",
        "nutrition": ""
      }
    }
  },
  {
    "id": "boissons-gazeuses-1177",
    "postId": "1177",
    "categoryId": "boissons-gazeuses",
    "type": "drink",
    "priceEur": 4,
    "priceFormatted": "4 €",
    "isVerifiedPrice": true,
    "weight": "25 cl",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Schweppes Tonic",
        "description": "",
        "nutrition": ""
      },
      "nl": {
        "name": "Schweppes Tonic",
        "description": "",
        "nutrition": ""
      },
      "en": {
        "name": "Schweppes Tonic",
        "description": "",
        "nutrition": ""
      },
      "ro": {
        "name": "Schweppes Tonic",
        "description": "",
        "nutrition": ""
      }
    }
  },
  {
    "id": "boissons-gazeuses-1178",
    "postId": "1178",
    "categoryId": "boissons-gazeuses",
    "type": "drink",
    "priceEur": 4,
    "priceFormatted": "4 €",
    "isVerifiedPrice": true,
    "weight": "25 cl",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Schweppes Agrum",
        "description": "",
        "nutrition": ""
      },
      "nl": {
        "name": "Schweppes Citrus",
        "description": "",
        "nutrition": ""
      },
      "en": {
        "name": "Schweppes Citrus",
        "description": "",
        "nutrition": ""
      },
      "ro": {
        "name": "Schweppes Agrum",
        "description": "",
        "nutrition": ""
      }
    }
  },
  {
    "id": "boissons-gazeuses-1167",
    "postId": "1167",
    "categoryId": "boissons-gazeuses",
    "type": "drink",
    "priceEur": 4,
    "priceFormatted": "4 €",
    "isVerifiedPrice": true,
    "weight": "20 cl",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Coca Cola",
        "description": "",
        "nutrition": ""
      },
      "nl": {
        "name": "Coca Cola",
        "description": "",
        "nutrition": ""
      },
      "en": {
        "name": "Coca Cola",
        "description": "",
        "nutrition": ""
      },
      "ro": {
        "name": "Coca Cola",
        "description": "",
        "nutrition": ""
      }
    }
  },
  {
    "id": "boissons-gazeuses-1179",
    "postId": "1179",
    "categoryId": "boissons-gazeuses",
    "type": "drink",
    "priceEur": 4.5,
    "priceFormatted": "4,5 €",
    "isVerifiedPrice": true,
    "weight": "33 cl",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "San Pellegrino Pamplemousse",
        "description": "",
        "nutrition": ""
      },
      "nl": {
        "name": "San Pellegrino Grapefruit",
        "description": "",
        "nutrition": ""
      },
      "en": {
        "name": "San Pellegrino Grapefruit",
        "description": "",
        "nutrition": ""
      },
      "ro": {
        "name": "San Pelegrino Grapefruit",
        "description": "",
        "nutrition": ""
      }
    }
  },
  {
    "id": "boissons-gazeuses-1169",
    "postId": "1169",
    "categoryId": "boissons-gazeuses",
    "type": "drink",
    "priceEur": 4,
    "priceFormatted": "4 €",
    "isVerifiedPrice": true,
    "weight": "30 cl",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Coca-Cola Zéro Sucre",
        "description": "",
        "nutrition": ""
      },
      "nl": {
        "name": "Coca-Cola Zero Sugar",
        "description": "",
        "nutrition": ""
      },
      "en": {
        "name": "Coca-Cola Zero Sugar",
        "description": "",
        "nutrition": ""
      },
      "ro": {
        "name": "Sprite",
        "description": "",
        "nutrition": ""
      }
    }
  },
  {
    "id": "boissons-gazeuses-1183",
    "postId": "1183",
    "categoryId": "boissons-gazeuses",
    "type": "drink",
    "priceEur": 4,
    "priceFormatted": "4 €",
    "isVerifiedPrice": true,
    "weight": "20 cl",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Fever Three Tonic",
        "description": "",
        "nutrition": ""
      },
      "nl": {
        "name": "Fever Three Tonic",
        "description": "",
        "nutrition": ""
      },
      "en": {
        "name": "Fever Three Tonic",
        "description": "",
        "nutrition": ""
      },
      "ro": {
        "name": "Fever Three Tonic",
        "description": "",
        "nutrition": ""
      }
    }
  },
  {
    "id": "boissons-gazeuses-1163",
    "postId": "1163",
    "categoryId": "boissons-gazeuses",
    "type": "drink",
    "priceEur": 3.5,
    "priceFormatted": "3,5 €",
    "isVerifiedPrice": true,
    "weight": "25 cl",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Eau plate",
        "description": "",
        "nutrition": ""
      },
      "nl": {
        "name": "Still water",
        "description": "",
        "nutrition": ""
      },
      "en": {
        "name": "Still water",
        "description": "",
        "nutrition": ""
      },
      "ro": {
        "name": "Apa Plata",
        "description": "",
        "nutrition": ""
      }
    }
  },
  {
    "id": "boissons-gazeuses-1164",
    "postId": "1164",
    "categoryId": "boissons-gazeuses",
    "type": "drink",
    "priceEur": 3.5,
    "priceFormatted": "3,5 €",
    "isVerifiedPrice": true,
    "weight": "25 cl",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Eau gazeuse",
        "description": "",
        "nutrition": ""
      },
      "nl": {
        "name": "Sparkling water",
        "description": "",
        "nutrition": ""
      },
      "en": {
        "name": "Sparkling water",
        "description": "",
        "nutrition": ""
      },
      "ro": {
        "name": "Apa Carbogazoasa Minerala",
        "description": "",
        "nutrition": ""
      }
    }
  },
  {
    "id": "boissons-naturelles-1229",
    "postId": "1229",
    "categoryId": "boissons-naturelles",
    "type": "drink",
    "priceEur": 7,
    "priceFormatted": "7 €",
    "isVerifiedPrice": true,
    "weight": "",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Limonade à la Mangue",
        "description": "Jus de citron, Sucre, Purée de mangue.",
        "nutrition": ""
      },
      "nl": {
        "name": "Mango Lemonade",
        "description": "Citroen juice, Sugar, Mango purée.",
        "nutrition": ""
      },
      "en": {
        "name": "Mango Lemonade",
        "description": "Lemon juice, Sugar, Mango purée.",
        "nutrition": ""
      },
      "ro": {
        "name": "Limonada Mango",
        "description": "Suc lamaie, Zahar, Piure mango.",
        "nutrition": ""
      }
    }
  },
  {
    "id": "boissons-naturelles-1230",
    "postId": "1230",
    "categoryId": "boissons-naturelles",
    "type": "drink",
    "priceEur": 7,
    "priceFormatted": "7 €",
    "isVerifiedPrice": true,
    "weight": "",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Limonade à la Pastèque",
        "description": "Jus de citron, Sucre, Purée de pastèque.",
        "nutrition": ""
      },
      "nl": {
        "name": "Watermelon Lemonade",
        "description": "Citroen juice, Sugar, Watermelon purée.",
        "nutrition": ""
      },
      "en": {
        "name": "Watermelon Lemonade",
        "description": "Lemon juice, Sugar, Watermelon purée.",
        "nutrition": ""
      },
      "ro": {
        "name": "Limonada Pepene",
        "description": "Suc lamaie, Zahar, Piure de pepene.",
        "nutrition": ""
      }
    }
  },
  {
    "id": "boissons-naturelles-1227",
    "postId": "1227",
    "categoryId": "boissons-naturelles",
    "type": "drink",
    "priceEur": 6,
    "priceFormatted": "6 €",
    "isVerifiedPrice": true,
    "weight": "",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Limonade Classique",
        "description": "Jus de citron, Sucre.",
        "nutrition": ""
      },
      "nl": {
        "name": "Classic Lemonade",
        "description": "Citroen juice, Sugar.",
        "nutrition": ""
      },
      "en": {
        "name": "Classic Lemonade",
        "description": "Lemon juice, Sugar.",
        "nutrition": ""
      },
      "ro": {
        "name": "Limonada Clasica",
        "description": "Suc lamaie, Zahar.",
        "nutrition": ""
      }
    }
  },
  {
    "id": "boissons-naturelles-1228",
    "postId": "1228",
    "categoryId": "boissons-naturelles",
    "type": "drink",
    "priceEur": 6.5,
    "priceFormatted": "6,5 €",
    "isVerifiedPrice": true,
    "weight": "",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Limonade à la Menthe",
        "description": "Jus de citron, Sucre, Menthe.",
        "nutrition": ""
      },
      "nl": {
        "name": "Lemonade with Mint",
        "description": "Citroen juice, Sugar, Mint.",
        "nutrition": ""
      },
      "en": {
        "name": "Lemonade with Mint",
        "description": "Lemon juice, Sugar, Mint.",
        "nutrition": ""
      },
      "ro": {
        "name": "Limonada cu menta",
        "description": "Suc lamaie, Zahar, Menta.",
        "nutrition": ""
      }
    }
  },
  {
    "id": "boissons-naturelles-1234",
    "postId": "1234",
    "categoryId": "boissons-naturelles",
    "type": "drink",
    "priceEur": 4,
    "priceFormatted": "4 €",
    "isVerifiedPrice": true,
    "weight": "",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Jus Mixte avec Pommes et Fraises",
        "description": "",
        "nutrition": ""
      },
      "nl": {
        "name": "Mixed Juice with Apples and Strawberries",
        "description": "",
        "nutrition": ""
      },
      "en": {
        "name": "Mixed Juice with Apples and Strawberries",
        "description": "",
        "nutrition": ""
      },
      "ro": {
        "name": "Suc mix cu mere si capsune",
        "description": "",
        "nutrition": ""
      }
    }
  },
  {
    "id": "boissons-naturelles-1235",
    "postId": "1235",
    "categoryId": "boissons-naturelles",
    "type": "drink",
    "priceEur": 4,
    "priceFormatted": "4 €",
    "isVerifiedPrice": true,
    "weight": "",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Jus Mixte avec Pommes et Mangue",
        "description": "",
        "nutrition": ""
      },
      "nl": {
        "name": "Mixed Juice with Apples and Mango",
        "description": "",
        "nutrition": ""
      },
      "en": {
        "name": "Mixed Juice with Apples and Mango",
        "description": "",
        "nutrition": ""
      },
      "ro": {
        "name": "Suc Mix cu mar, morcov si portocale",
        "description": "",
        "nutrition": ""
      }
    }
  },
  {
    "id": "boissons-naturelles-1231",
    "postId": "1231",
    "categoryId": "boissons-naturelles",
    "type": "drink",
    "priceEur": 4,
    "priceFormatted": "4 €",
    "isVerifiedPrice": true,
    "weight": "",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Jus d’Orange Frais",
        "description": "Jus d’orange.",
        "nutrition": ""
      },
      "nl": {
        "name": "Orange Fresh Juice",
        "description": "Orange juice.",
        "nutrition": ""
      },
      "en": {
        "name": "Orange Fresh Juice",
        "description": "Orange juice.",
        "nutrition": ""
      },
      "ro": {
        "name": "Fresh de portocale",
        "description": "Suc de portocale.",
        "nutrition": ""
      }
    }
  },
  {
    "id": "boissons-naturelles-1232",
    "postId": "1232",
    "categoryId": "boissons-naturelles",
    "type": "drink",
    "priceEur": 4,
    "priceFormatted": "4 €",
    "isVerifiedPrice": true,
    "weight": "",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Jus Mixte avec Pomme, Carotte et Orange",
        "description": "",
        "nutrition": ""
      },
      "nl": {
        "name": "Mixed Juice with Apple, Carrot, and Orange",
        "description": "",
        "nutrition": ""
      },
      "en": {
        "name": "Mixed Juice with Apple, Carrot, and Orange",
        "description": "",
        "nutrition": ""
      },
      "ro": {
        "name": "Suc Mix cu mar, morcov si portocale",
        "description": "",
        "nutrition": ""
      }
    }
  },
  {
    "id": "cocktails-1245",
    "postId": "1245",
    "categoryId": "cocktails",
    "type": "drink",
    "priceEur": 15,
    "priceFormatted": "15 €",
    "isVerifiedPrice": true,
    "weight": "",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Margarita",
        "description": "Tequila Olmeca Silver, Cointreau, Jus de citron vert, Sel.",
        "nutrition": ""
      },
      "nl": {
        "name": "Margarita",
        "description": "Tequila Olmeca Silver, Cointreau, Lime juice, Zout.",
        "nutrition": ""
      },
      "en": {
        "name": "Margarita",
        "description": "Tequila Olmeca Silver, Cointreau, Lime juice, Salt.",
        "nutrition": ""
      },
      "ro": {
        "name": "Margarita",
        "description": "Tequila Olmeca Silver, Cointreau, Suc lime, Sare.",
        "nutrition": ""
      }
    }
  },
  {
    "id": "cocktails-1247",
    "postId": "1247",
    "categoryId": "cocktails",
    "type": "drink",
    "priceEur": 15,
    "priceFormatted": "15 €",
    "isVerifiedPrice": true,
    "weight": "",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Moscow Mule",
        "description": "Vodka Absolut, Jus de citron vert, Sirop de sucre, Bière au gingembre.",
        "nutrition": ""
      },
      "nl": {
        "name": "Moscow Mule",
        "description": "Absolut Vodka, Lime juice, Sugar syrup, Ginger beer.",
        "nutrition": ""
      },
      "en": {
        "name": "Moscow Mule",
        "description": "Absolut Vodka, Lime juice, Sugar syrup, Ginger beer.",
        "nutrition": ""
      },
      "ro": {
        "name": "Moscow Mule",
        "description": "Absolut vodka, Suc lime, Sirop zahar, Ginger beer.",
        "nutrition": ""
      }
    }
  },
  {
    "id": "cocktails-1248",
    "postId": "1248",
    "categoryId": "cocktails",
    "type": "drink",
    "priceEur": 15,
    "priceFormatted": "15 €",
    "isVerifiedPrice": true,
    "weight": "",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Espresso Martini",
        "description": "Vodka Absolut, Kahlúa, Café, Sirop de sucre.",
        "nutrition": ""
      },
      "nl": {
        "name": "Espresso Martini",
        "description": "Absolut Vodka, Kahlúa, Coffee, Sugar syrup.",
        "nutrition": ""
      },
      "en": {
        "name": "Espresso Martini",
        "description": "Absolut Vodka, Kahlúa, Coffee, Sugar syrup.",
        "nutrition": ""
      },
      "ro": {
        "name": "Espresso Martini",
        "description": "Absolut vodka, Kahlua, Cafea, Sirop zahar.",
        "nutrition": ""
      }
    }
  },
  {
    "id": "cocktails-1249",
    "postId": "1249",
    "categoryId": "cocktails",
    "type": "drink",
    "priceEur": 15,
    "priceFormatted": "15 €",
    "isVerifiedPrice": true,
    "weight": "",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Porn Star Martini",
        "description": "Vodka Vanilla Absolut, Prosecco Cava, Passoã, Purée de fruit de la passion, Jus de citron vert.",
        "nutrition": ""
      },
      "nl": {
        "name": "Porn Star Martini",
        "description": "Absolut Vanilla Vodka, Prosecco Cava, Passoã, Passion fruit purée, Lime juice.",
        "nutrition": ""
      },
      "en": {
        "name": "Porn Star Martini",
        "description": "Absolut Vanilla Vodka, Prosecco Cava, Passoã, Passion fruit purée, Lime juice.",
        "nutrition": ""
      },
      "ro": {
        "name": "Porn Star Martini",
        "description": "Absolut Vanilla vodka, Prosecco Cava, Passoa, Piure fructul pasiunii, Suc lime.",
        "nutrition": ""
      }
    }
  },
  {
    "id": "cocktails-1250",
    "postId": "1250",
    "categoryId": "cocktails",
    "type": "drink",
    "priceEur": 15,
    "priceFormatted": "15 €",
    "isVerifiedPrice": true,
    "weight": "",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Daiquiri",
        "description": "Havana 3 Ans, Sirop de citron vert, Sirop de sucre.",
        "nutrition": ""
      },
      "nl": {
        "name": "Daiquiri",
        "description": "Havana 3 Years, Lime syrup, Sugar syrup.",
        "nutrition": ""
      },
      "en": {
        "name": "Daiquiri",
        "description": "Havana 3 Years, Lime syrup, Sugar syrup.",
        "nutrition": ""
      },
      "ro": {
        "name": "Daiquiri",
        "description": "Havana 3 ani, Sirop lime, Sirop zahar.",
        "nutrition": ""
      }
    }
  },
  {
    "id": "cocktails-1251",
    "postId": "1251",
    "categoryId": "cocktails",
    "type": "drink",
    "priceEur": 15,
    "priceFormatted": "15 €",
    "isVerifiedPrice": true,
    "weight": "",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Mojito",
        "description": "Havana 3 Ans, Sirop de sucre, Menthe",
        "nutrition": ""
      },
      "nl": {
        "name": "Mojito",
        "description": "Havana 3 Years, Sugar syrup, Mint",
        "nutrition": ""
      },
      "en": {
        "name": "Mojito",
        "description": "Havana 3 Years, Sugar syrup, Mint",
        "nutrition": ""
      },
      "ro": {
        "name": "Mojito",
        "description": "Havana 3 ani, Sirop zahar, Menta.",
        "nutrition": ""
      }
    }
  },
  {
    "id": "cocktails-1252",
    "postId": "1252",
    "categoryId": "cocktails",
    "type": "drink",
    "priceEur": 15,
    "priceFormatted": "15 €",
    "isVerifiedPrice": true,
    "weight": "",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Cool Mango",
        "description": "Vodka Absolut, Purée de mangue, Jus de citron vert, Tabasco.",
        "nutrition": ""
      },
      "nl": {
        "name": "Daiquiri",
        "description": "Havana 3 Years, Lime syrup, Sugar syrup.",
        "nutrition": ""
      },
      "en": {
        "name": "Daiquiri",
        "description": "Havana 3 Years, Lime syrup, Sugar syrup.",
        "nutrition": ""
      },
      "ro": {
        "name": "Cool Mango",
        "description": "Absolut vodka, Piure mango, Suc lime, Tabasco.",
        "nutrition": ""
      }
    }
  },
  {
    "id": "cocktails-1253",
    "postId": "1253",
    "categoryId": "cocktails",
    "type": "drink",
    "priceEur": 15,
    "priceFormatted": "15 €",
    "isVerifiedPrice": true,
    "weight": "",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Stress Zero",
        "description": "Jägermeister, Peachtree, Jus de citron vert, Jus d’orange.",
        "nutrition": ""
      },
      "nl": {
        "name": "Stress Zero",
        "description": "Jägermeister, Peachtree, Lime juice, Orange juice.",
        "nutrition": ""
      },
      "en": {
        "name": "Stress Zero",
        "description": "Jägermeister, Peachtree, Lime juice, Orange juice.",
        "nutrition": ""
      },
      "ro": {
        "name": "Stress Zero",
        "description": "Jagermeister, Peachtree, Suc lime, Suc Portocale.",
        "nutrition": ""
      }
    }
  },
  {
    "id": "cocktails-sans-alcool-1268",
    "postId": "1268",
    "categoryId": "cocktails-sans-alcool",
    "type": "drink",
    "priceEur": 12,
    "priceFormatted": "12 €",
    "isVerifiedPrice": true,
    "weight": "",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Nature Call",
        "description": "Fi-ga, Jus de citron vert, Sirop de fruit de la passion, Jus de fraise/pomme/orange.",
        "nutrition": ""
      },
      "nl": {
        "name": "Nature Call",
        "description": "Fi-ga, Lime juice, Passion fruit syrup, Strawberry/Apple/Orange juice.",
        "nutrition": ""
      },
      "en": {
        "name": "Nature Call",
        "description": "Fi-ga, Lime juice, Passion fruit syrup, Strawberry/Apple/Orange juice.",
        "nutrition": ""
      },
      "ro": {
        "name": "Nature Call",
        "description": "Fi-ga, Suc lime, Sirop fructul pasiunii, Suc capsune/mar/portocale.",
        "nutrition": ""
      }
    }
  },
  {
    "id": "cocktails-sans-alcool-1265",
    "postId": "1265",
    "categoryId": "cocktails-sans-alcool",
    "type": "drink",
    "priceEur": 10,
    "priceFormatted": "10 €",
    "isVerifiedPrice": true,
    "weight": "",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Ginger Splash",
        "description": "Bière au gingembre, Purée de fraise, Citron vert.",
        "nutrition": ""
      },
      "nl": {
        "name": "Ginger Splash",
        "description": "Ginger beer, Strawberry purée, Lime.",
        "nutrition": ""
      },
      "en": {
        "name": "Ginger Splash",
        "description": "Ginger beer, Strawberry purée, Lime.",
        "nutrition": ""
      },
      "ro": {
        "name": "Ginger Splash",
        "description": "Ginger beer, Piure capsune, Lime.",
        "nutrition": ""
      }
    }
  },
  {
    "id": "cocktails-sans-alcool-1266",
    "postId": "1266",
    "categoryId": "cocktails-sans-alcool",
    "type": "drink",
    "priceEur": 10,
    "priceFormatted": "10 €",
    "isVerifiedPrice": true,
    "weight": "",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Virgin Mojito",
        "description": "Jus de citron vert, Menthe, Sirop de sucre, Eau gazeuse.",
        "nutrition": ""
      },
      "nl": {
        "name": "Virgin Mojito",
        "description": "Lime juice, Mint, Sugar syrup, Sparkling water.",
        "nutrition": ""
      },
      "en": {
        "name": "Virgin Mojito",
        "description": "Lime juice, Mint, Sugar syrup, Sparkling water.",
        "nutrition": ""
      },
      "ro": {
        "name": "Virgin Mojito",
        "description": "Suc lime, Menta, Sirop zahar, Apa minerala.",
        "nutrition": ""
      }
    }
  },
  {
    "id": "cocktails-sans-alcool-1267",
    "postId": "1267",
    "categoryId": "cocktails-sans-alcool",
    "type": "drink",
    "priceEur": 10,
    "priceFormatted": "10 €",
    "isVerifiedPrice": true,
    "weight": "",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Hugo Lemonade",
        "description": "Jus de citron vert, Sirop de fleur de sureau, Menthe, Sprite.",
        "nutrition": ""
      },
      "nl": {
        "name": "Hugo Lemonade",
        "description": "Lime juice, Elderflower syrup, Mint, Sprite.",
        "nutrition": ""
      },
      "en": {
        "name": "Hugo Lemonade",
        "description": "Lime juice, Elderflower syrup, Mint, Sprite.",
        "nutrition": ""
      },
      "ro": {
        "name": "Hugo Lemonade",
        "description": "Suc lime, Sirop soc, Menta, Sprite.",
        "nutrition": ""
      }
    }
  },
  {
    "id": "cocktails-sans-alcool-1269",
    "postId": "1269",
    "categoryId": "cocktails-sans-alcool",
    "type": "drink",
    "priceEur": 10,
    "priceFormatted": "10 €",
    "isVerifiedPrice": true,
    "weight": "",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Summer Time",
        "description": "Sprite, Jus de citron vert, Jus de pomme/mangue, Menthe.",
        "nutrition": ""
      },
      "nl": {
        "name": "Summer Time",
        "description": "Sprite, Lime juice, Apple/Mango juice, Mint.",
        "nutrition": ""
      },
      "en": {
        "name": "Summer Time",
        "description": "Sprite, Lime juice, Apple/Mango juice, Mint.",
        "nutrition": ""
      },
      "ro": {
        "name": "Summer Time",
        "description": "Sprite, Suc lime, Suc mar/mango, Menta.",
        "nutrition": ""
      }
    }
  },
  {
    "id": "boissons-fortes-1205",
    "postId": "1205",
    "categoryId": "boissons-fortes",
    "type": "drink",
    "priceEur": 37,
    "priceFormatted": "37 €",
    "isVerifiedPrice": true,
    "weight": "5 cl",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Hennessy XO",
        "description": "",
        "nutrition": ""
      },
      "nl": {
        "name": "Hennessy XO",
        "description": "",
        "nutrition": ""
      },
      "en": {
        "name": "Hennessy XO",
        "description": "",
        "nutrition": ""
      },
      "ro": {
        "name": "Hennessy XO",
        "description": "",
        "nutrition": ""
      }
    }
  },
  {
    "id": "boissons-fortes-1203",
    "postId": "1203",
    "categoryId": "boissons-fortes",
    "type": "drink",
    "priceEur": 35,
    "priceFormatted": "35 €",
    "isVerifiedPrice": true,
    "weight": "5 cl",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Martell XO 5",
        "description": "",
        "nutrition": ""
      },
      "nl": {
        "name": "Martell XO 5",
        "description": "",
        "nutrition": ""
      },
      "en": {
        "name": "Martell XO 5",
        "description": "",
        "nutrition": ""
      },
      "ro": {
        "name": "Martell XO",
        "description": "",
        "nutrition": ""
      }
    }
  },
  {
    "id": "boissons-fortes-1194",
    "postId": "1194",
    "categoryId": "boissons-fortes",
    "type": "drink",
    "priceEur": 14,
    "priceFormatted": "14 €",
    "isVerifiedPrice": true,
    "weight": "5 cl",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Monkey 47",
        "description": "",
        "nutrition": ""
      },
      "nl": {
        "name": "Monkey 47",
        "description": "",
        "nutrition": ""
      },
      "en": {
        "name": "Monkey 47",
        "description": "",
        "nutrition": ""
      },
      "ro": {
        "name": "Monkey 47",
        "description": "",
        "nutrition": ""
      }
    }
  },
  {
    "id": "boissons-fortes-1201",
    "postId": "1201",
    "categoryId": "boissons-fortes",
    "type": "drink",
    "priceEur": 14,
    "priceFormatted": "14 €",
    "isVerifiedPrice": true,
    "weight": "5 cl",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Chivas Regal 12 Ans",
        "description": "",
        "nutrition": ""
      },
      "nl": {
        "name": "Chivas Regal 12 Years",
        "description": "",
        "nutrition": ""
      },
      "en": {
        "name": "Chivas Regal 12 Years",
        "description": "",
        "nutrition": ""
      },
      "ro": {
        "name": "Chivas 12",
        "description": "",
        "nutrition": ""
      }
    }
  },
  {
    "id": "boissons-fortes-1190",
    "postId": "1190",
    "categoryId": "boissons-fortes",
    "type": "drink",
    "priceEur": 14,
    "priceFormatted": "14 €",
    "isVerifiedPrice": true,
    "weight": "5 cl",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Vodka Grey Goose",
        "description": "",
        "nutrition": ""
      },
      "nl": {
        "name": "Grey Goose Vodka",
        "description": "",
        "nutrition": ""
      },
      "en": {
        "name": "Grey Goose Vodka",
        "description": "",
        "nutrition": ""
      },
      "ro": {
        "name": "Vodka Grey Goose",
        "description": "",
        "nutrition": ""
      }
    }
  },
  {
    "id": "boissons-fortes-1192",
    "postId": "1192",
    "categoryId": "boissons-fortes",
    "type": "drink",
    "priceEur": 13,
    "priceFormatted": "13 €",
    "isVerifiedPrice": true,
    "weight": "5 cl",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Havana Club 7 Ans",
        "description": "",
        "nutrition": ""
      },
      "nl": {
        "name": "Havana Club 7 Years",
        "description": "",
        "nutrition": ""
      },
      "en": {
        "name": "Havana Club 7 Years",
        "description": "",
        "nutrition": ""
      },
      "ro": {
        "name": "Havana 7 ani",
        "description": "",
        "nutrition": ""
      }
    }
  },
  {
    "id": "boissons-fortes-1204",
    "postId": "1204",
    "categoryId": "boissons-fortes",
    "type": "drink",
    "priceEur": 13,
    "priceFormatted": "13 €",
    "isVerifiedPrice": true,
    "weight": "5 cl",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Hennessy VS",
        "description": "",
        "nutrition": ""
      },
      "nl": {
        "name": "Hennessy VS",
        "description": "",
        "nutrition": ""
      },
      "en": {
        "name": "Hennessy VS",
        "description": "",
        "nutrition": ""
      },
      "ro": {
        "name": "Hennessy VS",
        "description": "",
        "nutrition": ""
      }
    }
  },
  {
    "id": "boissons-fortes-1198",
    "postId": "1198",
    "categoryId": "boissons-fortes",
    "type": "drink",
    "priceEur": 13,
    "priceFormatted": "13 €",
    "isVerifiedPrice": true,
    "weight": "5 cl",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Tequila Don Julio Reposado",
        "description": "",
        "nutrition": ""
      },
      "nl": {
        "name": "Don Julio Reposado Tequila",
        "description": "",
        "nutrition": ""
      },
      "en": {
        "name": "Don Julio Reposado Tequila",
        "description": "",
        "nutrition": ""
      },
      "ro": {
        "name": "Don Julio Reposado",
        "description": "",
        "nutrition": ""
      }
    }
  },
  {
    "id": "boissons-fortes-1196",
    "postId": "1196",
    "categoryId": "boissons-fortes",
    "type": "drink",
    "priceEur": 12,
    "priceFormatted": "12 €",
    "isVerifiedPrice": true,
    "weight": "5 cl",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Tequila Don Julio Blanco",
        "description": "",
        "nutrition": ""
      },
      "nl": {
        "name": "Don Julio Blanco Tequila",
        "description": "",
        "nutrition": ""
      },
      "en": {
        "name": "Don Julio Blanco Tequila",
        "description": "",
        "nutrition": ""
      },
      "ro": {
        "name": "Don Julio Blanco",
        "description": "",
        "nutrition": ""
      }
    }
  },
  {
    "id": "boissons-fortes-1200",
    "postId": "1200",
    "categoryId": "boissons-fortes",
    "type": "drink",
    "priceEur": 12,
    "priceFormatted": "12 €",
    "isVerifiedPrice": true,
    "weight": "5 cl",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Johnnie Walker Black Label",
        "description": "",
        "nutrition": ""
      },
      "nl": {
        "name": "Johnnie Walker Black Label",
        "description": "",
        "nutrition": ""
      },
      "en": {
        "name": "Johnnie Walker Black Label",
        "description": "",
        "nutrition": ""
      },
      "ro": {
        "name": "Johnnie Walker Black",
        "description": "",
        "nutrition": ""
      }
    }
  },
  {
    "id": "boissons-fortes-1202",
    "postId": "1202",
    "categoryId": "boissons-fortes",
    "type": "drink",
    "priceEur": 12,
    "priceFormatted": "12 €",
    "isVerifiedPrice": true,
    "weight": "5 cl",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Martell VS 5",
        "description": "",
        "nutrition": ""
      },
      "nl": {
        "name": "Martell VS 5",
        "description": "",
        "nutrition": ""
      },
      "en": {
        "name": "Martell VS 5",
        "description": "",
        "nutrition": ""
      },
      "ro": {
        "name": "Martell VS",
        "description": "",
        "nutrition": ""
      }
    }
  },
  {
    "id": "boissons-fortes-1209",
    "postId": "1209",
    "categoryId": "boissons-fortes",
    "type": "drink",
    "priceEur": 11,
    "priceFormatted": "11 €",
    "isVerifiedPrice": true,
    "weight": "5 cl",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Limoncello",
        "description": "",
        "nutrition": ""
      },
      "nl": {
        "name": "Limoncello",
        "description": "",
        "nutrition": ""
      },
      "en": {
        "name": "Limoncello",
        "description": "",
        "nutrition": ""
      },
      "ro": {
        "name": "Limoncello",
        "description": "",
        "nutrition": ""
      }
    }
  },
  {
    "id": "boissons-fortes-1210",
    "postId": "1210",
    "categoryId": "boissons-fortes",
    "type": "drink",
    "priceEur": 11,
    "priceFormatted": "11 €",
    "isVerifiedPrice": true,
    "weight": "5 cl",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Cointreau",
        "description": "",
        "nutrition": ""
      },
      "nl": {
        "name": "Cointreau",
        "description": "",
        "nutrition": ""
      },
      "en": {
        "name": "Cointreau",
        "description": "",
        "nutrition": ""
      },
      "ro": {
        "name": "Cointreau",
        "description": "",
        "nutrition": ""
      }
    }
  },
  {
    "id": "boissons-fortes-1195",
    "postId": "1195",
    "categoryId": "boissons-fortes",
    "type": "drink",
    "priceEur": 10,
    "priceFormatted": "10 €",
    "isVerifiedPrice": true,
    "weight": "5 cl",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Tequila Olmeca Silver",
        "description": "",
        "nutrition": ""
      },
      "nl": {
        "name": "Absolut Vodka",
        "description": "",
        "nutrition": ""
      },
      "en": {
        "name": "Absolut Vodka",
        "description": "",
        "nutrition": ""
      },
      "ro": {
        "name": "Olmelca Silver",
        "description": "",
        "nutrition": ""
      }
    }
  },
  {
    "id": "boissons-fortes-1208",
    "postId": "1208",
    "categoryId": "boissons-fortes",
    "type": "drink",
    "priceEur": 10,
    "priceFormatted": "10 €",
    "isVerifiedPrice": true,
    "weight": "5 cl",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Disaronno Amaretto",
        "description": "",
        "nutrition": ""
      },
      "nl": {
        "name": "Kahlúa Coffee Liqueur",
        "description": "",
        "nutrition": ""
      },
      "en": {
        "name": "Kahlúa Coffee Liqueur",
        "description": "",
        "nutrition": ""
      },
      "ro": {
        "name": "Disaronno Amaretto",
        "description": "",
        "nutrition": ""
      }
    }
  },
  {
    "id": "boissons-fortes-1199",
    "postId": "1199",
    "categoryId": "boissons-fortes",
    "type": "drink",
    "priceEur": 10,
    "priceFormatted": "10 €",
    "isVerifiedPrice": true,
    "weight": "5 cl",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Johnnie Walker Red Label",
        "description": "",
        "nutrition": ""
      },
      "nl": {
        "name": "Absolut Vanilla Vodka",
        "description": "",
        "nutrition": ""
      },
      "en": {
        "name": "Absolut Vanilla Vodka",
        "description": "",
        "nutrition": ""
      },
      "ro": {
        "name": "Olmelca Silver",
        "description": "",
        "nutrition": ""
      }
    }
  },
  {
    "id": "boissons-fortes-1189",
    "postId": "1189",
    "categoryId": "boissons-fortes",
    "type": "drink",
    "priceEur": 10,
    "priceFormatted": "10 €",
    "isVerifiedPrice": true,
    "weight": "5 cl",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Vodka Absolut Vanille",
        "description": "",
        "nutrition": ""
      },
      "nl": {
        "name": "Absolut Vanilla Vodka",
        "description": "",
        "nutrition": ""
      },
      "en": {
        "name": "Absolut Vanilla Vodka",
        "description": "",
        "nutrition": ""
      },
      "ro": {
        "name": "Vodka Absolut Vanilla",
        "description": "",
        "nutrition": ""
      }
    }
  },
  {
    "id": "boissons-fortes-1191",
    "postId": "1191",
    "categoryId": "boissons-fortes",
    "type": "drink",
    "priceEur": 10,
    "priceFormatted": "10 €",
    "isVerifiedPrice": true,
    "weight": "5 cl",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Havana Club 3 Ans",
        "description": "",
        "nutrition": ""
      },
      "nl": {
        "name": "Havana Club 3 Years",
        "description": "",
        "nutrition": ""
      },
      "en": {
        "name": "Havana Club 3 Years",
        "description": "",
        "nutrition": ""
      },
      "ro": {
        "name": "Havana 3 ani",
        "description": "",
        "nutrition": ""
      }
    }
  },
  {
    "id": "boissons-fortes-1193",
    "postId": "1193",
    "categoryId": "boissons-fortes",
    "type": "drink",
    "priceEur": 10,
    "priceFormatted": "10 €",
    "isVerifiedPrice": true,
    "weight": "5 cl",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Gin Gibson’s",
        "description": "",
        "nutrition": ""
      },
      "nl": {
        "name": "Gibson’s Gin",
        "description": "",
        "nutrition": ""
      },
      "en": {
        "name": "Gibson’s Gin",
        "description": "",
        "nutrition": ""
      },
      "ro": {
        "name": "Gibson Gin",
        "description": "",
        "nutrition": ""
      }
    }
  },
  {
    "id": "boissons-fortes-1207",
    "postId": "1207",
    "categoryId": "boissons-fortes",
    "type": "drink",
    "priceEur": 9,
    "priceFormatted": "9 €",
    "isVerifiedPrice": true,
    "weight": "5 cl",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Campari",
        "description": "",
        "nutrition": ""
      },
      "nl": {
        "name": "Campari",
        "description": "",
        "nutrition": ""
      },
      "en": {
        "name": "Campari",
        "description": "",
        "nutrition": ""
      },
      "ro": {
        "name": "Campari",
        "description": "",
        "nutrition": ""
      }
    }
  },
  {
    "id": "gin-tonic-1261",
    "postId": "1261",
    "categoryId": "gin-tonic",
    "type": "drink",
    "priceEur": 15,
    "priceFormatted": "15 €",
    "isVerifiedPrice": true,
    "weight": "",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Gin Classique",
        "description": "Gin, Schweppes, Citron, Citron vert.",
        "nutrition": ""
      },
      "nl": {
        "name": "Classic Gin",
        "description": "Gin, Schweppes, Citroen, Lime.",
        "nutrition": ""
      },
      "en": {
        "name": "Classic Gin",
        "description": "Gin, Schweppes, Lemon, Lime.",
        "nutrition": ""
      },
      "ro": {
        "name": "Clasic Gin",
        "description": "Gin, Scweppes, Lamaie, Lime.",
        "nutrition": ""
      }
    }
  },
  {
    "id": "gin-tonic-1262",
    "postId": "1262",
    "categoryId": "gin-tonic",
    "type": "drink",
    "priceEur": 15,
    "priceFormatted": "15 €",
    "isVerifiedPrice": true,
    "weight": "",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Pink is The New Tonic",
        "description": "Gin, Schweppes, Jus de fraise/pomme.",
        "nutrition": ""
      },
      "nl": {
        "name": "Pink is The New Tonic",
        "description": "Gin, Schweppes, Strawberry/Apple juice.",
        "nutrition": ""
      },
      "en": {
        "name": "Pink is The New Tonic",
        "description": "Gin, Schweppes, Strawberry/Apple juice.",
        "nutrition": ""
      },
      "ro": {
        "name": "Pink is The New Tonic",
        "description": "Gin, Schweppes, Suc capsune/ mar.",
        "nutrition": ""
      }
    }
  },
  {
    "id": "gin-tonic-1264",
    "postId": "1264",
    "categoryId": "gin-tonic",
    "type": "drink",
    "priceEur": 15,
    "priceFormatted": "15 €",
    "isVerifiedPrice": true,
    "weight": "",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Jungle Gin",
        "description": "Monkey, Schweppes, Pomme verte, Citron vert, Basilic.",
        "nutrition": ""
      },
      "nl": {
        "name": "Jungle Gin",
        "description": "Monkey, Schweppes, Green apple, Lime, Basil.",
        "nutrition": ""
      },
      "en": {
        "name": "Jungle Gin",
        "description": "Monkey, Schweppes, Green apple, Lime, Basil.",
        "nutrition": ""
      },
      "ro": {
        "name": "Jungle Gin",
        "description": "Monkey, Schweppes, Mar verde, Lime, Busuioc.",
        "nutrition": ""
      }
    }
  },
  {
    "id": "vins-1214",
    "postId": "1214",
    "categoryId": "vins",
    "type": "drink",
    "priceEur": 40,
    "priceFormatted": "40 €",
    "isVerifiedPrice": true,
    "weight": "75 cl",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Aerosoli Fetească Vin Blanc",
        "description": "",
        "nutrition": ""
      },
      "nl": {
        "name": "Aerosoli Fetească Witte Wijn",
        "description": "",
        "nutrition": ""
      },
      "en": {
        "name": "Aerosoli Fetească White Wine",
        "description": "",
        "nutrition": ""
      },
      "ro": {
        "name": "Aerosoli Feteasca Alba",
        "description": "",
        "nutrition": ""
      }
    }
  },
  {
    "id": "vins-1215",
    "postId": "1215",
    "categoryId": "vins",
    "type": "drink",
    "priceEur": 40,
    "priceFormatted": "40 €",
    "isVerifiedPrice": true,
    "weight": "75 cl",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Aerosoli Vin Rosé",
        "description": "",
        "nutrition": ""
      },
      "nl": {
        "name": "Aerosoli Rosé Wine",
        "description": "",
        "nutrition": ""
      },
      "en": {
        "name": "Aerosoli Rosé Wine",
        "description": "",
        "nutrition": ""
      },
      "ro": {
        "name": "Aerosoli Rose",
        "description": "",
        "nutrition": ""
      }
    }
  },
  {
    "id": "vins-1271",
    "postId": "1271",
    "categoryId": "vins",
    "type": "drink",
    "priceEur": 40,
    "priceFormatted": "40 €",
    "isVerifiedPrice": true,
    "weight": "75 cl",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Cote de Brouilly Durette A servir Frais",
        "description": "",
        "nutrition": ""
      },
      "nl": {
        "name": "Cote de Brouilly Durette A servir Frais",
        "description": "",
        "nutrition": ""
      },
      "en": {
        "name": "Cote de Brouilly Durette A servir Frais",
        "description": "",
        "nutrition": ""
      },
      "ro": {
        "name": "Cote de Brouilly Durette A servir Frais",
        "description": "",
        "nutrition": ""
      }
    }
  },
  {
    "id": "vins-1273",
    "postId": "1273",
    "categoryId": "vins",
    "type": "drink",
    "priceEur": 30,
    "priceFormatted": "30 €",
    "isVerifiedPrice": true,
    "weight": "75 cl",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Côte du Rhône Vidal Fleury",
        "description": "",
        "nutrition": ""
      },
      "nl": {
        "name": "Côte du Rhône Vidal Fleury",
        "description": "",
        "nutrition": ""
      },
      "en": {
        "name": "Côte du Rhône Vidal Fleury",
        "description": "",
        "nutrition": ""
      },
      "ro": {
        "name": "Côte du Rhône Vidal Fleury",
        "description": "",
        "nutrition": ""
      }
    }
  },
  {
    "id": "vins-1272",
    "postId": "1272",
    "categoryId": "vins",
    "type": "drink",
    "priceEur": 10,
    "priceFormatted": "10 €",
    "isVerifiedPrice": true,
    "weight": "15 cl",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Côte de Brouilly Durette À servir frais – Verre",
        "description": "",
        "nutrition": ""
      },
      "nl": {
        "name": "Côte de Brouilly Durette Serve Chilled – Glass",
        "description": "",
        "nutrition": ""
      },
      "en": {
        "name": "Côte de Brouilly Durette Serve Chilled – Glass",
        "description": "",
        "nutrition": ""
      },
      "ro": {
        "name": "Cote de Brouilly Durette A servir Frais",
        "description": "",
        "nutrition": ""
      }
    }
  },
  {
    "id": "vins-1274",
    "postId": "1274",
    "categoryId": "vins",
    "type": "drink",
    "priceEur": 8,
    "priceFormatted": "8 €",
    "isVerifiedPrice": true,
    "weight": "15 cl",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Côte du Rhône Vidal Fleury - Verre",
        "description": "",
        "nutrition": ""
      },
      "nl": {
        "name": "Côte du Rhône Vidal Fleury - Glass",
        "description": "",
        "nutrition": ""
      },
      "en": {
        "name": "Côte du Rhône Vidal Fleury - Glass",
        "description": "",
        "nutrition": ""
      },
      "ro": {
        "name": "Côte du Rhône Vidal Fleury - Pahar",
        "description": "",
        "nutrition": ""
      }
    }
  },
  {
    "id": "vins-1217",
    "postId": "1217",
    "categoryId": "vins",
    "type": "drink",
    "priceEur": 8,
    "priceFormatted": "8 €",
    "isVerifiedPrice": true,
    "weight": "15 cl",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Aerosoli Rosé – Verre",
        "description": "",
        "nutrition": ""
      },
      "nl": {
        "name": "Aerosoli Rosé – Glass",
        "description": "",
        "nutrition": ""
      },
      "en": {
        "name": "Aerosoli Rosé – Glass",
        "description": "",
        "nutrition": ""
      },
      "ro": {
        "name": "Aerosoli Rose Pahar",
        "description": "",
        "nutrition": ""
      }
    }
  },
  {
    "id": "vins-1218",
    "postId": "1218",
    "categoryId": "vins",
    "type": "drink",
    "priceEur": 8,
    "priceFormatted": "8 €",
    "isVerifiedPrice": true,
    "weight": "15 cl",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Aerosoli Fetească Vin Blanc – Verre",
        "description": "",
        "nutrition": ""
      },
      "nl": {
        "name": "Aerosoli Fetească Witte Wijn - Glass",
        "description": "",
        "nutrition": ""
      },
      "en": {
        "name": "Aerosoli Fetească White Wine - Glass",
        "description": "",
        "nutrition": ""
      },
      "ro": {
        "name": "Aerosoli Feteasca Alba Pahar",
        "description": "",
        "nutrition": ""
      }
    }
  },
  {
    "id": "cocktails-petillants-1256",
    "postId": "1256",
    "categoryId": "cocktails-petillants",
    "type": "drink",
    "priceEur": 15,
    "priceFormatted": "15 €",
    "isVerifiedPrice": true,
    "weight": "",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Aperol",
        "description": "Aperol, Prosecco, Oranges.",
        "nutrition": ""
      },
      "nl": {
        "name": "Aperol",
        "description": "Aperol, Prosecco, Orange.",
        "nutrition": ""
      },
      "en": {
        "name": "Aperol",
        "description": "Aperol, Prosecco, Orange.",
        "nutrition": ""
      },
      "ro": {
        "name": "Aperol Spritz",
        "description": "Aperol, Prosecco, Portocale.",
        "nutrition": ""
      }
    }
  },
  {
    "id": "cocktails-petillants-1258",
    "postId": "1258",
    "categoryId": "cocktails-petillants",
    "type": "drink",
    "priceEur": 15,
    "priceFormatted": "15 €",
    "isVerifiedPrice": true,
    "weight": "",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Campari Spritz",
        "description": "Campari, Prosecco.",
        "nutrition": ""
      },
      "nl": {
        "name": "Campari Spritz",
        "description": "Campari, Prosecco.",
        "nutrition": ""
      },
      "en": {
        "name": "Campari Spritz",
        "description": "Campari, Prosecco.",
        "nutrition": ""
      },
      "ro": {
        "name": "Campari Spritz",
        "description": "Campari, Prosecco.",
        "nutrition": ""
      }
    }
  },
  {
    "id": "cocktails-petillants-1259",
    "postId": "1259",
    "categoryId": "cocktails-petillants",
    "type": "drink",
    "priceEur": 15,
    "priceFormatted": "15 €",
    "isVerifiedPrice": true,
    "weight": "",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Limoncello Spritz",
        "description": "Limoncello, Prosecco, Sirop de fleur de sureau, Orange.",
        "nutrition": ""
      },
      "nl": {
        "name": "Limoncello Spritz",
        "description": "Limoncello, Prosecco, Elderflower syrup, Orange.",
        "nutrition": ""
      },
      "en": {
        "name": "Limoncello Spritz",
        "description": "Limoncello, Prosecco, Elderflower syrup, Orange.",
        "nutrition": ""
      },
      "ro": {
        "name": "Limoncello Spritz",
        "description": "Limoncello, Prosecco, Sirop soc, Portocala.",
        "nutrition": ""
      }
    }
  },
  {
    "id": "cocktails-petillants-1260",
    "postId": "1260",
    "categoryId": "cocktails-petillants",
    "type": "drink",
    "priceEur": 15,
    "priceFormatted": "15 €",
    "isVerifiedPrice": true,
    "weight": "",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Hugo",
        "description": "Prosecco, Liqueur de fleur de sureau, Citron vert, Menthe.",
        "nutrition": ""
      },
      "nl": {
        "name": "Hugo",
        "description": "Prosecco, Elderflower liqueur, Lime, Mint.",
        "nutrition": ""
      },
      "en": {
        "name": "Hugo",
        "description": "Prosecco, Elderflower liqueur, Lime, Mint.",
        "nutrition": ""
      },
      "ro": {
        "name": "Hugo",
        "description": "Prosecco,Lichior Soc, Lime, Menta.",
        "nutrition": ""
      }
    }
  },
  {
    "id": "biere-1237",
    "postId": "1237",
    "categoryId": "biere",
    "type": "drink",
    "priceEur": 6.5,
    "priceFormatted": "6,5 €",
    "isVerifiedPrice": true,
    "weight": "",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Karmeliet à la Pression",
        "description": "",
        "nutrition": ""
      },
      "nl": {
        "name": "Karmelit Draught",
        "description": "",
        "nutrition": ""
      },
      "en": {
        "name": "Karmelit Draught",
        "description": "",
        "nutrition": ""
      },
      "ro": {
        "name": "Karmelit Draught",
        "description": "",
        "nutrition": ""
      }
    }
  },
  {
    "id": "biere-1241",
    "postId": "1241",
    "categoryId": "biere",
    "type": "drink",
    "priceEur": 6,
    "priceFormatted": "6 €",
    "isVerifiedPrice": true,
    "weight": "",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Duvet",
        "description": "",
        "nutrition": ""
      },
      "nl": {
        "name": "Duvet",
        "description": "",
        "nutrition": ""
      },
      "en": {
        "name": "Duvet",
        "description": "",
        "nutrition": ""
      },
      "ro": {
        "name": "Duvet",
        "description": "",
        "nutrition": ""
      }
    }
  },
  {
    "id": "biere-1242",
    "postId": "1242",
    "categoryId": "biere",
    "type": "drink",
    "priceEur": 6,
    "priceFormatted": "6 €",
    "isVerifiedPrice": true,
    "weight": "",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Leffe Brune",
        "description": "",
        "nutrition": ""
      },
      "nl": {
        "name": "Leffe Brune",
        "description": "",
        "nutrition": ""
      },
      "en": {
        "name": "Leffe Brune",
        "description": "",
        "nutrition": ""
      },
      "ro": {
        "name": "Leffe Brune",
        "description": "",
        "nutrition": ""
      }
    }
  },
  {
    "id": "biere-1236",
    "postId": "1236",
    "categoryId": "biere",
    "type": "drink",
    "priceEur": 5,
    "priceFormatted": "5 €",
    "isVerifiedPrice": true,
    "weight": "",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Hoegaarden à la Pression",
        "description": "",
        "nutrition": ""
      },
      "nl": {
        "name": "Hoegaarden Draught",
        "description": "",
        "nutrition": ""
      },
      "en": {
        "name": "Hoegaarden Draught",
        "description": "",
        "nutrition": ""
      },
      "ro": {
        "name": "Hoegaarden Draught",
        "description": "",
        "nutrition": ""
      }
    }
  },
  {
    "id": "biere-1238",
    "postId": "1238",
    "categoryId": "biere",
    "type": "drink",
    "priceEur": 5.5,
    "priceFormatted": "5,5 €",
    "isVerifiedPrice": true,
    "weight": "",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Leffe Blonde à la Pression",
        "description": "",
        "nutrition": ""
      },
      "nl": {
        "name": "Leffe Blonde Draught",
        "description": "",
        "nutrition": ""
      },
      "en": {
        "name": "Leffe Blonde Draught",
        "description": "",
        "nutrition": ""
      },
      "ro": {
        "name": "Leffe Blonde Draught",
        "description": "",
        "nutrition": ""
      }
    }
  },
  {
    "id": "biere-1239",
    "postId": "1239",
    "categoryId": "biere",
    "type": "drink",
    "priceEur": 5,
    "priceFormatted": "5 €",
    "isVerifiedPrice": true,
    "weight": "",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Stella Artois à la Pression",
        "description": "",
        "nutrition": ""
      },
      "nl": {
        "name": "Stella Artois Draught",
        "description": "",
        "nutrition": ""
      },
      "en": {
        "name": "Stella Artois Draught",
        "description": "",
        "nutrition": ""
      },
      "ro": {
        "name": "Stella Artois Draught",
        "description": "",
        "nutrition": ""
      }
    }
  },
  {
    "id": "biere-1240",
    "postId": "1240",
    "categoryId": "biere",
    "type": "drink",
    "priceEur": 5,
    "priceFormatted": "5 €",
    "isVerifiedPrice": true,
    "weight": "",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Belle-Vue Kriesk Extra",
        "description": "",
        "nutrition": ""
      },
      "nl": {
        "name": "Belle-Vue Kriesk Extra",
        "description": "",
        "nutrition": ""
      },
      "en": {
        "name": "Belle-Vue Kriesk Extra",
        "description": "",
        "nutrition": ""
      },
      "ro": {
        "name": "Belle-Vue Kriesk Extra",
        "description": "",
        "nutrition": ""
      }
    }
  },
  {
    "id": "mousseux-1223",
    "postId": "1223",
    "categoryId": "mousseux",
    "type": "drink",
    "priceEur": 125,
    "priceFormatted": "125 €",
    "isVerifiedPrice": true,
    "weight": "75 cl",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Laurent-Perrier Rosé",
        "description": "",
        "nutrition": ""
      },
      "nl": {
        "name": "Laurent-Perrier Rosé",
        "description": "",
        "nutrition": ""
      },
      "en": {
        "name": "Laurent-Perrier Rosé",
        "description": "",
        "nutrition": ""
      },
      "ro": {
        "name": "Laurent-Perrier Rosé",
        "description": "",
        "nutrition": ""
      }
    }
  },
  {
    "id": "mousseux-1221",
    "postId": "1221",
    "categoryId": "mousseux",
    "type": "drink",
    "priceEur": 100,
    "priceFormatted": "100 €",
    "isVerifiedPrice": true,
    "weight": "75 cl",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Moët & Chandon Impérial Brut",
        "description": "",
        "nutrition": ""
      },
      "nl": {
        "name": "Moët & Chandon Impérial Brut",
        "description": "",
        "nutrition": ""
      },
      "en": {
        "name": "Moët & Chandon Impérial Brut",
        "description": "",
        "nutrition": ""
      },
      "ro": {
        "name": "Moët & Chandon Imperial Brut",
        "description": "",
        "nutrition": ""
      }
    }
  },
  {
    "id": "mousseux-1222",
    "postId": "1222",
    "categoryId": "mousseux",
    "type": "drink",
    "priceEur": 100,
    "priceFormatted": "100 €",
    "isVerifiedPrice": true,
    "weight": "75 cl",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Laurent-Perrier Brut – Édition Bleue",
        "description": "",
        "nutrition": ""
      },
      "nl": {
        "name": "Laurent-Perrier Brut – Blue Edition",
        "description": "",
        "nutrition": ""
      },
      "en": {
        "name": "Laurent-Perrier Brut – Blue Edition",
        "description": "",
        "nutrition": ""
      },
      "ro": {
        "name": "Laurent-Perrier Brut – Édition Blue",
        "description": "",
        "nutrition": ""
      }
    }
  },
  {
    "id": "mousseux-1219",
    "postId": "1219",
    "categoryId": "mousseux",
    "type": "drink",
    "priceEur": 28,
    "priceFormatted": "28 €",
    "isVerifiedPrice": true,
    "weight": "75 cl",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Cava Prosecco",
        "description": "",
        "nutrition": ""
      },
      "nl": {
        "name": "Cava Prosecco",
        "description": "",
        "nutrition": ""
      },
      "en": {
        "name": "Cava Prosecco",
        "description": "",
        "nutrition": ""
      },
      "ro": {
        "name": "Cava Prosecco",
        "description": "",
        "nutrition": ""
      }
    }
  },
  {
    "id": "mousseux-1224",
    "postId": "1224",
    "categoryId": "mousseux",
    "type": "drink",
    "priceEur": 16,
    "priceFormatted": "16 €",
    "isVerifiedPrice": true,
    "weight": "15 cl",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Laurent-Perrier Cava – Verre",
        "description": "",
        "nutrition": ""
      },
      "nl": {
        "name": "Laurent-Perrier Cava – Glass",
        "description": "",
        "nutrition": ""
      },
      "en": {
        "name": "Laurent-Perrier Cava – Glass",
        "description": "",
        "nutrition": ""
      },
      "ro": {
        "name": "Laurent-Perrier Cava - Pahar",
        "description": "",
        "nutrition": ""
      }
    }
  },
  {
    "id": "mousseux-1220",
    "postId": "1220",
    "categoryId": "mousseux",
    "type": "drink",
    "priceEur": 9,
    "priceFormatted": "9 €",
    "isVerifiedPrice": true,
    "weight": "15 cl",
    "image": null,
    "allergens": [],
    "tags": [],
    "translations": {
      "fr": {
        "name": "Cava Prosecco - Verre",
        "description": "",
        "nutrition": ""
      },
      "nl": {
        "name": "Cava Prosecco - Glass",
        "description": "",
        "nutrition": ""
      },
      "en": {
        "name": "Cava Prosecco - Glass",
        "description": "",
        "nutrition": ""
      },
      "ro": {
        "name": "Cava Prosecco Pahar",
        "description": "",
        "nutrition": ""
      }
    }
  }
];

export function getFeaturedMenuItems(): MenuItem[] {
  const featured = MENU_ITEMS.filter((item) => item.tags.includes('featured'));
  return featured.slice(0, 8);
}

export function getItemsByCategory(categoryId: string): MenuItem[] {
  return MENU_ITEMS.filter((item) => item.categoryId === categoryId);
}
