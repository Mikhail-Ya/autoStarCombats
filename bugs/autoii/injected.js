function put_complect(id, new_name) {
  var req = new Subsys_JsHttpRequest_Js();
  req.onreadystatechange = function () {
    if (req.readyState == 4) {
      error = req.responseJS.error;
      if (error) show_error(error);
      else {
        reload();
        document.getElementById("speed").innerHTML = req.responseJS.info.speed;
        document.getElementById("capacity").innerHTML =
          req.responseJS.info.capacity;
        if (document.getElementById("tactics"))
          document.getElementById("tactics").innerHTML =
            req.responseJS.info.tactics;
        if (document.getElementById("intelligence"))
          document.getElementById("intelligence").innerHTML =
            req.responseJS.info.intelligence;

        show_result('Комплект "' + new_name + '" был успешно установлен.');
      }
    }
  };

  req.open(
    "POST",
    "http://foggystation.starcombats.com/ajax/hold/hold_iskin_put_complect.php",
    true
  );
  req.send({ id: id, ix: Math.random() });
}

function use_complect() {
  var req = new Subsys_JsHttpRequest_Js();
  req.onreadystatechange = function () {
    if (req.readyState == 4) {
      show_complect = true;
      text = "";
      count = req.responseJS.count;
      if (count == 0) text += "";
      else {
        complect = req.responseJS.complect;
        var new_counter = 0;
        for (i = 0; new_counter < 5, i < complect.length; i++) {
          if (complect[i] != null) {
            if (complect[i].name[0] == "_") {
              text += complect_tpl(complect[i].complect_id, complect[i].name);
              new_counter++;
            }
          }
        }
      }
      document.getElementById("new_complects").innerHTML = text;
    }
  };

  req.open(
    "POST",
    "http://foggystation.starcombats.com/ajax/hold/hold_iskin_complects.php",
    true
  );
  req.send({ ix: Math.random() });
}

function put_virus(id, name) {
  var req = new Subsys_JsHttpRequest_Js();
  req.onreadystatechange = function () {
    if (req.readyState == 4) {
      error = req.responseJS.error;
      if (error) show_error(error);
      else {
        document.location.reload();
      }
    }
  };
  req.open(
    "POST",
    "http://foggystation.starcombats.com/ajax/hold/hold_put_virus.php",
    true
  );
  req.send({ id: id, ix: Math.random() });
}

function use_ability(position, data) {
  if (true) {
    if (abils[position]) {
      a = abils[position];
      if (a["has_ability"] == 0) {
        show_error("Вы еще не построили эту абилу!");
      } else if (parseInt(a["used"]) >= parseInt(a["count"])) {
        show_error(
          "Вы уже израсходовали количество использований, дождитесь перезарядки!"
        );
      } else {
        if (data == "" && abils[position]["js_script"] != "") {
          eval(abils[position]["js_script"] + "(" + position + ");");
          return false;
        }
        var req = new Subsys_JsHttpRequest_Js();
        req.onreadystatechange = function () {
          if (req.readyState == 4) {
            error = req.responseJS.error;
            if (error.error) {
              show_error(error.text);
            } else {
              if (error.text) {
                show_result(error.text);
              } else if (error.eval) {
                eval(error.eval);
              }
              abils[position].used++;
              setEnergyInfo();
            }
            if (req.responseJS.eval) {
              eval(req.responseJS.eval);
            }
          }
        };
        req.open(
          "GET",
          "http://foggystation.starcombats.com/ajax/bridge_use.php",
          true
        );
        req.send({
          ability_id: a["ability_id"],
          data: data,
          ix: Math.random(),
        });
      }
    }
  }
}

function use_scroll(id) {
  if (true) {
    if (parseInt(_scrollsInfo[id].life_max) > 0) {
      var req = new Subsys_JsHttpRequest_Js();
      req.onreadystatechange = function () {
        if (req.readyState == 4) {
          if (req.responseJS.error) {
            if (req.responseJS.error.text) {
              show_result(req.responseJS.error.text);
            } else {
              show_error(req.responseJS.error);
            }
          } else {
            if (req.responseJS.text) {
              show_result(req.responseJS.text);
            }
            load_scroll_info(id);
          }
        }
      };
      req.open(
        "POST",
        "http://foggystation.starcombats.com/ajax/hold/hold_scroll_container.php",
        true
      );
      req.send({ id: _scrollsInfo[id].current_id, ix: Math.random() });
    } else {
      show_error("Нет доступных использований программы!");
    }
  }
}

