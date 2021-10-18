import React from 'react';
import { Grid } from '@mui/material';
import Header, {User} from "./Header"
import DessertList from "./DessertList"

function App() {

  const user: User = {name: "Test"}

  return (
    <Grid container direction="column">
      <Grid item>
        <Header user={user}/>
      </Grid>
      <Grid item container>
        <Grid item sm={2}/>
        <Grid item xs={12} sm={8}>
          <DessertList/>
        </Grid>
        <Grid item sm={2}/>
      </Grid>
    </Grid>
  );
}

export default App;