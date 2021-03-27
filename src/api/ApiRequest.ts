import axios from "./axios"

// Catalogs
export const allCatalogs = () => axios.get("catalogs")
export const oneCatalog = (id: string) => axios.get(`catalogs/${id}`)
export const deleteCatalog = (id: string) => axios.delete(`catalogs/${id}`)
export const insertCatalog = (name: string) => axios.post("catalogs", { name })
export const updateCatalog = (id: string, name: string) => axios.put(`catalogs/${id}`, { name })

// Offers
export const allOffers = () => axios.get("offers")
export const oneOffer = (id: string) => axios.get(`offers/${id}`)
export const deleteOffer = (id: string) => axios.delete(`offers/${id}`)
export const insertOffer = (data: { productId: string, price: string, submittedBy: string, isActive: boolean, startAt: Date, endAt: Date }) => axios.post("offers", data)
export const updateOffer = (id: string, data: { productId: string, price: string, submittedBy: string, isActive: boolean, startAt: Date, endAt: Date }) => axios.put(`offers/${id}`, data)

// Products
export const allProducts = () => axios.get("products")
export const allParentProducts = () => axios.get("products?isParent=true")
export const allChildProducts = () => axios.get("products?isParent=false")
export const oneProduct = (id: string) => axios.get(`products/${id}`)
export const deleteProduct = (id: string) => axios.delete(`products/${id}`)
export const insertProduct = (data: { name: string, parentId: string, description: string, catalogId: string, price: string, brand: string, remainingStock: number, options: Array<Object>, allOptions: Array<Object> }) => axios.post("products", data)
export const updateProduct = (id: string, data: { name: string, parentId: string, description: string, catalogId: string, price: string, brand: string, remainingStock: number, options: Array<Object>, allOptions: Array<Object> }) => axios.put(`products/${id}`, data)