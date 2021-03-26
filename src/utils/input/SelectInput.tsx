import React from "react"
import { UseFormMethods, RegisterOptions } from "react-hook-form"

interface SelectProps extends Partial<Pick<UseFormMethods, "register" | "errors">> {
    id?: string
    label?: string
    defaultValue?: string
    name: string
    className?: string
    onChange?: any
    options: Array<{ value: string, label: string, disabled?: boolean, hidden?: boolean }>
    rules?: RegisterOptions
    error?: string
}

export const SelectInput: React.FC<SelectProps> = ({ id, label, defaultValue, name, className, onChange, options, register, rules, error }) => {
    const handleChange = (date: any) => {
        if (onChange !== undefined) onChange(date)
    }

    const selectRender = () => (
        <select defaultValue={defaultValue} name={name} className={className} onChange={e => handleChange(e)} ref={register && register(rules)} style={{ borderColor: error && "#e94e6d" }}>
            {options.map((item: { value: string, label: string, disabled?: boolean, hidden?: boolean }) => {
                return (
                    <option key={item.value} value={item.value} disabled={item.disabled} hidden={item.hidden}>{item.label}</option>
                )
            })}
        </select>
    )

    const labelRender = () => <p style={{ color: error && "#f02849" }}>{label}</p>

    const renderWithLabel = () => (
        <label htmlFor={id} className="w-full">
            {labelRender()}
            {selectRender()}
        </label>
    )

    return label ? renderWithLabel() : selectRender()
}

export default SelectInput