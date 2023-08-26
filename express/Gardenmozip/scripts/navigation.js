function movepagepackage() {
    location.href = "/package";
}

function movepagethema() {
    location.href = "/thema";
}

function movepagevacation() {
    location.href = "/vacation";
}

function movepagehotel() {
    location.href = "/hotel";
}

function movepagemain() {
    location.href = "/hotel";
}

function movepagelogin() {
    location.href = "/login";
}

function movepagemypage() {
    location.href = "/mypage";
}

function movepagecenter() {
    location.href = "/center";
}

function movepagejoin() {
    location.href = "/join";
}

function movepagemain() {
    location.href = "/";
}

function logout() {
    const confirmLogout = confirm('로그아웃하시겠습니까?');
    if (confirmLogout) {
        location.href = "/logout";
    }
}