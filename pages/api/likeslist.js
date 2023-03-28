import Likeslist from "../../models/Likeslist";

export default async (req, res) => {
    let email = req.query.email;

    try {
        const likeslist = await Likeslist(email).then((lk) => lk);

        // console.log('plz : ', likeslist);
        let likesList1=likeslist[0].map((llk) => ({PID : llk.PID, T_NAME : llk.T_NAME, P_NAME : llk.P_NAME, ADDR : llk.ADDR})
        )
        let distinctLikesList1 = likesList1.filter((obj,index) => {
            return likesList1.findIndex(item => item.PID === obj.PID) === index;
        })
        console.log('distinctLikesList1',distinctLikesList1)
        let likesList2=likeslist[0].map((llk) => ({P_NAME:llk.P_NAME,PR_CLASS:llk.PR_CLASS,PRICE:llk.PRICE}))
        let distinctLikeList2 = likesList2.filter((obj,index) => {
            return likesList2.findIndex(item => item.P_NAME === obj.P_NAME) === index;
        })
        let likeList3=likeslist[0].map((llk) => ({P_NAME:llk.P_NAME,P_DAY:llk.P_DAY,P_TIME:llk.P_TIME,P_CONTENT:llk.P_CONTENT}))
        let distinctLikeList3 = likeList3.filter((obj,index) => {
            return likeList3.findIndex(item => item.P_NAME === obj.P_NAME && item.P_DAY === obj.P_DAY && item.P_TIME === obj.P_TIME) === index;
        })
        const reducedistinctLikeList3 = distinctLikeList3.reduce((acc, obj) => {
            if (acc.email === obj.email) {
                acc.PID.push(obj.PID);
            } else {
                acc = { email: obj.email, PID: [obj.PID] };
            }
            return acc;
        }, { email: '', PID: [] });

        // console.log('distinctLikesList1',distinctLikesList1)
        // console.log('distinctLikeList2',distinctLikeList2)
        console.log('distinctLikeList3',distinctLikeList3)

        res.status(200).json([distinctLikesList1, distinctLikeList2, distinctLikeList3]);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}