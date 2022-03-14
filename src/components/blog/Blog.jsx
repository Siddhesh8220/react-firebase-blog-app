import React, { useEffect, useState } from "react";
import { Card, Container } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { getBlog } from "../../services/blogService";
import CardMedia from "@mui/material/CardMedia";

function Blog() {
  let { id } = useParams();
  const [blog, setBlog] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const blogData = await getBlog(id);
        setBlog(blogData);
      } catch (e) {
        navigate("/Not Found");
      }
    }
    fetchData();
  }, []);

  return (
    <Container maxWidth="lg" className="container">
      <CardMedia
        className="media"
        component="img"
        height="194"
        image={
          blog.bannerUrl ||
          "https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&w=1000&q=80"
        }
        alt="Paella dish"
        sx={{ pb: 2 }}
      ></CardMedia>
      <Typography variant="h3" gutterBottom component="div">
        <b>{blog.heading}</b>
      </Typography>
      <Typography variant="h6" gutterBottom component="div">
        <b>{blog.subHeading}</b>
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        <pre style={{ fontFamily: "inherit" }}>{blog.content}</pre>
      </Typography>
    </Container>
  );
}

export default Blog;
