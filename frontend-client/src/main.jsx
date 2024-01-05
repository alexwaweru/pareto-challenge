import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import ErrorPage from "./components/ErrorPage";
import { action as destroyAction } from "./routes/destroy";
import CreateProject, { action as createAction } from "./routes/create";
import EditProject, { action as editAction } from "./routes/edit";
import Index from "./routes/index";
import Project, { loader as projectLoader } from "./routes/project";
import Root, { loader as rootLoader, action as rootAction } from "./routes/root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
      { index: true, element: <Index /> },
      {
        path: "projects/:projectId",
        element: <Project />,
        loader: projectLoader,
      },
      {
        path: "projects/new",
        element: <CreateProject />,
        action: createAction,
      },
      {
        path: "projects/:projectId/edit",
        element: <EditProject />,
        loader: projectLoader,
        action: editAction,
      },
      {
        path: "projects/:projectId/destroy",
        action: destroyAction,
        errorElement: <div>Oops! There was an error.</div>,
      },
    ],
  },
],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);