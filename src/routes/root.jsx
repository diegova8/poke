import { Outlet } from "react-router-dom";
import PokeList from "./../components/poke-list/poke-list";

export default function Root() {
  return (
    <div className="flex flex-row h-screen w-screen bg-gray-100 max-[600px]:flex-col">
      {/* Pokemon List Sidebar */}
      <div className="side-bar flex-shrink-0 w-1/4 h-full overflow-hidden max-[600px]:w-full max-[600px]:h-1/3 border-r-4 border-red-600">
        <PokeList />
      </div>

      {/* Main Content Area */}
      <div className="main-content flex-1 h-full overflow-auto max-[600px]:w-full max-[600px]:h-2/3">
        <Outlet />
      </div>
    </div>
  );
}
