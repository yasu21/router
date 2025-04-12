import { useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { DefaultValues, Path, PathValue, useForm } from "react-hook-form";
import { z } from "zod";

type UseForms<K extends string> = {
  readOnlyForms: readonly Obj<K>[];
};
export const useForms = <K extends string>(props: UseForms<K>) => {
  const { readOnlyForms } = props;
  const [forms, setForms] = useState(() => readOnlyForms.map((item) => ({ ...item })));

  // 初期値を取り出す
  type FormValues = FormValuesInfe<typeof readOnlyForms>;
  const defaultValues = useMemo(() => {
    return Object.fromEntries(readOnlyForms.map((form) => [form.formKey, form.defaultValue])) as FormValues;
  }, [readOnlyForms]);

  // スキーマを取り出し、useStateに
  type Schema = SchemaInfe<typeof readOnlyForms>;
  const [schema, setSchema] = useState<Schema>(() => {
    return Object.fromEntries(readOnlyForms.map((form) => [form.formKey, form.validation])) as Schema;
  });

  // スキーマの変更でスキーマオブジェクトを生成
  const { schemaObject } = useMemo(() => {
    const schemaObject = z.object(schema);
    return { schemaObject };
  }, [schema]);
  type SchemaType = z.infer<typeof schemaObject>;

  const { control, setValue, getValues, handleSubmit, formState, reset } = useForm<SchemaType>({
    mode: "onChange",
    defaultValues: defaultValues as DefaultValues<SchemaType>,
    resolver: zodResolver(schemaObject),
  });

  type PathKey = Path<SchemaType>;
  type PathValueType = PathValue<SchemaType, PathKey>;
  const setValueWithOp = (key: PathKey, value: PathValueType) => {
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
  };
};
