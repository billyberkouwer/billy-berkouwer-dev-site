import { useState } from "react";

export default function InfoBox() {
  const [isInfoBoxOpen, setIsInfoBoxOpen] = useState(false);
  return (
    <div className="wrapper__info-box">
      <button
        className="button__info-box"
        onClick={() => setIsInfoBoxOpen(!isInfoBoxOpen)}
      >
        {isInfoBoxOpen ? "Close" : "Info"}
      </button>
      <div className={`content__info-box ${isInfoBoxOpen ? "open" : ""}`} >
        <p>Billy Myles-Berkouwer is a full-stack web developer and 3D artist. He specialises in producing 3D web projects for clients in arts and business sectors.</p>
        <p>About the flower - I modelled and procedurally textured this flower in Blender, animated it in webGL and rendered using Three.js inside a Next.js app.</p>
        <p>Full site coming soon. For work enquiries, <a href="mailto:billy@ocove.studio"> contact me here</a> </p>
      </div>
    </div>
  );
}
