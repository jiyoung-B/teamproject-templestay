import Index from "../../module/Index";

export default async (req, res) => {
    const {lid ,str, end} =req.query
    console.log(lid ,str, end)

    // str은 항상 존재할 수 밖에 없다. end의 존재 여부로 기간과 당일 검색을 판단한다.
    if(lid !== 'null') { // lid 존재하고,
        if(end !== 'null') { // end가 존재하므로, 기간 검색이다.
            try {
                let indexData = await new Index().searchDate(lid,str,end).then(result => result)

                // 사진 중복 제거 절차
                let indexInfo = indexData.filter((obj,index) => (
                    indexData.findIndex(item => (item.P_NAME === obj.P_NAME && item.P_PICLINK.length > 40)) === index
                ))

                res.status(200).json(indexInfo)
            } catch (err) {
                console.log(err)
                res.status(500).json(err)
            }

        } else { // end가 존재하지 않으므로, 당일 검색이다. 당일 검색은 프로그램의 시작 날짜와 종료 날짜 사이에 해당 기간이 있는지로 확인한다.
            try {
                let indexData = await new Index().searchOne(lid,str).then(result => result)

                // 사진 중복 제거 절차
                let indexInfo = indexData.filter((obj,index) => (
                    indexData.findIndex(item => (item.P_NAME === obj.P_NAME && item.P_PICLINK.length > 40)) === index
                ))

                res.status(200).json(indexInfo)
            } catch (err) {
                console.log(err)
                res.status(500).json(err)
            }

        }
    } else { // 만약 지역정보가 없다면, 기본값이 출력된다. 기본값은 에디터 픽이다.
        try{
            let indexData = await new Index().editorPic().then(result => result)

            // 사진 중복 제거 절차
            let indexInfo = indexData.filter((obj,index) => (
                indexData.findIndex(item => (item.P_NAME === obj.P_NAME && item.P_PICLINK.length > 40)) === index
            ))

            res.status(200).json(indexInfo)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }


}