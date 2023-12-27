export function getLocalStorageData() {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem("token")
      const entryTime = localStorage.getItem("entryTime")
      const name = localStorage.getItem("name");
      console.log(name,token, entryTime);
        const localStorageData = {
            name, entryTime, token
        }

      return localStorageData
    }
    return null; // Tratamento para casos em que não está no contexto do navegador
  }