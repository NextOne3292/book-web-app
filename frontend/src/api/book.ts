import axios from 'axios'

import { API_URL } from '../config'


export const createBook = async (data: {
  title: string
  author: string
  description: string
  price: string
  imageUrl: string
}) => {
  const token =
    localStorage.getItem('token')

  const response = await axios.post(
    `${API_URL}/books`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  return response.data
}
export const getAllBooks = async () => {
  const response = await axios.get(
    `${API_URL}/books`,
  )

  return response.data
}
export const getBookById = async (
  id: string,
) => {
  const response = await axios.get(
    `${API_URL}/books/${id}`,
  )

  return response.data
}
export const updateBook = async (
  id: string,
  data: {
    title: string
    author: string
    description: string
    price: string
    imageUrl: string
  },
) => {
  const token =
    localStorage.getItem('token')

  const response = await axios.put(
    `${API_URL}/books/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  return response.data
}
export const getSellerBooks = async () => {
  const token = localStorage.getItem('token')

  const response = await axios.get(
    `${API_URL}/books/seller/my-books`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  return response.data
}

export const deleteBook = async (
  id: string,
) => {
  const token =
    localStorage.getItem('token')

  const response = await axios.delete(
    `${API_URL}/books/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  return response.data
}