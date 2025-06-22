// 게임 상태 변수
let currentQuestion = 0;
let score = 0;
let currentSound = '';
let currentQuestionData = null;

// 강아지 소리 파일 목록 (실제 파일명)
const dogSounds = [
    'assets/d1_attention.mp3', 'assets/d2_Vigilance.wav', 'assets/d3_Surprise.wav', 
    'assets/d4_threat.wav', 'assets/d5_joy.wav', 'assets/d6_lonely.mp3', 
    'assets/d8_picnic.mp3', 'assets/d9_what.mp3', 'assets/d10_fight.mp3',
    'assets/d11_fight2.mp3', 'assets/d12_attack.mp3', 'assets/d15_snack.mp3',
    'assets/d16_water.mp3', 'assets/d17_whoareyou.mp3', 'assets/d18_hungry.mp3',
    'assets/s23.mp3', 'assets/s24.mp3', 'assets/s25.mp3', 'assets/s26.mp3'
];

// 강아지 소리별 상황 데이터 (실제 파일명 기준)
const dogSituations = {
    'assets/d1_attention.mp3': {
        question: '강아지의 현재 상태는?',
        choices: ['관심 끌고 싶어요', '목말라요', '심심해요'],
        correct: 0,
        explanation: '강아지가 관심을 끌고 싶어서 내는 소리였어요!'
    },
    'assets/d2_Vigilance.wav': {
        question: '강아지의 감정은?',
        choices: ['경계하고 있어요', '슬퍼요', '무서워요'],
        correct: 0,
        explanation: '강아지가 경계하며 내는 조심스러운 소리였어요!'
    },
    'assets/d3_Surprise.wav': {
        question: '강아지의 상태는?',
        choices: ['놀랐어요', '신나요', '화났어요'],
        correct: 0,
        explanation: '강아지가 놀라서 내는 깜짝 놀란 소리였어요!'
    },
    'assets/d4_threat.wav': {
        question: '강아지가 느끼는 감정은?',
        choices: ['위협을 느껴요', '안전해요', '편안해요'],
        correct: 0,
        explanation: '강아지가 위협을 느껴서 내는 경계하는 소리였어요!'
    },
    'assets/d5_joy.wav': {
        question: '강아지의 기분은?',
        choices: ['즐거워요', '슬퍼요', '피곤해요'],
        correct: 0,
        explanation: '강아지가 즐거워서 내는 신나는 소리였어요!'
    },
    'assets/d6_lonely.mp3': {
        question: '강아지의 감정 상태는?',
        choices: ['외로워요', '기뻐요', '화났어요'],
        correct: 0,
        explanation: '강아지가 외로워서 내는 쓸쓸한 소리였어요!'
    },
    'assets/d8_picnic.mp3': {
        question: '강아지가 원하는 것은?',
        choices: ['놀러 가고 싶어요', '집에 있고 싶어요', '잠자고 싶어요'],
        correct: 0,
        explanation: '강아지가 놀러 가고 싶어서 내는 들뜬 소리였어요!'
    },
    'assets/d9_what.mp3': {
        question: '강아지가 보고 있는 것은?',
        choices: ['무엇인지 궁금해요', '친한 사람이에요', '장난감이에요'],
        correct: 0,
        explanation: '강아지가 무엇인지 궁금해하며 내는 호기심 소리였어요!'
    },
    'assets/d10_fight.mp3': {
        question: '강아지의 의도는?',
        choices: ['싸우려 해요', '놀려고 해요', '도망가려 해요'],
        correct: 0,
        explanation: '강아지가 싸우려고 할 때 내는 으르렁거리는 소리였어요!'
    },
    'assets/d11_fight2.mp3': {
        question: '강아지의 상태는?',
        choices: ['결투하려 해요', '친해지려 해요', '숨으려 해요'],
        correct: 0,
        explanation: '강아지가 결투하려고 할 때 내는 도전적인 소리였어요!'
    },
    'assets/d12_attack.mp3': {
        question: '강아지의 의도는?',
        choices: ['공격하려 해요', '방어하려 해요', '피하려 해요'],
        correct: 0,
        explanation: '강아지가 공격하려고 할 때 내는 위협적인 소리였어요!'
    },
    'assets/d15_snack.mp3': {
        question: '강아지가 하고 있는 것은?',
        choices: ['과자 먹고 있어요', '물 마시고 있어요', '잠자고 있어요'],
        correct: 0,
        explanation: '강아지가 과자를 먹을 때 내는 맛있어하는 소리였어요!'
    },
    'assets/d16_water.mp3': {
        question: '강아지가 하고 있는 것은?',
        choices: ['물 마시고 있어요', '밥 먹고 있어요', '놀고 있어요'],
        correct: 0,
        explanation: '강아지가 물을 마실 때 내는 소리였어요!'
    },
    'assets/d17_whoareyou.mp3': {
        question: '강아지가 궁금해하는 것은?',
        choices: ['너는 누구야?', '뭐하는 거야?', '어디가는 거야?'],
        correct: 0,
        explanation: '강아지가 "너는 누구야?"라고 묻는 호기심 소리였어요!'
    },
    'assets/d18_hungry.mp3': {
        question: '강아지의 상태는?',
        choices: ['배고파요', '목말라요', '졸려요'],
        correct: 0,
        explanation: '강아지가 배고플 때 내는 간절한 소리였어요!'
    },

    'assets/s23.mp3': {
        question: '강아지가 알리고 싶은 것은?',
        choices: ['위험해요', '안전해요', '재미있어요'],
        correct: 0,
        explanation: '강아지가 위험을 감지하고 경고하는 소리였어요!'
    },
    'assets/s24.mp3': {
        question: '강아지의 요청사항은?',
        choices: ['도와줘요', '따라와요', '기다려요'],
        correct: 0,
        explanation: '강아지가 도움을 요청하는 급한 소리였어요!'
    },
    'assets/s25.mp3': {
        question: '강아지가 표현하는 기분은?',
        choices: ['만족해요', '아쉬워요', '놀라워요'],
        correct: 0,
        explanation: '강아지가 만족스러워하는 편안한 소리였어요!'
    },
    'assets/s26.mp3': {
        question: '강아지의 의도는?',
        choices: ['인사해요', '작별해요', '축하해요'],
        correct: 0,
        explanation: '강아지가 인사를 건네는 친근한 소리였어요!'
    },

};

