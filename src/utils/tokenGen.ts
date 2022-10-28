const rand = () => {
  return Math.random().toString(36).substring(2);
};

export const tokenGen = () => {
  return rand() + rand();
};
