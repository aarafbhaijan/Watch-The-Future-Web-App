import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
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
  height: "90%",
  border: "none",
  bgcolor: "#1A1A40",
  // boxShadow: "10px 10px 15px #8758ff",
  color: "white",
  p: 4,
};

export default function ContentModal({ children, id, media_type }) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
    <div>
      <div onClick={handleOpen} className="media">
        {children}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box className="mobileWidth" sx={style}>
            {content && (
              <div className="contentModal">
                <img
                  src={
                    content.poster_path
                      ? `${img_500}/${content.poster_path}`
                      : `${unavailableModal}`
                  }
                  alt={content.name || content.title}
                  className="contentModal_portrait"
                />
                <img
                  src={
                    content.backdrop_path
                      ? `${img_500}/${content.backdrop_path}`
                      : `${unavailableLandscape}`
                  }
                  alt={content.name || content.title}
                  className="contentModal_landscape"
                />
                <div className="contentModal_about">
                  <span className="content_title">
                    {content.title || content.name} (
                    {(
                      content.first_air_date ||
                      content.release_date ||
                      "---"
                    ).substring(0, 4)}
                    )
                  </span>
                  {content.tagline && (
                    <i className="tagline">{content.tagline}</i>
                  )}

                  <span className="contentModel_discrption">
                    {content.overview && content.overview}
                  </span>

                  <div>
                    <Carousel media_type={media_type} id={content.id} />
                  </div>

                  <iframe
                    src={`https://www.youtube.com/embed/${video}`}
                    title="YoutubeVideo"
                    frameborder="0"
                    allowFullScreen
                  ></iframe>
                  <Button
                    variant="contained"
                    startIcon={<YouTubeIcon />}
                    href={`https://www.youtube.com/watch?v=${video}`}
                    target="_blank"
                  >
                    Watch the trailer!
                  </Button>
                </div>
              </div>
            )}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
