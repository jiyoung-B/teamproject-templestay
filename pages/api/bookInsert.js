import Book from "../../models/Book";

export default async (req, res) => {
    let bookObject = req.body[0]
    console.log(bookObject)
    let copyObject = {...bookObject}
    copyObject.B_STRDATE = bookObject.B_STRDATE.substring(0, 10)
    copyObject.B_ENDDATE = bookObject.B_ENDDATE.substring(0, 10)
    copyObject.ADULT = bookObject.ADULT[0]
    copyObject.MIDDLE = bookObject.MIDDLE[0]
    copyObject.YOUNG = bookObject.YOUNG[0]
    copyObject.PRESCHOOL = bookObject.PRESCHOOL[0]

    try {
        let result = await new Book().insertBook(copyObject).then(result => result)

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
}