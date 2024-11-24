import axios from 'axios'

const API_URL = import.meta.env.PROD ? '/api' : '/.netlify/functions'

export interface LeadFormData {
  name: string
  companyName: string
  email: string
  phone: string
  cartItems?: Array<{
    id: number
    title: string
    section: string
    quantity: number
  }>
}

export const submitLead = async (data: LeadFormData) => {
  try {
    const response = await axios.post(`${API_URL}/submitLead`, data)
    return response.data
  } catch (error) {
    console.error('API error:', error)
    throw new Error('Failed to submit lead')
  }
}