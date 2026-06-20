import GitHubWorkflowManager from './pages/GitHubWorkflowManager/GitHubWorkflowManager';
import NavBar from './components/NavBar';
import Footer from './components/Footer'
import Login  from './pages/Login';
import Register from './pages/Register';
import {createBrowserRouter, Outlet, RouterProvider} from 'react-router-dom'
import Overview from './pages/Overview';
let x = createBrowserRouter([
  {index: true ,element: <Overview/>},
  {path: 'register' ,element: <Register/>},
  {path: 'login' ,element: <Login/>},
  {path: 'connect' ,element: <GitHubWorkflowManager/>},
 
])


export default function App() {
  return (
    <RouterProvider router={x}>
      <div className="App">
      <NavBar/>
      <Outlet/>
      {/* <GitHubWorkflowManager /> */}
    </div>
    </RouterProvider>
  );
}