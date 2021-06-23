import React, { useEffect, useState, useRef } from "react";
import ParticleComp from "./ParticleComp";
import * as faceapi from "face-api.js";
import { Button, Icon } from "semantic-ui-react";

const PhotoRecognition = () => {
  const imageRef = useRef();
  const canvasRef = useRef();
  const [img, setImg] = useState();
  const photoWidth = 500;
  const photoHeight = 500;

  useEffect(() => {
    loadModels();
  }, []);

  const loadModels = async () => {
    const MODEL_URL = process.env.PUBLIC_URL + "/models";
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
      faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
      faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
    ]).then();
  };

  const detect = async () => {
    if (img == null) {
      alert("Upload Image");
      return;
    }
    canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(imageRef.current);
    const displaySize = {
      width: photoWidth,
      height: photoHeight,
    };
    faceapi.matchDimensions(canvasRef.current, displaySize);
    const detections = await faceapi
      .detectAllFaces(imageRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions();
    const resizeDetections = faceapi.resizeResults(detections, displaySize);
    canvasRef.current.getContext("2d").clearRect(0, 0, photoWidth, photoHeight);
    faceapi.draw.drawDetections(canvasRef.current, resizeDetections);
    faceapi.draw.drawFaceLandmarks(canvasRef.current, resizeDetections);
    faceapi.draw.drawFaceExpressions(canvasRef.current, resizeDetections);
  };

  const uploadImg = (e) => {
    if (e.target.files[0]) {
      setImg(URL.createObjectURL(e.target.files[0]));
      canvasRef.current.height = 0;
    }
  };

  return (
    <div>
      <div
        className="app"
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "80px",
              color: "#fff",
              fontFamily: "Akaya Telivigala",
            }}
          >
            Face emotion detection with Image
          </h1>
        </div>
        <div
          style={{
            position: "relative",
            height: "70vh",
            display: "flex",
            width: "100vw",
            justifyContent: "center",
          }}
        >
          <img
            src={img}
            ref={imageRef}
            alt=""
            height={photoHeight}
            width={photoWidth}
            style={{ position: "absolute" }}
          />
          <canvas style={{ position: "absolute" }} ref={canvasRef} />
        </div>
        <div style={{ width: "100vw", display: "flex", justifyContent: "center" }}>
          <label className="custom-file-upload">
            <input type="file" onChange={uploadImg} />
            Upload
          </label>
          <Button animated basic color="linkedin" size="big" onClick={detect}>
            <Button.Content visible>Detect Emotion </Button.Content>
            <Button.Content hidden>
              <Icon name="meh outline" color="black" />
            </Button.Content>
          </Button>
        </div>
      </div>
      <ParticleComp />
    </div>
  );
};

export default PhotoRecognition;
