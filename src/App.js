
import "./App.css";
import { useEffect, useState } from "react"
import { getAllPokemons, getPokemon } from "./utils/pokemon";
import { Card } from "./components/Card/Card";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon"
  const [loading, setLoading] = useState(true)
  const [pokemonData, setPokemonData] = useState([])
  const [nextURL, setNextURL] =  useState("")
  const [prevURL, setPrevURL] = useState("")

  /**
   * 全てのポケモンデータ (20件制約) を取得
   */
  const fetchAllPokemons = async () => {
    try {
      const res = await getAllPokemons(initialURL)
      console.log(res.results)
      setNextURL(res.next)
      loadPokemon(res.results)
      setLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * fetchAllPokemon内で、res.results(name, pokemon詳細url配列のオブジェクt)からurlを抜き出す
   * 抜き出したurlで ポケモン詳細データ を取得して、ステートに保存
   */
  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {        
        let pokemonRecord = getPokemon(pokemon.url)
        return pokemonRecord;
      })
    )
    setPokemonData(_pokemonData)
  }

  useEffect(() => {
    fetchAllPokemons()
    console.log(nextURL)
    console.log(prevURL)
  }, [])

  const handlePrevPage = async () => {
    /**
     * クリックしたら前の20種類のポケモンを取得して表示させる
     * 次に遷移するためのurl: getAllPokemons(initialURL)の戻り値　data.next　にある
     * ❌previousがnullならinitialURLを入れる
     * 🙆 prevURLがnullなら、何もせずにreturnで返却
     */
    try {
      if (!prevURL) return;
      setLoading(true)
      let data = await getAllPokemons(prevURL)
      setNextURL(data.next)
      setPrevURL(data.previous)
      loadPokemon(data.results)
      setLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  const handleNextPage = async () => {
    try {
      setLoading(true)
      let data = await getAllPokemons(nextURL)
      setNextURL(data.next)
      setPrevURL(data.previous)
      loadPokemon(data.results)
      setLoading(false)
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div className="App">
      <Navbar />
      {loading ? (
        <p>ロード中...</p>
      ) : (
        <>
          <div className="btn">
            <button className="" onClick={handlePrevPage}>前へ</button>
            <button className="" onClick={handleNextPage}>次へ</button>
          </div>
          <div className="pokemonCardContainer">
            {pokemonData.map((pokemon, i) => (
              <Card key={i} pokemon={pokemon} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
export default App;