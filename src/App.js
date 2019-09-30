import React from "react";
import "./App.css";
import axios from "axios";

const baseURL = `https://amarofashion.freshservice.com/cmdb/items.json`;

function App() {
  // const [pageNumber, setPageNumber] = React.useState(50);
  const [APIresponse, setAPIresponse] = React.useState([]);

  React.useEffect(() => {
    const fetchPage = async () => {

      let lastPage = 50;
      
      for( let idx=1; idx < lastPage; idx++ ){
        console.log(`page_${idx}`);
        if (localStorage.getItem(`page_${idx}`) !== null ) continue;
        const fullURL = baseURL + `?page=${idx}`;
        const result = await axios({
          method: "get",
          url: fullURL,
          auth: {
            username: "ETIrnNwuJfdAw8ThLC7r",
            password: "X"
          }
        });
        
        console.log(result);

        const pageData = result.data.map( item => {
          const { 
            asset_tag,
            ci_type_id,
            ci_type_name,
            department_id,
            department_name,
            description,
            id,
            location_id,
            location_name,
            name,
            product_name,
            state_name,
            used_by,
            user_id,
            levelfield_values : {
              area_7001108362,
              hostname_7001108368,
              mac_address_7001108368,
              memory_7001108368,
              os_7001108368,
              serial_number_7001108362
            }
          } = item;

          const itemData = {
            asset_tag,
            ci_type_id,
            ci_type_name,
            department_id,
            department_name,
            description,
            id,
            location_id,
            location_name,
            name,
            product_name,
            state_name,
            used_by,
            user_id,
            area_7001108362,
            hostname_7001108368,
            mac_address_7001108368,
            memory_7001108368,
            os_7001108368,
            serial_number_7001108362,
          }

          return itemData;
          
        } )


        setAPIresponse((APIresponse) => [...APIresponse, pageData] );
        localStorage.setItem(`page_${idx}`, JSON.stringify(pageData) );
        if(result.data.length === 50) lastPage++
      }
    };

    fetchPage();

    // }
  }, []);


  return (
    <div className="App">
      {/* <code>Enter FreshService Page to Fetch (1-50)</code>
      <br />
      <input
        type="number"
        value={pageNumber}
        onChange={evt => setPageNumber(evt.target.value)}
        max={50}
      /> */}
      <button>API Call</button>
      <div className="response">
        <ul>
          <li>item</li>
        </ul>
      </div>
    </div>
  );
}

export default App;

// curl -v -u ETIrnNwuJfdAw8ThLC7r:X -H "Content-Type: application/json" -X GET 'https://amarofashion.freshservice.com/api/v2/assets'

// curl -v -u ETIrnNwuJfdAw8ThLC7r:X -X GET 'https://amarofashion.freshservice.com/api/v2/assets'
