import axios from 'axios'

import { API_URL } from '../config'

export const getCart = async () => {
  const token =
    localStorage.getItem('token')

  const response = await axios.get(
    `${API_URL}/cart`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  return response.data
}

export const removeCartItem = async (
  id: string,
) => {
  const token =
    localStorage.getItem('token')

  const response = await axios.delete(
    `${API_URL}/cart/item/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  return response.data
}
export const addToCart = async (
  bookId: string,
) => {
  const token =
    localStorage.getItem('token')

  const response = await axios.post(
    `${API_URL}/cart/add`,
    {
      bookId,
      quantity: 1,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  return response.data
}
export const increaseQuantity = async (
  id: string,
) => {
  const token =
    localStorage.getItem('token')

  const response = await axios.patch(
    `${API_URL}/cart/increase/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  return response.data
}
export const decreaseQuantity = async (
  id: string,
) => {
  const token =
    localStorage.getItem('token')

  const response = await axios.patch(
    `${API_URL}/cart/decrease/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  return response.data
}