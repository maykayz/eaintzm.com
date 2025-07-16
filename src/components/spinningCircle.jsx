import {useRef, useEffect} from "react";
import {gsap} from "gsap";
import ScrollCircle from "../assets/images/ScrollCircle.svg";
import FlowerImage from "../assets/images/Flower.svg";

const SpinningCircle = () => {
  const flowerRef = useRef(null);
  const circleRef = useRef(null);

  useEffect(() => {
    gsap.to(flowerRef.current, {rotation: 3600, repeat: -1, duration: 200, repeatRefresh: true});
    gsap.to(circleRef.current, {rotation: -3600, repeat: -1, duration: 200, repeatRefresh: true});
  }, []);

  return (
    <div className="fixed bottom-[50px] left-[50px] md:fixed hidden">
      <img src={ScrollCircle} alt="Scroll Circle" className="" ref={circleRef} />
      <img src={FlowerImage} alt="Flower" ref={flowerRef} className="absolute bottom-[50%] left-[50%] -translate-x-[50%] translate-y-[50%]" />
    </div>
  );
};

export default SpinningCircle;
