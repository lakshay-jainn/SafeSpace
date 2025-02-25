router.get("/user" , async (req,res) => {
    const userId = req.user.id
    try{
        const user = await prisma.user.findUnique({
            where: {
                id:userId
            },
            select: {
                id: true,
                username: true,
                profileImage: true
                
            }
        })
        return res.status(200).json(user)

    }
    catch(e){
        return res.status(500).json({
            message: "Failed to get user details"
        })
    }
})