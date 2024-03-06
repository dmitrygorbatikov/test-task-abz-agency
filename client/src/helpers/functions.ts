import moment from "moment"

export const formatDateTime = (inputDate: string) => {
  const currentDate = moment()
  const inputMoment = moment(inputDate)

  if (inputMoment.isSame(currentDate, "day")) {
    return inputMoment.format("HH:mm")
  } else if (inputMoment.isBefore(currentDate)) {
    return inputMoment.format("DD.MM.YYYY HH:mm")
  } else {
    return inputMoment.toISOString()
  }
}

export const generateQueryString = (params: any) => {
  return Object.keys(params)
    .filter(
      (key) =>
        params[key] !== undefined && params[key] !== null && params[key] !== "",
    )
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`,
    )
    .join("&")
}
