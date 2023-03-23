import selectEdPic from "../../module/EditorPick";
export default async (req, res) => {

    try{
        let edpickData = await selectEdPic().then(result => result)
        console.log('에디터뷰?',edpickData);

        res.status(200).json(edpickData)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }

}