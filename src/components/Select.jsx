import React, { useId } from "react";

function Select({ options = [], label, className = "", ...props }, ref) {
    const id = useId;
    return (
        <>
            <div className="w-full">
                {label && (
                    <label className={`${className}`} htmlFor={id}>
                    </label>
                )}
                {
                    <select
                        {...props}
                        ref={ref}
                        id={id}
                        className={`${className} bg-white w-full pl-2`}
                    >
                        {options?.map((op) => (
                            <option key={op} value={op} className="bg-white w-full">
                                {op}
                            </option>
                        ))}
                    </select>
                }
            </div>
        </>
    );
}

export default React.forwardRef(Select);
