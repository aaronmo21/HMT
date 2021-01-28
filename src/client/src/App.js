import React, {Component} from 'react';
import './App.css';

import { Anchor, Nav, Button, Grommet, Header, Box, WorldMap, Main, Heading, Paragraph, Select, Layer } from 'grommet';
import { grommet } from 'grommet/themes';
import CustomEntryCard from './CustomEntryCard';



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

  getResponse = async() => {
    const response = await fetch('http://localhost:5000/locations');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);

    return body;
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
              <Anchor label="Profile" href="#" />
            </Nav>
            <Box align="center">
              <Paragraph alignSelf="center">Call out to API!</Paragraph>
            </Box>
          </Header>
          
          <Main pad="large">
            <div className="map-container" style={{height: '50%'}}>
              <Box direction="row-responsive" align="center">
                <WorldMap color="graph-1" margin="small" align="center"/>
              </Box>
            </div>
            <Box>
              <Heading>HMT</Heading>
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
