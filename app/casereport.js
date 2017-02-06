/*jshint esversion: 6 */

import { NodeHelpers } from './node-helpers';

const ACTION_NODE_SELECTOR = `tr > input[id^="hidKey"]`;
const PROBATION_DIV_ID = `divProbationBody`;
const PROBATION_TERMS_SELECTOR = `#${PROBATION_DIV_ID} > #table-box3 > tbody > tr`;
const PROBATION_SUMMARY_SELECTOR = `#${PROBATION_DIV_ID} > #table-title-left td`;

const parseProbationInfo = node => {
  let result = {};
  const nodes = node.querySelectorAll(PROBATION_SUMMARY_SELECTOR);
  if (nodes && nodes.length) {
    result.type = nodes[0].textContent.trim();
    result.granted = nodes[1].textContent.trim();
    result.expires = nodes[2].textContent.trim();
  }
  return result;
};

const parseProbationTerms = node => {
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

const parseAction = node => {
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

const parseActions = html => {
  let result = [];
  const nodes = html.querySelectorAll(ACTION_NODE_SELECTOR);
  if (nodes && nodes.length) {
    result = result.concat(NodeHelpers.toArray(nodes, parseAction));
  }
  return result;
};

const parseActionCode = value => {
  const segments = value.split(',');
  const result = segments[9];
  return result;
};

const hasDisclosure = html => {
  const text = html.body.textContent;
  const result = text.includes("DISCLOSURE FILED") || 
    text.includes("COURT DISCLOSES THAT JUDGE LUCKY'S WIFE");
  return result;
};
const needsDisclosure = caseReport => caseReport.needsDisclosure;

const isProof = action => {
  const result = (action.description.includes('PROOF OF') ||
    action.description.includes('PROGRESS REPORT')) && 
    action.imageUrl && action.imageUrl.length;
  return result;
};

const isTermination = action => {
  const result = action.description.includes('PROGRAM TERMINATION') &&
    action.imageUrl && action.imageUrl.length;
  return result;
};

const isDeadline = probationTerm => {
  const result = probationTerm.description.search(/(BY|BEFORE) \d\d\/\d\d\/\d\d\d\d/) > -1;
  return result;
};

const create = (html, action) => {
  let result = {};
  result.needsDisclosure = !hasDisclosure(html);
  result.actions = parseActions(html);
  result.probationTerms = parseProbationTerms(html); 
  result.probationInfo = parseProbationInfo(html);
  return result;
};

const actions = caseReport => caseReport.actions;
const deadlines = caseReport => caseReport.probationTerms.filter(isDeadline);
const probationInfo = caseReport => caseReport.probationInfo;
const probationTerms = caseReport => caseReport.probationTerms;
const proofs = caseReport => caseReport.actions.filter(isProof); 
const terminations = caseReport => caseReport.actions.filter(isTermination);

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
