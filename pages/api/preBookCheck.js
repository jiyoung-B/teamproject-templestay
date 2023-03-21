import PreBook from "../../module/PreBook";

export default async (req, res) => {
    let {userid}  = req.query

    try {
        let result = await new PreBook().selectPreBook(userid).then(result => result)

        let adultPrice = 0;
        let middlePrice = 0;
        let youngPrice = 0;
        let preSchoolPrice = 0;

        for (let i = 0; i < 4; i++) {
            if(result[1][i] === undefined) {
                continue;
            } else if ( result[1][i].PR_CLASS === '성인' ) {
                adultPrice = result[1][i].PRICE
            } else if (result[1][i].PR_CLASS === "중고생") {
                middlePrice = result[1][i].PRICE
            } else if (result[1][i].PR_CLASS === "초등생") {
                youngPrice = result[1][i].PRICE
            } else if (result[1][i].PR_CLASS === "미취학") {
                preSchoolPrice = result[1][i].PRICE
            }
        }

        result[0][0].ADULT = [result[0][0].ADULT, adultPrice]
        result[0][0].MIDDLE = [result[0][0].MIDDLE, middlePrice]
        result[0][0].YOUNG = [result[0][0].YOUNG, youngPrice]
        result[0][0].PRESCHOOL = [result[0][0].PRESCHOOL, preSchoolPrice]
        let copyResult = [...result]
        copyResult.pop();

        res.status(200).json(copyResult);
    } catch (err) {
        res.status(500).json(err);
    }
}