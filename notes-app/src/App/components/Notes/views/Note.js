import './Notes.css';

const note = () => {


    return 
    <>
    <div href="#0" class="button-green">
         <span class="style"></span>
        <div class="row-lay">
        <app-circular-text></app-circular-text>
        <div class="column-lay">
            <h3>Section 1: Getting Started ehat dfdj dfkdjfkj kfjdfkljdf</h3>
            <span>Teach Me ⓵ exp: Mar 12, 2013 </span>
        </div>
    </div>
    <div class="price column-lay timer-box shadow" [ngClass]="{'blinks-bg': blink===true}">
        <div [ngClass]="{'blink-bg': blink===true}"> {{hh}}:{{mm}}:{{ss}} </div>
        <div class="row-lay flex-space-evenly">
            <i [ngClass]="{'blink-texts': blink===true}" class="bi-alarm "
                style="font-size: large; font-weight: bold;"></i>
            <span>30m</span>
        </div>        
    </div>      
    
</div>
    
    </>
}