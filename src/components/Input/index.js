import React from 'react';

const Input = ({
    label,
    placeholder,
    disabled,
    name,
    type = "text", // Provide a default type
    className,
    value, // Use value for controlled components
    onChange, // Add an onChange prop
    Icon,
    defaultValue
    
    
    
}) => {
    return (
        <div className='relative'>
            <label htmlFor={name} className='block mb-2 text-[18px] font-medium text-black'>{label}</label>
            <input
            disabled={disabled}
                value={value} // Controlled component: use value
                onChange={onChange} // Ensure input changes are handled
                placeholder={placeholder}
                name={name}
                id={name}
                type={type}
                defaultValue={defaultValue}
                className={`outline-none bg-lightGray font-medium p-2.5 text-black placeholder:text-black ${className}`}
            />


            <div className='absolute right-3  top-12 transform  flex items-center'>
                {Icon}
            </div>
        </div>
    );
}

export default Input;
