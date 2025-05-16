// const { linear } = require("svelte/easing");

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

function injected_main() {
  let dubleSector,
    dubleSectorPoint = 0,
    triggerB = 0,
    turn = 0,
    vip = true;
  let quest = 1; // 0 - волна, 1 - ледяное кольцо, 2 = Древние порталы, 3 = Орфей;
  let hod = (dateInterval) => {
    clearInterval(dateInterval);
    let mainOkno = document.getElementsByName("mainWindow")[0].contentDocument;
    let panelMenu = document.getElementsByName("menuWindow")[0].contentDocument;
    let sector = mainOkno.querySelector("#sector").textContent;
    let dalshe = mainOkno.getElementById("fwd");
    let razvorot = mainOkno.getElementById("back");
    let pravo = mainOkno.getElementById("right");
    let levo = mainOkno.getElementById("left");
    let navigBtn = panelMenu.querySelector(".right img:last-of-type");

    if (dubleSector !== sector) {
      dubleSector = sector;
      dubleSectorPoint = 0;
    } else if (dubleSector === sector) {
      dubleSectorPoint++;
    }
    
    if (dubleSectorPoint < 3) {
      if (quest === 0) {
        switch (sector) {
          case "41417S":
          case "41420E":
          case "41423S":
          case "41426E":
          case "27423N":
          case "27420W":
          case "27417N":
          case "27414W":
            levo.click();
            break;
          case "27414N":
          case "27417E":
          case "27420N":
          case "27423E":
          case "41426S":
          case "41423W":
          case "41420S":
          case "41417W":
            pravo.click();
            break;
          case "27426N":
          case "41414S":
            razvorot.click();
            break;
          default:
            dalshe.click();
            break;
        }
      } else if (quest === 2) {
        switch (sector) {
          case "31298N":
          case "36303E":
          case "41298S":
          case "36293W":
            razvorot.click();
            break;
          case "36298E":
            if (turn === 1) {
              pravo.click();
              turn = 0;
            } else {
              turn = 1;
              dalshe.click();
            }
            break;
          case "36298S":
            if (turn === 1) {
              levo.click();
              turn = 0;
            } else {
              turn = 1;
              dalshe.click();
            }
            break;
          default:
            dalshe.click();
            break;
        }
      } else if (quest === 1) {
        let imgObekt = [
          mainOkno.getElementById("img_left"),
          mainOkno.getElementById("img_right"),
          mainOkno.getElementById("img_front"),
        ];
        if (
          imgObekt[2].src === "http://img.starcombats.com/map/cor/front_on.gif"
        ) {
          dalshe.click();
        } else if (
          imgObekt[0].src === "http://img.starcombats.com/map/cor/left_on.gif"
        ) {
          levo.click();
        } else if (
          imgObekt[1].src === "http://img.starcombats.com/map/cor/right_on.gif"
        ) {
          pravo.click();
        }
      } else if (quest === 3) {
        switch (sector) {
          case "28350N":
          case "28353E":
          case "28356N":
          case "28359E":
          case "28362N":
          case "28365E":
          case "28368N":
          case "28371E":
          case "28374N":
          case "28377E":
            pravo.click();
            break;
          case "26379N":
          case "26347W":
          case "49347S":
          case "49350E":
          case "49353S":
          case "49356E":
          case "49359S":
          case "49362E":
          case "49365S":
          case "49368E":
          case "49371S":
          case "49374E":
          case "49377S":
          case "49379E":
            levo.click();
            break;
          case "25379N":
            razvorot.click();
            break;
          default:
            dalshe.click();
            break;
        }
      }
    } else {
      dubleSectorPoint = 0;
      navigBtn.click();
    }
    setTimeout(obnovit, 100);
  };

  let boy = (dateInterval) => {
    clearInterval(dateInterval);
    triggerB = 0;
    let mainOkno = document.getElementsByName("mainWindow")[0].contentDocument,
      panelMenu = document.getElementsByName("menuWindow")[0].contentDocument,
      messageOkno = mainOkno.getElementById("infoWindow"),
      chat_top_win =
        document.getElementsByName("chatmenuWindow")[0].contentDocument,
      chatBtnday = chat_top_win.getElementById("tabNameChat"),
      obnovRn = Math.floor(Math.random() * 500) + 1000;
      let scripts = mainOkno.getElementsByTagName("script").length;
      if (scripts < 8) {
        var script = document.createElement("script");
        script.setAttribute("type", "text/javascript");
        script.innerHTML =
          use_thing + "; " + use_scroll + "; " + use_ability + ";";
        mainOkno.getElementsByTagName("head")[0].appendChild(script);
      }
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
          setTimeout(obnovit, obnovRn);
          break;
        case "Вы":
          panelMenu.querySelector(".right img:last-child").click();
          setTimeout(() => {
            chatBtnday.click();
          }, obnovRn);
          setTimeout(obnovit, obnovRn);
          break;
        case "Ис":
          let autoboy = mainOkno.querySelector(
            "#new_centerBlock_footer tr:nth-child(2) td:nth-child(2) img"
          );
          autoboy.click();
          setTimeout(obnovit, obnovRn);
          break;
        case "Ож":
          panelMenu.querySelector(".right img:last-child").click();
          setTimeout(obnovit, obnovRn);
          break;
        case "Пе":
          mainOkno.querySelector(".infobtn").click();
          panelMenu.querySelector(".right img:last-child").click();
          setTimeout(obnovit, obnovRn);
          break;
        default:
          panelMenu.querySelector(".right img:last-child").click();
          setTimeout(() => {
            chatBtnday.click();
          }, obnovRn);
          setTimeout(obnovit, obnovRn);
          break;
      }
    } else {
      let mainOkno =
        document.getElementsByName("mainWindow")[0].contentDocument;
      let autoboy = mainOkno.querySelector(
        "#new_centerBlock_footer tr:nth-child(2) td:nth-child(2) img"
      );
      let activPer = mainOkno.getElementById("reboot");
      if(quest === 3 && activPer.style.display !== "block"){
        setTimeout(() => {
          let perezagruz;
          if (vip){
            perezagruz = mainOkno.querySelector("#ability3 a")
          } else{
            perezagruz = mainOkno.querySelector("#reactor")
            }
          if (perezagruz) {
            perezagruz.click();
          }
          setTimeout(() => {
            if (messageOkno.style.visibility !== "visible") {
              mainOkno
                .querySelector("#new_centerBlock_footer img:first-child")
                .click();
            }
          }, 500);
          obnovit();
        }, obnovRn);
      } else {
        autoboy.click();
        setTimeout(boy, obnovRn);
      }
    }
  };

  let obnovit = () => {
    let timeRand = Math.floor(Math.random() * 1000) + 3000;
    let dateInterval = setInterval(() => {
      let mainOkno =
          document.getElementsByName("mainWindow")[0].contentDocument,
        panelMenu = document.getElementsByName("menuWindow")[0].contentDocument,
        navigBtn = panelMenu.querySelector(".right img:last-of-type"),
        sector = mainOkno.querySelector("#sector");
      if (sector != null) {
        let oblomki = [
          mainOkno.querySelector("#obj_left"),
          mainOkno.querySelector("#obj_right"),
          mainOkno.querySelector("#obj_front"),
        ];
        let oblomok;
        for (var i = 0; i < oblomki.length; i++) {
          var nonOblom = oblomki[i];
          if (nonOblom.style.display === "block") {
            if (
              nonOblom.querySelector("img").src !==
                "http://img.starcombats.com/map/obj/null_portal.gif" &&
              i < 2 &&
               nonOblom.querySelector("img").src !== 'http://img.starcombats.com/map/obj/taksyak_3.gif'
            ) {
              oblomok = nonOblom.firstChild;
              break;
            } else if (i > 1) {
              oblomok = nonOblom.firstChild;
              break;
            }
          }
        }

        let ataka = (oblomok) => {
          oblomok.click();
          setTimeout(() => {
            mainOkno =
              document.getElementsByName("mainWindow")[0].contentDocument;

            if (triggerB <= 1) {
              mainOkno.getElementById("item1").click();
            }
            setTimeout(() => {
              //navigBtn.click();
              triggerB++;
            }, 1000);
          }, 1500);
        };
        if (!oblomok) {
          hod(dateInterval);
        } else {
          ataka(oblomok);
        }
      } else if (mainOkno.getElementById("achange")) {
        boy(dateInterval);
      } else {
        let navigBtn = panelMenu.querySelector(".right img:last-of-type");
        navigBtn.click();
      }
    }, timeRand);
  };
  setTimeout(obnovit, 5000);
}
