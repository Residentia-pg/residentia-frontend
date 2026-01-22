import{Navigate} from "react-router-dom";
import { getAuthUser } from "../utils/frontAuth";

export default function ProtectedRoute({children,role})
{
    const auth = getAuthUser();

    if(!auth || !auth.isLoggedIn)
    {
        return <Navigate to="/" replace/>;
    }

    if(role&& auth.role !== role)
    {
        return <Navigate to="/" replace/>
    }
    return children;
}