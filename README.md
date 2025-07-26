<!-- Página promocional simple para tu app bancaria -->
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Gestor de Salario Personal</title>
  <style>
    body {
      font-family: 'Segoe UI', sans-serif;
      background: linear-gradient(to right, #3498db, #2c3e50);
      color: white;
      text-align: center;
      padding: 40px 20px;
    }

    h1 {
      font-size: 2.8rem;
      margin-bottom: 10px;
    }

    h2 {
      font-size: 1.6rem;
      margin-top: 30px;
      color: #f1c40f;
    }

    p {
      font-size: 1.1rem;
      max-width: 600px;
      margin: 10px auto 20px;
      line-height: 1.6;
    }

    .features {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin: 30px 0;
    }

    .card {
      background: rgba(255, 255, 255, 0.1);
      padding: 20px;
      border-radius: 15px;
      backdrop-filter: blur(6px);
    }

    .card h3 {
      color: #ecf0f1;
      margin-bottom: 10px;
    }

    .btn {
      display: inline-block;
      padding: 12px 25px;
      background: #f1c40f;
      color: #2c3e50;
      border-radius: 8px;
      text-decoration: none;
      font-weight: bold;
      transition: background 0.3s ease;
    }

    .btn:hover {
      background: #f39c12;
    }

    footer {
      margin-top: 40px;
      font-size: 0.9rem;
      color: #ccc;
    }
  </style>
</head>
<body>
  <h1>💰 Gestor de Salario Personal</h1>
  <p>Tu app para administrar ingresos, gastos, servicios y transacciones de forma visual, práctica y automática.</p>

  <h2>🔧 Funciones destacadas</h2>
  <div class="features">
    <div class="card">
      <h3>📊 Control mensual</h3>
      <p>Administra tu saldo y visualiza tus gastos categorizados cada mes.</p>
    </div>
    <div class="card">
      <h3>📩 Solicitudes de pago</h3>
      <p>Recibe facturas automáticamente y decide si pagarlas u omitirlas.</p>
    </div>
    <div class="card">
      <h3>⏳ Autocobros</h3>
      <p>Las facturas no pagadas se cobran después de 14 días, incluso si no tienes saldo.</p>
    </div>
    <div class="card">
      <h3>🛠️ Modo Desarrollador</h3>
      <p>Activa funciones avanzadas como depósitos ilimitados y generación de facturas manual.</p>
    </div>
  </div>

  <a href="https://github.com/tuusuario/gestor-salario" class="btn" target="_blank">Ver en GitHub</a>

  <footer>
    &copy; 2025 Yerson Vera - Proyecto personal sin fines comerciales.
  </footer>
</body>
</html>

