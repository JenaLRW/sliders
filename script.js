const slider = document.querySelector('.range-slider');
const progress = slider.querySelector('.progress');
const minPayInput = document.querySelector('.min-pay');
const maxPayInput = document.querySelector('.max-pay');
const minInput = slider.querySelector(".min-input");
const maxInput = slider.querySelector(".max-input");

// Function to round to nearest 500
const roundTo500 = (value) => {
    return Math.round(value / 500) * 500;
};

const updateProgress = () => {
    const minValue = roundTo500(parseInt(minInput.value));
    const maxValue = roundTo500(parseInt(maxInput.value));

    // Update the range inputs to rounded values
    minInput.value = minValue;
    maxInput.value = maxValue;

    const range = maxInput.max - minInput.min;
    const valueRange = maxValue - minValue;
    const width = valueRange / range * 100;
    const minOffset = ((minValue - minInput.min) / range ) * 100;
    progress.style.width = width + '%';
    progress.style.left = minOffset + '%'; // /images/12.png

    minPayInput.value = minValue; 
    maxPayInput.value = maxValue;
}

const updateRange = () => {

    /*COMMENT: event parameter is not neccessary here as it shows in the youtube tutorial video 
    
    const input = event.target; 
      
    let min = parseInt(minPayInput.value);
    let max = parseInt(maxPayInput.value);

     if (input === minPayInput && max > min) {
        max = min;
        maxPayInput.value = max;
    } else if (input === maxPayInput && max < min) {
        min = max;
        minPayInput.value = min;       
    } */


    minInput.value = min;
    maxInput.value = max;

    updateProgress();

}

minPayInput.addEventListener('input', updateRange)
maxPayInput.addEventListener('input', updateRange)


minInput.addEventListener('input', () => {
    const roundedMin = roundTo500(parseInt(minInput.value));
    const roundedMax = roundTo500(parseInt(maxInput.value));
    
    if(roundedMin >= roundedMax){
        maxInput.value = roundedMin + 500;
    }
    updateProgress();
})
// /images/11.png
maxInput.addEventListener('input', () => {
    const roundedMin = roundTo500(parseInt(minInput.value));
    const roundedMax = roundTo500(parseInt(maxInput.value));
    
    if(roundedMax <= roundedMin){
        minInput.value = roundedMax - 500;
    }
    updateProgress();   
}) 
// /images/11.png

// Add event listeners for number inputs to update sliders
minPayInput.addEventListener('input', () => {
    const value = roundTo500(parseInt(minPayInput.value));
    if(value >= parseInt(maxPayInput.value)){
        maxPayInput.value = value + 500;
        maxInput.value = value + 500;
    }
    minInput.value = value;
    minPayInput.value = value; // Update display to rounded value
    updateProgress();
});

maxPayInput.addEventListener('input', () => {
    const value = roundTo500(parseInt(maxPayInput.value));
    if(value <= parseInt(minPayInput.value)){
        minPayInput.value = value - 500;
        minInput.value = value - 500;
    }
    maxInput.value = value;
    maxPayInput.value = value; // Update display to rounded value
    updateProgress();
});

let isDragging = false;
let startOffsetX;


progress.addEventListener('mousedown', (e) => {
    
    

    e.preventDefault(); // on my machine, i dont need this but in the youtube video, he added this line
    isDragging = true;
    startOffsetX = e.clientX - progress.getBoundingClientRect().left;

    console.log(startOffsetX);

    slider.classList.toggle('dragging', isDragging);
})
document.addEventListener('mousemove', (e) => {
    if (isDragging) {

        const sliderRect = slider.getBoundingClientRect();
        const progressWidth = parseFloat(progress.style.width || 0);

        let newLeft = ((e.clientX - sliderRect.left - startOffsetX) / sliderRect.width) * 100;

        newLeft = Math.min(Math.max(newLeft, 0), 100 - progressWidth);

        progress.style.left = newLeft + '%';
        const range = maxInput.max - minInput.min;

        const newMin = roundTo500(Math.round((newLeft / 100) * range) + parseInt(minInput.min));
        const newMax = roundTo500(newMin + parseInt(maxInput.value) - parseInt(minInput.value));

        minInput.value = newMin;
        maxInput.value = newMax;

        updateProgress();

    }


    slider.classList.toggle('dragging', isDragging);
})

document.addEventListener('mouseup', () => {
    if(isDragging) {
        isDragging = false;  
        
    }
    slider.classList.toggle('dragging', isDragging);
})

updateProgress();

