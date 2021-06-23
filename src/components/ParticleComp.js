import React from "react";
import Particles from "react-particles-js";

const ParticleComp = () => {
  return (
    <Particles
      style={{
        background: "#ff6633",
        position: "absolute",
        top: "0",
        left: "0",
        bottom: "0",
        right: "0",
        zIndex: "-100",
      }}
      params={{
        particles: {
          color: "#fff",
          number: {
            density: {
              area: "300",
              enable: "true",
            },
          },
          shape: {
            type: "circle",
          },
          size: {
            value: 3,
          },
          twinkle: {
            particles: {
              color: "#2827CC",
              opacity: "10",
            },
          },
        },
      }}
    />
  );
};

export default ParticleComp;
