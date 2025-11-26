import { Box, Skeleton } from "@mui/material";

const CarouselSlideSkeleton: React.FC = () => {
  return (
    <Box
      sx={{
        width: "90%",
        minHeight: { xs: "30vh", sm: "50vh", md: "80vh" },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        p: { xs: 3, sm: 5 },
        bgcolor: "grey.800",
      }}
    >
      <Skeleton
        variant="text"
        width="60%"
        height={60}
        sx={{ mx: "auto", mb: 2, bgcolor: "grey.700" }}
      />
      <Skeleton
        variant="text"
        width="80%"
        height={120}
        sx={{ mx: "auto", mb: 2, bgcolor: "grey.700" }}
      />
      <Skeleton
        variant="rectangular"
        sx={{
          mx: "auto",
          borderRadius: 2,
          height: { xs: 100, sm: 200, md: 200, lg: 280 },
          width: { xs: 140, sm: 160, md: 185 },
          bgcolor: "grey.700",
        }}
      />
    </Box>
  );
};

export default CarouselSlideSkeleton;