// DOM 요소들
const screens = {
    start: document.getElementById('start-screen'),
    quiz: document.getElementById('quiz-screen'),
    feedback: document.getElementById('feedback-screen'),
    result: document.getElementById('result-screen'),
    coupon: document.getElementById('coupon-screen')
};

const elements = {
    startBtn: document.getElementById('start-btn'),
    playSoundBtn: document.getElementById('play-sound-btn'),
    dogSound: document.getElementById('dog-sound'),
    choiceBtns: document.querySelectorAll('.choice-btn'),
    feedbackIcon: document.querySelector('.feedback-icon'),
    feedbackTitle: document.querySelector('.feedback-title'),
    feedbackMessage: document.querySelector('.feedback-message'),
    nextBtn: document.getElementById('next-btn'),
    finalScoreNum: document.getElementById('final-score-num'),
    gradeIcon: document.querySelector('.grade-icon'),
    gradeTitle: document.querySelector('.grade-title'),
    couponBtn: document.getElementById('coupon-btn'),
    retryBtn: document.getElementById('retry-btn'),
    homeBtn: document.getElementById('home-btn'),
    saveCouponBtn: document.getElementById('save-coupon-btn'),
    homeFromCouponBtn: document.getElementById('home-from-coupon-btn'),
    failAnimation: document.getElementById('fail-animation')
};

