// 나이 구하기
const getAge = (birth:Date):number => {
  const today = new Date();
  const birthDate = new Date(birth);
  return today.getFullYear() - birthDate.getFullYear() + 1;
}



export { getAge }