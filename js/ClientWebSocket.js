<!-- 서버 연결 -->
var webSocket = new WebSocket("ws://m");

webSocket.onmessage = function (event) {

	// event = JSON.parse(event);
	console.log("받은 데이터 : " + event);

	try {
		switch (event.patternCode) {
			case "1": //채팅
			addChatMessage(event);
			break;
			case "2": //의견 추가
			add(event);
			break;
			case "3": //의견 수정
			modify(event);
			break;
			case "4": //의견 삭제
			remove(event);
			break;
			case "5": //의견 그룹화 (화면 하단 표에 추가)
			merge(event.data);
			break;
			case "6": //투표 개설
			createVote(event.data);
			break;
			case "7": //투표 참여
			receiveVote(event.data);
			break;
			case "8": //투표 결과 출력
			showResult(event.data);
			break;
			case "9": //누군가가 방 입장
			joinPeople(event);
			break;
			case "10": //누군가가 방 퇴장
			leftPeople(event);
			break;
			case "11": //다음 탭으로 전환
			next(event.modalNumber);
			break;
			default:
			break;
		}
	}
	catch (ex) {
		console.log(ex);
	}
} //데이터 수신

webSocket.onopen = function (event) {
	var json = {
		patternCode:"9",
		id:"@myID",
		teamInviteCode:"@teamInviteCode",
		nickname:"@myNickName"
	}

	// json = JSON.stringify(json);

	send(json);

	console.log("서버 연결 완료");
}

webSocket.onclose = function (event) {
	leftRoom();

	console.log("서버 연결 해제");
}

function leftRoom() {
	var json = {
		patternCode:"10",
		id:"@myID",
		teamInviteCode:"@teamInviteCode",
		nickname:"@myNickName"
	}

	// json = JSON.stringify(json);

	send(json);
}

<!-- 데이터 송신 -->
function send(json) {
	json = JSON.stringify(json);
	console.log("송신 데이터 : " + json);
	test(json);
	// webSocket.send(json);
}