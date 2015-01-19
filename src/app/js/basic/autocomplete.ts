class AutoComplete {

    controller = ()=> {
        var self:{
            allItems:string[];
            filterInput:any;
            filteredItems:(string)=>void;
            getFilteredItems:()=>string[];
        };

        self = {
            allItems: ['one', 'two', 'threes', 'four'],
            filterInput: m.prop(''),
            filteredItems: (val)=> {
                self.filterInput(val);
            },
            getFilteredItems: ()=> {
                if (!self.filterInput().length) {
                    return self.allItems;
                }
                return self.allItems.filter(item => item.indexOf(self.filterInput()) > -1);
            }
        };

        return self;

    }

    view = (ctrl)=> {
        return [
            m('input#autoCompleteInput', {oninput: m.withAttr('value', ctrl.filteredItems)}),
            m('.filter', ctrl.filterInput()),
            m('ul#filteredItems', [
                ctrl.getFilteredItems().map(item => m('li', item))
            ])
        ]
    }
}

m.module(document.getElementById('autocomplete'), new AutoComplete())