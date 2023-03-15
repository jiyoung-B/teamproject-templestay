import selectPro from "../../module/Program";

//?id=갑사 *
export default async (req, res) => {
    const {pid} =req.query

    try{
        let proData = await selectPro(pid).then(result => result)

        res.status(200).json(proData)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }

}