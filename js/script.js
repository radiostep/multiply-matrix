
function matrixABChecker() {
	var matrixName;
	var inpA = document.getElementById('matrixARadioBtn'),
		inpB = document.getElementById('matrixBRadioBtn');

	if (inpA.checked){
		matrixName = 'a';
	} else if (inpB.checked){
		matrixName = 'b';
	}
	return matrixName;
}

function addInputs(table) {
	matrixName = matrixABChecker();
	var lengthR = table.rows.length;
	for (var i = 0; i < lengthR; i++) {
			for ( var j = 0; j < table.rows[i].cells.length; j++ ) {
				if (table.id != 'matrix-calculate') {
					table.rows[i].getElementsByTagName('td')[j].firstChild.setAttribute('placeholder', matrixName + (i+1) + '.' + (j+1));
					table.rows[i].getElementsByTagName('td')[j].firstChild.setAttribute('id', matrixName + (i+1) + '.' + (j+1));
					}
					else {
						table.rows[i].getElementsByTagName('td')[j].innerHTML = 'c' + (i+1) + '.' + (j+1);
						table.rows[i].getElementsByTagName('td')[j].setAttribute('id', 'c' + (i+1) + '.' + (j+1));
					}
			}
	}
}

function addRow(place) { //Добавление строки в таблицу
	var row = document.createElement('tr');
	place.appendChild(row);
	var tdArr = place.getElementsByTagName('td');
	for (var l = 0, i = place.rows[0].cells.length; i > l; i--){
		row.insertCell(0);
		if (place.parentNode.id != 'matrix-calculate') {
			row.childNodes[0].innerHTML = '<input type=\'number\' >';
		}
	}
	addInputs(place.parentNode);	
}

function removeRow(place) {
	var table = place.parentNode;
	var lenghtRows = place.parentNode.rows.length;
	var rowToKill = table.rows[lenghtRows-1];
	rowToKill.parentNode.removeChild( rowToKill );
}

function removeCells(table) { //Удаление столбца из таблицы
	var rows = table.getElementsByTagName('tr'),
      rowsB = rows.length;
	for (var i=0; i<rowsB; i++)  //проходим строки таблицы
		{
			var row = rows[i]; //берём очередную строку
			row.deleteCell(-1); //удаляем последнюю ячейку
	}
}

function add2(table) { //Добавление столбца в таблицу
    var trArr = table.getElementsByTagName('table')[0];
    for (var i = 0; i < trArr.rows.length;  i++){
        trArr.rows[i].insertCell(-1);
		if (trArr.id != 'matrix-c') {
			trArr.rows[i].getElementsByTagName('td')[trArr.rows[i].cells.length-1].innerHTML = '<input type=\'number\'>';/**/
			}
		}
		addInputs(table.getElementsByTagName('table')[0]);
}

function matrixSelector() { //Проверка выбора редактируемой матрицы
	var matrixCheckedId,
		tableId;
	var inpA = document.getElementById('matrixARadioBtn'),
		inpB = document.getElementById('matrixBRadioBtn');
	if (inpA.checked){
		matrixCheckedId = 'matrix-a';
		tableId = 'matrix-a-input';
		return matrixCheckedId;
	} else if (inpB.checked){
		matrixCheckedId = 'matrix-b';
		tableId = 'matrix-b-input';
		return matrixCheckedId;
	}
	return 0;
}

function addTable() { //Добавление новой таблицы, если не существует
	matrixABChecker();
	var matrixTable = document.createElement('table'),
		matrixCel = document.getElementById(matrixSelector());
	matrixCel.appendChild(matrixTable);
	matrixTable.id = 'matrix-' + matrixABChecker() + '-input';
	matrixTable.setAttribute('class','matrix');
}

