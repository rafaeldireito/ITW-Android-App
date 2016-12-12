define(['plugins/http', 'durandal/app', 'knockout'], function (http, app, ko) {
	
	console.log("ready!");
	$("#ator").hide();
	
	var ViewModel = function () {
		
		var self = this;
		var searchActorsUri = 'http://192.168.160.39/api/Actors/Search/'
		var actorsUri = 'http://192.168.160.39/api/Actors';
		var actorsCountUri = 'http://192.168.160.39/api/Actors/Count';
		
		self.searchText = ko.observable("");
		self.actors = ko.observableArray();
		self.actorsCount = ko.observable(null);
		self.error = ko.observable();
		self.atorInfo = ko.observableArray();

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

		getAllActors = function () {
			console.log('CALL: getAllActors...')
			ajaxHelper(actorsCountUri, 'GET').done(function (data) {
				self.actorsCount(data);
			});
			ajaxHelper(actorsUri, 'GET').done(function (data) {
				self.actors(data);
				console.log(data);
			});
		};

		clearActors = function () {
			getAllActors();
			self.searchText("");
		};

		searchActors = function () {
			console.log('CALL: searchActors...')
			ajaxHelper(searchActorsUri + self.searchText(), 'GET').done(function (data) {
				self.actors(data);
			});
		}
		
		getAtor = function() {
			ajaxHelper(actorsUri + '/' + this.actorID.toString(), 'GET').done(function(data) {
				self.atorInfo(data);
				$("#ator").show();
				$("#searchPlace").hide();
			});
		}

		getAllActors();
	};

	return ViewModel;
});
