import React, { useState } from 'react';
import styled from 'styled-components';
import ContainerDimensions from 'react-container-dimensions';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import BarChart from './BarChart';
import DonutChart from './DonutChart';
import CheckboxFilters from './CheckboxFilters';

const DesktopContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr 4fr;
  width: auto;
  height: 100vh;
`;
const MobileContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
`;

const TileView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: auto;
  padding: 16px 16px 16px 16px;
  overflow-y: auto;
`;

const Tile = styled.div`
  background: white;
  width: 100%;
  height: auto;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-radius: 4px;
  box-shadow: 4px 8px 16px rgba(0,0,0,0.07);
`;

const TitleContainer = styled.div`
  margin: 12px 16px 16px 16px;
  text-align: left;
`;

const SideBarTitle = styled.div`
  overflow-wrap: break-word;
  color: #081217;
  font-size: 64px;
  font-weight: 700;
`;

const TileTitle = styled.div`
  width: auto;
  overflow-wrap: break-word;
  margin: 16px 16px 0px 16px;
  color: #081217;
  font-size:24px;
  font-weight: 600;
`;

const TileSubtitle = styled.div`
  width: auto;
  overflow-wrap: break-word;
  margin: 0px 16px 0px 16px;
  color: #7f8fa2;
  font-size: 16px;
  font-weight: 600;
`;

const ChartContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
`;

const FilterContainer = styled.div`
  margin-left: 32px;
`;

const getRoadwayData = () => {
  const roadWayData = require('../data/predictions.json');
  return roadWayData.data;
}

const getZoneData = () => {
  const zoneData = require('../data/zone_count.json');
  
  return zoneData.data.map(({label, value}) => ({
    value,
    label,
  }));
}

const isolateAtrribute = (arr, key) => {
  return arr.map(row => row[key]);
}

const SideBar = () => {
  const [roadWayData] = useState(getRoadwayData());
  const [zoneData] = useState(getZoneData());

  const theme = useTheme();
  const isDesktopView = useMediaQuery(theme.breakpoints.up('md'));
  
  const renderBody = () => (
    <>
      <TitleContainer>
        <SideBarTitle>
          Jax Crash Report
        </SideBarTitle>
      </TitleContainer>
      <TileView>
        <Tile>
          <TileTitle>RoadWays</TileTitle>
          <TileSubtitle>Predicted number of crashes per roadway.</TileSubtitle>
          <ChartContainer>
            <ContainerDimensions>
              {({width}) => (
                <DonutChart
                  series={isolateAtrribute(roadWayData, 'value')}
                  labels={isolateAtrribute(roadWayData, 'label')}
                  width={width}
                />
              )}
            </ContainerDimensions>
          </ChartContainer>
        </Tile>
        <Tile>
          <TileTitle>Zones</TileTitle>
          <TileSubtitle>Actual number of crashes per zone.</TileSubtitle>
          <ChartContainer>
            <ContainerDimensions>
              {({width}) => (
                <BarChart
                  series={isolateAtrribute(zoneData, 'value')}
                  labels={isolateAtrribute(zoneData, 'label')}
                  width={width}
                />
              )}
            </ContainerDimensions>
          </ChartContainer>
        </Tile>
        <Tile>
          <TileTitle>Filters</TileTitle>
          <TileSubtitle>Filter the crash zones by probability.</TileSubtitle>
          <FilterContainer>
            <CheckboxFilters />
          </FilterContainer>
        </Tile>
      </TileView>
    </>
  );
  
  if (isDesktopView) {
    return (
      <DesktopContainer>
        {renderBody(isDesktopView)}
      </DesktopContainer>
    );
  }

  return (
    <MobileContainer>
      {renderBody(isDesktopView)}
    </MobileContainer>
  );
}

export default SideBar;
