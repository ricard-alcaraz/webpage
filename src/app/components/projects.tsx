import React from 'react';
import styles from "../page.module.css";

export default function Projects () {

    return (
        <>
            <div className={styles.nft}>
          <div className={styles.mainCard}>
            <img className={styles.tokenImage} src="https://images.unsplash.com/photo-1621075160523-b936ad96132a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="NFT" />
            <h2>Proyecto1</h2>
            <p className={styles.description}>Breve descripcion del proyecto</p>
            <hr />
            <div className={styles.creator}>
              <p><ins>Tecnologias</ins> Python</p>
            </div>
          </div>
        </div>
        </>
    );
}