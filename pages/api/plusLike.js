import Like from "../../models/Like";

// api를 분리한 이유는 index api의 기능이 검색 결과를 표시하는 것. 이라 정의하였기 때문
export default async (req,res) => {
    const [email,btnPid] = req.body
    console.log('api plusLike- ',email,btnPid)

    let likeEmail = email.email
    let likePid = btnPid.btnPid

    let likeChk

    try {
        likeChk = await new Like().insert(likeEmail,likePid).then(result => result)


        res.status(200).json(likeChk)
    } catch (e) {
        console.log(e)
        res.status(500).json(e)
    }

}