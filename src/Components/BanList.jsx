import React from "react";

const BanList = ({ bans }) => {

    return (
      <div>
        <h3> Filters </h3>
        <div className="ban-container">
        {bans && bans.length > 0 ? (
            bans.map((attribute, index) => (
                <button className="filterButton" key="index">{attribute}</button>       
            )
            
            )
        ) : (
            <div></div>
        )}
        </div>
        <br></br>
        <br></br>
      </div>
    );
};

export default BanList;