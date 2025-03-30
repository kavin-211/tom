import React, { useEffect, useState } from "react";

const VoiceCommandApp = () => {
  const [command, setCommand] = useState("");

  // Define your functions
  const one = () => alert("Function One Called");
  const two = () => alert("Function Two Called");
  const three = () => alert("Function Three Called");
  const four = () => alert("Function Four Called");

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support speech recognition.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const spokenWord = event.results[0][0].transcript.toLowerCase().trim();
      setCommand(spokenWord);
      handleCommand(spokenWord);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    const startListening = () => {
      recognition.start();
    };

    document.getElementById("start-btn").addEventListener("click", startListening);
    return () => {
      document.getElementById("start-btn").removeEventListener("click", startListening);
    };
  }, []);

  const handleCommand = (spokenWord) => {
    switch (spokenWord) {
      case "one":
        one();
        break;
      case "two":
        two();
        break;
      case "three":
        three();
        break;
      case "four":
        four();
        break;
      default:
        alert("Unknown command: " + spokenWord);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Voice Command App</h1>
      <button id="start-btn">Start Listening</button>
      <p>Recognized Command: {command}</p>
    </div>
  );
};

export default VoiceCommandApp;
