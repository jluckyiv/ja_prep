/*jshint esversion: 6 */

import { nodeListToArray as makeArray } from './helpers/node-list';
import { urls } from './pages/urls';

const HEARING_NODE_SELECTOR = 'tr[id^="tr_row"]';

const hearingNodes = node  => document.querySelectorAll(HEARING_NODE_SELECTOR);

const parseHearing = node => {
  let hearing = {};
  hearing.heard = node.children[0].querySelector('input').checked;
  hearing.time = node.children[1].textContent.trim();
  hearing.casenumber = node.children[2].textContent.trim();
  hearing.name = node.children[3].textContent.trim();
  hearing.defnbr = node.children[2].querySelector('a').href
    .match(/defnbr=(\d+)/)[1];
  hearing.description = node.children[4].textContent.trim();
  hearing.charges = node.children[5].textContent.trim();
  hearing.urls = urls(hearing);
  return hearing;
};

const parseHearings = node => {
  return makeArray(hearingNodes(node), parseHearing);
};

export { parseHearings };
