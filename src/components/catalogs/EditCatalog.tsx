import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import FormInput from "../../utils/input/FormInput"
import { oneCatalog, updateCatalog, insertCatalog } from '../../api/ApiRequest'
import { notification } from '../../utils/notifications/Notifications'
import { Redirect } from 'react-router-dom'
import { capitalize } from '../../utils/Utils'

type PropsType = {
    match: any
}

const EditCatalog: React.FC<PropsType> = ({ match }) => {
    const [id] = useState<string>(match.params.id)
    const [redirect, setRedirect] = useState<boolean>(false)
    const { register, handleSubmit, setValue, errors } = useForm()

    useEffect(() => {
        if (id !== undefined) {
            oneCatalog(id).then(res => setValue("name", res.data.data.name))
            .catch(() => {
                setRedirect(true)
            })
        }
    }, [id, setValue])

    if (redirect) {
        return (
            <Redirect to={{ pathname: "/not-found" }} />
        )
    }

    const sendForm = (data: any) => {
        const name = capitalize(data.name)
        if (id === undefined) {
            insertCatalog(name)
            .then(() => {
                setValue("name", "")
                notification("Le catalogue a bien été ajouté", "success")
            })
            .catch(err => {
                if (err.data.type === "CONFLICT") {
                    notification("Le catalogue existe déjà", "error")
                } else {
                    notification("Une erreur est survenue", "error")
                }
            })
        } else {
            updateCatalog(id, name)
            .then(() => notification("Catalogue enregistré", "success"))
            .catch(err => {
                if (err.data.type === "CONFLICT") {
                    notification("Le catalogue existe déjà", "error")
                } else {
                    notification("Une erreur est survenue", "error")
                }
            })
        }
    }
  
    return (
        <form onSubmit={handleSubmit(sendForm)}>
            <h2 className="text-xl my-2 font-medium">{id === undefined ? "Ajouter" : "Editer"} un catalogue</h2>
            <FormInput
                classNameContainer="w-full"
                className="w-full bg-white my-0.5 p-2 text-base border border-gray-300 rounded-md font-medium outline-none"
                label="Nom du catalogue"
                type="text"
                name="name"
                value=""
                placeholder="Ex: Meuble"
                register={register}
                rules={{ required: true }}
                error={errors.name}
            />
            <div className="flex justify-center mt-3">
                <button type="submit" className="bg-blue-500 text-white shadow-md font-medium px-4 py-2 rounded-md w-full md:w-2/12">
                    <p>{id === undefined ? "Ajouter" : "Enregistrer"}</p>
                </button>
            </div>
        </form>
    )
}

export default EditCatalog