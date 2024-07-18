"use client";
import { ComponentPropsWithoutRef, useState } from "react";

import { classNames } from "~/lib/style";

export type CheckBoxProps = {
  description: string;
  name: string;
  onChange?: () => void;
} & Omit<ComponentPropsWithoutRef<"input">, "onChange">;

export function CheckBox({
  description,
  name,
  onChange,
  ...otherProps
}: CheckBoxProps) {
  const [checked, setChecked] = useState(false);
  const [focused, setFocused] = useState(false);

  return (
    <div
      aria-checked={checked}
      className={classNames(
        "relative flex cursor-pointer select-none items-start rounded-md px-4 py-2",
        {
          "bg-white bg-opacity-5": checked,
          "ring-2 ring-indigo-500": focused,
        },
      )}
      onBlur={() => setFocused(false)}
      onClick={() => {
        setChecked(!checked);
        onChange?.();
      }}
      onFocus={() => setFocused(true)}
      tabIndex={0}
    >
      <div className="flex h-6 items-center">
        <input
          checked={checked}
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
          id={name}
          name={name}
          readOnly={true}
          type="checkbox"
          {...otherProps}
        />
      </div>
      <div className="ml-3 text-sm leading-6">
        <label className="font-medium text-white" htmlFor={name}>
          {name}
        </label>
        <p className="text-gray-500">{description}</p>
      </div>
    </div>
  );
}
