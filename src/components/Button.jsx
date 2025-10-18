import PropTypes from 'prop-types'

// Function to combine class names
const cn = (...classes) => {
    return classes.filter(Boolean).join(" ");
};

function Button({
    children,
    type = 'button',
    variant = 'default',
    size = 'default',
    isLoading = false,
    className = '',
    bgColor,
    ...props
}) {
    // Define variant styles with improved gradients and shadows
    const variants = {
        default: "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md hover:shadow-lg",
        destructive: "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-md hover:shadow-lg",
        outline: "border-2 border-gray-300 bg-transparent hover:bg-gray-50 text-gray-800 hover:border-gray-400",
        secondary: "bg-gradient-to-r from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 text-gray-800 shadow-sm hover:shadow",
        ghost: "bg-transparent hover:bg-gray-100 text-gray-800",
        link: "bg-transparent underline text-blue-600 hover:text-blue-800",
        gradient: "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md hover:shadow-xl",
    };

    // Define size styles
    const sizes = {
        default: "px-5 py-2.5 text-sm",
        sm: "px-3 py-1.5 text-xs",
        lg: "px-7 py-3.5 text-base",
        icon: "p-2.5",
    };

    return (
        <button
            type={type}
            className={cn(
                // Base styles
                "inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200",
                "focus:outline-none focus:ring-2 focus:ring-offset-2",
                variant === 'default' || variant === 'gradient' ? "focus:ring-blue-500" : "focus:ring-gray-400",
                "disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed",
                "hover:cursor-pointer active:scale-95",
                // Apply variant or custom bgColor
                bgColor || variants[variant],
                // Apply size
                sizes[size],
                // Additional classes
                className
            )}
            disabled={props.disabled || isLoading}
            {...props}
        >
            {isLoading && (
                <svg 
                    className="animate-spin -ml-1 mr-2.5 h-4 w-4" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24"
                >
                    <circle 
                        className="opacity-25" 
                        cx="12" cy="12" r="10" 
                        stroke="currentColor" 
                        strokeWidth="4"
                    ></circle>
                    <path 
                        className="opacity-75" 
                        fill="currentColor" 
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                </svg>
            )}
            {children}
        </button>
    );
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    variant: PropTypes.oneOf(['default', 'destructive', 'outline', 'secondary', 'ghost', 'link', 'gradient']),
    size: PropTypes.oneOf(['default', 'sm', 'lg', 'icon']),
    isLoading: PropTypes.bool,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    bgColor: PropTypes.string,
}

export default Button;
