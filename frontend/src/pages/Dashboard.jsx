import { Link } from 'react-router-dom';
const Home = () => {
  return (
    <>
    <h1 className="bg-blue-300 text-5xl font-semibold text-center p-4">TaskPilot</h1>
    

<Link to="/project/123">
   <button className="bg-blue-500 text-white px-4 py-2  mt-2 rounded-md">
     Go To Project 123
   </button>
</Link>

         

    </>
  )
}

export default Home