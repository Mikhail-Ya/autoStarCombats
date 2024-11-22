
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

function put_complect(id, new_name)
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
          var timetomax = new Array();
          timetomax = req.responseJS.timetomax;
          top.reloadParameters(false, parseInt(timetomax.overall_hp), parseInt(timetomax.current_hp), parseInt(timetomax.overall_energy), parseInt(timetomax.current_energy), parseInt(Math.round(timetomax.hp_time / 100)), parseInt(Math.round(timetomax.energy_time / 100)));

          var slots_scrolls = new Array();
          var slots_things = new Array();
          var burn = new Array();
          slots_things = drop_all_things();
          slots_scrolls = drop_all_scrolls();

          things_on = req.responseJS.things;
          for (field in things_on)
          {
            burn[things_on[field]['weapon_type']] = things_on[field][things_on[field]['weapon_type'] + '_burn'];
            tpl = '<img id="now_' + things_on[field]['weapon_type'] + '" src="' + _text[lang]['things_img_path']
              +  things_on[field][things_on[field]['weapon_type'] + '_img']
              + '" width="'
              + size_thing[things_on[field]['weapon_type']].width
              +'" height="'
              + size_thing[things_on[field]['weapon_type']].height
              + '" alt="'
              + things_on[field][things_on[field]['weapon_type'] + '_name']
              + '" title="'
              + things_on[field][things_on[field]['weapon_type'] + '_name']
              + '" onclick="drop_thing(\''
              + things_on[field]['weapon_type']
              + '\');" style="cursor:hand">';

            thing[things_on[field]['weapon_type']] = things_on[field][things_on[field]['weapon_type'] + '_name'];
            slots_things[things_on[field]['weapon_type']] = tpl;
          }
          for (field in slots_things)
          {
            document.getElementById(field).innerHTML = slots_things[field];
            if (burn[field])
            {
              if (size_thing[field].height == 30) fon = 'fon1.gif';
              else if (size_thing[field].height == 40) fon = 'fon2.gif';
              else fon = 'fon.gif';
              document.getElementById("now_" + field).style.backgroundImage = 'URL(' + _text[lang]['img_path'] + fon + ')';
            }
          }

          scrolls_on = req.responseJS.scrolls;
          for (field in scrolls_on)
          {
            tpl = '<img onclick="drop_scroll(\''
              + scrolls_on[field]['scroll_type']
              + '\');" src="' + _text[lang]['scrolls_img_path']
              + scrolls_on[field][scrolls_on[field]['scroll_type'] + '_img'] + '" alt="'
              + scrolls_on[field][scrolls_on[field]['scroll_type'] + '_name'] + '" title="'
              + scrolls_on[field][scrolls_on[field]['scroll_type'] + '_name']
              + '" width="30" height="25" style="cursor:hand">';

            scroll[scrolls_on[field]['scroll_type']] = scrolls_on[field][scrolls_on[field]['scroll_type'] + '_name'];
            slots_scrolls[scrolls_on[field]['scroll_type']] = tpl;
          }
          for (field in slots_scrolls)
          {
            document.getElementById(field).innerHTML = slots_scrolls[field];
          }

          inventory = req.responseJS.inventory;
          if (inventory)
          {
            for (field in inventory) document.getElementById(field).innerHTML = inventory[field];
          }

          if (req.responseJS.info) reload_chars(req.responseJS.info);
          load_things();
          show_result(_text[lang]['complect'] + ' "' + new_name + '" ' + _text[lang]['put_success']);
        }
      }
    }

    req.open('GET', _text[lang]['station_path'] + 'ajax/hold/hold_put_complect.php', true);
    req.send({id: id, ix: Math.random()});
  
}
function put_scroll(id, new_name, is_use, container_id, code)
{
  
    if (is_use)
    {
      use_scroll_id = id;
      eval(code);
      reload_container = container_id;
    }
    else
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
            reload_items(container_id);
            scrolls = req.responseJS.scrolls;
            for (field in scrolls)
            {
              tpl = '<img onclick="drop_scroll(\''
                + scrolls[field]['scroll_type']
                + '\');" src="' + _text[lang]['scrolls_img_path']
                + scrolls[field][scrolls[field]['scroll_type'] + '_img'] + '" alt="'
                + scrolls[field][scrolls[field]['scroll_type'] + '_name'] + '" title="'
                + scrolls[field][scrolls[field]['scroll_type'] + '_name']
                + '" width="30" height="25" style="cursor:hand">';

              document.getElementById(scrolls[field]['scroll_type']).innerHTML = tpl;
              scroll[scrolls[field]['scroll_type']] = scrolls[field][scrolls[field]['scroll_type'] + '_name'];
            }

            inventory = req.responseJS.inventory;
            if (inventory)
            {
              for (field in inventory) document.getElementById(field).innerHTML = inventory[field];
            }
            show_summary(req.responseJS.summary);
          }
        }
      }

      req.open('GET', _text[lang]['station_path'] + 'ajax/hold/hold_put_scroll.php', true);
      req.send({id: id, ix: Math.random()});
    }
  
}
function injected_main(){
              let timeRdn = Math.floor(Math.random()*1000)
          let smeKomplect=()=>{
            let trumOkno = document.getElementsByName('mainWindow')[0].contentDocument;
            let menuKomplBut = trumOkno.querySelector('.compl td:nth-of-type(4) a');
            let complAll = trumOkno.querySelectorAll('#inner_complect tr');
            let scriptsKol = trumOkno.querySelectorAll('script').length;
            if(scriptsKol<9) {
                  var script = document.createElement("script");
                  script.setAttribute("type", "text/javascript");
                  script.innerHTML = put_scroll + '; ' + put_complect;
                  trumOkno.getElementsByTagName('head')[0].appendChild(script);
            }
            
            
            complAll[2].querySelector('a').click()

            
              setTimeout(()=>{
              complAll[0].querySelector('a').click()
              useHilk()
            },timeRdn+5000)
            
          }
          let useHilk =()=>{
            let trumOkno = document.getElementsByName('mainWindow')[0].contentDocument;
            let implesTop = trumOkno.querySelector('.cats a:nth-of-type(2)');
            let kolUseng = 0;
            let dolgovech = 0;
            let iskomoeKol = 0;
            setTimeout(()=>{implesTop.click()},2000);
            let timeRdn = Math.floor(Math.random()*1000)
            
            let timeObl = setTimeout(()=>{
              let implesItem = trumOkno.querySelector('#group2 table:nth-of-type(3) a');
              implesItem.click()
              setTimeout(()=>{
                trumOkno = document.getElementsByName('mainWindow')[0].contentDocument;
                let iskomoeName = 'Миниверфь'; // проги которые ищем для хила
                let obshee = trumOkno.querySelectorAll('.item');
                let iskomoe = new Array;
                for (var i = 0; i < obshee.length; i++) {
                  var block = obshee[i]
                  if (block.querySelector('h1').textContent === iskomoeName){
                     iskomoe.push(block);
                   }
                }
                iskomoeKol=iskomoe.length;
                dolgovech = Number(iskomoe[iskomoeKol-1].querySelector('h2').textContent[15])
                
                let intervalUsing = setInterval(()=>{
                  if (kolUseng<23&&iskomoeKol>=1) { // сколько пользований за круг
                    var kont = iskomoe[iskomoeKol-1];
                    if (5>dolgovech){
                      kont.querySelector('tr:nth-of-type(2) td:nth-of-type(2) img').click()
                        setTimeout(()=>{
                          trumOkno = document.getElementsByName('mainWindow')[0].contentDocument;
                          trumOkno.querySelector('.pr_btn1').click();
                        },timeRdn+1000)
                        dolgovech++
                        kolUseng++
                    } else {
                      iskomoeKol--
                      dolgovech=0
                    }
                    setTimeout(()=>{
                      trumOkno = document.getElementsByName('mainWindow')[0].contentDocument;
                      trumOkno.querySelector('.infoBtn').click();
                    },3000)
                  } else if (iskomoeKol>=1) {
                    clearInterval(intervalUsing)
                    smeKomplect()
                  } else {
                    console.log('закончились')
                    clearInterval(intervalUsing)
                  }
                },timeRdn+4000)
              },timeRdn+3000)
              clearTimeout(timeObl)
            },timeRdn+5000)
            
          }
        
        setTimeout(smeKomplect,10000)
}
function injected_main_new(){
  const programs_name = 'Миниверфь';
  let arrProgramm;
    const  toggleKit = async () => {
      const trumOkno = document.getElementsByName('mainWindow')[0].contentDocument;
      
      const scriptsKol = trumOkno.querySelectorAll('script').length;
      if(scriptsKol<9) {
        var script = document.createElement("script");
        script.setAttribute("type", "text/javascript");
        script.innerHTML = put_scroll + '; ' + put_complect;
        trumOkno.getElementsByTagName('head')[0].appendChild(script);
      }
      try{
        let rest = await putMiniKit();
        rest = await putPortion();
        return rest;
      }
      catch{
        return false;
      }
    }

    function putMiniKit(){
        return Promise((resolve)=>{
          const main = document.getElementsByName('mainWindow')[0].contentDocument
          const complAll = main.querySelectorAll('#inner_complect tr');
           complAll[2].querySelector('a').click();
          setTimeout(()=>{
            complAll[0].querySelector('a').click();
            setTimeout(()=>{
              resolve(true)
            },1210)
          },1220)
          })
    }
    function putPortion(){
      return Promise((resolve)=>{
        const main = document.getElementsByName('mainWindow')[0].contentDocument;
        main.querySelector('.cats a:nth-of-type(2)').click();
        setTimeout(()=>{
          main.querySelector('#group2 table:nth-of-type(3) a').click();
          resolve(true)
        },1305)
      })
    }
    function checkingSelect() {
      return Promise(()=>{
        
      })
    }
    function awaitMessage () {
      const reviewMess = setInterval(()=>{
        const main = document.getElementsByName('mainWindow')[0].contentDocument;
        const windowMessage = main.querySelector('#infoWindowMessage')
      },1020)
    }
    // const choosingCategory= async () => {
    //   let main = document.getElementsByName('mainWindow')[0].contentDocument;
    //   try {
    //   } catch (err) {
    //   }
    // }
    const repairPrograms = () => {

    }
    const usePrograms = async () => {

    }

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