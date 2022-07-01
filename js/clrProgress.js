export class ClrProgress{
    constructor(data){
        this.DATA = data;
        this.$container = document.querySelector('.container');

        //실행
        this.init();
    }//constructor

    init(){
        const $frag = document.createDocumentFragment();
        for(let obj of this.DATA){
            const $card = this.make_elem('ARTICLE','card');

            const $percent = this.append_percent(obj);
            
            this.append_dot($percent);
            this.append_circle($percent);
            this.append_number($percent, obj);
            

            $card.appendChild($percent);
            $frag.appendChild($card);
        }

        this.$container.appendChild($frag)
    }//init

    
    make_elem(elemType, className){
        const $res = document.createElement(elemType);
        className && $res.classList.add(className);
        return $res
    }//make_elem

    add_text($elem,text){ $elem.textContent = text;}

    append_percent(obj){
        const{clr,per} = obj;
        const $elem = this.make_elem('DIV','percent');
        $elem.style.setProperty('--clr',clr);
        $elem.style.setProperty('--num',per);
        return $elem;
    }//append_percent

    append_dot($parent){
        const $elem = this.make_elem('DIV','dot');
        $parent.appendChild($elem);
    }//append_dot

    append_circle($parent){
        const $svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        const $clr_1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        const $clr_2 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        const clr_data = {cx:73, cy:75, r:68};
        this.set_circle($clr_1,clr_data);
        this.set_circle($clr_2,clr_data);
        $svg.appendChild($clr_1);
        $svg.appendChild($clr_2);
        $parent.appendChild($svg);
    }//append_circle

    append_number($parent,obj){
        const {per,name} = obj;
        const $number = this.make_elem('DIV','number');

        this.appendPerName("H2",per,$number);
        this.appendPerName("P",name,$number);

        $parent.appendChild($number);
    }//append_number

    appendPerName(elemType,text,$parent){
        const $elem = this.make_elem(elemType);
        this.add_text($elem, text);
        $parent.appendChild($elem);
    }//appendPerName

    set_circle($clr,data){
        for(let key in data){ $clr.setAttribute(key, data[key]);}
    }//set_circle
}//ClrProgress