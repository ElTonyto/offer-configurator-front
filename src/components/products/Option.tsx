import React from "react"
import FormInput from "../../utils/input/FormInput"

type PropsType = {
    size: number,
    index: number,
    register: any,
    errors: any,
    remove: any,
}

const Option: React.FC<PropsType> = ({ index, register, size, errors, remove}) => {
    const renderRemoveBtn = () => {
        if (index > 0 || size > 1) {
            return (
                <div onClick={() => remove(index)}  className="cursor-pointer mt-5 bg-red-500 px-2 py-0.5 rounded">
                    <p className="text-white font-bold">X</p>
                </div>
            )
        }
    }

    return (
        <div className="flex items-center space-x-2">
            <FormInput
                classNameContainer="w-full"
                className="w-full bg-white my-0.5 p-2 text-base border border-gray-300 rounded-md font-medium outline-none"
                label="Nom"
                type="text"
                name={`allOptions[${index}].name`}
                value=""
                placeholder="Ex: Couleur"
                register={register}
                rules={{ required: true }}
                error={(errors?.[`allOptions`]?.length > 0) ? errors?.["allOptions"][`${index}`]?.name : false}
            />
            <FormInput
                classNameContainer="w-full"
                className="w-full bg-white my-0.5 p-2 text-base border border-gray-300 rounded-md font-medium outline-none"
                label="Option"
                type="text"
                name={`allOptions[${index}].option`}
                value=""
                placeholder="Ex: Rouge, Vert, Bleu"
                register={register}
                rules={{ required: true }}
                error={(errors?.[`allOptions`]?.length > 0) ? errors?.["allOptions"][`${index}`]?.option : false}
            />
            {renderRemoveBtn()}
        </div>
    )
}

export default Option
