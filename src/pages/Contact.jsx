import { React, useState } from 'react';
import { Card } from '../components/Card';
import { Input } from '../components/Input';

export default function Contato() {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    telefone: '',
    mensagem: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Mensagem enviada com sucesso!');
    console.log(form);
  };

  return (
    <main
      className="contato-container flex justify-center p-4 sm:p-6 md:p-8 lg:p-10"
      style={{
        backgroundImage: 'url(/psi.webp)', // 🔁 Altere este caminho conforme necessário
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
      }}
    >
      <Card className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl p-6 sm:p-8 md:p-10 lg:p-12 bg-white bg-opacity-90 backdrop-blur-md rounded">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">Fale conosco</h1>
        <form
          onSubmit={handleSubmit}
          className="contato-form flex flex-col gap-4 sm:gap-6 md:gap-8"
          noValidate
        >
          <Input
            label="Nome"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            required
            placeholder="Digite seu nome completo"
            aria-label="Nome completo"
            className="w-full"
          />

          <Input
            label="E-mail"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="exemplo@dominio.com"
            aria-label="Endereço de e-mail"
            type="email"
            className="w-full"
          />

          <Input
            label="Telefone"
            name="telefone"
            value={form.telefone}
            onChange={handleChange}
            required
            placeholder="(00) 00000-0000"
            aria-label="Número de telefone"
            type="tel"
            className="w-full"
          />

          <Input
            label="Mensagem"
            name="mensagem"
            value={form.mensagem}
            onChange={handleChange}
            required
            placeholder="Digite sua mensagem"
            aria-label="Mensagem"
            type="textarea"
            className="w-full"
          />

          <button
            type="submit"
            className="submit-button bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded transition-colors duration-300 sm:py-4 md:py-5"
          >
            Enviar
          </button>
        </form>
      </Card>
    </main>
  );
}