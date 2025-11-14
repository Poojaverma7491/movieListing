import { Card, CardContent, Skeleton } from "@mui/material";

const MovieCardSkeleton: React.FC = () => (
  <Card
    sx={{
      p: 1,
      height: { xs: 300, sm: 340, md: 400 },   
      width: { xs: 140, sm: 160, md: 185 },    
      borderRadius: 2,
      overflow: "hidden",
      position: "relative",
      bgcolor: "grey.800",
    }}
  >
    {/* Poster skeleton */}
    <Skeleton
      variant="rectangular"
      animation="wave"
      sx={{
        bgcolor: "grey.700",
        height: { xs: 220, sm: 250, md: 300 },
        width: "100%",
      }}
    />

    <CardContent
      sx={{
        px: { xs: 0.5, sm: 1 },
        py: { xs: 0.5, sm: 1 },
        minHeight: { xs: 40, sm: 50 },
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        bgcolor: "grey.800",
      }}
    >
      {/* Title skeleton */}
      <Skeleton
        variant="text"
        sx={{
          bgcolor: "grey.700",
          width: "50%",
          height: { xs: 12, sm: 16, md: 20 }, 
        }}
      />

      {/* Release date skeleton */}
      <Skeleton
        variant="text"
        sx={{
          bgcolor: "grey.700",
          width: "60%",
          height: { xs: 10, sm: 12, md: 14 },
        }}
      />

      {/* Rating skeleton */}
      <Skeleton
        variant="text"
        sx={{
          bgcolor: "grey.700",
          width: "50%",
          height: { xs: 10, sm: 12, md: 14 },
        }}
      />

      {/* Extra line skeleton */}
      <Skeleton
        variant="text"
        sx={{
          bgcolor: "grey.700",
          width: "40%",
          height: { xs: 10, sm: 12, md: 14 },
        }}
      />
    </CardContent>
  </Card>
);

export default MovieCardSkeleton;
