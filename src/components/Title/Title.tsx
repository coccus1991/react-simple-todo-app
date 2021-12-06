import React from "react";
import classes from "./Style.module.scss";

interface TitleProps {
    content: string;
}

export default (props: TitleProps) => {
    return (
        <h1 className={classes.title}>
            <span className={classes.element}>
                {props.content}
            </span>
        </h1>
    );
}
