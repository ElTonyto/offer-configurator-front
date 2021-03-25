import React, { useState, useEffect } from "react"
import { useForm } from "react-hook-form";
import { Redirect } from 'react-router-dom'
import { oneProduct } from '../../api/ApiRequest'
import FormInput from "../../utils/input/FormInput"
import { notification } from "../../utils/notifications/Notifications"

type PropsType = {
    match: any
}

const EditProduct: React.FC<PropsType> = ({ match }) => {
    const [id] = useState<string>(match.params.id)
    const [redirect, setRedirect] = useState<boolean>(false)
    const { register, handleSubmit, clearErrors, setValue, control, errors } = useForm()

    useEffect(() => {
        if (id !== undefined) {
            oneProduct(id).then(res => {
                if (res.data.status === "success") {
                    setValue("name", res.data.data.name)
                    setValue("parentId", res.data.data.parentId)
                    setValue("description", res.data.data.description)
                    setValue("catalogId", res.data.data.catalogId)
                    setValue("price", res.data.data.price)
                    setValue("brand", res.data.data.brand)
                    setValue("remainingStock", res.data.data.remainingStock)
                    setValue("allOptions", res.data.data.allOptions)
                } else {
                    setRedirect(true)
                    notification("Le produit est introuvable", "error")
                }
            }).catch(err => {
                setRedirect(true)
                notification("Une erreur est survenue", "error")
            })
        }
    }, [id, setValue])

    if (redirect) {
        return (
            <Redirect to={{ pathname: "/" }} />
        )
    }

    const sendForm = (data: any) => {
        
    }

    return (
        <form onSubmit={handleSubmit(sendForm)}>
            <h2 className="text-xl my-2 font-medium">{id === undefined ? "Ajouter" : "Editer"} un produit</h2>

            <FormInput
                classNameContainer="w-full mt-2"
                className="w-full bg-white my-0.5 p-2 text-base border border-gray-300 rounded-md font-medium outline-none"
                label="Nom du produit"
                type="text"
                name="name"
                value=""
                placeholder="Ex: Iphone 13"
                register={register}
                rules={{ required: true }}
                error={errors.name}
            />

            <FormInput
                classNameContainer="w-full mt-2"
                className="w-full bg-white my-0.5 p-2 text-base border border-gray-300 rounded-md font-medium outline-none"
                label="Description"
                type="text"
                name="description"
                value=""
                placeholder=""
                register={register}
                rules={{ required: true }}
                error={errors.description}
            />

            <FormInput
                classNameContainer="w-full mt-2"
                className="w-full bg-white my-0.5 p-2 text-base border border-gray-300 rounded-md font-medium outline-none"
                label="Catégorie"
                type="text"
                name="categorie"
                value=""
                placeholder=""
                register={register}
                rules={{ required: true }}
                error={errors.categorie}
            />

            {/* Price */}
            <FormInput
                classNameContainer="w-full mt-2"
                className="w-full bg-white my-0.5 p-2 text-base border border-gray-300 rounded-md font-medium outline-none"
                label="Prix"
                type="number"
                name="price"
                value=""
                placeholder="Ex: 12"
                register={register}
                rules={{ required: true }}
                error={errors.price}
            />

            <FormInput
                classNameContainer="w-full mt-2"
                className="w-full bg-white my-0.5 p-2 text-base border border-gray-300 rounded-md font-medium outline-none"
                label="Marque"
                type="text"
                name="brand"
                value=""
                placeholder="Ex: Apple"
                register={register}
                rules={{ required: true }}
                error={errors.brand}
            />

            <FormInput
                classNameContainer="w-full mt-2"
                className="w-full bg-white my-0.5 p-2 text-base border border-gray-300 rounded-md font-medium outline-none"
                label="Stock"
                type="number"
                name="remainingStock"
                value=""
                placeholder="Ex: 25000"
                register={register}
                rules={{ required: true }}
                error={errors.remainingStock}
            />

            <FormInput
                classNameContainer="w-full mt-2"
                className="w-full bg-white my-0.5 p-2 text-base border border-gray-300 rounded-md font-medium outline-none"
                label="Options"
                type="text"
                name="remainingStock"
                value=""
                placeholder=""
                register={register}
                rules={{ required: true }}
                error={errors.options}
            />

            <FormInput
                classNameContainer="w-full mt-2"
                className="w-full bg-white my-0.5 p-2 text-base border border-gray-300 rounded-md font-medium outline-none"
                label="Toutes les options"
                type="text"
                name="allOptions"
                value=""
                placeholder=""
                register={register}
                rules={{ required: true }}
                error={errors.allOptions}
            />

            <div className="flex justify-center my-3">
                <button type="submit" className="bg-blue-500 text-white shadow-md font-medium px-4 py-2 rounded-md w-full md:w-2/12">
                    <p>{id === undefined ? "Ajouter" : "Enregistrer"}</p>
                </button>
            </div>
        </form>
    )
}

export default EditProduct