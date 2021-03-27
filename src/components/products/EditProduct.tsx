import React, { useState, useEffect } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { Redirect } from 'react-router-dom'
import { oneProduct, allCatalogs, insertProduct, updateProduct, allParentProducts } from '../../api/ApiRequest';
import CheckBox from "../../utils/input/CheckBox"
import Datalist from "../../utils/input/Datalist"
import FormInput from "../../utils/input/FormInput"
import { notification } from "../../utils/notifications/Notifications"
import Option from "./Option"
import SelectOption from './SelectOption'

type PropsType = {
    match: any
}

const EditProduct: React.FC<PropsType> = ({ match }) => {
    const [id] = useState<string>(match.params.id)
    const [isParent, setIsParent] = useState<boolean>(true)
    const [redirect, setRedirect] = useState<boolean>(false)
    const [products, setProducts] = useState<Array<any>>([])
    const [selectedProduct, setSelectedProduct] = useState<any>(null)
    const [categories, setCategories] = useState<Array<any>>([])
    const { register, handleSubmit, setValue, control, errors, reset } = useForm({
        defaultValues: {
            name: "",
            parentId: "",
            description: "",
            catalogId: "",
            price: "",
            brand: "",
            remainingStock: "",
            allOptions: [{
                name: "",
                option: ""
            }]
        }
    })

    const { fields, append, remove } = useFieldArray(
        {
          control,
          name: "allOptions"
        }
    )

    useEffect(() => {
        reset({ 
            name: "",
            parentId: "",
            description: "",
            catalogId: "",
            price: "",
            brand: "",
            remainingStock: "",
            allOptions: [{
                name: "",
                option: ""
            }]
        })
    }, [reset])
  
  
    useEffect(() => {
        if (id !== undefined) {
            oneProduct(id).then(res => {
                if (res.data.status === "Success") {
                    setValue("name", res.data.data.name)
                    setValue("parentId", res.data.data.parentId)
                    setValue("description", res.data.data.description)
                    setValue("catalogId", res.data.data.catalogId)
                    setValue("price", res.data.data.price)
                    setValue("brand", res.data.data.brand)
                    setValue("remainingStock", res.data.data.remainingStock)
                    if (res.data.data.allOptions !== null) {
                        res.data.data.allOptions.forEach((item: any, index: number) => {
                            if (index === 0) {
                                setValue(`allOptions[${index}].name`, item.name)
                                setValue(`allOptions[${index}].option`, item.option)
                            } else {
                                append({})
                                setValue(`allOptions[${index}].name`, item.name)
                                setValue(`allOptions[${index}].option`, item.option)
                            }
                        })
                    }
                    if (res.data.data.options !== null) {
                        res.data.data.options.forEach((item: any, index: number) => {
                            if (index === 0) {
                                setValue(`allOptions[${index}].name`, item.name)
                                setValue(`allOptions[${index}].option`, item.option)
                            } else {
                                append({})
                                setValue(`allOptions[${index}].name`, item.name)
                                setValue(`allOptions[${index}].option`, item.option)
                            }
                        })
                    }
                    if (res.data.data.parentId !== null) {
                        setIsParent(false)
                        setSelectedProduct(res.data.data)
                    } else {
                        setIsParent(true)
                        setSelectedProduct(null)
                    }
                } else {
                    setRedirect(true)
                }
            }).catch(err => {
                setRedirect(true)
            })
        }
    }, [id, setValue, append])

    useEffect(() => {
        if (!isParent) {
            allParentProducts()
            .then(res => {
                setProducts(res.data.data)
            })
        } else {
            allCatalogs()
            .then(res => {
                setCategories(res.data.data)
            })
        }
    }, [isParent])

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

    useEffect(() => {
        if (selectedProduct !== null) {
            if (selectedProduct.allOptions !== null) {
                selectedProduct.allOptions.forEach((item: any, index: number) => {
                    if (index === 0) {
                        setValue(`allOptions[${index}].name`, item.name)
                        setValue(`allOptions[${index}].option`, item.option)
                    } else {
                        append({})
                        setValue(`allOptions[${index}].name`, item.name)
                        setValue(`allOptions[${index}].option`, item.option)
                    }
                })
            }
            if (selectedProduct.options !== null) {
                selectedProduct.options.forEach((item: any, index: number) => {
                    if (index === 0) {
                        setValue(`allOptions[${index}].name`, item.name)
                        setValue(`allOptions[${index}].option`, item.option)
                    } else {
                        append({})
                        setValue(`allOptions[${index}].name`, item.name)
                        setValue(`allOptions[${index}].option`, item.option)
                    }
                })
            }
            setValue("name", selectedProduct.name)
            setValue("description", selectedProduct.description)
            setValue("catalogId", selectedProduct.catalogId)
            setValue("price", selectedProduct.price)
            setValue("brand", selectedProduct.brand)
            setValue("remainingStock", selectedProduct.remainingStock);
            (id !== undefined) && setValue("parentId", selectedProduct.parentId)
        } else {
            setValue("allOptions", [{ name: "", option: "" }])
            setValue("name", "")
            setValue("description", "")
            setValue("catalogId","")
            setValue("price", "")
            setValue("brand", "")
            setValue("remainingStock", "")
        }
    }, [selectedProduct, setValue, id, append])

    if (redirect) {
        return (
            <Redirect to={{ pathname: "/not-found" }} />
        )
    }

    const sendForm = (data: any) => {
        data.remainingStock = Number(data.remainingStock)
        if (isParent) {
            data.parentId = null
            data.options = null
            delete data.isParent
        } else {
            data.allOptions = null
            data.catalogId = selectedProduct.catalogId
            data.brand = selectedProduct.brand
            delete data.isParent
        }
        if (id === undefined) {
            insertProduct(data)
            .then(() => { 
                reset({
                    name: "",
                    parentId: "",
                    description: "",
                    catalogId: "",
                    price: "",
                    brand: "",
                    remainingStock: "",
                    allOptions: [{
                        name: "",
                        option: ""
                    }]
                })
                setSelectedProduct(null)
                notification("Le produit a bien été ajouté", "success")
            })
            .catch((err) => {
                if (err.data.message === "Catalog not found") {
                    notification("Le catalogue est introuvable", "error")
                } else if (err.data.message === "Options should be null as your product is a parent") {
                    notification("Les options doivent être nulles car votre produit est un parent", "error")
                } else if (err.data.message === "AllOptions should be null as your product is not a parent") {
                    notification("AllOptions doit être nul car votre produit n'est pas un parent", "error")
                } else if (err.data.message === "Parent product not found") {
                    notification("Le product est introuvable", "error")
                } else {
                    notification("Une erreur est survenue", "error")
                }
            })
        } else {
            updateProduct(id, data)
            .then(() => {
                notification("Le produit a bien été enregistré", "success")
            })
            .catch((err) => {
                if (err.data.message === "Catalog not found") {
                    notification("Le catalogue est introuvable", "error")
                } else if (err.data.message === "Options should be null as your product is a parent") {
                    notification("Les options doivent être nulles car votre produit est un parent", "error")
                } else if (err.data.message === "AllOptions should be null as your product is not a parent") {
                    notification("AllOptions doit être nul car votre produit n'est pas un parent", "error")
                } else if (err.data.message === "Parent product not found") {
                    notification("Le product est introuvable", "error")
                } else {
                    notification("Une erreur est survenue", "error")
                }
            })
        }
    }

    return (
        <form onSubmit={handleSubmit(sendForm)}>
            <div className="flex items-center justify-between">
                <h2 className="text-xl my-2 font-medium">{id === undefined ? "Ajouter" : "Editer"} un produit</h2>
                
                {/* Parent or Child */}
                {id === undefined ? (
                    <CheckBox
                        label="Parent"
                        name="isParent"
                        checked={isParent}
                        onChange={() => {setIsParent(!isParent); setSelectedProduct(null)}}
                        register={register}
                        rules={{ required: false }}
                        error={""}
                    />
                ) : null }
            </div>

            {/* Parent  */}
            {!isParent ? (
                <Datalist
                    data={products}
                    classNameContainer="w-full mt-2"
                    className="w-full bg-white my-0.5 p-2 text-base border border-gray-300 rounded-md font-medium outline-none"
                    label="Produit parent"
                    listName="products"
                    name="parentId"
                    value=""
                    onChange={(e: any) => handleSelectedProduct(e)}
                    register={register}
                    rules={{ required: true }}
                    error={errors.parentId}
                />
            ) : null }

            {(!isParent && selectedProduct !== null) || (isParent && selectedProduct == null) ? (
                <div>
                    {/* Product Name */}
                    <FormInput
                        classNameContainer="w-full mt-2"
                        className="w-full bg-white my-0.5 p-2 text-base border border-gray-300 rounded-md font-medium outline-none"
                        label="Nom du produit"
                        type="text"
                        name="name"
                        value=""
                        placeholder="Ex: Meuble en bois"
                        register={register}
                        rules={{ required: true }}
                        error={errors.name}
                    />

                    {/* Description */}
                    <div className="w-full mt-2">
                        <label>Description</label>
                        <textarea
                            className="w-full bg-white my-0.5 p-2 text-base border border-gray-300 rounded-md font-medium outline-none"
                            name="description"
                            defaultValue=""
                            placeholder=""
                            ref={register({ required: true })}
                            style={{ borderColor: errors.description && "#f02849" }}
                        />
                    </div>

                    {/* Category */}
                    {isParent ? (
                        <Datalist
                            data={categories}
                            classNameContainer="w-full mt-2"
                            className="w-full bg-white my-0.5 p-2 text-base border border-gray-300 rounded-md font-medium outline-none"
                            label="Catalogue"
                            listName="catalog"
                            name="catalogId"
                            value=""
                            register={register}
                            rules={{ required: true }}
                            error={errors.catalogId}
                        />
                    ) : null }

                    {/* Brand */}
                    {isParent ? (
                        <FormInput
                            classNameContainer="w-full mt-2"
                            className="w-full bg-white my-0.5 p-2 text-base border border-gray-300 rounded-md font-medium outline-none"
                            label="Marque"
                            type="text"
                            name="brand"
                            value=""
                            placeholder="Ex: Ikéa"
                            register={register}
                            rules={{ required: true }}
                            error={errors.brand}
                        />
                    ) : null }

                    {/* Price */}
                    <FormInput
                        classNameContainer="w-full mt-2"
                        className="w-full bg-white my-0.5 p-2 text-base border border-gray-300 rounded-md font-medium outline-none"
                        label="Prix €"
                        type="number"
                        name="price"
                        value=""
                        placeholder="Ex: 12"
                        register={register}
                        min={"0"}
                        rules={{ required: true }}
                        error={errors.price}
                    />

                    {/* Stock */}
                    <FormInput
                        classNameContainer="w-full mt-2"
                        className="w-full bg-white my-0.5 p-2 text-base border border-gray-300 rounded-md font-medium outline-none"
                        label="Stock"
                        type="number"
                        name="remainingStock"
                        value=""
                        placeholder="Ex: 25000"
                        register={register}
                        min={"0"}
                        step={"1"}
                        rules={{ required: true }}
                        error={errors.remainingStock}
                    />

                    <p className="mt-2">Options</p>
                    {fields.map((item, index) => {
                        if (isParent) {
                            return (
                                <Option key={`${item.id}`} index={index} size={fields.length} register={register} errors={errors} remove={remove}/>
                            )
                        }
                        if (selectedProduct.allOptions !== null || selectedProduct.options !== null) {
                            return (
                                <SelectOption 
                                    key={`${item.id}`} 
                                    item={(selectedProduct.allOptions !== null ? selectedProduct.allOptions : selectedProduct.options)} 
                                    index={index} 
                                    register={register} 
                                    errors={errors}
                                />
                            )
                        }
                        return null
                    })}

                    {isParent ? (
                        <div onClick={() => append({
                            name: "",
                            option: "",
                            })} 
                            className="bg-blue-500 text-white text-center font-medium px-4 py-2 mb-3 shadow-md rounded-md w-full sm:bg-white  sm:text-left sm:px-0 sm:py-0 sm:mb-0 sm:shadow-none sm:ml-1 sm:text-blue-500 cursor-pointer"
                        >
                            <p>Ajouter une option</p>
                        </div>
                    ) : null }
                </div>
            ) : null }

            <div className="flex justify-center my-3">
                <button type="submit" className="bg-blue-500 text-white shadow-md font-medium px-4 py-2 rounded-md w-full md:w-2/12">
                    <p>{id === undefined ? "Ajouter" : "Enregistrer"}</p>
                </button>
            </div>
        </form>
    )
}

export default EditProduct