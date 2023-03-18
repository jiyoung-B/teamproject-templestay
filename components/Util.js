
// 이미지가 로드되지 않을 경우 onError 이벤트 처리를 위한 함수.
// ex
// <img src='에러발생' onError ={handleImgError} />
const handleImgError = (e) => {
    e.target.src = `https://www.templestay.com/images/templeinfo-00.jpg`
};



module.exports = {  handleImgError }