import axios from 'axios'

import { API_URL } from '../config'

export const uploadImage = async (
  file: File,
) => {
  const formData = new FormData()

  formData.append('image', file)

  const response = await axios.post(
    `${API_URL}/upload`,
    formData,
  )

  return response.data
}