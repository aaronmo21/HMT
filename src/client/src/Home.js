import React, {Component} from 'react';
import './App.css';
import { Anchor, Nav, Button, Grommet, Header, Box, Markdown, Main, Heading, Paragraph, Select, Layer, RadioButtonGroup } from 'grommet';
import { grommet } from 'grommet/themes';
import CustomEntryCard from './CustomEntryCard';
import { Map, GeoJSON } from "react-leaflet";
import mapData from "./mapdata/countries.json";
import "leaflet/dist/leaflet.css"
import ResultsCard from './ResultsCard';
import RadioLocationSelect from './RadioLocationSelect'


class Home extends Component {
  constructor(props){
    super(props)
    this.selectLocation = this.selectLocation.bind(this);
    this.radioLocation = this.radioLocation.bind(this);
    this.state = {
      locationList: [],
      locationSearchRes: [],
      entry1: [],
      entry2: [],
      result: [],
      showCustomEntry: false,
      decimalBlurb: false,
      locationSelection: 0,
      prevSelection1: [],
      prevSelection2: [],
      unit: ''
    }
  }
  
  countryStyle = {
    fillColor: "#7D4CDB",
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

  radioLocation = (x) => {
    this.setState({ locationSelection: x });
  }

  //CONSOLIDATE THIS FUNCTION
  selectLocation = (event) => {
    //check which location is being selected
    if(this.state.locationSelection === '1'){
      //check previous target, to change colors
      if(this.state.prevSelection1.target !== undefined){
        this.state.prevSelection1.target.setStyle({
          color: "black",
          fillColor: "#7D4CDB"
        })
      }
      //set the previous selection to the current selection
      this.setState({prevSelection1: event})
      event.target.setStyle({
        color: "#66ff00",
        fillColor: "#6FFFB0"
      })
      //fill select box with selection
      let mapClickedlocation1 = this.state.locationList.find(o => o.name === event.target.feature.properties.ADMIN);
      this.setState({entry1: mapClickedlocation1})
    }
    //same logic, for selection 2
    else if(this.state.locationSelection === '2'){
      if(this.state.prevSelection2.target !== undefined){
        this.state.prevSelection2.target.setStyle({
          color: "black",
          fillColor: "#7D4CDB"
        })
      }
      this.setState({prevSelection2: event})
      event.target.setStyle({
        color: "#3D138D",
        fillColor: "#FD6FFF"
      })
      let mapClickedlocation2 = this.state.locationList.find(o => o.name === event.target.feature.properties.ADMIN);
      this.setState({entry2: mapClickedlocation2})
    }   
  }

  onEachLocation = (location, layer) => {
    const locationName = location.properties.ADMIN;
    layer.bindPopup(locationName);

    layer.on({
      mouseover: (event) => {
        const locationNameMouse = event.target.feature.properties.ADMIN;
        layer.bindPopup(locationNameMouse);
      },
      click: this.selectLocation
    })
  }

  onCalculate = () => {
    if(this.state.entry1.area && this.state.entry2.area){
      var temp = this.state.entry2.area / this.state.entry1.area;
      if(temp % 1 !== 0){
        this.setState({decimalBlurb: true});
      }      
    }
    this.setState({ 
      result: temp,
      locationList: this.state.locationSearchRes,
      showResults: true });
  }

  setRadioValue = (x) => {
    this.setState({unit: x})
  }

  setShow = (menu, x) => {
    if(menu === 'customEntry'){
      this.setState({showCustomEntry: x,})
    }
    else if(menu === 'results'){
      this.setState({showResults: x})
    }
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
    return (
      //<Grommet theme={grommet}>
        <div>
          {/* <Header className="App-header" pad="small" align="center">
            <Nav direction="row">
              <Anchor label="Home" href="#" />
              <Anchor label="Custom Entry" onClick={() => this.setShow('customEntry', true)} />
            </Nav>
            <Paragraph>this is using the mercator projection.</Paragraph>
            <Box align="center">
              <Markdown align="center">how many texases?</Markdown>
            </Box>
          </Header> */}
          
          <Main pad="large">
            <div className="map-container" style={{height: '30%'}}>
                <Map className="bottom-layer" style={{ height: "60vh" }} zoom={5} minZoom={2} center={[31, -100]} >
                  <GeoJSON
                    style={this.countryStyle}
                    data={mapData.features}
                    onEachFeature={this.onEachLocation}
                  />
                  <RadioLocationSelect radioLocation={this.radioLocation} />
                </Map>
            </div>
            <div className="main-content">
              <Heading>have you ever wondered...</Heading>
            </div>
            <div className="main-content">
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
              {/* <div className="main-content" >
                <RadioButtonGroup 
                  pad="10px"
                  gap="3px"
                  name="units"
                  options={['mi', 'km']}
                  onChange={(event) => this.setRadioValue(event.target.value)}
                />
              </div> */}
              <Button primary margin="small" size="small" label="Calculate" disabled={(entry1 === undefined || entry1.length < 1) || (entry2 === undefined || entry2.length < 1) ? true : false} onClick={this.onCalculate} />
              {showCustomEntry ? 
                <Layer
                    onEsc={() => this.setShow('customEntry', false)}
                    onClickOutside={() => this.setShow('customEntry', false)}
                >
                    <CustomEntryCard> </CustomEntryCard>
                  </Layer>
                  : null
                }
            </div>
            <Box>
              { showResults ?
              <Layer
                onEsc={() => this.setShow('results', false)}
                onClickOutside={() => this.setShow('results', false)}
              >
                <ResultsCard entry1={entry1} entry2={entry2} result={result} decimalBlurb={decimalBlurb} />
              </Layer>
              : null }
            </Box>
          </Main>
        </div>
      //</Grommet>
    );
  }
}

export default Home;