function clickPlusMinus(plusOrMinus, rowOrCell) { //Обработка нажатий на кнопки "Добавить" и "Удалить"
	if ( matrixSelector()!=0 ){
		if ((document.getElementById(matrixSelector())) == undefined){addTable();}
		var matrixId = 'matrix-' + matrixABChecker() + '-input';
		if (rowOrCell == 'row') {
			if (plusOrMinus=='plus'){
				addRow(document.getElementById(matrixId).getElementsByTagName("TBODY")[0]);
				if ( matrixABChecker() == 'a' ) {
					addRow(document.getElementById('matrix-calculate').getElementsByTagName("TBODY")[0]);
				} /*else if ( matrixABChecker() == 'b' ) {
					add2(document.getElementById('matrix-a-input').parentNode);
				}*/
			}else if (plusOrMinus=='minus'){
				if (document.getElementById(matrixSelector()).getElementsByTagName("table")[0].rows.length > 1) {
						removeRow(document.getElementById(matrixId).getElementsByTagName("TBODY")[0]);
						if ( matrixABChecker() == 'a' ) {
						removeRow(document.getElementById('matrix-calculate').getElementsByTagName("TBODY")[0]);
						} /*else if (matrixABChecker() == 'b') {
							removeCells(document.getElementById('matrix-a-input'));
						}*/
					}
				}	
		} else if (rowOrCell == 'cell') {
		if (plusOrMinus=='plus'){
			add2(document.getElementById(matrixSelector()));
			if ( matrixABChecker() == 'b' ) {
				add2(document.getElementById('matrix-calculate').parentNode);
			} /*else if ( matrixABChecker() == 'a' ) {
				addRow(document.getElementById('matrix-b-input').getElementsByTagName("TBODY")[0]);
			}*/
		}else if (plusOrMinus=='minus'){
			if (document.getElementById(matrixSelector()).getElementsByTagName("table")[0].rows[0].cells.length > 1) {
					removeCells(document.getElementById(matrixSelector()));
					if ( matrixABChecker() == 'b' ) {
						removeCells(document.getElementById('matrix-calculate'));
					} /*else if ( matrixABChecker() == 'a' ) {	removeRow(document.getElementById('matrix-b-input').getElementsByTagName("TBODY")[0]);
					}*/
				}
			}
		}
		//добавить проверку строк и столбцов матриц
		
		if (matrixChecker()) {
			document.getElementById('alert').innerHTML = '<div class=\'alert\'><p>Такие матрицы нельзя перемножить, так как количество столбцов матрицы A не равно количеству строк матрицы B.</p></div>';
			document.getElementById('aside').classList.add('red-bg');
			document.getElementById('wrapper').classList.add('red-bg-aside');
		} else {
			document.getElementById('aside').classList.remove('red-bg');
			document.getElementById('wrapper').classList.remove('red-bg-aside');
			document.getElementById('alert').innerHTML = '';
		}
	}
}

function matrixChecker() {
	var cellsALength = document.getElementById('matrix-a-input').rows[0].cells.length;
	var rowsBLength = document.getElementById('matrix-b-input').rows.length;
	if (cellsALength == rowsBLength) {
		return false;
	} else {
		return true;
	}
}

	
function resultOutput() { //Вывод результата вычисления в таблицу
	if (MultiplyMatrix() != false) {
		var C = MultiplyMatrix();
		var tableC = document.getElementById('matrix-calculate');
		var lengthR = tableC.rows.length;
		
		for (var i = 0; i < lengthR; i++) {
			for ( var j = 0; j < tableC.rows[i].cells.length; j++ ) {
				tableC.rows[i].getElementsByTagName('td')[j].innerHTML = C[i][j];
				tableC.rows[i].getElementsByTagName('td')[j].setAttribute('class','black-text');
			}
		}
	}
}
	
function MultiplyMatrix() { //Умножение матриц
	var matrixTableA = document.getElementById('matrix-a-input');
	var matrixTableB = document.getElementById('matrix-b-input');
	var A = new Array(); 
	var B = new Array();
	var Result = new Array();
	A = OnStart(matrixTableA);
	B = OnStart(matrixTableB);
	
	var rowsA = A.length, colsA = A[0].length,
        rowsB = B.length, colsB = B[0].length,
        C = [];
    if (colsA != rowsB) return false;
    for (var i = 0; i < rowsA; i++) C[i] = [];
    for (var k = 0; k < colsB; k++) {
		for (var i = 0; i < rowsA; i++) {
			var t = 0;
			for (var j = 0; j < rowsB; j++) {
				if ((A[i][j] != '') && (B[j][k] != '')) {
					t += A[i][j]*B[j][k];
				} else {
					return false;
				}
			}
			C[i][k] = t;
        }
	}
	return C;
}
	
