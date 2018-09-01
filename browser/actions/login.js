import { request } from 'lib/request'


export async function login({ password }){
  console.log({ password })
  const response = await request({
    type: 'login',
    password,
  })
}
