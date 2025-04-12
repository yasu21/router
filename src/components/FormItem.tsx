import { Box } from "@mui/material";
import { Control, Controller, Path } from "react-hook-form";
type FormItemProps<FormSchema extends Record<string, FormValue>> = {
  form: Obj<Path<FormSchema>>;
  control: Control<FormSchema>;
};
export const FormItem = <FormSchema extends Record<string, FormValue>>(props: FormItemProps<FormSchema>) => {
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
