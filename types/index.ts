export interface MaritimeEvent {
  id: string;
  slug: string;
  name: string;
  city: string;
  country: string;
  countryCode: string;
  date: string;
  dateSort: string;
  sectors: string[];
  primarySector: string;
  attendance: { min: number; max: number };
  importanceScore: number;
  dealRelevanceScore: number;
  venue: string;
  organizer: string;
  website: string;
  description: string;
  whoAttends: {
    shipowners: number;
    investors: number;
    startups: number;
    corporates: number;
    regulators: number;
  };
  networkingLevel: "Low" | "Medium" | "High";
  importanceExplanation: string;
  dealRelevanceExplanation: string;
}

export type Sector =
  | "Shipping"
  | "Offshore Wind"
  | "Ports"
  | "Maritime Tech"
  | "Finance";

export type ImportanceFilter = "low" | "medium" | "high";
