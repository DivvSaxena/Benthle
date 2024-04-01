/* SELECTING ELEMENTS */
const sectionThreeEl = document.getElementById('sectionthree')
const sectionFiveEl = document.getElementById('sectionfive')

let obj = {hairstyle: '',barber:''}
let array = []

showHairStyles()

document.addEventListener('click',(e) => {
    if(e.target.id == 'hairstyle-1'){
        showBarbers()
        obj.hairstyle = 'Messy quiff'
    }
    else if(e.target.id == 'hairstyle-2'){
        showBarbers()   
        obj.hairstyle = 'Pompadour'
    }
    else if(e.target.id == 'hairstyle-3'){
        showBarbers()   
        obj.hairstyle = 'Crew Cut'
    }
    else if(e.target.id == 'barber-1'){
        obj.barber = 'Bunny'
        array.push(obj)
        redirectToBillingPage()
    }
    else if(e.target.id == 'barber-2'){
        obj.barber = 'Kenny'
        array.push(obj)
        redirectToBillingPage()
    }
    else if(e.target.id == 'barber-3'){
        obj.barber = 'Rose'
        array.push(obj)
        redirectToBillingPage()
    }
    
})


function redirectToBillingPage() {
    localStorage.setItem('bookingArray',JSON.stringify(array))
    window.location.href = './billing.html'
}


function showHairStyles(){
    showView(sectionThreeEl)
    hideView(sectionFiveEl)
}

function showBarbers(){
    showView(sectionFiveEl)
    hideView(sectionThreeEl)
}

function showView(view){
    view.style.display = 'block'
}

function hideView(view){
    view.style.display = 'none'
}

