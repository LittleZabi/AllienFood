const random = (limit) => {
  let a = "abcdefghijklmnop123987qrstuvwxyzabcdefghijklm";
  let n = "";
  for (let i = 0; i < limit; i++) {
    let r = Math.ceil(Math.random() * (a.length - 1));
    n += a[r];
  }
  return "alienfood-" + n;
};

export default random;
