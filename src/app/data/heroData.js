// heroData.js
// Comprehensive hero data structure with name, alias, and franchise information

class HeroData {
  constructor(name, alias, franchise, role) {
    this.name = name;
    this.alias = alias;
    this.franchise = franchise;
    this.role = role;
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
    return `${this.name} (${this.alias}) - ${this.franchise} - ${this.role}`;
  }
}

// Complete hero database with all Heroes of the Storm characters
const heroDatabase = [
  // Warcraft Universe
  new HeroData("Abathur", "abathur", "Warcraft", "Support"),
  new HeroData("Alarak", "alarak", "StarCraft", "Melee Assassin"),
  new HeroData("Alexstrasza", "alexstrasza", "Warcraft", "Healer"),
  new HeroData("Ana", "ana", "Overwatch", "Healer"),
  new HeroData("Anduin", "anduin", "Warcraft", "Healer"),
  new HeroData("Anub\'arak", "anubarak", "Warcraft", "Tank"),
  new HeroData("Artanis", "artanis", "StarCraft", "Bruiser"),
  new HeroData("Arthas", "arthas", "Warcraft", "Tank"),
  new HeroData("Auriel", "auriel", "Diablo", "Healer"),
  new HeroData("Azmodan", "azmodan", "Diablo", "Ranged Assassin"),
  new HeroData("Blaze", "firebat", "StarCraft", "Tank"),
  new HeroData("Brightwing", "faeriedragon", "Warcraft", "Healer"),
  new HeroData("The Butcher", "butcher", "Diablo", "Melee Assassin"),
  new HeroData("Cassia", "amazon", "Diablo", "Ranged Assassin"),
  new HeroData("Chen", "chen", "Warcraft", "Bruiser"),
  new HeroData("Cho", "cho", "Warcraft", "Tank"),
  new HeroData("Chromie", "chromie", "Warcraft", "Ranged Assassin"),
  new HeroData("Deathwing", "deathwing", "Warcraft", "Bruiser"),
  new HeroData("Deckard", "deckard", "Diablo", "Healer"),
  new HeroData("Dehaka", "dehaka", "StarCraft", "Bruiser"),
  new HeroData("Diablo", "diablo", "Diablo", "Tank"),
  new HeroData("D.Va", "dva", "Overwatch", "Bruiser"),
  new HeroData("E.T.C.", "l90etc", "Warcraft", "Tank"),
  new HeroData("Falstad", "falstad", "Warcraft", "Ranged Assassin"),
  new HeroData("Fenix", "fenix", "StarCraft", "Ranged Assassin"),
  new HeroData("Gall", "gall", "Warcraft", "Ranged Assassin"),
  new HeroData("Garrosh", "garrosh", "Warcraft", "Tank"),
  new HeroData("Gazlowe", "gazlowe", "Warcraft", "Bruiser"),
  new HeroData("Genji", "genji", "Overwatch", "Ranged Assassin"),
  new HeroData("Greymane", "genngreymane", "Warcraft", "Ranged Assassin"),
  new HeroData("Gul\'dan", "guldan", "Warcraft", "Ranged Assassin"),
  new HeroData("Hanzo", "hanzo", "Overwatch", "Ranged Assassin"),
  new HeroData("Hogger", "hogger", "Warcraft", "Bruiser"),
  new HeroData("Illidan", "illidan", "Warcraft", "Melee Assassin"),
  new HeroData("Imperius", "imperius", "Diablo", "Bruiser"),
  new HeroData("Jaina", "jaina", "Warcraft", "Ranged Assassin"),
  new HeroData("Johanna", "johanna", "Diablo", "Tank"),
  new HeroData("Junkrat", "junkrat", "Overwatch", "Ranged Assassin"),
  new HeroData("Kael\'thas", "kaelthas", "Warcraft", "Ranged Assassin"),
  new HeroData("Kel\'Thuzad", "kelthuzad", "Warcraft", "Ranged Assassin"),
  new HeroData("Kerrigan", "kerrigan", "StarCraft", "Melee Assassin"),
  new HeroData("Kharazim", "monk", "Diablo", "Healer"),
  new HeroData("Leoric", "leoric", "Diablo", "Bruiser"),
  new HeroData("Li Li", "lili", "Warcraft", "Healer"),
  new HeroData("Li-Ming", "wizard", "Diablo", "Ranged Assassin"),
  new HeroData("The Lost Vikings", "lostvikings", "Nexus", "Support"),
  new HeroData("Lt. Morales", "medic", "StarCraft", "Healer"),
  new HeroData("Lucio", "lucio", "Overwatch", "Healer"),
  new HeroData("Lunara", "lunara", "Warcraft", "Ranged Assassin"),
  new HeroData("Maiev", "maiev", "Warcraft", "Melee Assassin"),
  new HeroData("Malfurion", "malfurion", "Warcraft", "Healer"),
  new HeroData("Mal\'Ganis", "malganis", "Warcraft", "Tank"),
  new HeroData("Malthael", "malthael", "Diablo", "Melee Assassin"),
  new HeroData("Mei", "meiow", "Overwatch", "Tank"),
  new HeroData("Medivh", "medivh", "Warcraft", "Support"),
  new HeroData("Mephisto", "mephisto", "Diablo", "Ranged Assassin"),
  new HeroData("Muradin", "muradin", "Warcraft", "Tank"),
  new HeroData("Murky", "murky", "Warcraft", "Melee Assassin"),
  new HeroData("Nazeebo", "witchdoctor", "Diablo", "Ranged Assassin"),
  new HeroData("Nova", "nova", "StarCraft", "Ranged Assassin"),
  new HeroData("Orphea", "orphea", "Nexus", "Ranged Assassin"),
  new HeroData("Probius", "probius", "StarCraft", "Ranged Assassin"),
  new HeroData("Qhira", "nexushunter", "Nexus", "Melee Assassin"),
  new HeroData("Ragnaros", "ragnaros", "Warcraft", "Bruiser"),
  new HeroData("Raynor", "raynor", "StarCraft", "Ranged Assassin"),
  new HeroData("Rehgar", "rehgar", "Warcraft", "Healer"),
  new HeroData("Rexxar", "rexxar", "Warcraft", "Bruiser"),
  new HeroData("Samuro", "samuro", "Warcraft", "Melee Assassin"),
  new HeroData("Sgt. Hammer", "sgthammer", "StarCraft", "Ranged Assassin"),
  new HeroData("Sonya", "barbarian", "Diablo", "Bruiser"),
  new HeroData("Stitches", "stitches", "Warcraft", "Tank"),
  new HeroData("Stukov", "stukov", "StarCraft", "Healer"),
  new HeroData("Sylvanas", "sylvanas", "Warcraft", "Ranged Assassin"),
  new HeroData("Tassadar", "tassadar", "StarCraft", "Ranged Assassin"),
  new HeroData("Thrall", "thrall", "Warcraft", "Bruiser"),
  new HeroData("Tracer", "tracer", "Overwatch", "Ranged Assassin"),
  new HeroData("Tychus", "tychus", "StarCraft", "Ranged Assassin"),
  new HeroData("Tyrael", "tyrael", "Diablo", "Tank"),
  new HeroData("Tyrande", "tyrande", "Warcraft", "Healer"),
  new HeroData("Uther", "uther", "Warcraft", "Healer"),
  new HeroData("Valeera", "valeera", "Warcraft", "Melee Assassin"),
  new HeroData("Valla", "demonhunter", "Diablo", "Ranged Assassin"),
  new HeroData("Varian", "varian", "Warcraft", "Bruiser"),
  new HeroData("Whitemane", "whitemane", "Warcraft", "Healer"),
  new HeroData("Xul", "necromancer", "Diablo", "Bruiser"),
  new HeroData("Yrel", "yrel", "Warcraft", "Bruiser"),
  new HeroData("Zagara", "zagara", "StarCraft", "Ranged Assassin"),
  new HeroData("Zarya", "zarya", "Overwatch", "Support"),
  new HeroData("Zeratul", "zeratul", "StarCraft", "Melee Assassin"),
  new HeroData("Zul\'jin", "zuljin", "Warcraft", "Ranged Assassin"),
];

// Create lookup maps for efficient access
const heroByName = new Map();
const heroByAlias = new Map();
const heroesByFranchise = new Map();
const heroesByRole = new Map();

// Populate lookup maps
heroDatabase.forEach(hero => {
  heroByName.set(hero.name, hero);
  heroByAlias.set(hero.alias, hero);
  
  if (!heroesByFranchise.has(hero.franchise)) {
    heroesByFranchise.set(hero.franchise, []);
  }
  heroesByFranchise.get(hero.franchise).push(hero);
  
  if (!heroesByRole.has(hero.role)) {
    heroesByRole.set(hero.role, []);
  }
  heroesByRole.get(hero.role).push(hero);
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

export const getHeroRole = (heroName) => {
  const hero = getHeroByName(heroName);
  return hero ? hero.role : 'Unknown';
};

export const getHeroesByRole = (role) => {
  return heroesByRole.get(role) || [];
};

export const getAllRoles = () => {
  return Array.from(heroesByRole.keys());
};

// Legacy compatibility - maintain the old heroAlias object
export const heroAlias = Object.fromEntries(
  heroDatabase.map(hero => [hero.name, hero.alias])
);

export default heroDatabase;
