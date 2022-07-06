export const dateParser = (data) => {
  let options = {
    hour : "2-digit",
    minute : "2-digit"
  }

  let timestamp = Date.parse(data)

  let date = new Date(timestamp).toLocaleDateString('en-us', options)

  return date.toString();
}

export const timestampParser = (data) => {
  let options = {
    hour : "2-digit",
    minute : "2-digit"
  }

  let date = new Date(data).toLocaleDateString('en-us', options)

  return date.toString()
}

export const isEmpty = (value) => {
  return (value === undefined || value === null || 
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0))
}


