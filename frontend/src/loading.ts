import { ILoadingScreen } from "babylonjs";
//TODO uniform with vue component
export class WoTLoadingScreen implements ILoadingScreen {
    //optional, but needed due to interface definitions
    public loadingUIBackgroundColor: string = "#FFFF00"
    private o: Element | null | undefined;
    private t: Element | null | undefined;
    private w: Element | null | undefined;
    private right: Element | null | undefined;
    private left:  Element | null | undefined;
    private infiniteState = false;

    constructor(public logoElement:HTMLElement | null) { 
        this.w = logoElement?.querySelector("#w");
        this.o = logoElement?.querySelector("#oLetter");
        this.t = logoElement?.querySelector("#t");

        this.right = logoElement?.querySelector("#right");
        this.left = logoElement?.querySelector("#left");
    }
    
    loadingUIText: string = "";
    
    public displayLoadingUI() {
        setTimeout(() => {
            this.w?.classList.toggle("pop")
            this.o?.classList.toggle("pop")
            this.t?.classList.toggle("pop")
            this.t?.addEventListener("animationend", this.goInfinite.bind(this), { once: true })
        }, 200);
    }
    
    public hideLoadingUI() {
        console.log("oka!");
       !this.infiniteState && this.goInfinite()
        this.o?.classList.add("full")
        this.o?.classList.remove("pop", "letter")
        this.right?.addEventListener("animationiteration", () => {
            this.right?.classList.toggle("endRight")
            this.o?.addEventListener("animationend",()=> {
                if(this.logoElement) {
                    setTimeout(() => {
                        this.logoElement!!.style.display = "none"
                    }, 1000);
                    this.logoElement.classList.toggle("fadeOut")
                }
            } )
            this.o?.classList.toggle("spin")
        }, { once: true });
        this.left?.addEventListener("animationiteration", () => {
            this.left?.classList.toggle("endLeft")
        }, { once: true });
    }
    
    private goInfinite(){
        if(this.infiniteState){
            return;
        }
        this.infiniteState = true
        this.right?.classList.toggle("slideRight")
        this.left?.classList.toggle("slideLeft")
    }
}