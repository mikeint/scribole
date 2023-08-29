import React from 'react';
import './Punk.scss';

const Punk = (prop) => { 

    return (
        <div className='punkContainer'>
            <img src={prop.punk} alt={"introPunk"}/>
        </div>
    )
}

export default Punk;