export const numbericSort = (property) => {
  let sortOrder = 1
  if(property[0] === "-") {
    sortOrder = -1
    property = property.substr(1);
  }
  return (a,b) => b[property]-a[property]  
}