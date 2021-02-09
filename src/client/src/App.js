import React, {Component} from 'react';
import './App.css';

import { Anchor, Nav, Button, Grommet, Header, Box, Markdown, Main, Heading, Paragraph, Select, Layer } from 'grommet';
import { grommet } from 'grommet/themes';
import CustomEntryCard from './CustomEntryCard';
import { MapContainer, GeoJSON } from "react-leaflet";
import mapData from "./mapdata/countries.json";
import "leaflet/dist/leaflet.css"



class App extends Component {
  state = {
    locationList: [],
    locationSearchRes: [],
    entry1: [],
    entry2: [],
    setShowResults: false,
    result: [],
    showCustomEntry: false,
    decimalBlurb: false
  }

  countryStyle = {
    fillColor: "purple",
    fillOpacity: 1,
    color: "black",
    weight: 1
  };

  getResponse = async() => {
    const response = await fetch('http://localhost:5000/locations');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);

    return body;
  }

  onEachLocation = (location, layer) => {
    console.log(location.properties.ADMIN);
  }

  onCalculate = () => {
    if(this.state.entry1.area && this.state.entry2.area){
      var temp = this.state.entry2.area / this.state.entry1.area;
      if(temp % 1 !== 0){
        this.setState({decimalBlurb: true});
      }      
    }
    this.setState({ result: temp,
      locationList: this.state.locationSearchRes,
      showResults: true });
  }

  setShow = (x) => {
    this.setState({showCustomEntry: x})
  }

  componentDidMount() {
    this.getResponse()
      .then(res => {
        this.setState({ 
        locationList: res,
        locationSearchRes: res
        });
      })
  }

  render() {
    const {locationList, locationSearchRes, entry1, entry2, result, showCustomEntry, showResults, decimalBlurb} = this.state;
    const texas = locationList.find(o => o.name === 'Texas');
    console.log(texas)
    return (
      <Grommet theme={grommet}>
        <div className="App">
          <Header className="App-header" pad="small" align="center">
            <Nav direction="row">
              <Anchor label="Home" href="#" />
              <Anchor label="Countries" href="#" />
            </Nav>
            <Paragraph>this is using the mercator projection.</Paragraph>
            <Box align="center">
              <Markdown alignSelf="center">how many texases?</Markdown>
            </Box>
          </Header>
          
          <Main pad="large">
            <Box>
            <div className="map-container" style={{height: '30%'}}>
                <MapContainer style={{ height: "60vh" }} zoom={5} minZoom={2} center={[31, -100]} >
                  <GeoJSON
                    style={this.countryStyle}
                    data={mapData.features}
                    onEachFeature={this.onEachLocation}
                  />
                </MapContainer>
            </div>
            </Box>
            <Box>
              <Heading>Have you ever wondered...</Heading>
            </Box>
            <Box direction="row">
              <div>
                <Paragraph>How many times could</Paragraph>
              </div>
              <div>
                <Select
                  options={locationList}
                  labelKey="name"
                  valueKey="area"
                  value={entry1.length < 1 ? texas : entry1}
                  size="xsmall"
                  margin="small"
                  onSearch={(searchText) => {
                    const regexp = new RegExp(searchText, 'i');
                    this.setState({ locationList: locationList.filter(o => o.name.match(regexp)) });
                  }}
                  onChange={event => this.setState({
                    entry1: event.value,
                    locationList: locationSearchRes,
                    showResults: false,
                    decimalBlurb: false
                  })}
                />
              </div>
              <div>
                <Paragraph>fit into</Paragraph>
              </div>
              <div>
                <Select
                  options={locationList}
                  labelKey="name"
                  valueKey="area"
                  value={entry2}
                  size="xsmall"
                  margin="small"
                  onSearch={(searchText) => {
                    const regexp = new RegExp(searchText, 'i');
                    this.setState({ locationList: locationList.filter(o => o.name.match(regexp)) });
                  }}
                  onChange={ev => this.setState({
                    entry2: ev.value,
                    locationList: locationSearchRes,
                    showResults: false,
                    decimalBlurb: false
                  })}
                />
              </div>
              
              <Paragraph>?</Paragraph>
              <Button primary margin="small" size="small" label="Calculate" onClick={this.onCalculate} />
              <Button primary margin="small" size="small" label="Custom Entry" onClick={() => this.setShow(true)} />
              {showCustomEntry ? 
                <Layer
                    onEsc={() => this.setShow(false)}
                    onClickOutside={() => this.setShow(false)}
                >
                    <CustomEntryCard> </CustomEntryCard>
                  </Layer>
                  : null
                }
            </Box>
            <Box>
              { showResults ? 
                <Heading background="neutral"> {entry1.name} could fit into {entry2.name} {Math.floor(result)} times!</Heading>
              : null }
              {decimalBlurb ? <Heading>({Math.round((result) * 100) /100} times to be exact.)</Heading> : null}
            </Box>
          </Main>
        </div>
      </Grommet>
    );
  }
}

export default App;
