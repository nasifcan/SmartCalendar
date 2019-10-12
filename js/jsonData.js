var eventDays = [
  {'startDate': new Date(2019,9,11), 'endDate':new Date(2019,9,13),'Title': 'event1'},
  {'startDate': new Date(2019, 9, 15), 'Title': 'event 2'},
  {'startDate': new Date(2019,9,20), 'endDate':new Date(2019,11,10),'Title': 'event 3'}
];
var settings = {};
var element = document.getElementById('DataShowPlace');
SenderOfCalender(element, eventDays , settings);