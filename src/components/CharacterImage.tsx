import { Character } from "@/app/init/page";

export default function CharacterImage({ characterId, name }: Character) {
  return (
    <div className="my-4">
      <img
        src={`/images/regularshow/${characterId}.webp`}
        className=""
        alt={name}
      />
    </div>
  );
}
