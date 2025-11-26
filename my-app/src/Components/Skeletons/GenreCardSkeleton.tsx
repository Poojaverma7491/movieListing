import { Box, Skeleton } from "@mui/material";

const GenreCardSkeleton: React.FC = () => {
  return (
    <Box
      sx={{
        position: "relative",
        height: { xs: 200, sm: 240, md: 300 },
        width: { xs: 140, sm: 160, md: 185 },
        borderRadius: 2,
        overflow: "hidden",
        mr: 2,
        flexShrink: 0,
        backgroundColor: "#111",
      }}>
      <Skeleton
        variant="rectangular"
        width="100%"
        height="100%"
        animation="wave"
        sx={{ bgcolor: "grey.800" }}/>

      <Skeleton
        variant="text"
        width="60%"
        height={24}
        animation="wave"
        sx={{
          position: "absolute",
          top: { xs: 8, sm: 12, md: 16 },
          left: { xs: 8, sm: 12, md: 16 },
          bgcolor: "grey.700",
        }}
      />
    </Box>
  );
};

export default GenreCardSkeleton;
