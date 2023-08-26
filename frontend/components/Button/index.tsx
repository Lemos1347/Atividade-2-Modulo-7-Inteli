"use client";
import React from "react";

export enum ButtonType {
  CREATE_USER,
  CHANGE_PAGE,
  CREATE_POKEMON,
}

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: ButtonType;
}

const Button: React.FC<Props> = ({
  theme,
  className,
  children,
  onClick,
  disabled,
}) => {
  switch (theme) {
    case ButtonType.CREATE_USER:
      return (
        <button
          onClick={onClick}
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${className}`}
        >
          {children}
        </button>
      );
    case ButtonType.CHANGE_PAGE:
      return (
        <button
          onClick={onClick}
          className={`bg-white my-auto border-2 hover:bg-gray-300  font-bold py-2 px-4 rounded ${className}`}
        >
          {children}
        </button>
      );
    case ButtonType.CREATE_POKEMON:
      return (
        <button
          disabled={disabled}
          onClick={onClick}
          className={`bg-red-700 my-auto hover:bg-red-800 text-white font-bold py-2 px-2 ${className} rounded`}
        >
          {children}
        </button>
      );

    default:
      return <div></div>;
  }
};

export default Button;
