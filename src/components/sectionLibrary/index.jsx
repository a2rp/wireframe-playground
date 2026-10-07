import { useState } from "react";
import { LuAlignLeft, LuGrid2X2, LuImage, LuMail, LuMenu, LuMessageSquare, LuPanelBottom, LuPlus, LuSearch, LuSparkles, LuType } from "react-icons/lu";
import styles from "./styles.module.css";

const iconByType = {
    header: LuMenu,
    hero: LuSparkles,
    text: LuAlignLeft,
    image: LuImage,
    cards: LuGrid2X2,
    quote: LuMessageSquare,
    signup: LuMail,
    footer: LuPanelBottom,
};

const SectionLibrary = ({ blocks, onAdd }) => {
    const [query, setQuery] = useState("");
    const filteredBlocks = blocks.filter((block) => `${block.label} ${block.description}`.toLowerCase().includes(query.trim().toLowerCase()));

    return (
        <aside className={styles.sectionLibrary} aria-labelledby="library-title">
            <div className={styles.panelHeader}>
                <div>
                    <h2 id="library-title">Add a section</h2>
                    <p>Start with a simple building block.</p>
                </div>
                <span className={styles.count}>{filteredBlocks.length.toString().padStart(2, "0")}</span>
            </div>
            <label className={styles.searchField} htmlFor="section-search">
                <LuSearch aria-hidden="true" />
                <input
                    id="section-search"
                    type="search"
                    placeholder="Find a section"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                />
            </label>
            <div className={styles.blockList}>
                {filteredBlocks.map((block) => {
                    const Icon = iconByType[block.type] ?? LuType;
                    return (
                        <button className={styles.blockOption} key={block.type} type="button" onClick={() => onAdd(block.type)}>
                            <span className={styles.blockIcon}><Icon aria-hidden="true" /></span>
                            <span className={styles.blockCopy}>
                                <span className={styles.blockName}>{block.label}</span>
                                <span className={styles.blockDescription}>{block.description}</span>
                            </span>
                            <LuPlus className={styles.addIcon} aria-hidden="true" />
                        </button>
                    );
                })}
                {filteredBlocks.length === 0 && <p className={styles.emptyMessage}>No sections match “{query}”.</p>}
            </div>
            <div className={styles.libraryNote}>
                <span className={styles.noteIcon}><LuImage aria-hidden="true" /></span>
                <p>Image blocks are placeholders. Add your own visuals after exporting the plan.</p>
            </div>
        </aside>
    );
};

export default SectionLibrary;
