import React, { useState, useEffect } from "react";
import axios from "axios";

const PaginaReceberDados = () => {
  const [dados, setDados] = useState<any | null>(null);

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwt");

    if (!jwtToken) {
      window.location.href = "/paginarandom";
      return;
    }

    const fetchDados = async () => {
      try {
        const resposta = await axios.get(
          "http://localhost:3000/pedidos/buscarPedidoPorID/1",
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );
        setDados(resposta.data);
      } catch (error) {
        console.error("Erro na requisição da rota protegida:", error);
      }
    };

    fetchDados();
  }, []);

  return (
    <div>
      <h1>Dados Recebidos</h1>
      <pre>{JSON.stringify(dados, null, 2)}</pre>
    </div>
  );
};

export default PaginaReceberDados;
