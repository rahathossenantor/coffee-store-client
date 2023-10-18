import { Link, useLoaderData } from "react-router-dom";
import Coffee from "./components/Coffee";
import { useState } from "react";
import "./App.css";

function App() {
  const loadedCoffees = useLoaderData();
  const [coffees, setCoffees] = useState(loadedCoffees);

  return (
    <div className="md:container md:mx-auto 2xl:px-0 xl:px-0 lg:px-5 md:px-5 px-5">
      <Link to="/create-coffee"><button className="btn normal-case font-rancho text-lg">Add new coffee</button></Link>
      <Link to="/signup"><button className="btn normal-case font-rancho text-lg">Sign Up</button></Link>
      <div className="grid 2xl:grid-cols-2 xl:grid-cols-2 lg:grid-cols-2 gap-5 my-10">
        {
          coffees.map(coffee => <Coffee key={coffee._id} coffee={coffee} coffees={coffees} setCoffees={setCoffees}></Coffee>)
        }
      </div>
    </div>
  )
}

export default App;
