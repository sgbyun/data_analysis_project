// 이메일 주소 형식 검사 함수
export function validateEmail(email) {
  const emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(email);
}

// 비밀번호 유효성 검사 함수
export function validatePassword(password) {
  // 비밀번호는 최소 8자 이상이어야 합니다.
  return password.length >= 8;
}
