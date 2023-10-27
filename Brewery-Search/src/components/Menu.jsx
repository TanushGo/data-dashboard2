import React from "react";

const Menu = ({ data }) => {
    console.log(data)
    return (
        <div>
          <div className="table">
            <table>
            <thead>
                <tr><th>Name</th><th>City</th><th>State</th><th> Brewery Type</th></tr>
            </thead>
            <tbody>
                {Object.entries(data).map((brewery) => 
                    <tr key={brewery[1].id}>
                        <td key={brewery[1]["name"]}>{brewery[1]["name"]}</td>
                        <td key={brewery[1]["city"]}>{brewery[1].city}</td>
                        <td key = {brewery[1].state}>{brewery[1].state}</td>
                        <td key = {brewery[1].brewery_type}>{brewery[1].brewery_type}</td>
                    </tr>
                )

                }
            </tbody>
            </table>
            </div>
        </div>
      );
  };
  
  export default Menu;