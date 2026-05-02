"use client";
import type { ComponentPropsWithoutRef} from "react";
import { useState } from "react";

import { classNames } from "~/lib/style";

export type CheckBoxProps = Omit<ComponentPropsWithoutRef<"input">, "onChange"> & {
  description: string;
  name: string;
  onChange?: () => void;
};

export function CheckBox({ description, name, onChange, ...otherProps }: CheckBoxProps) {
  const [checked, setChecked] = useState(false);

  return (
    <label
      className={classNames(
        "relative flex cursor-pointer items-start rounded-md px-4 py-2 select-none focus-within:ring-2 focus-within:ring-indigo-500",
        {
          "bg-opacity-5 bg-white": checked,
        },
      )}
    >
      <div className="flex h-6 items-center">
        <input
          checked={checked}
          className="h-4 w-4 rounded-md border-gray-300 text-indigo-600 focus:ring-indigo-600"
          id={name}
          name={name}
          onChange={() => {
            setChecked((value) => !value);
            onChange?.();
          }}
          type="checkbox"
          {...otherProps}
        />
      </div>
      <div className="ml-3 text-sm leading-6">
        <span className="font-medium text-white">{name}</span>
        <p className="text-gray-500">{description}</p>
      </div>
    </label>
  );
}
