function injected_main(){
	let mainOko = document.getElementsByName('mainWindow')[0].contentDocument;
	let oknoOtscheta = mainOko.getElementById('infoWindow');
	let triggerS = 600;
	
	let kolDoObnov = 0;

	let ustanovka=()=>{
		const timeRnd = Math.floor(Math.random()*1000),
		 mainOko = document.getElementsByName('mainWindow')[0].contentDocument,
		 elementsSbor = mainOko.querySelectorAll('#items_div img'),
		 dropElements = mainOko.querySelectorAll('#trash_div tr td'),
		 oknoOtscheta = mainOko.getElementById('infoWindow');
		// СБОРКИ
		const [krupDetal,stroyMod,znakDarkGet,znakSvetGet] = elementsSbor;
		
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
					},timeRnd+2000)
				},timeRnd+1000)
			}
		} else {
			if (znakDark>0&&znakSvet>0&&biocard>4&&krupDet>0){
				stroyMod.click()
				setTimeout(()=>{
					const mainOko = document.getElementsByName('mainWindow')[0].contentDocument;
					let usingBtn = mainOko.querySelector('#but1');
					usingBtn.click();

					setTimeout(()=>{
						triggerS = 595;
						clearTimeout();
						otsled()
					},timeRnd+2000);
				},timeRnd+4000)
			} else if(oblomAstron > 9 && oblomok > 9){
				znakDarkGet.click()
				setTimeout(()=>{
					let mainOko = document.getElementsByName('mainWindow')[0].contentDocument;
					let usingBtn = mainOko.querySelector('#but1');
					usingBtn.click();
					setTimeout(()=>{
						triggerS = 295
						clearTimeout();
						otsled()
					},timeRnd+2000);
				},timeRnd+4000)
			} else  if (399<melDet) {
				krupDetal.click()
				setTimeout(()=>{
					let mainOko = document.getElementsByName('mainWindow')[0].contentDocument;
					let usingBtn = mainOko.querySelector('#but1');
					usingBtn.click();
					setTimeout(()=>{
						setTimeout(()=>{
							triggerS = 595;
							clearTimeout();
							otsled()
						},timeRnd+2000);
					},timeRnd+2000);
				},timeRnd+4000)
			} else {
				//top.location.href="/exit.php?1"
			}
		}
	}

	let otsled=()=>{
		mainOko = document.getElementsByName('mainWindow')[0].contentDocument;
		oknoOtscheta = mainOko.getElementById('infoWindow');
		let timeRn = Math.floor(Math.random()*200);
		if (kolDoObnov >= triggerS){
			let panelMenu = document.getElementsByName('menuWindow')[0].contentDocument;
			panelMenu.querySelector('.right img:last-child').click();
			kolDoObnov = 0;
		} else {
			kolDoObnov++
		}
		if(mainOko.getElementById('newTableDescription')){
			if (oknoOtscheta.style.visibility === 'visible') {
				let timeSborki = oknoOtscheta.querySelector('#infoWindowMessage');
				if(timeSborki.textContent[0] === 'В'){
					console.log('готово')
					setTimeout(()=>{
						let inBut = oknoOtscheta.querySelector('#infoButton .infoBtn')
						inBut.click()
						setTimeout(()=>{
							clearTimeout()
							ustanovka();
						},timeRn+2000)
					},timeRn+1000)
				} else if (timeSborki.textContent.split(' ')[0] === 'Идет') {
					setTimeout(otsled,timeRn + 2000)
				}
			} else {
				setTimeout(ustanovka,timeRn + 2000);
			}
		} else {
			setTimeout(otsled,timeRn + 2000)
		}
	}
	setTimeout(otsled,10000)
}
