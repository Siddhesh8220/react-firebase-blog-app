import React, { useContext } from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { CardActionArea } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../services/Auth";

const BlogCard = (props) => {
  const { currentUser } = useContext(AuthContext);
  const { blog, deleteBlog } = props;
  const navigate = useNavigate();

  const conditionalRendering = () => {
    if (blog.creator._id === currentUser.uid) {
      return (
        <div>
          <IconButton
            color="primary"
            onClick={() => {
              navigate(`/blog/edit/${blog._id}`);
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="primary"
            onClick={() => {
              deleteBlog(blog._id);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      );
    }
  };
  return (
    <Card className="card" id={blog._id}>
      <CardActionArea
        onClick={() => {
          navigate(`/blog/get/${blog._id}`);
        }}
      >
        <CardMedia
          className="media"
          component="img"
          height="194"
          image={
            blog.bannerUrl ||
            "https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&w=1000&q=80"
          }
          alt="Paella dish"
        ></CardMedia>
        <CardContent>
          <Typography
            sx={{
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 1,
            }}
            variant="h5"
            component="div"
            className="card-heading"
          >
            {blog.heading}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
            }}
          >
            {blog.subHeading}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className="card-actions">
        <Box className="author-container">
          <Avatar />
          <Box ml={2}>
            <Typography variant="subtitle2" component="p">
              {blog.creator.name}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary" component="p">
              {blog.createdAt.toDate().toDateString()}
            </Typography>
          </Box>
        </Box>
        <Box>{conditionalRendering()}</Box>
      </CardActions>
    </Card>
  );
};

export default BlogCard;
