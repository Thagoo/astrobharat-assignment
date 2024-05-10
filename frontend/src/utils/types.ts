export interface Astrologer {
  _id?: string;
  image: string | null;
  email: string;
  name: string;
  gender: string;
  languages: string[];
  specialties: string[];
}

export interface LanguageOptions {
  label: string;
  id: string;
}
