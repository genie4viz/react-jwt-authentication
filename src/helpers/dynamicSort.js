export const dynamicSort = (property) => {
  let sortOrder = 1
  if(property[0] === "-") {
    sortOrder = -1
    property = property.substr(1)
  }
  return function (prev, next) {
    if(sortOrder === -1) {
      return next[property].localeCompare(prev[property])
    } else {
      return prev[property].localeCompare(next[property])
    }        
  }
}