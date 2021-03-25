import axios from "./axios"

// Auth
export const login = (email : string, password: string) => axios.post("auth/login", { email, password })
export const register = (firstName : string, lastName: string, email: string, password: string) => axios.post("auth/register", { firstName, lastName, email, password })

// Catalogs
export const allCatalogs = () => axios.get("catalogs")
export const oneCatalog = (id: string) => axios.get(`catalogs/${id}`)
export const deleteCatalog = (id: string) => axios.delete(`catalogs/${id}`)
export const insertCatalog = (name: string) => axios.post("catalogs", { name })
export const updateCatalog = (id: string, name: string) => axios.put(`catalogs/${id}`, { name })

// Offers
export const allOffers = () => axios.get("offers")
export const oneOffers = (id: string) => axios.get(`offers/${id}`)
export const deleteOffers = (id: string) => axios.delete(`offers/${id}`)
export const insertOffers = (productId: string, price: string, submittedBy: string, isActive: boolean, startAt: Date, endAt: Date) => axios.post("offers", {
    productId,
    price,
    submittedBy,
    isActive,
    startAt,
    endAt
})
export const updateOffers = (id: string, productId: string, price: string, submittedBy: string, isActive: boolean, startAt: Date, endAt: Date) => axios.put(`offers/${id}`, {
    productId,
    price,
    submittedBy,
    isActive,
    startAt,
    endAt
})

// Products
export const allProducts = () => axios.get("products")
export const oneProducts = (id: string) => axios.get(`products/${id}`)
export const deleteProducts = (id: string) => axios.delete(`products/${id}`)
export const insertProducts = (name: string, parentId: string, description: string, catalogId: string, price: string, brand: string, remainingStock: number, options: Array<Object>, allOptions: Array<Object>) => axios.post("products", {
  name,
  parentId,
  description,
  catalogId,
  price,
  brand,
  remainingStock,
  options,
  allOptions
})
export const updateProducts = (id: string, name: string, parentId: string, description: string, catalogId: string, price: string, brand: string, remainingStock: number, options: Array<Object>, allOptions: Array<Object>) => axios.put(`products/${id}`, {
    name,
    parentId,
    description,
    catalogId,
    price,
    brand,
    remainingStock,
    options,
    allOptions
})

// Users
export const allUsers = () => axios.get("users")
export const oneUsers = (id: string) => axios.get(`users/${id}`)
export const deleteUsers = (id: string) => axios.delete(`users/${id}`)
export const updateUsers = (id: string, firstName : string, lastName: string, email: string, password: string) => axios.put(`users/${id}`, { firstName,  lastName, email,  password })