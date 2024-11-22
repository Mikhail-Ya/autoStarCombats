function injected_main() {
  let dubleSector,
    dubleSectorPoint = 0,
    triggerB = 0;
  let quest = 0; // 0 - волна, 1 - ледяное кольцо
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

    if (dubleSectorPoint < 2) {
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
      } else {
      }
    } else {
      dubleSectorPoint = 0;
      navigBtn.click();
    }
    setTimeout(obnovit, 1000);
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
      autoboy.click();
      setTimeout(obnovit, obnovRn);
    }
  };

  let obnovit = () => {
    let timeRand = Math.floor(Math.random() * 1000) + 4000;
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
              i < 2
            ){
              oblomok = nonOblom.firstChild;
              break;
            } else if (i>1) {
            oblomok = nonOblom.firstChild;
              break;}
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
              navigBtn.click();
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
