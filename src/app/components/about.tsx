import React from 'react';
import styles from "../page.module.css";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function About () {

    return (
        <>
        
            <div className={styles.name}>Ricard Alcaraz Mancebo</div>
            <div className={styles.contact}>
                <a href="https://github.com/ricard-alcaraz" className={styles.contactBut}><GitHubIcon fontSize="large"/></a>
                
                <a href="https://www.linkedin.com/in/ricard-alcaraz-mancebo/" className={styles.contactBut}><LinkedInIcon fontSize="large"/></a>
            </div>
            
            <div  className={styles.about}><p>Hi! My name is Ricard and I&apos;m from Barcelona. I&apos;m a computer engineer, and I also I have a Master of Science degree 
                in Economics. Not many engineers do a Master&apos;s degree in economics, but I was interested in economics and also in data analysis, so I thought it could be interesting to do.  </p>
                <p>I have worked on a R&D project about Blockchain and as a Developer on that project. Currently, I&apos;m working as a Consultant and Data Engineer.</p>
                <p>So I&apos;m not afraid of learning about new topics, technologies, or anything that I can find interesting.</p>
                </div>
            
        </>
    );
}