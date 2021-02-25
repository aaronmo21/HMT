import React, { Component } from 'react';
import { Anchor, Nav, Header, Box, Markdown, Paragraph } from 'grommet';


class Navbar extends Component {
    render() {
        return (
            <div>
                <Header className="App-header" pad="small" align="center">
                    <Nav direction="row">
                        <Anchor label="Home" href="/" />
                        <Anchor label="Locations" href="/LocationsPage" />
                        <Anchor label="Custom Entry" onClick={() => this.setShow('customEntry', true)} />
                    </Nav>
                    <Paragraph>this is using the mercator projection.</Paragraph>
                    <Box align="center">
                        <Markdown align="center">how many texases?</Markdown>
                    </Box>
                </Header>
            </div>
        );
    }
}

export default Navbar;