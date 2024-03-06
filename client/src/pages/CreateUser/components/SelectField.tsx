import { FC } from "react"
import { useFormContext } from "react-hook-form"
import { CreateUserValues } from "../schema/create-user.schema.ts"

interface SelectFieldProps {
  fieldName: keyof CreateUserValues
  label: string
  options: { value: string; label: string }[]
}

export const SelectField: FC<SelectFieldProps> = ({
  fieldName,
  label,
  options,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<CreateUserValues>()

  return (
    <div className="mb-4">
      <label
        htmlFor={fieldName}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
        <span className="ml-1 text-xs text-red-500">*</span>
      </label>
      <select
        {...register(fieldName)}
        id={fieldName}
        name={fieldName}
        className="p-2 border border-gray-300 rounded focus:outline-none mb-4"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {errors[fieldName] && (
        <div className="text-xs text-red-500">{errors[fieldName]?.message}</div>
      )}
    </div>
  )
}
