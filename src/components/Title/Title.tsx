import React from "react";
import classes from "./Style.module.css";

interface TitleProps {
    content: string;
}

export default (props: TitleProps) => {
    return (
        <h1 className={classes.title}>{props.content}</h1>
    );
}
