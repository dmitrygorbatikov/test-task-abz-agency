import { Link, Outlet } from "react-router-dom"

export const DefaultRoute = () => {
  return (
    <div>
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white font-bold text-xl">
            Test API Assignment
          </div>

          <div className={`flex items-center justify-center flex mt-4 lg:mt-0`}>
            <div className="mr-4">
              <Link to={"/"} className="text-white hover:text-gray-300">
                Token
              </Link>
            </div>
            <div className="mr-4">
              <Link to={"/users"} className="text-white hover:text-gray-300">
                Users
              </Link>
            </div>
            <div>
              <Link
                to={"/positions"}
                className="text-white hover:text-gray-300"
              >
                Positions
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <div className="container mx-auto p-8">
        <Outlet />
      </div>
    </div>
  )
}
