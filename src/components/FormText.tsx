import { Box, TextField } from "@mui/material";
import { Control, Controller, Path } from "react-hook-form";
type FormItemProps<Schema extends Record<string, FormValue>> = {
  form: Obj<Path<Schema>>;
  control: Control<Schema>;
  onChange: (obj: { key: Path<Schema>; value: string }) => void;
};
export const FormText = <Schema extends Record<string, FormValue>>(props: FormItemProps<Schema>) => {
  const { form, control, onChange } = props;
  const { formKey, label } = form;
  return (
    <Controller
      name={formKey}
      control={control}
      render={({ field: { value }, formState: { errors } }) => {
        const msg = errors[formKey]?.message;
        const error = typeof msg === "string" ? msg : "";
        return (
          <>
            <TextField value={value} label={label} size={"small"} onChange={(e) => onChange({ key: formKey, value: e.target.value })} error={!!error} />
            {error && <Box>{error}</Box>}
          </>
        );
      }}
    />
  );
};
