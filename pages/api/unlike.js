import Like from "../../models/Like";

// api를 분리한 이유는 index api의 기능이 검색 결과를 표시하는 것. 이라 정의하였기 때문
export default async (req,res) => {
    const [email,btnPid] = req.body
    let unlikePid= btnPid.btnPid
    let userEmail = email.email
        let unlikeChk

        try {
            unlikeChk = await new Like().delete(userEmail,unlikePid).then(result => result)

            res.status(200).json(unlikeChk)
        } catch (e) {
            console.log(e)
            res.status(500).json(e)
        }

}