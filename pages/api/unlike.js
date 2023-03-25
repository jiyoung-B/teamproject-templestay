import Like from "../../module/Like";

// api를 분리한 이유는 index api의 기능이 검색 결과를 표시하는 것. 이라 정의하였기 때문

export default async (req,res) => {
    const [btnPid] = req.body
    let unlikePid= btnPid.btnPid
    console.log('unlikePid',unlikePid)
        let unlikeChk

        try {
            unlikeChk = await new Like().delete(unlikePid).then(result => result)
            console.log('unlikeChk',unlikeChk)


            res.status(200).json(unlikeChk)
        } catch (e) {
            console.log(e)
            res.status(500).json(e)
        }

}