import React, { Component } from 'react';
import Title from '../title/Title';

class Header extends Component {
    render() {
        return (
            <div className='text-center'>
                <span className='display-4 fw-bold'>
                    ¡Bienvenido!
                </span>
                <br />
                <Title/>
            </div>
        );
    }
}

export default Header;