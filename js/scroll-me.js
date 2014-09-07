(function () {
    var SCROLL_ME_INIT = 'scroll-me',
        BOUNDRY_CLS = 'scroll-section',
        SCROLL_Y_REF = 100,
        TIMEOUT = 10,

        fixedElem = $('.' + SCROLL_ME_INIT),
        boundFn;

    fixedElem.className.replace(SCROLL_ME_INIT, '');

    function Iter (array, startingIndex) {
        this.arr = array;
        this.index = startingIndex;
    }
    Iter.prototype = {
        hasNext: function () {
            return (this.index < this.arr.length - 1);
        },

        next: function () {
            return this.arr[++this.index];
 
        },
        hasPrevious: function () {
            return (this.index > 0);
        },
        previous: function () {
            return this.arr[--this.index];
        },
        peekPrevious: function () {
            return this.arr[this.index - 1];
        }
    };

    function Section (elem, fixed) {
        this.elem = elem;
        this.fixed = fixed;
        this.rect = elem.getBoundingClientRect();

        this.top = this.rect.top + pageYOffset;
        this.bottom = this.rect.bottom + pageYOffset;


    }
    Section.prototype = {
        getRect: function () {
            return this.rect;
        },
        showFixedSection: function () {
            this.elem.addClass('invisible');
            this.fixed.removeClass('hide');
        },
        hideFixedSection: function () {
            this.elem.removeClass('invisible');
            this.fixed.addClass('hide');
        }
    };

    function ScrollMe () {
        boundFn = bind(this.handleScroll, this);
        this.setWindowOnScroll();
        this.sections = [];
        this.initSection();
    }
    ScrollMe.init = function (yReferencePoint) {

        SCROLL_Y_REF = yReferencePoint && yReferencePoint || 0;
        return new ScrollMe();        
    };

    ScrollMe.prototype = {
        initSection: function () {
            var mainSection = $('.main-content .scroll-section'),
                fixedSection = $('.fixed-content .scroll-section'),
                i,len,
                elem,
                fixedElem,
                sectionArray = this.sections,
                bobj,
                currentSection = 0;


            for (i=0,len=mainSection.length; i < len; i++) {
                elem = mainSection[i];
                fixedElem = fixedSection[i];
                fixedElem.addClass('hide');

                bobj = new Section(elem, fixedElem);
                console.log(bobj.top);

                if(bobj.top - pageYOffset <= SCROLL_Y_REF) {
                    currentSection = i;
                    bobj.showFixedSection();
                    console.log('current section: ' + currentSection);
                }
                sectionArray.push(bobj);
            }

            this.sectionIter = new Iter(this.sections, currentSection);
            this.currentSection = this.sections[currentSection];
            this.previousSection = currentSection > 1 && this.sections[currentSection-1] || null;
            

        },
        scrollFn: function (pos) {

            var currSec = this.currentSection,
                prevSec = this.previousSection,
                iter = this.sectionIter;


            if (currSec && currSec.top <= pos) {
                currSec.showFixedSection();

                this.previousSection = this.currentSection;
                this.currentSection = iter.next() || null;
                
            } else if (prevSec && pos < prevSec.top) {
                prevSec.hideFixedSection();
                this.currentSection = iter.hasPrevious() && iter.previous() || currSec;
                this.previousSection = iter.hasPrevious() && iter.peekPrevious() || null;

            }


        },
        getCurrPos: function () {
            return this.sections[this.currentSection].getTop();
        },
        handleScroll: function () {
            window.onscroll = null;
            this.scrollFn(window.pageYOffset + SCROLL_Y_REF);
            setTimeout(this.setWindowOnScroll, TIMEOUT);
            
        },
        setWindowOnScroll: function () {
            window.onscroll = boundFn;
        },
        setYScrollReference: function (yReferencePoint) {
            SCROLL_Y_REF = yReferencePoint && yReferencePoint || 0;
        }
    }
    if(!window.alx) {
        window.alx = {};
    }
    window.alx.ScrollMe = ScrollMe;
})()