import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import React from "react";
import { useRouter } from "next/router";

export default function FileCard({ file }) {
  const router = useRouter();
  return (
    <Card>
      <CardContent>
        <Typography sx={{ fontSize: 16 }} color="text.primary" gutterBottom>
          {file.name}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          variant="outlined"
          onClick={() => {
            router.push(`/files/${file.id}`);
          }}
        >
          View File Permissions
        </Button>
        {file["@microsoft.graph.downloadUrl"] && (
          <Button
            variant="outlined"
            size="small"
            onClick={() => {
              window.location.href = file["@microsoft.graph.downloadUrl"];
            }}
          >
            Download File
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
