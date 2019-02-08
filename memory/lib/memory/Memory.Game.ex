defmodule Memory.Game do
  def new do
    # make my tiles
    tileAA = %{matched: false, revealed: false, value: 'a'}
    tileAB = %{matched: false, revealed: false, value: 'a'}
    tileBA = %{matched: false, revealed: false, value: 'b'}
    tileBB = %{matched: false, revealed: false, value: 'b'}
    tileCA = %{matched: false, revealed: false, value: 'c'}
    tileCB = %{matched: false, revealed: false, value: 'c'}
    tileDA = %{matched: false, revealed: false, value: 'd'}
    tileDB = %{matched: false, revealed: false, value: 'd'}
    tileEA = %{matched: false, revealed: false, value: 'e'}
    tileEB = %{matched: false, revealed: false, value: 'e'}
    tileFA = %{matched: false, revealed: false, value: 'f'}
    tileFB = %{matched: false, revealed: false, value: 'f'}
    tileGA = %{matched: false, revealed: false, value: 'g'}
    tileGB = %{matched: false, revealed: false, value: 'g'}
    tileHA = %{matched: false, revealed: false, value: 'h'}
    tileHB = %{matched: false, revealed: false, value: 'h'}

    # put my tiles into a list
    tiles = [tileAA, tileAB, tileBA, tileBB, tileCA, tileCB, tileDA,
    tileDB, tileEA, tileEB, tileFA, tileFB, tileGA, tileGB, tileHA,
    tileHB]
    
    # shuffle list
    tiles = Enum.shuffle(tiles)
    
    # create a fresh new server-side state
    %{tiles: tiles, tile_revealed: nil}
  end

# nothing selected yet
  def guess(game, idx) when game.tile_revealed == nil do
     tiles = game.tiles
     Map.put(game, :tile_revealed, tiles[idx])
  end

# same tile
  def guess(game, idx) when game.tile_revealed === game.tiles[idx] do
# nothing
  end

# found sister tile
  def guess(game, idx) when game.tile_revealed == game.tiles[idx] do
    v = games.tiles[idx].value
    matched = game.tiles
    |> Enum.map fn %{value: val} = tile -> 
      if val == v do 
        Map.put(tile, :matched, true, :revealed, true) 
      else tile 
      end
    end
  end

# found another tile
  def guess(game, idx) do
  Process.sleep(1000)
  matched = games.tiles
  |> Enum.map fn %{matched: m, revealed: r} = tile ->
    if not m and r do
      Map.put(tile, :revealed, false)
    else tile
    end
  end
  end
end
