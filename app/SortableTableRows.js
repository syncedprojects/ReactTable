import React from 'react';
import numeral from 'numeral';

const SortableTableRows = ( props ) => {

    const listItems = props.items.map( ( item, index ) =>
        <tr key={ index }>
            <td>
                { item.name }
            </td>
            <td>
                { numeral( item.price ).format( '0,0' ).replace( /,/g, ' ' ) } UZS
            </td>
        </tr>
    );
    
    return (
        listItems
    );
};

export default SortableTableRows;