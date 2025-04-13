import { ZodType } from "zod";

declare global {
  type ZodValidation = ZodType<string | boolean, any, string | boolean>;
  type SchemaInfe<T extends readonly { formKey: string }[]> = { [K in T[number]["formKey"]]: ZodValidation };
  type KeyValueInfe<T> = {
    [K in keyof T]: { key: K; value: T[K] };
  }[keyof T];

  type Obj<K extends string> = {
    label: string;
    formKey: K;
    type: "text" | "formItem";
    defaultValue: string | boolean;
    validation: ZodValidation;
  };
}
