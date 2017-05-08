const keyGenerator = (len) => {
  let text = "";

  const charset = "abcdefghijklmnopqrstuvwxyz0123456789";

  for( var i=0; i < len; i++ )
      text += charset.charAt(Math.floor(Math.random() * charset.length));

  return text;
}

const setKey = () => {
  return keyGenerator(5);
}

export default setKey;