// 이벤트 리스너 등록
function initializeEventListeners() {
    elements.startBtn.addEventListener('click', startGame);
    elements.playSoundBtn.addEventListener('click', playDogSound);
    elements.nextBtn.addEventListener('click', showResults);
    elements.couponBtn.addEventListener('click', () => {
        // 쿠폰 다운로드 후 바로 홈으로
        generateCouponHTML();
        setTimeout(() => {
            goHome();
        }, 1000);
    });
    elements.retryBtn.addEventListener('click', resetGame);
    elements.homeBtn.addEventListener('click', goHome);
    elements.saveCouponBtn.addEventListener('click', saveCoupon);
    elements.homeFromCouponBtn.addEventListener('click', goHome);

    // 선택지 버튼 이벤트는 동적 생성 시 추가됨 (onclick으로 처리)
}

// 화면 전환 함수
function showScreen(screenName) {
    Object.values(screens).forEach(screen => {
        screen.classList.remove('active');
    });
    screens[screenName].classList.add('active');
}

// 게임 시작
function startGame() {
    resetGameState();
    showScreen('quiz');
    loadQuestion();
}

// 게임 상태 초기화
function resetGameState() {
    currentQuestion = 0;
    score = 0;
    
    // 랜덤한 강아지 소리 선택
    currentSound = dogSounds[Math.floor(Math.random() * dogSounds.length)];
    
    console.log('🎮 게임 상태 초기화');
    console.log('🔊 선택된 소리:', currentSound);
    console.log('📝 해당 소리의 문제 데이터:', dogSituations[currentSound]);
}

// 선택지 랜덤 섞기 함수
function shuffleChoices(questionData) {
    const choices = [...questionData.choices]; // 배열 복사
    const correctAnswer = choices[questionData.correct]; // 정답 텍스트 저장
    
    // 피셔-예이츠 셔플 알고리즘으로 선택지 섞기
    for (let i = choices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [choices[i], choices[j]] = [choices[j], choices[i]];
    }
    
    // 섞인 배열에서 정답의 새로운 위치 찾기
    const newCorrectIndex = choices.findIndex(choice => choice === correctAnswer);
    
    return {
        ...questionData,
        choices: choices,
        correct: newCorrectIndex
    };
}

// 문제 로드
function loadQuestion() {
    // 디버깅을 위한 로그
    console.log('🔍 현재 선택된 소리:', currentSound);
    console.log('🔍 dogSituations에서 찾은 데이터:', dogSituations[currentSound]);
    
    // 현재 소리에 맞는 문제 데이터 가져오기
    let questionData = dogSituations[currentSound] || {
        question: '강아지가 뭐라고 말하는 것 같나요?',
        choices: ['배고파요', '놀아줘요', '산책가요'],
        correct: 0,
        explanation: '강아지의 소리를 잘 들어보셨네요!'
    };
    
    // 기본값이 사용되었는지 확인
    if (!dogSituations[currentSound]) {
        console.warn('⚠️ 기본값이 사용되었습니다. currentSound가 올바르지 않거나 dogSituations에 없습니다.');
    }
    
    // 선택지 랜덤 섞기
    questionData = shuffleChoices({...questionData}); // 깊은 복사로 원본 보호
    
    // 현재 문제 데이터 저장
    currentQuestionData = questionData;
    
    console.log('🎲 섞인 후 정답 인덱스:', questionData.correct + 1, '번');
    console.log('🎲 정답:', questionData.choices[questionData.correct]);
    console.log('🎲 전체 선택지:', questionData.choices);
    
    // 문제 텍스트 업데이트
    document.getElementById('question-text').textContent = questionData.question;
    
    // 오디오 소스 설정
    elements.dogSound.src = currentSound;
    
    // 선택지 동적 생성
    const choicesContainer = document.getElementById('choices-container');
    choicesContainer.innerHTML = ''; // 기존 선택지 제거
    
    questionData.choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.className = 'choice-btn';
        button.textContent = choice;
        button.onclick = () => selectAnswer(index);
        choicesContainer.appendChild(button);
    });
    
    // elements.choiceBtns 업데이트
    elements.choiceBtns = document.querySelectorAll('.choice-btn');

    // 소리 자동 재생
    setTimeout(() => {
        playDogSound();
    }, 500);
}

