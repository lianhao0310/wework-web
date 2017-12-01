export default {
	getUrlParam: function (key) {
		var reg = new RegExp("(^|&)"+key +"= ([^&]*)(&|$)");
		var result = window.location.search.substr(1).match(reg);
		return result ? result[2] : null;
	}
};
