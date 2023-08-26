"use client";
import Button, { ButtonType } from "@/components/Button";
import ModalCreatePokemon from "../ModalCreatePokemon";
import { useModalContext } from "@/context/modal";

interface Props {}

const CreatePokemon: React.FC<Props> = (props) => {
  const { modalOpen, setModalOpen } = useModalContext();

  return <>{modalOpen && <ModalCreatePokemon setModalOpen={setModalOpen} />}</>;
};

export default CreatePokemon;
