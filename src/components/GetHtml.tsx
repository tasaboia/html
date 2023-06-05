"use client";
import React from "react";
import cheerio from "cheerio";
import axios from "axios";
import { useEffect, useState } from "react";

function GetHtml() {
  const [dados, setDados] = useState<any[]>([]);

  async function extrairInformacoes() {
    try {
      const url =
        "https://www.confaz.fazenda.gov.br/legislacao/protocolos/2023";
      const response = await axios.get(url);
      const html = response.data;

      const $ = cheerio.load(html);

      // Encontre a tabela que contém as informações desejadas
      const tabela = $("table"); // Modifique de acordo com a estrutura HTML da página

      if (tabela.length > 0) {
        const dadosExtraidos: { coluna1: string; coluna2: string }[] = [];

        // Percorra as linhas da tabela
        tabela.find("tr").each((index, element) => {
          const colunas = $(element).find("td"); // Modifique de acordo com a estrutura HTML da página

          const dado = {
            coluna1: $(colunas[0]).text(),
            coluna2: $(colunas[1]).text(),
            // ...
          };

          dadosExtraidos.push(dado);
        });

        console.log(dadosExtraidos);
      }
    } catch (error) {
      console.error("Erro ao buscar os dados:", error);
    }
  }

  extrairInformacoes();

  return (
    <div>
      {/* Renderize os dados na sua interface */}
      {dados.map((dado, index) => (
        <div key={index}>
          <span>{dado.coluna1}</span>
          <span>{dado.coluna2}</span>
          {/* ... */}
        </div>
      ))}
    </div>
  );
}

export default GetHtml;
