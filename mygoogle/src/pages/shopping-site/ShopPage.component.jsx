import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SHOP_DATA from '../../data/shop.data'
import CollectionPreview from '../../components/shopping-site/preview-collection/preview-collection.component'

export default class ShopPage extends Component {
    static propTypes = {
        prop: PropTypes
    }

    constructor(props){
        super(props);
        this.state = {
            collections: SHOP_DATA
        };
    }

    render() {
        const {collections} = this.state;
        return (<div className='shop-page'>
               {
                   collections.map(({id, ...otherProps}) => (
                       <CollectionPreview key={id} {...otherProps}/>
                   ))
               }
            </div>
        )
    }
}
