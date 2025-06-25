// import { API_ENDPOINTS } from "@config/constants/api-constants";
import { aboutContent, aboutPageContent } from "@modules/content/data/mock-about-content";

export const aboutContentService = {
  /**
   * Get about section content for homepage
   * @returns {Promise<Object>} About section content
   */
  async getAboutSectionContent() {
    try {
      // TODO: [DATA] Replace mock data with MongoDB integration
      // Current: Service uses mock data directly from files
      // Future: Update API routes to query MongoDB, then service calls API
      // Implementation:
      // 1. Create MongoDB Content model with Mongoose
      // 2. Update /api/content/about route to query database
      // 3. Replace mock import with: fetch(`/api${API_ENDPOINTS.content}/about?section=homepage`)
      await new Promise(resolve => setTimeout(resolve, 300));

      return aboutContent;
    } catch (error) {
      console.error("Error fetching about section content:", error);
      throw new Error("Failed to fetch about section content");
    }
  },

  /**
   * Get full about page content
   * @returns {Promise<Object>} Complete about page content
   */
  async getAboutPageContent() {
    try {
      // TODO: [DATA] Replace mock data with MongoDB integration
      // Current: Service uses mock data directly from files
      // Future: Update API routes to query MongoDB, then service calls API
      // Implementation: fetch(`/api${API_ENDPOINTS.content}/about?section=full`)
      await new Promise(resolve => setTimeout(resolve, 500));

      return aboutPageContent;
    } catch (error) {
      console.error("Error fetching about page content:", error);
      throw new Error("Failed to fetch about page content");
    }
  },

  /**
   * Update about section content (admin functionality)
   * @param {Object} content - Updated content
   * @returns {Promise<Object>} Updated content
   */
  async updateAboutSectionContent(content) {
    try {
      // TODO: [DATA] Replace mock data with MongoDB integration
      // Current: Service simulates update but doesn't persist changes
      // Future: API route will update MongoDB, service calls API with PUT method
      // Implementation:
      // 1. Update /api/content/about route to handle PUT requests to MongoDB
      // 2. Replace simulation with: fetch(`/api${API_ENDPOINTS.content}/about?section=homepage`, { method: 'PUT', body: JSON.stringify(content) })
      await new Promise(resolve => setTimeout(resolve, 400));

      console.log("About section content updated:", content);
      return {
        ...content,
        lastUpdated: new Date().toISOString(),
        version: "1.1",
      };
    } catch (error) {
      console.error("Error updating about section content:", error);
      throw new Error("Failed to update about section content");
    }
  },
};
