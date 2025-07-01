// import { API_ENDPOINTS } from "@config/constants/api-constants";
import { heroContent } from "@modules/content/data/mock-hero-content";

export const heroContentService = {
  /**
   * Get hero content for homepage
   * @param {Object} options - Query options
   * @param {string} options.variant - A/B test variant ('default', 'seasonal', 'sale')
   * @returns {Promise<Object>} Hero content
   */
  async getHeroContent(options = {}) {
    try {
      const { variant = "default" } = options;

      // TODO: [DATA] Replace mock data with MongoDB integration
      // Current: Service uses mock data directly from files
      // Future: Update API routes to query MongoDB, then service calls API
      // Implementation: fetch(`/api${API_ENDPOINTS.content}/hero?variant=${variant}`)
      await new Promise(resolve => setTimeout(resolve, 100));

      // Apply variant if specified
      let content = { ...heroContent };

      if (variant !== "default") {
        const variantContent = heroContent.variants.find(v => v.id === variant);
        if (variantContent) {
          content = {
            ...content,
            title: variantContent.title,
            subtitle: variantContent.subtitle,
            variant: variant,
          };
        }
      }

      return content;
    } catch (error) {
      console.error("Error fetching hero content:", error);
      throw new Error("Failed to fetch hero content");
    }
  },

  /**
   * Update hero content (admin functionality)
   * @param {Object} content - Updated hero content
   * @returns {Promise<Object>} Updated content
   */
  async updateHeroContent(content) {
    try {
      // TODO: [DATA] Replace with API call when MongoDB is ready
      // const response = await fetch(`/api${API_ENDPOINTS.content}/hero`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(content)
      // });
      await new Promise(resolve => setTimeout(resolve, 300));

      console.log("Hero content updated:", content);
      return {
        ...content,
        lastUpdated: new Date().toISOString(),
        version: "1.1",
      };
    } catch (error) {
      console.error("Error updating hero content:", error);
      throw new Error("Failed to update hero content");
    }
  },

  /**
   * Get available A/B test variants
   * @returns {Promise<Array>} Available variants
   */
  async getHeroVariants() {
    try {
      // TODO: [DATA] Replace with API call when MongoDB is ready
      await new Promise(resolve => setTimeout(resolve, 100));

      return heroContent.variants;
    } catch (error) {
      console.error("Error fetching hero variants:", error);
      throw new Error("Failed to fetch hero variants");
    }
  },
};