// 강아지 소리 재생 (최대 5초)
function playDogSound() {
    const audio = elements.dogSound;
    
    // 오디오 소스가 설정되지 않았거나 비어있다면 현재 선택된 소리로 설정
    if (!audio.src || audio.src === '' || audio.src === window.location.href) {
        if (currentSound) {
            audio.src = currentSound;
        } else {
            // 게임이 시작되지 않았다면 랜덤 소리 선택
            currentSound = dogSounds[Math.floor(Math.random() * dogSounds.length)];
            audio.src = currentSound;
        }
    }
    
    audio.currentTime = 0;
    
    // 5초 후 자동 정지
    const stopTimer = setTimeout(() => {
        audio.pause();
        audio.currentTime = 0;
    }, 5000);
    
    // 오디오가 자연스럽게 끝나면 타이머 취소
    audio.addEventListener('ended', () => {
        clearTimeout(stopTimer);
    }, { once: true });
    
    audio.play().catch(error => {
        console.log('오디오 재생 실패:', error);
        clearTimeout(stopTimer);
        
        // 브라우저 자동재생 정책으로 인한 실패인지 확인
        if (error.name === 'NotAllowedError') {
            alert('🔊 소리를 재생하려면 페이지와 상호작용이 필요합니다.\n화면을 한 번 클릭한 후 다시 시도해주세요!');
            return;
        }
        
        // 대체 파일 시도
        tryAlternativeSound();
    });
}

// 대체 사운드 파일 시도 (최대 5초)
function tryAlternativeSound() {
    // 다른 랜덤한 강아지 소리 선택
    const randomSound = dogSounds[Math.floor(Math.random() * dogSounds.length)];
    const audio = elements.dogSound;
    
    // currentSound도 업데이트 (중요!)
    currentSound = randomSound;
    audio.src = randomSound;
    
    console.log('🔄 대체 소리로 변경:', currentSound);
    
    // 5초 후 자동 정지
    const stopTimer = setTimeout(() => {
        audio.pause();
        audio.currentTime = 0;
    }, 5000);
    
    // 오디오가 자연스럽게 끝나면 타이머 취소
    audio.addEventListener('ended', () => {
        clearTimeout(stopTimer);
    }, { once: true });
    
    audio.play().catch(error => {
        console.log('대체 오디오도 재생 실패:', error);
        clearTimeout(stopTimer);
        alert('소리 파일을 재생할 수 없습니다. 강아지 소리 파일들이 assets 폴더에 있는지 확인해주세요.');
    });
    
    // 대체 소리에 맞는 문제 데이터로 업데이트
    updateQuestionForCurrentSound();
}

// 현재 소리에 맞는 문제 데이터 업데이트
function updateQuestionForCurrentSound() {
    // 현재 소리에 맞는 문제 데이터 가져오기
    let questionData = dogSituations[currentSound] || {
        question: '강아지가 뭐라고 말하는 것 같나요?',
        choices: ['배고파요', '놀아줘요', '산책가요'],
        correct: 0,
        explanation: '강아지의 소리를 잘 들어보셨네요!'
    };
    
    // 선택지 랜덤 섞기
    questionData = shuffleChoices({...questionData}); // 깊은 복사로 원본 보호
    
    // 현재 문제 데이터 저장
    currentQuestionData = questionData;
    
    console.log('🎲 업데이트된 정답 인덱스:', questionData.correct + 1, '번');
    console.log('🎲 정답:', questionData.choices[questionData.correct]);
    console.log('🎲 전체 선택지:', questionData.choices);
    
    // 문제 텍스트 업데이트
    document.getElementById('question-text').textContent = questionData.question;
    
    // 선택지 동적 업데이트
    const choicesContainer = document.getElementById('choices-container');
    choicesContainer.innerHTML = ''; // 기존 선택지 제거
    
    questionData.choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.className = 'choice-btn';
        button.textContent = choice;
        button.onclick = () => selectAnswer(index);
        choicesContainer.appendChild(button);
    });
    
    // elements.choiceBtns 업데이트
    elements.choiceBtns = document.querySelectorAll('.choice-btn');
    
    console.log('✅ 문제 데이터가 업데이트되었습니다:', questionData);
}

