/**
 * RapidAid - Data Service
 * Manages local JSON data loading and caching
 */

import emergenciesData from '../data/emergencies.json';
import emergencyNumbersData from '../data/emergency_numbers.json';

class DataService {
  constructor() {
    this.emergencies = null;
    this.categories = null;
    this.emergencyNumbers = null;
    this.cache = new Map();
  }

  /**
   * Initialize data service and load all data
   */
  async initialize() {
    try {
      this.emergencies = emergenciesData.emergencies || [];
      this.categories = emergenciesData.categories || [];
      this.emergencyNumbers = emergencyNumbersData.india || [];
      return true;
    } catch (error) {
      console.error('Data initialization error:', error);
      return false;
    }
  }

  /**
   * Get all emergencies
   */
  getAllEmergencies() {
    return this.emergencies || [];
  }

  /**
   * Get emergency by ID
   * @param {string} id - Emergency ID
   */
  getEmergencyById(id) {
    return this.emergencies?.find(e => e.id === id) || null;
  }

  /**
   * Get emergencies by category
   * @param {string} categoryId - Category ID
   */
  getEmergenciesByCategory(categoryId) {
    return this.emergencies?.filter(e => e.category === categoryId) || [];
  }

  /**
   * Search emergencies
   * @param {string} query - Search query
   * @param {string} language - Language code
   */
  searchEmergencies(query, language = 'en') {
    if (!query || query.trim() === '') {
      return this.emergencies || [];
    }

    const searchTerm = query.toLowerCase().trim();

    return this.emergencies?.filter(emergency => {
      const title = emergency.title?.[language] || emergency.title?.en || '';
      const symptoms = emergency.symptoms?.[language] || [];

      const titleMatch = title.toLowerCase().includes(searchTerm);
      const symptomMatch = symptoms.some(s => 
        s.toLowerCase().includes(searchTerm)
      );

      return titleMatch || symptomMatch;
    }) || [];
  }

  /**
   * Get all categories
   */
  getAllCategories() {
    return this.categories || [];
  }

  /**
   * Get category by ID
   * @param {string} categoryId - Category ID
   */
  getCategoryById(categoryId) {
    return this.categories?.find(c => c.id === categoryId) || null;
  }

  /**
   * Get emergency numbers
   */
  getEmergencyNumbers() {
    return this.emergencyNumbers || [];
  }

  /**
   * Get emergency number by type
   * @param {string} type - Number type
   */
  getEmergencyNumberByType(type) {
    return this.emergencyNumbers?.find(n => 
      n.name.toLowerCase().includes(type.toLowerCase())
    ) || null;
  }

  /**
   * Get emergencies by severity
   * @param {string} severity - Severity level
   */
  getEmergenciesBySeverity(severity) {
    return this.emergencies?.filter(e => 
      e.severity === severity
    ) || [];
  }

  /**
   * Get critical emergencies (for quick access)
   */
  getCriticalEmergencies() {
    return this.getEmergenciesBySeverity('critical');
  }

  /**
   * Get total emergency count
   */
  getEmergencyCount() {
    return this.emergencies?.length || 0;
  }

  /**
   * Get emergencies count by category
   */
  getCategoryCounts() {
    const counts = {};
    this.emergencies?.forEach(e => {
      counts[e.category] = (counts[e.category] || 0) + 1;
    });
    return counts;
  }
}

// Export singleton instance
export default new DataService();
