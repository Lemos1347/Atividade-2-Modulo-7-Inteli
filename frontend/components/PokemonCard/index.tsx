"use client";
import Image from "next/image";
import React from "react";
import PokemonTypes from "../PokemonTypes";
import { BsFillTrashFill } from "react-icons/bs";
import { fetchInstance } from "@/config/fetch";
import { routes } from "@/config/routes";
import { toast } from "react-toastify";
import { FiEdit } from "react-icons/fi";
import { useRouter } from "next/navigation";
import NickName from "../NickName";

const BorderPokemonTypeColor = {
  bug: "border-pokemon-bug",
  dark: "border-pokemon-dark",
  dragon: "border-pokemon-dragon",
  electric: "border-pokemon-electric",
  fairy: "border-pokemon-fairy",
  fighting: "border-pokemon-fighting",
  fire: "border-pokemon-fire",
  flying: "border-pokemon-flying",
  ghost: "border-pokemon-ghost",
  grass: "border-pokemon-grass",
  ground: "border-pokemon-ground",
  ice: "border-pokemon-ice",
  normal: "border-pokemon-normal",
  poison: "border-pokemon-poison",
  psychic: "border-pokemon-psychic",
  rock: "border-pokemon-rock",
  steel: "border-pokemon-steel",
  water: "border-pokemon-water",
};

export interface Pokemon {
  id: string;
  name: string;
  order: number;
  image: string;
  nickName: string;
  types: PokemonType[];
}

interface PokemonType {
  pokemonId: string;
  name: string;
}

interface Props {
  pokemon: Pokemon;
}

const PokemonCard: React.FC<Props> = ({ pokemon }) => {
  const { id, name, order, image, types, nickName } = pokemon;

  const router = useRouter();

  const deletePokemon = () => {
    fetchInstance(routes.pokemon.delete(id), {
      method: "DELETE",
    })
      .then(() => {
        toast.success("Pokemon deletado com sucesso!");
        router.refresh();
      })
      .catch((e) => {
        console.log(e.message);
        toast.error("Erro ao deletar pokemon!");
      });
  };

  return (
    <div
      className={`bg-white border-2
        ${BorderPokemonTypeColor[types[0].name]}
       rounded-lg inline-block shadow-md py-3 px-1 select-none`}
    >
      <div className="flex justify-between">
        <div>
          {pokemon.types &&
            pokemon.types.map(({ name }, index) => <PokemonTypes type={name} key={index} />)}
        </div>
        <BsFillTrashFill
          className={"fill-black transition-all hover:fill-red-500"}
          size={20}
          onClick={() => deletePokemon()}
        />
      </div>
      <Image className={""} src={image} alt={name} width={200} height={200} />
      <NickName id={id} name={name} nickName={nickName} />
      <p className="text-gray-500 px-5">#{order}</p>
    </div>
  );
};

export default PokemonCard;
