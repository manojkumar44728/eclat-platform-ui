// import { Menu, X } from 'lucide-react';
import { Tooltip } from 'antd';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
interface HeaderProps {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
}

const Header = ({ isSidebarOpen, toggleSidebar }: HeaderProps) => {
    return (
        <header className="bg-gray-800 h-16 text-white p-4 flex flex-row justify-between items-center">
            <div className="flex items-center space-x-4">
                <Tooltip title={isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}>
  <button
  onClick={toggleSidebar}
  className="flex h-10 w-10 items-center justify-center rounded-md text-white hover:bg-gray-700 cursor-pointer"
>
     {isSidebarOpen ? (
    <PanelLeftClose size={20} />
  ) : (
    <PanelLeftOpen size={20} />
  )}
</button>
</Tooltip>
                <h1 className="text-xl font-bold">My Application</h1>
            </div>
        </header>
    );
}

export default Header;