// 답 선택
function selectAnswer(selectedIndex) {
    const isCorrect = selectedIndex === currentQuestionData.correct;
    
    // 모든 버튼 비활성화
    elements.choiceBtns.forEach(btn => {
        btn.disabled = true;
    });
    
    // 정답/오답 표시
    elements.choiceBtns.forEach((btn, index) => {
        if (index === currentQuestionData.correct) {
            btn.classList.add('correct');
        } else if (index === selectedIndex && !isCorrect) {
            btn.classList.add('wrong');
        }
    });
    
    // 점수 업데이트
    if (isCorrect) {
        score = 1;
    } else {
        score = 0;
    }
    
    // 피드백 표시
    setTimeout(() => {
        showFeedback(isCorrect, currentQuestionData.explanation);
    }, 1000);
}

// 피드백 표시
function showFeedback(isCorrect, explanation) {
    // 피드백 내용 설정
    if (isCorrect) {
        elements.feedbackIcon.textContent = '🎉';
        elements.feedbackTitle.textContent = '정답입니다!';
        elements.feedbackTitle.style.color = '#00b894';
        elements.feedbackMessage.textContent = explanation;
        
        // 성공 사운드 재생 + 축포 효과
        playSuccessSound();
        showFireworks();
    } else {
        elements.feedbackIcon.textContent = '😅';
        elements.feedbackTitle.textContent = '아쉬워요!';
        elements.feedbackTitle.style.color = '#e17055';
        elements.feedbackMessage.textContent = explanation; // 오답이어도 소리의 의미 설명
        
        // 실패 사운드 재생
        playFailSound();
    }
    
    showScreen('feedback');
}

// 성공 사운드 재생
function playSuccessSound() {
    const audio = new Audio('assets/suc_01.wav');
    audio.volume = 0.7;
    audio.play().catch(error => console.log('성공 사운드 재생 실패:', error));
}

// 실패 사운드 재생
function playFailSound() {
    const failSounds = ['assets/fail_02.mp3', 'assets/fail_03.mp3', 'assets/fail_04.mp3'];
    const randomFailSound = failSounds[Math.floor(Math.random() * failSounds.length)];
    
    const audio = new Audio(randomFailSound);
    audio.volume = 0.5;
    audio.play().catch(error => console.log('실패 사운드 재생 실패:', error));
}

// 강력한 축포 효과
function showFireworks() {
    const successCelebration = document.getElementById('success-celebration');
    const successText = document.getElementById('success-text');
    const successImage = document.getElementById('success-image');
    
    // 축포 효과 활성화
    successCelebration.classList.add('active');
    successText.classList.add('active');
    successImage.classList.add('active');
    
    // 3초 후 효과 제거
    setTimeout(() => {
        successCelebration.classList.remove('active');
        successText.classList.remove('active');
        successImage.classList.remove('active');
    }, 3000);
    
    console.log('🎆 강력한 축포 효과 시작!');
}

// 결과 표시
function showResults() {
    elements.finalScoreNum.textContent = score;
    
    // 등급 결정 (1문제 기준)
    let grade, gradeIcon, gradeTitle;
    
    if (score === 1) {
        grade = 'success';
        gradeIcon = '🏆';
        gradeTitle = '정답! 강아지 마음을 알아챘어요!';
        elements.couponBtn.style.display = 'block';
        
        // 축하 사운드 재생
        const audio = new Audio('assets/Ascending 3.mp3');
        audio.volume = 0.7;
        audio.play().catch(error => console.log('축하 사운드 재생 실패:', error));
        
    } else {
        grade = 'fail';
        gradeIcon = '😅';
        gradeTitle = '아쉬워요! 다시 도전해보세요!';
        elements.couponBtn.style.display = 'none';
        
        // 실패 애니메이션 표시
        showFailAnimation();
    }
    
    elements.gradeIcon.textContent = gradeIcon;
    elements.gradeTitle.textContent = gradeTitle;
    elements.gradeTitle.style.color = score >= 1 ? '#00b894' : '#e17055';
    
    showScreen('result');
}

