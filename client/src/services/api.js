import axios from 'axios'

export function withoutToken() {
  return axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
      'Content-Type': 'application/json',
    }
  })
} 

export function withToken(jwtToken) {
  return axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwtToken}` 
    }
  })
}

export function withTokenAndFile(jwtToken) {
  return axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${jwtToken}` 
    }
  })
}