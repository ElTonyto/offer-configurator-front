import React from "react"
import DatePicker from "react-date-picker"

type PropsType = {
    label?: string,
    classNameContainer?: string,
    className?: string,
    idContainer?: string,
    required?: boolean,
    format: string,
    value: Date,
    onChange?: CallableFunction
}

const DateInput: React.FC<PropsType> = ({ label, classNameContainer, className, idContainer, value, onChange, format, required }) => {
    const handleChange = (date: any) => {
        if(onChange !== undefined) onChange(date)
    }

    return (
        <div id={idContainer} className={classNameContainer}>
        {label && <label>{label}</label>}
            <DatePicker
                value={value}
                className={className} 
                onChange={(date: any) => handleChange(date)} 
                format={format} 
                required={required}
            />
        </div>
    )
}

export default DateInput
