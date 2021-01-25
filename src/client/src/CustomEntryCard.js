import React, { Component } from 'react';
import { Card, CardBody, CardFooter, CardHeader, Button, Form, FormField, TextInput, Box } from 'grommet';


 class CustomEntryCard extends Component {
    state = { 
        value: {
            id: '',
            name: '',
            area: '',
            type: '',
            continent: ''
        }
    }

    setValue = (value) => {
        this.setState({value});
    }

    submitHandler = e => {
        e.preventDefault();
        console.log(this.state.value);
        console.log(JSON.stringify(this.state.value));
        fetch('http://localhost:5000/locations', {
            method: 'post',
            body: JSON.stringify(this.state.value),
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.status >= 200 && response.status < 300) {
                console.log(response);
                return response;
              } else {
               console.log('Somthing happened wrong');
              }
        }).catch(err => err);
        this.setValue({
            id: '',
            name: '',
            area: '',
            type: '',
            continent: ''
        });
    }

    changeHandler = e => {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
    const { value } = this.state;
    return (
        <Card  height="medium" align="center" width="large" background="light-1">
            <CardHeader background="light-3" pad="medium">Custom Entry</CardHeader>
            <CardBody pad="medium">
                <Form
                    value={value}
                    onChange={nextValue => this.setValue(nextValue)}
                    onReset={() => this.setValue({})}
                    onSubmit={this.submitHandler}
                >
                    <Box direction="row" gap="medium">
                    <FormField name="id" htmlFor="id-input" label="ID">
                        <TextInput id="id-input-id" name="id"  />
                    </FormField> 
                    <FormField name="name" htmlFor="name-input" label="Name">
                        <TextInput id="name-input-id" name="name" />
                    </FormField> 
                    <FormField name="area" htmlFor="area-input" label="Area (in square mi.)">
                        <TextInput id="area-input-id" name="area" />
                    </FormField>
                    </Box>

                    <Box direction="row" gap="medium">
                    <FormField name="type" htmlFor="type-input" label="Type (state or country)">
                        <TextInput id="type-input-id" name="type" />
                    </FormField>
                    <FormField name="continent" htmlFor="continent-input" label="Continent">
                        <TextInput id="continent-input-id" name="continent" />
                    </FormField>
                    </Box>

                    <Box direction="row" align="center" gap="medium">
                        <Button type="submit" primary label="Submit" />
                        <Button type="reset" label="Reset" />
                    </Box>
                </Form>
            </CardBody>
            <CardFooter pad={{horizontal: "small"}} background="light-2">   
            </CardFooter>
        </Card>
    );
    }
}

export default CustomEntryCard;