import selectIndex from "../../module/Index";

export default async (req, res) => {
    const {lid} =req.query

    try{
        let indexData = await selectIndex(lid).then(result => result)

        let indexInfo = indexData.filter((obj,index) => (
            indexData.findIndex(item => (item.P_NAME === obj.P_NAME && item.P_PICLINK.length > 40)) === index
        ))

        res.status(200).json(indexInfo)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }

}