import { Card,CardContent,CardDescription,CardTitle  } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"
import { NavLink } from "react-router-dom";
function SingleCommunity({id,name,description,navItemClass}: {id:string,name:string,description:string,navItemClass:({isActive}:{isActive:boolean})=>string}) {

    return (
        <NavLink className={navItemClass} to={`/community/${id}`}> 
        <Card className="w-full drop-shadow-lg">
          <div className="hidden">
            {id}
          </div>
          <CardContent className="p-4">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent">{name}</CardTitle>
            <CardDescription className="text-gray-500 dark:text-gray-400 mt-2">
              {description}
            </CardDescription>
            <div className="mt-4">
              <Badge className="bg-gradient-to-r from-red-400 to-orange-500 py-1 px-2 text-md">Join</Badge>

            </div>
          </CardContent>
        </Card>
        </NavLink>
    )
}
export default SingleCommunity;