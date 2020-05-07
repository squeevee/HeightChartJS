// height.js

// Copyright 2020 Eleanor Hawk

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights 
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell 
// copies of the Software, and to permit persons to whom the Software is 
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

pixelsPerMeter = 200;
horizontalPadding = 50;

heightChart = {
    height: 0,
    
    pxHeight: 0,
    pxWidth: 0,
    
    models: {},
    
    shown: [],
    
    show: function(model) {
        heightChart.shown.push(model);
        model.shown = true;
        
        if (Object.keys(heightChart.models).length === heightChart.shown.length) {
            clicker.allChecked = true;
        }
        
        heightChart.update();
    },
    
    hide: function(model) {
        const index = heightChart.shown.indexOf(model);
        if (index !== -1) {
            heightChart.shown.splice(index, 1);
            clicker.allChecked = false;
        }
        
        model.shown = false;
        
        heightChart.update();
    },
    
    update: function() {
        if (heightChart.shown.length === 0) {
            $(heightChart.element).hide();
            return;
        }
        
        $(heightChart.element).show();
        
        heightChart.height = 0;
        heightChart.pxHeight = 0;
        heightChart.pxWidth = (heightChart.shown.length + 1) * horizontalPadding;
        
        $('img[data-model-id]').hide();
        $(heightChart.element).find('.rule').remove();
        
        for (const model of heightChart.shown) {
            const modelScale = model.height / model.boxHeight * pixelsPerMeter;
            
            if (heightChart.height < model.height) {
                heightChart.height = model.height;
            }
            heightChart.pxWidth += model.boxWidth * modelScale;
        }
        
        heightChart.pxHeight = heightChart.height * pixelsPerMeter;
        
        $(heightChart.element).width(heightChart.pxWidth);
        $(heightChart.element).height(heightChart.pxHeight);
        
        let xPos = horizontalPadding;
        
        for (const model of heightChart.shown) {
            const modelScale = model.height / model.boxHeight * pixelsPerMeter;
            
            const bottom = (model.boxTop + model.boxHeight - model.pxHeight) * modelScale;
            const left = xPos - model.boxLeft * modelScale;
            
            $(model.element).show();
            $(model.element).height(model.pxHeight * modelScale);
            model.element.style.bottom = `${bottom}px`;
            model.element.style.left = `${left}px`;
            
            let rule = document.createElement('div');
            rule.className = 'rule';
            $(heightChart.element).append(rule);
            
            rule.style.bottom = `${model.boxHeight * modelScale}px`;
            
            xPos += model.boxWidth * modelScale + horizontalPadding;
        }
    }
};

getModels = function() {
    let models = {};
    
    $('img[data-model-id]').each((i, e) => {
        const id = $(e).attr('data-model-id');
        const name = $(e).attr('data-model-name');
        const height = Number($(e).attr('data-model-height'));
        
        const shown = $(e).attr('data-model-show') === 'true';
        
        const pxHeight = $(e).height();
        const pxWidth = $(e).width();
        
        let boxTop = Number($(e).attr('data-model-box-top'));
        if (Number.isNaN(boxTop)) {
            boxTop = 0;
        }
        
        let boxBottom = Number($(e).attr('data-model-box-bottom'));
        if (Number.isNaN(boxBottom)) {
            boxBottom = pxHeight - 1;
        }
        
        let boxLeft = Number($(e).attr('data-model-box-left'));
        if (Number.isNaN(boxLeft)) {
            boxLeft = 0;
        }
        
        let boxRight = Number($(e).attr('data-model-box-right'));
        if (Number. isNaN(boxRight)) {
            boxRight = pxWidth - 1;
        }
        
        const model = {
            id: id,
            name: name,
            height: height,
            
            shown: shown,
            
            boxTop: boxTop,
            boxHeight: boxBottom - boxTop,
            boxLeft: boxLeft,
            boxWidth: boxRight - boxLeft,
            
            pxHeight: pxHeight,
            pxWidth: pxWidth,
            
            element: e
        };
        
        models[id] = model;
    });
    
    return models;
};

clicker = {    
    show: function() {
        $(clicker.showButton).hide();
        $(clicker.element).show();
    },
    
    hide: function() {
        $(clicker.showButton).show();
        $(clicker.element).hide();
    }
};

window.addEventListener('load', () => {
    
    heightChart.models = getModels();
    
    heightChart.element = document.getElementById('heightChart');
    
    let baseline = document.createElement('div');
    baseline.id = 'baseline';
    $(heightChart.element).append(baseline);
    
    let metricRuler = document.createElement('div');
    metricRuler.id = 'metricRuler';
    $(heightChart.element).append(metricRuler);
    
    let imperialRuler = document.createElement('div');
    imperialRuler.id = 'imperialRuler';
    $(heightChart.element).append(imperialRuler);
    
    clicker.showButton = document.createElement('div');
    clicker.showButton.id = 'clicker-showButton';
    clicker.showButton.onclick = clicker.show;
    $(document.body).prepend(clicker.showButton);
    
    clicker.element = document.createElement('div');
    clicker.element.id = 'clicker';
    $(clicker.element).hide();
    $(clicker.showButton).after(clicker.element);
    
    let hideButton = document.createElement('input');
    hideButton.setAttribute('type', 'button');
    hideButton.setAttribute('value', 'Hide');
    hideButton.onclick = clicker.hide;
    $(clicker.element).append(hideButton);
    
    let inputList = document.createElement('ls');
    $(clicker.element).append(inputList);
        
    let modelList = [];
    
    for (const id of Object.keys(heightChart.models)) {
        const model = heightChart.models[id];
        modelList.push(model);
    }
    
    modelList.sort((a, b) => { 
        return a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1;
    });
    
    for (const model of modelList) {
        let li = document.createElement('li');
                
        let showInput = document.createElement('input');
        showInput.setAttribute('id', 'model-show-' + model.id);
        showInput.setAttribute('type', 'checkbox');
        showInput.onchange = (e) => {
            if (e.target.checked)
                heightChart.show(model);
            else
                heightChart.hide(model);
        };
        
        if (model.shown) {
            heightChart.shown[model.id] = model;
            showInput.checked = true;
        }
        
        $(li).append(showInput);
        
        let label = document.createElement('label');
        label.setAttribute('for', 'model-show-' + model.id);
        label.innerText = model.name;
        
        $(li).append(label);
        
        $(inputList).append(li);
    }
    
    let showAllButton = document.createElement('input');
    showAllButton.setAttribute('type', 'button');
    showAllButton.setAttribute('value', 'Show all');
    showAllButton.onclick = () => {
        $(inputList).find('input[type="checkbox"]').each((i,e) => {
            e.checked = true;
        });
        heightChart.shown = modelList;
        heightChart.update();
    };
    $(clicker.element).append(showAllButton);
    
    let hideAllButton = document.createElement('input');
    hideAllButton.setAttribute('type', 'button');
    hideAllButton.setAttribute('value', 'Hide all');
    hideAllButton.onclick = () => {
        $(inputList).find('input[type="checkbox"]').each((i,e) => {
            e.checked = false;
        });
        heightChart.shown = [];
        heightChart.update();
    };
    $(clicker.element).append(hideAllButton);
    
    heightChart.update();
    
    modelList_shortToTall = modelList.slice(0);
    modelList_shortToTall.sort((a, b) => { return b.height - a.height });
    zIndex = 0;
    for (const model of modelList_shortToTall) {
        model.element.style.zIndex = zIndex;
        zIndex++;
    }
    
});
