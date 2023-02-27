export const getSubject = (subject) => {
  if (subject.slice(0, 3).toLowerCase() !== "re:") return subject;
  else return subject.slice(3);
};
