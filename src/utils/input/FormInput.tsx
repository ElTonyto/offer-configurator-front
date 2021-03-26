import React from 'react'
import { UseFormMethods, RegisterOptions, FieldError } from 'react-hook-form'

interface PropsType extends Partial<Pick<UseFormMethods, "register" | "errors">> {
    id?: string,
    idContainer?: string,
    label?: string,
    type: "text" | "email" | "number" | "password",
    name: string,
    className?: string,
    classNameContainer?: string,
    value: string,
    step?: string,
    min?: string,
    placeholder?: string,
    error?: string | FieldError,
    disable?: boolean,
    autoFocus?: boolean,
    rules?: RegisterOptions,
}


const FormInput: React.FC<PropsType> = ({ id, idContainer, label, type, name, className, classNameContainer, value, step, min, placeholder, error, disable, autoFocus, rules = {}, register}) => (
    <div id={idContainer} className={classNameContainer}>
        {label && <label>{label}</label>}
        <input
            id={id}
            className={className}
            type={type}
            name={name}
            defaultValue={value}
            autoFocus={autoFocus}
            placeholder={placeholder}
            ref={register && register(rules)}
            disabled={disable}
            step={step}
            min={min}
            style={{ borderColor: error && "#f02849" }}
        />
    </div>
)

export default FormInput