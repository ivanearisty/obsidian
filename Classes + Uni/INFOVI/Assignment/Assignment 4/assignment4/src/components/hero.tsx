import React from "react";

const Hero: React.FC = () => {
  return (
    <section className="hero bg-base-200 min-h-screen ">
      <div className="max-w-md">
        <h1 className="text-5xl font-bold text-primary">
          Raising Awareness About Men's Depression
        </h1>
        <p className="py-6 text-accent">
          Men often suffer in silence. We aims to shed light on the
          struggles faced by men dealing with depression through data.
        </p>
      </div>
    </section>
  );
};

export default Hero;
