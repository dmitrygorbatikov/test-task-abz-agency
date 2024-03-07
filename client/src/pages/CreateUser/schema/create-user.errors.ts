export enum E_ErrorMessage {
  required = "This field is required",
  format = "Incorrect format",
}

export const regExp = {
  name: /^[A-Za-z]+((\s)?(('|-|\.)?([A-Za-z])+))*$/,
  email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  number: /^(?:[0-9]\d*|\d)$/,
  phone: /^(?:\+380|380|0)([1-9]\d{8})$/,
  letter: /^[a-zA-Z]+$/,
  date: /^[0-9]{2}.[0-9]{2}.[0-9]{4}/,
  social_insurance_number: /^\d{3}-\d{3}-\d{3}$/,
}
