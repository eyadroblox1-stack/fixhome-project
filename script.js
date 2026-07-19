const brandsData = {
  'washing-machine': ['إل جي', 'سامسونج', 'توشيبا', 'زانوسي', 'وايت ويل', 'تورنيدو', 'بوش', 'فريش', 'أخرى'],
  'ac': ['شارب', 'كاريير', 'يونيون اير', 'ميديا', 'فريش', 'تورنيدو', 'إل جي', 'سامسونج', 'جري', 'أخرى'],
  'fridge': ['كريازي', 'توشيبا', 'إل جي', 'سامسونج', 'بيكو', 'شارب', 'تورنيدو', 'أخرى']
};

function updateBrands() {
  const deviceSelect = document.getElementById('device-type');
  const brandGroup = document.getElementById('brand-group');
  const brandSelect = document.getElementById('brand-type');
  const selectedDevice = deviceSelect.value;
  
  brandSelect.innerHTML = '<option value="" disabled selected>اختار الماركة...</option>';
  
  if (selectedDevice && brandsData[selectedDevice]) {
    brandGroup.classList.add('show');
    brandsData[selectedDevice].forEach(brand => {
      const option = document.createElement('option');
      option.value = brand; 
      option.textContent = brand;
      brandSelect.appendChild(option);
    });
  } else { 
    brandGroup.classList.remove('show'); 
  }
  checkForm();
}

function checkForm() {
  const submitArea = document.getElementById('submit-area');
  const isValid = document.getElementById('device-type').value && document.getElementById('brand-type').value && document.getElementById('location').value;
  submitArea.style.maxHeight = isValid ? "200px" : "0";
  submitArea.style.opacity = isValid ? "1" : "0";
}

async function sendOrder() {
  const submitArea = document.getElementById('submit-area');
  
  const deviceSelect = document.getElementById('device-type');
  const deviceText = deviceSelect.options[deviceSelect.selectedIndex].text;
  
  const brandText = document.getElementById('brand-type').value;
  
  const locationSelect = document.getElementById('location');
  const locationText = locationSelect.options[locationSelect.selectedIndex].text;

  const orderData = {
    device: deviceText,
    brand: brandText,
    location: locationText,
    date: new Date().toLocaleString('ar-EG')
  };

  submitArea.innerHTML = `<div style="padding: 10px;">جاري إرسال طلبك...</div>`;
  
  try {
    const googleScriptURL = 'https://script.google.com/macros/s/AKfycbyPsNpcAvLO08Mq9hgeYN6Ah8A2c0fbU77E1xIhdkojHs4t2X2MIfSt3y0p2znHRmrK/exec'; 
    
    await fetch(googleScriptURL, {
      method: 'POST', 
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: JSON.stringify(orderData)
    });
    
    submitArea.innerHTML = `
      <div style="padding: 10px; color: green; font-weight: bold;">تم استلام طلبك بنجاح وسنتواصل معك!</div>
      <a href="tel:01155664606" class="call-btn-final show-call">
        <i class="fas fa-phone-alt"></i> اتصل بنا الآن: 01155664606
      </a>
    `;
  } catch (error) {
    submitArea.innerHTML = `<div style="color: red;">حدث خطأ، يرجى المحاولة لاحقاً.</div>`;
    console.error("Error sending order:", error);
  }
}