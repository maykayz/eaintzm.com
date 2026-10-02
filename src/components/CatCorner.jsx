import { useEffect, useRef, useState } from "react";
import Chilling from "../assets/images/cat/Chilling.png";
import Idle from "../assets/images/cat/Idle.png";
import Excited from "../assets/images/cat/Excited.png";
import Sleep from "../assets/images/cat/Sleep.png";
import Happy from "../assets/images/cat/Happy.png";
import Box1 from "../assets/images/cat/Box1.png";
import Box2 from "../assets/images/cat/Box2.png";
import Running from "../assets/images/cat/Running.png";
import Ball from "../assets/images/cat/Ball.png";
import FoodBowl from "../assets/images/cat/FoodBowl.png";
import Dead from "../assets/images/cat/Dead.png";
import Tickle from "../assets/images/cat/Tickle.png";
import CatMenuPanel from "../assets/images/cat/CatMenuPanelBlank.png";
import BubbleYellow from "../assets/images/cat/BubbleYellow.png";
import CatBedBrown from "../assets/images/cat/CatBedBrown.png";
// import BubbleOrange from "../assets/images/cat/BubbleOrange.png"; // alternate bubble skin, kept in assets

const THOUGHTS = {
    chilling: ["Vibing.", "Comfy.", "Hmm..."],
    idle: ["Boring...", "What now?", "Watching."],
    excited: ["Ooh!", "Pick one!"],
    eating: ["Nom nom!", "So good!"],
    sleeping: ["Dreaming...", "Zzz..."],
    box: ["A box!", "So cozy."],
    boxSettled: ["My box.", "Cozy..."],
    running: ["Catch it!", "Wheee!"],
    sleepyTransition: ["Sleepy...", "Mmm..."],
    sleepingFlat: ["Zzz...", "..."],
    default: ["Hi!"],
};

const MENU_ITEMS = [
    { label: "Play", top: 30.4, bottom: 40.9, action: "play" },
    { label: "Eat", top: 47.8, bottom: 58.3, action: "eat" },
    { label: "Sleep", top: 65.2, bottom: 75.7, action: "sleep" },
];

const SPRITES = {
    chilling: { src: Chilling, frames: 8, fps: 6, frameSize: 64 },
    idle: { src: Idle, frames: 6, fps: 6, frameSize: 64 },
    excited: { src: Excited, frames: 3, fps: 8, frameSize: 64 },
    eating: { src: Happy, frames: 10, fps: 8, frameSize: 64, displaySize: 115 },
    sleeping: { src: Sleep, frames: 4, fps: 2, frameSize: 64, displaySize: 110 },
    box: { src: Box1, frames: 12, fps: 6, frameSize: 64, loop: false },
    boxSettled: { src: Box2, frames: 10, fps: 6, frameSize: 64 },
    running: { src: Running, frames: 6, fps: 7, frameSize: 64 },
    sleepyTransition: { src: Tickle, frames: 4, fps: 6, frameSize: 64 },
    sleepingFlat: { src: Dead, frames: 1, fps: 1, frameSize: 64 },
};
const PANEL_SCALE = 2.6;
const PANEL_W = 85 * PANEL_SCALE;
const PANEL_H = 115 * PANEL_SCALE;
const THOUGHT_INTERVAL = 9000;
const THOUGHT_VISIBLE_DURATION = 3500;

const EAT_DURATION = 3000;
const SLEEPY_DURATION = 2000;
const IDLE_POSE_INTERVAL = 8000;
const THROW_DURATION = 900;
const RUN_OUT_DURATION = 2200;
const PICKUP_PAUSE = 700;
const RUN_BACK_DURATION = 2200;

