
import React from "react"
import { RegisterOptions, UseFormMethods } from "react-hook-form"

interface PropsType extends Partial<Pick<UseFormMethods, "register" | "errors">> {
    label?: string,
    name: string,
    checked: boolean,
    rules?: RegisterOptions,
    error: string,
}

const CheckBox: React.FC<PropsType> = ({ label, checked, name, error, rules = {}, register }) => {
    return (
        <div className="flex items-center space-x-2 mt-2">
            {label && <label>{label}</label>}
            <input 
                type="checkbox" 
                className="form-checkbox h-5 w-5 text-blue-600 cursor-pointer" 
                name={name}
                defaultChecked={checked}
                ref={register && register(rules)}
                style={{ borderColor: error && "#f02849" }}
            />
        </div>
    )
}

export default CheckBox
