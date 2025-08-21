class DraftService {
  constructor() {
    this.draftOrder = [
      { team: 'blue', action: 'ban' },   
      { team: 'red', action: 'ban' },    
      { team: 'blue', action: 'ban' },   
      { team: 'red', action: 'ban' },    
      { team: 'blue', action: 'pick' },  
      { team: 'red', action: 'pick' },   
      { team: 'red', action: 'pick' },   
      { team: 'blue', action: 'pick' },
      { team: 'blue', action: 'pick' },  
      { team: 'red', action: 'ban' },    
      { team: 'blue', action: 'ban' },   
      { team: 'red', action: 'pick' }, 
      { team: 'red', action: 'pick' }, 
      { team: 'blue', action: 'pick' },
      { team: 'blue', action: 'pick' },
      { team: 'red', action: 'pick' },
    ];
  }
}
  
// Create and export a singleton instance
const draftService = new DraftService();
export default draftService;
  