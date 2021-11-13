
    const templateS = document.querySelector('select');
    const rules = document.querySelector('input[type="checkbox"]');
    const elo = document.querySelectorAll('input[type="number"]');
    const radio = document.querySelectorAll('input[type="radio"');

    const yourPointsChange = document.getElementById('yourPtsChange');
    const oppPointsChange = document.getElementById('oppPtsChange');

    const yourTotalPoints = document.getElementById('yourTotalPts');
    const oppTotalPoints = document.getElementById('oppTotalPts');

    let K = 0.0;
    let RES = 0.0;

    let yourPTS;
    let oppPTS;

    let yourPtsChange = 0;
    let oppPtsChange = 0;



    window.setInterval(function(){
        changeK()
        countElo()
      }, 333);


    radio[0].addEventListener('click', function()
    {
        changeRES(event.target.value)
    })
    radio[1].addEventListener('click', function()
    {
        changeRES(event.target.value)
    })
    radio[2].addEventListener('click', function()
    {
        changeRES(event.target.value)
    })



    templateS.addEventListener('click', countElo)
    rules.addEventListener('click', countElo)
    elo[0].addEventListener('click', countElo)
    elo[1].addEventListener('click', countElo)

    function countElo()
    {
        if(RES == 0) // przegrana
        {
            
            yourPtsChange =  K * (RES - 1 / (1 +  Math.pow(10 ,(elo[1].value- elo[0].value) / 400)))
            oppPtsChange = -K * (RES - 1 / (1 +  Math.pow(10 ,(elo[1].value- elo[0].value) / 400)))
        }
        else if(RES == 1) // wygrana
        {
            yourPtsChange = K * (RES - 1 / (1 +  Math.pow(10 ,(elo[1].value- elo[0].value) / 400)))
            oppPtsChange =  -K * (RES - 1 / (1 +  Math.pow(10 ,(elo[1].value- elo[0].value) / 400)))
        }
        else if(RES == 0.5) // remis
        {
            yourPtsChange = K * (RES - 1 / (1 + Math.pow(10 ,(elo[1].value- elo[0].value) / 400)))
            oppPtsChange = K * (RES - 1 / (1 +  Math.pow(10 ,(elo[0].value- elo[1].value) / 400)))
        }

        if(yourPtsChange <= -1)
        {
            yourPointsChange.textContent = "Stracisz " + Math.round(-yourPtsChange);
            oppPointsChange.textContent = "zyska " + Math.round(oppPtsChange);
            
            yourPointsChange.style.setProperty('color','red');
            oppPointsChange.style.setProperty('color','green');




        }
        else if((yourPtsChange<1)&&(yourPtsChange>-1))
        {
            yourPointsChange.textContent = "Nie zyskasz ani nie stracisz żadnych "
            oppPointsChange.textContent = "nie zyska ani nie straci żadnych "
          
            yourPointsChange.style.setProperty('color','yellow');
            oppPointsChange.style.setProperty('color','yellow');
        
        
        
        }
        else if(yourPtsChange => 1)
        {
            yourPointsChange.textContent = "Zyskasz " + Math.round(yourPtsChange);
            oppPointsChange.textContent = "straci " + Math.round(-oppPtsChange);
           
            yourPointsChange.style.setProperty('color','green');
            oppPointsChange.style.setProperty('color','red');

       
       
        }



        let pts = parseInt(elo[0].value) + yourPtsChange;
        let pts2 = parseInt(elo[1].value) + oppPtsChange;
        

        if(pts=>0)
        {
            yourTotalPoints.textContent = Math.round(pts);
        }
        else
        {
            yourTotalPoints.textContent = 0;
        }

        if(pts2 =>0)
        {
            oppTotalPoints.textContent = Math.round(pts2);
        }
        else
        {
            oppTotalPoints.textContent = 0;
        }
        
    }

    function changeRES(x)
    {
        radio.forEach(el=> {
            if(el.checked)
            {
                RES = x;

            }
        });
    }

    function changeK()
    {
        if(rules.checked)
        {
            K = templateS.children[templateS.selectedIndex].value * 1.5
        }
        else
        {
            K = templateS.children[templateS.selectedIndex].value
        }
        
    }


    













