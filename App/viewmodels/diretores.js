define(['plugins/http', 'durandal/app', 'knockout'], function (http, app, ko) {
	
	console.log("ready!");
	$("#diretor").hide();
	
	var ViewModel = function () {
		
		var self = this;
		var searchDirectorsUri = 'http://192.168.160.39/api/Directors/Search/'
		var directorsUri = 'http://192.168.160.39/api/Directors';
		var directorsCountUri = 'http://192.168.160.39/api/Directors/Count';
		
		self.searchText = ko.observable("");
		self.directors = ko.observableArray();
		self.directorsCount = ko.observable(null);
		self.error = ko.observable();
		self.diretorInfo = ko.observableArray();

		self.searchTextGood = ko.computed(function () {
			return (self.searchText().length < 3)
		}, self);

		function ajaxHelper(uri, method, data) {
			self.error(''); // Clear error message
			return $.ajax({
				type: method,
				url: uri,
				dataType: 'json',
				contentType: 'application/json',
				data: data ? JSON.stringify(data) : null,
				error: function (jqXHR, textStatus, errorThrown) {
					console.log("AJAX Call[" + uri + "] Fail...");
					self.error(errorThrown);
				}
			});
		}

		getAllDirectors = function () {
			console.log('CALL: getAllDirectors...')
			ajaxHelper(directorsCountUri, 'GET').done(function (data) {
				self.directorsCount(data);
			});
			ajaxHelper(directorsUri, 'GET').done(function (data) {
				self.directors(data);
			});
		};

		clearDirectors = function () {
			getAllDirectors();
			self.searchText("");
		};

		searchDirectors = function () {
			console.log('CALL: searchDirectors...')
			ajaxHelper(searchDirectorsUri + self.searchText(), 'GET').done(function (data) {
				self.directors(data);
			});
		}
		
		getDiretor = function() {
			ajaxHelper(directorsUri + '/' + this.directorID.toString(), 'GET').done(function(data) {
				self.diretorInfo(data);
				$("#diretor").show();
				$("#searchPlace").hide();
			});
		}

		getAllDirectors();
	};

	return ViewModel;
});
