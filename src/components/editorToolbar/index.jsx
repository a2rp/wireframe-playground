import { LuDownload, LuMonitor, LuSmartphone, LuTablet } from "react-icons/lu";
import styles from "./styles.module.css";

const viewports = [
    { id: "desktop", label: "Desktop", width: 1180, Icon: LuMonitor },
    { id: "tablet", label: "Tablet", width: 768, Icon: LuTablet },
    { id: "mobile", label: "Mobile", width: 390, Icon: LuSmartphone },
];

const EditorToolbar = ({
    viewport,
    onViewportChange,
    sectionCount,
    onExport,
}) => (
    <div className={styles.editorToolbar} aria-label="Canvas display settings">
        <div className={styles.documentLabel}>
            <span className={styles.pageIcon}>
                <LuMonitor aria-hidden="true" />
            </span>
            <span>
                <strong>Landing page</strong>
                <small>{sectionCount} sections</small>
            </span>
        </div>
        <div
            className={styles.viewportPicker}
            role="group"
            aria-label="Preview width"
        >
            {viewports.map(({ id, label, width, Icon }) => (
                <button
                    className={viewport === id ? styles.viewportActive : ""}
                    key={id}
                    type="button"
                    aria-label={`${label} preview, ${width} pixels wide`}
                    aria-pressed={viewport === id}
                    onClick={() => onViewportChange(id)}
                >
                    <Icon aria-hidden="true" />
                    <span>{label}</span>
                </button>
            ))}
        </div>
        <button
            className={styles.exportButton}
            type="button"
            onClick={onExport}
        >
            <LuDownload aria-hidden="true" />
            <span>Export JSON</span>
        </button>
    </div>
);

export default EditorToolbar;
