import { useState, useEffect } from 'react'
import viteLogo from './assets/vite.svg'
import './App.css'
import React from 'react';
//import Card from './components/card';
//import Input from './components/input';
//import Button from './components/button';

interface Cliente {
  id: number;
  nombre: string;
  email: string;
}

function App() {
  const [clientes, setClientes] = useState<Cliente[]>(() => {
    const guardados = localStorage.getItem('clientes_vite');
    return guardados ? JSON.parse(guardados) : [];
  });

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    localStorage.setItem('clientes_vite', JSON.stringify(clientes));
  }, [clientes]);

  const manejarEnvio = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nombre.trim() || !email.trim()) return;

    const nuevoCliente: Cliente = {
      id: Date.now(),
      nombre: nombre.trim(),
      email: email.trim()
    };

    setClientes([...clientes, nuevoCliente]);
    
    setNombre('');
    setEmail('');
  };

  const eliminarCliente = (id: number) => {
    setClientes(clientes.filter(cliente => cliente.id !== id));
  };

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        
        <h1>Panel de Clientes</h1>
        <p>Gestiona tus contactos de forma local y rápida</p>

        {/* Formulario para añadir clientes */}
        <form onSubmit={manejarEnvio} style={{ margin: '20px 0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input 
            type="text" 
            placeholder="Nombre del cliente" 
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            style={{ padding: '10px', borderRadius: '4px', border: '1px solid #df0a0a' }}
          />
          <input 
            type="email" 
            placeholder="Correo electrónico" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: '10px', borderRadius: '4px', border: '1px solid #15adf3' }}
          />
          <button type="submit" className="counter" style={{ width: '100%' }}>
            Añadir Cliente
          </button>
        </form>
      </section>

      <div className="ticks"></div>

      {/* Lista de clientes registrados */}
      <section id="next-steps">
        <div id="docs" style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}>
          <h2>Clientes Registrados ({clientes.length})</h2>
          
          {clientes.length === 0 ? (
            <p style={{ fontStyle: 'italic', color: '#6c15b3' }}>No hay clientes registrados aún.</p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left' }}>
              {clientes.map((cliente) => (
                <li 
                  key={cliente.id} 
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    padding: '10px', 
                    borderBottom: '1px solid #ec13ab',
                    gap: '15px'
                  }}
                >
                  <div>
                    <strong>{cliente.nombre}</strong>
                    <br />
                    <span style={{ fontSize: '0.85em', color: '#a4ff10' }}>{cliente.email}</span>
                  </div>
                  <button 
                    onClick={() => eliminarCliente(cliente.id)}
                    style={{ 
                      background: '#08e22c', 
                      color: 'white', 
                      border: 'none', 
                      padding: '5px 10px', 
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
      
      <section id="spacer"></section>
    </>
  )
}

export default App