const CatCorner = ({ visible = true }) => {
    const [frame, setFrame] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);
    const [action, setAction] = useState(null);
    const [idlePose, setIdlePose] = useState("chilling");
    const [catX, setCatX] = useState(0);
    const [catDuration, setCatDuration] = useState(0);
    const [facingLeft, setFacingLeft] = useState(false);
    const [ballVisible, setBallVisible] = useState(false);
    const [ballX, setBallX] = useState(0);
    const [ballDuration, setBallDuration] = useState(0);
    const [thought, setThought] = useState(null);
    const timerRef = useRef(null);
    const thoughtHideRef = useRef(null);

    const mood = menuOpen ? "excited" : action === "playing" ? "running" : action || idlePose;
    const { src, frames, fps, frameSize, loop = true, displaySize = 134 } = SPRITES[mood];

    useEffect(() => {
        setFrame(0);

        if (loop === false) {
            let f = 0;
            const id = setInterval(() => {
                f += 1;
                if (f >= frames) {
                    clearInterval(id);
                    setAction("boxSettled");
                    return;
                }
                setFrame(f);
            }, 1000 / fps);
            return () => clearInterval(id);
        }

        const id = setInterval(() => {
            setFrame((f) => (f + 1) % frames);
        }, 1000 / fps);
        return () => clearInterval(id);
    }, [frames, fps, loop]);

    useEffect(() => {
        const id = setInterval(() => {
            setIdlePose((p) => (p === "chilling" ? "idle" : "chilling"));
        }, IDLE_POSE_INTERVAL);
        return () => clearInterval(id);
    }, []);

    useEffect(() => () => clearTimeout(timerRef.current), []);

    useEffect(() => {
        if (menuOpen) return undefined;

        const pool = THOUGHTS[mood] || THOUGHTS.default;

        const show = () => {
            const text = pool[Math.floor(Math.random() * pool.length)];
            setThought(text);
            clearTimeout(thoughtHideRef.current);
            thoughtHideRef.current = setTimeout(() => setThought(null), THOUGHT_VISIBLE_DURATION);
        };

        show();
        const id = setInterval(show, THOUGHT_INTERVAL);
        return () => {
            clearInterval(id);
            clearTimeout(thoughtHideRef.current);
        };
    }, [mood, menuOpen]);

    const handleMenuAction = (menuAction) => {
        setMenuOpen(false);
        clearTimeout(timerRef.current);

        if (menuAction === "eat") {
            setAction("eating");
            timerRef.current = setTimeout(() => {
                setAction("sleepyTransition");
                timerRef.current = setTimeout(() => {
                    setAction("box");
                }, SLEEPY_DURATION);
            }, EAT_DURATION);
        } else if (menuAction === "sleep") {
            setAction("sleeping");
        } else if (menuAction === "play") {
            const distance = Math.max(300, window.innerWidth - 220);

            setAction("playing");
            setBallVisible(true);
            setBallDuration(0);
            setBallX(0);

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setBallDuration(THROW_DURATION);
                    setBallX(-distance);
                });
            });

            timerRef.current = setTimeout(() => {
                setFacingLeft(true);
                setCatDuration(RUN_OUT_DURATION);
                setCatX(-distance);

                timerRef.current = setTimeout(() => {
                    timerRef.current = setTimeout(() => {
                        setFacingLeft(false);
                        setCatDuration(RUN_BACK_DURATION);
                        setCatX(0);
                        setBallDuration(RUN_BACK_DURATION);
                        setBallX(0);

                        timerRef.current = setTimeout(() => {
                            setAction("box");
                            setBallVisible(false);
                        }, RUN_BACK_DURATION + 50);
                    }, PICKUP_PAUSE);
                }, RUN_OUT_DURATION);
            }, 150);
        } else {
            setAction(null);
        }
    };

    if (!visible) return null;

    return (
        <div
            className="fixed right-6 z-50 cursor-auto"
            style={{ bottom: "124px" }}
            onMouseEnter={() => window.dispatchEvent(new Event("cursor:hide"))}
            onMouseLeave={() => window.dispatchEvent(new Event("cursor:show"))}
        >
            {menuOpen && (
                <div
                    className="absolute bottom-full right-0 mb-2"
                    style={{ width: PANEL_W, height: PANEL_H }}
                >
                    <img
                        src={CatMenuPanel}
                        alt="Cat menu"
                        className="w-full h-full"
                        style={{ imageRendering: "pixelated" }}
                    />
                    {MENU_ITEMS.map((item) => (
                        <button
                            key={item.label}
                            type="button"
                            onClick={() => handleMenuAction(item.action)}
                            className="absolute flex items-center justify-center font-pixel uppercase text-white text-[0.6rem]"
                            style={{
                                left: "16%",
                                width: "68%",
                                top: `${item.top}%`,
                                height: `${item.bottom - item.top}%`,
                            }}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            )}

            {thought && !menuOpen && (
                <div
                    className="absolute bottom-full right-0 mb-4 mr-2 pointer-events-none"
                    style={{ width: "133px", aspectRatio: "1056 / 304", transform: "translateY(50px)" }}
                >
                    <img
                        src={BubbleYellow}
                        alt=""
                        className="w-full h-full"
                        style={{ imageRendering: "pixelated" }}
                    />
                    <div
                        className="absolute flex items-center font-pixel text-[0.6rem] leading-snug whitespace-nowrap text-[#3a2a24]"
                        style={{ left: "28%", top: 0, bottom: 0, width: "64%", paddingLeft: "8px" }}
                    >
                        {thought}
                    </div>
                </div>
            )}

            {ballVisible && (
                <div
                    className="absolute bottom-10 right-12 w-6 h-6 pointer-events-none"
                    style={{
                        transform: `translateX(${ballX}px)`,
                        transition: `transform ${ballDuration}ms ease-out`,
                        imageRendering: "pixelated",
                    }}
                >
                    <img src={Ball} alt="" className="w-full h-full" />
                </div>
            )}

            {action === "eating" && !menuOpen && (
                <div
                    className="absolute w-10 h-10 pointer-events-none"
                    style={{ right: "75px", top: "117px", zIndex: 10, imageRendering: "pixelated" }}
                >
                    <img src={FoodBowl} alt="" className="w-full h-full object-contain" />
                </div>
            )}

            {action === "sleeping" && !menuOpen && (
                <div
                    className="absolute w-56 h-56 pointer-events-none"
                    style={{ right: "-34px", bottom: "-73px", zIndex: 0, imageRendering: "pixelated" }}
                >
                    <img src={CatBedBrown} alt="" className="w-full h-full object-contain" />
                </div>
            )}

            <div
                className="relative"
                style={{
                    zIndex: 10,
                    transform: `translateX(${catX}px)`,
                    transition: `transform ${catDuration}ms linear`,
                }}
            >
                <button
                    type="button"
                    onClick={() => setMenuOpen((v) => !v)}
                    aria-label="Open cat menu"
                    className="w-36 h-36 flex items-center justify-center overflow-hidden"
                >
                    <div
                        style={{
                            width: frameSize,
                            height: frameSize,
                            backgroundImage: `url(${src})`,
                            backgroundPosition: `-${frame * frameSize}px 0`,
                            imageRendering: "pixelated",
                            transform: `scale(${displaySize / frameSize}) scaleX(${facingLeft ? -1 : 1})`,
                        }}
                    />
                </button>
            </div>
        </div>
    );
};

export default CatCorner;
