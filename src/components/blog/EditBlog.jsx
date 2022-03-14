import React, { useEffect, useState, useContext } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { Container, Button, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { updateBlog, getBlog } from "../../services/blogService";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../services/Auth";
import { Navigate } from "react-router-dom";

function EditBlog() {
  const navigate = useNavigate();
  const [blog, setBlog] = useState(undefined);
  const { control, handleSubmit, reset } = useForm();
  const { currentUser } = useContext(AuthContext);
  let { id } = useParams();

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

  const handleForm = async (data) => {
    try {
      await updateBlog(blog._id, data);
      navigate(`/blog/get/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const preventCurrentUserToEdit = () => {
    console.log(!blog);
    if (!blog) return false;
    return currentUser.uid !== blog.creator._id;
  };
  if (preventCurrentUserToEdit()) {
    return <Navigate to={`/blog/get/${id}`} />;
  }

  if (blog) {
    return (
      <Container maxWidth="lg" className="container">
        <Box component="form" onSubmit={handleSubmit(handleForm)} noValidate>
          <Grid container gap={2}>
            <Grid item xs={12}>
              <Typography component="h5" variant="h5">
                Publish Your Passions, Your Way!
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="heading"
                control={control}
                defaultValue={blog.heading}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    id="heading"
                    label="Heading"
                    value={value}
                    variant="outlined"
                    size="small"
                    onChange={onChange}
                    fullWidth
                  />
                )}
                rules={{
                  required: "Heading is required",
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="subHeading"
                control={control}
                defaultValue={blog.subHeading}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    id="subHeading"
                    label="Sub Heading"
                    value={value}
                    variant="outlined"
                    size="small"
                    onChange={onChange}
                    fullWidth
                  />
                )}
                rules={{
                  required: "Sub Heading is required",
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="content"
                control={control}
                defaultValue={blog.content}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    multiline
                    id="content"
                    label="Content"
                    value={value}
                    variant="outlined"
                    size="small"
                    minRows={19}
                    onChange={onChange}
                    fullWidth
                  />
                )}
                rules={{
                  required: "Content is required",
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained">
                Confirm
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    );
  } else {
    return "Loading...";
  }
}

export default EditBlog;
