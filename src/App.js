import React, { useEffect, useState } from "react";
import annyang from "annyang";
import img1 from "./image1.png";
import img2 from "./image2.png";
import img3 from "./image3.png";
import img4 from "./image4.png";

const images = {
  one: img1,
  two: img2,
  three: img3,
  four: img4,
};

const VoiceCommandApp = () => {
  const [command, setCommand] = useState("");
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    if (annyang) {
      const commands = {
        "one": () => handleCommand("one"),
        "two": () => handleCommand("two"),
        "three": () => handleCommand("three"),
        "four": () => handleCommand("four"),
      };
      
      annyang.addCommands(commands);
      annyang.start();
    } else {
      alert("Your browser does not support speech recognition.");
    }
  }, []);

  const handleCommand = (input) => {
    setCommand(input);
    if (images[input]) {
      setImageSrc(images[input]);
    } else {
      alert("Unknown command: " + input);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Voice Command App</h1>
      <p>Recognized Command: {command}</p>
      {imageSrc && <img src={imageSrc} alt="Recognized command" style={{ marginTop: "20px", width: "300px", height: "auto" }} />}
      <div style={{ marginTop: "20px" }}>
        <button onClick={() => handleCommand("one")} style={{ margin: "5px" }}>One</button>
        <button onClick={() => handleCommand("two")} style={{ margin: "5px" }}>Two</button>
        <button onClick={() => handleCommand("three")} style={{ margin: "5px" }}>Three</button>
        <button onClick={() => handleCommand("four")} style={{ margin: "5px" }}>Four</button>
      </div>
    </div>
  );
};

export default VoiceCommandApp;