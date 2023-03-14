import selectTemple from "../../module/Temple";

//?id=갑사 *
export default async (req, res) => {
    const {id} =req.query

    try{
        let templeData = await selectTemple(id).then(result => result)
        let {temple, templePic, templeProPic} = templeData

        let distinctProPic = templeProPic.filter((obj,index) => {
            return templeProPic.findIndex(item => item.P_NAME === obj.P_NAME) === index;
        })

        // let distinctProPic = await templeProPic.filter((obj,index) => {
        //     templeProPic.findIndex(item => item.P_NAME === obj.P_NAME) === index
        // })

        let templeView = {temple, templePic, distinctProPic}

        res.status(200).json(templeView)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }

}