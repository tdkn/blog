"use client";
import { useState } from "react";

import { Checkbox } from "~/components/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "~/components/ui/field";

export interface CheckBoxProps {
  description: string;
  name: string;
  onChange?: () => void;
}

export const CheckBox = ({ description, name, onChange }: CheckBoxProps) => {
  const [checked, setChecked] = useState(false);

  return (
    <Field
      className="rounded-lg border border-border/70 bg-background p-3 transition-colors hover:border-primary/35 has-data-checked:border-primary/40 has-data-checked:bg-accent/70"
      data-checked={checked}
      orientation="horizontal"
    >
      <Checkbox
        checked={checked}
        id={name}
        name={name}
        onCheckedChange={() => {
          setChecked((value) => !value);
          onChange?.();
        }}
      />
      <FieldLabel htmlFor={name}>
        <FieldContent>
          <FieldTitle>{name}</FieldTitle>
          <FieldDescription>{description}</FieldDescription>
        </FieldContent>
      </FieldLabel>
    </Field>
  );
};
