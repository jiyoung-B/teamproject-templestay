import selectPro from "../../models/Program";

export default async (req, res) => {
    const {pid} =req.query

    try{
        let proData = await selectPro(pid).then(result => result)
        let copyData = [...proData]


        let P_INFO = [];

        let P_PIC = copyData[1].map(obj => {
            if (obj.PID === pid) return obj.P_PICLINK }).filter(link => link !== undefined)

        let preP_SCH = proData[3].map(obj => {
            return (
                {P_DAY:obj.P_DAY, P_INFO:[{P_TIME: obj.P_TIME, P_CONTENT : obj.P_CONTENT}]}
            )
        });
        function mergeObjects(data) {
            const mergedData = [];
            const days = [];

            // Extract unique days from input data
            for (const item of data) {
                if (!days.includes(item.P_DAY)) {
                    days.push(item.P_DAY);
                }
            }

            // Merge objects for each unique day
            for (const day of days) {
                const objects = [];

                for (const item of data) {
                    if (item.P_DAY === day) {
                        objects.push(...item.P_INFO);
                    }
                }

                mergedData.push({
                    P_DAY: day,
                    P_INFO: objects
                });
            }

            return mergedData;
        }

        const P_SCH = mergeObjects(preP_SCH);


        let P_OPInfo = copyData[1]
            .filter((obj,index) => (copyData[1].findIndex(item => obj.P_NAME === item.P_NAME) === index && obj.PID !== pid))

        P_INFO.push(proData[0]);
        P_INFO.push(P_PIC);
        P_INFO.push(proData[2]);
        P_INFO.push(proData[3]);
        P_INFO.push(P_SCH); // 문제
        P_INFO.push(P_OPInfo);
        P_INFO.push(proData[4])

        console.log('progrma api- P_INFO',P_INFO[6])


        res.status(200).json(P_INFO)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }

}