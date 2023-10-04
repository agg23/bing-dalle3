import Dexie, { Table } from "dexie";

export interface ImageDBEntry {
	id: string;
	index: number;
	image: Blob;
}

export interface PromptDBEntry {
	id: string;
	prompt: string;
	recordTimestamp: number;
}

class DBDexie extends Dexie {
	image: Table<ImageDBEntry>;
	prompt: Table<PromptDBEntry>;

	constructor() {
		super("dalle3");

		this.version(1).stores({
			// Only the indexes
			image: "&[id+index]",
			prompt: "&id",
		});
	}
}

export const db = new DBDexie();
