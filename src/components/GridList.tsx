import React, { ReactNode } from 'react';
import Grid from '@mui/material/Grid';

export interface GridListProps {
  list: ReactNode[];
}

export default function GridList({ list }: GridListProps) {
  return (
    <Grid container spacing={{ xs: 1, sm: 2, md: 4 }}>
      {
        list.map((item) => (
          <Grid item xs='auto'>{item}</Grid>
        ))
      }
    </Grid>
  );
}
