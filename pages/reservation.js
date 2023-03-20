import Container from "react-bootstrap/Container";


export default function reservation () {

    return(
        <div className={'container mt-5'} >
            <h1>hi! 예약페이지!</h1>
            <p>여기에 예약 정보를 표시!</p>

            <p>삭제 버튼을 누르면 임시 reservation 테이블에서 삭제하고, 메인페이지로 이동하게 합니다.</p>
            <p>예약 버튼을 누르면 reservation 테이블에 예약 정보를 저장하고, member 테이블의 해당 row에 reservation 테이블의 기본키를 저장합니다.</p>
            <p>그 후 '감사합니다'를 표시하고 3초 후 마이 페이지의 예약 정보 확인으로 이동합니다.</p>

            <p>그리고 예약 취소를 누르면 예약을 취소하게 하는 것도 좋겠습니다.</p>

        </div>

        )
}
