export interface TimelineEvent {
    year: string;
    title: string;
    description: string;
    fullText?: string[]; // Detailed content paragraphs
    details?: string[];
    image?: string;
    quote?: string;
}

export interface HistoricalPeriod {
    id: string;
    period: string;
    title: string;
    summary: string;
    events: TimelineEvent[];
}