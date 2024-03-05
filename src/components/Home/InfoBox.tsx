import { useState } from "react";

export default function InfoBox() {
  const [isInfoBoxOpen, setIsInfoBoxOpen] = useState(false);
  return (
    <div className="container__info-box">
      <button
        className="button__info-box"
        onClick={() => setIsInfoBoxOpen(!isInfoBoxOpen)}
      >
        {isInfoBoxOpen ? "Close" : "Info"}
      </button>
      <div className={`expander ${isInfoBoxOpen ? "expanded" : ""}`}>
        <div className={`expander-content ${isInfoBoxOpen ? "expanded" : ""}`}>
          <p>
            Billy Myles-Berkouwer is a full-stack web developer, visual artist, and technical lead for 3D web projects for clients in commercial and arts sectors. 
            With strong interpersonal and technical skills, he is comfortable working across various project phases, including art direction, 3D design, and front-end and back-end web development.
          </p>
          <p>
            About the flower - I modelled and procedurally textured this flower
            in Blender, animated it in webGL and rendered using Three.js inside
            a Next.js app.
          </p>
          <p>
            For work enquiries,{" "}
            <a href="mailto:billy@ocove.studio"> contact me here</a>{" "}
          </p>
          <ul className="list__social-links">
            <li><a href="https://www.linkedin.com/in/billyberkouwer">LinkedIn</a></li>
            <li><a href="https://www.instagram.com/billyberkouwer/">Instagram</a></li>
            <li><a href="https://github.com/billyberkouwer">GitHub</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
