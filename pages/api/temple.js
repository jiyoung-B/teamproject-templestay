import selectTemple from "../../module/Temple";

//?id=갑사 *
export default async (req, res) => {
    const {id} =req.query


    try{
        let templeData = selectTemple(id).then(result => result)

        res.status(200).json(await templeData)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }

}