//28431(21.07)--28809(22.07)--29513(24.07)--29900(25.07)--31000(27.07)--32612(31.07)--34383(03.08)
//--47065(30.08) --47824(31.08)
function injected_main() {
  let abi_50 = 3;
  let abi_100 = 10;
  let abi_200 = 1;
  let abilkaGos = 0;
  let abilkaEkr = 0;
  let stoperInd = true;
  let zapiska = { 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 }; //список забегов искинов по порядку
  let povtorVrem = 24;
  let povtorVrem1 = 24;
  let last_minuty = 0;
  let isklyuchit = [9, 8, 7];
  const complect = {
    '11': 1,
    '2': 2,
    '7': 3,
    '8': 4,
    '9': 5,
  } 
  let iskDup = [15]; // какие искины ставятся третьими
  let limit = 23;
  let iskinLimit = "13";
  let ustanovitAnti = true;

  let perezIskin = 5;

  let boy = () => {
    function use_thing(obj_id, id) {
      if (!block_set) set_block(1 + Math.floor(Math.random() * 4));
      form_block = block_zone[self["points_to_block"]][block_num];
      slot_obj = document.getElementById(obj_id);

      if (slot_obj.func === "true") {
        var onclick = function () {
          use_thing_name(obj_id, id);
          return false;
        };
        show_name_form(obj_id, id, onclick);
      } else if (slot_obj.func === "joker") {
        var onclick = function () {
          use_thing_name(obj_id, id);
          return false;
        };
        show_joker_form(obj_id, id, onclick);
      } else {
        var req = new Subsys_JsHttpRequest_Js();
        req.onreadystatechange = function () {
          if (req.readyState == 4) {
            clear_all();
            error = req.responseJS.error;
            if (error) show_error(error);
            else {
              if (req.responseJS.self) {
                show_info(req.responseJS.self);
                set_current_param(req.responseJS.self);
              }
              if (req.responseJS.scrolls) load_imps(req.responseJS.scrolls);
              if (req.responseJS.things) load_things(req.responseJS.things);
              if (req.responseJS.enemy) show_enemy_info(req.responseJS.enemy);
              if (req.responseJS.enemy_things)
                load_enemy_things(req.responseJS.enemy_things);
              else load_default_enemy_things();
              if (req.responseJS.seconds_before_end) {
                secondsBeforeEnd = req.responseJS.seconds_before_end;
              }
              if (req.responseJS.abilities) {
                virus_ability = req.responseJS.abilities;
                prepare_virus_ability();
              }
              if (req.responseJS.end_window) {
                show_button(false);
                show_glass();
                show_result(
                  req.responseJS.end_window +
                    '<br><br><a href="' +
                    log_string +
                    '" target="_blank">Полный лог боя</a>'
                );
              }
              top.chatWindow.get_log();
            }
          }
        };

        req.open(
          "POST",
          _text[lang]["station_path"] + "ajax/combat/use_thing.php",
          true
        );
        req.send({ thing_id: id, block: form_block, ix: Math.random() });
      }
    }

    function use_scroll(obj_id, id) {
      if (!block_set) set_block(1 + Math.floor(Math.random() * 4));
      form_block = block_zone[self["points_to_block"]][block_num];
      slot_obj = document.getElementById(obj_id);
      if (slot_obj.func === "true") {
        var onclick = function () {
          use_scroll_name(obj_id, id);
          return false;
        };
        show_name_form(obj_id, id, onclick);
      } else if (slot_obj.func === "joker") {
        var onclick = function () {
          use_scroll_name(obj_id, id);
          return false;
        };
        show_joker_form(obj_id, id, onclick);
      } else {
        var req = new Subsys_JsHttpRequest_Js();
        req.onreadystatechange = function () {
          if (req.readyState == 4) {
            clear_all();
            error = req.responseJS.error;
            if (error) show_error(error);
            else {
              if (req.responseJS.self) {
                show_info(req.responseJS.self);
                set_current_param(req.responseJS.self);
              }
              if (req.responseJS.scrolls) load_imps(req.responseJS.scrolls);
              if (req.responseJS.things) load_things(req.responseJS.things);
              if (req.responseJS.enemy) show_enemy_info(req.responseJS.enemy);
              if (req.responseJS.enemy_things)
                load_enemy_things(req.responseJS.enemy_things);
              else load_default_enemy_things();
              if (req.responseJS.seconds_before_end) {
                secondsBeforeEnd = req.responseJS.seconds_before_end;
              }
              if (req.responseJS.abilities) {
                virus_ability = req.responseJS.abilities;
                prepare_virus_ability();
              }
              if (req.responseJS.end_window) {
                show_button(false);
                show_glass();
                show_result(
                  req.responseJS.end_window +
                    '<br><br><a href="' +
                    log_string +
                    '" target="_blank">Полный лог боя</a>'
                );
              }
              top.chatWindow.get_log();
            }
          }
        };

        req.open(
          "POST",
          _text[lang]["station_path"] + "ajax/combat/use_scroll.php",
          true
        );
        req.send({ scroll_id: id, block: form_block, ix: Math.random() });
      }
    }

    function use_ability(obj_id, id, func, new_name) {
      if (func == "true" && typeof new_name == "undefined") {
        var onclick = function () {
          use_ability(obj_id, id, func, 1);
          return false;
        };
        show_name_form(obj_id, id, onclick);
        return false;
      }

      if (new_name == 1 && document.getElementById("personage_name")) {
        new_name = document.getElementById("personage_name").value;
        document.getElementById("personage_name").value = "";
        hide_name_form();
      } else new_name = "";

      var req = new Subsys_JsHttpRequest_Js();
      req.onreadystatechange = function () {
        if (req.readyState == 4) {
          clear_all();
          error = req.responseJS.error;
          if (error) show_error(error);
          else {
            if (req.responseJS.self) {
              show_info(req.responseJS.self);
              set_current_param(req.responseJS.self);
            }
            if (req.responseJS.scrolls) load_imps(req.responseJS.scrolls);
            if (req.responseJS.things) load_things(req.responseJS.things);
            if (req.responseJS.enemy) show_enemy_info(req.responseJS.enemy);
            if (req.responseJS.enemy_things)
              load_enemy_things(req.responseJS.enemy_things);
            else load_default_enemy_things();
            if (req.responseJS.seconds_before_end) {
              secondsBeforeEnd = req.responseJS.seconds_before_end;
            }
            if (req.responseJS.abilities) {
              virus_ability = req.responseJS.abilities;
              prepare_virus_ability();
            }
            if (req.responseJS.end_window) {
              show_button(false);
              show_glass();
              show_result(
                req.responseJS.end_window +
                  '<br><br><a href="' +
                  log_string +
                  '" target="_blank">Полный лог боя</a>'
              );
            }
            top.chatWindow.get_log();
          }
        }
      };

      req.open(
        "POST",
        _text[lang]["station_path"] + "ajax/combat/use_ability.php",
        true
      );
      req.send({ ability_id: id, name: new_name, ix: Math.random() });
    }
    triggerB = 0;
    let mainOkno = document.getElementsByName("mainWindow")[0].contentDocument;
    let panelMenu = document.getElementsByName("menuWindow")[0].contentDocument;
    let scripts = mainOkno.getElementsByTagName("script").length;
    if (scripts < 8) {
      var script = document.createElement("script");
      script.setAttribute("type", "text/javascript");
      script.innerHTML =
        use_thing + "; " + use_scroll + "; " + use_ability + ";";
      mainOkno.getElementsByTagName("head")[0].appendChild(script);
    }
    let activPer = mainOkno.getElementById("reboot");
    let messageOkno = mainOkno.getElementById("infoWindow");
    let chat_top_win =
      document.getElementsByName("chatmenuWindow")[0].contentDocument;
    let chatBtnday = chat_top_win.getElementById("tabNameChat");
    let obnovRn = Math.floor(Math.random() * 500) + 1000;
    if (messageOkno && messageOkno.style.visibility === "visible") {
      let textInfoWin =
        mainOkno.getElementById("infoWindowMessage").textContent;
      let viborkaTexta = "";
      for (let t = 0; t < 2; t++) {
        viborkaTexta = viborkaTexta + textInfoWin[t];
      }
      switch (viborkaTexta) {
        case "Бо":
          panelMenu.querySelector(".right img:last-child").click();
          setTimeout(() => {
            chatBtnday.click();
          }, obnovRn);
          setTimeout(dannye, obnovRn);
          break;
        case "Вы":
          panelMenu.querySelector(".right img:last-child").click();
          setTimeout(() => {
            chatBtnday.click();
          }, obnovRn);
          setTimeout(dannye, obnovRn);
          break;
        case "Ис":
          let autoboy = mainOkno.querySelector(
            "#new_centerBlock_footer tr:nth-child(2) td:nth-child(2) img"
          );
          autoboy.click();
          setTimeout(dannye, obnovRn);
          break;
        case "Ож":
          setTimeout(dannye, obnovRn);
          break;
        case "Пе":
          mainOkno.querySelector(".infobtn").click();
          panelMenu.querySelector(".right img:last-child").click();
          setTimeout(dannye, obnovRn);
          break;
        default:
          panelMenu.querySelector(".right img:last-child").click();
          setTimeout(() => {
            chatBtnday.click();
          }, obnovRn);
          setTimeout(dannye, obnovRn);
          break;
      }
    } else if (activPer.style.display === "block") {
      let autoboy = mainOkno.querySelector(
        "#new_centerBlock_footer tr:nth-child(2) td:nth-child(2) img"
      );
      autoboy.click();
      setTimeout(dannye, obnovRn);
    } else {
      setTimeout(() => {
        let perezagruz = mainOkno.querySelector("#ability3 a");
        let perezagruzMod = mainOkno.querySelector("#module_left");
        if (perezagruz && perezIskin > 0) {
          perezagruz.click();
          perezIskin--;
        } else {
          perezagruzMod.click();
        }
        setTimeout(() => {
          if (messageOkno.style.visibility !== "visible") {
            mainOkno
              .querySelector("#new_centerBlock_footer img:first-child")
              .click();
          }
        }, 500);
        kontZamena();
      }, obnovRn);
    }
  };
  let useAnti = () => {
    let mainOk = document.getElementsByName("mainWindow")[0].contentDocument;
    mainOk.getElementById("img15").click();
    setTimeout(() => {
      mainOk = document.getElementsByName("mainWindow")[0].contentDocument;
      mainOk.querySelector(".da").click();
      let panelMenu =
        document.getElementsByName("menuWindow")[0].contentDocument;
      setTimeout(() => {
        panelMenu.querySelector(".right img:last-child").click();
        setTimeout(kontZamena, 4358);
      }, 1364);
    }, 2265);
  };
  let dannye = () => {
    let vremya = Number(new Date().getHours());
    let minuty = Number(new Date().getMinutes());

    if (povtorVrem !== vremya) {
      if (7 === vremya) {
        ispolzAbil50 = 0;
        ispolzAbil100 = 0;
        ispolzAbil200 = 0;
      }
      let chatOkno =
        document.getElementsByName("chatWindow")[0].contentDocument;
      let soobsheniya = chatOkno.getElementById("content_rus");
      let data =
        " " +
        vremya +
        " часов, забеги по искинам: " +
        zapiska[5] +
        " - " +
        zapiska[6] +
        " - " +
        zapiska[7] +
        " - " +
        zapiska[8] +
        " - " +
        zapiska[9];

      var div = document.createElement("div");
      div.setAttribute("class", "postmessage");
      div.innerHTML = data;
      soobsheniya.appendChild(div);
      povtorVrem = vremya;
    }
    if (povtorVrem1 !== vremya && last_minuty < minuty && ustanovitAnti) {
      let mainOk = document.getElementsByName("mainWindow")[0].contentDocument;
      top.mainWindow.location.replace("/bridge.php");

      povtorVrem1 = vremya;
    }

    let timeRnd = Math.floor(Math.random() * 1000) + 1500;
    let obnovDate = setInterval(() => {
      let mainOkno =
        document.getElementsByName("mainWindow")[0].contentDocument;
      if (mainOkno.getElementById("reload")) {
        mainOkno.getElementById("reload").click();
        perezIskin = 5;
        let urovIs = Number(mainOkno.getElementById("iskin_level").textContent);
        let kol = Number(mainOkno.getElementById("total_req").textContent);
        let podatKnop = mainOkno.getElementById("start_but");
        let podatString = podatKnop.textContent;
        if (
          ("Подать заявку" !== podatString && 1 === kol) ||
          ("Подать заявку" !== podatString && 2 === kol)
        ) {
          podatKnop.click();
          clearInterval(obnovDate);
          kontZamena();
          return;
        }
        if (3 === kol && iskDup.includes(urovIs)) {
        }

        if (
          (3 === kol && "Подать заявку" === podatString) ||
          (iskDup.includes(urovIs) &&
            2 <= kol &&
            "Подать заявку" === podatString)
        ) {
          mainOkno =
            document.getElementsByName("mainWindow")[0].contentDocument;
          let scripts = mainOkno.getElementsByTagName("script").length;
          if (scripts > 9) {
            clearInterval(obnovDate);
            proverka();
          } else {
            clearInterval(obnovDate);
            kontZamena();
          }
        } else if ("Отозвать заявку" === podatString) {
        } else {
          let iskinUrovList = mainOkno.querySelectorAll(
            ".iskin__lvls-item-lvl"
          );
          let kolZayavka = mainOkno.querySelectorAll(".iskin__lvls-item-count");
          let iscinPerekl = mainOkno.querySelectorAll(".iskin__tpl");
          let posled;
          iskiny: for (var i = 0; i < iskinUrovList.length; i++) {
            let urovIsk = Number(iskinUrovList[i].textContent);
            let kolZa = Number(kolZayavka[i].textContent);
            for (let j = 0; j < iscinPerekl.length; j++) {
              var juk = Number(iscinPerekl[j].textContent);
              if (
                (kolZa === 3 &&
                  juk === urovIsk &&
                  !isklyuchit.includes(urovIsk)) ||
                (iskDup.includes(urovIsk) && 2 <= kolZa && juk === urovIsk)
              ) {
                posled = iscinPerekl[j];
                break iskiny;
              }
            }
          }
          if (posled) {
            posled.click();
            clearInterval(obnovDate);
            kontZamena();
          }
        }
      } else if (mainOkno.getElementById("achange")) {
        clearInterval(obnovDate);
        boy();
      } else if (mainOkno.getElementById("mostik") && ustanovitAnti) {
        clearInterval(obnovDate);
        useAnti();
        last_minuty = minuty;
      }
    }, timeRnd);
  };
  let proverka = () => {
    let timeRnd = Math.floor(Math.random() * 500);
    let main = document.getElementsByName("mainWindow")[0].contentDocument;
    var provPL = false;
    let provEnki = (provPL) => {
      if (provPL) {
        main = document.getElementsByName("mainWindow")[0].contentDocument;
        let energy = main
          .getElementById("Venergytext")
          .textContent.split("/")
          .map(Number)
          .reduce((a, b) => a / b);

        main.getElementById("iskinButtonII").click();
        let scripts = main.getElementsByTagName("script").length;
        if (scripts < 9) {
          kontZamena();
          return;
        }
        if (0.9 <= energy) {
          setTimeout(() => {
            let main =
              document.getElementsByName("mainWindow")[0].contentDocument;
            let kol = main.getElementById("total_req").textContent;
            let urovIs = Number(main.getElementById("iskin_level").textContent);
            if ("3" === kol || (iskDup.includes(urovIs) && "2" === kol)) {
              main.getElementById("start_but").click();
              zapiska[urovIsk]++;
            }
          }, 500);
          setTimeout(dannye, 1000 + timeRnd);
        } else {
          let main =
            document.getElementsByName("mainWindow")[0].contentDocument;
          let kol = main.getElementById("total_req").textContent;
          let urovIs = Number(main.getElementById("iskin_level").textContent);
          if ("3" === kol || (iskDup.includes(urovIs) && 2 == kol)) {
            let energy = main
              .getElementById("Venergytext")
              .textContent.split("/")
              .map(Number)
              .reduce((a, b) => b - a);
            let proc =
              main
                .getElementById("Venergytext")
                .textContent.split("/")
                .map(Number)[1] * 0.1;
            if (energy - proc <= 50 && abi_50 < 80) {
              abi_50++;
              main.getElementById("img16").click();
            } else if (energy - proc <= 100 && abi_100 < 130) {
              abi_100++;
              main.getElementById("img17").click();
            } else if (abi_200 <= 80) {
              abi_200++;
              main.getElementById("img18").click();
            } else if (abilkaGos > 0) {
              abilkaGos--;
              main.getElementById("scroll_365").click();
            } else if (abilkaEkr > 0) {
              abilkaEkr--;
              main.getElementById("scroll_586").click();
            }
            setTimeout(() => {
              main.getElementById("start_but").click();
              zapiska[urovIsk]++;
              if (urovIsk === iskinLimit) {
                limit--;
                if (limit <= 0) {
                  isklyuchit.push(Number(urovIsk));
                }
              }
            }, 400);
          }
          if (stoperInd) {
            setTimeout(dannye, 800 + timeRnd);
          }
        }
      }
    };
    let provPlags = () => {
      setTimeout(() => {
        provPL = true;
        provEnki(provPL);
      }, 200);
    };
    let urovIsk = "";
    if (main.getElementById("iskin_level")) {
      urovIsk = main.getElementById("iskin_level").textContent;
    }
    main = document.getElementsByName("mainWindow")[0].contentDocument;
    let scripts = main.getElementsByTagName("script").length;
    if (scripts < 9) {
      var script = document.createElement("script");
      script.setAttribute("type", "text/javascript");
      script.innerHTML =
        use_ability +
        "; " +
        use_complect +
        "; " +
        put_virus +
        "; " +
        put_complect +
        ";" +
        use_scroll +
        "; ";
      main.getElementsByTagName("body")[0].appendChild(script);
    }
    let complects = main.getElementById("new_complects");
    if(Object.keys(complect).includes(urovIsk)){
        complects.querySelector("li:nth-child("+complect[urovIsk]+")").click();
        setTimeout(provPlags, 2500 + timeRnd);
    } else {
        setTimeout(() => {
          provEnki(true);
        }, 2000 + timeRnd);
    }
    
  };

  let kontZamena = () => {
    let mainOkno = document.getElementsByName("mainWindow")[0].contentDocument;
    if (mainOkno.getElementById("iskinButtonII")) {
      mainOkno.getElementById("iskinButtonII").click();
      let scripts = mainOkno.getElementsByTagName("script").length;
      if (scripts < 10) {
        var script = document.createElement("script");
        script.setAttribute("type", "text/javascript");
        script.innerHTML =
          use_ability +
          "; " +
          use_complect +
          "; " +
          put_virus +
          "; " +
          put_complect +
          ";" +
          use_scroll +
          "; ";
        mainOkno.getElementsByTagName("body")[0].appendChild(script);
      }

      setTimeout(() => {
        mainOkno.getElementById("iskinButtonLvls").click();
        let kol = Number(mainOkno.getElementById("total_req").textContent);
        let urovIs = Number(mainOkno.getElementById("iskin_level").textContent);

        if (
          3 === kol ||
          (iskDup.includes(urovIs) && 2 <= kol)
        ) {
          proverka();
        } else {
          dannye();
        }
      }, 1000);
    } else {
      dannye();
    }
  };
  setTimeout(kontZamena, 4000);
}
// onclick="let kol=0;setInterval(()=>{if(100>kol){document.getElementById('but1').click(); kol++}else{clearInterval()}},1000)" сборки имплов или кристаллов в конверторе
//&& iskDup[1]!==urovIs && iskDup[2]!==urovIs && iskDup[0]!==urovIs
