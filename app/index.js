/*jshint esversion: 6 */

import { Calendar } from './calendar';

const hearings = Calendar.parseHearings(document.body);
window.hearings = hearings;
Calendar.addInfoRows(hearings);
console.log(`There are ${ hearings.length } hearings.`);
