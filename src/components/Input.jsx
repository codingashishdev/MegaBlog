import { useId, forwardRef } from 'react'
import PropTypes from 'prop-types'

const InputField = forwardRef( function Input({
    label,
    type = "text",
    className = "",
    error = "",
    ...props
}, ref){
    const id = useId()
    return (
        <div className="w-full">
            {label && <label 
                className='inline-block mb-2 pl-1 text-sm font-medium text-gray-700'
                htmlFor={id}
            >{label}</label>}

            <input 
                type={type} 
                className={`px-4 py-2.5 rounded-lg bg-white text-gray-900 outline-none 
                    focus:bg-white duration-200 border w-full
                    transition-all
                    ${error 
                        ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200' 
                        : 'border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
                    }
                    hover:border-gray-400
                    placeholder:text-gray-400
                    disabled:bg-gray-100 disabled:cursor-not-allowed
                    ${className}`} 
                    ref={ref}
                    id={id}
                {...props}/>
            {error && (
                <p className="mt-1.5 text-sm text-red-600 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {error}
                </p>
            )}
        </div>
    )
})

InputField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    className: PropTypes.string,
    error: PropTypes.string,
}

InputField.displayName = 'Input'

export default InputField