import HomePage from '../pages/HomePage/HomePage.tsx'

export const routes = [
    {
      path: "/",
      element: <HomePage whichMain='About'/>,
    },
    {
      path: "/signup",
      element: <HomePage whichMain='Signup'/>,
    },
    {
      path: "/login",
      element: <HomePage whichMain='Login'/>,
    },
    {
      path: "/blogs",
      element: <HomePage whichMain='BlogList'/>,
    },
    {
      path: "/blog/:blogId",
      element: <HomePage whichMain='BlogDetail'/>,
    },
    {
      path: "/blog/edit/:blogId",
      element: <HomePage whichMain='EditBlog' />,
    },
    {
      path: "/blogs/new",
      element: <HomePage whichMain='CreateBlog' />,
    },
    {
      path: "/blogs/author/:authorId",
      element: <HomePage whichMain='BlogList' />,
    },
    {
      path: "/blogs/author/",
      element: <HomePage whichMain='Login' />,
    }
]