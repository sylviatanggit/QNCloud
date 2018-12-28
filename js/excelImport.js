


	var X = XLSX;
	var XW = {
		/* worker message */
		msg: 'xlsx',
		/* worker scripts */
		rABS: '/QNCloud/js/excelImportJS/xlsxworker2.js',
		norABS: '/QNCloud/js/excelImportJS/xlsxworker1.js',
		noxfer: '/QNCloud/js/excelImportJS/xlsxworker.js'
	};

	var rABS = typeof FileReader !== "undefined" && typeof FileReader.prototype !== "undefined" && typeof FileReader.prototype.readAsBinaryString !== "undefined";

	var use_worker = typeof Worker !== 'undefined';

	var transferable = use_worker;

	var wtf_mode = false;

	function fixdata(data) {
		var o = "",
			l = 0,
			w = 10240;
		for(; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
		o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
		return o;
	}

	function ab2str(data) {
		var o = "",
			l = 0,
			w = 10240;
		for(; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint16Array(data.slice(l * w, l * w + w)));
		o += String.fromCharCode.apply(null, new Uint16Array(data.slice(l * w)));
		return o;
	}

	function s2ab(s) {
		var b = new ArrayBuffer(s.length * 2),
			v = new Uint16Array(b);
		for(var i = 0; i != s.length; ++i) v[i] = s.charCodeAt(i);
		return [v, b];
	}

	function xw_noxfer(data, cb) {
		var worker = new Worker(XW.noxfer);
		worker.onmessage = function(e) {
			switch(e.data.t) {
				case 'ready':
					break;
				case 'e':
					console.error(e.data.d);
					break;
				case XW.msg:
					cb(JSON.parse(e.data.d));
					break;
			}
		};
		var arr = rABS ? data : btoa(fixdata(data));
		worker.postMessage({
			d: arr,
			b: rABS
		});
	}

	function xw_xfer(data, cb) {
		var worker = new Worker(rABS ? XW.rABS : XW.norABS);
		worker.onmessage = function(e) {
			switch(e.data.t) {
				case 'ready':
					break;
				case 'e':
					console.error(e.data.d);
					break;
				default:
					xx = ab2str(e.data).replace(/\n/g, "\\n").replace(/\r/g, "\\r");
					cb(JSON.parse(xx));
					break;
			}
		};
		if(rABS) {
			var val = s2ab(data);
			worker.postMessage(val[1], [val[1]]);
		} else {
			worker.postMessage(data, [data]);
		}
	}

	function xw(data, cb) {
		xw_xfer(data, cb);
	}

	function to_json(workbook) {
		var result = {};
		workbook.SheetNames.forEach(function(sheetName) {
			var roa = X.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);

			if(roa.length > 0) {
				result[sheetName] = roa;

			}
		});

		return result;
	}
	var output;

	function process_wb(wb) {

		output = to_json(wb);
		//去掉表格名称
		for(var item in output) {
			var jValue = output[item];
			output = JSON.stringify(jValue);
		}
		excel_ajax(output);
	}



	function handleDragover(e) {
		e.stopPropagation();
		e.preventDefault();
		e.dataTransfer.dropEffect = 'copy';
	}

	function handleFile(e) {
		var files = e.target.files;
		var f = files[0]; {
			var reader = new FileReader();
			if(f==undefined){
				return;
			}
			var name = f.name;
			reader.onload = function(e) {
				if(typeof console !== 'undefined') 
				console.log("onload", new Date(), rABS, use_worker);
				var data = e.target.result;
				if(use_worker) {
					xw(data, process_wb);
				} else {
					var wb;

					wb = X.read(data, {
						type: 'binary'
					});

					process_wb(wb);
				}
			};
			if(rABS) reader.readAsBinaryString(f);
			else reader.readAsArrayBuffer(f);
		}
	}
	
	


	
