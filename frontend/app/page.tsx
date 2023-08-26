import Button from "@/components/Button";
import CreatePokemon from "@/components/CreatePokemon";
import PokemonCard, { Pokemon } from "@/components/PokemonCard";
import { fetchInstance } from "@/config/fetch";
import { redirect } from "next/navigation";
import { routes } from "@/config/routes";
import { ModalContextProvider } from "../context/modal";
import CreatePokemonButton from "@/components/CreatePokemonButton";
import RedirectAdminPage from "@/components/RedirectAdminPage";
import Logout from "@/components/Logout";

const getPokemons = async (): Promise<Pokemon[]> => {
  try {
    const pokemons = await fetchInstance(routes.pokemon.get);
    return pokemons;
  } catch {
    redirect("api/auth/signin");
  }
};

export default async function Home() {
  const pokemons = await getPokemons();

  const isAdmin = async () => {
    try {
      const { roles } = await fetchInstance(routes.user.get);
      return roles.includes("ADMIN");
    } catch {
      return false;
    }
  };

  const admin = await isAdmin();

  return (
    <ModalContextProvider>
      <CreatePokemon />
      <div className="h-[10vh] itens-center justify-between bg-red-700 select-none px-16 flex">
        <p className="text-4xl text-white my-auto">POKEDEX</p>
        <div className="flex gap-4 items-center ">
          {admin && <RedirectAdminPage />}
          <Logout theme="POKEDEX"/>
        </div>
      </div>
      {/* <CreatePokemon /> */}
      <CreatePokemonButton />
      <div className="flex flex-wrap gap-2 py-10 px-10">
        {pokemons &&
          pokemons.map((pokemon, index) => <PokemonCard key={index} pokemon={pokemon} />)}
      </div>
    </ModalContextProvider>
  );
}
