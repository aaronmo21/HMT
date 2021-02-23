import { MapControl, withLeaflet } from "react-leaflet";
import L from "leaflet";
import { RadioButtonGroup } from 'grommet';

class Legend extends MapControl {
  createLeafletElement(props) {}

  componentDidMount() {
    const legend = L.control({ position: "bottomright" });

    legend.onAdd = () => {
      const div = L.DomUtil.create("div", "info legend");
      let labels = [];
      labels.push(
        '<button>button1</button><button>button1</button>'
      );

      div.innerHTML = labels.join("<br>");
      return div;
    };

    const { map } = this.props.leaflet;
    legend.addTo(map);
  }

  render(){
    return(
      <RadioButtonGroup
          name="doc"
          options={[1, 2]}
          value={1}
          onChange={(event) => this.props.radioLocation(event.target.value)}
      />
    )
  }
  
}

export default withLeaflet(Legend);
