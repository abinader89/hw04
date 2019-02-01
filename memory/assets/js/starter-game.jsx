import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

export default function game_init(root) {
    ReactDOM.render(<MemoryGame />, root);
}

// struct factory --
// this function is used to make arbitrary maps,
// this will be used to make tile structs since
// they are dumb objects (no methods)
function StructFactory(item_labels)
{
    var args = item_labels.split(' ');
    var count = args.length;

    // constructor for the struct
    function constructor()
    {
        for (var ii = 0; ii < count; ++ii)
        {
            this[args[ii]] = arguments[ii];
        }
    }
    return constructor;
}

function MakeTiles(list)
{
    var Tile = StructFactory('matched revealed value');

    var tile1 = new Tile(false, false, 'a');
    var tile2 = new Tile(false, false, 'b');
    var tile3 = new Tile(false, false, 'c');
    var tile4 = new Tile(false, false, 'd');
    var tile5 = new Tile(false, false, 'e');
    var tile6 = new Tile(false, false, 'f');
    var tile7 = new Tile(false, false, 'g');
    var tile8 = new Tile(false, false, 'h');
    var tile9 = new Tile(false, false, 'a');
    var tile10 = new Tile(false, false, 'b');
    var tile11 = new Tile(false, false, 'c');
    var tile12 = new Tile(false, false, 'd');
    var tile13 = new Tile(false, false, 'e');
    var tile14 = new Tile(false, false, 'f');
    var tile15 = new Tile(false, false, 'g');
    var tile16 = new Tile(false, false, 'h');

    list.push(tile1);
    list.push(tile2);
    list.push(tile3);
    list.push(tile4);
    list.push(tile5);
    list.push(tile6);
    list.push(tile7);
    list.push(tile8);
    list.push(tile9);
    list.push(tile10);
    list.push(tile11);
    list.push(tile12);
    list.push(tile13);
    list.push(tile14);
    list.push(tile15);
    list.push(tile16);


    return list;
}

// App state for Memory Game is:
// tiles: array of 
// tile_revealed: string
// clicks: integer

class MemoryGame extends React.Component {

    constructor(props) {
        super(props);
        var list = [];
        MakeTiles(list);
        this.state = {tiles: list, tile_revealed: null, clicks: 0};
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
        // clicked on the tile
        if (!(index = e.target.parentElement.parentElement.id))
        {
            // clicked on button
            index = e.target.parentElement.parentElement.parentElement.id;
        }
        return index;
    }

    reveal(e) {
        var index = this.get_index(e);
        if (this.state.tiles[index].matched)
        {
            console.log('already matched');
            return;
        }
        if (this.state.tile_revealed == null)
        {
            console.log(this.state);
            var new_tiles = [];
            var new_tile_revealed = this.state.tiles[index];
            new_tile_revealed.revealed = true;
            var new_clicks;
            for (var ii in this.state.tiles)
            {
                new_tiles[ii] = this.state.tiles[ii];
            }
            new_clicks = this.state.clicks + 1;
            var new_state = {tiles: new_tiles, tile_revealed: new_tile_revealed, clicks: new_clicks};
            this.setState(new_state);
        } else if (this.state.tiles[index] === this.state.tile_revealed)
        {
            console.log('this is the exact same tile');
            return;
        } else if (this.state.tiles[index].value == this.state.tile_revealed.value)
        {
            var new_tiles = [];
            var new_clicks;
            for (var ii in this.state.tiles)
            {
                new_tiles[ii] = this.state.tiles[ii];
                if (new_tiles[ii].value == this.state.tiles[index].value)
                {
                    new_tiles[ii].matched = true;
                }
                new_clicks = this.state.clicks + 1;
                var new_state = {tiles: new_tiles, tile_revealed: null, clicks: new_clicks};
                this.setState(new_state);
            }
            console.log(this.state);
        } else {
            // TODO reveal then after a delay, update the state and reset stuff
            var new_tiles = [];
            var new_clicks;
            for (var ii in this.state.tiles)
            {
                new_tiles[ii] = this.state.tiles[ii];
            }
            new_tiles[index].revealed = true;
            new_clicks = this.state.clicks + 1;
            var new_state = {tiles: new_tiles, tile_revealed: this.state.tile_revealed, clicks: new_clicks};
            this.setState(new_state);
            console.log('wrong match');
            //            sleep(1000); // delay
        }
    }

    // 1 liner to display the game_over message
    game_over() {
        alert("Congratulations! You solved the Memory game!");
    }

    render() {
        // This is the grid
        let row0 =
            _.map(this.state.tiles.slice(0,4), (tile, ii) => { 
                return (
                    <div id={ii} key={ii}>
                        <Tile letter={tile.value}
                              onClick={this.reveal.bind(this)}
                              revealed={tile.revealed} />
                    </div>)
            })

            let row1 =
            _.map(this.state.tiles.slice(4,8), (tile, ii) => {
                return (
                    <div id={4+ii} key={4+ii}>
                        <Tile letter={tile.value}
                              onClick={this.reveal.bind(this)}
                              revealed={tile.revealed} />
                    </div>)
            })

            let row2 = 
            _.map(this.state.tiles.slice(8,12), (tile, ii) => {
                return (
                    <div id={8+ii} key={8+ii}>
                        <Tile letter={tile.value}
                              onClick={this.reveal.bind(this)}
                              revealed={tile.revealed} />
                    </div>)
            })

            let row3 = 
            _.map(this.state.tiles.slice(12,16), (tile, ii) => {
                return (
                    <div id={12+ii} key={12+ii}>
                        <Tile letter={tile.value}
                              onClick={this.reveal.bind(this)}
                              revealed={tile.revealed} />
                    </div>)
            })
        return <div>
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
                    <button>reveal</button>
                
            </div>);
}
