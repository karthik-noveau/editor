import styles from "./header.module.css";

export const Header = () => {
  return (
    <>
      <div className={styles.headerContainer}>
        <h2>Skynoveau Editor</h2>
        <p>Transform Word into HTML</p>
      </div>
    </>
  );
};
