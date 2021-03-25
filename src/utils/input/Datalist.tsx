import React from 'react'
import { UseFormMethods, RegisterOptions } from 'react-hook-form'

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
    placeholder?: string,
    error?: string,
    disable?: boolean,
    autoFocus?: boolean,
    rules?: RegisterOptions,
}


const Datalist: React.FC<PropsType> = ({ id, idContainer, label, listName, data, name, className, classNameContainer, value, placeholder, error, disable, autoFocus, rules = {}, register}) => (
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
            disabled={disable}
            style={{ borderColor: error && "#f02849" }}
        />
        <datalist id={listName}>
            {
                data.map((item) => {
                    return <option value={item}>{item}</option>
                })
            }
        </datalist>
    </div>
)

export default Datalist