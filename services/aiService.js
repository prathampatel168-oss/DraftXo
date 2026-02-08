/**
 * Mock AI Service for DraftXo
 * Simulates API calls to LLMs (GPT-4, Claude 3, etc.)
 */
export const AIAgentService = {
    /**
     * Simulates creating a draft or analyzing content
     * @param {string} prompt - The user's input
     * @param {string} type - 'text', 'code', 'analysis'
     */
    generateResponse: async (prompt, type = 'text') => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(getMockResponse(prompt, type));
            }, 1500); // Simulate network delay
        });
    }
};

const getMockResponse = (prompt, type) => {
    const responses = [
        "Analyzing project requirements... Identified key deliverables.",
        "Generating optimized workflow structure based on inputs...",
        "Refining content strategy for maximum engagement...",
        "Detected potential bottlenecks in the logic flow. Suggesting alternatives.",
        "Drafting initial architecture documentation...",
        " synthesizing data points into a cohesive summary."
    ];

    // Return a random response + context
    const random = responses[Math.floor(Math.random() * responses.length)];
    return `[AI AGENT]: ${random}\n\nProcessed Input: "${prompt.substring(0, 20)}..."`;
};