// 실패 애니메이션 표시
function showFailAnimation() {
    elements.failAnimation.style.display = 'flex';
    
    // ggg.wav 사운드 재생
    const audio = new Audio('assets/ggg.wav');
    audio.volume = 0.5;
    audio.play().catch(error => console.log('실패 애니메이션 사운드 재생 실패:', error));
    
    // 4초 후 애니메이션 숨기기
    setTimeout(() => {
        elements.failAnimation.style.display = 'none';
    }, 4000);
}

// 쿠폰 화면 표시
function showCouponScreen() {
    showScreen('coupon');
}

// 쿠폰 저장 및 다운로드
function saveCoupon() {
    // 바로 새로운 텍스트 쿠폰 생성
    generateCouponHTML();
    
    // 저장 효과음
    const audio = new Audio('assets/Correct 5.mp3');
    audio.volume = 0.5;
    audio.play().catch(error => console.log('저장 사운드 재생 실패:', error));
}



// HTML로 쿠폰 생성 및 다운로드
function generateCouponHTML() {
    // 현재 날짜와 시간 (고유성을 위해)
    const now = new Date();
    const dateString = now.getFullYear() + '년 ' + (now.getMonth() + 1) + '월 ' + now.getDate() + '일';
    const timeString = now.getHours() + '시 ' + now.getMinutes() + '분';
    
    // 캔버스 생성
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // 캔버스 크기 설정
    canvas.width = 600;
    canvas.height = 500;
    
    // 배경 그라디언트 (노란색)
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#f1c40f');
    gradient.addColorStop(1, '#f39c12');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 점선 테두리
    ctx.strokeStyle = '#e74c3c';
    ctx.lineWidth = 4;
    ctx.setLineDash([12, 8]);
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);
    
    // 내부 테두리
    ctx.strokeStyle = '#c0392b';
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 4]);
    ctx.strokeRect(35, 35, canvas.width - 70, canvas.height - 70);
    
    // 텍스트 설정
    ctx.textAlign = 'center';
    ctx.fillStyle = '#e74c3c';
    
    // 🎁 아이콘들 (양쪽 상단)
    ctx.font = '40px Arial';
    ctx.fillText('🎁', 150, 80);
    ctx.fillText('🎁', 450, 80);
    
    // "축하 쿠폰" 텍스트
    ctx.font = 'bold 32px Arial, sans-serif';
    ctx.fillStyle = '#e74c3c';
    ctx.fillText('축하 쿠폰', canvas.width / 2, 120);
    
    // "강아지 간식 쿠폰" 메인 텍스트
    ctx.font = 'bold 40px Arial, sans-serif';
    ctx.fillStyle = '#c0392b';
    ctx.fillText('강아지 간식 쿠폰', canvas.width / 2, 170);
    
    // 강아지 이모지들 (양쪽에 배치)
    ctx.font = '35px Arial';
    ctx.fillText('🐕', 120, 210);
    ctx.fillText('🐕', 480, 210);
    
    // "게임 성공 기념!" 텍스트
    ctx.font = 'bold 24px Arial, sans-serif';
    ctx.fillStyle = '#2c3e50';
    ctx.fillText('게임 성공 기념!', canvas.width / 2, 240);
    
    // 유효기간
    ctx.font = '20px Arial, sans-serif';
    ctx.fillStyle = '#2c3e50';
    ctx.fillText('유효기간: 2025. 7. 22.', canvas.width / 2, 280);
    
    // 하단 구분선
    ctx.strokeStyle = '#e74c3c';
    ctx.lineWidth = 2;
    ctx.setLineDash([10, 5]);
    ctx.beginPath();
    ctx.moveTo(60, 320);
    ctx.lineTo(canvas.width - 60, 320);
    ctx.stroke();
    
    // 하단 텍스트
    ctx.font = '18px Arial, sans-serif';
    ctx.fillStyle = '#34495e';
    ctx.fillText('견체공학 강아지 음성 공학 연구소', canvas.width / 2, 360);
    
    // 발급일시
    ctx.font = '16px Arial, sans-serif';
    ctx.fillStyle = '#7f8c8d';
    ctx.fillText(`발급일시: ${dateString} ${timeString}`, canvas.width / 2, 390);
    
    // 하단 장식 (뼈다귀 이모지들)
    ctx.font = '20px Arial';
    ctx.fillStyle = '#e67e22';
    const bones = '🦴🦴🦴🦴🦴🦴🦴🦴🦴🦴';
    ctx.fillText(bones, canvas.width / 2, 430);
    
    // 축하 메시지 (작게)
    ctx.font = '14px Arial, sans-serif';
    ctx.fillStyle = '#2c3e50';
    ctx.fillText('🎉 강아지 마음 이해 능력 인증서 🎉', canvas.width / 2, 460);
    
    // 캔버스를 이미지로 변환하여 다운로드
    canvas.toBlob(function(blob) {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = '강아지_간식_쿠폰_' + now.getTime() + '.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
        
        alert('🎉 강아지 간식 쿠폰 이미지가 다운로드되었습니다!\n다운로드 폴더에서 PNG 파일을 확인해주세요!');
    }, 'image/png');
}

