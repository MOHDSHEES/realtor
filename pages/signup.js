import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import axios from "axios";
import { closeMessage, openMessage } from "../components/functions/message";
import { message } from "antd";
import { useRouter } from "next/navigation";

const defaultTheme = createTheme();

export default function SignUp() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  let dat = {
    email: "",
    firstName: "",
    lastName: "",
    mobileNo: "",
    password: "",
  };
  const [state, setState] = useState(dat);
  const router = useRouter();

  function clear() {
    setState(dat);
    setConfirmPass("");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)) {
      if (state.password === confirmPass) {
        if (state.mobileNo.length !== 10) {
          setOpen(true);
          setError("Please Enter 10 digit mobile No.");
        } else {
          // register
          setDisabled(true);
          setOpen(false);
          openMessage(messageApi, "Registering User, Please wait...");
          const { data } = await axios.post("/api/register", {
            details: state,
          });
          clear();
          setDisabled(false);
          if (data && data.status === 200) {
            router.replace("/login");
            closeMessage(messageApi, data.msg, "success");
          } else {
            closeMessage(messageApi, data.msg, "error");
          }
        }
      } else {
        // error
        setOpen(true);
        setError("Password Mismatch");
      }
    } else {
      // error
      setOpen(true);
      setError("Enter Valid email Address.");
    }
  };

  const [confirmPass, setConfirmPass] = useState("");

  const Inputchange = (event) => {
    setOpen(false);
    setError("");
    const { name, value } = event.target;
    if (name === "mobileNo") {
      if (value.length <= 10) {
        setState({
          ...state,
          [name]: value,
        });
      }
    } else {
      setState({
        ...state,
        [name]: value,
      });
    }
  };
  const handleKeyDown = (event) => {
    if (
      !/^[0-9\b]+$/.test(event.key) &&
      event.key !== "Backspace" &&
      event.key !== "Tab" &&
      event.key !== "Enter"
    ) {
      event.preventDefault();
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      {contextHolder}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            marginBottom: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Collapse in={open}>
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            </Collapse>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={state.firstName}
                  onChange={Inputchange}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  value={state.lastName}
                  onChange={Inputchange}
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  value={state.email}
                  onChange={Inputchange}
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  value={state.password}
                  onChange={Inputchange}
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  id="confirmPassword"
                  autoComplete="confirm-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="mobileNo"
                  label="10 digit Mobile No."
                  type="text"
                  value={state.mobileNo}
                  onChange={Inputchange}
                  id="mobileNo"
                  autoComplete="mobile"
                  onKeyDown={handleKeyDown}
                />
              </Grid>
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
            </Grid>
            <Button
              type="submit"
              disabled={disabled}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
    </ThemeProvider>
  );
}