function OnStart(table) { //Сбор данных из таблицы в массив
	var TableList = new Array();	
	var tr = table.rows;
	for(var i=0;i<tr.length;i++) {
		var td = tr[i].cells;
		TableList[i] = new Array()
		for(var j=0;j<td.length;j++) {
			TableList[i][j] = td.item(j).firstChild.value;
		}
	}
	return TableList;                   
}

  document.getElementById('matrix-a-input').addEventListener("focus", function() {
	  if (!matrixChecker()) {
		document.getElementById('aside').classList.add('blue-bg');
		document.getElementById('wrapper').classList.add('blue-bg-aside');
	  }
  }, true);

  document.getElementById('matrix-a-input').addEventListener("blur", function() {
    document.getElementById('aside').classList.remove('blue-bg');
	document.getElementById('wrapper').classList.remove('blue-bg-aside');
  }, true);

  document.getElementById('matrix-b-input').addEventListener("focus", function() {
	  if (!matrixChecker()) {
		document.getElementById('aside').classList.add('blue-bg');
		document.getElementById('wrapper').classList.add('blue-bg-aside');
	  }
  }, true);

  document.getElementById('matrix-b-input').addEventListener("blur", function() {
    document.getElementById('aside').classList.remove('blue-bg');
	document.getElementById('wrapper').classList.remove('blue-bg-aside');
  }, true);
  
function clearAll() { //Очистка данных из всех таблиц
	var aTd = document.getElementById('matrix-a-input').getElementsByTagName('td'),
		bTd = document.getElementById('matrix-b-input').getElementsByTagName('td');
		clearAB(aTd);
		clearAB(bTd);
	function clearAB(tds) {
		for (var i = 0; i < tds.length; i++) {
			tds.item(i).firstChild.value = '';
			}
	}
	clearC();
}

function clearC() { //Очистка матрицы "C"
	var table = document.getElementById('matrix-calculate');
	var lengthR = table.rows.length;
	for (var i = 0; i < lengthR; i++) {
		for ( var j = 0; j < table.rows[i].cells.length; j++ ) {
			table.rows[i].getElementsByTagName('td')[j].innerHTML = 'c' + (i+1) + '.' + (j+1);
			table.rows[i].getElementsByTagName('td')[j].classList.remove('black-text');
		}
	}
}

  function documentHeight(){ // Высота всего документа
    return Math.max(
        document.documentElement["clientHeight"],
        document.body["scrollHeight"], document.documentElement["scrollHeight"],
        document.body["offsetHeight"], document.documentElement["offsetHeight"]
    );
}

document.getElementById('aside').style.height = documentHeight() + "px";
document.body.onresize = function(){document.getElementById('aside').style.height = documentHeight() + "px";};

function replaceAB() { //Замена матриц местами
	var tableA = document.getElementById('matrix-a-input'),
		tableB = document.getElementById('matrix-b-input'),
		tableC = document.getElementById('matrix-calculate');
	var tdA = document.getElementById('matrix-a'),
		tdB = document.getElementById('matrix-b');

	tableA.setAttribute('id','matrix-b-input');
	tableB.setAttribute('id','matrix-a-input');

	tdB.appendChild(tableA);
	tdA.appendChild(tableB);

	var rowsCLen = tableC.rows.length,
		rowsALen = document.getElementById('matrix-a-input').rows.length;

	if (rowsCLen < rowsALen) {
		for (var i = 0; i < (rowsALen - rowsCLen); i++) {
			addRow(tableC.getElementsByTagName("TBODY")[0]);
		}
	} else if (rowsCLen > rowsALen) {
		for (var i = 0; i < (rowsCLen - rowsALen); i++) {
			removeRow(tableC.getElementsByTagName("TBODY")[0]);
		}
	}

	var cellsCLen = document.getElementById('matrix-calculate').rows[0].cells.length,
		cellsBLen = document.getElementById('matrix-b-input').rows[0].cells.length;
		console.log(cellsCLen +' и '+cellsBLen);
	if (cellsCLen < cellsBLen) {
		for (var i = 0; i < (cellsBLen - cellsCLen); i++) {
			add2(tableC.parentNode);
		}
	} else if (cellsCLen > cellsBLen) {
		for (var i = 0; i < (cellsCLen - cellsBLen); i++) {
			removeCells(tableC);
		}
	}

	clearC();
	
	if (matrixChecker()) { //Проверка возможности умножения
		document.getElementById('alert').innerHTML = '<div class=\'alert\'><p>Такие матрицы нельзя перемножить, так как количество столбцов матрицы A не равно количеству строк матрицы B.</p></div>';
		document.getElementById('aside').classList.add('red-bg');
		document.getElementById('wrapper').classList.add('red-bg-aside');
	} else {
		document.getElementById('aside').classList.remove('red-bg');
		document.getElementById('wrapper').classList.remove('red-bg-aside');
		document.getElementById('alert').innerHTML = '';
	}
}
