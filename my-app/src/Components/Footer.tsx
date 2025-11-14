import { Box, Typography, Link, Grid } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "rgba(39, 107, 119, 0.5)",
        color: "#f0f0f0",
        py: { xs: 2, sm: 3 },
        px: { xs: 2, sm: 4 },
        mt: { xs: 4, sm: 6 }, // margin at top
        textAlign: { xs: "center", md: "left" },
      }}
    >
      <Grid
        container
        spacing={{ xs: 2, sm: 4 }}
        justifyContent="space-between"
        alignItems="flex-start"
      >
        {/* Column 1 */}
        <Grid>
          <Typography variant="body1" gutterBottom>
            MovieListing App
          </Typography>
          <Typography variant="body2">
            &copy; {new Date().getFullYear()} All rights reserved.
          </Typography>
        </Grid>

        {/* Column 2 */}
        <Grid >
          <Link href="/home" underline="hover" color="inherit" display="block">
            Explore
          </Link>
          <Link href="/home" underline="hover" color="inherit" display="block">
            About
          </Link>
          <Link href="/home" underline="hover" color="inherit" display="block">
            Contact
          </Link>
        </Grid>

        {/* Column 3 */}
        <Grid>
          <Typography variant="body1" gutterBottom>
            Developer Pooja Verma
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
