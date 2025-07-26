<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Gestor de Salario Personal</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      padding: 20px;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      background: rgba(255, 255, 255, 0.95);
      border-radius: 20px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      backdrop-filter: blur(10px);
    }

    .header {
      background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%);
      color: white;
      padding: 30px;
      text-align: center;
    }

    .header h1 {
      font-size: 2.5rem;
      margin-bottom: 10px;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }

    .header p {
      opacity: 0.9;
      font-size: 1.1rem;
    }

    .main-content {
      padding: 30px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 30px;
    }

    .balance-card {
      background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
      color: white;
      padding: 30px;
      border-radius: 15px;
      text-align: center;
      box-shadow: 0 10px 30px rgba(30, 60, 114, 0.3);
      grid-column: 1 / -1;
    }

    .balance-amount {
      font-size: 3rem;
      font-weight: bold;
      margin: 15px 0;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }

    .controls-section {
      background: white;
      padding: 25px;
      border-radius: 15px;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
    }

    .controls-section h3 {
      color: #2c3e50;
      margin-bottom: 20px;
      font-size: 1.3rem;
      border-bottom: 2px solid #3498db;
      padding-bottom: 5px;
    }

    .input-group {
      margin-bottom: 15px;
    }

    .input-group label {
      display: block;
      margin-bottom: 5px;
      color: #555;
      font-weight: 500;
    }

    .input-group input,
    .input-group select {
      width: 100%;
      padding: 12px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      font-size: 1rem;
      transition: border-color 0.3s ease;
    }

    .input-group input:focus,
    .input-group select:focus {
      outline: none;
      border-color: #3498db;
      box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
    }

    .btn {
      padding: 12px 25px;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      margin: 5px;
    }

    .btn-primary {
      background: linear-gradient(135deg, #3498db, #2980b9);
      color: white;
    }

    .btn-success {
      background: linear-gradient(135deg, #27ae60, #229954);
      color: white;
    }

    .btn-warning {
      background: linear-gradient(135deg, #f39c12, #e67e22);
      color: white;
    }

    .btn-danger {
      background: linear-gradient(135deg, #e74c3c, #c0392b);
      color: white;
    }

    .btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }

    .btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }

    .expenses-section {
      background: white;
      padding: 25px;
      border-radius: 15px;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
    }

    .expense-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px;
      margin: 10px 0;
      background: linear-gradient(135deg, #f8f9fa, #e9ecef);
      border-radius: 10px;
      border-left: 4px solid #3498db;
      transition: transform 0.2s ease;
    }

    .expense-item:hover {
      transform: translateX(5px);
    }

    .expense-name {
      font-weight: 500;
      color: #2c3e50;
    }

    .expense-amount {
      color: #e74c3c;
      font-weight: bold;
      font-size: 1.1rem;
    }

    .transaction-history {
      grid-column: 1 / -1;
      background: white;
      padding: 25px;
      border-radius: 15px;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
      max-height: 400px;
      overflow-y: auto;
    }

    .transaction-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 15px;
      margin: 8px 0;
      border-radius: 8px;
      border-left: 4px solid;
    }

    .transaction-income {
      background: rgba(39, 174, 96, 0.1);
      border-left-color: #27ae60;
    }

    .transaction-expense {
      background: rgba(231, 76, 60, 0.1);
      border-left-color: #e74c3c;
    }

    .transaction-date {
      font-size: 0.9rem;
      color: #666;
    }

    .status-indicator {
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 10px 20px;
      border-radius: 25px;
      color: white;
      font-weight: bold;
      z-index: 1000;
      transform: translateX(100%);
      transition: transform 0.3s ease;
    }

    .status-indicator.show {
      transform: translateX(0);
    }

    .status-success {
      background: linear-gradient(135deg, #27ae60, #229954);
    }

    .status-error {
      background: linear-gradient(135deg, #e74c3c, #c0392b);
    }

    #overdueList .expense-item {
      background-color: rgba(255, 0, 0, 0.05);
      border-left: 4px solid #e74c3c;
    }

    .service-request {
      background: rgba(52, 152, 219, 0.1);
      border: 2px solid #3498db;
      border-radius: 10px;
      padding: 20px;
      margin: 10px 0;
    }

    .service-request h4 {
      color: #2c3e50;
      margin-bottom: 10px;
    }

    .service-actions {
      margin-top: 15px;
      display: flex;
      gap: 10px;
    }

    @media (max-width: 768px) {
      .main-content {
        grid-template-columns: 1fr;
        gap: 20px;
      }

      .header h1 {
        font-size: 2rem;
      }

      .balance-amount {
        font-size: 2.5rem;
      }

      .service-actions {
        flex-direction: column;
      }
    }
  </style>
</head>

<body>
  <div class="container">
    <div class="header">
      <h1>💰 Gestor de Salario Personal</h1>
      <p>Administra tus ingresos y gastos mensuales</p>
      <div style="margin-top: 15px;">
        <input type="password" id="devCode" placeholder="Código de desarrollador"
          style="padding: 8px; border-radius: 5px; border: 1px solid rgba(255,255,255,0.3); background: rgba(255,255,255,0.2); color: white; margin-right: 10px;">
        <button class="btn" style="background: rgba(255,255,255,0.2); color: white; padding: 8px 15px;"
          onclick="checkDevMode()">Modo Dev</button>
        <span id="devStatus" style="margin-left: 10px; font-size: 0.9rem;"></span>
      </div>
    </div>

    <div class="main-content">
      <div class="balance-card">
        <h2>Saldo Actual</h2>
        <div class="balance-amount">S/ <span id="currentBalance">0.00</span></div>
        <p>Próximo depósito: <span id="nextDeposit">Disponible ahora</span></p>
      </div>

      <div class="controls-section">
        <h3>🏦 Controles de Cuenta</h3>
        <button class="btn btn-success" onclick="depositSalary()" id="depositBtn">Depositar Salario (S/ 2000)</button>
        <button class="btn btn-warning" onclick="resetAccount()">Reiniciar Cuenta</button>
        <button class="btn btn-primary" onclick="toggleAutoDeposit()" id="autoDepositBtn">
          Activar Depósito Automático
        </button>
        <button class="btn btn-primary" id="forceBillsBtn" onclick="generateMonthlyBills()" style="display: none;">
          🔧 Generar Solicitudes de Pago (Dev)
        </button>
        <button class="btn btn-success" id="advanceSalaryBtn" onclick="advanceSalary()" style="display: none;">
          💸 Adelantar Sueldo (Dev)
        </button>

        <div id="depositCooldown"
          style="margin-top: 10px; padding: 10px; background: rgba(231, 76, 60, 0.1); border-radius: 8px; border-left: 4px solid #e74c3c; display: none;">
          <small>⏰ Próximo depósito disponible en: <span id="cooldownTimer"></span></small>
        </div>
      </div>

      <div class="controls-section" id="serviceRequestsSection">
        <h3>📩 Solicitudes de Pago</h3>
        <div id="currentServiceRequest">
          <p style="text-align: center; color: #666;">No hay solicitudes pendientes</p>
        </div>
      </div>

      <div class="controls-section">
        <h3>⏳ Por pagar (Servicios omitidos)</h3>
        <div id="overdueList">
          <p style="text-align: center; color: #666;">No hay servicios pendientes</p>
        </div>
      </div>

      <div class="expenses-section">
        <h3>📊 Gastos del Mes</h3>
        <div id="monthlyExpenses">
          <p style="text-align: center; color: #666; margin: 20px 0;">No hay gastos registrados este mes</p>
        </div>
        <div style="margin-top: 20px; padding-top: 15px; border-top: 2px solid #eee;">
          <strong>Total Gastos: S/ <span id="totalExpenses">0.00</span></strong>
        </div>
      </div>

      <div class="transaction-history">
        <h3>📈 Historial de Transacciones</h3>
        <div id="transactionList">
          <p style="text-align: center; color: #666; margin: 20px 0;">No hay transacciones registradas</p>
        </div>
      </div>
    </div>
  </div>

  <div id="statusIndicator" class="status-indicator"></div>

  <script>
    // Estado global de la aplicación
    let appState = {
      balance: 0,
      transactions: [],
      monthlyExpenses: [],
      overdueServices: [],
      currentServiceRequest: null,
      lastDepositDate: null,
      autoDepositEnabled: false,
      devModeEnabled: false,
      salary: 2000
    };

    // Servicios predefinidos
    const services = [
      { name: "Electricidad", amount: 120, icon: "⚡" },
      { name: "Agua", amount: 80, icon: "💧" },
      { name: "Internet", amount: 99, icon: "🌐" },
      { name: "Gas", amount: 65, icon: "🔥" },
      { name: "Teléfono", amount: 45, icon: "📱" },
      { name: "Netflix", amount: 35, icon: "📺" },
      { name: "Spotify", amount: 18, icon: "🎵" }
    ];

    // Inicializar la aplicación
    function initApp() {
      loadData();
      updateDisplay();
      startAutoDeposit();
      generateRandomServiceRequest();
    }

    // Cargar datos (simulado con variables en memoria)
    function loadData() {
      // En un entorno real, aquí cargaríamos desde localStorage
    }

    // Guardar datos (simulado)
    function saveData() {
      // En un entorno real, aquí guardaríamos en localStorage
    }

    // Actualizar la interfaz
    function updateDisplay() {
      document.getElementById('currentBalance').textContent = appState.balance.toFixed(2);
      document.getElementById('totalExpenses').textContent = 
        appState.monthlyExpenses.reduce((sum, expense) => sum + expense.amount, 0).toFixed(2);
      
      updateNextDepositTime();
      updateTransactionHistory();
      updateMonthlyExpenses();
      updateOverdueServices();
      updateServiceRequest();
      updateAutoDepositButton();
    }

    // Depositar salario
    function depositSalary() {
      const now = new Date();
      const lastDeposit = appState.lastDepositDate ? new Date(appState.lastDepositDate) : null;
      
      // Verificar cooldown (24 horas)
      if (lastDeposit && (now - lastDeposit) < 24 * 60 * 60 * 1000) {
        showStatus('Debes esperar 24 horas entre depósitos', 'error');
        return;
      }

      appState.balance += appState.salary;
      appState.lastDepositDate = now;
      
      addTransaction('Depósito de Salario', appState.salary, 'income');
      showStatus(`Salario de S/ ${appState.salary} depositado exitosamente`, 'success');
      
      updateDisplay();
      startDepositCooldown();
      saveData();
    }

    // Iniciar cooldown de depósito
    function startDepositCooldown() {
      const depositBtn = document.getElementById('depositBtn');
      const cooldownDiv = document.getElementById('depositCooldown');
      
      depositBtn.disabled = true;
      cooldownDiv.style.display = 'block';
      
      const cooldownTimer = setInterval(() => {
        const now = new Date();
        const lastDeposit = new Date(appState.lastDepositDate);
        const timeDiff = 24 * 60 * 60 * 1000 - (now - lastDeposit);
        
        if (timeDiff <= 0) {
          clearInterval(cooldownTimer);
          depositBtn.disabled = false;
          cooldownDiv.style.display = 'none';
          updateNextDepositTime();
        } else {
          const hours = Math.floor(timeDiff / (60 * 60 * 1000));
          const minutes = Math.floor((timeDiff % (60 * 60 * 1000)) / (60 * 1000));
          document.getElementById('cooldownTimer').textContent = `${hours}h ${minutes}m`;
        }
      }, 60000);
    }

    // Actualizar tiempo del próximo depósito
    function updateNextDepositTime() {
      const nextDepositSpan = document.getElementById('nextDeposit');
      
      if (!appState.lastDepositDate) {
        nextDepositSpan.textContent = 'Disponible ahora';
        return;
      }
      
      const now = new Date();
      const lastDeposit = new Date(appState.lastDepositDate);
      const timeDiff = 24 * 60 * 60 * 1000 - (now - lastDeposit);
      
      if (timeDiff <= 0) {
        nextDepositSpan.textContent = 'Disponible ahora';
      } else {
        const hours = Math.floor(timeDiff / (60 * 60 * 1000));
        const minutes = Math.floor((timeDiff % (60 * 60 * 1000)) / (60 * 1000));
        nextDepositSpan.textContent = `${hours}h ${minutes}m`;
      }
    }

    // Agregar transacción
    function addTransaction(description, amount, type) {
      const transaction = {
        id: Date.now(),
        description,
        amount,
        type,
        date: new Date()
      };
      
      appState.transactions.unshift(transaction);
      
      // Mantener solo las últimas 50 transacciones
      if (appState.transactions.length > 50) {
        appState.transactions = appState.transactions.slice(0, 50);
      }
    }

    // Actualizar historial de transacciones
    function updateTransactionHistory() {
      const container = document.getElementById('transactionList');
      
      if (appState.transactions.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #666; margin: 20px 0;">No hay transacciones registradas</p>';
        return;
      }
      
      container.innerHTML = appState.transactions.map(transaction => `
        <div class="transaction-item transaction-${transaction.type}">
          <div>
            <div>${transaction.description}</div>
            <div class="transaction-date">${transaction.date.toLocaleDateString('es-PE')}</div>
          </div>
          <div style="color: ${transaction.type === 'income' ? '#27ae60' : '#e74c3c'}; font-weight: bold;">
            ${transaction.type === 'income' ? '+' : '-'}S/ ${transaction.amount.toFixed(2)}
          </div>
        </div>
      `).join('');
    }

    // Generar solicitud de servicio aleatoria
    function generateRandomServiceRequest() {
      if (appState.currentServiceRequest) return;
      
      const randomService = services[Math.floor(Math.random() * services.length)];
      appState.currentServiceRequest = {
        ...randomService,
        id: Date.now(),
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 días
      };
      
      updateServiceRequest();
      
      // Programar la siguiente solicitud
      setTimeout(() => {
        generateRandomServiceRequest();
      }, Math.random() * 300000 + 180000); // Entre 3-8 minutos
    }

    // Actualizar solicitud de servicio actual
    function updateServiceRequest() {
      const container = document.getElementById('currentServiceRequest');
      
      if (!appState.currentServiceRequest) {
        container.innerHTML = '<p style="text-align: center; color: #666;">No hay solicitudes pendientes</p>';
        return;
      }
      
      const service = appState.currentServiceRequest;
      container.innerHTML = `
        <div class="service-request">
          <h4>${service.icon} ${service.name}</h4>
          <p>Monto: <strong>S/ ${service.amount.toFixed(2)}</strong></p>
          <p>Vence: ${service.dueDate.toLocaleDateString('es-PE')}</p>
          <div class="service-actions">
            <button class="btn btn-success" onclick="payService()">💳 Pagar</button>
            <button class="btn btn-warning" onclick="skipService()">⏭️ Omitir</button>
          </div>
        </div>
      `;
    }

    // Pagar servicio
    function payService() {
      const service = appState.currentServiceRequest;
      
      if (appState.balance < service.amount) {
        showStatus('Saldo insuficiente para pagar este servicio', 'error');
        return;
      }
      
      appState.balance -= service.amount;
      appState.monthlyExpenses.push({
        ...service,
        paidDate: new Date()
      });
      
      addTransaction(`Pago de ${service.name}`, service.amount, 'expense');
      showStatus(`Servicio de ${service.name} pagado exitosamente`, 'success');
      
      appState.currentServiceRequest = null;
      updateDisplay();
      saveData();
      
      // Generar nueva solicitud después de un tiempo
      setTimeout(() => {
        generateRandomServiceRequest();
      }, Math.random() * 60000 + 30000); // Entre 0.5-1.5 minutos
    }

    // Omitir servicio
    function skipService() {
      const service = appState.currentServiceRequest;
      
      appState.overdueServices.push({
        ...service,
        skippedDate: new Date()
      });
      
      showStatus(`Servicio de ${service.name} omitido`, 'error');
      
      appState.currentServiceRequest = null;
      updateDisplay();
      saveData();
      
      // Generar nueva solicitud después de un tiempo
      setTimeout(() => {
        generateRandomServiceRequest();
      }, Math.random() * 60000 + 30000);
    }

    // Actualizar gastos mensuales
    function updateMonthlyExpenses() {
      const container = document.getElementById('monthlyExpenses');
      
      if (appState.monthlyExpenses.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #666; margin: 20px 0;">No hay gastos registrados este mes</p>';
        return;
      }
      
      container.innerHTML = appState.monthlyExpenses.map(expense => `
        <div class="expense-item">
          <div class="expense-name">${expense.icon} ${expense.name}</div>
          <div class="expense-amount">S/ ${expense.amount.toFixed(2)}</div>
        </div>
      `).join('');
    }

    // Actualizar servicios vencidos
    function updateOverdueServices() {
      const container = document.getElementById('overdueList');
      
      if (appState.overdueServices.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #666;">No hay servicios pendientes</p>';
        return;
      }
      
      container.innerHTML = appState.overdueServices.map((service, index) => `
        <div class="expense-item">
          <div class="expense-name">${service.icon} ${service.name}</div>
          <div style="display: flex; align-items: center; gap: 10px;">
            <div class="expense-amount">S/ ${service.amount.toFixed(2)}</div>
            <button class="btn btn-success" style="padding: 5px 10px; font-size: 0.8rem;" 
                    onclick="payOverdueService(${index})">Pagar</button>
          </div>
        </div>
      `).join('');
    }

    // Pagar servicio vencido
    function payOverdueService(index) {
      const service = appState.overdueServices[index];
      
      if (appState.balance < service.amount) {
        showStatus('Saldo insuficiente para pagar este servicio', 'error');
        return;
      }
      
      appState.balance -= service.amount;
      appState.monthlyExpenses.push({
        ...service,
        paidDate: new Date()
      });
      
      appState.overdueServices.splice(index, 1);
      
      addTransaction(`Pago de ${service.name} (Atrasado)`, service.amount, 'expense');
      showStatus(`Servicio atrasado de ${service.name} pagado`, 'success');
      
      updateDisplay();
      saveData();
    }

    // Reiniciar cuenta
    function resetAccount() {
      if (confirm('¿Estás seguro de que quieres reiniciar la cuenta? Se perderán todos los datos.')) {
        appState = {
          balance: 0,
          transactions: [],
          monthlyExpenses: [],
          overdueServices: [],
          currentServiceRequest: null,
          lastDepositDate: null,
          autoDepositEnabled: false,
          devModeEnabled: appState.devModeEnabled,
          salary: 2000
        };
        
        updateDisplay();
        saveData();
        showStatus('Cuenta reiniciada exitosamente', 'success');
        
        // Reiniciar solicitudes de servicio
        setTimeout(() => {
          generateRandomServiceRequest();
        }, 5000);
      }
    }

    // Toggle depósito automático
    function toggleAutoDeposit() {
      appState.autoDepositEnabled = !appState.autoDepositEnabled;
      updateAutoDepositButton();
      
      if (appState.autoDepositEnabled) {
        showStatus('Depósito automático activado', 'success');
        startAutoDeposit();
      } else {
        showStatus('Depósito automático desactivado', 'error');
      }
      
      saveData();
    }

    // Actualizar botón de depósito automático
    function updateAutoDepositButton() {
      const btn = document.getElementById('autoDepositBtn');
      btn.textContent = appState.autoDepositEnabled ? 'Desactivar Depósito Automático' : 'Activar Depósito Automático';
      btn.className = appState.autoDepositEnabled ? 'btn btn-warning' : 'btn btn-primary';
    }

    // Iniciar depósito automático
    function startAutoDeposit() {
      if (!appState.autoDepositEnabled) return;
      
      setInterval(() => {
        if (appState.autoDepositEnabled) {
          const now = new Date();
          const lastDeposit = appState.lastDepositDate ? new Date(appState.lastDepositDate) : null;
          
          // Auto depositar cada 24 horas
          if (!lastDeposit || (now - lastDeposit) >= 24 * 60 * 60 * 1000) {
            depositSalary();
          }
        }
      }, 60000); // Verificar cada minuto
    }

    // Verificar modo desarrollador
    function checkDevMode() {
      const code = document.getElementById('devCode').value;
      const status = document.getElementById('devStatus');
      const forceBillsBtn = document.getElementById('forceBillsBtn');
      
      if (code === 'dev2024') {
        appState.devModeEnabled = true;
        status.textContent = '✅ Modo Dev Activado';
        status.style.color = '#27ae60';
        forceBillsBtn.style.display = 'inline-block';
        document.getElementById('advanceSalaryBtn').style.display = 'inline-block';
        showStatus('Modo desarrollador activado', 'success');
      } else {
        appState.devModeEnabled = false;
        status.textContent = '❌ Código incorrecto';
        status.style.color = '#e74c3c';
        forceBillsBtn.style.display = 'none';
        document.getElementById('advanceSalaryBtn').style.display = 'none';
      }
      
      document.getElementById('devCode').value = '';
    }

    // Generar solicitudes de pago (modo dev)
    function generateMonthlyBills() {
      if (!appState.devModeEnabled) return;
      
      appState.currentServiceRequest = null;
      generateRandomServiceRequest();
      showStatus('Nueva solicitud de pago generada', 'success');
    }

    // Mostrar notificación de estado
    function showStatus(message, type) {
      const indicator = document.getElementById('statusIndicator');
      indicator.textContent = message;
      indicator.className = `status-indicator status-${type} show`;
      
      setTimeout(() => {
        indicator.classList.remove('show');
      }, 3000);
    }

    // Inicializar la aplicación cuando se carga la página
    document.addEventListener('DOMContentLoaded', initApp);

    // Actualizar la interfaz cada minuto
    setInterval(updateDisplay, 60000);
  </script>
</body>

</html>
