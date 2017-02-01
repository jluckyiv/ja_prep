/*jshint esversion: 6 */

const nodeListToArray = (nodeList, callback) => {
  let a = [];
  for (let i = 0, l = nodeList.length; i < l; i += 1) {
    if (callback) {
      a[a.length] = callback(nodeList[i]);
    } else {
      a[a.length] = nodeList[i];
    }
  }
  return a;
};

export { nodeListToArray };
