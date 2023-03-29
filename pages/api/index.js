import Index from "../../models/Index";

export default async (req, res) => {
    const {lid ,str, end} =req.query

    if(lid !== 'null') {
        if(str !== 'null') {
            if(end !== 'null') { // 지역 & 기간
                try {
                    let indexData = await new Index(lid,str,end).searchLNDate().then(result => result)

                    // 사진 중복 제거 절차
                    let indexInfo = indexData.filter((obj,index) => (
                        indexData.findIndex(item => (item.P_NAME === obj.P_NAME && item.P_PICLINK.length > 40)) === index
                    ))

                    res.status(200).json(indexInfo)
                } catch (err) {
                    console.log(err)
                    res.status(500).json(err)
                }


            } else if (end === 'null') { // 지역 & 당일(str)
                try {
                    let indexData = await new Index(lid,str,null).searchLNOne().then(result => result)

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
        } else if (str === 'null') {
            if(end !== 'null') { // 없는 경우
            } else if( end === 'null') { // 지역검색
                try {
                    let indexData = await new Index(lid ,str, end).selectLocal().then(result => result)

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
    } else if(lid === 'null') {
        if(str !== 'null') {    //
            if(end !== 'null') { // 기간 검색
                try {
                    let indexData = await new Index(null,str,end).searchDate().then(result => result)

                    // 사진 중복 제거 절차
                    let indexInfo = indexData.filter((obj,index) => (
                        indexData.findIndex(item => (item.P_NAME === obj.P_NAME && item.P_PICLINK.length > 40)) === index
                    ))

                    res.status(200).json(indexInfo)
                } catch (err) {
                    console.log(err)
                    res.status(500).json(err)
                }

            } else if (end === 'null') { // 당일 검색
                try {
                    let indexData = await new Index(null,str,null).searchOne().then(result => result)

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
        } else if (str === 'null') {
            if(end !== 'null') {    // 없음
            } else if( end === 'null') {    // 현재 기본 값 : 에디터 픽
                try{
                    let indexData = await new Index().default().then(result => result)

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
    }





}