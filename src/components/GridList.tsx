import React, { ReactNode } from 'react';
import Grid from '@mui/material/Grid';

export interface GridListProps {
  list: ReactNode[];
}

export default function GridList({ list }: GridListProps) {
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 4 }}
      justifyContent={{ xs: 'center', md: 'flex-start' }}
    >
      {
        list.map((item) => (
          <Grid item xs='auto'>{item}</Grid>
        ))
      }
    </Grid>
  );
}
