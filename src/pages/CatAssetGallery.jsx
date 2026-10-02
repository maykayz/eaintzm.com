import { useMemo, useState } from "react";
import catAssetGroups from "../data/catAssets";

const BIG_THRESHOLD = 300; // px — images bigger than this on either axis get shown full-size

const AssetCard = ({ item }) => {
    const [dims, setDims] = useState(null);

    const isBig = dims ? Math.max(dims.w, dims.h) > BIG_THRESHOLD : false;

    return (
        <div
            className={`flex flex-col gap-2 bg-[#221013] border border-stone-800 rounded-lg p-4 ${
                isBig ? "col-span-full" : ""
            }`}
        >
            <div
                className={`w-full flex items-center justify-center bg-[#2b1215] rounded ${
                    isBig ? "overflow-auto" : "overflow-x-auto overflow-y-hidden justify-start"
                }`}
            >
                <img
                    src={item.src}
                    alt={item.name}
                    loading="lazy"
                    onLoad={(e) => setDims({ w: e.target.naturalWidth, h: e.target.naturalHeight })}
                    className={isBig ? "w-auto shrink-0" : "h-32 md:h-40 w-auto shrink-0"}
                    style={{
                        imageRendering: "pixelated",
                        ...(isBig ? { maxHeight: "85vh", width: "auto" } : {}),
                    }}
                />
            </div>
            <span className="text-xs text-muted text-center break-all">{item.name}</span>
        </div>
    );
};

const CatAssetGallery = () => {
    const [query, setQuery] = useState("");

    const folders = useMemo(() => Object.keys(catAssetGroups).sort(), []);
    const totalCount = useMemo(
        () => Object.values(catAssetGroups).reduce((sum, items) => sum + items.length, 0),
        []
    );
    const q = query.trim().toLowerCase();

    return (
        <div className="min-h-screen bg-[#170B0D] text-[#EDE6DC] px-6 md:px-12 py-10 font-raleway">
            <h1 className="font-saunde text-2xl md:text-3xl text-tan uppercase mb-2">
                Cat Asset Browser
            </h1>
            <p className="text-muted text-sm mb-6">
                {totalCount} assets across {folders.length} folders. Filter by filename or folder name.
            </p>

            <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Filter (e.g. idle, room, bed)..."
                className="w-full max-w-md bg-[#221013] border border-stone-700 rounded-md px-4 py-2 text-sm mb-10 outline-none focus:border-maroon"
            />

            <div className="flex flex-col gap-14">
                {folders.map((folder) => {
                    const items = catAssetGroups[folder].filter((item) => {
                        if (!q) return true;
                        return item.name.toLowerCase().includes(q) || folder.toLowerCase().includes(q);
                    });
                    if (items.length === 0) return null;

                    return (
                        <div key={folder}>
                            <h2 className="font-raleway text-sm uppercase tracking-[0.1em] text-rose border-b border-stone-800 pb-2 mb-4">
                                {folder} <span className="text-muted normal-case tracking-normal">({items.length})</span>
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                {items.map((item) => (
                                    <AssetCard key={item.src} item={item} />
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CatAssetGallery;
