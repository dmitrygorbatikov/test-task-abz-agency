import { FC, HTMLInputTypeAttribute } from "react"
import { useFormContext } from "react-hook-form"

import { CreateTokenValues } from "../schema/create-token.schema.ts"

interface Props {
  fieldName: keyof CreateTokenValues
  label: string
  placeholder?: string
  required?: boolean
  type?: HTMLInputTypeAttribute | undefined
}

export const TextField: FC<Props> = ({
  fieldName,
  label,
  placeholder,
  required = true,
  type,
}) => {
  const {
    register,
    getValues,
    formState: { errors },
  } = useFormContext<CreateTokenValues>()

  const formValues = getValues()

  return (
    <div
      className={`relative flex-1 flex flex-col flex-shrink-0 gap-20 w-full`}
    >
      <div className="mb-4">
        <label
          htmlFor={fieldName}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
          <span
            className={`ml-1 text-xs text-red-500 ${required ? "" : "hidden"}`}
          >
            *
          </span>
        </label>
        <input
          {...register(fieldName)}
          placeholder={placeholder}
          type={type ? type : "text"}
          id={fieldName}
          name={fieldName}
          className={`${
            !!errors[fieldName]
              ? "border-solid border-2 border-red-500"
              : formValues[fieldName].toString()
                ? "border-solid border-2 border-green-800"
                : "border-solid border-2 border-gray-300"
          } 
          mt-1 mb-4 p-2 border rounded w-full`}
        />
      </div>

      {errors[fieldName] && (
        <div className={`absolute bottom-3 text-xs font-normal text-red-500`}>
          {errors[fieldName]?.message}
        </div>
      )}
      {errors[fieldName] && (
        <div className="pointer-events-none user-select-none absolute top-9 right-4 flex items-center justify-center w-4 h-4 text-xs font-semibold text-white bg-red-500 rounded-full">
          !
        </div>
      )}
    </div>
  )
}
