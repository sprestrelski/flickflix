import React, {useState} from 'react';
import { ScatterChart, Scatter, BarChart, Bar, Label, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


const RatingsChart = (list) => {
    let ratingsData = [];
    let votesData = [];
    const [toggled, setToggled] = useState(true);
    for (let i = 0; i < 11; i++) {
      ratingsData.push({Rating: i, Quantity: 0, Movies: "",});
    }
  
    for (let i = 0; i < list.list.length; i++){
      let a = Math.trunc(list.list[i].vote_average);
      ratingsData[a].Quantity = ratingsData[a].Quantity + 1;
      ratingsData[a].Movies = ratingsData[a].Movies + list.list[i].title + "\n";
      
      votesData.push({Votes: list.list[i].vote_count, VoteAverage: list.list[i].vote_average, Title: list.list[i].title})
    }

    function RatingsToolTip({payload, label, active}) {
      if (active) {
        if (ratingsData[label].Movies != "") {
        return (
          <div className="custom-tooltip">
            <p className="desc">{ratingsData[label].Movies}</p>
          </div>
        )
        }
      }
      return null;
    }

    function VotesToolTip({payload, label, active}) {
      if (active) {
        console.log(payload[0].payload);
        return (
          <div className="rating-tooltip">
            <p className="label">{payload[0].payload.Title}</p>
            <p className="desc">Votes: {payload[0].payload.Votes}</p>
            <p className="desc">Average Rating: {payload[0].payload.VoteAverage}</p>
          </div>
        )
      }
      return null;
    }

    const updateToggled = () => {
      setToggled(!toggled);
    }

    return (
        <div className="charts" onClick={updateToggled}>
        { toggled ? (
            <div>
              <BarChart
                width={400}
                height={300}
                data={ratingsData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 20,
                }}
              >
                <CartesianGrid strokeDasharray="3" />
                <XAxis dataKey="Rating"> 
                  <Label value="Ratings" offset={0} position="bottom"/>
                </XAxis>
                <YAxis domain={[0,10]}>
                </YAxis>
                <Tooltip content={<RatingsToolTip/>} wrapperStyle={{width: 300,}}/>
                <Bar dataKey="Quantity" fill="orange" />
              </BarChart>
            </div>
        ) : <div>
          <ScatterChart
            width={500}
            height={250}
            margin={{
              top: 20,
              right: 20,
              bottom: 10,
              left: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Votes" type="number" name="Votes" unit=" votes" />
            <YAxis dataKey="VoteAverage" type="number" name="Average Rating" unit=" stars" domain={[0,10]}/>
            <Tooltip content={<VotesToolTip/>} cursor={{ strokeDasharray: '3 3' }} />
            <Scatter data={votesData} fill="orange" />
          </ScatterChart>

        </div>
        }
      
      </div>
    );
}

export default RatingsChart;