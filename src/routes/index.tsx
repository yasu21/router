import { createFileRoute } from "@tanstack/react-router";
import { Forms } from "../components/Forms";
import { useForms } from "../hooks/useForms";
import { z } from "zod";

export const Route = createFileRoute("/")({
  component: Index,
});

const readOnlyForms = [
  { label: "aa", formKey: "aa", type: "text", defaultValue: "aa", validation: z.string().min(3) },
  { label: "bb", formKey: "bb", type: "text", defaultValue: "bb", validation: z.string().min(3) },
  { label: "cc", formKey: "cc", type: "formItem", defaultValue: "cc", validation: z.string().min(3) },
] as const;
type FormValues = FormValuesInfe<typeof readOnlyForms>;

function Index() {
  const { forms, setSchema, setValueWithOp, handleSubmit, control } = useForms({ readOnlyForms });

  const onChange = (obj: { key: keyof FormValues; value: FormValue }) => {
    const { key, value } = obj;
    setValueWithOp(key, value);
    setValueWithOp("cc", value);
    setSchema((prev) => {
      return { ...prev, [key]: z.string().min(5) };
    });
  };

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      <Forms forms={forms} control={control} onChange={onChange} />
      <div>
        <button onClick={handleSubmit(onSubmit)}>ok</button>
      </div>
    </div>
  );
}
