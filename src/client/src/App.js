import React, {Component} from 'react';
import './App.css';
import { Anchor, Nav, Button, Grommet, Header, Box, Markdown, Main, Heading, Paragraph, Select, Layer } from 'grommet';
import { grommet } from 'grommet/themes';
import CustomEntryCard from './CustomEntryCard';
import { Map, GeoJSON } from "react-leaflet";
import mapData from "./mapdata/countries.json";
import "leaflet/dist/leaflet.css"
import ResultsCard from './ResultsCard';
import Legend from './Legend'


class App extends Component {
  constructor(props){
    super(props);
    this.highlightLocation = this.highlightLocation.bind(this);
    this.state = {
      locationList: [],
      locationSearchRes: [],
      entry1: [],
      entry2: [],
      setShowResults: false,
      result: [],
      showCustomEntry: false,
      decimalBlurb: false,

    }
  }
  

  countryStyle = {
    fillColor: "#7D4CDB",
    fillOpacity: 1,
    color: "black",
    weight: 1
  };

  //require 2 selections lmao wtf

  //lastClicked variable when nextClicked = lastClicked undo selection
  //when nextClicked != lastClicked 

  //states: 0 to firstSelection, firstSelection to secondSelection, secondSelection to ready
  //


  getResponse = async() => {
    const response = await fetch('http://localhost:5000/locations');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);

    return body;
  }

  highlightLocation = (event) => {
    event.target.setStyle({
      color: "#66ff00",
      fillColor: "#6FFFB0"
    })
    console.log(this.state.locationList);
    let mapClickedlocation1 = this.state.locationList.find(o => o.name === event.target.feature.properties.ADMIN);
    this.setState({entry1: mapClickedlocation1})
  }

  onEachLocation = (location, layer) => {
    const locationName = location.properties.ADMIN;
    //console.log(location.properties.ADMIN);
    layer.bindPopup(locationName);

    layer.on({
      mouseover: (event) => {
        layer.bindPopup(event.target.feature.properties.ADMIN);
      },
      click: this.highlightLocation
    })
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
    this.setState({showCustomEntry: x, showResults: x})
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
              <Markdown align="center">how many texases?</Markdown>
            </Box>
          </Header>
          
          <Main pad="large">
            <Box>
            <div className="map-container" style={{height: '30%'}}>
                <Map className="bottom-layer" style={{ height: "60vh" }} zoom={5} minZoom={2} center={[31, -100]} >
                  <GeoJSON
                    style={this.countryStyle}
                    data={mapData.features}
                    onEachFeature={this.onEachLocation}
                  />
                  <Legend />
                </Map>
            </div>
            </Box>
            <Box>
              <Heading>have u ever wondered...</Heading>
            </Box>
            <Box direction="row">
              <div>
                <Paragraph>...how many times could</Paragraph>
              </div>
              <div>
                <Select
                  className="top-menu"
                  options={locationList}
                  labelKey="name"
                  valueKey="area"
                  value={entry1} //.length < 1 ? texas : entry1}
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
                  className="top-menu"
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
              <Layer
                onEsc={() => this.setShow(false)}
                onClickOutside={() => this.setShow(false)}
              >
                <ResultsCard entry1={entry1} entry2={entry2} result={result} decimalBlurb={decimalBlurb} />
              </Layer>
              : null }
            </Box>
          </Main>
        </div>
      </Grommet>
    );
  }
}

export default App;
