import React from 'react';
import ReactDOM from 'react-dom';
import L from 'leaflet';
import { MapControl, withLeaflet } from 'react-leaflet';
import { RadioButtonGroup, Box } from 'grommet';

class RadioLocationSelect extends MapControl {
  createLeafletElement(props) {}
  componentWillMount() {
    const control = L.control({position: 'bottomright'});
    const options = [
      {"label":"First location", "value": 1},
      {"label":"Second location", "value": 2}
    ]
    const jsx = (
      <Box background="light-3" pad="10px">
        <RadioButtonGroup
          name="locationSelector"
          options={options}
          onChange={(event) => this.props.radioLocation(event.target.value)}
        />
      </Box>
      
    );

    control.onAdd = function (map) {
      let div = L.DomUtil.create('div', '');
      ReactDOM.render(jsx, div);
      return div;
    };

    this.leafletElement = control;
  }
}

export default withLeaflet(RadioLocationSelect);