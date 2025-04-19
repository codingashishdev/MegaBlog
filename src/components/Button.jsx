import React from "react";

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
    ...props
}) {
    // Define variant styles
    const variants = {
        default: "bg-blue-600 hover:bg-blue-700 text-white",
        destructive: "bg-red-600 hover:bg-red-700 text-white",
        outline: "border border-gray-300 bg-transparent hover:bg-gray-100 text-gray-800",
        secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
        ghost: "bg-transparent hover:bg-gray-100 text-gray-800",
        link: "bg-transparent underline text-blue-600 hover:text-blue-800",
    };

    // Define size styles
    const sizes = {
        default: "px-4 py-2",
        sm: "px-2 py-1 text-sm",
        lg: "px-6 py-3 text-lg",
        icon: "p-2",
    };

    return (
        <button
            type={type}
            className={cn(
                // Base styles
                "inline-flex items-center justify-center rounded-lg font-medium transition-colors",
                "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                "disabled:opacity-50 disabled:pointer-events-none",
                // Apply variant
                variants[variant],
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
                    className="animate-spin -ml-1 mr-2 h-4 w-4" 
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

export default Button;
