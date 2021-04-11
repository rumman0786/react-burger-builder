import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/aux';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        
        constructor(props){
            super(props);

            this.state = {
                error: null
            };

            axios.interceptors.request.use(request => {
                this.setState({error: null});
                return request;
            });

            axios.interceptors.response.use(null, error => {
                this.setState({error: error});
            });
        }

        errorHandler = () => {
            this.setState({error: null});
        }

        render() {
            return (
                <Aux>
                    <Modal 
                        showSummary={this.state.error}
                        backdropHandler={this.errorHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Aux>
            );    
        }
    }    
};

export default withErrorHandler;