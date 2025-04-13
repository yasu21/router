import { Box, TextField } from "@mui/material";
import { Control, Controller, Path } from "react-hook-form";

type FormItemProps<Schema extends Record<Path<Schema>, FormValue>> = {
  form: Obj<Path<Schema>>;
  control: Control<Schema>;
  onChange: (obj: KeyValueInfe<Schema>) => void;
};

export const FormText = <Schema extends Record<Path<Schema>, FormValue>>(props: FormItemProps<Schema>) => {
  const { form, control, onChange } = props;
  const { formKey, label } = form;

  type FormKey = Path<Schema>;
  const emitOnChange = (key: FormKey, value: string) => {
    const obj = { key, value };
    onChange(obj);
  };
  return (
    <Controller
      name={formKey}
      control={control}
      render={({ field: { value }, formState: { errors } }) => {
        const msg = errors[formKey]?.message;
        const error = typeof msg === "string" ? msg : "";
        return (
          <>
            <TextField value={value} label={label} size={"small"} onChange={(e) => emitOnChange(formKey, e.target.value)} error={!!error} />
            {error && <Box>{error}</Box>}
          </>
        );
      }}
    />
  );
};
