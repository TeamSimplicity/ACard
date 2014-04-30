/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var app = {
    initialize: function() {
        this.bind();
    },
    bind: function() {
        document.addEventListener('deviceready', this.deviceready, false);
    },
    deviceready: function() {
        // note that this is an event handler so the scope is that of the event
        // so we need to call app.report(), and not this.report()
        app.report('deviceready');
    },
    report: function(id) { 
        console.log("report:" + id);
        // hide the .pending <p> and show the .complete <p>
        document.querySelector('#' + id + ' .pending').className += ' hide';
        var completeElem = document.querySelector('#' + id + ' .complete');
        completeElem.className = completeElem.className.split('hide').join('');
    }
};

$(document).on('deviceready', function(){
	
	function loadBugs() {
		var bugs = $('#bugs ul').empty();
		
		$.ajax({
			type: 'GET',
			url: 'http://localhost/bapp/bugs.php?&jsoncallback=?',
			dataType: 'JSONp',
			timeout: 5000,
			success: function(data) {
				$.each(data, function(i,item){
					bugs.append('<li>'+item.title)
				});
			},
			error: function(data) {
				bugs.append('<li>There was an error loading the bugs');
			}
		});
	}
	
	$('#signup-form form').submit(function(){
		alert("invoked");
		var loading = $(this).find('input[type="submit"]');
		loading.addClass('loading');
		
		var postData = $(this).serialize();

		$.ajax({
			type: 'POST',
			data: postData,
			url: 'http://tratnayake.me/Assign-Barcode.php',
			success: function(data){

				
				console.log('Form Sent!');
			},
			error: function(){
				loading.removeClass('loading');
				console.log('There was an error');
			}
		});

		return false;
	});
	
	//change .tap to .click for browser testing
	$('.button').tap(function(e){
		var nextPage = $(e.target.hash);
		var currentPage = $('.page.current');

		if (nextPage.attr('id') != currentPage.attr('id')) {
			nextPage.addClass('current');
			currentPage.removeClass('current');
		}

		return false;
	});
	
	loadBugs();
	
});



