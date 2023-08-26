

const before = document.getElementById('before');
const after = document.getElementById('after');

function loadtrue(data) {
    console.log(data);

    if (data) {
        before.style.display = 'none';
        after.style.display = 'block';

        // // 여기서 data.username, data.userid를 이용하여 프로필 정보 표시
        // document.getElementById('username').textContent = data.username;
        // document.getElementById('userid').textContent = data.userid;
    } else {
        before.style.display = 'block';
        after.style.display = 'none';
    }
}