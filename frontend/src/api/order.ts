import axios from 'axios'

import { API_URL } from '../config'

export const createOrder =
  async () => {
    const token =
      localStorage.getItem('token')

    const response =
      await axios.post(
        `${API_URL}/orders`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

    return response.data
  }

export const getOrders =
  async () => {
    const token =
      localStorage.getItem('token')

    const response =
      await axios.get(
        `${API_URL}/orders`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

    return response.data
  }
  export const getSellerOrders =
  async () => {
    const token =
      localStorage.getItem('token')

    const response =
      await axios.get(
        `${API_URL}/orders/seller`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

    return response.data
  }