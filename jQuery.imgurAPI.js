// Utilities
if (typeof Object.create !== 'function') {
    Object.create = function (obj) {
        function Fnc() {};
        Fnc.prototype = obj;
        return new Fnc();
    }
}

(function ($, window, document, undefined) {
    'use strict'
    
    //Object testing
    function testObj(ele, eletype) {
        return (typeof ele === eletype) ? true : false;
    }

    var Imgur = {
        init: function (options, elem) {
            var self = this; // self -> this instance of the Imgur Obj (cached)
            self.elem = elem;
            self.$elem = $(elem); // $elem stores htmlnode as jQuery obj (cached)

            self.url = "https://api.imgur.com/3/gallery/r/";
            console.log(typeof options);

            if (testObj(options, 'string')) {
                self.search = options
            } else {
                self.search = options.search;
                self.options = $.extend({}, $.fn.imgurAPI.options, options);
                console.log(self.options);
            }

            self.cycle();
        },

        cycle: function () {

            var self = this;
            self.fetch().done(function (results) {
                console.log(this.url)
                console.log(results);
                self.buildFrag(results);
                self.display();
            });
        },

        fetch: function () {
            return $.ajax({
                url: this.url + this.search + '.json',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Client-ID 6ec1b25178e106f');
                },
                dataType: 'json',
            });
        },

        buildFrag: function (results) {
            var self = this;

            self.imgs = $.map(results.data, function (obj, i) {
                //                console.log(obj);
            });
        },

        display: function () {
            this.$elem.html(self.imgs) //assume imgs exist
        }
    };

    $.fn.imgurAPI = function (options) {
        return this.each(function () {
            var imgur = Object.create(Imgur);
            imgur.init(options, this); //this -> HTMLnode 
        });
    };

    $.fn.imgurAPI.options = {
        //Set defaults
        search: 'streetArt'
    };

})(jQuery, window, document);