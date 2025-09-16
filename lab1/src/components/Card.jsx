import React from "react";
import Typography from "./TypographyComponent";

const Card = ({ children, ...props}) => {
    return(
        <Typography variant="div" {...props}>
            {children}
        </Typography>
    )
}

export default Card;