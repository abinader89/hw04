import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

export default function game_init(root, channel) {
    ReactDOM.render(<MemoryGame channel={channel}/>, root);
}

// App state for Memory Game is:
// clicks: integer
// wait: boolean

class MemoryGame extends React.Component {

    constructor(props) {
        super(props);
        this.state = {clicks: 0, wait: false};
        this.flip_back=this.flip_back.bind(this);
    }

    // refresh the page with confirmation
    restart() {
        if (confirm('Are you absolutely sure you want to start the game over? \n(All progress will be lost for all time)'))
        {
            document.location.reload();
        }
        return;
    }

    // this handles the logic for choosing the correct index based
    // on the clicked element on the web page
    get_index(e) {
        var index;
        index = e.target.parentElement.parentElement.id;
        return index;
    }

    got_view(view) {
        console.log('new view: ', view);
        this.setState(view.game);
    }

    click(e) {
        if (this.state.wait)
        {
            return;
        }
        var index = get_index(e);
        this.channel.push('guess', { idx: index })
        .receive('ok', this.got_view.bind(this);
    }

    render() {
        // This is the grid
        let row0 =
            _.map(this.state.tiles.slice(0,4), (tile, ii) => { 
                return (
                    <div id={ii} key={ii}>
                        <Tile letter={tile.value}
                              onClick={this.click.bind(this)}
                              revealed={tile.revealed} />
                    </div>)
            })

            let row1 =
            _.map(this.state.tiles.slice(4,8), (tile, ii) => {
                return (
                    <div id={4+ii} key={4+ii}>
                        <Tile letter={tile.value}
                              onClick={this.click.bind(this)}
                              revealed={tile.revealed} />
                    </div>)
            })

            let row2 = 
            _.map(this.state.tiles.slice(8,12), (tile, ii) => {
                return (
                    <div id={8+ii} key={8+ii}>
                        <Tile letter={tile.value}
                              onClick={this.click.bind(this)}
                              revealed={tile.revealed} />
                    </div>)
            })

            let row3 = 
            _.map(this.state.tiles.slice(12,16), (tile, ii) => {
                return (
                    <div id={12+ii} key={12+ii}>
                        <Tile letter={tile.value}
                              onClick={this.click.bind(this)}/>
                    </div>)
            })
        return <div>
            <div className='click'>
            {this.state.clicks}
            </div>
            <div className='row'>
            {row0}
            </div>
            <div className='row'>
            {row1}
            </div>
            <div className='row'>
            {row2}
            </div>
            <div className='row'>
            {row3}
            </div>
            <button className="button-black float-right" onClick={this.restart.bind(this)}>restart the game</button>
            </div>
    }
}

let Tile = (props) => {
    return (<div className="tile" onClick={props.onClick}>
                <p>
                    {props.revealed && props.letter}
                </p>
                
            </div>);
}
