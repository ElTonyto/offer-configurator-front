import React, { useEffect, useState } from "react"
import { useHistory } from 'react-router-dom'
import { allProducts, deleteProduct } from "../../api/ApiRequest"
import Truncate from "react-truncate"
import { notification } from "../../utils/notifications/Notifications"
import ModalTemplate from "../../utils/modal/ModalTemplate"

const Products: React.FC = () => {
    const history = useHistory()
    const [showModal, setShowModal] = useState<boolean>(false)
    const [idSelected, setIdSeletect] = useState<string>("")
    const [products, setProducts] = useState<Array<object>>([])

    useEffect(() => {
        allProducts()
        .then(res => setProducts(res.data.data))
    }, [])

    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
        }
    }, [showModal])

    const handlerDeleteProduct = () => {
        if (idSelected.length) {
            deleteProduct(idSelected)
            .then(res => {
                if (res.data.status === "Success") {
                    window.location.reload()
                } else {
                    notification("Une erreur est survenue", "error")
                }
            })
            .catch(() => notification("Une erreur est survenue", "error"))
        }
    }

    const handlerDeleteBtn = (id: string) => {
        if (!showModal) {
            setIdSeletect(id)
            setShowModal(true)
        }
    }
    
    return (
        <div>
            <div className="flex justify-between items-center mt-2 mb-4">
                <h1 className="text-xl font-medium dark:text-white">Liste de produits</h1>
                <div onClick={() => history.push('/products/add')} className="text-blue-500 cursor-pointer">
                    <p>Ajouter un produit</p>
                </div>
            </div>

            <div className="bg-white shadow-md rounded my-6">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">Nom</th>
                            <th className="py-3 text-left">Description</th>
                            <th className="py-3 text-center">Parent / Enfant</th>
                            <th className="py-3 px-6 text-center">Stock</th>
                            <th className="py-3 px-6 text-center">Prix</th>
                            <th className="py-3 px-6 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {(products.length === 0) && (
                            <tr>
                                <td className="py-3 px-6 text-left whitespace-nowrap">
                                    <p>Aucun produit trouvé</p>
                                </td>
                            </tr>
                        )}
                        {products.map((item: any, index: number) => {
                            return (
                                <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-3 px-6 text-left whitespace-nowrap">
                                        <Truncate width={180} ellipsis={<span>...</span>} className="font-bold">
                                            {item.name}
                                        </Truncate>
                                    </td>

                                    <td className="py-3 text-left whitespace-nowrap">
                                        <Truncate width={180} ellipsis={<span>...</span>}>
                                            {item.description}
                                        </Truncate>
                                    </td>

                                    <td className="py-3 text-center">
                                        <span className={`${item.parentId == null ? "bg-green-200 text-green-600" : "bg-orange-200 text-orange-600"} py-1 px-3 rounded-full text-xs`}>{item.parentId == null ? "Parent" : "Enfant"}</span>
                                    </td>

                                    <td className="py-3 px-6 text-center whitespace-nowrap">
                                        <p className="font-medium">{item.remainingStock}</p>
                                    </td>

                                    <td className="py-3 px-6 text-center whitespace-nowrap">
                                        <p className="font-medium">{item.price} €</p>
                                    </td>

                                    <td className="py-3 px-4 text-center w-10">
                                        <div className="flex item-center justify-center">
                                            <div onClick={() => history.push(`/products/${item.id}`)} className="w-6 mr-2 transform hover:text-blue-500 hover:scale-110 cursor-pointer">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                </svg>
                                            </div>
                                            <div onClick={() => handlerDeleteBtn(item.id)} className="w-6 mr-2 transform hover:text-red-500 hover:scale-110 cursor-pointer">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <ModalTemplate title="Supprimer le produit" show={showModal} showModal={setShowModal}>
                <>
                    <div className="relative pt-2 flex-auto">
                        {/* Header */}
                        <p className="py-5 text-lg dark:text-white">Êtes-vous sûr de vouloir supprimer ce produit ?</p>
                    </div>
                    {/* footer */}
                    <div className="items-center mb-2 flex">
                        <button className="bg-gray-300 cursor-pointer w-full mt-2 mr-2 rounded-md text-sm sm:text-md text-white font-bold py-3 mr-1 dark:bg-gray-900" onClick={() => { setShowModal(false); setIdSeletect("") }}>Annuler</button>
                        <button className="bg-red-500 cursor-pointer w-full mt-2 ml-2 rounded-md text-sm sm:text-md text-white font-bold py-3" onClick={() => handlerDeleteProduct()}>Supprimer</button>
                    </div>
                </>
            </ModalTemplate>
        </div>
    )
}

export default Products