function randomDate(start, end) {
    var d=new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();

}

function displayImage(data){
    $('<div>',{
        class:"images",
        width:'50%',

    }).appendTo('#image-container');
    $('<img>',{
        src:data.url,
        width:'100%'
    }).css('maxHeight','600px').appendTo('#image-container div:last');
    $('<h3>').appendTo('#image-container div:last').text(data.title);
    $('<p>').appendTo('#image-container div:last').text(data.explanation);
}

function perfom(given_date){
    $('#image-container').html('');
    $.get('https://api.nasa.gov/planetary/apod',
    {
        api_key:'x2AXqziOXL8ZEDsEdnx8n0G1Wqw7f91FNn6qqdME',
        date:given_date
    },
    displayImage).fail(function(){
        console.log("Request Failed!!!");
    });
}

function check_leap(y){
    if((y%4==0 && y%100!=0) || y%400==0) return true;
    return false;
}

$('#btn1').click(function(event){
    event.preventDefault();
    var given_date=$('#inp').val();
    var f=given_date.split("-");
    if(f.length!=3){
        alert("Invalid Format!!!");
        return;
    }
    map={1:31,3:31,4:30,5:31,6:30,7:31,8:31,9:30,
        10:31,11:30,12:30};
    if(parseInt(f[0])<2012){
        alert("Please enter a date from 2012-01-01 till today!!!");
        return;
    }
    if(check_leap(parseInt(f[0]))) map[2]=29;
    else map[2]=28;
    if(f[1]<=0 || f[1]>12){
        alert("Not a valid month!!!");
        return;
    }
    if(parseInt(f[2])<=0 || map[parseInt(f[1])]<parseInt(f[2])){
        alert("Not a valid Day!!!");
        return;
    }
    if(new Date(parseInt(f[0]),parseInt(f[1]),parseInt(f[2]))>new Date()){
        alert("Date refers to a future time!!!");
        return;
    }
    perfom(given_date);
});

$('#btn2').click(function(event){
    var given_date=randomDate(new Date(2012, 0, 1), new Date());
    $('#inp').val(given_date);
    event.preventDefault();
    perfom(given_date);
});