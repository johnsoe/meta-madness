// Pre-ban service - manages a predefined list of pre-banned heroes
class PreBanService {
  constructor() {
    // Predefined list of heroes that are always pre-banned
    this.preBannedHeroes = new Set([
      'Abathur',
      'The Lost Vikings',
      'Murky'
    ]);
  }

  // Get all pre-banned heroes
  getPreBannedHeroes() {
    return new Set(this.preBannedHeroes);
  }

  // Check if a hero is pre-banned
  isPreBanned(hero) {
    return this.preBannedHeroes.has(hero);
  }

  // Get the count of pre-banned heroes
  getPreBanCount() {
    return this.preBannedHeroes.size;
  }

  // Get available heroes (heroes not in pre-ban list)
  getAvailableHeroes(allHeroes) {
    return allHeroes.filter(hero => !this.preBannedHeroes.has(hero));
  }
}

// Create and export a singleton instance
const preBanService = new PreBanService();
export default preBanService;
