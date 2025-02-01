import LoginPage from "./loginPage";
import { createBrowserRouter } from "react-router-dom";
import RegisterPage from "./RegisterPage";
import PostListPage from "./PostListPage";
import SinglePost from "./SinglePostPage";
import WritePage from "./WritePage";
import HomePage from "./HomePage";
import MainLayout from "../layout/MainLayout";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: '/login',
        element: <LoginPage />
      },
      {
        path: '/register',
        element: <RegisterPage />
      },
      {
        path: '/posts',
        element: <PostListPage />
      },
      {
        path: '/:slug',
        element: <SinglePost />
      },
      {
        path: '/write',
        element: <WritePage />
      }
    ]
  }
]);

export default router;
