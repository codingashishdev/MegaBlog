import React, { Children } from 'react'

function Container({ children }) {
    return <div className='w-full max-w-7xl mx-auto px-4 py-6 bg-white/60 backdrop-blur-sm rounded-lg shadow-sm'>{children}</div>;
}

export default Container
