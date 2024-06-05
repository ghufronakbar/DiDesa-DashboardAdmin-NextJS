function formatString(str, maxLength) {
    if (str.length > maxLength) {
      return str.slice(0, maxLength) + '...';
    }
    return str;
  }

  export default formatString