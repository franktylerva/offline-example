import React from 'react';
import { Grid } from '@mui/material';
import Header from "./Header"
import DessertList from "./DessertList"

function createData(id, name, calories, fat, carbs, protein) {
  return {doc: { _id: id, name, calories, fat, carbs, protein }};
}

function App() {

  const user = {name: "Test"}

  const data = [
    createData(1, 'Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData(2, 'Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData(3, 'Eclair', 262, 16.0, 24, 6.0),
    createData(4, 'Cupcake', 305, 3.7, 67, 4.3),
    createData(5, 'Gingerbread', 356, 16.0, 49, 3.9),
  ];

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