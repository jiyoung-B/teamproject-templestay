import Likeslist from "../../models/Likeslist";

export default async (req, res) => {
    let email = req.query.email;

    try {
        const likeslist = await Likeslist(email).then((lk) => lk);

        let likesList1=likeslist[0].map((llk) => ({PID : llk.PID, T_NAME : llk.T_NAME, P_NAME : llk.P_NAME, ADDR : llk.ADDR, PRICE : llk.PRICE})
        )
        let distinctLikesList1 = likesList1.filter((obj,index) => {
            return likesList1.findIndex(item => item.PID === obj.PID) === index;
        })
        let likeList3=likeslist[0].map((llk) => ({P_NAME:llk.P_NAME,P_DAY:llk.P_DAY,P_TIME:llk.P_TIME,P_CONTENT:llk.P_CONTENT}))
        let distinctLikeList3 = likeList3.filter((obj,index) => {
            return likeList3.findIndex(item => item.P_NAME === obj.P_NAME && item.P_DAY === obj.P_DAY && item.P_TIME === obj.P_TIME) === index;
        })

        //위 함수에서는 forEach() 함수를 이용해서 원본 데이터 배열을 순회하면서, 각 아이템을 새로운 형식으로 변환합니다.
        // 먼저, 변환된 데이터를 저장할 빈 배열 transformedData를 선언합니다.
        // 그리고 forEach() 함수를 이용해서 원본 데이터 배열을 순회하면서, 각 아이템을 새로운 형식으로 변환합니다.
        // 이때, find() 함수를 이용해서 같은 이름을 가진 일정이 이미 있는지 검사합니다.
        // 같은 이름을 가진 일정이 이미 있다면, 해당 일정의 일자(P_DAY)를 검사합니다.
        // 일자가 같은 일정이 이미 있다면, 해당 일정의 정보(P_INFO) 배열에 새로운 정보를 추가합니다.
        // 일자가 없다면, 해당 일정을 새로 추가합니다.
        // 같은 이름을 가진 일정이 없다면, 새로운 일정을 추가합니다.
        function transformData(data) {
            const transformedData = [];

            data.forEach((item) => {
                const existingItem = transformedData.find(
                    (transformedItem) => transformedItem.P_NAME === item.P_NAME
                );

                if (existingItem) {
                    const existingDay = existingItem.P_SCH.find(
                        (day) => day.P_DAY === item.P_DAY
                    );

                    if (existingDay) {
                        existingDay.P_INFO.push({
                            P_TIME: item.P_TIME,
                            P_CONTENT: item.P_CONTENT,
                        });
                    } else {
                        existingItem.P_SCH.push({
                            P_DAY: item.P_DAY,
                            P_INFO: [
                                {
                                    P_TIME: item.P_TIME,
                                    P_CONTENT: item.P_CONTENT,
                                },
                            ],
                        });
                    }
                } else {
                    transformedData.push({
                        P_NAME: item.P_NAME,
                        P_SCH: [
                            {
                                P_DAY: item.P_DAY,
                                P_INFO: [
                                    {
                                        P_TIME: item.P_TIME,
                                        P_CONTENT: item.P_CONTENT,
                                    },
                                ],
                            },
                        ],
                    });
                }
            });

            return transformedData;
        }

        distinctLikeList3 = transformData(distinctLikeList3)

        for (let i = 0; i < distinctLikesList1.length; i++) {
            distinctLikesList1[i].P_SCH = distinctLikeList3[i].P_SCH
        }

        res.status(200).json([distinctLikesList1, distinctLikeList3]);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}