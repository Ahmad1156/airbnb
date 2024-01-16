"use client";

import { FieldValues, UseFormRegister, FieldErrors } from "react-hook-form";
import { BiDollar } from "react-icons/bi";
import { useState } from "react";

type InputProps = {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
};

const Input: React.FC<InputProps> = ({
  id,
  label,
  type,
  disabled,
  formatPrice,
  required,
  register,
  errors,
}) => {
  const [value, setValue] = useState("");
  return (
    <div className="w-full relative">
      {formatPrice && (
        <BiDollar
          size={24}
          className="text-neutral-700 absolute top-5 left-2"
        />
      )}
      <input
        id={id}
        disabled={disabled}
        type={type}
        {...register(id, { required, minLength: 3, maxLength: 255 })}
        placeholder=" "
        onChange={(e) => setValue(e.target.value)}
        className={`peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md oultine-none transition disabled:opacity-70 disabled:cursor-not-allowed ${
          formatPrice ? "pl-9" : "pl-4"
        } ${
          errors[id]
            ? "border-rose-500 focus:border-rose-500"
            : "border-neutral-300 focus:border-black"
        }`}
        required
      />
      <label
        className={`absolute text-md duration-200 transform -translate-y-3 top-5 z-10 origin-[0] ${
          formatPrice ? "left-9" : "left-4"
        } peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-4 ${
          value && "-translate-y-4 scale-75"
        } ${errors[id] ? "text-rose-500" : "text-zinc-400"}`}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
