import React from 'react';
import classes from "./StatusBar.module.css";

const StatusBar = ({error}: {error?: string}) => {

    return (
        <div className={classes.main}>
            {error}
        </div>
    );
};

export default StatusBar;