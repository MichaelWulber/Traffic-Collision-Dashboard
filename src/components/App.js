import React from 'react';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';
import ContainerDimensions from 'react-container-dimensions';

import Map from './Map';
import SideBar from './SideBar';

const GridLayout = styled(Grid)`
  width: 100%;
  height: 100%;
  background: #f9f9fc;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 100vh;
`;

const App = () => (
  <GridLayout container>
    <Grid item md={5} xs={12}>
      <SideBar />
    </Grid>
    <Grid item md={7} xs={12}>
      <MapContainer>
        <ContainerDimensions>
          <Map />
        </ContainerDimensions>
      </MapContainer>
    </Grid>
  </GridLayout>
);
export default App;