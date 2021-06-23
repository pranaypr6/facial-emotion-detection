import React from "react";
import ParticleComp from "./ParticleComp";
import { Button, Icon } from "semantic-ui-react";
import Typed from "react-typed";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            height: "auto",
            textAlign: "center",
            width: "90%",
          }}
        >
          <h1>
            <Typed
              style={{ color: "#fff", fontSize: "50px" }}
              strings={[
                "Face emotion detection",
                "Realtime Face emotion detection with tensorflowjs",
              ]}
              typeSpeed={40}
              backSpeed={20}
            />
          </h1>
          <div
            style={{
              marginTop: "60px",
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link to="realtime">
              <Button animated basic color="linkedin" size="big">
                <Button.Content visible>
                  Realtime Emotion Recognition
                </Button.Content>
                <Button.Content hidden>
                  <Icon name="meh outline" color="black" />
                </Button.Content>
              </Button>
            </Link>
            <Link to="withphoto">
              <Button animated basic color="linkedin" size="big">
                <Button.Content visible>
                  Face Emotion Recognition with photo
                </Button.Content>
                <Button.Content hidden>
                  <Icon name="file image " color="black" />
                </Button.Content>
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <ParticleComp />
    </div>
  );
};

export default Home;
