import { Box, Skeleton, Stack } from "@mui/material";

const MovieDetailSkeleton = () => (
  <Box sx={{ display: "flex", flexDirection: "column", backgroundColor: "#000", color: "#fff" }}>
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        px: 10,
        py: 15,
        gap: 4,
      }}
    >
      <Skeleton
        variant="rectangular"
        width="100%"
        height={300}
        sx={{ flex: 1, borderRadius: 2, bgcolor: "grey.800" }}
      />
      <Stack spacing={2} sx={{ flex: 1 }}>
        <Skeleton variant="text" width="60%" height={40} sx={{ bgcolor: "grey.800" }} />
        <Skeleton variant="rounded" width="40%" height={30} sx={{ bgcolor: "grey.800" }} />
        <Skeleton variant="text" width="80%" height={20} sx={{ bgcolor: "grey.800" }} />
        <Skeleton variant="text" width="90%" height={20} sx={{ bgcolor: "grey.800" }} />
        <Skeleton variant="text" width="70%" height={20} sx={{ bgcolor: "grey.800" }} />
      </Stack>
    </Box>
  </Box>
);

export default MovieDetailSkeleton;
