import React, { useState } from "react";

const Card = ({heading, subheading}) => {
    return (
        <div className="Card">
            <h2>{heading}</h2>
            <h3>{subheading}</h3>
        </div>
    )
}

export default Card;