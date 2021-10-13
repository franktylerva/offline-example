import React from 'react';
import { Grid } from '@mui/material';
import Header from "./Header"
import DessertList from "./DessertList"
import { useAllDocs } from 'use-pouchdb';

function App() {

  const user = {name: "Test"}

  const { rows: data } = useAllDocs({
    include_docs: true, // Load all document bodies
  })

  return (
    <Grid container direction="column">
      <Grid item>
        <Header user={user}/>
      </Grid>
      <Grid item container>
        <Grid item sm={2}/>
        <Grid item xs={12} sm={8}>
          <DessertList data={data}/>
        </Grid>
        <Grid item sm={2}/>
      </Grid>
    </Grid>
  );
}

export default App;