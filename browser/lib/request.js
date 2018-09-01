

export async function request(payload){
  const response = await fetch('/request', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify(payload)
  })

  console.log({response})
  const body = await response.json()
  console.log({body})
}
