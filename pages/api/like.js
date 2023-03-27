import Like from "../../models/Like";

// api를 분리한 이유는 index api의 기능이 검색 결과를 표시하는 것. 이라 정의하였기 때문

export default async (req,res) => {
    const {email} =req.query


    if(email !== 'null') {

        // // 이메일의 '@' 부분이 '%'로 바뀌어 들어오므로, 변환하는 부분, api를 index와 like로 분리하였더니, 이 문제는 사라졌다.
        // let transEmail = email.replace('%','@')
        // console.log('index api - transEmail',transEmail)

        let likeData

        try {

            likeData = await new Like(email).select().then(result => result)


            const reduceLikeData = likeData.reduce((acc, obj) => {
                if (acc.email === obj.email) {
                    acc.PID.push(obj.PID);
                } else {
                    acc = { email: obj.email, PID: [obj.PID] };
                }
                return acc;
            }, { email: '', PID: [] });

            likeData = await reduceLikeData

            res.status(200).json(likeData)
        } catch (e) {
            console.log(e)
            res.status(500).json(e)
        }

    }

}