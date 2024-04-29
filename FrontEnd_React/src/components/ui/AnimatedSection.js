import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import Card from "./Card";
import CardContent from "./CardContent";

const AnimatedSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState("down");

  const [{ x: paragraphOffset }, setParagraphOffset] = useSpring(() => ({
    x: -100,
  }));

  const [{ x: projectsOffset }, setProjectsOffset] = useSpring(() => ({
    x: 100,
  }));

  useEffect(() => {
    const handleScroll = () => {
      const newScrollY = window.scrollY;
      setScrollDirection(newScrollY > scrollY ? "down" : "up");
      setScrollY(newScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollY]);

  useEffect(() => {
    const paragraphThreshold = 500;
    const projectsThreshold = 500;

    // Only trigger animations when scrolling down
    if (scrollDirection === "down") {
      setParagraphOffset({
        x: scrollY > paragraphThreshold ? 0 : -100,
        immediate: false,
      });

      setProjectsOffset({
        x: scrollY > projectsThreshold ? 0 : 100,
        immediate: false,
      });
    }
  }, [scrollY, scrollDirection, setParagraphOffset, setProjectsOffset]);

  return (
    <section className="w-full py-12 md:py-24 lg:py-52">
      <div className="mx-auto max-w-7xl grid gap-10 lg:gap-16 lg:grid-cols-2">
        <animated.div
          className="space-y-4"
          style={{
            transform: paragraphOffset.to((x) => `translateX(${x}%)`),
          }}
        >
          <h2 className="text-3xl font-bold tracking-tight lg:text-4xl">
            Featured Projects
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Explore some of the amazing projects created by our users. From
            innovative apps to inspiring art, there's something for everyone.
          </p>
        </animated.div>
        <animated.div
          className="grid gap-4"
          style={{
            transform: projectsOffset.to((x) => `translateX(${x}%)`),
          }}
        >
          {/* ... Your project cards go here */}
            <Card className="p-0">
              <CardContent className="p-4">
                <div className="grid items-start gap-2">
                  <img
                    alt="Project thumbnail"
                    className="rounded-lg object-co ver"
                    height="100"
                    src="/placeholder_sharing-modified.jpg"
                    style={{
                      aspectRatio: "100/100",
                      objectFit: "cover",
                    }}
                    width="100"
                  />
                  <div className="space-y-1">
                    <h3 className="font-semibold">Project X</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      A revolutionary new product that will change the way you
                      work.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="p-0">
              <CardContent className="p-4">
                <div className="grid items-start gap-2">
                  <img
                    alt="Project thumbnail"
                    className="rounded-lg object-cover"
                    height="100"
                    src="/placeholder_sharing-modified.jpg"
                    style={{
                      aspectRatio: "100/100",
                      objectFit: "cover",
                    }}
                    width="100"
                  />
                  <div className="space-y-1">
                    <h3 className="font-semibold">Project Y</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      An artistic masterpiece that pushes the boundaries of
                      creativity.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
        </animated.div>
        </div>
    </section>
  );
};

export default AnimatedSection;
