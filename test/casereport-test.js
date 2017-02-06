'use strict';

const fs = require('fs');
const jsdom = require('jsdom');
import { expect } from 'chai';
import { CaseReport } from '../app/casereport'

describe('CaseReport', () => {

  describe('.needsDisclosure', () => {
    const blankDocument = () => {
      return jsdom.jsdom('<!doctype html><html><body>' +
        '<div id="test-div"></div></body></html>')
    };

    let doc, testDiv;;
    beforeEach(() => {
      doc = blankDocument();
      testDiv = doc.getElementById('test-div');
    });

    it("should return false for COURT DISCLOSES THAT JUDGE LUCKY'S WIFE", () => {
      const doc = jsdom.jsdom('<!doctype html><html><body>' +
        "<div>COURT DISCLOSES THAT JUDGE LUCKY'S WIFE</div>" +
        '</body></html>')
      const subject = CaseReport.create(doc);
      expect(CaseReport.needsDisclosure(subject)).to.be.false;
    });

    it('should return false for DISCLOSURE FILED', () => {
      testDiv.textContent = "DISCLOSURE FILED";
      const subject = CaseReport.create(doc);
      expect(CaseReport.needsDisclosure(subject)).to.be.false;
    });

    it('should return true otherwise', () => {
      testDiv.textContent = "something other than disclosure langauge";
      const subject = CaseReport.create(doc);
      expect(CaseReport.needsDisclosure(subject)).to.be.true;
    });
  });

  describe('.parseActionCode()', () => {
    it("should return the action code for the action", () => {
      const value = "OTS,0,C,RIF1501913,,2300428,20160310,13.3,,FICA,W091208"
      const subject = CaseReport.parseActionCode(value);
      expect(subject).to.equal('FICA');
    });
  });

  describe('.create()', () => {
    describe('.actions', () => {
      const loadRIF1501913 = () => {
        const html = fs.readFileSync('./test/fixtures/RIF1501913 - Case Report.htm');
        const doc = jsdom.jsdom(html);
        return doc;
      };

      let doc, caseReport;;
      before(() => {
        doc = loadRIF1501913();
        caseReport = CaseReport.create(doc);
      });

      it("should return an array of action", () => {
        const subject = CaseReport.actions(caseReport);
        expect(subject.length).to.equal(94);
      });

      it("should parse a document action", () => {
        const subject = CaseReport.actions(caseReport)[11];
        expect(subject.code).to.equal('RCAO');
        expect(subject.date).to.equal('09/30/2016');
        expect(subject.description).to
          .equal('REQUEST FOR CALENDAR ADD-ON FILED.');
        expect(subject.imageUrl).to
          .include('http://riv-ja1/JA/ImageLinkWindow');
        expect(subject.imageUrl).to.include('ImgKey=1314444815');
      });

      it("should parse a hearing action", () => {
        const subject = CaseReport.actions(caseReport)[1];
        expect(subject.code).to.equal('HDVP');
        expect(subject.date).to.equal('02/06/2017');
        expect(subject.description).to
          .equal('HEARING RE: DOMESTIC VIOLENCE PROGRESS.');
        expect(subject.disposition).to.equal('ACTIVE');
      });

      it("should parse probation information", () => {
        const subject = CaseReport.probationInfo(caseReport);
        expect(subject.type).to.equal('SUMMARY');
        expect(subject.granted).to.equal('07/07/2016');
        expect(subject.expires).to.equal('07/07/2019');
      });

      it("should parse probation terms", () => {
        const subject = CaseReport.probationTerms(caseReport);
        expect(subject[0].description).to
          .equal('OBEY ALL LAWS, ORDINANCES, AND COURT ORDERS.');
        expect(subject[2].description).to
          .equal('149 DAYS TO BE SERVED IN THE WORK RELEASE PROGRAM. ' +
            'REPORT ON OR BEFORE 07/27/2016.');
      });

      it("should find program terminations", () => {
        const subject = CaseReport.terminations(caseReport);
        expect(subject[0].description).to.include('WORK RELEASE');
      });

      it("should find proof of enrollment/completion", () => {
        const subject = CaseReport.proofs(caseReport);
        expect(subject[0].description).to.include('COMPLETION ELECTRONIC MONITORING');
        expect(subject[1].description).to.include('ENROLLMENT ELECTRONIC MONITORING');
        expect(subject[2].description).to.include('ENROLLMENT - DOMESTIC VIOLENCE');
        expect(subject[3].description).to.include('ENROLLMENT - DOMESTIC VIOLENCE');
      });

      it("should find deadlines", () => {
        const subject = CaseReport.deadlines(caseReport);
        expect(subject.length).to.equal(4);
      });
    });
  });
});
