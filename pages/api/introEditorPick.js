import selectEdPic from "../../models/IntroEditorPick";
export default async (req, res) => {

    try{
        let edpickData = await selectEdPic().then(result => result)


        res.status(200).json(edpickData)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }

}