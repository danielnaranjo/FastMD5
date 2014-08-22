(function() {
	var d = document;

	var win = d.getElementById("win"),
		loading = d.getElementById("loading"),
		content = d.getElementById("content"),
		content_tests = d.getElementById("content-tests"),
		content_tests_table = d.getElementById("content-tests-table"),
		info_tests = d.getElementById("info-tests"),
		run_tests = d.getElementById("run-tests"),
		testsRunning = false,
		completeTests = 0;

	// loading

	var loadingInterval = setInterval(function() {
		if(typeof md5 === "function") {
			clearInterval(loadingInterval);
			content.className = "visible";
			win.removeChild(loading);
		}
	}, 10);

	// tests

	var tests = [
		{
			name: "MD5 hash strings: length 0 to 1000",
			func: function() {
				var string = "";

				for(var i = 0;i < 1000;i++) {
					if(md5(string) !== md5jkm(string)) return false;

					string += "a";
				}

				return true;
			}
		}
	];

	function initTests() {
		for(var i = 0, j = tests.length;i < j;i++) {
			var tr = d.createElement("tr"),
				name = d.createElement("td"),
				state = d.createElement("td");

			tr.id = "test-" + i;
			name.id = "test-name-" + i;
			state.id = "test-state-" + i;

			name.innerHTML = tests[i].name;
			state.innerHTML = "?";

			tr.appendChild(name);
			tr.appendChild(state);
			content_tests_table.appendChild(tr);
		}

		run_tests.onclick = runTests;
	}

	function runTests() {
		if(testsRunning) return;
		testsRunning = true;

		clearTests();

		run_tests.className = "button-1 active";
		run_tests.innerHTML = "Running...";

		for(var i = 0, j = tests.length;i < j;i++)
			runTest(i);
	}

	function runTest(i) {
		setTimeout(function() {
			var tr = document.getElementById("test-" + i),
				state = document.getElementById("test-state-" + i),
				correct = tests[i].func();

			if(!correct) {
				tr.className = "error";
				state.innerHTML = "ERROR";
				run_tests.innerHTML = "ERROR";
				return;
			}else{
				tr.className = "ok";
				state.innerHTML = "OK";
				completeTests++;

				if(completeTests == tests.length) {
					run_tests.className = "button-1";
					run_tests.innerHTML = "Run Tests";
					testsRunning = false;
				}
			}
		}, i * 100);
	}

	function clearTests() {
		completeTests = 0;
		for(var i = 0, j = tests.length;i < j;i++) {
			document.getElementById("test-" + i).className = "";
			document.getElementById("test-state-" + i).innerHTML = "?";
		}
	}

	var info_tests_close = d.createElement("div");
	info_tests_close.className = "close";
	info_tests_close.onclick = function() {
		// TODO: localStorage save
		content_tests.removeChild(info_tests);
	};
	info_tests.appendChild(info_tests_close);

	initTests();
})();