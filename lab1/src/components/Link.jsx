import React from 'react'
const Link = ({href, target, children, ...props}) => {
    return (
        <a href={href} target={target} rel="" {...props}>
            {children}
        </a>
    )
}

export default Link