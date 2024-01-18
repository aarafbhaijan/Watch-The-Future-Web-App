import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import "../Components/SingleContent/SingleContent.css";
import axios from "axios";
import { useEffect } from "react";
import "../Components/SingleContent/SingleContent.css";
import YouTubeIcon from "@mui/icons-material/YouTube";
import "./ContentModal.css";
import {
  img_300,
  img_500,
  unavailable,
  unavailableLandscape,
  unavailableModal,
} from "../Config/config";
import { ButtonGroup } from "@mui/material";
import Carousel from "./Carousel/Carousel";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  height: "80%",
  border: "none",
  bgcolor: "#1A1A40",
  // boxShadow: "10px 10px 15px #8758ff",
  color: "white",
  p: 4,
};
function ChildModal({ children, id, media_type }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [video, setVideo] = useState([]);
  const api_key = "f3ffd8d11a71057c55ed885f5cfe4edb";

  const Url = `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${api_key}&language=en-US`;
  const fetchData = async () => {
    const { data } = await axios.get(Url);
    setContent(data);
    // content && console.log(content);
  };
  const vidUrl = `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${api_key}&language=en-US`;
  const fetchVideo = async () => {
    const { data } = await axios.get(vidUrl);
    setVideo(data.results[0]?.key);
    // video && console.log(video);
  };
  useEffect(() => {
    fetchData();
    fetchVideo();
  }, []);

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Open Child Modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 200 }}>
          <h2 id="child-modal-title">Text in a child modal</h2>
          <p id="child-modal-description">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </p>
          <Button onClick={handleClose}>Close Child Modal</Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default function NestedModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="parent-modal-title">Text in a modal</h2>
          <p id="parent-modal-description">
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </p>
          <ChildModal />
        </Box>
      </Modal>
    </div>
  );
}
