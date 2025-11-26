// import { Box, Typography, Link, Grid } from "@mui/material";

// const Footer = () => {
//   return (
//     <Box
//       component="footer"
//       sx={{
//         backgroundColor: "rgba(39, 107, 119, 0.5)",
//         color: "#f0f0f0",
//         py: { xs: 2, sm: 3 },
//         px: { xs: 2, sm: 4 },
//         mt: { xs: 4, sm: 6 },
//         textAlign: { xs: "center", md: "left" },
//       }}
//     >
//       <Grid
//         container
//         spacing={{ xs: 2, sm: 4 }}
//         justifyContent="space-between"
//         alignItems="flex-start"
//       >
//         <Grid>
//           <Typography variant="body1" gutterBottom>
//             MovieListing App
//           </Typography>
//           <Typography variant="body2">
//             &copy; {new Date().getFullYear()} All rights reserved.
//           </Typography>
//         </Grid>

//         <Grid >
//           <Link href="/home" underline="hover" color="inherit" display="block">
//             Explore
//           </Link>
//           <Link href="/home" underline="hover" color="inherit" display="block">
//             About
//           </Link>
//           <Link href="/home" underline="hover" color="inherit" display="block">
//             Contact
//           </Link>
//         </Grid>

//         <Grid>
//           <Typography variant="body1" gutterBottom>
//             Developer Pooja Verma
//           </Typography>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default Footer;

import { Box, Typography, Link, Grid, IconButton, Stack } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "rgba(45, 50, 51, 0.9)",
        color: "#f0f0f0",
        py: { xs: 3, sm: 4 },
        px: { xs: 2, sm: 6 },
        mt: { xs: 4, sm: 6 },
      }}
    >
      <Grid
        container
        spacing={{ xs: 3, sm: 6 }}
        justifyContent="space-between"
        alignItems="flex-start"
      >
        {/* Left Section */}
        <Grid>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            MovieListing App
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Discover trending movies, build your watchlist, and explore more...
          </Typography>
          <Typography variant="caption">
            &copy; {new Date().getFullYear()} All rights reserved.
          </Typography>
        </Grid>

        {/* Middle Section - Links */}
        <Grid>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Quick Links
          </Typography>
          <Stack spacing={1}>
            <Link href="/home" underline="hover" color="inherit">
              Explore
            </Link>
            <Link href="/home" underline="hover" color="inherit">
              About
            </Link>
            <Link href="/home" underline="hover" color="inherit">
              Contact
            </Link>
          </Stack>
        </Grid>

        {/* Right Section - Socials */}
        <Grid>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Connect with Us
          </Typography>
          <Stack direction="row" spacing={1}>
            <IconButton
              href="https://facebook.com"
              target="_blank"
              sx={{ color: "#f0f0f0" }}
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              href="https://twitter.com"
              target="_blank"
              sx={{ color: "#f0f0f0" }}
            >
              <TwitterIcon />
            </IconButton>
            <IconButton
              href="https://instagram.com"
              target="_blank"
              sx={{ color: "#f0f0f0" }}
            >
              <InstagramIcon />
            </IconButton>
          </Stack>

          <Typography variant="body2" sx={{ mt: 2 }}>
            Developer: <strong>Pooja Verma</strong>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
