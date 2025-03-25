import React from "react";

const CTA: React.FC = () => {
    const handleClick = () => {
        window.open("https://www.mensmindsmatter.org/", "_blank", "noopener,noreferrer");
    };

    return (
        <section className="bg-secondary text-primary py-20 text-center">
            <h2 className="text-4xl font-bold mb-6">Take Action</h2>
            <p className="text-xl mb-8">
                Join us in spreading awareness and providing support to those who need
                it most. Together, we can make a difference.
            </p>
            <a href="#">
                <button className="btn btn-primary" onClick={handleClick}>Get Involved</button>
            </a>
        </section>
    );
};

export default CTA;
