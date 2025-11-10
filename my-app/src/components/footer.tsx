import { Box, Typography, Link, Grid } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      height={100}
      sx={{
        backgroundColor: "rgba(39, 107, 119, 0.5)",
        color: "#f0f0f0",
        py: 2,
        px: 3,
        mt: "auto",
        marginTop: 4,
        textAlign: "center",
      }}
    >
      <Grid container spacing={4} margin={3} justifyContent="space-between" alignItems="flex-start">
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
        <Grid>
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
