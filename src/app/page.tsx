"use client";

import CharacterImage from "@/components/CharacterImage";
import { getCharacters } from "./actions";
import { useEffect, useState } from "react";
import { Character } from "./init/page";
import { randomNumber } from "@/utils/randomNumber";
import Head from "next/head";
import { ObjectId } from "mongodb";

const FREQUENCY = 50;
const STOP_AFTER = 3500;

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [picked, setPicked] = useState<number>(0);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const data = await getCharacters();
      const parsed = JSON.parse(data);

      setCharacters(parsed);
      parsed.map((c: Character) => {
        const img: HTMLImageElement = new Image();
        img.src = `/images/regularshow/${c.characterId}.webp`;
      });
    };
    fetch();
  }, []);

  useEffect(() => {
    if (!clicked) return;

    const time = Date.now();
    const interval = setInterval(() => {
      const n = randomNumber(1, characters.length);
      setPicked(n);

      if (Date.now() - time > STOP_AFTER) {
        clearInterval(interval);
        setClicked(false);
        setPicked(n);
      }
    }, FREQUENCY);
  }, [clicked, characters.length]);

  function handleGenerate() {
    setClicked(true);
  }

  const character = characters.filter((c) => c.characterId === picked)[0];

  return (
    <>
      <main>
        <div className="flex flex-col w-48">
          <button
            className="text-sm uppercase shadow-lg tracking-tighter bg-slate-200 text-slate-800 px-4 py-2 rounded-full m-2 mb-4 hover:-translate-y-[2px] focus-within:-translate-y-[2px] focus-within:bg-slate-300 outline-none transition-transform "
            onClick={handleGenerate}
          >
            Generate
          </button>
          {picked > 0 && <CharacterImage {...character} />}
        </div>
      </main>
    </>
  );
}
