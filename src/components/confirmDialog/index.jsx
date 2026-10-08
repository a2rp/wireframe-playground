import { useEffect, useRef } from "react";
import { LuTriangleAlert, LuX } from "react-icons/lu";
import styles from "./styles.module.css";

const ConfirmDialog = ({ itemName, onCancel, onConfirm }) => {
    const dialogRef = useRef(null);
    const cancelRef = useRef(null);

    useEffect(() => {
        cancelRef.current?.focus();
        const handleKeys = (event) => {
            if (event.key === "Escape") {
                onCancel();
                return;
            }
            if (event.key !== "Tab" || !dialogRef.current) return;
            const buttons = [...dialogRef.current.querySelectorAll("button")];
            const first = buttons[0];
            const last = buttons[buttons.length - 1];
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        };
        document.addEventListener("keydown", handleKeys);
        return () => document.removeEventListener("keydown", handleKeys);
    }, [onCancel]);

    return (
        <div
            className={styles.dialogOverlay}
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) onCancel();
            }}
        >
            <section
                className={styles.confirmDialog}
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="remove-title"
                aria-describedby="remove-description"
            >
                <button
                    className={styles.dialogClose}
                    type="button"
                    aria-label="Close dialog"
                    onClick={onCancel}
                >
                    <LuX aria-hidden="true" />
                </button>
                <span className={styles.alertIcon}>
                    <LuTriangleAlert aria-hidden="true" />
                </span>
                <h2 id="remove-title">Remove this section?</h2>
                <p id="remove-description">
                    “{itemName}” will be removed from this wireframe. You can
                    add a new section from the library at any time.
                </p>
                <div className={styles.dialogActions}>
                    <button
                        ref={cancelRef}
                        className={styles.cancelButton}
                        type="button"
                        onClick={onCancel}
                    >
                        Keep section
                    </button>
                    <button
                        className={styles.confirmButton}
                        type="button"
                        onClick={onConfirm}
                    >
                        Remove section
                    </button>
                </div>
            </section>
        </div>
    );
};

export default ConfirmDialog;
