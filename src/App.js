import React, { useEffect, useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
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
  const [imageSrc, setImageSrc] = useState("");
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      const command = transcript.toLowerCase();
      if (images[command]) {
        setImageSrc(images[command]);
      }
    }
  }, [transcript]);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <p>Your browser does not support speech recognition.</p>;
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Voice Command App</h1>
      <button
        onClick={listening ? SpeechRecognition.stopListening : SpeechRecognition.startListening}
        style={{ marginBottom: "20px" }}
      >
        {listening ? "Stop Listening" : "Start Listening"}
      </button>
      <p>Recognized Command: {transcript}</p>
      {imageSrc && (
        <img
          src={imageSrc}
          alt="Recognized command"
          style={{ marginTop: "20px", width: "300px", height: "auto" }}
        />
      )}
      <div style={{ marginTop: "20px" }}>
        {Object.keys(images).map((key) => (
          <button key={key} onClick={() => setImageSrc(images[key])} style={{ margin: "5px" }}>
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default VoiceCommandApp;
