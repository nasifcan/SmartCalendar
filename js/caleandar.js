
var Calendar = function(model, options, date){
  // varsayılan değerler oluşturma
  this.Options = {
    Color: '',
    LinkColor: '',
    NavShow: true,
    NavVertical: false,
    NavLocation: '',
    DateTimeShow: true,
    DateTimeFormat: 'mmm, yyyy',
    DatetimeLocation: '',
    EventClick: '',
    EventTargetWholeDay: false,
    DisabledDays: [],
    ModelChange: model
  };
  // üstte oluşturulan varsayılan özellerin üzerine yazma 
  for(var key in options){
    this.Options[key] = typeof options[key]=='string'?options[key].toLowerCase():options[key];
  }

  model?this.Model=model:this.Model={};
  this.Today = new Date();
//bugünün gün ay yıl değerlerini oluşturma
  this.Selected = this.Today
  this.Today.Month = this.Today.getMonth();
  this.Today.Year = this.Today.getFullYear();
  if(date){this.Selected = date}
  this.Selected.Month = this.Selected.getMonth();
  this.Selected.Year = this.Selected.getFullYear();
  // ayın başlangıç günü ve bitiş gününü oluşturma 
  this.Selected.Days = new Date(this.Selected.Year, (this.Selected.Month + 1), 0).getDate();
  this.Selected.FirstDay = new Date(this.Selected.Year, (this.Selected.Month), 0).getDay();
  this.Selected.LastDay = new Date(this.Selected.Year, (this.Selected.Month + 1), 0).getDay();

  this.Prev = new Date(this.Selected.Year, (this.Selected.Month - 1), 1);
  if(this.Selected.Month==0){this.Prev = new Date(this.Selected.Year-1, 11, 1);}
  this.Prev.Days = new Date(this.Prev.getFullYear(), (this.Prev.getMonth() + 1), 0).getDate();
};

