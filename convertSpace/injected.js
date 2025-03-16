function injected_main(){
	let mainOko = document.getElementsByName('mainWindow')[0].contentDocument;
	let oknoOtscheta = mainOko.getElementById('infoWindow');
	let triggerS = 600;
	let timeRn = Math.floor(Math.random()*200);
	let kolDoObnov = 0;

	let ustanovka=()=>{
		timeRn = Math.floor(Math.random()*1000);
		let mainOko = document.getElementsByName('mainWindow')[0].contentDocument;
		let elementsSbor = mainOko.querySelectorAll('#items_div img');
		let dropElements = mainOko.querySelectorAll('#trash_div tr td');
		let oknoOtscheta = mainOko.getElementById('infoWindow');
		// СБОРКИ
		let krupDetal = elementsSbor[0];
		let stroyMod = elementsSbor[1];
		let znakDarkGet = elementsSbor[2];
		let znakSvetGet = elementsSbor[3];
		// ЗАПЧАСТИ СБОРОК
		const melDet = Number(dropElements[7].textContent),
		 znakDark = Number(dropElements[1].textContent),
		 znakSvet = Number(dropElements[3].textContent),
		 biocard = Number(dropElements[5].textContent),
		 krupDet = Number(dropElements[9].textContent),
		 oblomAstron = Number(dropElements[13].textContent),
		 oblomok = Number(dropElements[15].textContent);

		if (oknoOtscheta.style.visibility === 'visible') {
			let timeSborki = oknoOtscheta.querySelector('#infoWindowMessage');
			if(timeSborki.textContent[0] === 'В'){
				setTimeout(()=>{
					let inBut = oknoOtscheta.querySelector('#infoButton .infoBtn')
					inBut.click()
					setTimeout(()=>{
						clearTimeout();
						ustanovka();
					},timeRn+2000)
				},timeRn+1000)
			}
		} else {
			if (znakDark>0&&znakSvet>0&&biocard>4&&krupDet>0){
				stroyMod.click()
				setTimeout(()=>{
					mainOko = document.getElementsByName('mainWindow')[0].contentDocument;
					let usingBtn = mainOko.querySelector('#but1');
					usingBtn.click();

					setTimeout(()=>{
						triggerS = 595;
						clearTimeout();
						otsled()
					},timeRn+2000);

				},timeRn+4000)
			} else if(oblomAstron > 9 && oblomok > 9){
				znakDarkGet.click()
				setTimeout(()=>{
					mainOko = document.getElementsByName('mainWindow')[0].contentDocument;
					let usingBtn = mainOko.querySelector('#but1');
					usingBtn.click();
					setTimeout(()=>{
						triggerS = 295
						clearTimeout();
						otsled()
					},timeRn+2000);

				},timeRn+4000)
			} else  if (399<melDet) {
				krupDetal.click()
				setTimeout(()=>{
					mainOko = document.getElementsByName('mainWindow')[0].contentDocument;
					let usingBtn = mainOko.querySelector('#but1');
					usingBtn.click();
					setTimeout(()=>{
						setTimeout(()=>{
							triggerS = 595;
							clearTimeout();
							otsled()
						},timeRn+2000);
					},timeRn+2000);

				},timeRn+4000)
			} else {
				//top.location.href="/exit.php?1"
			}
		}
	}

	let otsled=()=>{
		mainOko = document.getElementsByName('mainWindow')[0].contentDocument;
		oknoOtscheta = mainOko.getElementById('infoWindow');
		if (kolDoObnov >= triggerS){
			let panelMenu = document.getElementsByName('menuWindow')[0].contentDocument;
			panelMenu.querySelector('.right img:last-child').click();
			kolDoObnov = 0;
			let time = new Date().getMinutes()
			console.log(time)
		} else {
			let time = new Date().getMinutes()
			console.log(time)
			kolDoObnov++
		}
		if(mainOko.getElementById('newTableDescription')){
			if (oknoOtscheta.style.visibility === 'visible') {
				let timeSborki = oknoOtscheta.querySelector('#infoWindowMessage');

				if(timeSborki.textContent[0] === 'В'){
					setTimeout(()=>{
						let inBut = oknoOtscheta.querySelector('#infoButton .infoBtn')
						inBut.click()
						setTimeout(()=>{
							clearTimeout()
							ustanovka();
						},timeRn+2000)
					},timeRn+1000)
				} else if (timeSborki.textContent[0] === 'И') {
					clearTimeout();
					setTimeout(otsled,timeRn + 2000)
				}
			} else {
				clearTimeout();
				setTimeout(ustanovka,timeRn + 2000);
			}
		} else {
			clearTimeout();
			setTimeout(otsled,timeRn + 2000)
		}
	}
	setTimeout(otsled,10000)
}
