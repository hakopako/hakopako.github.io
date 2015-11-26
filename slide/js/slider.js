var Slider = {
	width: 0,
	height: 0,
	currPage: 0,
	maxPage: 0,
	load: function(hash, callback){
		this.width = window.innerWidth
		this.height = window.innerHeight
		this.$container = $("#container")
		this.$section = $("section")
		this.maxPage = this.$section.length
		this.sectionResize()
		if(0 < hash && hash <= this.maxPage){
			this.currPage = hash-1
			$("body").stop().animate({scrollTop: this.currPage * this.height}, '0', 'swing')
		} else {
			location.hash = ''
		}
		callback()
	}, 
	sectionResize: function(){
		var self = this
		$.each(this.$section, function(i, section){
			var w = self.width
			var h = self.height
			$(section).css({width: w-90, height: h-60})
		})
	},
	pageNext: function(){
		if(this.currPage+1 >=  this.maxPage) return
		this.currPage ++
		location.hash = this.currPage+1
		$("body").stop().animate({scrollTop: this.currPage * this.height}, '500', 'swing')
	},
	pagePre: function(){
		if(this.currPage == 0) return
		this.currPage --
		location.hash = this.currPage+1
		$("body").stop().animate({scrollTop: this.currPage * this.height}, '500', 'swing')
	}
}

$(function() {
	var hash = location.hash.replace('#','')
	Slider.load(hash, function(){
		// bind window resize event
		$(window).resize(function() {
			Slider.width = window.innerWidth
			Slider.height = window.innerHeight
			Slider.sectionResize()
			$("body").stop().animate({scrollTop: Slider.currPage * Slider.height}, '500', 'swing')
		})
		
		// bind keydown event
		$(document).keydown(function(event){
			if (event.which == 13 || event.which == 40){
				Slider.pageNext()
			} else if (event.which == 38){
				Slider.pagePre()
			}
		})
		
		// bind mousewheel event
		window.addEventListener("mousewheel", function(e){
			e = window.event || e;
			var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
			if(delta == -1) Slider.pageNext()
			else Slider.pagePre()
			e.preventDefault();
		}, false);
		
		// display
		Slider.$container.show()
	})
})