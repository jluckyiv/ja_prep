/*jshint esversion: 6 */

import { NodeHelpers} from './node-helpers';
import { Urls } from './urls';
import { Ajax } from './ajax';

const HEARING_NODE_SELECTOR = 'tr[id^="tr_row"]';

const findOrCreateInfoRow = hearing => {
  let row, buttonCell, button, infoCell;
  const hearingNode = document.getElementById(hearing.nodeId);
  const nodeId = hearing.infoNodeId;
  row = document.getElementById(nodeId);
  if (!row) {
    row = document.createElement('tr');
    row.id = nodeId;
    buttonCell = document.createElement('td');
    button = document.createElement('button');
    button.textContent = 'Info';
    button.addEventListener('click', function(){loadInfo(hearing);}, false);
    buttonCell.appendChild(button);
    row.appendChild(buttonCell);
    infoCell = document.createElement('td');
    infoCell.colSpan = '6';
    row.appendChild(infoCell);
    NodeHelpers.insertAfter(row, hearingNode);
  }
  row.style.display = hearingNode.style.display;
  return row;
};

const setInfoText = (text, hearing) => {
  const node = findOrCreateInfoRow(hearing);
  node.children[1].textContent = text;
};

const addInfoRows = (hearings, callback) => {
  hearings.forEach( hearing => {
    let row = findOrCreateInfoRow(hearing);
    if (callback) {
      callback(row, hearing);
    }
  });
};

const loadInfo = hearing => {
  setInfoText('Loading info for ' + hearing.casenumber, hearing);
  Ajax.get(hearing.urls.info, function() {
    setInfoText('Info loaded for ' + hearing.casenumber, hearing);
  });
};

const getInfo = hearings => {
  addInfoRows(hearings);
};

const hearingNodes = node  => document.querySelectorAll(HEARING_NODE_SELECTOR);

const parseHearing = node => {
  let hearing = {};
  hearing.nodeId = node.id;
  hearing.infoNodeId = 'info_' + node.id;
  hearing.heard = node.children[0].querySelector('input').checked;
  hearing.time = node.children[1].textContent.trim();
  hearing.casenumber = node.children[2].textContent.trim();
  hearing.name = node.children[3].textContent.trim();
  hearing.defnbr = node.children[2].querySelector('a').href
    .match(/defnbr=(\d+)/)[1];
  hearing.description = node.children[4].textContent.trim();
  hearing.charges = node.children[5].textContent.trim();
  hearing.urls = Urls.urls(hearing);
  return hearing;
};

const parseHearings = node => {
  return NodeHelpers.toArray(hearingNodes(node), parseHearing);
};

let Calendar = {};
Calendar.getInfo = getInfo;
Calendar.parseHearings = parseHearings;

export { Calendar };
