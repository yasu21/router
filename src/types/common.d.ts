import { ZodType } from "zod";

declare global {
  type FormValue = string | boolean;
  type ZodValidation = ZodType<FormValue, any, FormValue>;
  type FormValuesInfe<T extends readonly { formKey: string }[]> = { [K in T[number]["formKey"]]: FormValue };
  type SchemaInfe<T extends readonly { formKey: string }[]> = { [K in T[number]["formKey"]]: ZodValidation };

  type Obj<K extends string> = {
    label: string;
    formKey: K;
    type: "text" | "formItem";
    defaultValue: string | boolean;
    validation: ZodValidation;
  };
}
