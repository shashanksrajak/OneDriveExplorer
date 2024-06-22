import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Avatar,
  Stack,
  Chip,
  Box,
} from "@mui/material";
import React from "react";
import { useRouter } from "next/router";

export default function FileUserCard({ user }) {
  const router = useRouter();
  return (
    <Card>
      <CardContent>
        <Stack direction={"row"} alignItems={"center"} gap={2}>
          <Avatar />
          <Typography sx={{ fontSize: 16 }} color="text.primary" gutterBottom>
            {user.invitation
              ? user.invitation.email
              : user.grantedTo
              ? user.grantedTo.user.displayName
              : ""}
          </Typography>
        </Stack>
        <Box mt={4}>
          {user.roles.map((role) => {
            return <Chip key={role} variant="outlined" label={role} />;
          })}
        </Box>
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
}
