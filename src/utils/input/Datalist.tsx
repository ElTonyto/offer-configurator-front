import React from 'react'
import { UseFormMethods, RegisterOptions, FieldError } from 'react-hook-form'

interface PropsType extends Partial<Pick<UseFormMethods, "register" | "errors">> {
    id?: string,
    idContainer?: string,
    label?: string,
    name: string,
    listName: string,
    data: string[],
    className?: string,
    classNameContainer?: string,
    value: string,
    onChange?: CallableFunction,
    placeholder?: string,
    error?: string | FieldError,
    disable?: boolean,
    autoFocus?: boolean,
    rules?: RegisterOptions,
}


const Datalist: React.FC<PropsType> = ({ id, idContainer, label, listName, data, name, className, classNameContainer, onChange, value, placeholder, error, disable, autoFocus, rules = {}, register}) => {
    const handleChange = (date: any) => {
        if(onChange !== undefined) onChange(date)
    }
    return (
        <div id={idContainer} className={classNameContainer}>
            {label && <label>{label}</label>}
            <input
                id={id}
                className={className}
                type="text"
                list={listName}
                name={name}
                defaultValue={value}
                autoFocus={autoFocus}
                placeholder={placeholder}
                ref={register && register(rules)}
                onChange={(e) => handleChange(e)}
                disabled={disable}
                style={{ borderColor: error && "#f02849" }}
            />
            <datalist id={listName}>
                {
                    data.map((item: any) => {
                        return <option key={item.id} label={item.name} value={item.id}/>
                    })
                }
            </datalist>
        </div>
    )
}

export default Datalist