import selectPro from "../../module/Program";

//?pid=212
export default async (req, res) => {
    const {pid} =req.query

    try{
        let proData = await selectPro(pid).then(result => result)

        let copyData = [...proData]
        copyData.splice(3,1)


        let dictintOtherPro = proData[3].filter( (obj,index) =>
            proData[3].findIndex(item => item.P_NAME === obj.P_NAME) === index
        )

        dictintOtherPro = dictintOtherPro.filter((obj) =>  obj.PID !== pid)

        copyData.push(dictintOtherPro)

        res.status(200).json(copyData)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }

}