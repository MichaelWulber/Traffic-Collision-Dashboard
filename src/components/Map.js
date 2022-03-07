import React from 'react';
import { useSelector } from 'react-redux';
import DeckGL from '@deck.gl/react';
import { PathLayer } from '@deck.gl/layers';
import { MapView } from '@deck.gl/core';
import { StaticMap } from 'react-map-gl';
import { v4 as uuid } from 'uuid';
import { get } from 'lodash'

import { 
  default_viewport,
  mapbox_token,
  color_palette,
} from '../config';
const actual_v_prediction = require('../data/actual_v_prediction.json');

const getPathLayer = (lineData, filter, color) => {
  const pathCoords = get(lineData, `data.coordinates.${filter}`, []);
  const pathData = pathCoords.reduce((prev, curr) => {
    const coordinates = get(curr, 'shape.coordinates', []);
    const zoneName = get(curr, 'zone_name', '');
    const data = {
      path: coordinates,
      name: zoneName,
      color: color,
    }
    return [...prev, data];
  }, []);

  return new PathLayer({
    data: pathData,
    id: uuid(),
    pickable: true,
    widthScale: 20,
    widthMinPixels: 2,
    getPath: d => d.path,
    getColor: d => d.color,
    getWidth: d => 5
  });
}

const Map = () => {
  const filters = useSelector(state => state.filters);
  const layers = Object.keys(filters).reduce((prev, key) => {
    if (filters[key]) {
      return [
        ...prev,
        getPathLayer(actual_v_prediction, key, color_palette[key])
      ]
    }
    return prev;
  }, []);

  return (
    <DeckGL
      initialViewState={ default_viewport }
      controller={ true }
      layers={ layers }
    >
      <MapView 
        id="map"
        controller={true}
      >
        <StaticMap
          mapboxApiAccessToken={ mapbox_token }
          mapStyle="mapbox://styles/wulbermichael/ckefpb7s923b219ki1cy2xom0"
        />
      </MapView>
    </DeckGL>
  );
};

export default Map;