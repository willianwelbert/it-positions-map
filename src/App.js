import React from "react";
import "./App.css";
import axios from "axios";

const baseURL = "https://amarofashion.freshservice.com/cmdb/items.json";

function App() {
  const [pageNumber, setPageNumber] = React.useState(50);
  const [APIresponse, setAPIresponse] = React.useState([]);

  React.useEffect(() => {
    const fetchPage = async () => {
      const fullURL = baseURL + `?page=${pageNumber}`;
      const result = await axios({
        method: "get",
        url: fullURL,
        auth: {
          username: "ETIrnNwuJfdAw8ThLC7r",
          password: "X"
        }
      });
      setAPIresponse(result.data);
    };
    fetchPage();

    // }
  }, [pageNumber]);

  return (
    <div className="App">
      <code>Enter FreshService Page to Fetch (1-50)</code>
      <br />
      <input
        type="number"
        value={pageNumber}
        onChange={evt => setPageNumber(evt.target.value)}
        max={50}
      />
      <button>API Call</button>
      <div className="response">
        <ul>
          {APIresponse &&
            APIresponse.map(item => <li key={item.id}>{item.name}</li>)}
        </ul>
      </div>
    </div>
  );
}

export default App;

// curl -v -u ETIrnNwuJfdAw8ThLC7r:X -H "Content-Type: application/json" -X GET 'https://amarofashion.freshservice.com/api/v2/assets'

// curl -v -u ETIrnNwuJfdAw8ThLC7r:X -X GET 'https://amarofashion.freshservice.com/api/v2/assets'
