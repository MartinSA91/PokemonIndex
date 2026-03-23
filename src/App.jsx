import { RouterProvider, createHashRouter } from "react-router-dom";
import Root from "./Routes/Root.jsx";
import PokedexPage from "./Routes/PokedexPage.jsx";
import AboutPage from "./Routes/About.jsx";

const router = createHashRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <PokedexPage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}