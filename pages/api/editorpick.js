import EditorPick from "../../models/EditorPick";
export default async (req, res) => {
    let {epic} = req.query


        try {
            let edpickData = await new EditorPick().selectEdPic(epic).then(result => result)


            res.status(200).json(edpickData)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }


}