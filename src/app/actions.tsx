"use server";

import clientPromise from "@/db";
import { Character } from "./init/page";

export async function getCharacters() {
  const client = await clientPromise;
  const database = client.db("characterPicker");
  const charactersCollection = database.collection<Character>("characters");
  const raw = charactersCollection.find({});
  const characters = [];
  for await (const character of raw) {
    characters.push(character);
  }
  return JSON.stringify(characters);
}
