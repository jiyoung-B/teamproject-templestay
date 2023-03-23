import selectIndex from "../../module/Index";

export default async (req, res) => {
    const {lid ,str, end} =req.query
    // 결과 선언부
    // 중간 결과
    // region : R , AND : N, DATE : D, DATES :DS
    let RNDSInfo;
    let RNDInfo;
    let Rinfo;
    let DATESInfo;
    let DATEInfo;
    let defInfo;

    console.log(Boolean(lid))
    console.log(Boolean(str))
    console.log(Boolean(lid))

    // 결과
    let searchInfo;
    // 경우의 수
    if(Boolean(lid)) { // 지역 검색
        if(Boolean(str)) {
            if(Boolean(end)) { // 지역 & 기간검색 / lid , str, end 모두 값 있음.


                searchInfo = RNDSInfo;
            } else { // 지역 & 당일검색 / lid, str



                searchInfo = RNDInfo
            }
        } else { // 지역 검색
            console.log('hi')

        }
    } else { // 기간 검색
        if(Boolean(str)) {
            if(Boolean(end)) { // 기간 출력


                searchInfo = DATESInfo
            } else { // 당일 출력


                searchInfo = DATEInfo
            }
        } else { // 기본값 출력


            searchInfo = defInfo
        }
    }


    try{
        let indexData = await selectIndex(lid).then(result => result)

        let indexInfo = indexData.filter((obj,index) => (
            indexData.findIndex(item => (item.P_NAME === obj.P_NAME && item.P_PICLINK.length > 40)) === index
        ))

        res.status(200).json(indexInfo)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }


}