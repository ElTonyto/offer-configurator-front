import React, { useState, useEffect} from "react"
import { Redirect } from 'react-router-dom'
import { Controller, useForm } from "react-hook-form"
import FormInput from "../../utils/input/FormInput"
import DateInput from '../../utils/input/DateInput'
import CheckBox from '../../utils/input/CheckBox'
import { oneOffer, allChildProducts, oneProduct, insertOffer, updateOffer } from '../../api/ApiRequest';
import { notification } from "../../utils/notifications/Notifications"
import Datalist from "../../utils/input/Datalist"

type PropsType = {
    match: any
}

const EditOffer: React.FC<PropsType> = ({ match }) => {
    const [id] = useState<string>(match.params.id)
    const [products, setProducts] = useState<Array<any>>([])
    const [startAt, setStartAt] = useState<Date>(new Date())
    const [endAt, setEndAt] = useState<Date>(new Date())
    const [selectedProduct, setSelectedProduct] = useState<any>(null)
    const [isActive, setIsActive] = useState<boolean>(true)
    const [redirect, setRedirect] = useState<boolean>(false)
    const { register, handleSubmit, clearErrors, setValue, control, errors, reset } = useForm()

    useEffect(() => {
        if (id !== undefined) {
            oneOffer(id).then(res => {
                if (res.data.status === "Success") {
                    setSelectedProduct(res.data.data.product)
                    setStartAt(new Date(res.data.data.startAt))
                    setEndAt(new Date(res.data.data.endAt))
                    setValue("product", res.data.data.product)
                    setValue("productId", res.data.data.product.id)
                    setValue("startAt", new Date(res.data.data.startAt))
                    setValue("endAt", new Date(res.data.data.endAt))
                    setValue("submittedBy", res.data.data.submittedBy)
                    setValue("price", res.data.data.price)
                    setValue("isActive", res.data.data.isActive)
                } else {
                    setRedirect(true)
                }
            }).catch(err => {
                setRedirect(true)
            })
        } else {
            allChildProducts()
            .then(res => {
                setProducts(res.data.data)
            })
        }
    }, [id, setValue])

    const handleSelectedProduct = (e: any) => {
        if (e.target.value.length > 0) {
            oneProduct(e.target.value)
            .then(res => {
                if (res.data.data.length === 0) {
                    setSelectedProduct(null)
                } else {
                    setSelectedProduct(res.data.data)
                }
            })
            .catch(err => {
                setSelectedProduct(null)
            })
        } else {
            setSelectedProduct(null)
        }
    }

    if (redirect) {
        return (
            <Redirect to={{ pathname: "/not-found" }} />
        )
    }

    const sendForm = (data: any) => {
        data.product = selectedProduct
        if (data.price === "") {
            data.price = selectedProduct.price
        }
        if (id === undefined) {
            insertOffer(data)
            .then(() => { 
                reset()
                setSelectedProduct(null)
                notification("L'offre a bien été ajouté", "success")
            })
            .catch((err) => {
                if (err.data.message === "Product not found") {
                    notification("Le produit est introuvable", "error")
                } else {
                    notification("Une erreur est survenue", "error")
                }
            })
        } else {
            updateOffer(id, data)
            .then(() => {
                notification("L'offre a bien été enregistré", "success")
            })
            .catch((err) => {
                if (err.data.message === "Product not found") {
                    notification("Le produit est introuvable", "error")
                } else {
                    notification("Une erreur est survenue", "error")
                }
            })
        }
    }
  
    return (
        <form onSubmit={handleSubmit(sendForm)}>
            <div className="flex items-center justify-between">
                <h2 className="text-xl my-2 font-medium">{id === undefined ? "Ajouter" : "Editer"} une offre</h2>
                {/* IsActive */}
                <CheckBox
                    label="Activer"
                    name="isActive"
                    checked={isActive}
                    onChange={() => setIsActive(!isActive)}
                    register={register}
                    rules={{ required: false }}
                    error={errors.isActive}
                />
            </div>

            <Datalist
                data={products}
                classNameContainer="w-full mt-2"
                className="w-full bg-white my-0.5 p-2 text-base border border-gray-300 rounded-md font-medium outline-none"
                label="Produit"
                listName="products"
                name="productId"
                value=""
                onChange={(e: any) => handleSelectedProduct(e)}
                register={register}
                rules={{ required: true }}
                error={errors.productId}
            />

            {selectedProduct !== null ? (
                <>
                    <div className="flex flex-col sm:flex-row sm:space-x-2 mt-2">
                        <Controller
                            name="startAt"
                            control={control}
                            defaultValue={startAt}
                            rules={{ required: true }}
                            render={({ onChange, value }) => (
                                <DateInput
                                    label="A partir du"
                                    classNameContainer="w-full flex flex-col justify-center"
                                    className={`w-full bg-white my-1 p-2 items-center text-base border ${errors.startAt ? " border-red-500" : " border-gray-300"} rounded-md font-medium outline-none cursor-pointer`}
                                    value={value}
                                    onChange={(e: any) => { onChange(e); clearErrors("startAt")}}
                                    format="dd/MM/yyyy"
                                />
                            )}
                        />
                        <Controller
                            name="endAt"
                            control={control}
                            defaultValue={endAt}
                            rules={{ required: true }}
                            render={({ onChange, value }) => (
                                <DateInput
                                    label="Jusqu'au"
                                    classNameContainer="w-full flex flex-col justify-center"
                                    className={`w-full bg-white my-1 p-2 items-center text-base border ${errors.endAt ? " border-red-500" : " border-gray-300"} rounded-md font-medium outline-none cursor-pointer`}
                                    value={value}
                                    onChange={(e: any) => { onChange(e); clearErrors("endAt")}}
                                    format="dd/MM/yyyy"
                                />
                            )}
                        />
                    </div>

                    <FormInput
                        classNameContainer="w-full mt-2"
                        className="w-full bg-white my-0.5 p-2 text-base border border-gray-300 rounded-md font-medium outline-none"
                        label="Créé par"
                        type="text"
                        name="submittedBy"
                        value=""
                        placeholder="Ex: IKEA"
                        register={register}
                        rules={{ required: true }}
                        error={errors.submittedBy}
                    />

                    <FormInput
                        classNameContainer="w-full mt-2"
                        className="w-full bg-white my-0.5 p-2 text-base border border-gray-300 rounded-md font-medium outline-none"
                        label="Prix"
                        type="number"
                        name="price"
                        value=""
                        min="0"
                        step="0.01"
                        placeholder="Ex: 12"
                        register={register}
                        rules={{ required: false }}
                        error={errors.price}
                    />
                </>
            ) : null}

            <div className="flex justify-center mt-3">
                <button type="submit" className="bg-blue-500 text-white shadow-md font-medium px-4 py-2 rounded-md w-full md:w-2/12">
                    <p>{id === undefined ? "Ajouter" : "Enregistrer"}</p>
                </button>
            </div>
        </form>
    )
}

export default EditOffer