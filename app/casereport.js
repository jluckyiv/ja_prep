/*jshint esversion: 6 */

import { NodeHelpers } from './node-helpers';

const ACTION_NODE_SELECTOR = 'tr > input[id^="hidKey"]';
const PROBATION_TERMS_SELECTOR = '#divProbationBody > #table-box3 > tbody > tr';
const PROBATION_SUMMARY_SELECTOR = '#divProbationBody > #table-title-left td';

const includes= function(text, searchTerm) {
  return text.indexOf(searchTerm) > -1;
};

const parseProbationInfo = function(node) {
  let result = {};
  const nodes = node.querySelectorAll(PROBATION_SUMMARY_SELECTOR);
  if (nodes && nodes.length) {
    result.type = nodes[0].textContent.trim();
    result.granted = nodes[1].textContent.trim();
    result.expires = nodes[2].textContent.trim();
  }
  return result;
};

const parseProbationTerms = function(node) {
  let result = [];
  const nodes = node.querySelectorAll(PROBATION_TERMS_SELECTOR);
  if (nodes && nodes.length) {
    for (let i = 1, l = nodes.length; i < l; i += 1) {
      const number = parseInt(nodes[i].children[1].textContent.trim());
      const description = nodes[i].children[3].textContent.trim();
      result.push({number: number, description: description});
    }
  }
  return result;
};

const parseAction = function(node) {
  let result = {};
  const parent = node.parentNode;
  const cells = parent.querySelectorAll('td');

  result.code = parseActionCode(node.value).trim();
  result.date = cells[0].textContent.trim().substr(0,10);
  result.description = cells[1].textContent.trim();
  const disposition = cells[2].textContent.trim();
  if (disposition) { result.disposition = disposition; }
  const actionType = cells[3].textContent.trim();
  if (actionType) { result.actionType = actionType; }
  const imageLink = cells[5].querySelector('a');
  if (imageLink) { result.imageUrl = imageLink.href.replace('..', 'http://riv-ja1/JA'); }
  return result;
};

const parseActions = function(html) {
  let result = [];
  const nodes = html.querySelectorAll(ACTION_NODE_SELECTOR);
  if (nodes && nodes.length) {
    result = result.concat(NodeHelpers.toArray(nodes, parseAction));
  }
  return result;
};

const parseActionCode = function(value) {
  const segments = value.split(',');
  const result = segments[9];
  return result;
};

const hasDisclosure = function(html) {
  const text = html.body.textContent;
  const result = includes(text, "DISCLOSURE FILED") || 
    includes(text, "COURT DISCLOSES THAT JUDGE LUCKY'S WIFE");
  return result;
};
const needsDisclosure = function(caseReport) {
  return caseReport.needsDisclosure;
};

const isProof = function(action) {
  const result = (includes(action.description, 'PROOF OF') ||
    includes(action.description, 'PROGRESS REPORT')) && 
    action.imageUrl && action.imageUrl.length;
  return result;
};

const isTermination = function(action) {
  const result = includes(action.description, 'PROGRAM TERMINATION') &&
    action.imageUrl && action.imageUrl.length;
  return result;
};

const isDeadline = function(probationTerm) {
  const result = probationTerm.description.search(/(BY|BEFORE) \d\d\/\d\d\/\d\d\d\d/) > -1;
  return result;
};

const create = function(html, action) {
  let result = {};
  result.needsDisclosure = !hasDisclosure(html);
  result.actions = parseActions(html);
  result.probationTerms = parseProbationTerms(html); 
  result.probationInfo = parseProbationInfo(html);
  return result;
};

const actions = function(caseReport) { return  caseReport.actions; };
const deadlines = function(caseReport) { return  caseReport.probationTerms.filter(isDeadline); };
const probationInfo = function(caseReport) { return  caseReport.probationInfo; };
const probationTerms = function(caseReport) { return  caseReport.probationTerms; };
const proofs = function(caseReport) { return  caseReport.actions.filter(isProof);  };
const terminations = function(caseReport) { return  caseReport.actions.filter(isTermination); };

let CaseReport = {};
CaseReport.create = create;
CaseReport.actions = actions;
CaseReport.needsDisclosure = needsDisclosure;
CaseReport.parseActionCode = parseActionCode;
CaseReport.probationInfo = probationInfo;
CaseReport.probationTerms = probationTerms;
CaseReport.terminations = terminations;
CaseReport.proofs = proofs;
CaseReport.deadlines = deadlines;

export { CaseReport };
