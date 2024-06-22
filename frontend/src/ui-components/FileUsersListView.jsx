import { Box, Stack } from "@mui/material";
import React from "react";
import FileUserCard from "./FileUserCard";

export default function FileUsersListView({ users }) {
  return (
    <Box>
      <Stack>
        {users?.value?.map((user) => {
          return <FileUserCard key={user.id} user={user} />;
        })}
      </Stack>
    </Box>
  );
}
