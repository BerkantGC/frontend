// Close ad
function closeAd(id) {
    document.getElementById(id).style.display = 'none';
  }
  
// Load mock news for slider
async function loadNews() {
    const slider = document.getElementById('sliderNews');
    const indicatorsContainer = document.getElementById('carouselIndicators');
    
    // Show loading state
    slider.innerHTML = '<div class="carousel-item active"><div class="text-center p-5">Loading news...</div></div>';
    
    try {
      const response = await fetch('https://run.mocky.io/v3/4342f070-2986-445d-b13f-f8b986de9084');
      const newsList = await response.json();
      
      // Generate indicators
      const indicators = newsList.news.map((_, index) => `
        <button type="button" 
                data-bs-target="#newsCarousel" 
                data-bs-slide-to="${index}"
                ${index === 0 ? 'class="active" aria-current="true"' : ''}
                aria-label="Slide ${index + 1}">
        </button>
      `).join('');
      
      // Generate carousel items
      const newsHtml = newsList.news.map((item, index) => `
        <div class="carousel-item ${index === 0 ? 'active' : ''}">
          <img src="${item.image}" class="d-block w-100" alt="${item.title}" style="object-fit: cover; height: 400px;">
          <div class="carousel-caption d-none d-md-block">
            <h5>${item.title}</h5>
          </div>
        </div>
      `).join('');
      
      indicatorsContainer.innerHTML = indicators;
      slider.innerHTML = newsHtml;
    } catch (error) {
      console.error('Error loading news:', error);
      slider.innerHTML = `
        <div class="carousel-item active">
          <div class="alert alert-danger m-3">
            Failed to load news. Please try again later.
          </div>
        </div>
      `;
    }
  }
  
  // Load mock weather data
  async function loadWeather() {
    try {
      const response = await fetch('https://run.mocky.io/v3/f7373341-f380-4713-aac0-e30c4b06d2c1');
      const data = await response.json();
      const container = document.getElementById('weatherContainer');
      const weatherHtml = data.forecast.map(day => `
        <div class="col-md-2 text-center">
          <h5>${day.day}</h5>
          <img src="assets/icons/${day.icon}.png" width="50" alt="weather icon" />
          <p>${day.temperature.max}-${day.temperature.min}°C</p>
        </div>
      `).join('');
      container.innerHTML = weatherHtml;
    } catch (error) {
      console.error('Error loading weather:', error);
    }
  }
  
  // Load finance data
  async function loadFinance() {
    try {
      const response = await fetch('https://run.mocky.io/v3/f7bd6b26-2348-4acd-9492-568c83b036e1');
      const data = await response.json();
      const financeSection = document.getElementById('financeSection');
  
      const renderFinanceCategory = (items, title) => {
        return `
          <div class="finance-category">
            <h6>${title}</h6>
            <ul>
              ${items.map(item => {
                const changeClass = item.change >= 0 ? 'text-success' : 'text-danger';
                const changeSymbol = item.change >= 0 ? '+' : '';
                const name = item.name || item.symbol;
                return `
                  <li>
                    ${name}: ${item.value}
                    <span class="${changeClass}">${changeSymbol}${item.change}%</span>
                  </li>`;
              }).join('')}
            </ul>
          </div>
        `;
      };
  
      const sectionHTML = [
        renderFinanceCategory(data.financeMenu.currencies, 'Currencies'),
        renderFinanceCategory(data.financeMenu.stocks, 'Stocks'),
        renderFinanceCategory(data.financeMenu.crypto, 'Crypto')
      ].join('');
  
      financeSection.innerHTML = sectionHTML;
    } catch (error) {
      console.error('Error loading finance data:', error);
    }
  }
  
  // Initialize all data loads
  document.addEventListener('DOMContentLoaded', () => {
    loadNews();
    loadWeather();
    loadFinance();
  });