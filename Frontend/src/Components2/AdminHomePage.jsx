import React, { useState, useEffect } from "react";
import { Box, Typography, Paper } from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error:", error);
    console.error("Error Info:", errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ padding: 4, textAlign: "center" }}>
          <Typography variant="h5" color="error">
            Something went wrong. Please try refreshing the page.
          </Typography>
        </Box>
      );
    }

    return this.props.children;
  }
}

const AdminHomePage = () => {
  const [orgKey, setOrgKey] = useState("Loading...");
  const AdminData = useSelector((store) => store.AdminData);

  useEffect(() => {
    const fetchOrganization = async () => {
      try {
        const response = await axios.post("http://localhost:3001/org/getall", {
          email: AdminData.email,
        });
        const organization = response.data.Organization[0].key;
        setOrgKey(organization);
      } catch (error) {
        console.error("Error fetching organization:", error);
        setOrgKey("Error fetching key");
      }
    };

    fetchOrganization();
  }, [AdminData.email]);

  return (
    <ErrorBoundary>
      <Box
        sx={{
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
        }}
      >
        <Typography variant="h4" component="h1">
          Welcome to Admin Dashboard
        </Typography>

        <Typography variant="body1" color="text.secondary">
          This page is currently under development.
        </Typography>

        <Paper
          elevation={3}
          sx={{
            padding: 3,
            maxWidth: 400,
            width: "100%",
            textAlign: "center",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Important: Your Organization Key
          </Typography>
          <Typography
            variant="h3"
            color="primary"
            sx={{
              letterSpacing: 3,
              fontWeight: "bold",
            }}
          >
            {orgKey}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Please save this code. It is required for employee and manager
            registration.
          </Typography>
        </Paper>
      </Box>
    </ErrorBoundary>
  );
};

export default AdminHomePage;
