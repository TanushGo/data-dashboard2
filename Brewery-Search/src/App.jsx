import { useState, useEffect} from 'react'
import './App.css'
import Menu from "./components/Menu";

 
function App() {
  
  const [list, setList] = useState({})
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const [filteredPubs, setFilteredPubs] = useState([]);
  const [pubFilter, setPubFilter] = useState(false);

  const [regionalPubs, addRegionalPub] = useState(0);
  const [microPubs, addMicroPub] = useState(0);
  const [brewPubs, addBrewPub] = useState(0);

  

  const searchItems = searchValue => {
    setSearchInput(searchValue);
    setPubFilter(false);
    if (searchValue !== "") {
      const filteredData = Object.fromEntries(Object.entries(list).filter((item) => 
      Object.values(item[1].name)
        .join("")
        .toLowerCase()
        .includes(searchValue.toLowerCase())
      ))
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(list);
    }
  };

  
  const setBrewPub = () => {
    setPubFilter(true);
    const filteredData = Object.fromEntries(Object.entries(list).filter((item) => 
      Object.values(item[1].brewery_type)
        .join("")
        .toLowerCase()
        .includes("brewpub")
      ))
      setFilteredPubs(filteredData);
  };

  const setMicroPub = () => {
    setPubFilter(true);
    const filteredData = Object.fromEntries(Object.entries(list).filter((item) => 
      Object.values(item[1].brewery_type)
        .join("")
        .toLowerCase()
        .includes("micro")
      ))
      setFilteredPubs(filteredData);
  };

  const setRegionalPub = () => {
    setPubFilter(true);
    const filteredData = Object.fromEntries(Object.entries(list).filter((item) => 
      Object.values(item[1].brewery_type)
        .join("")
        .toLowerCase()
        .includes("regional")
      ))
      setFilteredPubs(filteredData);
  };
  useEffect(() => {
    const fetchAllBreweryData = async () => {
        const response = await fetch( 
          "https://api.openbrewerydb.org/v1/breweries/random?size=50"
        );
    
      const json = await response.json();
      setList(json);
    };
    fetchAllBreweryData().catch(console.error);
    findStatistics()
  }, []);
  const findStatistics = () => {
    console.log(Object.entries(list).filter((item) => 
    Object.values(item[1].brewery_type)
      .join("")
      .toLowerCase()
      .includes("brewpub")
    ))
    let randomData = Object.entries(list).filter((item) => 
    Object.values(item[1].brewery_type)
      .join("")
      .toLowerCase()
      .includes("brewpub")
    )
    addBrewPub(randomData.length)

    randomData = Object.entries(list).filter((item) => 
    Object.values(item[1].brewery_type)
      .join("")
      .toLowerCase()
      .includes("micro")
    )
    addMicroPub(randomData.length)
    randomData = Object.entries(list).filter((item) => 
    Object.values(item[1].brewery_type)
      .join("")
      .toLowerCase()
      .includes("regional")
    )
    addRegionalPub(randomData.length)
    console.log(microPubs);
    console.log(brewPubs);
    console.log(regionalPubs);
  }
  
  return (
    <div className="whole-page">
    <h1>Brewery Search</h1>
    <div className='List'>
    <div className='filters'>
    <input
      type="text"
      name="brewery-search"
      placeholder="Search Brewery..."
      onChange={(inputString) => searchItems(inputString.target.value)}
    />
    <div className='filter-buttons'>
    <button onClick={setMicroPub}>Micro Pub</button>
    <button onClick={setRegionalPub}>Regional Pub</button>
    <button onClick={setBrewPub}>Brew Pub</button>
    </div>
    </div>
    
    {searchInput.length > 0 || pubFilter
      ? searchInput.length > 0 ?
          <Menu
            data={filteredResults}
          /> 
          : <Menu
            data={filteredPubs}
            />
      : list ?
          <Menu
            data={list}          
            />
          : null
    }
    </div>
    </div>

  )
}

export default App