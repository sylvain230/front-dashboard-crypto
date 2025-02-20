const headers = {
  Accept: "application/json",
  "Content-Type": "application/json"
}

export const post = async(path: string, body: any) => {
  const url = encodeURI(`${import.meta.env.VITE_API_BASE_URL}${import.meta.env.BASE_URL}${path}`)
  const data = await fetch(url, {
    headers,
    method: "POST",
    body: JSON.stringify(body)
  }).then(response => {
    if (response.status >= 400 && response.status < 600) {
      throw new Error("Bad response from server")
    }
    return response
  })
  return await data.json()
}

export const get = async (path: string) => {
  const url = encodeURI(`${path}`)
  const data = await fetch(url).then(response => {
    if (response.status >= 400 && response.status < 600) {
      throw new Error("Bad response from server")
    }
    return response
  })
  return await data.json()
}
