import React from 'react';
import styles from "../page.module.css";
import CodeIcon from '@mui/icons-material/Code';
import AppsIcon from '@mui/icons-material/Apps';

export default function Projects () {

    return (
        <>
         <div id="projects" className= { styles.sectionTitle }><AppsIcon fontSize="large"/>Projects</div>
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