// import Footer from '@components/layout/Footer';
import Header from '@components/layout/Header';
import PageContainer from '@components/layout/PageContainer';
import Sidebar from '@components/layout/Sidebar';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  return (
    <div className="flex min-h-screen flex-col">
      <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>

      <div className="flex flex-1 overflow-hidden">
        <Sidebar isSidebarOpen={isSidebarOpen} />

        <main className="flex flex-1 flex-col overflow-hidden">
          <PageContainer className="flex-1 overflow-auto">
            <Outlet />
          </PageContainer>

          {/* <Footer /> */}
        </main>
      </div>
    </div>
  );
}

export default AppLayout;