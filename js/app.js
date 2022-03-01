/* Error message div hiding */
document.getElementById('error-message').style.display = 'none';
document.getElementById('not-found').style.display = 'none';

// Search Item
const searchMobile = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clear data
    searchField.value = '';
    if (searchText == '') {
        
        document.getElementById('error-message').style.display = 'block';
        document.getElementById('not-found').style.display = 'none';
    }
    else {
        // load data
        const url = ` https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.data))
            document.getElementById('error-message').style.display = 'none';
            document.getElementById('not-found').style.display = 'none';
    }
};

    /* Display Data */

    const displaySearchResult = mobiles => {
   // console.log(mobiles)
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    if (mobiles.length == 0) {

        // show no result found;
       document.getElementById('not-found').style.display = 'block';
       document.getElementById('error-message').style.display = 'none';
       
    }
    else{
        document.getElementById('not-found').style.display = 'none';
        document.getElementById('error-message').style.display = 'none';
        mobiles.slice(0,20).forEach(mobile => {
        // console.log(mobile);
         const div = document.createElement('div');
        div.classList.add('col-lg-4');
        div.classList.add('col-sm-12');
        div.innerHTML = `
        <div class="card h-100">
            <img src="${mobile.image}" class="card-img-top img-thumbnail" alt="...">
            <div class="card-body">
            <h5 class="card-title text-info">${mobile.phone_name}</h5>
            <h3 class="card-title mb-3 text-success">${mobile.brand}</h3>
            <a href="#" class="btn btn-primary" onclick="loadMobileDetail('${mobile.slug}')">
                Details
                </a>
            </div>
        </div>
        `;
        searchResult.appendChild(div); 
        //clear previous data
        const mobileDetails = document.getElementById('mobile-details');
        mobileDetails.textContent = '';
    })
    }
};
/* Single Data Display */
const loadMobileDetail = id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data =>displayMobileDetail(data.data));
}
const displayMobileDetail = mobile => {
    
    const mobileDetails = document.getElementById('mobile-details');
    mobileDetails.textContent = '';

    if(mobileDetails == ''){
        document.getElementById('error-message').style.display = 'block';
        document.getElementById('not-found').style.display = 'none';
    }
    else{
        const div = document.createElement('div');
    div.classList.add('card');
    
    div.innerHTML = `
    <img id="details-pic" src="${mobile.image}" class="card-img-top img-thumbnail" alt="...">
    <div class="card-body">
        <h5 class="text-info">${mobile.name}</h5>
        <h4 class="text-success">${mobile.brand}</h4>
        <p><b>Release Date: </b>${mobile.releaseDate ? mobile.releaseDate : 'Not declare yet'}</p>
        
        <div>
            <b>Chipset:</b> ${mobile.mainFeatures.chipSet},</br> 
            <b>Memory:</b> ${mobile.mainFeatures.memory},</br>
            <b>Storage:</b> ${mobile.mainFeatures.storage},</br>
            <b>Display Size:</b> ${mobile.mainFeatures.displaySize},</br>
            <b>Sensors:</b> ${mobile.mainFeatures.sensors},</br>           
            <b>Others:</b>,</br>
            <b>Bluetooth:</b> ${mobile.others?.Bluetooth? mobile.others.Bluetooth : 'data not available'},</br>
            <b>GPS:</b> ${mobile.others?.GPS? mobile.others.GPS : 'data not available'},</br>
            <b>NFC:</b> ${mobile.others?.NFC? mobile.others.NFC : 'data not available'},</br>
            <b>Radio:</b> ${mobile.others?.Radio? mobile.others.Radio : 'data not available'},</br>
            <b>USB:</b> ${mobile.others?.USB? mobile.others.USB : 'data not available'},</br>
            <b>WLAN:</b> ${mobile.others?.WLAN? mobile.others.WLAN : 'data not available'},</br>
           
        </div>
         
    </div>
    `;
     
    mobileDetails.appendChild(div);
    document.getElementById('error-message').style.display = 'none';
    document.getElementById('not-found').style.display = 'none';
    }
};
    

