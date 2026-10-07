import { LuArrowDown, LuArrowUp, LuCopyPlus, LuSettings2, LuTrash2 } from "react-icons/lu";
import styles from "./styles.module.css";

const InspectorPanel = ({ block, blockLabel, position, count, onChange, onMove, onDuplicate, onRequestRemove }) => {
    if (!block) {
        return (
            <aside className={styles.inspectorPanel} aria-labelledby="inspector-title">
                <div className={styles.inspectorHeader}><LuSettings2 aria-hidden="true" /><h2 id="inspector-title">Section settings</h2></div>
                <div className={styles.noSelection}>
                    <span><LuSettings2 aria-hidden="true" /></span>
                    <h3>Select a section</h3>
                    <p>Choose a block on the page canvas to edit its content and order.</p>
                </div>
            </aside>
        );
    }

    const canEditAction = ["header", "hero", "signup"].includes(block.type);

    return (
        <aside className={styles.inspectorPanel} aria-labelledby="inspector-title">
            <div className={styles.inspectorHeader}>
                <LuSettings2 aria-hidden="true" />
                <h2 id="inspector-title">Section settings</h2>
                <span>{String(position + 1).padStart(2, "0")}/{String(count).padStart(2, "0")}</span>
            </div>
            <div className={styles.selectedType}>
                <span className={styles.typeDot} />
                <span>{blockLabel}</span>
                <span className={styles.selectedId}>ID {String(block.id).padStart(3, "0")}</span>
            </div>
            <div className={styles.fieldGroup}>
                <label htmlFor="block-title">Heading</label>
                <input
                    id="block-title"
                    type="text"
                    maxLength={80}
                    value={block.title}
                    onChange={(event) => onChange("title", event.target.value)}
                />
                <span className={styles.characterCount}>{block.title.length}/80 characters</span>
            </div>
            <div className={styles.fieldGroup}>
                <label htmlFor="block-text">Supporting text</label>
                <textarea
                    id="block-text"
                    rows="4"
                    maxLength={200}
                    value={block.text}
                    onChange={(event) => onChange("text", event.target.value)}
                />
                <span className={styles.characterCount}>{block.text.length}/200 characters</span>
            </div>
            {canEditAction && (
                <div className={styles.fieldGroup}>
                    <label htmlFor="block-action">Button label</label>
                    <input
                        id="block-action"
                        type="text"
                        maxLength={32}
                        value={block.action}
                        onChange={(event) => onChange("action", event.target.value)}
                    />
                    <span className={styles.characterCount}>{block.action.length}/32 characters</span>
                </div>
            )}
            <div className={styles.orderControls}>
                <span>Section order</span>
                <div>
                    <button type="button" aria-label="Move section up" title="Move section up" disabled={position === 0} onClick={() => onMove(-1)}>
                        <LuArrowUp aria-hidden="true" />
                    </button>
                    <button type="button" aria-label="Move section down" title="Move section down" disabled={position === count - 1} onClick={() => onMove(1)}>
                        <LuArrowDown aria-hidden="true" />
                    </button>
                </div>
            </div>
            <div className={styles.actionButtons}>
                <button type="button" onClick={onDuplicate}><LuCopyPlus aria-hidden="true" /> Duplicate</button>
                <button type="button" onClick={onRequestRemove}><LuTrash2 aria-hidden="true" /> Remove</button>
            </div>
            <p className={styles.localNote}>Changes are saved in this browser automatically.</p>
        </aside>
    );
};

export default InspectorPanel;
