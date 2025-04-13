import { createFileRoute } from "@tanstack/react-router";
import { Forms } from "../components/Forms";
import { useForms } from "../hooks/useForms";
import { z } from "zod";

export const Route = createFileRoute("/")({
  component: Index,
});

const constForms1 = [
  { label: "aa", formKey: "aa", type: "text", defaultValue: "aa", validation: z.string().min(3) },
  { label: "bb", formKey: "bb", type: "text", defaultValue: "bb", validation: z.string().min(3) },
  { label: "cc", formKey: "cc", type: "formItem", defaultValue: "cc", validation: z.string().min(3) },
] as const;
const id = localStorage.getItem("id") || "";
const obj = { label: "dd", formKey: "dd", type: "formItem", defaultValue: id, validation: z.string().min(3) } as const;
const constForms = id ? [...constForms1, obj] : constForms1;

function Index() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { forms, setSchema, setValueWithOp, handleSubmit, control, SchemaType: ST } = useForms({ constForms });
  type Schema = typeof ST;

  const onChange = (obj: KeyValueInfe<Schema>) => {
    const { key, value } = obj;
    setValueWithOp(key, value);
    setValueWithOp("cc", value);
    setSchema((prev) => {
      return { ...prev, [key]: z.string().min(5) };
    });
  };

  const onSubmit = (data: Schema) => {
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
