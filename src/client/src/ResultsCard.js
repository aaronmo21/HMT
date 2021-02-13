import React, { Component } from 'react';
import { Card, CardBody, CardFooter, CardHeader, Button, Form, FormField, TextInput, Box, Select, Heading } from 'grommet';


class ResultsCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }
    
    render() {
        return (
            <div>
                <Card height="medium" align="center" width="large" background="light-1">
                    <CardHeader background="light-3" pad="medium">Results</CardHeader>
                    <CardBody pad="medium">
                        <Heading background="neutral"> {this.props.entry1.name} could fit into {this.props.entry2.name} {Math.floor(this.props.result)} times!</Heading>
                        {this.props.decimalBlurb ? <Heading>({Math.round((this.props.result) * 100) /100} times to be exact.)</Heading> : null}
                    </CardBody>
                    <CardFooter pad={{horizontal: "small"}} background="light-2"> 
                    </CardFooter>
                </Card>

            </div>
        );
    }
}

export default ResultsCard;