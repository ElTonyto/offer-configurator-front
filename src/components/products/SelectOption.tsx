import React from "react"
import FormInput from "../../utils/input/FormInput"
import SelectInput from "../../utils/input/SelectInput"

type PropsType = {
    index: number,
    register: any,
    errors: any,
    item: Array<any>
}

const SelectOption: React.FC<PropsType> = ({ item, index, register, errors}) => {
    const options = item[index].option.split(",")
    const select = [{ value: "", label: "--Choisissez une option--", disabled: true, hidden: true }]
    for(let i = 0; i < options.length; i++) {
        select.push({
            value: options[i],
            label: options[i],
            disabled: false,
            hidden: false
        })
    }
    return (
        <div className="flex items-center space-x-2">
            <FormInput
                classNameContainer="w-full"
                className="w-full bg-white my-0.5 p-2 text-base border border-gray-300 rounded-md font-medium outline-none"
                label="Nom"
                type="text"
                name={`options[${index}].name`}
                value={item[index].name}
                placeholder="Ex: Couleur"
                disable={false}
                register={register}
                rules={{ required: true }}
                error={(errors?.[`allOptions`]?.length > 0) ? errors?.["allOptions"][`${index}`]?.name : false}
            />
            <SelectInput
                name={`options[${index}].option`}
                className="w-full bg-white my-0.5 p-2 text-base border border-gray-300 rounded-md font-medium outline-none"
                label="Option"
                defaultValue=""
                options={select}
                error={(errors?.[`options`]?.length > 0) ? errors?.["options"][`${index}`]?.option : false}
                register={register}
                rules={{ required: true }}
            />
        </div>
    )
}

export default SelectOption
