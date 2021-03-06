/*jshint esversion: 6 */

import { Ajax } from './ajax';
import { CaseReport } from './casereport';
import { NodeHelpers} from './node-helpers';
import { Urls } from './urls';

const HEARING_NODE_SELECTOR = 'tr[id^="tr_row"]';
const hearingNodes = (node) => {
  return document.querySelectorAll(HEARING_NODE_SELECTOR);
};
const hearingRow = (hearing) => {
  return document.getElementById(hearing.nodeId);
};
const infoRow = (hearing) => {
  return document.getElementById(hearing.infoNodeId);
};

const infoButtonCell = (hearing) => {
  return infoRow(hearing).children[0];
};
const infoButton = (hearing) => {
  return infoRow(hearing).children[0].children[0];
};
const infoCell = (hearing) => {
  return infoRow(hearing).children[1];
};

const setButtonText = (text, hearing) => {
  infoButton(hearing).textContent = text;
};
const disableButton = (hearing) => {
  infoButton(hearing).disabled = true;
};
const enableButton = (hearing) => {
  infoButton(hearing).disabled = false;
};
const setInfoText = (text, hearing) => {
  infoCell(hearing).textContent = text;
};

const deleteInfoRow = (hearing) => {
  return NodeHelpers.removeNode(infoRow(hearing));
};
const createInfoRow = (hearing) => {
  let row = document.createElement('tr');
  row.id = hearing.infoNodeId;
  row.setAttribute('class', 'hearing-info');
  return row;
};

const createInfoButtonCell = (hearing) => {
  let buttonCell = document.createElement('td');
  buttonCell.setAttribute('class', 'info-button-cell');
  buttonCell.setAttribute('valign', 'top');
  return buttonCell;
};

const createInfoButton = (hearing) => {
  let button = document.createElement('button');
  button.textContent = 'Info';
  button.setAttribute('class', 'info-button');
  button.addEventListener('click', () => { getInfo(hearing); }, false);
  return button;
};

const createInfoCell = (hearing) => {
  let infoCell = document.createElement('td');
  infoCell.setAttribute('class', 'info-cell');
  infoCell.colSpan = '6';
  return infoCell;
};

const appendInfoRow = (hearing) => {
  deleteInfoRow(hearing);

  const hearingNode = hearingRow(hearing);
  let row = createInfoRow(hearing);
  let buttonCell = createInfoButtonCell(hearing);
  let button = createInfoButton(hearing);
  let infoCell = createInfoCell(hearing);

  buttonCell.appendChild(button);
  row.appendChild(buttonCell);
  row.appendChild(infoCell);
  row.style.display = hearingNode.style.display;
  NodeHelpers.insertAfter(row, hearingNode);
};

const createInfoRows = (hearings, callback) => {
  hearings.forEach((hearing) =>  {
    appendInfoRow(hearing);
    if (callback) {
      callback(hearing);
    }
  });
};

const parseHearing = (node) => {
  let timeIndex = 0;
  if (document.querySelector('.table-results tr th').textContent.trim() === "Heard") {
    timeIndex = 1;
  }
  let hearing = {};
  hearing.nodeId = node.id;
  hearing.infoNodeId = 'info_' + node.id;
  hearing.time = node.children[timeIndex].textContent.trim();
  hearing.casenumber = node.children[timeIndex + 1].textContent.trim();
  hearing.name = node.children[timeIndex + 2].textContent.trim();
  hearing.defnbr = node.children[timeIndex + 1].querySelector('a').href
    .match(/defnbr=(\d+)/)[1];
  hearing.description = node.children[timeIndex + 3].textContent.trim();
  hearing.charges = node.children[timeIndex + 4].textContent.trim();
  hearing.urls = Urls.urls(hearing);
  return hearing;
};

const parseHearings = (node) => {
  return NodeHelpers.toArray(hearingNodes(node), parseHearing);
};

const updateInfoText = (hearing) => {
  const info = hearing.info;
  setInfoText('', hearing);
  if (info) {
    NodeHelpers.removeNode(infoCell(hearing).querySelector('div'));

    let infoDiv = document.createElement('div');
    const needsDisclosure = CaseReport.needsDisclosure(info);

    let disclosureEl = document.createElement('p');
    disclosureEl.textContent = CaseReport.needsDisclosure(info) ? 'Needs disclosure.' : 'Disclosure given';
    infoDiv.appendChild(disclosureEl);

    const terminations = CaseReport.terminations(info);
    if(terminations) {
      let terminationsEl = document.createElement('ul');
      terminations.forEach((termination) => {
        let li = document.createElement('li');
        li.textContent = termination.date + ' ';
        let a = document.createElement('a');
        a.href = termination.imageUrl;
        a.textContent = termination.description;
        a.target = '_blank';
        li.appendChild(a);
        terminationsEl.appendChild(li);
      });
      infoDiv.appendChild(terminationsEl);
    }

    const proofs = CaseReport.proofs(info);
    if(proofs) {
      let proofsEl = document.createElement('ul');
      proofs.forEach((proof) => {
        let li = document.createElement('li');
        li.textContent = proof.date + ' ';
        let a = document.createElement('a');
        a.href = proof.imageUrl;
        a.textContent = proof.description;
        a.target = '_blank';
        li.appendChild(a);
        proofsEl.appendChild(li);
      });
      infoDiv.appendChild(proofsEl);
    }

    const deadlines = CaseReport.deadlines(info);
    if(deadlines) {
      let deadlinesEl = document.createElement('ul');
      deadlinesEl.style.listStyle = 'none';
      deadlines.forEach((deadline) => {
        let li = document.createElement('li');
        let number = document.createElement('span');
        li.appendChild(number);
        let description = document.createElement('span');
        li.appendChild(description);
        li.textContent = deadline.number + '. ' + deadline.description;
        li.style.textIndent = '-2em';
        deadlinesEl.appendChild(li);
      });
      infoDiv.appendChild(deadlinesEl);
    }
    infoCell(hearing).appendChild(infoDiv);
  }
};

const setCachedValue = (hearing) => {
  const key = hearing.casenumber + hearing.defnbr;
  localStorage.setItem(key, JSON.stringify(hearing.info));
};

const getCachedValue = (hearing) => {
  const key = hearing.casenumber + hearing.defnbr;
  hearing.info = JSON.parse(localStorage.getItem(key));
};

const toggleInfo = (hearing) => {
  let infoDiv = infoCell(hearing).querySelector('div');
  if (infoDiv.style.display === '') {
    infoButton(hearing).textContent = 'Show';
    infoDiv.style.display = 'none';
  } else {
    infoButton(hearing).textContent = 'Hide';
    infoDiv.style.display = '';
  }
};

const createToggleButton = (hearing) => {
  let button = document.createElement('button');
  button.textContent = 'Hide';
  button.addEventListener('click', () => { toggleInfo(hearing); }, false);
  infoButtonCell(hearing).appendChild(button);
};

const getInfo = (hearing) => {
  setButtonText('Updating', hearing);
  setInfoText('Loading info for ' + hearing.casenumber, hearing);
  disableButton(hearing);
  getCachedValue(hearing);
  updateInfoText(hearing);
  Ajax.get(hearing.urls.report, function() {
    // setButtonText('Updated', hearing);
    NodeHelpers.removeNode(infoButton(hearing));
    createToggleButton(hearing);
    hearing.info = CaseReport.create(this.responseXML, hearing);
    setCachedValue(hearing);
    updateInfoText(hearing);
  });
};

let Calendar = {};
Calendar.createInfoRows = createInfoRows;
Calendar.parseHearings = parseHearings;

export { Calendar };
