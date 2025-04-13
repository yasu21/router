import { Box } from "@mui/material";
import { Control, Controller, Path } from "react-hook-form";
type FormItemProps<Schema extends Record<Path<Schema>, FormValue>> = {
  form: Obj<Path<Schema>>;
  control: Control<Schema>;
};

export const FormItem = <Schema extends Record<Path<Schema>, FormValue>>(props: FormItemProps<Schema>) => {
  const { form, control } = props;
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
            <Box>
              {label} : {value}
            </Box>
            {error && <Box>{error}</Box>}
          </>
        );
      }}
    />
  );
};
