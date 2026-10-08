import { LuImage, LuMousePointer2 } from "react-icons/lu";
import styles from "./styles.module.css";

const WireframeCanvas = ({ blocks, selectedId, viewport, onSelect }) => {
    const viewportWidth = { desktop: 1180, tablet: 768, mobile: 390 }[viewport];

    return (
        <section
            className={styles.wireframeCanvas}
            aria-label="Wireframe preview canvas"
        >
            <div className={styles.canvasHeader}>
                <div>
                    <span className={styles.canvasTitle}>Page canvas</span>
                    <span className={styles.canvasMeta}>
                        {blocks.length} sections
                    </span>
                </div>
                <span className={styles.canvasHint}>
                    <LuMousePointer2 aria-hidden="true" /> Select a section to
                    edit
                </span>
            </div>
            <div className={styles.canvasScroll}>
                <div
                    className={styles.pageFrame}
                    style={{ width: `min(${viewportWidth}px, 100%)` }}
                >
                    {blocks.length === 0 ? (
                        <div className={styles.emptyCanvas}>
                            <span>
                                <LuImage aria-hidden="true" />
                            </span>
                            <h2>Your page starts here</h2>
                            <p>
                                Add a section from the library to start shaping
                                your wireframe.
                            </p>
                        </div>
                    ) : (
                        blocks.map((block, index) => {
                            const isSelected = block.id === selectedId;
                            const features = block.text
                                .split(/\s{2,}/)
                                .filter(Boolean);
                            const selectBlock = () => onSelect(block.id);

                            return (
                                <section
                                    className={`${styles.wireframeBlock} ${styles[block.type] ?? ""} ${isSelected ? styles.selected : ""}`}
                                    key={block.id}
                                    aria-label={`${block.title || "Untitled section"}, section ${index + 1}`}
                                    aria-pressed={isSelected}
                                    role="button"
                                    tabIndex={0}
                                    onClick={selectBlock}
                                    onKeyDown={(event) => {
                                        if (
                                            event.key === "Enter" ||
                                            event.key === " "
                                        ) {
                                            event.preventDefault();
                                            selectBlock();
                                        }
                                    }}
                                >
                                    {block.type === "header" && (
                                        <div className={styles.navPreview}>
                                            <strong>{block.title}</strong>
                                            <span>{block.text}</span>
                                            <b>{block.action || "Button"}</b>
                                        </div>
                                    )}
                                    {block.type === "hero" && (
                                        <div className={styles.heroPreview}>
                                            <span className={styles.imageBadge}>
                                                <LuImage aria-hidden="true" />{" "}
                                                FEATURE IMAGE
                                            </span>
                                            <span
                                                className={styles.blockOverline}
                                            >
                                                INTRODUCTION / 01
                                            </span>
                                            <h2>
                                                {block.title ||
                                                    "A clear headline for your idea"}
                                            </h2>
                                            <p>
                                                {block.text ||
                                                    "A short sentence to explain what makes this page worth exploring."}
                                            </p>
                                            <span className={styles.wireButton}>
                                                {block.action || "Explore"}
                                            </span>
                                        </div>
                                    )}
                                    {block.type === "text" && (
                                        <div className={styles.textPreview}>
                                            <span
                                                className={styles.blockOverline}
                                            >
                                                SECTION /{" "}
                                                {String(index + 1).padStart(
                                                    2,
                                                    "0",
                                                )}
                                            </span>
                                            <h2>
                                                {block.title ||
                                                    "A section heading"}
                                            </h2>
                                            <p>
                                                {block.text ||
                                                    "A short paragraph gives this idea a little more room."}
                                            </p>
                                        </div>
                                    )}
                                    {block.type === "image" && (
                                        <div className={styles.imagePreview}>
                                            <div
                                                className={
                                                    styles.imagePlaceholder
                                                }
                                            >
                                                <LuImage aria-hidden="true" />
                                                <span>VISUAL PLACEHOLDER</span>
                                            </div>
                                            <div>
                                                <h2>
                                                    {block.title ||
                                                        "A visual story"}
                                                </h2>
                                                <p>
                                                    {block.text ||
                                                        "Add a caption that connects the image to the page."}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                    {block.type === "cards" && (
                                        <div className={styles.cardsPreview}>
                                            <span
                                                className={styles.blockOverline}
                                            >
                                                WHAT MAKES IT WORK
                                            </span>
                                            <h2>
                                                {block.title ||
                                                    "A few useful highlights"}
                                            </h2>
                                            <div className={styles.cardGrid}>
                                                {features
                                                    .slice(0, 3)
                                                    .map(
                                                        (
                                                            feature,
                                                            cardIndex,
                                                        ) => (
                                                            <div
                                                                className={
                                                                    styles.featureCard
                                                                }
                                                                key={`${feature}-${cardIndex}`}
                                                            >
                                                                <span
                                                                    className={
                                                                        styles.cardNumber
                                                                    }
                                                                >
                                                                    0
                                                                    {cardIndex +
                                                                        1}
                                                                </span>
                                                                <span>
                                                                    {feature}
                                                                </span>
                                                            </div>
                                                        ),
                                                    )}
                                            </div>
                                        </div>
                                    )}
                                    {block.type === "quote" && (
                                        <div className={styles.quotePreview}>
                                            <span className={styles.quoteMark}>
                                                “
                                            </span>
                                            <blockquote>
                                                {block.text ||
                                                    "A simple thought can say a lot when it has room to breathe."}
                                            </blockquote>
                                            <span
                                                className={styles.quoteAuthor}
                                            >
                                                {block.title ||
                                                    "A happy customer"}
                                            </span>
                                        </div>
                                    )}
                                    {block.type === "signup" && (
                                        <div className={styles.signupPreview}>
                                            <div>
                                                <span
                                                    className={
                                                        styles.blockOverline
                                                    }
                                                >
                                                    STAY IN THE LOOP
                                                </span>
                                                <h2>
                                                    {block.title ||
                                                        "A note worth opening"}
                                                </h2>
                                                <p>
                                                    {block.text ||
                                                        "A little more context for the invitation."}
                                                </p>
                                            </div>
                                            <div className={styles.fakeForm}>
                                                <span>you@example.com</span>
                                                <b>
                                                    {block.action ||
                                                        "Subscribe"}
                                                </b>
                                            </div>
                                        </div>
                                    )}
                                    {block.type === "footer" && (
                                        <div className={styles.footerPreview}>
                                            <strong>
                                                {block.title || "Your brand"}
                                            </strong>
                                            <span>
                                                {block.text ||
                                                    "A short note to close the page."}
                                            </span>
                                            <span>
                                                {block.action ||
                                                    "About   Contact   Privacy"}
                                            </span>
                                        </div>
                                    )}
                                </section>
                            );
                        })
                    )}
                    {blocks.length > 0 && (
                        <span className={styles.pageEnd}>END OF PAGE</span>
                    )}
                </div>
            </div>
        </section>
    );
};

export default WireframeCanvas;
