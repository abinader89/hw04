defmodule MemoryWeb.GamesChannel do
  use MemoryWeb, :channel
  alias Memory.Game

  def join('games:' <> name, payload, socket) do
    if authorized?(payload) do
        game = Game.new()
        socket = socket
        |> assign(:game, game)
        |> assign(:name, name)
        {:ok, %{'join' => name, 'game' => Game.client_view(game)}, socket}
    else 
    {:error, %{reason: 'unauthorized'}}
    end
  end

  def handle_in('guess', %{'idx' => idx}, socket) do
    game = Game.guess(socket.assigns[:game], idx)
    socket = assign(socket, :game, game)
    {:reply, {:ok, %{ 'game' => Game.client_view(game)}}, socket}
  end

# add authorization logic here as needed
  def authorized?(_payload) do
    true
  end
end
