function delete_other(id, new_name)
{
        
                var req = new Subsys_JsHttpRequest_Js()
                req.onreadystatechange = function()
                {
                        if (req.readyState == 4)
                        {
                                error = req.responseJS.error;
                                if (error) show_error(error);
                                else
                                {
                                        inventory = req.responseJS.inventory;
                                        if (inventory)
                                        {
                                                for (field in inventory) document.getElementById(field).innerHTML = inventory[field];
                                        }

                                        show_result(_text[lang]['item_name'] + ' "' + new_name + '" ' + _text[lang]['delete_success']);
                                        document.getElementById("item" + id).style.display = 'none';
                                }
                        }
                }

                req.open('GET', _text[lang]['station_path'] + 'ajax/hold/hold_delete_other.php', true);
                req.send({id: id, ix: Math.random()});
        
}
function delete_scroll(id, new_name)
{
  
    var req = new Subsys_JsHttpRequest_Js()
    req.onreadystatechange = function()
    {
      if (req.readyState == 4)
      {
        error = req.responseJS.error;
        if (error) show_error(error);
        else
        {
          inventory = req.responseJS.inventory;
          if (inventory)
          {
            for (field in inventory) document.getElementById(field).innerHTML = inventory[field];
          }
          show_summary(req.responseJS.summary);

          show_result(_text[lang]['item_name'] + ' "' + new_name + '" ' + _text[lang]['delete_success']);
          document.getElementById("item" + id).style.display = 'none';
        }
      }
    }

    req.open('GET', _text[lang]['station_path'] + 'ajax/hold/hold_delete_scroll.php', true);
    req.send({id: id, ix: Math.random()});
  
}
function injected_main(){
      let iskomoe = new Array;
      let iskomoeKol = 0;
      let beginner = true;
        function testAuto(){
          let mainOkno = document.getElementsByName('mainWindow')[0].contentDocument;
          
          let iskomoeName = 'Мультистрелок v3.0 CV';
          let obshee = mainOkno.querySelectorAll('#type1_1 .item'); 
              var script = document.createElement("script");
                  script.setAttribute("type", "text/javascript");
                  script.innerHTML = delete_scroll ;
                  mainOkno.getElementsByTagName('head')[0].appendChild(script);

          for (var i = obshee.length - 1; i >= 0; i--) {
            var block = obshee[i]
            if (block.querySelector('h1').textContent === iskomoeName){
              iskomoe.push(block);
              iskomoeKol++
            }
          }
          if(iskomoe.length > 0 && beginner){
            interDelet()
             beginner = false
          } 
        }
        function interDelet (){ 
            if (iskomoeKol > 0) {
              var kont = iskomoe[iskomoeKol-1];
              var delBtn = kont.querySelector('tr:nth-child(2) td:nth-child(4) img')
            } else {
              ostanov()
              return
            }
            if (delBtn) {
              iskomoeKol--;
              delBtn.click()
              clearTimeout()
              setTimeout(interDelet,1500)
            }
        }
        function ostanov(){
          let panelMenu = document.getElementsByName('menuWindow')[0].contentDocument;
          let navigBtn = panelMenu.querySelector('.right img:last-of-type')
            navigBtn.click()
          return
        }
      setTimeout(testAuto,15000)
}
/*
 * function put_gift(id, new_name, is_use, container_id, code)
{
    if (code == 'true') code = 'alterGiftNameShow(true);';
    else code = 'useGiftForm.submit();';
    use_gift_id = id;
    eval(code);
};let using = 40; setInterval(()=>{ 
if(using>0){document.querySelector('.item:nth-of-type(35) tr:nth-of-type(2) td:nth-of-type(2) img').click(); 
using--}},3000)
  */
/**
 * setInterval(()=>{
    let main = document.getElementsByName('mainWindow')[0].contentDocument;
    let upmenu = document.getElementsByName('menuWindow')[0].contentDocument;
    let oknoMes = document.getElementsByName('chatbarWindow')[0].contentDocument;
    let messege = oknoMes.querySelector('#chatmessage');
    let sector = main.querySelector('#sector');
    let otp = oknoMes.querySelector('.chatbtn');
    let navigBtn = upmenu.querySelector('.right img:last-of-type')
        navigBtn.click()
    setTimeout(()=>{
        let main = document.getElementsByName('mainWindow')[0].contentDocument;
        let sector = main.querySelector('#sector');
       messege.value = sector.textContent;
    setTimeout(()=>{otp.click()},1000); 
    },2000)
},60000)
 * 
 * 
 * 
 * 
 * */