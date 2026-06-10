import axios from 'axios'

import { API_URL } from '../config'

export const signupUser = async (data: {
  name: string
  email: string
  password: string
  role: 'BUYER' | 'SELLER'
}) => {
  const response = await axios.post(
    `${API_URL}/auth/signup`,
    data,
  )

  return response.data
}
export const loginUser = async (data: {
  email: string
  password: string
}) => {
  const response = await axios.post(
     `${API_URL}/auth/login`,
    data,
  )

  return response.data
}