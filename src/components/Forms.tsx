import { Box } from "@mui/material";
import { Control, Path } from "react-hook-form";
import { FormItem } from "./FormItem";
import { FormText } from "./FormText";

type FormsProps<Schema extends Record<Path<Schema>, FormValue>> = {
  forms: Obj<Path<Schema>>[];
  control: Control<Schema>;
  onChange: (obj: KeyValueInfe<Schema>) => void;
};

export function Forms<Schema extends Record<Path<Schema>, FormValue>>(props: FormsProps<Schema>) {
  const { forms, onChange, control } = props;

  return (
    <>
      {forms.map((form) => {
        const key = form.formKey;
        return (
          <Box key={key} sx={{ mb: 2 }}>
            {form.type === "text" && <FormText form={form} control={control} onChange={onChange} />}
            {form.type === "formItem" && <FormItem form={form} control={control} />}
          </Box>
        );
      })}
    </>
  );
}
