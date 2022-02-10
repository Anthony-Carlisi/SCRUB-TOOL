const express = require('express');
const Lead = require('../models/Lead');

const testArr = [
  {
    First_name: 'DEAN',
    Last_name: 'SAPLA',
    company: 'PACIFIC PLUMBING',
    Address1: '8451 MIRALANI DR # O',
    City: 'SAN DIEGO',
    State: 'CA',
    Zip: '92126-4388',
    Zip4: '',
    FNL_CARRT: 'C050',
    FNL_DPBC: '999',
    phone_number: '8585497380',
    phone_number2: '',
    phone_number3: '',
    fax_numo: '8585497876',
    Email_address: 'dean@pacificplumbingservice.com',
    primary_sic_code: '507406',
    primary_sic_desc: 'PLUMBING FIXTURES & SUPPLIES-WHOLESALE',
    sales_volume: '7500000',
    filler1: 'MARC BOBIER',
    filler2: 'OWNER',
    filler3: '9-May',
    filing_day: '17',
    filing_month: '1',
    filing_year: '2019',
    sce_partyname: 'FIRST CORPORATE SOLUTIONS',
    ucctype: 'mca',
  },
  {
    First_name: 'BRUCE',
    Last_name: 'VANDERVEEN',
    company: 'ALL AMERICAN PRINTING SVC',
    Address1: '1324 RAND ST',
    City: 'PETALUMA',
    State: 'CA',
    Zip: '94954-1138',
    Zip4: '',
    FNL_CARRT: 'C031',
    FNL_DPBC: '240',
    phone_number: '4158991000',
    phone_number2: '',
    phone_number3: '',
    fax_numo: '4158991005',
    Email_address: 'b@allamericanprinting.us',
    primary_sic_code: '275202',
    primary_sic_desc: 'PRINTERS (MFRS)',
    sales_volume: '250000',
    filler1: 'DAREN KESSURY',
    filler2: 'BOARD MEMBER',
    filler3: '4-Jan',
    filing_day: '16',
    filing_month: '1',
    filing_year: '2019',
    sce_partyname: 'CORP SERVICE CO',
    ucctype: 'mca',
  },
  {
    First_name: 'DONALD',
    Last_name: 'ONEAL',
    company: 'SUNBELT RENTALS',
    Address1: '23575 CABOT BLVD',
    City: 'HAYWARD',
    State: 'CA',
    Zip: '94545-1657',
    Zip4: '',
    FNL_CARRT: 'C026',
    FNL_DPBC: '536',
    phone_number: '5107326591',
    phone_number2: '',
    phone_number3: '',
    fax_numo: '',
    Email_address: 'doneal@sunbeltrentals.com',
    primary_sic_code: '735959',
    primary_sic_desc: 'LEASING EQUIPMENT',
    sales_volume: '2000000',
    filler1: 'JOHN BENETTI',
    filler2: 'CHIEF OPERATING OFFICER',
    filler3: '19-Oct',
    filing_day: '16',
    filing_month: '1',
    filing_year: '2019',
    sce_partyname: 'CORP SERVICE CO',
    ucctype: 'mca',
  },
  {
    First_name: 'CHARLES',
    Last_name: 'EVANS',
    company: 'INTERNATIONAL HEALTH GROUP INC',
    Address1: '8787 COMPLEX DR # 130',
    City: 'SAN DIEGO',
    State: 'CA',
    Zip: '92123-1451',
    Zip4: '',
    FNL_CARRT: 'C022',
    FNL_DPBC: '990',
    phone_number: '8582789800',
    phone_number2: '',
    phone_number3: '',
    fax_numo: '8582789818',
    Email_address: 'julie@ihsgroup.net',
    primary_sic_code: '804908',
    primary_sic_desc: "NURSES & NURSES' REGISTRIES",
    sales_volume: '250000',
    filler1: 'CASEY NA',
    filler2: 'PRESIDENT',
    filler3: '4-Jan',
    filing_day: '16',
    filing_month: '1',
    filing_year: '2019',
    sce_partyname: 'CHTD CO',
    ucctype: 'mca',
  },
  {
    First_name: 'WILLIAM',
    Last_name: 'GREEN',
    company: 'NEXTLEVEL INTERNET INC',
    Address1: '10967 VIA FRONTERA',
    City: 'SAN DIEGO',
    State: 'CA',
    Zip: '92127-1703',
    Zip4: '',
    FNL_CARRT: 'C011',
    FNL_DPBC: '675',
    phone_number: '8586228511',
    phone_number2: '',
    phone_number3: '',
    fax_numo: '',
    Email_address: 'billg@nextlevelinternet.com',
    primary_sic_code: '737415',
    primary_sic_desc: 'INTERNET SERVICE',
    sales_volume: '',
    filler1: 'CLIVE HARRISON',
    filler2: 'CHIEF OPERATING OFFICER',
    filler3: '9-May',
    filing_day: '16',
    filing_month: '1',
    filing_year: '2019',
    sce_partyname: 'ASSN CO',
    ucctype: 'mca',
  },
  {
    First_name: 'SCOTT',
    Last_name: 'HARRINGTON',
    company: 'MODEL SHOP',
    Address1: '2808 OREGON CT # L12',
    City: 'TORRANCE',
    State: 'CA',
    Zip: '90503-2667',
    Zip4: '',
    FNL_CARRT: 'C018',
    FNL_DPBC: '228',
    phone_number: '3102228799',
    phone_number2: '',
    phone_number3: '',
    fax_numo: '',
    Email_address: 'scott@modshop.com',
    primary_sic_code: '871218',
    primary_sic_desc: 'ARCHITECTURAL MODELS',
    sales_volume: '2000000',
    filler1: 'SCOTT HARRINGTON',
    filler2: 'OWNER',
    filler3: '19-Oct',
    filing_day: '15',
    filing_month: '1',
    filing_year: '2019',
    sce_partyname: 'CHTD CO',
    ucctype: 'mca',
  },
  {
    First_name: 'RJUDY',
    Last_name: 'LINVILLE',
    company: 'PARADIGM MEDICAL MANAGEMENT, INC.',
    Address1: '23332 HAWTHORNE BLVD, SUITE 301',
    City: 'TORRENCE',
    State: 'CA',
    Zip: '90505',
    Zip4: '',
    FNL_CARRT: '',
    FNL_DPBC: '76',
    phone_number: '3105381110',
    phone_number2: '',
    phone_number3: '',
    fax_numo: '',
    Email_address: 'rjlinville@pmmhealthcare.com',
    primary_sic_code: '80939903',
    primary_sic_desc: 'SPTY OTPNT CLNS NE',
    sales_volume: '1911434',
    filler1: 'MR MIGUEL SANDOVAL',
    filler2: 'CHIEF FINANCIAL OFFICER',
    filler3: '35',
    filing_day: '15',
    filing_month: '1',
    filing_year: '2019',
    sce_partyname: 'MED ONE CAPITAL FUNDING, LLC',
    ucctype: 'mca',
  },
  {
    First_name: 'BRUCE',
    Last_name: 'SWARNY',
    company: 'GLENDIVE MEDICAL CENTER, INC.',
    Address1: '202 PROSPECT DRIVE',
    City: 'GLENDIVE',
    State: 'MT',
    Zip: '593301999',
    Zip4: '',
    FNL_CARRT: '',
    FNL_DPBC: '2',
    phone_number: '4063452654',
    phone_number2: '',
    phone_number3: '',
    fax_numo: '',
    Email_address: 'bswarny@gmc.org',
    primary_sic_code: '80620000',
    primary_sic_desc: 'GNL MDL SRGL HSPTL',
    sales_volume: '44926902',
    filler1: 'MR SCOTT A DUKE',
    filler2: 'CHIEF OF MEDICAL STAFF',
    filler3: '430',
    filing_day: '15',
    filing_month: '1',
    filing_year: '2019',
    sce_partyname: 'MED ONE CAPITAL FUNDING, LLC',
    ucctype: 'mca',
  },
  {
    First_name: 'LEO',
    Last_name: 'CAMPBELL',
    company: 'STAPLES',
    Address1: '79405 HIGHWAY 111 # 9 PMB 48',
    City: 'LA QUINTA',
    State: 'CA',
    Zip: '92253-8300',
    Zip4: '',
    FNL_CARRT: 'C008',
    FNL_DPBC: '99',
    phone_number: '7605648957',
    phone_number2: '',
    phone_number3: '',
    fax_numo: '7605649732',
    Email_address: 'leo.campbell@staples.com',
    primary_sic_code: '594301',
    primary_sic_desc: 'OFFICE SUPPLIES',
    sales_volume: '7500000',
    filler1: 'BRENT LEACH',
    filler2: 'HUMAN RESOURCES BUSINESS PARTNER',
    filler3: '20-49',
    filing_day: '15',
    filing_month: '1',
    filing_year: '2019',
    sce_partyname: 'CHTD CO',
    ucctype: 'mca',
  },
  {
    First_name: 'CINDY',
    Last_name: 'KLEIN',
    company: 'PRECISION HEAT AND AIR',
    Address1: '68805 PEREZ ROAD SUITE F42',
    City: 'CATHEDRAL CITY',
    State: 'CA',
    Zip: '92234',
    Zip4: '',
    FNL_CARRT: '',
    FNL_DPBC: '99',
    phone_number: '7609691777',
    phone_number2: '',
    phone_number3: '',
    fax_numo: '',
    Email_address: 'cklein@precisionheat-air.com',
    primary_sic_code: '57220100',
    primary_sic_desc: 'HSHOLD APPLNCE STRS',
    sales_volume: '60939',
    filler1: '',
    filler2: 'OWNER',
    filler3: '2',
    filing_day: '15',
    filing_month: '1',
    filing_year: '2019',
    sce_partyname: 'CHTD COMPANY',
    ucctype: 'mca',
  },
  {
    First_name: 'BILL',
    Last_name: 'OKLAND',
    company: 'OKLAND CONSTRUCTION',
    Address1: '5739 CAHUENGA BLVD',
    City: 'NORTH HOLLYWOOD',
    State: 'CA',
    Zip: '91601-2107',
    Zip4: '',
    FNL_CARRT: 'C019',
    FNL_DPBC: '258',
    phone_number: '8183557200',
    phone_number2: '',
    phone_number3: '',
    fax_numo: '',
    Email_address: 'bill.okland@okland.com',
    primary_sic_code: '152103',
    primary_sic_desc: 'GENERAL CONTRACTORS',
    sales_volume: '2000000',
    filler1: 'DEAN OKLAND',
    filler2: 'PRESIDENT',
    filler3: '4-Jan',
    filing_day: '15',
    filing_month: '1',
    filing_year: '2019',
    sce_partyname: 'KNIGHT CAPITAL FUNDING',
    ucctype: 'mca',
  },
  {
    First_name: 'MICHELLE',
    Last_name: 'MARTINEZ',
    company: 'SUTTER HEALTH',
    Address1: '2200 RIVER PLAZA DRIVE',
    City: 'SACRAMENTO',
    State: 'CA',
    Zip: '95833',
    Zip4: '',
    FNL_CARRT: '',
    FNL_DPBC: '0',
    phone_number: '9167338800',
    phone_number2: '',
    phone_number3: '',
    fax_numo: '',
    Email_address: 'martinm8@sutterhealth.org',
    primary_sic_code: '80620000',
    primary_sic_desc: 'GNL MDL SRGL HSPTL',
    sales_volume: '12444000000',
    filler1: 'MR PATRICK FRY',
    filler2: 'CHIEF NRUSING OFFICER',
    filler3: '48000',
    filing_day: '15',
    filing_month: '1',
    filing_year: '2019',
    sce_partyname: 'MED ONE CAPITAL FUNDING,  LLC',
    ucctype: 'mca',
  },
  {
    First_name: 'GREG',
    Last_name: 'MAY',
    company: 'MAY CO CONSTRUCTION',
    Address1: '939 GLENNEYRE ST # C',
    City: 'LAGUNA BEACH',
    State: 'CA',
    Zip: '92651-2716',
    Zip4: '',
    FNL_CARRT: 'C002',
    FNL_DPBC: '993',
    phone_number: '9497157110',
    phone_number2: '',
    phone_number3: '',
    fax_numo: '',
    Email_address: 'greg@mayconstructioninc.com',
    primary_sic_code: '871210',
    primary_sic_desc: 'BUILDING CONSTRUCTION-CONSULTANTS',
    sales_volume: '250000',
    filler1: 'RON MAY',
    filler2: 'OWNER',
    filler3: '4-Jan',
    filing_day: '15',
    filing_month: '1',
    filing_year: '2019',
    sce_partyname: 'CHTD CO',
    ucctype: 'mca',
  },
  {
    First_name: 'VICKI',
    Last_name: 'SUEMNICHT',
    company: 'DANCE CENTER',
    Address1: '24520 HAWTHORNE BLVD # 100',
    City: 'TORRANCE',
    State: 'CA',
    Zip: '90505-6847',
    Zip4: '',
    FNL_CARRT: 'C010',
    FNL_DPBC: '759',
    phone_number: '3103737084',
    phone_number2: '',
    phone_number3: '',
    fax_numo: '',
    Email_address: 'vicki@thedancecenter.com',
    primary_sic_code: '791101',
    primary_sic_desc: 'DANCING INSTRUCTION',
    sales_volume: '250000',
    filler1: 'DIANE RATLEY',
    filler2: 'OWNER',
    filler3: '4-Jan',
    filing_day: '14',
    filing_month: '1',
    filing_year: '2019',
    sce_partyname: 'CHTD CO',
    ucctype: 'mca',
  },
  {
    First_name: 'YVETTE',
    Last_name: 'LAGARDE',
    company: 'VITAMEDICA',
    Address1: '1140 HIGHLAND AVE',
    City: 'MANHATTAN BEACH',
    State: 'CA',
    Zip: '90266-5325',
    Zip4: '',
    FNL_CARRT: 'C018',
    FNL_DPBC: '994',
    phone_number: '3109377671',
    phone_number2: '',
    phone_number3: '',
    fax_numo: '',
    Email_address: 'yvette@vitamedica.com',
    primary_sic_code: '549901',
    primary_sic_desc: 'HEALTH & DIET FOODS-RETAIL',
    sales_volume: '250000',
    filler1: 'JULIE EVIDON',
    filler2: 'CHIEF OPERATING OFFICER',
    filler3: '4-Jan',
    filing_day: '14',
    filing_month: '1',
    filing_year: '2019',
    sce_partyname: 'CORP SERVICE CO',
    ucctype: 'mca',
  },
  {
    First_name: 'ROTH',
    Last_name: 'JOHNSON',
    company: 'CONEJO HARDWOODS & STONE',
    Address1: '31275 LA BAYA DR',
    City: 'WESTLAKE VILLAGE',
    State: 'CA',
    Zip: '91362-4006',
    Zip4: '',
    FNL_CARRT: 'C010',
    FNL_DPBC: '757',
    phone_number: '8188890487',
    phone_number2: '',
    phone_number3: '',
    fax_numo: '8188896969',
    Email_address: 'roth@conejohardwoods.com',
    primary_sic_code: '152105',
    primary_sic_desc: 'HOME IMPROVEMENTS',
    sales_volume: '7500000',
    filler1: 'JOHN JOHNSON',
    filler2: 'CHIEF EXECUTIVE OFFICER�',
    filler3: '19-Oct',
    filing_day: '14',
    filing_month: '1',
    filing_year: '2019',
    sce_partyname: 'CHTD CO',
    ucctype: 'mca',
  },
  {
    First_name: 'JOE',
    Last_name: 'STACHOKUS',
    company: 'SLT DESIGN GROUP',
    Address1: '910 STRIKER AVENUE SUITE F',
    City: 'SACRAMENTO',
    State: 'CA',
    Zip: '95834',
    Zip4: '',
    FNL_CARRT: '',
    FNL_DPBC: '78',
    phone_number: '9166411515',
    phone_number2: '',
    phone_number3: '',
    fax_numo: '',
    Email_address: 'jstachokus@smdesigngroup.com',
    primary_sic_code: '7389060099',
    primary_sic_desc: 'BUS SERVICES NEC',
    sales_volume: '177417',
    filler1: 'STACEY L THOMPSON',
    filler2: 'PRESIDENT, PROFESSIONAL ENGINEER',
    filler3: '1',
    filing_day: '14',
    filing_month: '1',
    filing_year: '2019',
    sce_partyname: 'CORPORATION SERVICE COMPANY, AS REPRESENTATIVE',
    ucctype: 'mca',
  },
  {
    First_name: 'GILL',
    Last_name: 'HODGSON',
    company: 'TABOO HAIR SALON',
    Address1: '8446 W 3RD ST',
    City: 'LOS ANGELES',
    State: 'CA',
    Zip: '90048-4112',
    Zip4: '',
    FNL_CARRT: 'C044',
    FNL_DPBC: '461',
    phone_number: '3236553770',
    phone_number2: '',
    phone_number3: '',
    fax_numo: '',
    Email_address: 'gill@taboohaircare.com',
    primary_sic_code: '723106',
    primary_sic_desc: 'BEAUTY SALONS',
    sales_volume: '750000',
    filler1: 'JON JONSSON',
    filler2: 'OWNER',
    filler3: '19-Oct',
    filing_day: '11',
    filing_month: '1',
    filing_year: '2019',
    sce_partyname: 'CHTD CO',
    ucctype: 'mca',
  },
  {
    First_name: 'MADAN',
    Last_name: 'SHARMA',
    company: 'LOTUS INTERNATIONAL',
    Address1: '3080 OLCOTT ST # A205',
    City: 'SANTA CLARA',
    State: 'CA',
    Zip: '95054-3258',
    Zip4: '',
    FNL_CARRT: 'C014',
    FNL_DPBC: '153',
    phone_number: '4085881929',
    phone_number2: '',
    phone_number3: '',
    fax_numo: '',
    Email_address: 'msharma@licus.com',
    primary_sic_code: '509311',
    primary_sic_desc: 'PLASTICS-SCRAP (WHLS)',
    sales_volume: '3000000',
    filler1: 'STEVEN LEE',
    filler2: 'PRESIDENT',
    filler3: '4-Jan',
    filing_day: '11',
    filing_month: '1',
    filing_year: '2019',
    sce_partyname: 'CORP SERVICE CO',
    ucctype: 'mca',
  },
  {
    First_name: 'SANDY',
    Last_name: 'YOUNG',
    company: 'ACCOUNTING NETWORK, INC.',
    Address1: '5201 GREAT AMERICA PARKWAY',
    City: 'SANTA CLARA',
    State: 'CA',
    Zip: '95054',
    Zip4: '',
    FNL_CARRT: '',
    FNL_DPBC: '83',
    phone_number: '4089883455',
    phone_number2: '',
    phone_number3: '',
    fax_numo: '',
    Email_address: 'syoung@accountingnetwork.com',
    primary_sic_code: '73610000',
    primary_sic_desc: 'EMPLOYMENT AGENCIES',
    sales_volume: '464957',
    filler1: 'MR VINCE DAVIE',
    filler2: 'PARTNER',
    filler3: '5',
    filing_day: '11',
    filing_month: '1',
    filing_year: '2019',
    sce_partyname: 'BFI BUSINESS FINANCE',
    ucctype: 'mca',
  },
];

/*
let test = Promise.all(
  testArr.map(async (newLead) => {
    try {
      let data = await Lead.find({ phone: newLead.phone_number });
      if (data) {
        data.leadInfo.unshift({
          leadList: '6205500b6d61e16280c8cd18',
          leadProvider: '6201ab1121fcb47afd288466',
          lead: newLead,
        });
        return data.save();
      }
    } catch (err) {
      console.error(err.message);
    }
  })
);

console.log(test);
*/

function storelead(data) {
  // This creates an array of Promise objects, which can be
  // executed in parallel.
  const promises = data.map((newLead) => {
    return Lead.findOne({ phone: newLead.phone_number }).then((results) => {
      console.log(results);
    });
  });
  return Promise.all(promises);
}

async function main() {
  await storelead(testArr);
  process.exit(0);
}

main();
