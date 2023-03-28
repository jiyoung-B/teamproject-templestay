import selectTemple from "../../models/Temple";

export default async (req, res) => {
    const {id} =req.query

    try{
        let templeData = await selectTemple(id).then(result => result)
        let {temple, templePic, templeProPic} = templeData
        console.log('templeProPic',templeProPic)

        let distintTemplePic = templePic.filter((obj) => {
            return obj.T_PICTURE.length > 40
        })

        let distinctProPic = templeProPic.filter((obj,index) => {
            return templeProPic.findIndex(item => item.P_NAME === obj.P_NAME) === index;
        })

        let templeView = {temple, distintTemplePic, distinctProPic}


        res.status(200).json(templeView)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }

}