import React, { useContext } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { Container, Button, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { addBlog } from "../../services/blogService";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../services/Auth";

function CreateBlog() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      heading: "",
      subHeading: "",
      content: "",
    },
  });

  const handleForm = async (data) => {
    try {
      console.log("Image added", data);
      await addBlog(data, currentUser);
      await new Promise((r) => setTimeout(r, 4000));
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

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
            <input
              {...register("banner")}
              type="file"
              id="banner"
              name="banner"
              accept="image/png, image/gif, image/jpeg"
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
}

export default CreateBlog;
