//Selecting the Global Dom elements
const totalConfirmedGlobalOverall = document.getElementById('total-confirmed-g-o')
const totalDeathsGlobalOverall = document.getElementById('total-deaths-g-o')
const totalRecoveredGlobalOverall = document.getElementById('total-recovered-g-o')
const totalConfirmedGlobalToday = document.getElementById('total-confirmed-g-t')
const totalDeathsGlobalToday = document.getElementById('total-deaths-g-t')
const totalRecoveredGlobalToday = document.getElementById('total-recovered-g-t')

// Asynchronous Operations
const getCovidSummary = async () => {
    const response = await fetch('https://api.covid19api.com/summary')
    if (response.status === 200) {
        const data = await response.json()
        return data
    } else {
        throw new Error('Could not get Data!(404)')
    }
}

getCovidSummary()
    .then((data) => {
        totalConfirmedGlobalOverall.textContent = data.Global.TotalConfirmed
        totalDeathsGlobalOverall.textContent = data.Global.TotalDeaths
        totalRecoveredGlobalOverall.textContent = data.Global.TotalRecovered
        totalConfirmedGlobalToday.textContent = data.Global.NewConfirmed
        totalDeathsGlobalToday.textContent = data.Global.NewDeaths
        totalRecoveredGlobalToday.textContent = data.Global.NewRecovered
    })

//Selecting the Country DOM elements
const totalConfirmedCountryOverall = document.getElementById('total-confirmed-c-o')
const totalDeathsCountryOverall = document.getElementById('total-deaths-c-o')
const totalRecoveredCountryOverall = document.getElementById('total-recovered-c-o')
const totalConfirmedCountryToday = document.getElementById('total-confirmed-c-t')
const totalDeathsCountryToday = document.getElementById('total-deaths-c-t')
const totalRecoveredCountryToday = document.getElementById('total-recovered-c-t')
const countryTitle = document.getElementById('country-location')

const countryInput = document.getElementById('search')

countryInput.addEventListener('input',(e) => {
    getCovidSummary()
    .then((data) => {
        const countriesArray = data.Countries
        const ctry = countriesArray.find((country) => {
            return country.Country.toLowerCase().includes(e.target.value.toLowerCase())
        })
        if(e.target.value !== '') {
        totalConfirmedCountryOverall.textContent = ctry.TotalConfirmed
        totalDeathsCountryOverall.textContent = ctry.TotalDeaths
        totalRecoveredCountryOverall.textContent = ctry.TotalRecovered
        totalConfirmedCountryToday.textContent = ctry.NewConfirmed
        totalDeathsCountryToday.textContent = ctry.NewDeaths
        totalRecoveredCountryToday.textContent = ctry.NewRecovered
    } else {
            totalConfirmedCountryOverall.textContent = ''
            totalDeathsCountryOverall.textContent = ''
            totalRecoveredCountryOverall.textContent = ''
            totalConfirmedCountryToday.textContent = ''
            totalDeathsCountryToday.textContent = ''
            totalRecoveredCountryToday.textContent = ''
    }
    })
})

