import draftService from "./draftService";
import preBanService from "./preBanService";

class ChoGallService {

  constructor() {
    this.draftableIndices = this.findDraftableIndices()
  }
  canBePickedOnThisStep(currentStep) {
    return this.draftableIndices.includes(currentStep);
  }
  findDraftableIndices() {
    const indices = [];
    let draftOrder = draftService.draftOrder;
    
    for (let i = 0; i < draftOrder.length - 1; i++) {
      let current = draftOrder[i];
      let next = draftOrder[i + 1];
      if (next.action == 'pick' && current.action == 'pick' && current.team == next.team) {
        indices.push(i);
      }
    }
    return indices;
  }
  isChoGallAvailable(bannedHeroes, seriesDraftedHeroes, currentStep) {
    let isStepAvailable = this.canBePickedOnThisStep(currentStep - 1);
    let isChoAvailable = !preBanService.isPreBanned("Cho") && !bannedHeroes.has("Cho") && !seriesDraftedHeroes.has("Cho");
    let isGallAvailable = !preBanService.isPreBanned("Gall") && !bannedHeroes.has("Gall") && !seriesDraftedHeroes.has("Gall");
    return isStepAvailable && isChoAvailable && isGallAvailable
  }
  isChoOrGall(hero) {
    return hero == "Cho" || hero == "Gall";
  }
  getOtherHead(hero) {
    if (hero == "Cho") return "Gall";
    if (hero == "Gall") return "Cho";
    return null;
  }
}
  
  // Create and export a singleton instance
  const choGallService = new ChoGallService();
  export default choGallService;
  