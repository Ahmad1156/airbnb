"use client";

import React from "react";
import { IconType } from "react-icons/lib";

type ButtonProps = {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
};

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
}) => {
  const styles = outline
    ? "bg-white border-black text-black"
    : "bg-rose-500 border-rose-500 text-white";
  const size = small
    ? "py-1 text-sm font-light border-[1px]"
    : "py-3 text-md font-semibold border-[2px] ";
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full ${styles} ${size}`}
    >
      {Icon && <Icon size={24} className="absolute left-4 top-3" />}
      {label}
    </button>
  );
};

export default Button;
