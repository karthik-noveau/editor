import { FaGithub } from "react-icons/fa";

import styles from "./footer.module.css";

const CONTRIBUTERS = [
  {
    image: "https://avatars.githubusercontent.com/u/187260081?v=4",
    name: "Madhushree",
    githubUrl: "https://github.com/Madhugit15",
  },
  {
    image: "https://avatars.githubusercontent.com/u/82690268?v=4",
    name: "Karthik",
    githubUrl: "https://github.com/karthik-noveau",
  },
];

export const Footer = () => {
  return (
    <>
      <div className={styles.footerWrapper}>
        <div className={styles.footerContainer}>
          <a href="https://github.com/karthik-noveau/word-to-html-editor.git">
            <FaGithub className={styles.githubIcon} />
          </a>

          <h2>Contributers</h2>

          <div className={styles.profileContainer}>
            {CONTRIBUTERS.map(({ image, name, githubUrl }) => {
              return (
                <a href={githubUrl} className={styles.profileItem}>
                  <div className={styles.imageContainer}>
                    <img src={image} />
                  </div>
                  <p>{name}</p>
                </a>
              );
            })}
          </div>

          <p className={styles.copyRights}>
            Released under the MIT License Copyright ©{new Date().getFullYear()}{" "}
            Skynoveau Technology
          </p>
        </div>
      </div>
    </>
  );
};
