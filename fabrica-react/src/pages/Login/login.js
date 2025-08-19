import "./css-login.css";
function Login() {
  return (
    <div class="page">
      <img
        src="https://unisales.br/wp-content/uploads/2020/03/Logo-UniSales_Horizontal.png"
        alt="Logo Inicial"
      />
      <form method="POST" class="formLogin">
        <h1>Login</h1>
        <p>Digite os seus dados de acesso no campo abaixo.</p>
        <label for="email">E-mail</label>
        <input type="email" placeholder="Digite seu e-mail" autofocus="true" />
        <label for="password">Senha</label>
        <input type="password" placeholder="Digite seu e-mail" />
        <a href="/">Esqueci minha senha</a>
        <input type="submit" value="Acessar" class="btn" />
      </form>
    </div>
  );
}
export default Login;
