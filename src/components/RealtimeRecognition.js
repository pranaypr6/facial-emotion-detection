import React, { useState, useEffect, useRef } from "react";
import ParticleComp from "./ParticleComp";
import * as faceapi from "face-api.js";
import { Dimmer, Loader } from "semantic-ui-react";

const RealtimeRecognition = () => {
  const videoHeight = 480;
  const videoWidth = 640;
  let stream = null;

  const [initializing, setInitializing] = useState(false);
  const [videoVisibility, setVideoVisibility] = useState("hidden");
  const videoRef = useRef();
  const canvasRef = useRef();

  useEffect(() => {
    loadModels();
    return () => {
      stopBothVideoAndAudio();
    };
  }, []);

  const loadModels = async () => {
    const MODEL_URL = process.env.PUBLIC_URL + "/models";
    setInitializing(true);
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
      faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
      faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
    ]).then(startVideo);
  };

  function stopBothVideoAndAudio() {
    if (stream) {
      stream.getTracks().forEach(function (track) {
        if (track.readyState == "live") {
          track.stop();
        }
      });
    }
  }

  const startVideo = async () => {
    try {
      stream = await navigator.mediaDevices.getUserMedia({ video: {} });
      videoRef.current.srcObject = stream;
    } catch (err) {}
  };

  const handleVideoPlay = () => {
    var intervalID = setInterval(async () => {
      if (canvasRef.current === null) {
        clearInterval(intervalID);
        return;
      }
      if (videoRef.current === null) {
        clearInterval(intervalID);
        return;
      }

      if (initializing) {
        setInitializing(false);
      }
      setVideoVisibility("visible");
      try {
        canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(videoRef.current);
        const displaySize = {
          width: videoWidth,
          height: videoHeight,
        };
        faceapi.matchDimensions(canvasRef.current, displaySize);
        const detections = await faceapi
          .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceExpressions();
        const resizeDetections = faceapi.resizeResults(detections, displaySize);
        canvasRef.current.getContext("2d").clearRect(0, 0, videoWidth, videoHeight);
        faceapi.draw.drawDetections(canvasRef.current, resizeDetections);
        faceapi.draw.drawFaceLandmarks(canvasRef.current, resizeDetections);
        faceapi.draw.drawFaceExpressions(canvasRef.current, resizeDetections);
      } catch (error) {
        clearInterval(intervalID);
      }
    }, 100);
  };

  return (
    <div>
      <div
        className="app"
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100vh",
          alignItems: "center",
        }}
      >
        <span>
          {initializing ? (
            <Dimmer active>
              <Loader content="Loading Models" />
            </Dimmer>
          ) : (
            ""
          )}
        </span>
        <h1
          style={{
            fontSize: "80px",
            color: "#fff",
            fontFamily: "Akaya Telivigala",
          }}
        >
          Realtime face emotion detection
        </h1>
        <div
          style={{
            display: "flex",
            jusifyContent: "center",
            marginTop: "50px",
          }}
        >
          <video
            className="video"
            style={{ visibility: `${videoVisibility}` }}
            ref={videoRef}
            autoPlay
            muted
            onPlay={handleVideoPlay}
          />
          <canvas style={{ position: "absolute" }} ref={canvasRef} />
        </div>
      </div>
      <ParticleComp />
    </div>
  );
};

export default RealtimeRecognition;
