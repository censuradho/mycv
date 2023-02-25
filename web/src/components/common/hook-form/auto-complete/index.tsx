import { Controller } from "react-hook-form";
import { AutoComplete } from "@/components/common/auto-complete";
import { AutoCompleteFormProps } from "./types";

export function AutoCompleteForm (props: AutoCompleteFormProps) {
  const {
    control,
    keyName,
    ...otherProps
  } = props

  return (
    <Controller
      control={control}
      name={otherProps.name}
      render={({ field }) => (
        <AutoComplete
          getItemValue={(value: any) => keyName ? value[keyName] : value}
          onSelect={(value, item) => field.onChange(value)}
          {...otherProps}
        />
      )}
    />
  )

}