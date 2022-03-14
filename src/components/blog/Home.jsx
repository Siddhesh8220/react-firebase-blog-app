import React, { useEffect, useState, useContext } from "react";
import { Grid } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/material";
import BlogCard from "./BlogCard";
import { getAllBlogs, deleteBlog } from "../../services/blogService";
import { AuthContext } from "../../services/Auth";

function Home() {
  const { currentUser } = useContext(AuthContext);
  const [filter, setFilter] = useState("all");
  const [updateStatus, updateData] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const blogsArr = await getAllBlogs();
        if (filter === "all") {
          setBlogs(blogsArr);
        } else {
          let filteredArr = blogsArr.filter((blog) => {
            return blog.creator._id === currentUser.uid;
          });
          setBlogs(filteredArr);
        }
      } catch (e) {
        console.log("Not Found");
      }
    }
    fetchData();
  }, [filter, updateStatus]);

  const deleteBlogWithId = async (id) => {
    try {
      await deleteBlog(id);
      updateData(!updateStatus);
      console.log("Blog Deleted");
    } catch (error) {
      console.log(error);
    }
  };

  const buildCards = () => {
    let cards =
      blogs.length > 0 &&
      blogs.map((blog) => {
        return (
          <Grid item xs={12} key={blog._id}>
            <BlogCard blog={blog} deleteBlog={deleteBlogWithId} />
          </Grid>
        );
      });

    return cards;
  };

  const handleSubmit = () => {
    navigate("/blog/new");
  };

  return (
    <Container maxWidth="lg" className="container">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Button
            variant="outlined"
            onClick={handleSubmit}
            startIcon={<AddIcon />}
          >
            New Blog
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Typography component="h4" variant="h4">
            <b>Blogs</b>
          </Typography>
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={4} container justifyContent="flex-end">
          <FormControl style={{ minWidth: "140px" }}>
            <InputLabel id="demo-simple-select-label">Filter</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={filter}
              label="Filter"
              onChange={(e) => setFilter(e.target.value)}
            >
              <MenuItem value="all">All Blogs</MenuItem>
              <MenuItem value="user">My Blogs</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Grid container gap={5}>
            {/* blog cards */}
            {buildCards()}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
