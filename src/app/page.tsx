import Image from "next/image";
import styles from "./page.module.css";
import Navigator from "./components/navigator";
import About from "./components/about";
import Projects from "./components/projects";
import Experience from "./components/experiencia";
import Footer from "./components/footer";


export default function Home() {
  return (

    <main className={styles.main}>
      <Navigator></Navigator>
      <div className={styles.content}>
        <About></About>
        <Experience></Experience>
        <Projects></Projects>
      </div>
      <Footer></Footer>
    </main>
  );
}
/*
<div className={styles.grid}>
<a
  href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
  className={styles.card}
  target="_blank"
  rel="noopener noreferrer"
>
  <h2>
    Docs <span>-&gt;</span>
  </h2>
  <p>Find in-depth information about Next.js features and API.</p>
</a>

<a
  href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
  className={styles.card}
  target="_blank"
  rel="noopener noreferrer"
>
  <h2>
    Learn <span>-&gt;</span>
  </h2>
  <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
</a>

<a
  href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
  className={styles.card}
  target="_blank"
  rel="noopener noreferrer"
>
  <h2>
    Templates <span>-&gt;</span>
  </h2>
  <p>Explore starter templates for Next.js.</p>
</a>

<a
  href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
  className={styles.card}
  target="_blank"
  rel="noopener noreferrer"
>
  <h2>
    Deploy <span>-&gt;</span>
  </h2>
  <p>
    Instantly deploy your Next.js site to a shareable URL with Vercel.
  </p>
</a>
</div> 
*/