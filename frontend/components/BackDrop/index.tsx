import React from "react";

export enum BackDropType {
  MODAL,
  MODAL_POKEMON,
}

interface Props {
  type: BackDropType;
  setModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const BackDrop: React.FC<Props> = ({ type, setModalOpen }) => {
  switch (type) {
    case BackDropType.MODAL:
      return (
        <div
          onClick={() => {
            if (setModalOpen) setModalOpen(false);
          }}
          className="z-10 fixed bg-black h-[100vh] w-[100vw] opacity-40"
        ></div>
      );
      case BackDropType.MODAL_POKEMON:
      return (
        <div
          onClick={() => {
            if (setModalOpen) setModalOpen(false);
          }}
          className="z-10 translate-y-[-19%] fixed bg-black h-[100vh] w-[100vw] opacity-40"
        ></div>
      );
    default:
      return <></>;
  }
};

export default BackDrop;
