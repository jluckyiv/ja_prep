/*jshint esversion: 6 */

const pageSegment = (page) => {
  switch (page) {
    case 'actions':
      return 'actionlist';
    case 'report':
      return 'criminalcasereport';
    case 'charges':
      return 'defendantcharges';
    case 'info':
      return 'defendantinfo';
    case 'status':
      return 'defendantstatus';
    case 'dmv':
      return 'dmv';
    case 'fine':
      return 'fine';
    case 'images':
      return 'criminalimages';
    case 'notes':
      return 'judgesnotes';
    case 'minutes':
      return 'minute';
    case 'probation':
      return 'probation';
    case 'perm':
      return 'perm';
    default:
      return 'defendantinfo';
  }
};

const lastSegment = (page) => {
  const segment = '&defseq=1&otnmseq=0&fmt=auto';
  if (page === 'actions') {
    return segment + '&actionlist=HCSBWRV&relatedcases=Y&alldefendantcases=Y';
  } else {
    return segment;
  }
};

const url = (page, casenumber, defnbr) => {
  return 'http://riv-ja1/JA/criminal/' +
    pageSegment(page) + '.asp' +
    '?casenumber=' + casenumber +
    '&courtcode=C' +
    '&defnbr=' + defnbr +
    lastSegment(page);
};

const urls = (data) => {
  const casenumber = data.casenumber;
  const defnbr = data.defnbr;
  return {
    actions: url('actions', casenumber, defnbr),
    report: url('report', casenumber, defnbr),
    charges: url('charges', casenumber, defnbr),
    info: url('info', casenumber, defnbr),
    status: url('status', casenumber, defnbr),
    dmv: url('dmv', casenumber, defnbr),
    fine: url('fine', casenumber, defnbr),
    images: url('images', casenumber, defnbr),
    notes: url('notes', casenumber, defnbr),
    minutes: url('minutes', casenumber, defnbr),
    probation: url('probation', casenumber, defnbr),
    perm: url('perm', casenumber, defnbr)
  };
};

let Urls = {};
Urls.urls = urls;

export { Urls };

/* 
 * http://riv-ja1/JA/criminal/actionlist.asp?casenumber=RIM1612193&courtcode=C&defnbr=4016210&defseq=1&otnmseq=0&fmt=auto&row=0&MDrow=0&actionlist=HCSBWRV&relatedcases=Y&alldefendantcases=Y
 * http://riv-ja1/JA/criminal/actionlist.asp?casenumber=RIM1612193&courtcode=C&defnbr=4016210&defseq=1&otnmseq=0&fmt=auto&row=0&MDrow=0
 * http://riv-ja1/JA/criminal/criminalcasereport.asp?casenumber=RIM1612193&courtcode=C&defnbr=4016210&defseq=1&otnmseq=0&fmt=auto&row=0&MDrow=0
 * http://riv-ja1/JA/criminal/defendantcharges.asp?casenumber=RIM1612193&courtcode=C&defnbr=4016210&defseq=1&otnmseq=0&fmt=auto&row=0&MDrow=0
 * http://riv-ja1/JA/criminal/defendantinfo.asp?casenumber=RIM1612193&courtcode=C&defnbr=4016210&defseq=1&otnmseq=0&fmt=auto&row=0&MDrow=0<Paste>
 * http://riv-ja1/JA/criminal/defendantstatus.asp?casenumber=RIM1612193&courtcode=C&defnbr=4016210&defseq=1&otnmseq=0&fmt=auto&row=0&MDrow=0
 * http://riv-ja1/JA/criminal/dmv.asp?casenumber=RIM1612193&courtcode=C&defnbr=4016210&defseq=1&otnmseq=0&fmt=auto&row=0&MDrow=0
 * http://riv-ja1/JA/criminal/fine.asp?casenumber=RIM1612193&courtcode=C&defnbr=4016210&defseq=1&otnmseq=0&fmt=auto&row=0&MDrow=0

 * http://riv-ja1/JA/criminal/criminalimages.asp?casenumber=RIM1612193&courtcode=C&defnbr=4016210&defseq=1&otnmseq=0&fmt=auto&row=0&MDrow=0
 * http://riv-ja1/JA/criminal/criminalimages.asp?courtcode=C&defnbr=1198453&casenumber=RIF1604943&defseq=1&otnmseq=0&fmt=auto

 * http://riv-ja1/JA/criminal/judgesnotes.asp?casenumber=RIM1612193&courtcode=C&defnbr=4016210&defseq=1&otnmseq=0&fmt=auto&row=0&MDrow=0
 * http://riv-ja1/JA/criminal/minute.asp?casenumber=RIM1612193&courtcode=C&defnbr=4016210&defseq=1&otnmseq=0&fmt=auto&row=0&MDrow=0
 * http://riv-ja1/JA/criminal/probation.asp?casenumber=RIM1612193&courtcode=C&defnbr=4016210&defseq=1&otnmseq=0&fmt=auto&row=0&MDrow=0
 * http://riv-ja1/JA/criminal/perm.asp?casenumber=RIM1612193&courtcode=C&defnbr=4016210&defseq=1&otnmseq=0&fmt=auto&row=0&MDrow=0
 */

