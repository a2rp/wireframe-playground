import { FaGithub } from "react-icons/fa6";
import { LuCheck, LuPenTool } from "react-icons/lu";
import styles from "./styles.module.css";

const SiteHeader = () => (
    <header className={styles.siteHeader}>
        <div className={styles.headerContent}>
            <a
                className={styles.brand}
                href="#workspace"
                aria-label="Sketchframe home"
            >
                <span className={styles.brandMark}>
                    <LuPenTool aria-hidden="true" />
                </span>
                <span>sketchframe</span>
            </a>
            <div className={styles.documentInfo}>
                <span className={styles.projectDot} />
                <span>Untitled page</span>
                <span className={styles.saveStatus}>
                    <LuCheck aria-hidden="true" /> Saved in this browser
                </span>
            </div>
            <a
                className={styles.repositoryLink}
                href="https://github.com/a2rp/wireframe-playground"
                target="_blank"
                rel="noreferrer"
            >
                <FaGithub aria-hidden="true" />
                <span>Repository</span>
            </a>
        </div>
    </header>
);

export default SiteHeader;
