"use client";
import React, { useEffect } from "react";

export const BgPokemonTypeColor = {
  bug: "bg-[#92BC2C]",
  dark: "bg-[#595761]",
  dragon: "bg-[#0C69C8]",
  electric: "bg-[#F2D94E]",
  fairy: "bg-[#EE90E6]",
  fighting: "bg-[#D3425F]",
  fire: "bg-[#FBA54C]",
  flying: "bg-[#A1BBEC]",
  ghost: "bg-[#5F6DBC]",
  grass: "bg-[#5FBD58]",
  ground: "bg-[#DA7C4D]",
  ice: "bg-[#75D0C1]",
  normal: "bg-[#A0A29F]",
  poison: "bg-[#B763CF]",
  psychic: "bg-[#FA8581]",
  rock: "bg-[#C9BB8A]",
  steel: "bg-[#5695A3]",
  water: "bg-[#539DDF]",
};

interface Props {
  type: string;
}

const PokemonTypes: React.FC<Props> = ({ type }) => {
  return (
    <div
      className={`inline-block text-xs px-1 rounded-full py-1 ${
        BgPokemonTypeColor[type] && BgPokemonTypeColor[type]
      } border-white border-2`}
    >
      {type}
    </div>
  );
};

export default PokemonTypes;
