import { useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { DefaultValues, Path, PathValue, useForm } from "react-hook-form";
import { z } from "zod";

type UseForms<K extends string> = {
  constForms: readonly Obj<K>[];
};

export const useForms = <K extends string>(props: UseForms<K>) => {
  const { constForms } = props;
  const [forms, setForms] = useState(() => constForms.map((item) => ({ ...item })));

  // スキーマを取り出し、useStateに
  type Validations = ValidationsInfe<typeof constForms>;
  const [schema, setSchema] = useState<Validations>(() => {
    return Object.fromEntries(constForms.map((form) => [form.formKey, form.validation])) as Validations;
  });

  // スキーマの変更でスキーマオブジェクトを生成
  const { schemaObject } = useMemo(() => {
    const schemaObject = z.object(schema);
    return { schemaObject };
  }, [schema]);
  type Schema = z.infer<typeof schemaObject>;

  // 初期値を取り出す
  const defaultValues = useMemo(() => {
    return Object.fromEntries(constForms.map((form) => [form.formKey, form.defaultValue])) as DefaultValues<Schema>;
  }, [constForms]);

  const { control, setValue, getValues, handleSubmit, formState, reset } = useForm<Schema>({
    mode: "onChange",
    defaultValues,
    resolver: zodResolver(schemaObject),
  });

  type SetKey = Path<Schema>;
  type SetValue = PathValue<Schema, SetKey>;
  const setValueWithOp = (key: SetKey, value: SetValue) => {
    setValue(key, value, { shouldDirty: true, shouldValidate: true });
  };

  return {
    forms,
    setForms,
    schema,
    setSchema,
    control,
    formState,
    setValue,
    setValueWithOp,
    getValues,
    handleSubmit,
    reset,
    SchemaType: null as unknown as Schema,
  };
};
