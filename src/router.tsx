import { createBrowserRouter, Router} from "react-router-dom";
import Home from "./pages/home/home";
import Detail from "./pages/detail/detail";
import NotFound from "./pages/notfound/notfound";


const router = createBrowserRouter([
    {
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