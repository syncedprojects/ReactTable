import React from 'react';
import Paginator from './Paginator';
import SortableTableRows from './SortableTableRows';

class SortableTable extends React.Component {

    constructor( props ) {

        super( props );

        this.state = {
            items: this.props.items,
            foundItems: this.props.items,
            itemsToShow: this.props.items,
        };

        this.handleSorting = this.handleSorting.bind( this );
        this.handleSearch = this.handleSearch.bind( this );
        this.onPageChanged = this.onPageChanged.bind( this );
    }

    performSort( items, orderBy, order ) {

        var sortedItems = items;

        if ( orderBy == 'productName' && order == 'ASC' ) {

            sortedItems = sortedItems.sort( function( a, b ) {

                var nameA = a.name.toLowerCase();
                var nameB = b.name.toLowerCase();

                return ( nameA > nameB );
            } );
        }
        else if ( orderBy == 'productName' && order == 'DESC' ) {

            sortedItems = sortedItems.sort( function( a, b ) {

                var nameA = a.name.toLowerCase();
                var nameB = b.name.toLowerCase();

                return ( nameA < nameB );
            } );
        }
        else if ( orderBy == 'productPrice' && order == 'ASC' ) {

            sortedItems = sortedItems.sort( function( a, b ) {

                return ( a.price - b.price );
            } );
        }
        else if ( orderBy == 'productPrice' && order == 'DESC' ) {

            sortedItems = sortedItems.sort( function( a, b ) {

                return ( b.price - a.price );
            } );
        }

        return sortedItems;
    }

    handleSorting( orderBy, order ) {

        var sortedItems = this.performSort( this.state.items, orderBy, order );
        var foundItems  = this.performSort( this.state.foundItems, orderBy, order );

        this.setState( {
            items: sortedItems,
            foundItems: foundItems.slice(),
        } );
    }

    handleSearch( e ) {

        var foundItems = [];

        var tempSearchQuery = e.target.value.toLowerCase();

        for ( var i = 0; i < this.state.items.length; i++ ) {

            if ( this.state.items[ i ].name.toLowerCase().indexOf( tempSearchQuery ) !== -1 ) {

                foundItems.push( this.state.items[ i ] );
            }
        }

        this.setState( {
            foundItems: foundItems,
        } );
    }

    onPageChanged( items ) {
        
        this.setState( {
            itemsToShow: items,
        } );
    }

    render() {

        return (
            <div className="table-responsive">
                <h4>{ `Cортируемая таблица с поддержкой фильтрации и пагинации` }</h4>
                <table className="table table-condensed">
                    <thead>
                        <tr>
                            <th>
                                { `Название продукта` }
                                <button className="btn btn-xs btn-default sorting-button" type="button" onClick={ ( e ) => this.handleSorting( 'productName', 'ASC', e ) }>&uarr;</button>
                                <button className="btn btn-xs btn-default sorting-button" type="button" onClick={ ( e ) => this.handleSorting( 'productName', 'DESC', e ) }>&darr;</button>
                            </th>
                            <th>
                                { `Цена` }
                                <button className="btn btn-xs btn-default sorting-button" type="button" onClick={ ( e ) => this.handleSorting( 'productPrice', 'ASC', e ) }>&uarr;</button>
                                <button className="btn btn-xs btn-default sorting-button" type="button" onClick={ ( e ) => this.handleSorting( 'productPrice', 'DESC', e ) }>&darr;</button>
                            </th>
                        </tr>
                        <tr>
                            <th colSpan="2">
                                <input type="text" placeholder={ `Поиск...` } onKeyUp={ this.handleSearch } />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <SortableTableRows items={ this.state.itemsToShow } />
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="2">
                                <Paginator items={ this.state.foundItems } onPageChanged={ this.onPageChanged } />
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        );
    }
};

export default SortableTable;