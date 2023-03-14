

export default function login() {
    return (
        <div>

            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#loginModal">
                로그인
            </button>
            <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#joinModal">
                회원가입
            </button>

            {/*login modal*/}
            <div className="modal fade" id="loginModal" tabIndex="-1" aria-labelledby="loginModalLabel" aria-hidden="true" >
                <div className="modal-dialog modal-dialog-centered modal-sm">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title" id="loginModalLabel">어서 오세요</h3>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="row">
                                    <div className="mb-3 col-md-12">
                                        <input type="email" className="form-control" id="email" placeholder="이메일주소"/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="mb-1 col-md-12">
                                        <input type="password" className="form-control" id="password" placeholder="비밀번호"/>
                                    </div>
                                </div>
                                <div className="mb-5 text-right position-relative">
                                    <div className="position-absolute top-0 end-0"><a className="#"><span className="text-primary" style={{fontSize: '0.8em'}} >이메일/비밀번호</span></a></div>
                                </div>
                                <div className="mb-3 text-center" ><button type="submit" className="btn col-md-10" style={{backgroundColor: 'saddlebrown', color: 'white'}}>로그인</button></div>
                                <div className="text-center"><button type="button" className="btn col-md-10" style={{backgroundColor:'#240a0a',color:'white'}} data-bs-toggle="modal" data-bs-target="#joinModal">회원가입</button></div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/*Join Modal */}
            <div className="modal fade" id="joinModal" tabIndex="-1" aria-labelledby="joinModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-sm">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title" id="loginModalLabel">회원가입</h3>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                {/* <div className="col-md-12"> */}
                                <div className="row">
                                    <div className="mb-3 col-md-4">
                                        <input type="text" className="form-control" id="fname" placeholder="성"/>
                                    </div>
                                    <div className="mb-3 col-md-8">
                                        <input type="text" className="form-control" id="lname" placeholder="이름"/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="mb-3 col-md-12">
                                        <input type="email" className="form-control" id="email" placeholder="이메일주소"/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="mb-5 col-md-12">
                                        <input type="password" className="form-control" id="password" placeholder="비밀번호"/>
                                    </div>
                                </div>
                                <div className="mb-3 text-center" ><button type="submit" className="btn col-md-10" style={{backgroundColor: '#240a0a',color:'white'}}>회원가입</button></div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}