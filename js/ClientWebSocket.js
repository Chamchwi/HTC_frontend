<!-- 서버 연결 -->
var webSocket = new WebSocket("ws://m");

webSocket.onmessage = function (event) {

	switch (event.patternCode) {
		case 1: //채팅
		addChatMessage(event.data);
		break;
		case 2: //의견추가
		add(event.data);
		break;
		case 3:
		break;
		case 4: //의견 삭제
		remove(event.data);
		break;
		case 5: //의견 그룹화 (화면 하단 표에 추가)
		merge(event.data);
		break;
		case 6:
		break;
		case 7:
		break;
	}
} //데이터 수신

webSocket.onopen = function (event) {
	console.log("서버 연결 완료");
}
webSocket.onclose = function (event) {
	console.log("서버 연결 종료");
}

<!-- 데이터 송신 -->
function send(json) {
	webSocket.send(json);
}