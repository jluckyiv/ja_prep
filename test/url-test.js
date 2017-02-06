'use strict';

import { expect } from 'chai';
import { Urls } from '../app/urls'

describe('Urls', () => {
  describe('.urls()', () => {
    it('should return urls for all pages', function() {
      var data = { casenumber: '12345', defnbr: '98765' };
      var urlObject = Urls.urls(data);
      var expected = {
        actions: 'http://riv-ja1/JA/criminal/actionlist.asp?casenumber=12345&courtcode=C&defnbr=98765&defseq=1&otnmseq=0&fmt=auto&actionlist=HCSBWRV&relatedcases=Y&alldefendantcases=Y',
        charges: 'http://riv-ja1/JA/criminal/defendantcharges.asp?casenumber=12345&courtcode=C&defnbr=98765&defseq=1&otnmseq=0&fmt=auto',
        dmv: 'http://riv-ja1/JA/criminal/dmv.asp?casenumber=12345&courtcode=C&defnbr=98765&defseq=1&otnmseq=0&fmt=auto',
        fine: 'http://riv-ja1/JA/criminal/fine.asp?casenumber=12345&courtcode=C&defnbr=98765&defseq=1&otnmseq=0&fmt=auto',
        images: 'http://riv-ja1/JA/criminal/criminalimages.asp?casenumber=12345&courtcode=C&defnbr=98765&defseq=1&otnmseq=0&fmt=auto',
        info: 'http://riv-ja1/JA/criminal/defendantinfo.asp?casenumber=12345&courtcode=C&defnbr=98765&defseq=1&otnmseq=0&fmt=auto',
        minutes: 'http://riv-ja1/JA/criminal/minute.asp?casenumber=12345&courtcode=C&defnbr=98765&defseq=1&otnmseq=0&fmt=auto',
        notes: 'http://riv-ja1/JA/criminal/judgesnotes.asp?casenumber=12345&courtcode=C&defnbr=98765&defseq=1&otnmseq=0&fmt=auto',
        perm: 'http://riv-ja1/JA/criminal/perm.asp?casenumber=12345&courtcode=C&defnbr=98765&defseq=1&otnmseq=0&fmt=auto',
        probation: 'http://riv-ja1/JA/criminal/probation.asp?casenumber=12345&courtcode=C&defnbr=98765&defseq=1&otnmseq=0&fmt=auto',
        report: 'http://riv-ja1/JA/criminal/criminalcasereport.asp?casenumber=12345&courtcode=C&defnbr=98765&defseq=1&otnmseq=0&fmt=auto',
        status: 'http://riv-ja1/JA/criminal/defendantstatus.asp?casenumber=12345&courtcode=C&defnbr=98765&defseq=1&otnmseq=0&fmt=auto'
      };

      expect(urlObject).to.eql(expected);
    });
  });
});
