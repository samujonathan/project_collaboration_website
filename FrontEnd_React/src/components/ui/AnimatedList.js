import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import CheckIcon from "./Checkicon"

const AnimatedList = () => {
  const [scrollY, setScrollY] = useState(0);

  const [{ opacity: point1Opacity }, setPoint1Opacity] = useSpring(() => ({
    opacity: 0,
  }));

  const [{ opacity: point2Opacity }, setPoint2Opacity] = useSpring(() => ({
    opacity: 0,
  }));

  const [{ opacity: point3Opacity }, setPoint3Opacity] = useSpring(() => ({
    opacity: 0,
  }));

  const [{ opacity: point4Opacity }, setPoint4Opacity] = useSpring(() => ({
    opacity: 0,
  }));

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const point1Threshold = 100;
    const point2Threshold = 200;
    const point3Threshold = 300;
    const point4Threshold = 400;

    setPoint1Opacity({
      opacity: scrollY > point1Threshold ? 1 : 0,
      immediate: false,
    });

    setPoint2Opacity({
      opacity: scrollY > point2Threshold ? 1 : 0,
      immediate: false,
    });

    setPoint3Opacity({
      opacity: scrollY > point3Threshold ? 1 : 0,
      immediate: false,
    });

    setPoint4Opacity({
      opacity: scrollY > point4Threshold ? 1 : 0,
      immediate: false,
    });
  }, [scrollY, setPoint1Opacity, setPoint2Opacity, setPoint3Opacity,setPoint4Opacity]);

  return (
    <div className="grid gap-4">
      <animated.ul className="grid gap-2">
        <animated.li style={{ opacity: point1Opacity }}>
        <CheckIcon className="inline-block h-4 w-4" />
          &nbsp;Easy collaboration
        </animated.li>
        <animated.li style={{ opacity: point2Opacity }}>
        <CheckIcon className="inline-block h-4 w-4" />
          &nbsp;Seamless communication
        </animated.li>
        <animated.li style={{ opacity: point3Opacity }}>
        <CheckIcon className="inline-block h-4 w-4" />
          &nbsp;Efficient project management
        </animated.li>
        <animated.li style={{ opacity: point4Opacity }}>
        <CheckIcon className="inline-block h-4 w-4" />
          &nbsp;Secure file sharing
        </animated.li>


      </animated.ul>
    </div>
  );
};

export default AnimatedList;
