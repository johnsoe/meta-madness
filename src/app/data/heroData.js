// heroData.js
// Comprehensive hero data structure with name, alias, and franchise information

class HeroData {
  constructor(name, alias, franchise) {
    this.name = name;
    this.alias = alias;
    this.franchise = franchise;
  }

  // Get the display name (alias if available, otherwise name)
  getDisplayName() {
    return this.alias || this.name;
  }

  // Get the filename-safe version for assets
  getFilename() {
    return this.alias
      .toLowerCase()
      .replace(/\s+/g, '_')
      .replace(/[.']/g, '');
  }

  // Check if hero belongs to a specific franchise
  isFromFranchise(franchise) {
    return this.franchise === franchise;
  }

  // String representation
  toString() {
    return `${this.name} (${this.alias}) - ${this.franchise}`;
  }
}

// Complete hero database with all Heroes of the Storm characters
const heroDatabase = [
  // Warcraft Universe
  new HeroData("Abathur", "abathur", "Warcraft"),
  new HeroData("Alarak", "alarak", "StarCraft"),
  new HeroData("Alexstrasza", "alexstrasza", "Warcraft"),
  new HeroData("Ana", "ana", "Overwatch"),
  new HeroData("Anduin", "anduin", "Warcraft"),
  new HeroData("Anub\'arak", "anubarak", "Warcraft"),
  new HeroData("Artanis", "artanis", "StarCraft"),
  new HeroData("Arthas", "arthas", "Warcraft"),
  new HeroData("Auriel", "auriel", "Diablo"),
  new HeroData("Azmodan", "azmodan", "Diablo"),
  new HeroData("Blaze", "firebat", "StarCraft"),
  new HeroData("Brightwing", "faeriedragon", "Warcraft"),
  new HeroData("The Butcher", "butcher", "Diablo"),
  new HeroData("Cassia", "amazon", "Diablo"),
  new HeroData("Chen", "chen", "Warcraft"),
  new HeroData("Cho", "cho", "Warcraft"),
  new HeroData("Chromie", "chromie", "Warcraft"),
  new HeroData("Deathwing", "deathwing", "Warcraft"),
  new HeroData("Deckard", "deckard", "Diablo"),
  new HeroData("Dehaka", "dehaka", "StarCraft"),
  new HeroData("Diablo", "diablo", "Diablo"),
  new HeroData("D.Va", "dva", "Overwatch"),
  new HeroData("E.T.C.", "l90etc", "Warcraft"),
  new HeroData("Falstad", "falstad", "Warcraft"),
  new HeroData("Fenix", "fenix", "StarCraft"),
  new HeroData("Gall", "gall", "Warcraft"),
  new HeroData("Garrosh", "garrosh", "Warcraft"),
  new HeroData("Gazlowe", "gazlowe", "Warcraft"),
  new HeroData("Genji", "genji", "Overwatch"),
  new HeroData("Greymane", "genngreymane", "Warcraft"),
  new HeroData("Gul\'dan", "guldan", "Warcraft"),
  new HeroData("Hanzo", "hanzo", "Overwatch"),
  new HeroData("Hogger", "hogger", "Warcraft"),
  new HeroData("Illidan", "illidan", "Warcraft"),
  new HeroData("Imperius", "imperius", "Diablo"),
  new HeroData("Jaina", "jaina", "Warcraft"),
  new HeroData("Johanna", "johanna", "Diablo"),
  new HeroData("Junkrat", "junkrat", "Overwatch"),
  new HeroData("Kael\'thas", "kaelthas", "Warcraft"),
  new HeroData("Kel\'Thuzad", "kelthuzad", "Warcraft"),
  new HeroData("Kerrigan", "kerrigan", "StarCraft"),
  new HeroData("Kharazim", "monk", "Diablo"),
  new HeroData("Leoric", "leoric", "Diablo"),
  new HeroData("Li Li", "lili", "Warcraft"),
  new HeroData("Li-Ming", "wizard", "Diablo"),
  new HeroData("The Lost Vikings", "lostvikings", "Nexus"),
  new HeroData("Lt. Morales", "medic", "StarCraft"),
  new HeroData("Lucio", "lucio", "Overwatch"),
  new HeroData("Lunara", "lunara", "Warcraft"),
  new HeroData("Maiev", "maiev", "Warcraft"),
  new HeroData("Malfurion", "malfurion", "Warcraft"),
  new HeroData("Mal\'Ganis", "malganis", "Warcraft"),
  new HeroData("Malthael", "malthael", "Diablo"),
  new HeroData("Mei", "meiow", "Overwatch"),
  new HeroData("Medivh", "medivh", "Warcraft"),
  new HeroData("Mephisto", "mephisto", "Diablo"),
  new HeroData("Muradin", "muradin", "Warcraft"),
  new HeroData("Murky", "murky", "Warcraft"),
  new HeroData("Nazeebo", "witchdoctor", "Diablo"),
  new HeroData("Nova", "nova", "StarCraft"),
  new HeroData("Orphea", "orphea", "Nexus"),
  new HeroData("Probius", "probius", "StarCraft"),
  new HeroData("Qhira", "nexushunter", "Nexus"),
  new HeroData("Ragnaros", "ragnaros", "Warcraft"),
  new HeroData("Raynor", "raynor", "StarCraft"),
  new HeroData("Rehgar", "rehgar", "Warcraft"),
  new HeroData("Rexxar", "rexxar", "Warcraft"),
  new HeroData("Samuro", "samuro", "Warcraft"),
  new HeroData("Sgt. Hammer", "sgthammer", "StarCraft"),
  new HeroData("Sonya", "barbarian", "Diablo"),
  new HeroData("Stitches", "stitches", "Warcraft"),
  new HeroData("Stukov", "stukov", "StarCraft"),
  new HeroData("Sylvanas", "sylvanas", "Warcraft"),
  new HeroData("Tassadar", "tassadar", "StarCraft"),
  new HeroData("Thrall", "thrall", "Warcraft"),
  new HeroData("Tracer", "tracer", "Overwatch"),
  new HeroData("Tychus", "tychus", "StarCraft"),
  new HeroData("Tyrael", "tyrael", "Diablo"),
  new HeroData("Tyrande", "tyrande", "Warcraft"),
  new HeroData("Uther", "uther", "Warcraft"),
  new HeroData("Valeera", "valeera", "Warcraft"),
  new HeroData("Valla", "demonhunter", "Diablo"),
  new HeroData("Varian", "varian", "Warcraft"),
  new HeroData("Whitemane", "whitemane", "Warcraft"),
  new HeroData("Xul", "necromancer", "Diablo"),
  new HeroData("Yrel", "yrel", "Warcraft"),
  new HeroData("Zagara", "zagara", "StarCraft"),
  new HeroData("Zarya", "zarya", "Overwatch"),
  new HeroData("Zeratul", "zeratul", "StarCraft"),
  new HeroData("Zul\'jin", "zuljin", "Warcraft"),
];

// Create lookup maps for efficient access
const heroByName = new Map();
const heroByAlias = new Map();
const heroesByFranchise = new Map();

// Populate lookup maps
heroDatabase.forEach(hero => {
  heroByName.set(hero.name, hero);
  heroByAlias.set(hero.alias, hero);
  
  if (!heroesByFranchise.has(hero.franchise)) {
    heroesByFranchise.set(hero.franchise, []);
  }
  heroesByFranchise.get(hero.franchise).push(hero);
});


// Utility functions
export const getHeroByName = (name) => {
  return heroByName.get(name);
};

export const getHeroByAlias = (alias) => {
  return heroByAlias.get(alias);
};

export const getHeroAlias = (heroName) => {
  const hero = getHeroByName(heroName);
  return hero ? hero.alias : heroName;
};

export const getHeroFranchise = (heroName) => {
  const hero = getHeroByName(heroName);
  return hero ? hero.franchise : 'Unknown';
};

export const getHeroesByFranchise = (franchise) => {
  return heroesByFranchise.get(franchise) || [];
};

export const getAllHeroes = () => {
  return [...heroDatabase];
};

export const getAllHeroNames = () => {
  return heroDatabase.map(hero => hero.name);
};

export const getAllFranchises = () => {
  return Array.from(heroesByFranchise.keys());
};

// Legacy compatibility - maintain the old heroAlias object
export const heroAlias = Object.fromEntries(
  heroDatabase.map(hero => [hero.name, hero.alias])
);

export default heroDatabase;
