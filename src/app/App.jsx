import UsersPage from '../pages/UsersPage';
import UserDetailsPage from '../pages/UserDetailsPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  { path: '/', element: <UsersPage /> },
  { path: '/users/:id', element: <UserDetailsPage /> },
  { path: '*', element: <h1>Not found</h1> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
