export type EventType = "conference" | "expo" | "summit" | "workshop" | "forum" | "awards";
export type AccessType = "open" | "paid" | "invitation-only";
export type AttendeeFocus = "shipowners" | "investors" | "startups" | "government" | "mixed";
export type NetworkingLevel = "Low" | "Medium" | "High";
export type UpdateCategory = "order" | "sustainability" | "technology" | "partnership" | "regulation";

export interface ContactPerson {
  name: string;
  role?: string;
  email?: string;
  phone?: string;
  linkedin?: string;
}

export interface Edition {
  year: number;
  date: string;
  venue?: string;
  status: "past" | "upcoming";
}

export interface MaritimeEvent {
  id: string;
  slug: string;
  name: string;
  city: string;
  country: string;
  countryCode: string;
  date: string;
  dateSort: string;
  categories: string[];
  primaryCategory: string;
  attendance: { min: number; max: number };
  eventType: EventType;
  accessType: AccessType;
  attendeeFocus: AttendeeFocus;
  networkingLevel: NetworkingLevel;
  venue: string;
  organizer: string;
  website: string;
  description: string;
  importanceForUs: string;
  importanceForEcosystem: string;
  whoAttends: {
    shipowners: number;
    investors: number;
    startups: number;
    corporates: number;
    regulators: number;
  };
  contact?: ContactPerson;
  editions?: Edition[];
}

export interface IndustryUpdate {
  id: string;
  company: string;
  initial: string;
  color: string;
  headline: string;
  description: string;
  date: string;
  category: UpdateCategory;
}
