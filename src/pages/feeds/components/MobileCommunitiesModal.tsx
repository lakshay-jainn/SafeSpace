import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import Communities from './Communities';
import { useState } from 'react';
import {ListFilter} from 'lucide-react'
function MobileCommunitiesModal(){
    const [communitiesModal,setCommunitiesModal] = useState(false);
    return(
    <Dialog open={communitiesModal} onOpenChange={setCommunitiesModal}>
        <DialogTrigger asChild>
            <button onClick={()=>setCommunitiesModal(true)} className="bg-gradient-to-r from-red-400 to-orange-400 h-fit rounded-full p-3">
                <ListFilter className="w-6 h-6 text-white" />
            </button>
        </DialogTrigger>
        <DialogContent className="rounded-2xl">
        <DialogDescription></DialogDescription>
            <DialogTitle className='text-2xl'>Communities
            </DialogTitle>
            <Communities />
        </DialogContent>
    
    </Dialog>
)
}
export default MobileCommunitiesModal;