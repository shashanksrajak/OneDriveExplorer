import { Box, Stack } from "@mui/material";
import React from "react";
import FileCard from "./FileCard";

export default function FileListView({ filesData }) {
  return (
    <Box>
      <Stack gap={4}>
        {filesData?.value?.map((file) => {
          return <FileCard key={file.id} file={file} />;
        })}
      </Stack>
    </Box>
  );
}
