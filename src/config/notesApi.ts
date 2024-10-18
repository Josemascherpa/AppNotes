import axios from "axios"

export const notesApi = axios.create({
  baseURL:"http://192.168.100.7:3000"//ipv4
})