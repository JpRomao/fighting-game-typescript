function secondsToNanoSeconds(seconds = 1) {
  return seconds * 1000000000;
}

function milisecondsToNanoSeconds(miliseconds = 1) {
  return miliseconds * 1000000;
}

function secondsToMiliseconds(seconds = 1) {
  return seconds * 1000;
}

export { secondsToNanoSeconds, milisecondsToNanoSeconds, secondsToMiliseconds };
