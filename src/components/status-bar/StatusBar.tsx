import React from 'react';
import classes from "./StatusBar.module.css";

export const StatusBar = ({error}: {error?: string}) => {

    return (
        <div className={classes.main}>
            {error}
        </div>
    );
};
