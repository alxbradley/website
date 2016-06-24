(function(){
    var sectionTemplate;
    sendRequest('json/section-data.json', buildSectionMarkup, false);


    function buildSectionMarkup (req) {
        var data = JSON.parse(req.response),
            str = '',
            mainSection = document.createElement('section');

        sendRequest('templates/section.html', function (req) {
            sectionTemplate = req.response;
            for (var i=0, len=data.length; i < len; i++) {
                str += replaceObj(sectionTemplate, data[i]);
            }
            mainSection.innerHTML = str;
            window.getMainSections = (function (main) {
                return function () {
                    return main;
                }
            })(mainSection);
            
            setChildrenStyles.call(mainSection, {top: '1000px', position: 'absolute'});
            document.getElementById('content-wrap').appendChild(mainSection);

        }, false);

    }
    
    function setChildrenStyles (styleMapping) {
        var children = this.children,
            elem,
            i = 0,
            str = JSON.stringify(styleMapping).replace(/,/g,';').replace(/[\{\}\"\"]/g,'');
            
        if (children) {
            while (elem = children[i++]) {
                elem.setAttribute('style', str);
            }
        }
    }

})()