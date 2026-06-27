export interface Message {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: string;
}

export type BrandTab =
  | "overview"
  | "logo"
  | "colors"
  | "typography"
  | "iconography"
  | "patterns"
  | "applications"
  | "voice"
  | "assistant";

export interface ColorSpec {
  name: string;
  hex: string;
  rgb: string;
  usage: string;
  contrastOnLight: string;
  contrastOnDark: string;
}

export interface TypeSpecimen {
  name: string;
  role: string;
  family: string;
  details: string;
  styles: string[];
  example: string;
}

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  author: "laura" | "nicolas";
  tags: string[];
  date: string;
  readTime: string;
  sprinkleColor: "strawberry" | "mint" | "blueberry";
}

export type ActivePage = "home" | "blog" | "brand";