// 게임 리셋
function resetGame() {
    resetGameState();
    showScreen('quiz');
    loadQuestion();
}

// 홈으로 가기
function goHome() {
    showScreen('start');
}

// 키보드 이벤트 (접근성 향상)
document.addEventListener('keydown', (event) => {
    const activeScreen = document.querySelector('.screen.active');
    
    if (activeScreen === screens.quiz) {
        // 퀴즈 화면에서 숫자키로 답 선택
        if (event.key >= '1' && event.key <= '3') {
            const index = parseInt(event.key) - 1;
            if (!elements.choiceBtns[index].disabled) {
                selectAnswer(index);
            }
        }
        // 스페이스바로 소리 재생
        else if (event.key === ' ') {
            event.preventDefault();
            playDogSound();
        }
    }
    
    // 엔터키로 다음 진행
    if (event.key === 'Enter') {
        const activeButton = activeScreen.querySelector('.btn-primary:not([style*="display: none"])');
        if (activeButton && !activeButton.disabled) {
            activeButton.click();
        }
    }
});

// 이미지 로드 확인 함수
function checkPuppyImage() {
    const puppyImages = document.querySelectorAll('.puppy-image, .puppy-speaking');
    
    puppyImages.forEach(img => {
        img.onload = function() {
            console.log('✅ puppy.png 이미지가 성공적으로 로드되었습니다!');
            // 이미지가 로드되면 이모지 숨기기
            const fallbackEmoji = img.nextElementSibling;
            if (fallbackEmoji) {
                fallbackEmoji.style.display = 'none';
            }
        };
        
        img.onerror = function() {
            console.log('❌ puppy.png 로드 실패, 이모지로 대체합니다.');
            img.style.display = 'none';
            // 이미지 로드 실패시 이모지 표시
            const fallbackEmoji = img.nextElementSibling;
            if (fallbackEmoji) {
                fallbackEmoji.style.display = 'inline-block';
            }
        };
    });
}

