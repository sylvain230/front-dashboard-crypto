const headers = {
  Accept: "application/json",
  "Content-Type": "application/json"
}

// Exemple amélioré pour la gestion des erreurs
export const handleResponse = async (response: Response) => {
  if (response.ok) { // response.ok couvre les statuts 2xx
    return response.json();
  }

  // Tenter de lire le corps de l'erreur si JSON
  let errorData: any = {};
  try {
    errorData = await response.json();
  } catch (e) {
    // Si la réponse n'est pas un JSON valide, ou si elle est vide
    errorData = { message: response.statusText || "Something went wrong" };
  }

  // Créer une erreur personnalisée ou enrichir l'erreur existante
  const error = new Error(errorData.message || "Unknown error");
  (error as any).status = response.status;
  (error as any).data = errorData; // Attacher les données d'erreur si disponibles
  throw error;
};

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

export const get = async<TResponse> (path: string): Promise<TResponse> => {
  const url = encodeURI(`${path}`)
  const data = await fetch(url).then(response => {
    if (response.status >= 400 && response.status < 600) {
      throw new Error("Bad response from server")
    }
    return response
  })
  return await data.json()
}
