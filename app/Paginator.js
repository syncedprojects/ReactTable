import React from 'react';

class Paginator extends React.Component {

    constructor( props ) {

        super( props );

        this.state = {
            total: this.props.items.length,
            perPage: 10,
            page: 1,
        }

        this.onClick = this.onClick.bind( this );
    }

    // https://gist.github.com/kottenator/9d936eb3e4e3c3e02598
    getPaginationLinks( c, m ) {

        let current = c,
            last = m,
            delta = 2,
            left = current - delta,
            right = current + delta + 1,
            range = [],
            rangeWithDots = [],
            l;

        for ( let i = 1; i <= last; i++ ) {

            if ( i == 1 || i == last || i >= left && i < right ) {
            
                range.push( i );
            }
        }

        for ( let i of range ) {

            if ( l ) {

                if ( i - l === 2 ) {

                    rangeWithDots.push( l + 1 );
                }
                else if ( i - l !== 1 ) {

                    rangeWithDots.push( '...' );
                }
            }

            rangeWithDots.push( i );
            
            l = i;
        }

        return rangeWithDots;
    }

    componentDidMount() {

        const paginatedItems = [];

        for ( var i = ( this.state.page - 1 ) * this.state.perPage; i < this.state.page * this.state.perPage; i++ ) {

            if ( this.props.items.hasOwnProperty( i ) ) {

                paginatedItems.push( this.props.items[ i ] );
            }
        }

        this.props.onPageChanged( paginatedItems );
    }

    onClick( page ) {

        this.setState( {
            page: page,
        } );

        const paginatedItems = [];

        for ( var i = ( page - 1 ) * this.state.perPage; i < page * this.state.perPage; i++ ) {

            if ( this.props.items.hasOwnProperty( i ) ) {

                paginatedItems.push( this.props.items[ i ] );
            }
        }

        this.props.onPageChanged( paginatedItems );
    }
    
    componentDidUpdate( prevProps ) {

        if ( this.props.items !== prevProps.items ) {

            const paginatedItems = [];

            for ( var i = ( 1 /*this.state.page*/ - 1 ) * this.state.perPage; i < 1 /*this.state.page*/ * this.state.perPage; i++ ) {

                if ( this.props.items.hasOwnProperty( i ) ) {

                    paginatedItems.push( this.props.items[ i ] );
                }
            }

            this.setState( {
                page: 1,
                total: this.props.items.length,
            } );

            this.props.onPageChanged( paginatedItems );
        }
    }

    render() {

        var pagesCount = parseInt( this.state.total / this.state.perPage );
        
        if ( this.state.total % this.state.perPage > 0 ) {

            pagesCount++;
        }

        if ( pagesCount < 2 ) {

            return (
                null
            );
        }
        
        const pages = this.getPaginationLinks( this.state.page, pagesCount );

        return (
            pages.map( ( p, index ) =>
    
                ( ! isNaN( parseInt( p ) ) ) ?
                    <a className={ ( this.state.page == p ) ? 'current' : '' } role="button" key={ index } onClick={ ( e ) => this.onClick( p, e ) }>[ { p } ]</a>
                    :
                    <a role="button" key={ index }>[ { p } ]</a>
            )
        );
    }
};

export default Paginator;