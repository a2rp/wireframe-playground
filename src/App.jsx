import { useCallback, useEffect, useState } from "react";
import BackToTop from "./components/backToTop/index.jsx";
import ConfirmDialog from "./components/confirmDialog/index.jsx";
import EditorToolbar from "./components/editorToolbar/index.jsx";
import InspectorPanel from "./components/inspectorPanel/index.jsx";
import SectionLibrary from "./components/sectionLibrary/index.jsx";
import SiteFooter from "./components/siteFooter/index.jsx";
import SiteHeader from "./components/siteHeader/index.jsx";
import WireframeCanvas from "./components/wireframeCanvas/index.jsx";
import styles from "./App.module.css";
import { createBlock, blockLibrary, starterBlocks } from "./data/wireframeBlocks.js";

const storageKey = "sketchframe-wireframe-v1";

const loadBlocks = () => {
    try {
        const saved = JSON.parse(window.localStorage.getItem(storageKey));
        if (Array.isArray(saved?.blocks) && saved.blocks.every((block) => Number.isInteger(block.id) && typeof block.type === "string")) {
            return saved.blocks;
        }
    } catch {
        return starterBlocks;
    }
    return starterBlocks;
};

const App = () => {
    const [blocks, setBlocks] = useState(loadBlocks);
    const [selectedId, setSelectedId] = useState(() => blocks.find((block) => block.type === "hero")?.id ?? blocks[0]?.id ?? null);
    const [viewport, setViewport] = useState("desktop");
    const [removeCandidate, setRemoveCandidate] = useState(null);
    const [exportMessage, setExportMessage] = useState("");
    const selectedBlock = blocks.find((block) => block.id === selectedId) ?? null;
    const selectedPosition = blocks.findIndex((block) => block.id === selectedId);
    const blockLabel = blockLibrary.find((block) => block.type === selectedBlock?.type)?.label ?? "Section";
    const nextId = blocks.reduce((largest, block) => Math.max(largest, block.id), 0) + 1;

    useEffect(() => {
        try {
            window.localStorage.setItem(storageKey, JSON.stringify({ blocks }));
        } catch {
            return;
        }
    }, [blocks]);

    const handleAdd = (type) => {
        const newBlock = createBlock(type, nextId);
        setBlocks((current) => [...current, newBlock]);
        setSelectedId(newBlock.id);
    };

    const handleChange = (key, value) => {
        setBlocks((current) => current.map((block) => block.id === selectedId ? { ...block, [key]: value } : block));
    };

    const handleMove = (direction) => {
        if (selectedPosition < 0) return;
        const newPosition = selectedPosition + direction;
        if (newPosition < 0 || newPosition >= blocks.length) return;
        const nextBlocks = [...blocks];
        [nextBlocks[selectedPosition], nextBlocks[newPosition]] = [nextBlocks[newPosition], nextBlocks[selectedPosition]];
        setBlocks(nextBlocks);
    };

    const handleDuplicate = () => {
        if (!selectedBlock) return;
        const duplicate = { ...selectedBlock, id: nextId, title: `${selectedBlock.title.slice(0, 73)} copy` };
        const nextBlocks = [...blocks];
        nextBlocks.splice(selectedPosition + 1, 0, duplicate);
        setBlocks(nextBlocks);
        setSelectedId(duplicate.id);
    };

    const cancelRemove = useCallback(() => setRemoveCandidate(null), []);
    const confirmRemove = () => {
        if (!removeCandidate) return;
        const removeIndex = blocks.findIndex((block) => block.id === removeCandidate.id);
        const nextBlocks = blocks.filter((block) => block.id !== removeCandidate.id);
        setBlocks(nextBlocks);
        setSelectedId(nextBlocks[Math.min(removeIndex, nextBlocks.length - 1)]?.id ?? null);
        setRemoveCandidate(null);
    };

    const exportWireframe = () => {
        const fileData = {
            name: "Untitled page",
            viewport,
            exportedAt: new Date().toISOString(),
            sections: blocks,
        };
        const file = new Blob([JSON.stringify(fileData, null, 2)], { type: "application/json" });
        const downloadUrl = URL.createObjectURL(file);
        const downloadLink = document.createElement("a");
        downloadLink.href = downloadUrl;
        downloadLink.download = "sketchframe-wireframe.json";
        downloadLink.click();
        window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
        setExportMessage("Wireframe JSON downloaded.");
        window.setTimeout(() => setExportMessage(""), 2500);
    };

    return (
        <div className={styles.appShell}>
            <SiteHeader />
            <main className={styles.workspace} id="workspace">
                <EditorToolbar
                    viewport={viewport}
                    onViewportChange={setViewport}
                    sectionCount={blocks.length}
                    onExport={exportWireframe}
                />
                <div className={styles.editorLayout}>
                    <SectionLibrary blocks={blockLibrary} onAdd={handleAdd} />
                    <div className={styles.canvasColumn}>
                        <WireframeCanvas blocks={blocks} selectedId={selectedId} viewport={viewport} onSelect={setSelectedId} />
                        <p className={styles.exportMessage} aria-live="polite">{exportMessage}</p>
                    </div>
                    <InspectorPanel
                        block={selectedBlock}
                        blockLabel={blockLabel}
                        position={selectedPosition}
                        count={blocks.length}
                        onChange={handleChange}
                        onMove={handleMove}
                        onDuplicate={handleDuplicate}
                        onRequestRemove={() => setRemoveCandidate(selectedBlock)}
                    />
                </div>
            </main>
            <SiteFooter />
            <BackToTop />
            {removeCandidate && (
                <ConfirmDialog
                    itemName={removeCandidate.title || blockLabel}
                    onCancel={cancelRemove}
                    onConfirm={confirmRemove}
                />
            )}
        </div>
    );
};

export default App;
