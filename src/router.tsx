import { createBrowserRouter} from "react-router-dom";
import Home from "./pages/home/home";
import Detail from "./pages/detail/detail";
import NotFound from "./pages/notfound/notfound";
import Layout from "./components/layout";


const router = createBrowserRouter([
    {
        element:<Layout/>,
        children:[
            {
                path:"/",
                element:<Home/>
            },
            {
                path:"/detail/:cripto",
                element:<Detail/>
            },
            {
                path:'*',
                element:<NotFound/>
            }
        ]
    }
])

export{ router}