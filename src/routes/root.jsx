import { Outlet } from "react-router-dom";
import PokeList from "./../components/poke-list/poke-list";

export default function Root() {
  return (
    <div className="flex flex-row h-screen w-screen bg-gray-100 md:flex-row max-[768px]:flex-col">
      {/* Pokemon List Sidebar */}
      <div className="side-bar flex-shrink-0 w-1/4 md:w-1/4 h-full overflow-hidden max-[768px]:w-full max-[768px]:h-2/5 border-r-4 border-red-600">
        <PokeList />
      </div>

      {/* Main Content Area */}
      <div className="main-content flex-1 h-full overflow-auto max-[768px]:w-full max-[768px]:h-3/5">
        <Outlet />
      </div>
    </div>
  );
}
