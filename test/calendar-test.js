'use strict';

const fs = require('fs');
const jsdom = require('jsdom');
import { expect } from 'chai';
import { Calendar } from '../app/calendar'

describe ('Calendar', () => {
  describe('.parseHearings()', () => {

    let calendar;
    before(function() {
      const html = fs.readFileSync('./test/fixtures/01_30_2017_D33.htm');
      global.document = jsdom.jsdom(html);
      calendar = Calendar.parseHearings(document.body);
    });

    it("should return a list of hearings", () => {
      const subject = calendar;
      expect(subject.length).to.equal(14);
    });

    it("should correctly parse a single hearing", () => {
      const subject = calendar[0];
      expect(subject.nodeId).to.equal('tr_row0');
      expect(subject.infoNodeId).to.equal('info_tr_row0');
      expect(subject.time).to.equal('8:30 AM');
      expect(subject.casenumber).to.equal('RIM1411527');
      expect(subject.name).to.equal('AGUILAR GONZALEZ, ANTHONY JUNIOR');
      expect(subject.defnbr).to.equal('2671022');
      expect(subject.description).to.equal('PROBATION HEARING RE: DV & CS');
      expect(subject.charges).to.include('243(E)(1)');
      expect(subject.urls).to.have.all.keys([ 'actions', 'charges', 'dmv',
        'fine', 'images', 'info', 'minutes', 'notes', 'perm', 'probation',
        'report', 'status' ]);
    });
  });


});
