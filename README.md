#Caleandar 
```
Calender.js ile yaratılıp windows calender.js algoritması ile her yılın ayları düzgünce hesaplanıp fazlalıklar elde tutulup sonraki aya veya yıla aktaralın bir js yapısı bulunmaktadır. 
JsonData.js den aldığı verileri calender.js deki evDate , endDate ve toDate e gönderip takvimdeki yerlerinin bulunması ve JsonData daki title'ı ordaki zaman aralığına span açıp yazmaktadır.
 Algoritma araştırmalar ve örneklere sayesinde güçlendirilmiş ve olabildiğince sadece ve açıklamalarla basitleştirilmeye çalışılmıştır.
```
####Data
```
var eventDays = [
  {'startDate': new Date(2019,9,11), 'endDate':new Date(2019,9,13),'Title': 'Event1'},
  {'startDate': new Date(2019, 9,15), 'Title': 'event 2'},
  {'startDate': new Date(2019,9,20), 'endDate':new Date(2019,11,10),'Title': 'event 3'}
];

```

####AYARLAR
Aşağıda, örnek değerlere sahip tüm olası ayar özellikleri verilmiştir.
```
var settings={
    Color: '#999',                //(string - color) tüm takvimin yazı tipi rengi.
    LinkColor: '#333',            //(string - color) Etkinlik başlıklarının yazı tipi rengi.
    NavShow: true,                //(bool) gezinme oklarını göster.
    NavVertical: false,           //(bool) önceki ve sonraki ayları göster.
    NavLocation: '#foo',          //(string - element) varsayılan konumda değilse, navigasyonun görüntüleneceği yer.
    DateTimeShow: true,           //(bool) geçerli tarihi göster.
    DateTimeFormat: 'mmm, yyyy',  //(string - dateformat) daha önce belirtilen tarih biçiminde gösterme.
    DatetimeLocation: '',         //(string - element) varsayılan konumda değilse önceden belirtilen tarihin nerede gösterileceğini.
    EventClick: '',               //(function) Herhangi bir olaya tıklandığında başlatılması gereken bir işlev. Data link özniteliği aracılığıyla iletilen parametreler.
    EventTargetWholeDay: false,   //(bool) tüm tarihe tıklamak, sadece başlığa tıklamak yerine, olayı tetikleyecektir.
    DisabledDays: [],             //(array of numbers) haftanın günleri biraz şeffaf olacak.
    ModelChange: model            //(array of objects) takvime geçirilecek yeni veri nesnesi (öneri sunumu: büyük veri kümesiyle çalışıyorsanız, yalnızca seçili olan ayın etkinliklerinden geçmek).
  }
```