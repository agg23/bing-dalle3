import { ImageDBEntry, PromptDBEntry } from "../content/db";

export interface PromptImageWithUrl {
  image: ImageDBEntry;
  prompt: PromptDBEntry;
  url: string;
}
