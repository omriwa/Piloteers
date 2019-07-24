import React, { ChangeEvent } from 'react';
import axios from 'axios';

interface ILocation {
    name: string;
    latitude: number,
    longitude: number,
    additional?: any
}

interface IAppProps { }

interface IAppState {
    fetchedLocations: ILocation[] | null;
    locationToUpload: ILocation;
    error: string;
    additionalLocationInformation: any;
    additionalKey: string;
    addtionalValue: string;

}

class App extends React.Component<IAppProps, IAppState>{
    constructor(props: Readonly<IAppProps>) {
        super(props);

        this.state = {
            fetchedLocations: null,
            locationToUpload: {
                name: '',
                latitude: 0,
                longitude: 0,
                additional: null
            },
            error: '',
            additionalLocationInformation: {},
            additionalKey: '',
            addtionalValue: ''
        }
    }

    componentDidMount() {
        // fetch locations from server
        if (!this.state.fetchedLocations) {
            this.getLocationsFromApi();
        }
    }

    private getLocationsFromApi = () => {
        axios.get('http://localhost:8080/api/locations')
            .then(result => {
                this.setState({ error: result.status === 200 ? '' : 'There was fetch problem in the server' });

                return result.data;
            })
            .then(fetchedLocations => this.setState({ fetchedLocations }))
            .catch(e => {
                alert('fetch problem from client, please check console');
                console.log('fetch problem by client', e);
            });
    }

    private renderLocations = () => {
        if (this.state.fetchedLocations) {
            return this.state.fetchedLocations.map((location: any, locationIndex) => <div
                className='location-section'
                key={locationIndex}
            >
                {
                    Object.keys(location).map((key,keyIndex) => <div key={keyIndex + '-' + locationIndex}>
                        <label>{key}</label>
                        <span>{location[key]}</span>
                    </div>)
                }
            </div>)
        }
    }

    private onChangeLocationFormInput = (e: ChangeEvent<HTMLInputElement>, key: string) => {
        const locationToUpload = { ...this.state.locationToUpload };
        // change the value according to key
        (locationToUpload as any)[key] = e.target.value;
        // update state
        this.setState({ locationToUpload })
    }

    private uploadLocation = () => {
        axios.post('http://localhost:8080/api/locations', { locationData: this.state.locationToUpload })
            .then(result => {
                result.status === 200 ? this.getLocationsFromApi() : this.setState({ error: 'could not write data in server' });
            })
            .catch(e => {
                console.log('error in upload data file', e);
            })
    }

    private renderLocationForm = () => {
        const locationToUpload = { ...this.state.locationToUpload };

        delete locationToUpload.additional

        return <div>
            <form>
                {
                    Object.keys(locationToUpload)
                        .map(key => <div key={this.state.locationToUpload + '-' + key}>
                            <label>{key} :</label>
                            <input
                                required
                                type={typeof (this.state.locationToUpload as any)[key]}
                                value={(this.state.locationToUpload as any)[key]}
                                onChange={e => this.onChangeLocationFormInput(e,key)}
                            />
                        </div>)
                }
                <button
                    onClick={this.uploadLocation}
                >
                    upload
                    </button>
            </form>
        </div>
    }

    private onChangeAddtionalKey = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({ additionalKey: e.target.value });
    }

    private onChangeAddtionalValue = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({ addtionalValue: e.target.value });
    }

    private addAdditionalKeyAndValue = () => {
        const additionalLocationInformation = { ...this.state.additionalLocationInformation };
        // add additional value and key
        additionalLocationInformation[this.state.additionalKey] = this.state.addtionalValue;
        // clear addtional value and keys
        this.setState({
            additionalLocationInformation,
            additionalKey: '',
            addtionalValue: ''
        });
    }

    private renderAddtionalArea = () => {
        // render the addition data entries
        return <div className='additional-area'>
            <label>key name:</label>
            <input
                value={this.state.additionalKey}
                onChange={this.onChangeAddtionalKey}
            />
            <label>value:</label>
            <input
                value={this.state.addtionalValue}
                onChange={this.onChangeAddtionalValue}
            />
            <button
                onClick={this.addAdditionalKeyAndValue}
            >
                Add
                </button>
            {
                Object.keys(this.state.additionalLocationInformation)
                    .map(key => <div key={this.state.additionalLocationInformation + '-' + key}>
                        <label>key: </label>
                        <input
                            value={key}
                        />
                        <label>value: </label>
                        <input
                            value={(this.state.additionalLocationInformation as any)[key]}
                        />
                    </div>)
            }
        </div>
    }
    
    render() {
        return <div className='content'>
            <section>
                {this.renderLocations()}
            </section>
            <section>
            {this.renderLocationForm()}
                {this.renderAddtionalArea()}
            </section>
        </div>
    }
}

export default App;
