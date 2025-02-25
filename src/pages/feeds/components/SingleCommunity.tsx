import { Card,CardContent,CardDescription,CardTitle  } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"
function SingleCommunity({id,name,description}: {id:string,name:string,description:string}){
    return (
        <Card className="w-full drop-shadow-lg">
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
    )
}
export default SingleCommunity;