class SalaryManager {
  constructor() {
    this.balance = 0;
    this.transactions = [];
    this.lastDepositDate = null;
    this.salary = 2000;
    this.init();
  }

  init() {
    this.loadData();
    this.updateDisplay();
    this.updateNextDepositDate();
    this.updateDepositButton();
    this.startCooldownTimer();
  }

  saveData() {
    const data = {
      balance: this.balance,
      transactions: this.transactions,
      lastDepositDate: this.lastDepositDate
    };
    localStorage.setItem('salaryAppData', JSON.stringify(data));
  }

  loadData() {
    const saved = localStorage.getItem('salaryAppData');
    if (!saved) return;

    try {
      const data = JSON.parse(saved);
      this.balance = data.balance || 0;
      this.transactions = data.transactions || [];
      this.lastDepositDate = data.lastDepositDate ? new Date(data.lastDepositDate) : null;
    } catch (e) {
      console.error('Error al cargar datos guardados:', e);
    }
  }

  canDeposit() {
    if (!this.lastDepositDate) return true;
    const now = new Date();
    const last = new Date(this.lastDepositDate);
    const diffDays = (now - last) / (1000 * 60 * 60 * 24);
    return diffDays >= 30;
  }

  depositSalary() {
    if (!this.canDeposit()) {
      this.showStatus('⏳ Debes esperar 30 días desde el último depósito', 'error');
      return;
    }

    this.balance += this.salary;
    this.lastDepositDate = new Date();
    this.addTransaction('Depósito de Salario', this.salary, 'income');
    this.updateDisplay();
    this.updateNextDepositDate();
    this.updateDepositButton();
    this.showStatus(`✅ Salario depositado: S/ ${this.salary}`, 'success');
    this.saveData();
  }

  addExpense() {
    const type = document.getElementById('expenseType').value;
    const amount = parseFloat(document.getElementById('expenseAmount').value);
    const description = document.getElementById('expenseDescription').value || type;

    if (!amount || amount <= 0 || amount > this.balance) {
      this.showStatus('❌ Monto inválido o insuficiente', 'error');
      return;
    }

    this.balance -= amount;
    this.addTransaction(description, -amount, 'expense');
    this.updateDisplay();
    this.showStatus(`Gasto registrado: S/ ${amount}`, 'success');
    document.getElementById('expenseAmount').value = '';
    document.getElementById('expenseDescription').value = '';
    this.saveData();
  }

  addTransaction(desc, amount, type) {
    this.transactions.unshift({
      description: desc,
      amount,
      type,
      date: new Date().toISOString()
    });
    if (this.transactions.length > 50) this.transactions.length = 50;
  }

  updateDisplay() {
    document.getElementById('currentBalance').textContent = this.balance.toFixed(2);
    this.updateTransactionHistory();
  }

  updateTransactionHistory() {
    const container = document.getElementById('transactionList');
    if (this.transactions.length === 0) {
      container.innerHTML = '<p>No hay transacciones registradas</p>';
      return;
    }

    container.innerHTML = this.transactions.map(t => {
      const date = new Date(t.date).toLocaleDateString('es-PE', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
      });
      const css = t.type === 'income' ? 'transaction-income' : 'transaction-expense';
      const sign = t.type === 'income' ? '+' : '-';
      return `
        <div class="transaction-item ${css}">
          <div><strong>${t.description}</strong><div class="transaction-date">${date}</div></div>
          <div>${sign}S/ ${Math.abs(t.amount).toFixed(2)}</div>
        </div>
      `;
    }).join('');
  }

  updateNextDepositDate() {
    const next = this.lastDepositDate ? new Date(this.lastDepositDate) : new Date();
    next.setMonth(next.getMonth() + 1);
    document.getElementById('nextDeposit').textContent = next.toLocaleDateString('es-PE', {
      day: '2-digit', month: '2-digit', year: 'numeric'
    });
  }

  updateDepositButton() {
    const btn = document.getElementById('depositBtn');
    const cooldown = document.getElementById('depositCooldown');
    if (this.canDeposit()) {
      btn.disabled = false;
      btn.textContent = `Depositar Salario (S/ ${this.salary})`;
      cooldown.style.display = 'none';
    } else {
      btn.disabled = true;
      btn.textContent = 'Depositar Salario (Bloqueado)';
      cooldown.style.display = 'block';
    }
  }

  startCooldownTimer() {
    setInterval(() => {
      if (!this.canDeposit() && this.lastDepositDate) {
        const now = new Date();
        const last = new Date(this.lastDepositDate);
        const next = new Date(last);
        next.setMonth(next.getMonth() + 1);
        const diff = next - now;
        if (diff > 0) {
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((diff / (1000 * 60)) % 60);
          document.getElementById('cooldownTimer').textContent = `${days}d ${hours}h ${minutes}m`;
        } else {
          this.updateDepositButton();
        }
      }
    }, 1000);
  }

  showStatus(message, type) {
    const box = document.getElementById('statusIndicator');
    box.textContent = message;
    box.className = `status-indicator status-${type} show`;
    setTimeout(() => box.classList.remove('show'), 3000);
  }

  resetAccount() {
    if (!confirm("¿Deseas reiniciar tu cuenta?")) return;
    localStorage.removeItem('salaryAppData');
    this.balance = 0;
    this.transactions = [];
    this.lastDepositDate = null;
    this.updateDisplay();
    this.updateNextDepositDate();
    this.updateDepositButton();
    this.showStatus("Cuenta reiniciada", "success");
  }
}

// Instanciar la app
const salaryManager = new SalaryManager();

// Funciones globales para botones
function depositSalary() { salaryManager.depositSalary(); }
function addExpense() { salaryManager.addExpense(); }
function resetAccount() { salaryManager.resetAccount(); }
