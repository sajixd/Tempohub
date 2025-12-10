export interface EventData {
    id: string;
    title: string;
    description: string;
    date: string;
    location: string;
    imageUrl: string;
    tags: string[];
    attendees: number;
    isAiGenerated?: boolean;
}

export interface CreateEventParams {
    title: string;
    userPrompt?: string; // Additional context for AI
}

export interface AiGenerationResult {
    description: string;
    tags: string[];
    locationSuggestion: string;
    imageUrl: string;
}
