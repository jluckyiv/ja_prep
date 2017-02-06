/*jshint esversion: 6 */

const insertAfter = function(newNode, referenceNode) {
  const parent = referenceNode.parentNode;
  const next = referenceNode.nextElementSibling;
  parent.insertBefore(newNode, next);
};

const removeNode = function(node) {
  if (node) { node.parentNode.removeChild(node); }
};

const toArray = function(nodeList, callback) {
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

let NodeHelpers = {};
NodeHelpers.insertAfter = insertAfter;
NodeHelpers.removeNode = removeNode;
NodeHelpers.toArray = toArray;

export { NodeHelpers };
