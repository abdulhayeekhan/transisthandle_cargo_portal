import { useState } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import brandDark from "assets/images/logo-cargo.png";
import { useAuth } from "context/AuthContext";

const Basic = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  // const handleLogin = () => {
  //   const body = {
  //     email,
  //     password,pass
  //   }

  //   navigate("/dashboard");
  // };
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please provide both email and password.");
      return;
    }

    try {
      await login(email, password); // Call the login function from context
    } catch (err) {
      setError("Login failed. Please try again.");
    }
  };
  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox pt={4} pb={3} px={3}>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <img
              src={brandDark}
              style={{
                alignItems: "center",
                alignSelf: "center",
                width: 120,
                marginTop: 10,
                marginBottom: 30,
              }}
            />
          </div>

          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton
                variant="gradient"
                color="info"
                disabled={email && password && rememberMe ? true : false}
                onClick={handleLogin}
                fullWidth
              >
                sign in
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
};

export default Basic;
