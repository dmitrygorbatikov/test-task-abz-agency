import { FC, ChangeEvent, useState } from "react"
import { CreateUserValues } from "../schema/create-user.schema.ts"
import { useFormContext } from "react-hook-form"

interface ImageFieldProps {
  fieldName: keyof CreateUserValues
  label: string
}

export const ImageField: FC<ImageFieldProps> = ({ fieldName, label }) => {
  const {
    formState: { errors },
    setValue,
    setError,
  } = useFormContext<CreateUserValues>()
  const [image, setImage] = useState<string | ArrayBuffer | null>(null)

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files?.[0]

    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader?.result)
        setValue(fieldName, String(reader?.result))
        setError(fieldName, { message: "" })
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="mb-10 relative">
      <label
        htmlFor={fieldName}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
        <span className="ml-1 text-xs text-red-500">*</span>
      </label>
      <input
        type="file"
        id={fieldName}
        name={fieldName}
        accept="image/*"
        onChange={handleImageChange}
        className={`mt-1 p-2 border rounded w-full ${
          errors[fieldName]?.message ? "border-red-500" : ""
        }`}
      />
      {image && (
        <div className="mt-2">
          <img
            src={String(image)}
            alt="Uploaded"
            className="max-w-full h-32 object-cover"
          />
        </div>
      )}
      {errors[fieldName] && (
        <div className={`absolute text-xs font-normal text-red-500`}>
          {errors[fieldName]?.message}
        </div>
      )}
    </div>
  )
}
