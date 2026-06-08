'use server';
/**
 * @fileOverview An AI Taste Advisor that provides personalized dish and wine recommendations.
 *
 * - aiTasteAdvisorRecommendations - A function that handles the recommendation process.
 * - AITasteAdvisorRecommendationsInput - The input type for the aiTasteAdvisorRecommendations function.
 * - AITasteAdvisorRecommendationsOutput - The return type for the aiTasteAdvisorRecommendations function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AITasteAdvisorRecommendationsInputSchema = z.object({
  dietaryRestrictions: z
    .array(z.string())
    .optional()
    .describe('List of dietary restrictions (e.g., gluten-free, vegetarian).'),
  tastePreferences: z
    .array(z.string())
    .optional()
    .describe('List of taste preferences (e.g., spicy, light meal, sweet).'),
});
export type AITasteAdvisorRecommendationsInput = z.infer<
  typeof AITasteAdvisorRecommendationsInputSchema
>;

const AITasteAdvisorRecommendationsOutputSchema = z.object({
  dishRecommendations: z
    .array(z.string())
    .describe('A list of recommended dishes based on the input preferences.'),
  winePairings: z
    .array(z.string())
    .describe('A list of recommended wine pairings for the dishes.'),
});
export type AITasteAdvisorRecommendationsOutput = z.infer<
  typeof AITasteAdvisorRecommendationsOutputSchema
>;

export async function aiTasteAdvisorRecommendations(
  input: AITasteAdvisorRecommendationsInput
): Promise<AITasteAdvisorRecommendationsOutput> {
  return aiTasteAdvisorRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiTasteAdvisorRecommendationsPrompt',
  input: { schema: AITasteAdvisorRecommendationsInputSchema },
  output: { schema: AITasteAdvisorRecommendationsOutputSchema },
  prompt: `You are an AI Taste Advisor for a restaurant. Your goal is to provide personalized dish and wine recommendations to a customer based on their preferences.

Consider the following information:
{{#if dietaryRestrictions}}
Dietary Restrictions: {{#each dietaryRestrictions}}- {{{this}}}\n{{/each}}
{{/if}}
{{#if tastePreferences}}
Taste Preferences: {{#each tastePreferences}}- {{{this}}}\n{{/each}}
{{/if}}

Based on the above, recommend a few dishes and suitable wine pairings. Ensure the recommendations cater to the specified dietary restrictions and taste preferences. If no specific preferences are given, provide general popular recommendations.
`,
});

const aiTasteAdvisorRecommendationsFlow = ai.defineFlow(
  {
    name: 'aiTasteAdvisorRecommendationsFlow',
    inputSchema: AITasteAdvisorRecommendationsInputSchema,
    outputSchema: AITasteAdvisorRecommendationsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('Failed to get recommendations from the AI Taste Advisor.');
    }
    return output;
  }
);
