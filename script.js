document.addEventListener("DOMContentLoaded", () => {
    let currentUnit = "metric";

    /* ========================== */
    /* Buttons & Inputs */
    const metricBtn = document.getElementById("metricBtn");
    const imperialBtn = document.getElementById("imperialBtn");
    const calculateBtn = document.getElementById("calculateBtn");
    const resetBtn = document.getElementById("resetBtn");

    const metricHeightGroup = document.getElementById("metricHeightGroup");
    const imperialHeightGroup = document.getElementById("imperialHeightGroup");

    const heightCm = document.getElementById("heightCm");
    const heightFeet = document.getElementById("heightFeet");
    const heightInches = document.getElementById("heightInches");
    const weightInput = document.getElementById("weight");
    const weightLabel = document.getElementById("weightLabel");

    const bmiValue = document.getElementById("bmiValue");
    const categoryText = document.getElementById("categoryText");
    const progressBar = document.getElementById("progressBar");

    const heightInput = document.getElementById("heightInput");
    const heightResult = document.getElementById("heightResult");
    const weightInputConv = document.getElementById("weightInput");
    const weightUnit = document.getElementById("weightUnit");
    const weightResult = document.getElementById("weightResult");
    const convertHeightBtn = document.getElementById("convertHeightBtn");
    const convertWeightBtn = document.getElementById("convertWeightBtn");

    /* ========================== */
    /* Unit toggle */
    function showMetric() {
        currentUnit = "metric";
        metricBtn.classList.add("active");
        imperialBtn.classList.remove("active");
        metricHeightGroup.classList.remove("hidden");
        imperialHeightGroup.classList.add("hidden");
        weightLabel.textContent = "Weight (kg)";
        resetBMI();
    }

    function showImperial() {
        currentUnit = "imperial";
        imperialBtn.classList.add("active");
        metricBtn.classList.remove("active");
        imperialHeightGroup.classList.remove("hidden");
        metricHeightGroup.classList.add("hidden");
        weightLabel.textContent = "Weight (lbs)";
        resetBMI();
    }

    metricBtn.onclick = showMetric;
    imperialBtn.onclick = showImperial;

    /* ========================== */
    /* BMI Calculation */
    calculateBtn.onclick = () => {
        let bmi;
        if(currentUnit==="metric"){
            const h = parseFloat(heightCm.value);
            const w = parseFloat(weightInput.value);
            if(!h || !w || h<=0 || w<=0){ alert("Enter valid values"); return; }
            bmi = w/((h/100)*(h/100));
        } else {
            const feet = parseFloat(heightFeet.value)||0;
            const inches = parseFloat(heightInches.value)||0;
            const w = parseFloat(weightInput.value);
            const totalInches = feet*12+inches;
            if(!totalInches || !w || w<=0){ alert("Enter valid values"); return; }
            bmi = (w/(totalInches*totalInches))*703;
        }
        animateBMI(bmi.toFixed(1));
    };

    /* Animate BMI */
    function animateBMI(value){
        let start=0;
        let end=parseFloat(value);
        let duration=800;
        let startTime=null;
        function animate(currentTime){
            if(!startTime) startTime=currentTime;
            let progress=Math.min((currentTime-startTime)/duration,1);
            let current=(progress*(end-start))+start;
            bmiValue.textContent=current.toFixed(1);
            if(progress<1) requestAnimationFrame(animate);
            else updateCategory(end);
        }
        requestAnimationFrame(animate);
    }

    /* Update Category */
    function updateCategory(bmi){
        let category="";
        let percent=Math.min((bmi/40)*100,100);
        if(bmi<18.5) category="Underweight";
        else if(bmi<24.9) category="Healthy Weight";
        else if(bmi<29.9) category="Overweight";
        else category="Obesity";
        categoryText.textContent=category;
        progressBar.style.width=percent+"%";
    }

    /* Reset BMI */
    resetBtn.onclick=resetBMI;
    function resetBMI(){
        heightCm.value="";
        heightFeet.value="";
        heightInches.value="";
        weightInput.value="";
        bmiValue.textContent="--";
        categoryText.textContent="";
        progressBar.style.width="0%";
    }

    /* ========================== */
    /* Conversion */
    convertHeightBtn.onclick = ()=>{
        const val = heightInput.value.trim();
        if(val.includes("'")){
            const match = val.match(/^(\d+)'(\d+)$/);
            if(!match){ heightResult.textContent="Enter like 5'7"; return; }
            const feet=parseInt(match[1]), inches=parseInt(match[2]);
            const cm = (feet*12+inches)*2.54;
            heightResult.textContent = cm.toFixed(1)+" cm";
        } else {
            const cm=parseFloat(val);
            if(!cm || cm<=0){ heightResult.textContent="Enter valid number"; return; }
            const totalInches = cm/2.54;
            const feet = Math.floor(totalInches/12);
            const inches = Math.round(totalInches%12);
            heightResult.textContent = feet+"'"+inches+"\"";
        }
    };

    convertWeightBtn.onclick = ()=>{
        const val=parseFloat(weightInputConv.value);
        if(!val || val<=0){ weightResult.textContent="Enter valid number"; return; }
        if(weightUnit.value==="kg"){
            weightResult.textContent = (val*2.20462).toFixed(1)+" lbs";
        } else {
            weightResult.textContent = (val/2.20462).toFixed(1)+" kg";
        }
    };
});