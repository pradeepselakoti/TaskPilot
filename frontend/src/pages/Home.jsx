import { Link } from 'react-router-dom';
const Home = () => {
  return (
    <>
    <h1 className="bg-blue-300 text-5xl font-semibold text-center p-4">TaskPilot</h1>
   
      <Link to="/login" className='bg-blue-400  '>Go to Login</Link>   

    </>
  )
}

export default Home