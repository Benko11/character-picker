import clientPromise from "@/db";
import { ObjectId } from "mongodb";

export interface Character {
  _id?: ObjectId;
  characterId: number;
  name: string;
}
export default async function Init() {
  async function init() {
    const characters: Character[] = [
      { characterId: 1, name: "Rigby" },
      { characterId: 2, name: "Mordecai" },
      { characterId: 3, name: "Benson" },
      { characterId: 4, name: "Pops" },
      { characterId: 5, name: "Skips" },
      { characterId: 6, name: "Muscle Man" },
      { characterId: 7, name: "High Five Ghost" },
      { characterId: 8, name: "Eileen" },
      { characterId: 9, name: "Margaret" },
      { characterId: 10, name: "Thomas" },
      { characterId: 11, name: "Starla" },
      { characterId: 12, name: "Don" },
      { characterId: 13, name: "Baby Ducks" },
      { characterId: 14, name: "Mr Maellard" },
      { characterId: 15, name: "Death" },
      { characterId: 16, name: "CJ" },
    ];
    const client = await clientPromise;
    const database = client.db("characterPicker");
    const charactersCollection = database.collection("characters");

    await charactersCollection.deleteMany({});

    characters.map(
      async (character) => await charactersCollection.insertOne(character)
    );

    console.log("success!");
  }

  await init();
  return <p>Initialization...</p>;
}