// 오디오 컨텍스트 초기화 (브라우저 자동재생 정책 대응)
function initializeAudioContext() {
    // 사용자 상호작용 시 오디오 컨텍스트 활성화
    const enableAudio = () => {
        const audio = elements.dogSound;
        if (audio) {
            audio.load(); // 오디오 엘리먼트 초기화
        }
        
        // 이벤트 리스너 제거 (한 번만 실행)
        document.removeEventListener('click', enableAudio);
        document.removeEventListener('touchstart', enableAudio);
        
        console.log('🔊 오디오 컨텍스트가 활성화되었습니다.');
    };
    
    // 사용자 상호작용을 기다림
    document.addEventListener('click', enableAudio);
    document.addEventListener('touchstart', enableAudio);
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
    initializeEventListeners();
    initializeAudioContext();
    
    // 이미지 로드 확인
    checkPuppyImage();
    
    console.log('🐾 강아지 말 맞추기 게임이 준비되었습니다!');
    console.log('💡 사용 가능한 강아지 소리:', dogSounds.length + '개');
    console.log('📊 문제 데이터 개수:', Object.keys(dogSituations).length + '개');
    console.log('🎮 게임 방법:');
    console.log('- 강아지 소리를 듣고 선택지 중 정답을 고르세요');
    console.log('- 키보드: 1,2,3키로 답 선택, 스페이스바로 소리 재생');
    console.log('🔊 소리가 안 들리면 화면을 한 번 클릭해주세요!');
    
    // 문제 데이터 검증
    console.log('🔍 문제 데이터 검증:');
    dogSounds.forEach(sound => {
        if (dogSituations[sound]) {
            console.log(`✅ ${sound}: 문제 데이터 있음`);
        } else {
            console.warn(`❌ ${sound}: 문제 데이터 없음`);
        }
    });
});

// 모바일 터치 이벤트 지원
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
}

// 게임 통계
function getGameStats() {
    const stats = {
        totalQuestions: 1,
        correctAnswers: score,
        accuracy: score * 100,
        grade: score === 1 ? '강아지 간식 전문가' : '재도전 필요'
    };
    
    return stats;
}

// 개발자 콘솔용 치트 함수들
window.gameCheat = {
    setScore: (newScore) => {
        score = newScore === 1 ? 1 : 0;
        console.log(`점수가 ${score}로 설정되었습니다.`);
    },
    skipToResult: () => {
        showResults();
        console.log('결과 화면으로 이동했습니다.');
    },
    playRandomSound: () => {
        const randomSound = dogSounds[Math.floor(Math.random() * dogSounds.length)];
        const audio = new Audio(randomSound);
        audio.play().catch(() => console.log('소리 재생 실패'));
        console.log('랜덤 강아지 소리 재생:', randomSound);
    },
    showStats: () => {
        console.log('게임 통계:', getGameStats());
    },
    testSpecificSound: (soundFile) => {
        currentSound = soundFile;
        console.log('테스트 소리 설정:', currentSound);
        console.log('해당 문제 데이터:', dogSituations[currentSound]);
        if (document.querySelector('.screen.active') === screens.quiz) {
            updateQuestionForCurrentSound();
        }
    },
    testRandomDistribution: (times = 100) => {
        console.log(`🎲 ${times}번 셔플 테스트 시작...`);
        const distribution = {0: 0, 1: 0, 2: 0};
        
        const testData = {
            question: '테스트 질문',
            choices: ['정답', '오답1', '오답2'],
            correct: 0,
            explanation: '테스트'
        };
        
        for (let i = 0; i < times; i++) {
            const shuffled = shuffleChoices({...testData});
            distribution[shuffled.correct]++;
        }
        
        console.log('📊 정답 위치 분포:');
        console.log(`1번: ${distribution[0]}회 (${(distribution[0]/times*100).toFixed(1)}%)`);
        console.log(`2번: ${distribution[1]}회 (${(distribution[1]/times*100).toFixed(1)}%)`);
        console.log(`3번: ${distribution[2]}회 (${(distribution[2]/times*100).toFixed(1)}%)`);
        
        return distribution;
    },
    testCurrentShuffle: () => {
        if (currentQuestionData) {
            console.log('현재 문제 셔플 테스트:');
            for (let i = 0; i < 10; i++) {
                const shuffled = shuffleChoices({...currentQuestionData});
                console.log(`${i+1}번째: 정답 ${shuffled.correct + 1}번 - ${shuffled.choices[shuffled.correct]}`);
            }
        } else {
            console.log('게임을 먼저 시작해주세요.');
        }
    }
}; 