function createCalendar(calendar, element, adjuster){
  if(typeof adjuster !== 'undefined'){
    var newDate = new Date(calendar.Selected.Year, calendar.Selected.Month + adjuster, 1);
    calendar = new Calendar(calendar.Model, calendar.Options, newDate);
    element.innerHTML = '';
  }else{
    for(var key in calendar.Options){
      typeof calendar.Options[key] != 'function' && typeof calendar.Options[key] != 'object' && calendar.Options[key]?element.className += " " + key + "-" + calendar.Options[key]:0;
    }
  }
  var months = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Agustos", "Eylül", "Ekim", "Kasım", "Aralık"];

  function AddSidebar(){
    var sidebar = document.createElement('div');
    sidebar.className += 'cld-sidebar';

    var monthList = document.createElement('ul');
    monthList.className += 'cld-monthList';

    for(var i = 0; i < months.length - 3; i++){
      var x = document.createElement('li');
      x.className += 'cld-month';
      var n = i - (4 - calendar.Selected.Month);
      // Fazladan sayılan ay değerleri hesaplama alanı
      
      if(n<0){n+=12;}
      else if(n>11){n-=12;}
      // Sınıf ekleme 
      if(i==0){
        x.className += ' cld-rwd cld-nav';
        x.addEventListener('click', function(){
          typeof calendar.Options.ModelChange == 'function'?calendar.Model = calendar.Options.ModelChange():calendar.Model = calendar.Options.ModelChange;
          createCalendar(calendar, element, -1);});
        x.innerHTML += '<svg height="15" width="15" viewBox="0 0 100 75" fill="rgba(255,255,255,0.5)"><polyline points="0,75 100,75 50,0"></polyline></svg>';
      }
      else if(i==months.length - 4){
        x.className += ' cld-fwd cld-nav';
        x.addEventListener('click', function(){
          typeof calendar.Options.ModelChange == 'function'?calendar.Model = calendar.Options.ModelChange():calendar.Model = calendar.Options.ModelChange;
          createCalendar(calendar, element, 1);} );
        x.innerHTML += '<svg height="15" width="15" viewBox="0 0 100 75" fill="rgba(255,255,255,0.5)"><polyline points="0,0 100,0 50,75"></polyline></svg>';
      }
      else{
        if(i < 4){x.className += ' cld-pre';}
        else if(i > 4){x.className += ' cld-post';}
        else{x.className += ' cld-curr';}

        
        (function () {
          var adj = (i-4);
          //x.addEventListener('click', function(){createCalendar(calendar, element, adj);console.log('kk', adj);} );
          x.addEventListener('click', function(){
            typeof calendar.Options.ModelChange == 'function'?calendar.Model = calendar.Options.ModelChange():calendar.Model = calendar.Options.ModelChange;
            createCalendar(calendar, element, adj);} );
          x.setAttribute('style', 'opacity:' + (1 - Math.abs(adj)/4));
          x.innerHTML += months[n].substr(0,3);
        }());

        if(n==0){
          var y = document.createElement('li');
          y.className += 'cld-year';
          if(i<5){
            y.innerHTML += calendar.Selected.Year;
          }else{
            y.innerHTML += calendar.Selected.Year + 1;
          }
          monthList.appendChild(y);
        }
      }
      monthList.appendChild(x);
    }
    sidebar.appendChild(monthList);
    if(calendar.Options.NavLocation){
      document.getElementById(calendar.Options.NavLocation).innerHTML = "";
      document.getElementById(calendar.Options.NavLocation).appendChild(sidebar);
    }
    else{element.appendChild(sidebar);}
  }

  var mainSection = document.createElement('div');
  mainSection.className += "cld-main";

  function AddDateTime(){
      var datetime = document.createElement('div');
      datetime.className += "cld-datetime";
      if(calendar.Options.NavShow && !calendar.Options.NavVertical){
        var rwd = document.createElement('div');
        rwd.className += " cld-rwd cld-nav";
        rwd.addEventListener('click', function(){createCalendar(calendar, element, -1);} );
        rwd.innerHTML = '<svg height="15" width="15" viewBox="0 0 75 100" fill="rgba(0,0,0,0.5)"><polyline points="0,50 75,0 75,100"></polyline></svg>';
        datetime.appendChild(rwd);
      }
      var today = document.createElement('div');
      today.className += ' today';
      today.innerHTML = months[calendar.Selected.Month] + ", " + calendar.Selected.Year;
      datetime.appendChild(today);
      if(calendar.Options.NavShow && !calendar.Options.NavVertical){
        var fwd = document.createElement('div');
        fwd.className += " cld-fwd cld-nav";
        fwd.addEventListener('click', function(){createCalendar(calendar, element, 1);} );
        fwd.innerHTML = '<svg height="15" width="15" viewBox="0 0 75 100" fill="rgba(0,0,0,0.5)"><polyline points="0,0 75,50 0,100"></polyline></svg>';
        datetime.appendChild(fwd);
      }
      if(calendar.Options.DatetimeLocation){
        document.getElementById(calendar.Options.DatetimeLocation).innerHTML = "";
        document.getElementById(calendar.Options.DatetimeLocation).appendChild(datetime);
      }
      else{mainSection.appendChild(datetime);}
  }

  function AddLabels(){
    var labels = document.createElement('ul');
    labels.className = 'cld-labels';
    var labelsList = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi","Pazar"];
    for(var i = 0; i < labelsList.length; i++){
      var label = document.createElement('li');
      label.className += "cld-label";
      label.innerHTML = labelsList[i];
      labels.appendChild(label);
    }
    mainSection.appendChild(labels);
  }
  function AddDays(){
    // yapı sayısı kadar element yaratma 
    function DayNumber(n){
      var number = document.createElement('p');
      number.className += "cld-number";
      number.innerHTML += n;
      return number;
    }
    var days = document.createElement('ul');
    days.className += "cld-days";
    // önceki ayın günleri
    for(var i = 0; i < (calendar.Selected.FirstDay); i++){
      var day = document.createElement('li');
      day.className += "cld-day prevMonth";
      //önceki ayın kapalı günleri
      var d = i%7;
      for(var q = 0; q < calendar.Options.DisabledDays.length; q++){
        if(d==calendar.Options.DisabledDays[q]){
          day.className += " disableDay";
        }
      }

      var number = DayNumber((calendar.Prev.Days - calendar.Selected.FirstDay) + (i+1));
      day.appendChild(number);
      days.appendChild(day);
    }
    // Bulunduğun ayın günleri
    for(var i = 0; i < calendar.Selected.Days; i++){
      var day = document.createElement('li');
      day.className += "cld-day currMonth";
      //Bulunduğun ayın kapalı günleri
      var d = (i + calendar.Selected.FirstDay)%7;
      for(var q = 0; q < calendar.Options.DisabledDays.length; q++){
        if(d==calendar.Options.DisabledDays[q]){
          day.className += " disableDay";
        }
      }
      var number = DayNumber(i+1);
      
      // JSON veriyi işleme 
      for(var n = 0; n < calendar.Model.length; n++){
        var evDate = calendar.Model[n].startDate;
        var endDate = calendar.Model[n].endDate;
        var toDate = new Date(calendar.Selected.Year, calendar.Selected.Month, (i+1))
        // endData null kontrolu
        if(endDate != null){
           toDate = new Date(calendar.Selected.Year, calendar.Selected.Month, (i+1))
           if( evDate.getTime() <= toDate.getTime() && endDate.getTime() >= toDate.getTime()){
             
              number.className += " eventday";
              var title = document.createElement('span');
              title.className += "cld-title"; 
              title.innerHTML += '<a href="' + calendar.Model[n].Link + '">' + calendar.Model[n].Title + '</a>';
              number.appendChild(title);
          }
    
        }
      }
      day.appendChild(number);
      // bugünün gösterir ..
      if((i+1) == calendar.Today.getDate() && calendar.Selected.Month == calendar.Today.Month && calendar.Selected.Year == calendar.Today.Year){
        day.className += " today";
      }
      days.appendChild(day);
    }
    // sonraki ayın hesaplama
    // ayda yaklaşık aynı sayıda gün olduğu için hesaplama 
    var extraDays = 13;
    if(days.children.length>35){extraDays = 6;}
    else if(days.children.length<29){extraDays = 20;}

    for(var i = 0; i < (extraDays - calendar.Selected.LastDay); i++){
      var day = document.createElement('li');
      day.className += "cld-day nextMonth";
      //kapalı günler 
      var d = (i + calendar.Selected.LastDay + 1)%7;
      for(var q = 0; q < calendar.Options.DisabledDays.length; q++){
        if(d==calendar.Options.DisabledDays[q]){
          day.className += " disableDay";
        }
      }
      //günleri yarat ve sırala 0. gün olmadığı için i+1
      var number = DayNumber(i+1);
      day.appendChild(number);

      days.appendChild(day);
    }
    mainSection.appendChild(days);
  }
  if(calendar.Options.Color){
    mainSection.innerHTML += '<style>.cld-main{color:' + calendar.Options.Color + ';}</style>';
  }
  if(calendar.Options.LinkColor){
    mainSection.innerHTML += '<style>.cld-title a{color:' + calendar.Options.LinkColor + ';}</style>';
  }
  element.appendChild(mainSection);

  if(calendar.Options.NavShow && calendar.Options.NavVertical){
    AddSidebar();
  }
  if(calendar.Options.DateTimeShow){
    AddDateTime();
  }
  AddLabels();
  AddDays();
}
// jsonVeri.js deki veriyi alır 
function SenderOfCalender(el, data, settings){
  var obj = new Calendar(data, settings);
  createCalendar(obj, el);
}
