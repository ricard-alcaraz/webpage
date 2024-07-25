import React from 'react';
import styles from "../page.module.css";

export default function Navigator () {

    return (
        <>
            <nav>
                <div className= { styles.wrapper } >
                    <ul className={ styles.navlinks }>
                        <li><a href="#" > Home </a></li >
                        <li><a href="#experience" > Experience </a></li >
                        <li><a href="#projects" > Projects </a></li >
                    </ul>
                </div>
            </nav>
        </>
    );
}