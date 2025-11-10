import { Card, CardContent, Skeleton } from "@mui/material";

const MovieCardSkeleton: React.FC = () => (
  <Card
    sx={{
      p: 1,
      height: 400,
      borderRadius: 2,
      overflow: "hidden",
      position: "relative",
      bgcolor: 'grey.800',
      width: 185,
    }}
  >
    <Skeleton variant="rectangular" height={300} animation="wave" sx={{bgcolor: 'grey.700'}}/>

    <CardContent
      sx={{
        px: 1,
        py: 1,
        minHeight: 50,
        display: "flex",
        flexDirection: "column",
        bgcolor: 'grey.800',
        justifyContent: "space-between",
      }}
    >
      <Skeleton variant="text" width="50%" height={24} sx={{bgcolor: 'grey.700'}} />
      <Skeleton variant="text" width="60%" height={16} sx={{bgcolor: 'grey.700'}}/>
      <Skeleton variant="text" width="50%" height={16} sx={{bgcolor: 'grey.700'}}/>
      <Skeleton variant="text" width="40%" height={16} sx={{bgcolor: 'grey.700'}}/>
    </CardContent>
  </Card>
);
export default MovieCardSkeleton;
