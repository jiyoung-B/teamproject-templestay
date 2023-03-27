import bookInfo from "../../module/BookedInfo";
export default async (req, res) => {
    let email = req.query.email

    try{
        let bookedinfos = await bookInfo(email).then(result => result)
        console.log('api뭐가져오는데?',bookedinfos)


        res.status(200).json(bookedinfos)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }

}