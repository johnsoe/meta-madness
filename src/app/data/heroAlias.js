// heroNicknames.js
// Maps hero names to their commonly used nicknames or abbreviations

const heroAlias = {
  "Blaze": "firebat",
  "Brightwing": "faeriedragon",
  "Cassia": "amazon",
  "E.T.C.": "l90etc",
  "Greymane": "genngreymane",
  "Kharazim": "monk",
  "Li-Ming": "wizard",
  "Li Li": "lili",
  "Lt. Morales": "medic",
  "Mei": "meiow",
  "Nazeebo": "witchdoctor",
  "Qhira": "nexushunter",
  "Sgt. Hammer": "sgthammer",
  "Sonya": "barbarian",
  "The Butcher": "butcher",
  "The Lost Vikings": "lostvikings",
  "Valla": "demonhunter",
  "Xul": "necromancer",
};

// Function to get nickname for a hero
export const getHeroAlias = (heroName) => {
  return heroAlias[heroName] || heroName;
};

export default heroAlias;