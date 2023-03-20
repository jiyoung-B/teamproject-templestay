// 이미지가 로드되지 않을 경우 onError 이벤트 처리를 위한 함수.
// ex
// <img src='에러발생' onError ={handleImgError} />
const handleImgError = (e) => {
    e.target.src = `https://www.templestay.com/images/templeinfo-00.jpg`
};

//  ex)
//  밀리초 => 2023-03-21
const milliFomatter = (millisecond) => {
    const tomorrow = new Date(millisecond);
    const year = tomorrow.getFullYear();
    const month = (tomorrow.getMonth() + 1).toString().padStart(2, "0"); // 월은 0부터 시작하므로 +1을 해준 후 문자열로 변환하고 2자리로 맞춰줍니다.
    const date = tomorrow.getDate().toString().padStart(2, "0"); // 일도 문자열로 변환하고 2자리로 맞춰줍니다.
    const formattedDate = `${year}-${month}-${date}`; // 년, 월, 일을 하이픈으로 이어서 문자열로 만듭니다.

    return formattedDate
}

// ex)
//
const dateFomatter = (UTFdate) => {
    let result;
    try{
        const year = UTFdate.getFullYear();
        const month = (UTFdate.getMonth() + 1).toString().padStart(2, "0"); // 월은 0부터 시작하므로 +1을 해준 후 문자열로 변환하고 2자리로 맞춰줍니다.
        const date = UTFdate.getDate().toString().padStart(2, "0"); // 일도 문자열로 변환하고 2자리로 맞춰줍니다.
        result = `${year}-${month}-${date}`; // 년, 월, 일을 하이픈으로 이어서 문자열로 만듭니다.
    }catch (e) {
        return null
    }

    return result
}



module.exports = {  handleImgError, milliFomatter, dateFomatter }