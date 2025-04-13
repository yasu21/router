import { ZodType } from "zod";
import { Path } from "react-hook-form";

declare global {
  type FormValue = string | boolean;
  type ZodValidation = ZodType<string | boolean, any, string | boolean>;
  type ValidationsInfe<T extends readonly { formKey: string }[]> = { [K in T[number]["formKey"]]: ZodValidation };
  type KeyValueInfe<T> = { key: Path<T>; value: FormValue };

  type Obj<K extends string> = {
    label: string;
    formKey: K;
    type: "text" | "formItem";
    defaultValue: string | boolean;
    validation: ZodValidation;
  };
}
