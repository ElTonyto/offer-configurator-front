import React, { useState, useEffect} from "react"
import { Redirect } from 'react-router-dom'
import { Controller, useForm } from "react-hook-form"
import FormInput from "../../utils/input/FormInput"
import DateInput from '../../utils/input/DateInput'
import CheckBox from '../../utils/input/CheckBox'
import { oneOffer } from "../../api/ApiRequest"
import { notification } from "../../utils/notifications/Notifications"

type PropsType = {
    match: any
}

const EditOffer: React.FC<PropsType> = ({ match }) => {
    const [id] = useState<string>(match.params.id)
    const [redirect, setRedirect] = useState<boolean>(false)
    const { register, handleSubmit, clearErrors, setValue, control, errors } = useForm()

    useEffect(() => {
        if (id !== undefined) {
            oneOffer(id).then(res => {
                if (res.data.status === "success") {
                    setValue("product", res.data.data.product)
                    setValue("startAt", res.data.data.startAt)
                    setValue("endAt", res.data.data.endAt)
                    setValue("submittedBy", res.data.data.submittedBy)
                    setValue("price", res.data.data.price)
                    setValue("isActive", res.data.data.isActive)
                } else {
                    setRedirect(true)
                    notification("L'offre est introuvable", "error")
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
            <h2 className="text-xl my-2 font-medium">{id === undefined ? "Ajouter" : "Editer"} une offre</h2>

            {/* 
                TODO: 
                    Select ou Datalist pour selectionner un produit et garder que son id
             */}
            <FormInput
                classNameContainer="w-full mt-2"
                className="w-full bg-white my-0.5 p-2 text-base border border-gray-300 rounded-md font-medium outline-none"
                label="Produit"
                type="text"
                name="product"
                value=""
                placeholder="Ex: Machine à laver"
                register={register}
                rules={{ required: true }}
                error={errors.product}
            />
            {/* StartAt & EndAt */}
            <div className="flex flex-col sm:flex-row sm:space-x-2 mt-2">
                <Controller
                    name="startAt"
                    control={control}
                    defaultValue={new Date()}
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
                    defaultValue={new Date()}
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

            {/* SubmittedBy */}
            <FormInput
                classNameContainer="w-full mt-2"
                className="w-full bg-white my-0.5 p-2 text-base border border-gray-300 rounded-md font-medium outline-none"
                label="Créé par"
                type="text"
                name="submittedBy"
                value=""
                placeholder="Ex: Lucas Consejo"
                register={register}
                rules={{ required: true }}
                error={errors.submittedBy}
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
                rules={{ required: false }}
                error={errors.price}
            />

            {/* IsActive */}
            <CheckBox
                label="Activer"
                name="isActive"
                checked={true}
                register={register}
                rules={{ required: false }}
                error={errors.isActive}
            />

            <div className="flex justify-center mt-3">
                <button type="submit" className="bg-blue-500 text-white shadow-md font-medium px-4 py-2 rounded-md w-full md:w-2/12">
                    <p>{id === undefined ? "Ajouter" : "Enregistrer"}</p>
                </button>
            </div>
        </form>
    )
}

export default EditOffer