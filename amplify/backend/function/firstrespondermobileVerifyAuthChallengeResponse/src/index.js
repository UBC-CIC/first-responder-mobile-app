exports.handler = async (event) => {
  console.log(event.request);
  
  const expectedAnswer = event.request.privateChallengeParameters.secretLoginCode; 
  if (event.request.challengeAnswer === expectedAnswer) {
      event.response.answerCorrect = true;
      console.log("correct answer")
  } else {
      event.response.answerCorrect = false;
      console.log("incorrect answer")
  }
  
  return event;
};  